import { EcommerceProvider } from '../types/ecommerce';

/**
 * Global E-commerce Strategy Configuration
 */
export const ecommerceConfig = {
  // Default provider: 'shopify' | 'fourthwall'
  defaultProvider: (process.env.NEXT_PUBLIC_ECOMMERCE_PROVIDER as EcommerceProvider) || 'shopify',
  
  // Shopify Configuration
  shopify: {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-01',
  },

  // Fourthwall Configuration
  fourthwall: {
    storeDomain: process.env.NEXT_PUBLIC_FOURTHWALL_STORE_DOMAIN || '',
    storefrontToken: process.env.FOURTHWALL_STOREFRONT_TOKEN || process.env.NEXT_PUBLIC_FOURTHWALL_STOREFRONT_TOKEN || '',
    apiUrl: 'https://storefront-api.fourthwall.com/v1',
  },
};

/**
 * Helper to check if automated fulfillment (Fourthwall) is enabled by default or via runtime override
 */
export function getActiveProvider(overrideProvider?: EcommerceProvider | null): EcommerceProvider {
  if (overrideProvider) return overrideProvider;
  return ecommerceConfig.defaultProvider;
}
