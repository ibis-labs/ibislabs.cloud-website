'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { EcommerceProvider, Product, ProductVariant } from '@/lib/types/ecommerce';
import { getProducts } from '@/lib/services/ecommerce';
import { executeCheckoutRedirect, CartItem } from '@/lib/services/checkout';
import AdminProviderSwitch from './AdminProviderSwitch';

export default function MerchStore() {
  const [provider, setProvider] = useState<EcommerceProvider>('shopify');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<{ product: Product; variant: ProductVariant; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  // Load products when provider changes
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getProducts(provider);
        setProducts(data);
        
        // Initialize default variants for each product
        const initialVariants: Record<string, string> = {};
        data.forEach((p) => {
          if (p.variants.length > 0) {
            initialVariants[p.id] = p.variants[0].id;
          }
        });
        setSelectedVariants(initialVariants);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [provider]);

  const handleAddToCart = (product: Product) => {
    const variantId = selectedVariants[product.id] || product.variants[0]?.id;
    const variant = product.variants.find((v) => v.id === variantId) || product.variants[0];

    if (!variant) return;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.variant.id === variant.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prevCart, { product, variant, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (variantId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.variant.id === variantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; variant: ProductVariant; quantity: number }[]
    );
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const cartPayload: CartItem[] = cart.map((item) => ({
        variantId: item.variant.id,
        quantity: item.quantity,
      }));
      await executeCheckoutRedirect(cartPayload, provider);
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to initialize checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Admin Toggle Bar */}
      <AdminProviderSwitch currentProvider={provider} onProviderChange={setProvider} />

      {/* Store Header & Floating Cart Indicator */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-white">
            Studio Supply & Merch
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Demonstrating dual headless checkout routing with seamless UI consistency.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative px-4 py-2 bg-black border border-cyber-cyan text-cyber-cyan rounded flex items-center gap-2 hover:bg-cyber-cyan hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
        >
          <span className="uppercase tracking-wider text-xs md:text-sm font-semibold">Cart</span>
          {totalCartItems > 0 && (
            <span className="w-5 h-5 rounded-full bg-cyber-cyan text-black text-xs font-bold flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </button>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="h-96 rounded bg-black/40 border border-gray-800 animate-pulse p-4 flex flex-col justify-between">
              <div className="w-full h-48 bg-gray-900 rounded mb-4" />
              <div className="h-6 bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => {
            const activeVariantId = selectedVariants[product.id] || product.variants[0]?.id;
            const activeVariant = product.variants.find((v) => v.id === activeVariantId) || product.variants[0];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="group border border-cyber-cyan/50 ring-1 ring-cyber-cyan/30 bg-black/60 p-5 rounded-lg hover:ring-2 hover:ring-cyber-cyan hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Display */}
                  <div className="relative w-full h-56 bg-gray-950 rounded mb-4 overflow-hidden border border-gray-800">
                    {product.images[0] ? (
                      <>
                        {/* Primary/Front Image */}
                        <Image
                          src={product.images[0].url}
                          alt={product.images[0].altText || product.title}
                          fill
                          className={`object-cover transition-all duration-500 ${
                            product.images[1] ? 'group-hover:opacity-0' : 'group-hover:scale-105'
                          }`}
                        />
                        {/* Secondary/Back Image */}
                        {product.images[1] && (
                          <Image
                            src={product.images[1].url}
                            alt={`${product.title} - Alternative View`}
                            fill
                            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100"
                          />
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs uppercase font-mono">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur border border-cyber-cyan/40 px-2 py-1 rounded text-[10px] uppercase font-mono text-cyber-cyan">
                      {product.provider}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors mb-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div>
                  {/* Variant Selection */}
                  {product.variants.length > 1 && (
                    <div className="mb-4">
                      <label className="block text-[10px] uppercase text-gray-500 font-mono mb-1">Select Option</label>
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariants({ ...selectedVariants, [product.id]: v.id })}
                            className={`px-3 py-1 text-xs rounded border transition-all ${
                              activeVariantId === v.id
                                ? 'border-cyber-cyan bg-cyber-cyan/20 text-white font-semibold'
                                : 'border-gray-800 bg-black text-gray-400 hover:border-gray-600'
                            }`}
                          >
                            {v.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Add To Cart */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800 mt-2">
                    <div>
                      <span className="text-xs text-gray-500 uppercase block font-mono">Price</span>
                      <span className="text-lg font-bold text-white">
                        ${activeVariant ? activeVariant.price.toFixed(2) : product.priceRange.minVariantPrice.toFixed(2)}{' '}
                        <span className="text-xs text-cyber-cyan font-mono">USD</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="px-4 py-2 bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black font-semibold text-xs uppercase tracking-wider rounded transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product.inStock ? 'Add To Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Futuristic Drawer Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-black border-l border-cyber-cyan/50 p-6 z-50 flex flex-col justify-between shadow-[-10px_0_40px_rgba(0,255,255,0.2)]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white flex items-center gap-2">
                    <span>Active Order Cart</span>
                    <span className="text-xs font-mono text-cyber-cyan">({totalCartItems})</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 hover:text-cyber-cyan text-xl p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Active Provider Indicator inside Cart */}
                <div className="mb-6 p-3 bg-gray-950 border border-gray-800 rounded text-xs">
                  <span className="text-gray-500 uppercase font-mono text-[10px] block mb-1">Target Fulfillment Route</span>
                  <div className="flex items-center justify-between text-white font-semibold">
                    <span>{provider === 'shopify' ? 'Shopify Headless Checkout' : 'Fourthwall Automated Checkout'}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${provider === 'shopify' ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'bg-purple-900/40 text-purple-300'}`}>
                      {provider}
                    </span>
                  </div>
                </div>

                {/* Cart Items List */}
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 uppercase text-xs tracking-wider font-mono">
                    Your cart is currently empty.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.variant.id} className="flex items-center justify-between p-3 bg-black/60 border border-gray-800 rounded">
                        <div>
                          <h4 className="text-sm font-bold text-white">{item.product.title}</h4>
                          <span className="text-xs text-gray-400 block font-mono">Variant: {item.variant.title}</span>
                          <span className="text-xs text-cyber-cyan font-semibold block mt-1">${item.variant.price.toFixed(2)} USD</span>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-950 p-1 rounded border border-gray-800">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variant.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white border border-gray-800 rounded"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variant.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white border border-gray-800 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer & Checkout Action */}
              {cart.length > 0 && (
                <div className="border-t border-gray-800 pt-4 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400 uppercase tracking-wider font-mono">Subtotal</span>
                    <span className="text-xl font-bold text-white">${cartSubtotal.toFixed(2)} USD</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3 bg-cyber-cyan text-black font-bold uppercase tracking-widest rounded shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:bg-white transition-all duration-300 disabled:opacity-50"
                  >
                    {isCheckingOut ? 'Initializing Checkout...' : `Proceed to ${provider === 'shopify' ? 'Shopify' : 'Fourthwall'} Checkout`}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
