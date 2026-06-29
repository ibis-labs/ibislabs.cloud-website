'use client';

import React from 'react';
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
    <div className="w-full max-w-4xl mx-auto mb-10 p-6 bg-black/80 border border-cyber-cyan/40 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.15)] backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
            <h2 className="text-lg md:text-xl text-white uppercase tracking-wider font-bold">
              Architecture Demonstration Control
            </h2>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            Toggle backend e-commerce fulfillment engine in real-time. UI components remain normalized.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center bg-black p-1 rounded-md border border-gray-700 w-full md:w-auto justify-center">
          <button
            type="button"
            onClick={() => onProviderChange('shopify')}
            className={`flex-1 md:flex-none px-4 py-2 text-xs md:text-sm font-semibold tracking-wider uppercase rounded transition-all duration-300 ${
              currentProvider === 'shopify'
                ? 'bg-cyber-cyan text-black shadow-[0_0_15px_rgba(0,255,255,0.6)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Shopify Headless (Default)
          </button>
          <button
            type="button"
            onClick={() => onProviderChange('fourthwall')}
            className={`flex-1 md:flex-none px-4 py-2 text-xs md:text-sm font-semibold tracking-wider uppercase rounded transition-all duration-300 ${
              currentProvider === 'fourthwall'
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Fourthwall Showcase
          </button>
        </div>
      </div>

      {/* Dynamic Architecture Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3 bg-black/60 border border-gray-800 rounded">
          <span className="text-gray-500 uppercase block font-mono text-[10px] mb-1">Fulfillment Model</span>
          <span className="text-white font-semibold">
            {currentProvider === 'shopify' ? 'Manual Bulk Self-Fulfillment' : 'Automated Merchant of Record'}
          </span>
        </div>

        <div className="p-3 bg-black/60 border border-gray-800 rounded">
          <span className="text-gray-500 uppercase block font-mono text-[10px] mb-1">API Protocol</span>
          <span className="text-white font-semibold font-mono">
            {currentProvider === 'shopify' ? 'GraphQL Storefront API' : 'REST Storefront API'}
          </span>
        </div>

        <div className="p-3 bg-black/60 border border-gray-800 rounded">
          <span className="text-gray-500 uppercase block font-mono text-[10px] mb-1">Checkout Execution</span>
          <span className="text-white font-semibold">
            {currentProvider === 'shopify' ? 'GraphQL Token Mutation Redirect' : 'Direct URL Param Query Redirect'}
          </span>
        </div>
      </div>
    </div>
  );
}
