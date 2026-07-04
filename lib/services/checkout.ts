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
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: 'shopify',
        items,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to generate Shopify checkout URL from server');
    }

    const data = await res.json();
    if (data.url) {
      return data.url;
    }
    throw new Error(data.error || 'No checkout URL returned from server');
  } catch (err) {
    console.error('[Shopify Headless Checkout Error]:', err);
    // Fallback URL formatting for local testing if server fails
    const { domain } = ecommerceConfig.shopify;
    const cartParams = items.map((i) => `${i.variantId}:${i.quantity}`).join(',');
    return `https://${domain || 'checkout.shopify.com'}/cart/${cartParams}`;
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
