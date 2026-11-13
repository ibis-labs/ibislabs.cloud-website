"use client";

import React, { useState } from "react";
import { IbisLogoEtch } from "@/portfolio-export/react/animations/IbisLogoEtch";
import { DecryptionHeader } from "@/portfolio-export/react/animations/seshat/euclid/DecryptionHeader";
import { NehehCircuitShowcase } from "@/portfolio-export/react/animations/neheh/NehehCircuitShowcase";
import { ObeliskRitualShowcase } from "@/portfolio-export/react/animations/obelisk/ObeliskRitualShowcase";

type ChipColor = "cyan" | "gold" | "purple" | "lime";

const CHIP_COLOR_CLASSES: Record<ChipColor, string> = {
  cyan: "vault-ink-cyan",
  gold: "vault-ink-gold",
  purple: "vault-ink-purple",
  lime: "vault-ink-lime",
};

export default function AdditionalAnimationsSection() {
  const [chipReplayKey, setChipReplayKey] = useState(0);
  const [chipColor, setChipColor] = useState<ChipColor>("cyan");

  const [decryptKey, setDecryptKey] = useState(0);
  const [decryptPhase, setDecryptPhase] = useState("teletype");
  const [decryptDone, setDecryptDone] = useState(false);

  const replayDecrypt = () => {
    setDecryptDone(false);
    setDecryptPhase("teletype");
    setDecryptKey((k) => k + 1);
  };

  return (
    <section id="interactive-rituals" className="w-full max-w-6xl scroll-mt-24 space-y-8">
      <div className="text-center space-y-2">
        <p className="text-xs font-mono text-cyber-cyan uppercase tracking-[0.25em]">
          Interactive Motion Architecture · Ibis Labs LLC
        </p>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.18em] text-white">
          Additional Motion Suites &amp; Rituals
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Self-contained vector state machines, choreographed silicon circuit
          etches, viewBox camera rigs, and multi-script cryptographic reveals.
        </p>
      </div>

      {/* Top Pair: Thoth's Silicon Chip Etch + Hieroglyph Decryption Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Thoth's Chip 11-Stage Etch */}
        <div className="thoth-showcase-card flex flex-col justify-between gap-5">
          <div className="flex items-start justify-between gap-3 border-b border-gray-800 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.16em]">
                Thoth&apos;s Chip Splash Etch
              </h3>
              <p className="text-[11px] font-mono text-cyber-cyan uppercase tracking-widest mt-0.5">
                11-Stage Silicon Die &amp; Sacred Ibis Trace
              </p>
            </div>
            <span className="text-[10px] border border-cyber-cyan/60 text-cyber-cyan px-2 py-0.5 rounded font-mono uppercase">
              Click to Replay
            </span>
          </div>

          <div className="rounded-lg border border-gray-800 bg-black p-6 flex flex-col items-center justify-center min-h-[260px]">
            <div key={chipReplayKey} className={CHIP_COLOR_CLASSES[chipColor]}>
              <IbisLogoEtch
                size={195}
                replayOnClick
                className="text-current"
              />
            </div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-3">
              Inner Die → Ticks → Sacred Ibis → Package → 16 Outer Pins
            </p>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Custom vector emblem engineered by <strong className="text-white">Ibis Labs LLC</strong>.
            Click the silicon chip directly or use the controls below to replay
            the 2.65-second 11-stage circuit welding sequence in different neon
            substrates.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-800">
            <button
              type="button"
              onClick={() => setChipReplayKey((k) => k + 1)}
              className="thoth-btn thoth-btn-active"
            >
              Replay 11-Stage Etch
            </button>

            <div className="flex flex-wrap gap-1.5">
              {(["cyan", "gold", "purple", "lime"] as ChipColor[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setChipColor(c)}
                  className={`thoth-btn ${chipColor === c ? "thoth-btn-active" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Multi-Script Hieroglyph Decryption Sequence */}
        <div className="thoth-showcase-card flex flex-col justify-between gap-5">
          <div className="flex items-start justify-between gap-3 border-b border-gray-800 pb-3">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.16em]">
                Hieroglyph Decryption Header
              </h3>
              <p className="text-[11px] font-mono text-cyber-cyan uppercase tracking-widest mt-0.5">
                Hieroglyph → Ancient Greek → English Morph
              </p>
            </div>
            <span className="text-[10px] border border-fuchsia-500/60 text-fuchsia-300 px-2 py-0.5 rounded font-mono uppercase">
              Phase: {decryptDone ? "complete" : decryptPhase}
            </span>
          </div>

          <div className="rounded-lg border border-gray-800 bg-black p-6 flex flex-col items-center justify-center min-h-[260px] overflow-x-auto">
            <DecryptionHeader
              key={decryptKey}
              initialDelay={450}
              interLineDelay={650}
              onPhaseChange={(p) => setDecryptPhase(p)}
              onComplete={() => setDecryptDone(true)}
            />
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Four-phase cryptographic title sequence: blinking scribe teletype of
            phonetic Egyptian glyphs, accelerating glyph scramble, geometric lock
            into Greek (<span className="text-amber-300 font-mono">ΕΥΚΛΕΙΔΗΣ ΣΤΟΙΧΕΙΑ</span>),
            and spring cell-collapse into <span className="text-amber-300 font-mono">EUCLID ELEMENTS</span>.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-800">
            <button
              type="button"
              onClick={replayDecrypt}
              className="thoth-btn thoth-btn-purple"
            >
              Replay Decryption Sequence
            </button>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              17-Cell Synchronized Grid
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Pair: Neheh-Circuit Shen Ring + Obelisk of Istanbul & Nedjem Bastet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-2">
          <NehehCircuitShowcase size={300} />
          <p className="text-[11px] text-gray-400 px-1 leading-relaxed">
            <span className="text-cyber-cyan font-mono uppercase">Controls:</span>{" "}
            Select a preset above or tap individual Decan 1–10, Iris 1–7, Outer,
            and Outermost ring buttons to cycle commitment states across the
            custom 36-rib SMIL harp-arpeggio SVG by{" "}
            <strong className="text-white">Ibis Labs LLC</strong>.
          </p>
        </div>

        <div className="space-y-2">
          <ObeliskRitualShowcase autoPlay={false} />
          <p className="text-[11px] text-gray-400 px-1 leading-relaxed">
            <span className="text-cyber-cyan font-mono uppercase">Controls:</span>{" "}
            Switch animated SVG <code className="text-cyber-cyan">viewBox</code>{" "}
            cameras (<em>Summit</em>, <em>Pedestal</em>, <em>Nedjem Bastet</em>{" "}
            121-path cat guardian) or click the monument 3 times ({" "}
            <span className="text-fuchsia-300 font-mono">Knock 3/3</span>) to
            trigger hero-glyph migration into the hidden keypad.
          </p>
        </div>
      </div>
    </section>
  );
}

