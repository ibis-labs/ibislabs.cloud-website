"use client";

import React, { useState } from "react";
import { NehehCircuitSvg, IndicatorState } from "./NehehCircuitSvg";
import { cn } from "../../utils";

const PRESETS = {
  empty: {
    label: "Empty",
    decan: Array<IndicatorState>(10).fill("unlit"),
    iris: Array<IndicatorState>(7).fill("unlit"),
    outer: "unlit" as IndicatorState,
    outermost: "unlit" as IndicatorState,
  },
  "day-5": {
    label: "Day 5",
    decan: [...Array<IndicatorState>(5).fill("active"), ...Array<IndicatorState>(5).fill("unlit")],
    iris: Array<IndicatorState>(7).fill("unlit"),
    outer: "unlit" as IndicatorState,
    outermost: "unlit" as IndicatorState,
  },
  "day-10": {
    label: "Day 10",
    decan: Array<IndicatorState>(10).fill("active"),
    iris: Array<IndicatorState>(7).fill("unlit"),
    outer: "unlit" as IndicatorState,
    outermost: "unlit" as IndicatorState,
  },
  "iris-half": {
    label: "Iris ½",
    decan: Array<IndicatorState>(10).fill("active"),
    iris: [...Array<IndicatorState>(4).fill("active"), ...Array<IndicatorState>(3).fill("unlit")],
    outer: "unlit" as IndicatorState,
    outermost: "unlit" as IndicatorState,
  },
  "day-17": {
    label: "All Iris",
    decan: Array<IndicatorState>(10).fill("active"),
    iris: Array<IndicatorState>(7).fill("active"),
    outer: "unlit" as IndicatorState,
    outermost: "unlit" as IndicatorState,
  },
  "outer-ring": {
    label: "+ Outer",
    decan: Array<IndicatorState>(10).fill("active"),
    iris: Array<IndicatorState>(7).fill("active"),
    outer: "active" as IndicatorState,
    outermost: "unlit" as IndicatorState,
  },
  full: {
    label: "Full / Akh",
    decan: Array<IndicatorState>(10).fill("active"),
    iris: Array<IndicatorState>(7).fill("active"),
    outer: "active" as IndicatorState,
    outermost: "active" as IndicatorState,
  },
  decay: {
    label: "Decay",
    decan: ["active", "active", "active", "missed", "active", "active", "missed", "missed", "active", "unlit"] as IndicatorState[],
    iris: Array<IndicatorState>(7).fill("unlit"),
    outer: "unlit" as IndicatorState,
    outermost: "unlit" as IndicatorState,
  },
} as const;

type PresetKey = keyof typeof PRESETS;

function cycle(s: IndicatorState): IndicatorState {
  if (s === "unlit") return "active";
  if (s === "active") return "missed";
  return "unlit";
}

const DECAN_CLASS_MAP: Record<IndicatorState, string> = {
  active: "nhc-toggle-active",
  missed: "nhc-toggle-missed",
  unlit: "nhc-toggle-unlit",
};

const LEGEND_ITEMS = [
  { dotClass: "nhc-dot-lime", label: "Decan — Day completed (active)", note: "Neon lime" },
  { dotClass: "nhc-dot-red", label: "Decan — Day missed", note: "Soft red" },
  { dotClass: "nhc-dot-purple", label: "Iris indicators — Sector active", note: "Bright purple" },
  { dotClass: "nhc-dot-red", label: "Outer ring — Milestone active", note: "Red" },
  { dotClass: "nhc-dot-cyan", label: "Outermost ring — Transcendent", note: "Cyber cyan" },
  { dotClass: "nhc-dot-amber", label: "Ankh / decan-bar frame", note: "Amber gold" },
  { dotClass: "nhc-dot-violet", label: "Iris circles", note: "Purple" },
];

export interface NehehCircuitShowcaseProps {
  size?: number;
  className?: string;
}

export function NehehCircuitShowcase({ size = 340, className = "" }: NehehCircuitShowcaseProps) {
  const [activePreset, setActivePreset] = useState<PresetKey | null>("full");
  const [decan, setDecan] = useState<IndicatorState[]>(Array(10).fill("active"));
  const [iris, setIris] = useState<IndicatorState[]>(Array(7).fill("active"));
  const [outer, setOuter] = useState<IndicatorState>("active");
  const [outermost, setOutermost] = useState<IndicatorState>("active");

  const loadPreset = (key: PresetKey) => {
    const p = PRESETS[key];
    setActivePreset(key);
    setDecan([...p.decan]);
    setIris([...p.iris]);
    setOuter(p.outer);
    setOutermost(p.outermost);
  };

  return (
    <div className={cn("thoth-showcase-card flex flex-col items-center gap-6", className)}>
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-cyan-400 tracking-[0.2em] uppercase">
          Neheh-Circuit
        </h3>
        <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
          Shen Ring of Commitment · Interactive State Matrix
        </p>
      </div>

      <div className="relative rounded-2xl border border-slate-800/80 bg-black/70 p-4 flex items-center justify-center">
        <NehehCircuitSvg
          decanStates={decan}
          irisStates={iris}
          outerRingState={outer}
          outermostRingState={outermost}
          size={size}
        />
      </div>

      {/* Preset strip */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => loadPreset(key)}
            className={cn("thoth-btn", activePreset === key && "thoth-btn-active")}
          >
            {PRESETS[key].label}
          </button>
        ))}
      </div>

      {/* Interactive Toggles */}
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-1.5">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
            Decan 1–10 · tap to cycle (unlit → active → missed)
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {decan.map((state, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setActivePreset(null);
                  setDecan((prev) => prev.map((s, idx) => (idx === i ? cycle(s) : s)));
                }}
                className={cn(
                  "w-9 h-9 rounded text-[10px] font-bold font-mono transition-all border",
                  DECAN_CLASS_MAP[state]
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
            Iris Sectors 1–7
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {iris.map((state, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setActivePreset(null);
                  setIris((prev) =>
                    prev.map((s, idx) => (idx === i ? (s === "active" ? "unlit" : "active") : s))
                  );
                }}
                className={cn(
                  "w-9 h-9 rounded text-[10px] font-bold font-mono transition-all border",
                  state === "active" ? "nhc-toggle-iris-on" : "nhc-toggle-unlit"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setActivePreset(null);
              setOuter((s) => (s === "active" ? "unlit" : "active"));
            }}
            className={cn(
              "py-2.5 rounded-xl border text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
              outer === "active" ? "nhc-toggle-outer-on" : "nhc-toggle-unlit"
            )}
          >
            Outer Ring · {outer}
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePreset(null);
              setOutermost((s) => (s === "active" ? "unlit" : "active"));
            }}
            className={cn(
              "py-2.5 rounded-xl border text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
              outermost === "active" ? "nhc-toggle-outermost-on" : "nhc-toggle-unlit"
            )}
          >
            Outermost Ring · {outermost}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full max-w-md rounded-xl border border-slate-800/70 p-3.5 space-y-2">
        <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500">
          Signal Legend
        </p>
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-[10px] font-mono">
            <span className={cn("nhc-dot", item.dotClass)} />
            <span className="text-slate-300 flex-1">{item.label}</span>
            <span className="text-slate-500">{item.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

