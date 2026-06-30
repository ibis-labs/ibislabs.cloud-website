import { ecommerceConfig, getActiveProvider } from '../config/ecommerce';
import { EcommerceProvider, Product } from '../types/ecommerce';

// ==========================================
// RAW PAYLOAD INTERFACES
// ==========================================

// Shopify Raw Types
interface ShopifyImageEdge {
  node: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
}

interface ShopifyVariantEdge {
  node: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    availableForSale: boolean;
    sku?: string;
    image?: {
      url: string;
      altText?: string;
    };
    selectedOptions?: { name: string; value: string }[];
  };
}

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  tags: string[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  images: { edges: ShopifyImageEdge[] };
  variants: { edges: ShopifyVariantEdge[] };
}

// Fourthwall Raw Types
interface FourthwallImage {
  id?: string;
  url: string;
  width?: number;
  height?: number;
}

interface FourthwallVariant {
  id: string;
  name: string;
  sku?: string;
  unitPrice: {
    value: number; // e.g., 2500 for $25.00 or float depending on API
    currency: string;
  };
  stock?: {
    type: string;
    inStock: boolean;
  };
  images?: FourthwallImage[];
  attributes?: Record<string, string>;
}

interface FourthwallProduct {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  images: FourthwallImage[];
  variants: FourthwallVariant[];
  tags?: string[];
}

// ==========================================
// NORMALIZATION FUNCTIONS
// ==========================================

function normalizeShopifyProduct(node: ShopifyProductNode): Product {
  const images = node.images.edges.map((edge, idx) => ({
    id: `shopify-img-${idx}`,
    url: edge.node.url,
    altText: edge.node.altText || node.title,
    width: edge.node.width,
    height: edge.node.height,
  }));

  const variants = node.variants.edges.map((edge) => {
    const v = edge.node;
    return {
      id: v.id,
      title: v.title,
      price: parseFloat(v.price.amount),
      currencyCode: v.price.currencyCode,
      availableForSale: v.availableForSale,
      sku: v.sku,
      image: v.image ? { id: `v-img-${v.id}`, url: v.image.url, altText: v.image.altText } : undefined,
      selectedOptions: v.selectedOptions,
    };
  });

  const inStock = variants.some((v) => v.availableForSale);
  const minPrice = parseFloat(node.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(node.priceRange.maxVariantPrice.amount);

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    priceRange: {
      minVariantPrice: minPrice,
      maxVariantPrice: maxPrice,
      currencyCode: node.priceRange.minVariantPrice.currencyCode || 'USD',
    },
    images,
    variants,
    inStock,
    tags: node.tags || [],
    provider: 'shopify',
  };
}

function normalizeFourthwallProduct(raw: FourthwallProduct): Product {
  // Pool parent and variant images to gather all views
  const rawImages = [...(raw.images || [])];
  if (raw.variants) {
    raw.variants.forEach((v) => {
      if (v.images) {
        v.images.forEach((img) => {
          if (!rawImages.some((existing) => existing.url === img.url)) {
            rawImages.push(img);
          }
        });
      }
    });
  }

  let images = rawImages.map((img, idx) => ({
    id: img.id || `fw-img-${idx}`,
    url: img.url,
    altText: raw.name,
    width: img.width,
    height: img.height,
  }));

  // Reorder: Use the 3rd image as primary/front view, 1st image as secondary/hover view
  if (images.length >= 3) {
    const primary = images[2];
    const secondary = images[0];
    const remaining = images.filter((_, idx) => idx !== 0 && idx !== 2);
    images = [primary, secondary, ...remaining];
  }

  const variants = (raw.variants || []).map((v) => {
    // Fourthwall API prices are typically returned in cents (integer) or float units
    const priceAmount = typeof v.unitPrice.value === 'number' 
      ? (v.unitPrice.value > 100 ? v.unitPrice.value / 100 : v.unitPrice.value)
      : 0;

    const inStock = v.stock
      ? (v.stock.type === 'UNLIMITED' || v.stock.inStock === true || v.stock.inStock === undefined)
      : true;

    return {
      id: v.id,
      title: v.name || raw.name,
      price: priceAmount,
      currencyCode: v.unitPrice.currency || 'USD',
      availableForSale: inStock,
      sku: v.sku,
      image: v.images && v.images.length > 0 ? { id: v.images[0].id || v.id, url: v.images[0].url } : undefined,
    };
  });

  const inStock = variants.some((v) => v.availableForSale);
  const prices = variants.map((v) => v.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const currencyCode = variants[0]?.currencyCode || 'USD';

  // Strip HTML tags from description
  const cleanDescription = raw.description
    ? raw.description.replace(/<\/?[^>]+(>|$)/g, "")
    : '';

  return {
    id: raw.id,
    handle: raw.slug || raw.id,
    title: raw.name,
    description: cleanDescription,
    priceRange: {
      minVariantPrice: minPrice,
      maxVariantPrice: maxPrice,
      currencyCode,
    },
    images,
    variants,
    inStock,
    tags: raw.tags || [],
    provider: 'fourthwall',
  };
}

// ==========================================
// DATA FETCHERS
// ==========================================

async function fetchShopifyProducts(): Promise<Product[]> {
  const { domain, storefrontAccessToken, apiVersion } = ecommerceConfig.shopify;
  
  if (!domain || !storefrontAccessToken) {
    console.warn('[Shopify] Missing credentials, returning mock/fallback data');
    return getFallbackProducts('shopify');
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

  try {
    const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 }, // ISR / caching in Next.js
    });

    const json = await res.json();
    if (json.errors) {
      console.error('[Shopify GraphQL Errors]:', json.errors);
      return getFallbackProducts('shopify');
    }

    const edges: { node: ShopifyProductNode }[] = json.data?.products?.edges || [];
    return edges.map((e) => normalizeShopifyProduct(e.node));
  } catch (err) {
    console.error('[Shopify Fetch Failed]:', err);
    return getFallbackProducts('shopify');
  }
}

async function fetchFourthwallProducts(): Promise<Product[]> {
  const { apiUrl, storefrontToken } = ecommerceConfig.fourthwall;

  if (!storefrontToken) {
    console.warn('[Fourthwall] Missing storefront token, returning mock/fallback data');
    return getFallbackProducts('fourthwall');
  }

  try {
    const res = await fetch(`${apiUrl}/collections/all/products?storefront_token=${storefrontToken}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`[Fourthwall API Error]: ${res.status} ${res.statusText}`);
      return getFallbackProducts('fourthwall');
    }

    const data = await res.json();
    const products: FourthwallProduct[] = Array.isArray(data) ? data : data.results || [];
    return products.map(normalizeFourthwallProduct);
  } catch (err) {
    console.error('[Fourthwall Fetch Failed]:', err);
    return getFallbackProducts('fourthwall');
  }
}

// ==========================================
// UNIFIED ABSTRACTED SERVICE
// ==========================================

export async function getProducts(providerOverride?: EcommerceProvider | null): Promise<Product[]> {
  const activeProvider = getActiveProvider(providerOverride);
  
  if (activeProvider === 'fourthwall') {
    return fetchFourthwallProducts();
  }

  return fetchShopifyProducts();
}

// Fallback demo dataset aligned with Ibis Labs Cyberpunk aesthetic
function getFallbackProducts(provider: EcommerceProvider): Product[] {
  return [
    {
      id: `${provider}-prod-1`,
      handle: 'cyber-hoodie-v1',
      title: provider === 'shopify' ? '[Shopify Direct] Ibis Neural Hoodie' : '[Fourthwall Automated] Ibis Neural Hoodie',
      description: 'Heavyweight cybernetic fleece featuring glow-accented embroidery and obsidian weave.',
      priceRange: { minVariantPrice: 85.0, maxVariantPrice: 85.0, currencyCode: 'USD' },
      images: [
        { id: 'img-1', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', altText: 'Ibis Neural Hoodie' }
      ],
      variants: [
        { id: `${provider}-var-1-m`, title: 'Medium', price: 85.0, currencyCode: 'USD', availableForSale: true },
        { id: `${provider}-var-1-l`, title: 'Large', price: 85.0, currencyCode: 'USD', availableForSale: true },
      ],
      inStock: true,
      tags: ['Apparel', 'Cyberpunk', 'Merch'],
      provider,
    },
    {
      id: `${provider}-prod-2`,
      handle: 'quantum-cap-black',
      title: provider === 'shopify' ? '[Shopify Direct] Quantum Tactical Cap' : '[Fourthwall Automated] Quantum Tactical Cap',
      description: 'Structured low-profile snapback with holographic metallic logo patch.',
      priceRange: { minVariantPrice: 35.0, maxVariantPrice: 35.0, currencyCode: 'USD' },
      images: [
        { id: 'img-2', url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80', altText: 'Quantum Tactical Cap' }
      ],
      variants: [
        { id: `${provider}-var-2-os`, title: 'One Size', price: 35.0, currencyCode: 'USD', availableForSale: true }
      ],
      inStock: true,
      tags: ['Headwear', 'Merch'],
      provider,
    }
  ];
}
