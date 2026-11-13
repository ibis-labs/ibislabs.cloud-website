import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const provider = searchParams.get('provider') || 'stripe';

  try {
    if (provider === 'shopify') {
      const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
      const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
      const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-01';

      if (!domain || !storefrontAccessToken) {
        return NextResponse.json({ error: 'Shopify credentials missing' }, { status: 400 });
      }

      const query = `
        query getProducts {
          products(first: 20) {
            edges {
              node {
                id
                handle
                title
                description
                descriptionHtml
                tags
                priceRange {
                  minVariantPrice { amount currencyCode }
                  maxVariantPrice { amount currencyCode }
                }
                images(first: 5) {
                  edges {
                    node { url altText width height }
                  }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      price { amount currencyCode }
                      availableForSale
                      sku
                      image { url altText }
                      selectedOptions { name value }
                    }
                  }
                }
              }
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
      if (json.errors) {
        console.error('[Shopify API Errors]:', json.errors);
        return NextResponse.json({ error: json.errors[0]?.message || 'GraphQL Error' }, { status: 500 });
      }

      return NextResponse.json(json.data || {});
    }

    // Stripe catalog fetch
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Stripe credentials missing' }, { status: 500 });
    }
    const stripe = new Stripe(stripeSecretKey);

    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });
    return NextResponse.json(products.data);
  } catch (error: any) {
    console.error(`[Products Fetch Error for ${provider}]:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
