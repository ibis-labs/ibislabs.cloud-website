import Link from 'next/link';

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyber-cyan selection:text-black relative flex flex-col items-center justify-center p-6 text-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-md w-full border border-red-500/50 bg-black/60 p-8 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
          ✕
        </div>
        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mb-4">
          Checkout Canceled
        </h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          The transaction was canceled. No charges were made. If you had any issues, feel free to try again.
        </p>
        <Link
          href="/shop"
          className="inline-block w-full py-3 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black font-bold uppercase tracking-widest rounded transition-all duration-300 shadow-[0_0_15px_rgba(0,255,255,0.15)]"
        >
          Return to Studio Shop
        </Link>
      </div>
    </main>
  );
}
