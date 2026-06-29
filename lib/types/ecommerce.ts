export type EcommerceProvider = 'shopify' | 'fourthwall';

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string; // Unified variant identifier used for cart/checkout
  title: string;
  price: number; // Normalized to numeric amount in store currency
  currencyCode: string;
  availableForSale: boolean;
  sku?: string;
  image?: ProductImage;
  selectedOptions?: { name: string; value: string }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  priceRange: {
    minVariantPrice: number;
    maxVariantPrice: number;
    currencyCode: string;
  };
  images: ProductImage[];
  variants: ProductVariant[];
  inStock: boolean;
  tags: string[];
  provider: EcommerceProvider; // Track originating provider for debug/admin UI
}
