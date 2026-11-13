"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

const GLYPH_POOL = [
  "𓄿","𓅀","𓅃","𓆑","𓆓","𓆦","𓇋","𓇌","𓈖","𓈘",
  "𓉔","𓉡","𓊃","𓊪","𓋀","𓌀","𓌁","𓍿","𓎛","𓏏",
  "𓏑","𓂀","𓂋","𓃭","𓁹","𓄂","𓁺","𓅆","𓋁","𓂌",
];

function randGlyph() {
  return GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)];
}

type Phase = "scramble" | "resolve" | "hold" | "out";

export interface HieroglyphScrambleRevealProps {
  /** First line of revealed text (default: "THOTH'S NOTEBOOK") */
  line1?: string;
  /** Second line of revealed text (default: "PORTFOLIO") */
  line2?: string;
  /** Subtitle shown above the revealed words */
  topLabel?: string;
  /** Footer prompt shown below the revealed words */
  bottomLabel?: string;
  /** Render inside a bounded card instead of a fixed fullscreen overlay */
  inline?: boolean;
  /** Auto-fade out after holding (default true when fullscreen, false when inline) */
  autoDismiss?: boolean;
  onClose?: () => void;
  className?: string;
}

const CORNER_CLASSES = [
  "thoth-corner-tl",
  "thoth-corner-tr",
  "thoth-corner-bl",
  "thoth-corner-br",
];

export function HieroglyphScrambleReveal({
  line1 = "THOTH'S NOTEBOOK",
  line2 = "PORTFOLIO",
  topLabel = "✦ transmission decoded ✦",
  bottomLabel = "✦ tap to replay ✦",
  inline = false,
  autoDismiss,
  onClose,
  className,
}: HieroglyphScrambleRevealProps) {
  const shouldAutoDismiss = autoDismiss ?? !inline;
  const line1Chars = useMemo(() => line1.split(""), [line1]);
  const line2Chars = useMemo(() => line2.split(""), [line2]);
  const message = useMemo(() => [...line1Chars, ...line2Chars], [line1Chars, line2Chars]);
  const len = message.length;

  const [phase, setPhase] = useState<Phase>("scramble");
  const [glyphs, setGlyphs] = useState<string[]>(() => Array.from({ length: len }, randGlyph));
  const [locked, setLocked] = useState<boolean[]>(() => Array(len).fill(false));
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<Phase>("scramble");

  const setPhaseSync = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  const restart = () => {
    if (tickRef.current) clearTimeout(tickRef.current);
    setGlyphs(Array.from({ length: len }, randGlyph));
    setLocked(Array(len).fill(false));
    setPhaseSync("scramble");
  };

  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line1, line2]);

  useEffect(() => {
    if (phase !== "scramble") return;
    const rampStart = Date.now();
    const SLOW = 80, FAST = 22, RAMP = 900;

    const tick = () => {
      if (phaseRef.current !== "scramble") return;
      const elapsed = Date.now() - rampStart;
      const pct = Math.min(1, elapsed / RAMP);
      const interval = Math.round(SLOW + (FAST - SLOW) * pct);

      setGlyphs((g) => g.map(() => randGlyph()));

      if (pct >= 1) {
        setPhaseSync("resolve");
      } else {
        tickRef.current = setTimeout(tick, interval);
      }
    };

    tickRef.current = setTimeout(tick, SLOW);
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "resolve") return;
    let idx = 0;

    const lockNext = () => {
      if (idx >= len) {
        setPhaseSync("hold");
        return;
      }
      setGlyphs((g) => g.map((_, i) => (i <= idx ? message[i] : randGlyph())));
      setLocked((l) => l.map((v, i) => (i <= idx ? true : v)));
      idx++;
      tickRef.current = setTimeout(lockNext, 70);
    };

    tickRef.current = setTimeout(lockNext, 200);
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, [phase, len, message]);

  useEffect(() => {
    if (phase !== "hold" || !shouldAutoDismiss) return;
    tickRef.current = setTimeout(() => setPhaseSync("out"), 3200);
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, [phase, shouldAutoDismiss]);

  useEffect(() => {
    if (phase !== "out") return;
    const t = setTimeout(() => onClose?.(), 700);
    return () => clearTimeout(t);
  }, [phase, onClose]);

  const handleTap = () => {
    if (inline) {
      restart();
    } else {
      setPhaseSync("out");
    }
  };

  return (
    <AnimatePresence>
      {phase !== "out" && (
        <motion.div
          key="hieroglyph-scramble"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={handleTap}
          className={cn(
            "thoth-scramble-backdrop flex flex-col items-center justify-center cursor-pointer overflow-hidden",
            inline
              ? "relative w-full min-h-[300px] rounded-2xl border border-cyan-500/25 p-8"
              : "fixed inset-0 z-[200]",
            className,
          )}
        >
          <div className="thoth-scanline-overlay absolute inset-0 pointer-events-none opacity-[0.06]" />

          {["𓂀", "𓁹", "𓆑", "𓇋"].map((g, i) => (
            <span
              key={i}
              className={cn(
                "absolute text-cyan-900/40 text-3xl pointer-events-none select-none",
                CORNER_CLASSES[i],
              )}
            >
              {g}
            </span>
          ))}

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: phase === "hold" ? 1 : 0, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-mono text-[9px] tracking-[0.35em] uppercase text-cyan-500/75"
          >
            {topLabel}
          </motion.p>

          <div className="flex flex-col items-center gap-3">
            {[line1Chars, line2Chars].map((line, lineIdx) => {
              const offset = lineIdx === 0 ? 0 : line1Chars.length;
              return (
                <div key={lineIdx} className="flex items-center justify-center gap-x-[2px] flex-wrap">
                  {line.map((_, col) => {
                    const i = offset + col;
                    const isLocked = locked[i];
                    const isAmp = message[i] === "&";
                    const isSpace = message[i] === " ";
                    const ch = glyphs[i];
                    return (
                      <motion.span
                        key={i}
                        animate={
                          isLocked
                            ? {
                                opacity: 1,
                                scale: isAmp ? [1, 1.35, 1] : 1,
                                textShadow: isAmp
                                  ? "0 0 18px rgba(244,114,182,0.9)"
                                  : "0 0 10px rgba(34,211,238,0.7)",
                              }
                            : { opacity: 0.45, scale: 1, textShadow: "none" }
                        }
                        transition={{ duration: isAmp ? 0.5 : 0.25 }}
                        className={cn(
                          "font-mono select-none tracking-wider",
                          isSpace && "w-3",
                          isLocked && isAmp && "text-2xl text-pink-400",
                          isLocked && !isAmp && "text-xl text-cyan-200",
                          !isLocked && "text-lg text-cyan-700",
                        )}
                      >
                        {isSpace ? "\u00A0" : ch}
                      </motion.span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase === "hold" ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-6 h-px w-56 bg-gradient-to-r from-transparent via-pink-400/70 to-transparent origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: phase === "hold" ? 1 : 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 font-mono text-[9px] tracking-[0.35em] uppercase text-pink-400/60"
          >
            {bottomLabel}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

