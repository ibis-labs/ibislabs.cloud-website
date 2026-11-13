import type { Metadata } from "next";
import Link from "next/link";
import "./portfolio.css";
import KhepriShowcase from "@/components/portfolio/KhepriShowcase";
import SeshatShowcase from "@/components/portfolio/SeshatShowcase";
import AdditionalAnimationsSection from "@/components/portfolio/AdditionalAnimationsSection";
import VectorVaultGallery from "@/components/portfolio/VectorVaultGallery";

export const metadata: Metadata = {
  title: "Vector Graphics & Motion Portfolio | Ibis Labs LLC",
  description:
    "Original custom vector graphics, interactive SVG chronometers, and choreographed animations designed and engineered by Ibis Labs LLC.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-6 md:p-16 lg:p-24 relative selection:bg-cyber-cyan selection:text-black">
      {/* Signature Main-Page Background Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* Top Breadcrumb */}
      <div className="w-full max-w-6xl mb-8 flex items-center justify-between text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyber-cyan hover:drop-shadow-[0_0_6px_rgba(31,170,254,0.9)] uppercase tracking-widest font-mono transition-all"
        >
          <span>←</span> Main Terminal
        </Link>
        <span className="text-gray-500 font-mono uppercase tracking-widest hidden sm:inline">
          Ibis Labs LLC · Original SVG &amp; Motion Archive
        </span>
      </div>

      {/* Portfolio Hero */}
      <header className="flex flex-col items-center text-center mb-16 w-full max-w-4xl">
        <span className="text-xs font-mono text-cyber-cyan uppercase tracking-[0.28em] border border-cyber-cyan/40 bg-cyber-cyan/5 px-3 py-1 rounded mb-5">
          In-House Vector Art &amp; Motion Engineering
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-[0.18em] text-white uppercase mb-4">
          Vector &amp; Motion Portfolio
        </h1>

        <p className="text-gray-300 italic text-base md:text-xl tracking-widest mb-6">
          Bespoke SVG Craftsmanship by Ibis Labs LLC
        </p>

        <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mb-8">
          Beyond cloud architecture and zero-knowledge web platforms,{" "}
          <strong className="text-white">Ibis Labs LLC</strong> designs custom
          vector illustrations, silicon-etched emblems, and interactive SVG
          instruments from scratch—combining hand-drawn Inkscape Bezier paths
          with Framer Motion, CSS keyframes, and the Web Animations API.
        </p>

        {/* Quick Section Jump Bar */}
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          <a
            href="#khepri-scarab"
            className="text-cyber-cyan border border-cyber-cyan bg-cyber-cyan/10 hover:bg-cyber-cyan/20 px-4 py-2 rounded tracking-wider uppercase transition-all shadow-[0_0_14px_rgba(31,170,254,0.25)]"
          >
            01 · Khepri Scarab
          </a>
          <a
            href="#seshat-chronometer"
            className="text-cyber-cyan border border-cyber-cyan bg-cyber-cyan/10 hover:bg-cyber-cyan/20 px-4 py-2 rounded tracking-wider uppercase transition-all shadow-[0_0_14px_rgba(31,170,254,0.25)]"
          >
            02 · Seshat Chronometer
          </a>
          <a
            href="#interactive-rituals"
            className="text-white hover:text-cyber-cyan border border-gray-700 hover:border-cyber-cyan px-4 py-2 rounded tracking-wider uppercase transition-colors"
          >
            03 · Motion Suites
          </a>
          <a
            href="#vector-vault"
            className="text-white hover:text-cyber-cyan border border-gray-700 hover:border-cyber-cyan px-4 py-2 rounded tracking-wider uppercase transition-colors"
          >
            04 · Vector Vault
          </a>
        </div>
      </header>

      {/* Main Exhibits Stack */}
      <div className="w-full flex flex-col items-center gap-20">
        {/* Featured Exhibit 1: Khepri Scarab */}
        <KhepriShowcase />

        {/* Featured Exhibit 2: Seshat Chronometer */}
        <SeshatShowcase />

        {/* Additional Interactive Animations from portfolio-export */}
        <AdditionalAnimationsSection />

        {/* Curated Custom SVG Vault */}
        <VectorVaultGallery />
      </div>

      {/* Bottom Callout Card */}
      <section className="w-full max-w-4xl mt-24 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-cyan opacity-40 group-hover:opacity-75 transition duration-500 blur rounded-lg" />
        <div className="relative bg-black border border-gray-700 p-8 md:p-10 rounded-lg text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-[0.18em]">
            Custom Brand Emblems &amp; Interactive UI Motion
          </h2>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Every vector artifact and interactive animation showcased above was
            designed and built in-house by{" "}
            <strong className="text-cyber-cyan">Ibis Labs LLC</strong>. Looking
            for distinctive custom vector identity work alongside high-trust web
            engineering?
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2 text-xs">
            <Link
              href="/#contact"
              className="border border-cyber-cyan bg-cyber-cyan/15 hover:bg-cyber-cyan/25 text-cyber-cyan px-5 py-2.5 rounded uppercase tracking-widest font-bold transition-all shadow-[0_0_16px_rgba(31,170,254,0.3)]"
            >
              Contact Ibis Labs →
            </Link>
            <Link
              href="/"
              className="border border-gray-600 hover:border-cyber-cyan text-white hover:text-cyber-cyan px-5 py-2.5 rounded uppercase tracking-widest transition-colors"
            >
              ← Return to Main Page
            </Link>
          </div>
        </div>
      </section>

      <footer className="mt-20 text-center text-gray-400 text-xs space-y-1">
        <p className="text-cyber-cyan/80 uppercase tracking-widest">
          Original Vector Artwork &amp; Motion Architecture · Ibis Labs LLC
        </p>
        <p>&copy; {new Date().getFullYear()} Ibis Labs LLC. All Rights Reserved.</p>
      </footer>
    </main>
  );
}

