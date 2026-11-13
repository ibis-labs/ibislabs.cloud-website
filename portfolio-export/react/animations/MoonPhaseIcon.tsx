"use client";

import React, { useState, useEffect } from "react";
import { cn } from "../utils";

export const MOON_PHASE_NAMES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
] as const;

export function getMoonPhase(date: Date = new Date()): { phase: number; name: string } {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  if (month < 3) {
    year--;
    month += 12;
  }

  const c = 365.25 * year;
  const e = 30.6 * month;
  let jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  let b = parseInt(jd.toString(), 10);
  jd -= b;
  b = Math.round(jd * 8);
  if (b >= 8) b = 0;

  return { phase: b, name: MOON_PHASE_NAMES[b] };
}

const NewMoon = () => <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />;
const WaxingCrescent = () => (
  <g transform="rotate(30 12 12)">
    <path d="M12 2 A10 10 0 1 1 12 22 A8 10 0 1 0 12 2 Z" fill="currentColor" />
  </g>
);
const FirstQuarter = () => <path d="M12 2 V22 A10 10 0 0 0 12 2 Z" fill="currentColor" />;
const WaxingGibbous = () => <path d="M12 2 A10 10 0 0 1 12 22 A4 10 0 0 1 12 2 Z" fill="currentColor" />;
const FullMoon = () => <circle cx="12" cy="12" r="10" fill="currentColor" />;
const WaningGibbous = () => <path d="M12 2 A10 10 0 0 0 12 22 A4 10 0 0 0 12 2 Z" fill="currentColor" />;
const LastQuarter = () => <path d="M12 2 V22 A10 10 0 0 1 12 2 Z" fill="currentColor" />;
const WaningCrescent = () => (
  <g transform="rotate(-30 12 12)">
    <path d="M12 2 A10 10 0 1 0 12 22 A8 10 0 1 1 12 2 Z" fill="currentColor" />
  </g>
);

const PHASE_ICONS = [
  <NewMoon key="0" />,
  <WaxingCrescent key="1" />,
  <FirstQuarter key="2" />,
  <WaxingGibbous key="3" />,
  <FullMoon key="4" />,
  <WaningGibbous key="5" />,
  <LastQuarter key="6" />,
  <WaningCrescent key="7" />,
];

export interface MoonPhaseIconProps {
  /** Optional 0–7 override to preview a specific phase */
  phaseOverride?: number;
  size?: number;
  className?: string;
}

export function MoonPhaseIcon({ phaseOverride, size = 24, className }: MoonPhaseIconProps) {
  const [moon, setMoon] = useState({ phase: 0, name: "New Moon" });

  useEffect(() => {
    setMoon(getMoonPhase());
  }, []);

  const activeIdx =
    typeof phaseOverride === "number"
      ? ((Math.round(phaseOverride) % 8) + 8) % 8
      : moon.phase;
  const activeName = MOON_PHASE_NAMES[activeIdx];

  return (
    <div
      title={activeName}
      aria-label={activeName}
      className={cn("inline-flex items-center justify-center text-cyan-400/80", className)}
    >
      <svg viewBox="0 0 24 24" width={size} height={size}>
        {PHASE_ICONS[activeIdx]}
      </svg>
    </div>
  );
}

