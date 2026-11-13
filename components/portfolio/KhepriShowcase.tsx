"use client";

import React, { useState } from "react";
import { KhepriEtchAnimation } from "@/portfolio-export/react/animations/KhepriEtchAnimation";

export default function KhepriShowcase() {
  const [isGoldSealed, setIsGoldSealed] = useState(false);
  const [showLiturgy, setShowLiturgy] = useState(true);
  const [showSubstrate, setShowSubstrate] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

  const handleToggleGold = () => {
    setIsGoldSealed((prev) => !prev);
  };

  const handleReplay = () => {
    setIsGoldSealed(false);
    setReplayKey((prev) => prev + 1);
  };

  return (
    <section id="khepri-scarab" className="w-full max-w-6xl scroll-mt-24">
      <div className="border border-cyber-cyan ring-1 ring-cyber-cyan/40 ring-offset-2 ring-offset-black bg-black/80 rounded-lg p-6 md:p-10 shadow-[0_0_50px_-12px_rgba(31,170,254,0.18)]">
        {/* Top Attribution & Title Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-5 mb-8">
          <div>
            <p className="text-xs font-mono text-cyber-cyan uppercase tracking-[0.25em] mb-1">
              Featured Exhibit 01 · Custom Vector Graphic by Ibis Labs LLC
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-[0.18em]">
              Khepri Winged Scarab Etch
            </h2>
          </div>
          <span className="text-xs border border-cyber-cyan text-cyber-cyan px-3 py-1 rounded uppercase tracking-wider font-mono">
            Original SVG + Framer Motion
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Stage Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-between rounded-lg border border-gray-800 bg-black p-6 sm:p-8 shadow-inner">
            <div className="text-center mb-3">
              <span className="text-xs font-mono uppercase tracking-[0.35em] text-cyber-cyan/90">
                The Evening Chronicle
              </span>
            </div>

            {showLiturgy && (
              <div className="flex flex-col gap-0.5 text-center khepri-liturgy-text text-sm sm:text-base tracking-wider mb-2">
                <span>Review your Ma&apos;at.</span>
                <span>Reflect on your actions.</span>
                <span>Imagine tomorrow.</span>
                <span>Seal the record.</span>
              </div>
            )}

            {/* Clickable Scarab Canvas */}
            <div
              role="button"
              tabIndex={0}
              aria-label={
                isGoldSealed
                  ? "Unseal Khepri Protocol and resume spectrum cycle"
                  : "Initiate Khepri Protocol and seal in Solar Gold"
              }
              onClick={handleToggleGold}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleToggleGold();
                }
              }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex flex-col items-center justify-center cursor-pointer group focus:outline-none my-2"
            >
              <KhepriEtchAnimation
                key={replayKey}
                className="w-full h-full"
                forceGold={isGoldSealed}
                showSubstrate={showSubstrate}
              />

              <div className="absolute bottom-1 pointer-events-none text-center">
                {!isGoldSealed ? (
                  <p className="text-cyber-cyan text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em] animate-pulse">
                    Click Scarab to Seal Protocol
                  </p>
                ) : (
                  <p className="text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-[0.35em]">
                    Khepri Protocol Sealed
                  </p>
                )}
              </div>
            </div>

            {/* Live Status Readout */}
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400 mt-2 mb-5 text-center">
              {isGoldSealed
                ? "STATE: SOLAR GOLD LOCKED · SPECTRUM CYCLE PAUSED"
                : "STATE: 11-TIER FEATHER GLISSANDO · 8S NEON SPECTRUM ACTIVE"}
            </p>

            {/* Control Deck */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full pt-4 border-t border-gray-800/90">
              <button
                type="button"
                onClick={handleReplay}
                className="thoth-btn"
              >
                Replay Full Etch
              </button>

              <button
                type="button"
                onClick={handleToggleGold}
                className={`thoth-btn thoth-btn-gold ${
                  isGoldSealed ? "thoth-btn-gold-active" : ""
                }`}
              >
                {isGoldSealed ? "Unseal Solar Gold" : "Seal Solar Gold"}
              </button>

              <button
                type="button"
                onClick={() => setShowLiturgy((prev) => !prev)}
                className={`thoth-btn thoth-btn-purple ${
                  showLiturgy ? "thoth-btn-purple-active" : ""
                }`}
              >
                Liturgy: {showLiturgy ? "On" : "Off"}
              </button>

              <button
                type="button"
                onClick={() => setShowSubstrate((prev) => !prev)}
                className={`thoth-btn ${showSubstrate ? "thoth-btn-active" : ""}`}
              >
                Cartouche: {showSubstrate ? "On" : "Off"}
              </button>
            </div>
          </div>

          {/* Craftsmanship & Controls Explanation Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="border border-gray-800 bg-black/60 rounded-lg p-6">
              <h3 className="text-sm text-cyber-cyan uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">
                In-House Vector Craftsmanship
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                The <strong>Khepri Winged Scarab</strong> is a 100% custom vector
                graphic hand-illustrated and engineered by{" "}
                <strong className="text-white">Ibis Labs LLC</strong> for{" "}
                <em>Thoth&apos;s Notebook</em>. Every anatomical contour—upper
                and lower thorax plates, head crest, antennae, fore and hind
                legs, dual wing frames, and{" "}
                <strong className="text-cyber-cyan">
                  11 mirrored feather tiers
                </strong>
                —was authored as clean SVG Bezier geometry.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                On mount, Framer Motion choreographs a sequential spring{" "}
                <code className="text-cyber-cyan font-mono">pathLength</code>{" "}
                glissando from the central body outward across all 44 feather
                strokes while diffusing pearl solar and lunar orbs into an
                8-second neon spectrum loop.
              </p>
            </div>

            <div className="border border-gray-800 bg-black/60 rounded-lg p-6">
              <h3 className="text-sm text-cyber-cyan uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">
                Interactive Controls Guide
              </h3>
              <ul className="flex flex-col gap-3.5 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyber-cyan mr-2.5 mt-0.5 shrink-0">▹</span>
                  <span>
                    <strong className="text-white">Click Scarab / Seal Solar Gold:</strong>{" "}
                    Clicking directly on the vector artwork (or pressing{" "}
                    <span className="text-amber-300 font-mono text-xs">
                      Seal Solar Gold
                    </span>
                    ) initiates the Khepri Protocol—locking the scarab, orbs,
                    and cartouche in radiant gold and halting the color cycle.
                    Click again to unseal.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyber-cyan mr-2.5 mt-0.5 shrink-0">▹</span>
                  <span>
                    <strong className="text-white">Replay Full Etch:</strong>{" "}
                    Resets the canvas and replays the entire staggered vector
                    path-drawing animation from thorax to wingtips.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyber-cyan mr-2.5 mt-0.5 shrink-0">▹</span>
                  <span>
                    <strong className="text-white">Liturgy Toggle:</strong>{" "}
                    Shows or hides the ceremonial four-line{" "}
                    <em>Evening Chronicle</em> reflection inscription to view the
                    piece in UI context or as standalone artwork.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyber-cyan mr-2.5 mt-0.5 shrink-0">▹</span>
                  <span>
                    <strong className="text-white">Cartouche Toggle:</strong>{" "}
                    Enables or removes the glowing obsidian cartouche substrate
                    to inspect the isolated floating SVG line-work.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

