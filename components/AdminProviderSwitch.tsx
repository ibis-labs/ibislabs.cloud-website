'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EcommerceProvider } from '@/lib/types/ecommerce';

interface AdminProviderSwitchProps {
  currentProvider: EcommerceProvider;
  onProviderChange: (provider: EcommerceProvider) => void;
}

export default function AdminProviderSwitch({
  currentProvider,
  onProviderChange,
}: AdminProviderSwitchProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-10 p-6 bg-black/80 border border-cyber-cyan/30 rounded-lg shadow-[0_0_25px_rgba(0,255,255,0.1)] backdrop-blur-md">
      <div className="flex flex-col items-start gap-6 border-b border-gray-800 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
            <h2 className="text-lg md:text-xl text-white uppercase tracking-wider font-bold font-sans">
              Architecture Demonstration Control
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Toggle backend e-commerce fulfillment engine in real-time. UI components remain normalized.
          </p>
        </div>

        {/* Sliding Toggle Switch */}
        <div className="relative flex items-center bg-gray-950 p-1.5 rounded-full border border-gray-800 w-full max-w-xs justify-between select-none">
          <button
            type="button"
            onClick={() => onProviderChange('shopify')}
            className={`relative z-10 flex-1 py-1.5 text-center text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
              currentProvider === 'shopify' ? 'text-cyber-cyan' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Shopify
            {currentProvider === 'shopify' && (
              <motion.div
                layoutId="activeProviderIndicator"
                className="absolute inset-0 rounded-full border-2 border-cyber-cyan shadow-[0_0_12px_rgba(0,255,255,0.4)] pointer-events-none"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          
          <button
            type="button"
            onClick={() => onProviderChange('fourthwall')}
            className={`relative z-10 flex-1 py-1.5 text-center text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
              currentProvider === 'fourthwall' ? 'text-cyber-cyan' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Fourthwall
            {currentProvider === 'fourthwall' && (
              <motion.div
                layoutId="activeProviderIndicator"
                className="absolute inset-0 rounded-full border-2 border-cyber-cyan shadow-[0_0_12px_rgba(0,255,255,0.4)] pointer-events-none"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Dynamic Architecture Status Card */}
      <div className="w-full text-xs">
        <div className="p-4 bg-black/60 border border-gray-900 rounded-lg">
          <span className="text-gray-500 uppercase block font-mono text-[9px] mb-1.5 tracking-wider">Fulfillment Model</span>
          <div className="text-white font-bold text-sm mb-2">
            {currentProvider === 'shopify' ? 'Manual Bulk Self-Fulfillment' : 'Automated Merchant of Record'}
          </div>
          <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
            {currentProvider === 'shopify' 
              ? 'Obtain your own product, use Shopify to track your inventory, process payments, and collect, file, and pay any taxes due on your behalf. You take care of the order fulfillment with a handy label you print off with your customer's address collected by Shopify at checkout.'
              : 'Fourthwall produces the product from your design, processes the payment, and takes care of all the shipping. Since they are the "merchant of record", the tax liability belongs to them, not you. You just get the profit.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
