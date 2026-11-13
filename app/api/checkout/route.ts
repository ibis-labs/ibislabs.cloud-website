import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;

    let body: any = {};
    try {
      body = await req.json();
    } catch (e) {
      // Body may be empty
    }

    if (body.provider === 'shopify') {
      const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
      const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
      const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-01';

      if (!domain || !storefrontAccessToken) {
        return NextResponse.json({ error: 'Shopify credentials missing' }, { status: 400 });
      }

      const items = body.items || [];
      const linesFormatted = items
        .map((item: any) => `{ merchandiseId: "${item.variantId}", quantity: ${item.quantity} }`)
        .join(',');

      const query = `
        mutation cartCreate {
          cartCreate(input: { lines: [${linesFormatted}] }) {
            cart {
              id
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        },
        body: JSON.stringify({ query }),
      });

      const json = await res.json();
      const checkoutUrl = json.data?.cartCreate?.cart?.checkoutUrl;

      if (checkoutUrl) {
        return NextResponse.json({ url: checkoutUrl });
      }

      if (json.data?.cartCreate?.userErrors?.length > 0) {
        return NextResponse.json({ error: json.data.cartCreate.userErrors[0].message }, { status: 400 });
      }

      // Fallback redirect URL for development/mock data
      const cartParams = items.map((i: any) => `${i.variantId}:${i.quantity}`).join(',');
      return NextResponse.json({ url: `https://${domain}/cart/${cartParams}` });
    }

    // Default Stripe provider
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Stripe credentials missing' }, { status: 500 });
    }
    const stripe = new Stripe(stripeSecretKey);

    const priceId = body.priceId || process.env.STRIPE_TEST_PRICE_ID;
    const lineItem = priceId
      ? { price: priceId, quantity: 1 }
      : {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Studio Consultation Service',
              description: '1 Hour architecture and digital stewardship consultation',
            },
            unit_amount: 15000, // $150.00 USD
          },
          quantity: 1,
        };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [lineItem],
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('[Checkout API Route Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
