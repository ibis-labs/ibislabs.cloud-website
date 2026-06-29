import { ecommerceConfig, getActiveProvider } from '../config/ecommerce';
import { EcommerceProvider } from '../types/ecommerce';

export interface CartItem {
  variantId: string;
  quantity: number;
}

/**
 * Modern Shopify Headless Checkout via Storefront API cartCreate mutation
 */
async function handleShopifyCheckout(items: CartItem[]): Promise<string> {
  const { domain, storefrontAccessToken, apiVersion } = ecommerceConfig.shopify;

  if (!domain || !storefrontAccessToken) {
    console.warn('[Shopify Checkout] Missing API credentials in .env.local. Demo redirect.');
    return `https://${domain || 'checkout.shopify.com'}/cart`;
  }

  // Format line items for Shopify Storefront API GraphQL
  const linesFormatted = items
    .map((item) => `{ merchandiseId: "${item.variantId}", quantity: ${item.quantity} }`)
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

  try {
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
      return checkoutUrl;
    }
    
    if (json.data?.cartCreate?.userErrors?.length > 0) {
      console.warn('[Shopify Cart UserErrors]:', json.data.cartCreate.userErrors);
    }

    throw new Error(json.errors?.[0]?.message || 'Could not generate Shopify cart session.');
  } catch (err) {
    console.error('[Shopify Headless Checkout Notice]:', err);
    
    // Fallback for mock/demo IDs during development
    const cartParams = items.map((i) => `${i.variantId}:${i.quantity}`).join(',');
    return `https://${domain}/cart/${cartParams}`;
  }
}

/**
 * Handle Fourthwall Headless Direct Checkout Redirect URL formatting
 */
function handleFourthwallCheckout(items: CartItem[]): string {
  const { storeDomain } = ecommerceConfig.fourthwall;
  const baseUrl = storeDomain 
    ? (storeDomain.startsWith('http') ? storeDomain : `https://${storeDomain}`)
    : 'https://checkout.fourthwall.com';

  const productsParam = items.map((item) => `${item.variantId}:${item.quantity}`).join(',');
  return `${baseUrl}/cart/checkout?products=${encodeURIComponent(productsParam)}`;
}

/**
 * Unified Abstracted Checkout Redirect Handler
 */
export async function executeCheckoutRedirect(
  items: CartItem[],
  providerOverride?: EcommerceProvider | null
): Promise<void> {
  if (!items || items.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const activeProvider = getActiveProvider(providerOverride);
  let targetUrl = '';

  if (activeProvider === 'fourthwall') {
    targetUrl = handleFourthwallCheckout(items);
  } else {
    targetUrl = await handleShopifyCheckout(items);
  }

  if (targetUrl) {
    window.location.href = targetUrl;
  }
}
