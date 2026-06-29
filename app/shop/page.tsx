import type { Metadata } from 'next';
import Link from 'next/link';
import MerchStore from '@/components/MerchStore';

export const metadata: Metadata = {
  title: 'Studio Merch & Headless Architecture Demo | Ibis Labs LLC',
  description: 'Demonstration of normalized dual e-commerce architecture supporting Shopify Headless and Fourthwall Automated fulfillment.',
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyber-cyan selection:text-black relative py-12">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* Top Header Navigation Link */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-cyber-cyan hover:underline uppercase tracking-widest font-mono"
        >
          <span>←</span> Back to Main Terminal
        </Link>
      </div>

      {/* Main Merch Store Experience */}
      <MerchStore />
    </main>
  );
}
