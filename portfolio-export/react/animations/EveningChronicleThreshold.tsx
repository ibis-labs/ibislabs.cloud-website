"use client";

import React, { useState } from "react";
import { cn } from "../utils";
import { FirstPylonIcon } from "../icons/FirstPylonIcon";
import { KhepriEtchAnimation } from "./KhepriEtchAnimation";

export interface EveningChronicleThresholdProps {
  className?: string;
  showPylonButton?: boolean;
  showLiturgy?: boolean;
  showReplayControls?: boolean;
  onProtocolInitiated?: () => void;
  onReturnMainHall?: () => void;
}

/**
 * Self-contained portfolio version of Thoth's Notebook Evening Chronicle Threshold
 * (ChronicleThreshold + KhepriIconMotion), decoupled from Next.js router & Sidebar.
 */
export function EveningChronicleThreshold({
  className,
  showPylonButton = false,
  showLiturgy = true,
  showReplayControls = true,
  onProtocolInitiated,
  onReturnMainHall,
}: EveningChronicleThresholdProps) {
  const [isScarabGold, setIsScarabGold] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const handleScarabClick = () => {
    const nextState = !isScarabGold;
    setIsScarabGold(nextState);
    if (nextState && onProtocolInitiated) {
      setTimeout(() => onProtocolInitiated(), 2000);
    }
  };

  const handleReplay = () => {
    setIsScarabGold(false);
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-between gap-6 p-6 rounded-2xl bg-black text-center",
        className,
      )}
    >
      {showPylonButton && (
        <button
          type="button"
          onClick={onReturnMainHall}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-cyan-400 bg-cyan-950/40 active:scale-95 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] min-w-[110px]"
        >
          <FirstPylonIcon
            size={80}
            className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          />
          <span className="font-bold text-[8px] uppercase text-cyan-300 -mt-1 mb-1">
            To Main Hall
          </span>
        </button>
      )}

      <div className="max-w-sm space-y-2">
        <h2 className="text-cyan-400/90 text-xl sm:text-2xl tracking-[0.38em] uppercase font-bold">
          The Evening Chronicle
        </h2>
      </div>

      {showLiturgy && (
        <div className="flex flex-col gap-0.5 khepri-liturgy-text text-lg sm:text-xl">
          <span>Review your Ma&apos;at.</span>
          <span>Reflect on your actions.</span>
          <span>Imagine tomorrow.</span>
          <span>Seal the record.</span>
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={handleScarabClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleScarabClick();
          }
        }}
        className="relative w-72 h-72 sm:w-80 sm:h-80 flex flex-col items-center justify-center cursor-pointer group outline-none"
      >
        <KhepriEtchAnimation
          key={replayKey}
          className="w-full h-full"
          forceGold={isScarabGold}
        />
        {!isScarabGold ? (
          <div className="absolute bottom-1 animate-pulse pointer-events-none">
            <p className="text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-[0.45em]">
              Initiate Khepri Protocol
            </p>
          </div>
        ) : (
          <div className="absolute bottom-1 pointer-events-none">
            <p className="text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-[0.42em]">
              Khepri Protocol Sealed
            </p>
          </div>
        )}
      </div>

      {showReplayControls && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button type="button" onClick={handleReplay} className="thoth-btn">
            Replay Etch
          </button>
          <button
            type="button"
            onClick={() => setIsScarabGold((g) => !g)}
            className={cn("thoth-btn", isScarabGold && "thoth-btn-active")}
          >
            {isScarabGold ? "Solar Gold Sealed" : "Seal Solar Gold"}
          </button>
        </div>
      )}
    </div>
  );
}

