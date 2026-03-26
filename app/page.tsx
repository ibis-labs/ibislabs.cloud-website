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
        
        <p className="text-gray-500 italic mb-8">Digital Stewardship & Architecture</p>

        <StewardshipCounter />
      </section>

      {/* --- MANIFESTO SECTION --- */}
      <section className="w-full max-w-2xl mb-24 relative group">
        {/* Decorative borders */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-cyan opacity-30 group-hover:opacity-70 transition duration-500 blur rounded-lg"></div>
        
        <div className="relative bg-black border border-gray-800 p-8 md:p-12 rounded-lg shadow-[0_0_50px_-12px_rgba(0,255,255,0.1)]">
          <h2 className="text-2xl text-cyber-cyan mb-6 uppercase tracking-widest border-b border-gray-800 pb-2 inline-block">
            Core Values
          </h2>
          
          <ul className="grid grid-cols-2 gap-4 mb-8 text-gray-300 text-sm md:text-base">
            <li className="flex items-center"><span className="text-cyber-cyan mr-2">▹</span> Trustworthiness</li>
            <li className="flex items-center"><span className="text-cyber-cyan mr-2">▹</span> Integrity</li>
            <li className="flex items-center"><span className="text-cyber-cyan mr-2">▹</span> Focus</li>
            <li className="flex items-center"><span className="text-cyber-cyan mr-2">▹</span> Faith in The Grind</li>
          </ul>

          <blockquote className="border-l-2 border-cyber-cyan pl-4 italic text-lg text-gray-100">
            "Successful outcome is not a question of <span className="text-cyber-cyan font-bold">IF</span>, but <span className="text-cyber-cyan font-bold">WHEN</span>."
          </blockquote>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="w-full max-w-5xl">
        <h3 className="text-center text-gray-500 mb-8 uppercase tracking-widest text-sm">Current Operations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <a href="https://www.hoa-hub.cloud/" target="_blank" rel="noopener noreferrer" className="group border border-gray-800 bg-black/50 p-6 rounded hover:border-cyber-cyan transition-colors duration-300 block">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl text-white group-hover:text-cyber-cyan transition-colors">HOA-hub.cloud</h4>
              <span className="text-xs border border-cyber-cyan text-cyber-cyan px-2 py-1 rounded">In Progress</span>
            </div>
            <p className="text-gray-400 text-sm">
              Facilitating transparent and accountable community management.
            </p>
          </a>

          {/* Card 2 */}
          <a href="https://thoths-notebook.unclepetelaboratories.net/" target="_blank" rel="noopener noreferrer" className="group border border-gray-800 bg-black/50 p-6 rounded hover:border-cyber-cyan transition-colors duration-300 block">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl text-white group-hover:text-cyber-cyan transition-colors">Thoth's Notebook</h4>
              <span className="text-xs border border-cyber-cyan text-cyber-cyan px-2 py-1 rounded">Live</span>
            </div>
            <p className="text-gray-400 text-sm">
              The digital archive and operational brain of Ibis Labs.
            </p>
          </a>
        </div>
      </section>

      <footer className="mt-24 text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} Ibis Labs LLC. All Systems Nominal.
      </footer>
    </main>
  );
}
