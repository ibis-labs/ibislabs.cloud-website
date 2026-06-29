import Link from "next/link";
import Image from "next/image";
import AnimatedLogo from "@/components/AnimatedLogo";
import StewardshipCounter from "@/components/StewardshipCounter";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-24 relative selection:bg-cyber-cyan selection:text-black">
      
      {/* Background Grid Effect (Optional subtle texture) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center text-center mb-20 w-full max-w-4xl">
        <div className="relative w-56 h-56 md:w-80 md:h-80 mb-12 mx-auto flex items-center justify-center">
          <AnimatedLogo />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-white uppercase mb-2">
          Ibis Labs LLC
        </h1>
        
        <p className="text-gray-300 italic text-lg md:text-2xl tracking-widest mb-8">Digital Stewardship & Architecture</p>

        <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mb-4">
          Specializing in robust, secure, and dynamic progressive web applications built on the rock-solid foundation of Google Cloud and Firebase. We couple high-level backend architecture with user-friendly interfaces to deliver professional digital platforms designed for reliability and speed.
        </p>
      </section>

      {/* --- MANIFESTO SECTION --- */}
      <section className="w-full max-w-2xl mb-24 relative group">
        {/* Decorative borders */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-cyan opacity-50 group-hover:opacity-80 transition duration-500 blur rounded-lg"></div>
        
        <div className="relative bg-black border border-gray-600 p-8 md:p-12 rounded-lg shadow-[0_0_50px_-12px_rgba(0,255,255,0.1)]">
          <h2 className="text-2xl text-cyber-cyan mb-6 uppercase tracking-widest border-b border-gray-800 pb-2 inline-block">
            Core Values
          </h2>

          <ul className="flex flex-col gap-4 mb-8 text-gray-300 text-sm md:text-base">
            <li className="flex items-start">
              <span className="text-cyber-cyan mr-2 mt-0.5">▹</span>
              <span><strong>Trustworthiness</strong> — The baseline of every relationship we build.</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyber-cyan mr-2 mt-0.5">▹</span>
              <span><strong>Uncompromising Integrity</strong> — Doing things the right way, every single time, without exception.</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyber-cyan mr-2 mt-0.5">▹</span>
              <span><strong>Focused Execution</strong> — Eliminating the noise, locking in on the target, and delivering.</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyber-cyan mr-2 mt-0.5">▹</span>
              <span><strong>Faith in The Grind</strong> — Embracing the daily discipline required to achieve elite results.</span>
            </li>
          </ul>

          <hr className="border-gray-800 my-6" />

          <blockquote className="border-l-2 border-cyber-cyan pl-4 italic text-lg text-gray-100">
            "A successful outcome is not a question of <span className="text-cyber-cyan font-bold">IF</span>, but <span className="text-cyber-cyan font-bold">WHEN</span>."
          </blockquote>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="w-full max-w-5xl">
        <h3 className="text-center text-gray-200 mb-8 uppercase tracking-widest text-lg md:text-xl">Current Product Lineup</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="group border border-cyber-cyan ring-1 ring-cyber-cyan/40 ring-offset-2 ring-offset-black bg-black/50 p-6 rounded hover:ring-2 hover:ring-cyber-cyan hover:shadow-[0_0_28px_rgba(0,255,255,0.35)] transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Image src="/HOA-hub-icon-512x512.png" alt="HOA-hub logo" width={36} height={36} className="rounded" />
                <h4 className="text-xl text-white group-hover:text-cyber-cyan transition-colors">HOA-hub.cloud</h4>
              </div>
              <span className="text-xs border border-cyber-cyan text-cyber-cyan px-2 py-1 rounded">Live in Beta</span>
            </div>
            <p className="text-gray-400 text-sm">
              Facilitating transparent and accountable community management.
            </p>
            <div className="mt-3 border border-cyber-cyan/30 bg-cyber-cyan/5 rounded px-3 py-2 text-xs text-cyber-cyan">
              <span className="font-bold">Get started for free!</span> We&apos;re looking for 5 small to medium HOAs based in Washington State to join our beta program.
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 text-xs">
              <a
                href="mailto:pete@ibislabs.cloud?subject=HOA-hub.cloud%20Demo%20Request&body=Hi%20Pete%2C%0A%0AI%27d%20like%20to%20schedule%20a%20demo%20for%20HOA-hub.cloud.%0A%0A---%20My%20Information%20---%0AName%3A%20%0APhone%3A%20%0AEmail%3A%20%0A%0APreferred%20Contact%20Method%20(mark%20one)%3A%0A%5B%20%5D%20Call%20%20%5B%20%5D%20Text%20%20%5B%20%5D%20Email%0A%0A---%20Preferred%20Demo%20Time%20---%0ADate%3A%20%0ATime%3A%20%0ATime%20Zone%3A%20%0A%0AAdditional%20notes%3A%0A"
                className="text-cyber-cyan/70 hover:text-cyber-cyan border border-cyber-cyan/40 hover:border-cyber-cyan px-2 py-1 rounded tracking-wider uppercase transition-colors"
              >
                Schedule a Demo
              </a>
              <a
                href="https://www.hoa-hub.cloud/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-cyber-cyan hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.9)] transition-all"
              >
                <span className="tracking-wider uppercase">Visit</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <a href="https://thoths-notebook.ibislabs.cloud" target="_blank" rel="noopener noreferrer" className="group border border-cyber-cyan ring-1 ring-cyber-cyan/40 ring-offset-2 ring-offset-black bg-black/50 p-6 rounded hover:ring-2 hover:ring-cyber-cyan hover:shadow-[0_0_28px_rgba(0,255,255,0.35)] active:scale-[0.97] transition-all duration-200 block">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Image src="/thoth-icon-192x192.png" alt="Thoth's Notebook logo" width={36} height={36} className="rounded" />
                <h4 className="text-xl text-white group-hover:text-cyber-cyan transition-colors">Thoth's Notebook</h4>
              </div>
              <span className="text-xs border border-cyber-cyan text-cyber-cyan px-2 py-1 rounded">Live</span>
            </div>
            <p className="text-gray-400 text-sm">
              Cyber-Egyptian productivity suite: Tasks, daily recurring rituals, secure notes, E2E encrypted messaging, and complete workout system.
            </p>
            <div className="mt-4 flex items-center justify-end gap-1 text-xs text-cyber-cyan group-hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.9)] transition-all">
              <span className="tracking-wider uppercase">Visit</span>
              <span>↗</span>
            </div>
          </a>

          {/* Card 3 */}
          <div className="group border border-cyber-cyan ring-1 ring-cyber-cyan/40 ring-offset-2 ring-offset-black bg-black/50 p-6 rounded hover:ring-2 hover:ring-cyber-cyan hover:shadow-[0_0_28px_rgba(0,255,255,0.35)] transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Image src="/trainer-notebook-pro-icon-512.png" alt="Trainer Notebook Pro logo" width={36} height={36} className="rounded bg-white p-0.5" />
                <h4 className="text-xl text-white group-hover:text-cyber-cyan transition-colors">Trainer Notebook Pro</h4>
              </div>
              <span className="text-xs border border-cyber-cyan text-cyber-cyan px-2 py-1 rounded">Live</span>
            </div>
            <p className="text-gray-400 text-sm">
              Zero-knowledge architecture fitness platform for trainers and their clients, as well as individual athletes and their friends — program workouts, log sessions, and track progress.
            </p>
            <div className="mt-4 flex items-center justify-between gap-2 text-xs">
              <a
                href="mailto:pete@ibislabs.cloud?subject=Trainer%20Notebook%20Pro%20Demo%20Request&body=Hi%20Pete%2C%0A%0AI%27d%20like%20to%20schedule%20a%20demo%20for%20Trainer%20Notebook%20Pro.%0A%0A---%20My%20Information%20---%0AName%3A%20%0APhone%3A%20%0AEmail%3A%20%0A%0APreferred%20Contact%20Method%20(mark%20one)%3A%0A%5B%20%5D%20Call%20%20%5B%20%5D%20Text%20%20%5B%20%5D%20Email%0A%0A---%20Preferred%20Demo%20Time%20---%0ADate%3A%20%0ATime%3A%20%0ATime%20Zone%3A%20%0A%0AAdditional%20notes%3A%0A"
                className="text-cyber-cyan/70 hover:text-cyber-cyan border border-cyber-cyan/40 hover:border-cyber-cyan px-2 py-1 rounded tracking-wider uppercase transition-colors"
              >
                Schedule a Demo
              </a>
              <a
                href="https://trainer-notebook-pro.ibislabs.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-cyber-cyan hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.9)] transition-all"
              >
                <span className="tracking-wider uppercase">Visit</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Card 4 */}
          <Link href="/shop" className="group border border-cyber-cyan ring-1 ring-cyber-cyan/40 ring-offset-2 ring-offset-black bg-black/50 p-6 rounded hover:ring-2 hover:ring-cyber-cyan hover:shadow-[0_0_28px_rgba(0,255,255,0.35)] active:scale-[0.97] transition-all duration-200 block">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-cyber-cyan/20 border border-cyber-cyan flex items-center justify-center text-cyber-cyan font-bold text-sm">
                  ⚡
                </div>
                <h4 className="text-xl text-white group-hover:text-cyber-cyan transition-colors">Studio Merch & E-commerce</h4>
              </div>
              <span className="text-xs border border-cyber-cyan text-cyber-cyan px-2 py-1 rounded">Live Demo</span>
            </div>
            <p className="text-gray-400 text-sm">
              Headless e-commerce architecture showcase featuring real-time switching between Shopify Direct and Fourthwall Automated fulfillment engines.
            </p>
            <div className="mt-4 flex items-center justify-end gap-1 text-xs text-cyber-cyan group-hover:drop-shadow-[0_0_6px_rgba(0,255,255,0.9)] transition-all">
              <span className="tracking-wider uppercase font-mono">Explore Showcase</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* --- LEGAL SECTION --- */}
      <section className="w-full max-w-5xl mt-12">
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          <Link href="/privacy" className="text-white hover:text-cyber-cyan border border-white hover:border-cyber-cyan px-4 py-2 rounded tracking-wider uppercase transition-colors hover:shadow-[0_0_12px_rgba(0,255,255,0.3)]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-white hover:text-cyber-cyan border border-white hover:border-cyber-cyan px-4 py-2 rounded tracking-wider uppercase transition-colors hover:shadow-[0_0_12px_rgba(0,255,255,0.3)]">
            Terms of Service
          </Link>
          <Link href="/security" className="text-white hover:text-cyber-cyan border border-white hover:border-cyber-cyan px-4 py-2 rounded tracking-wider uppercase transition-colors hover:shadow-[0_0_12px_rgba(0,255,255,0.3)]">
            Security Stance
          </Link>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section className="w-full max-w-2xl mt-24">
        <h3 className="text-center text-gray-200 mb-8 uppercase tracking-widest text-base">Contact</h3>
        <div className="border border-gray-600 bg-black/50 p-8 rounded grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-white">
          <div className="flex flex-col gap-1">
            <span className="text-cyber-cyan uppercase tracking-widest text-xs mb-1">Principal</span>
            <span className="text-white font-semibold">Peter Blunk</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-cyber-cyan uppercase tracking-widest text-xs mb-1">Email</span>
            <a href="mailto:pete@ibislabs.cloud" className="text-white hover:text-cyber-cyan transition-colors">pete@ibislabs.cloud</a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-cyber-cyan uppercase tracking-widest text-xs mb-1">Phone</span>
            <a href="tel:+12063533981" className="text-white hover:text-cyber-cyan transition-colors">206-353-3981</a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-cyber-cyan uppercase tracking-widest text-xs mb-1">Address</span>
            <span>127 SW 154th St, Suite 307</span>
            <span>Burien, WA 98166</span>
          </div>
        </div>
      </section>

      {/* --- ON THE GRIND CLOCK --- */}
      <div className="mt-16">
        <StewardshipCounter />
      </div>

      <footer className="mt-24 text-center">
        <div className="flex items-center justify-center gap-4 mb-2">
          <img src="/KaTouche.svg" alt="Ka Touche" className="h-40 w-auto" style={{filter: 'brightness(2.5) saturate(100%) drop-shadow(0 0 0px rgba(0,255,136,1)) drop-shadow(0 0 25px rgba(0,255,136,0.9))', mixBlendMode: 'screen'}} />
          <div className="flex flex-col items-start gap-1">
            <span className="text-sm text-cyber-cyan tracking-widest uppercase">Digital Service by Ka</span>
            <span className="text-xs text-cyber-cyan/60 tracking-wide">Powered by The Ka Terminal at Ibis Labs LLC</span>
          </div>
        </div>
        <div className="text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Ibis Labs LLC. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}
