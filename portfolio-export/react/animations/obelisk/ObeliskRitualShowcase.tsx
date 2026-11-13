"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Obelisk } from "./Obelisk";
import { HeroGlyphs } from "./HeroGlyphs";
import { VariousGlyphs } from "./VariousGlyphs";
import { Pedestal } from "./Pedestal";
import { NedjemBastet } from "./NedjemBastet";
import { Keypad } from "./Keypad";
import { cn } from "../../utils";

export type ObeliskCameraStage =
  | "summit"
  | "landing"
  | "anchored"
  | "totality"
  | "pedestal"
  | "bastet"
  | "panelZoom";

const VIEWS: Record<ObeliskCameraStage, string> = {
  summit: "7 0 40 40",
  landing: "7 235 40 40",
  anchored: "-10 235 65 65",
  totality: "-25 0 100 300",
  pedestal: "-2 240 52 53",
  bastet: "-0.5 270.5 13.5 22",
  panelZoom: "17.5 255 20 20",
};

export interface ObeliskRitualShowcaseProps {
  autoPlay?: boolean;
  className?: string;
}

export function ObeliskRitualShowcase({
  autoPlay = true,
  className = "",
}: ObeliskRitualShowcaseProps) {
  const [stage, setStage] = useState<ObeliskCameraStage>(autoPlay ? "summit" : "totality");
  const [knockCount, setKnockCount] = useState(0);
  const [isMigrating, setIsMigrating] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState<number | null>(null);
  const maatX = 42.5;

  useEffect(() => {
    if (!autoPlay) return;
    const t1 = setTimeout(() => setStage("landing"), 900);
    const t2 = setTimeout(() => setStage("anchored"), 2100);
    const t3 = setTimeout(() => setStage("totality"), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [autoPlay]);

  useEffect(() => {
    if (knockCount === 3) {
      const timer = setTimeout(() => {
        setIsMigrating(true);
        setStage("panelZoom");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [knockCount]);

  const handleKnock = () => {
    if (knockCount < 3) {
      setStage("totality");
      setKnockCount((prev) => prev + 1);
    }
  };

  const resetRitual = () => {
    setIsMigrating(false);
    setKnockCount(0);
    setLastKeyPressed(null);
    setStage("totality");
  };

  const getHeroColor = () => {
    if (knockCount === 0) return "#00FFFF";
    if (knockCount === 1) return "#6a0dad";
    if (knockCount === 2) return "#a020f0";
    return "#00ff41";
  };

  const activeViewBox = isMigrating ? VIEWS.panelZoom : VIEWS[stage];

  return (
    <div className={cn("thoth-showcase-card flex flex-col items-center gap-5", className)}>
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-cyan-400 tracking-[0.2em] uppercase">
          Obelisk of Istanbul Ritual
        </h3>
        <p className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
          {isMigrating
            ? `PROTOCOL: MIGRATION_ACTIVE${lastKeyPressed ? ` · KEY_${String(lastKeyPressed).padStart(2, "0")}` : ""}`
            : `CAMERA: ${stage.toUpperCase()} · KNOCK_SEQUENCE: ${knockCount}/3`}
        </p>
      </div>

      <div
        onClick={handleKnock}
        className="relative w-full max-w-[380px] h-[520px] rounded-2xl border border-cyan-500/20 bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer"
      >
        <motion.svg
          animate={{ viewBox: activeViewBox }}
          transition={{ duration: isMigrating ? 3.2 : 1.1, ease: [0.45, 0.05, 0.55, 0.95] }}
          className="w-full h-full"
        >
          {/* 1. Floating Assembly */}
          <g className={isMigrating ? "" : "animate-float-slow"}>
            <Obelisk ritualStage={2} color="#00FFFF" capstoneColor={getHeroColor()} />
            <g transform={`translate(${maatX - 43}, 0)`}>
              <motion.g animate={{ opacity: 1 - knockCount * 0.25 }}>
                <VariousGlyphs ritualStage={2} />
              </motion.g>
            </g>
          </g>

          {/* 2. Stationary Pedestal, Nedjem Bastet & Keypad */}
          <g transform="translate(0.5, 6.0)">
            <Pedestal ritualStage={2} />
            <g transform="translate(-0.85, -11.05)">
              <NedjemBastet ritualStage={2} color="#00FFFF" />
            </g>

            <motion.rect
              x="22.1"
              y="254"
              width="10"
              height="15"
              rx="1"
              fill="none"
              stroke="#00ff41"
              strokeWidth="0.2"
              animate={{ opacity: knockCount * 0.33 }}
              className="drop-shadow-[0_0_5px_#00ff41]"
            />

            <g transform="translate(22.1, 254)">
              <Keypad isVisible={isMigrating} onKeyClick={(num) => setLastKeyPressed(num)} />
            </g>
          </g>

          {/* 3. Hero Glyph Spirits */}
          <motion.g className="obelisk-hero-orbit">
            <HeroGlyphs ritualStage={2} color={getHeroColor()} isMigrating={isMigrating} />
          </motion.g>
        </motion.svg>
      </div>

      {/* Interactive Camera & Ritual Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(
          ["summit", "landing", "anchored", "totality", "pedestal", "bastet"] as ObeliskCameraStage[]
        ).map((cam) => (
          <button
            key={cam}
            type="button"
            onClick={() => {
              setIsMigrating(false);
              setStage(cam);
            }}
            className={cn("thoth-btn", !isMigrating && stage === cam && "thoth-btn-active")}
          >
            {cam === "bastet" ? "Nedjem Bastet" : cam}
          </button>
        ))}
        <button
          type="button"
          onClick={handleKnock}
          className="thoth-btn thoth-btn-purple"
        >
          Knock ({knockCount}/3)
        </button>
        <button
          type="button"
          onClick={() => {
            setKnockCount(3);
            setIsMigrating(true);
            setStage("panelZoom");
          }}
          className={cn("thoth-btn", isMigrating && "thoth-btn-active")}
        >
          Keypad Zoom
        </button>
        <button type="button" onClick={resetRitual} className="thoth-btn">
          Reset
        </button>
      </div>
    </div>
  );
}

