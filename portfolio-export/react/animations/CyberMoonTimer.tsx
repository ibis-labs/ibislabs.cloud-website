"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "../utils";

export interface CyberMoonProps {
  /** Normalized progress from 0.0 (New Moon) → 0.5 (Full Moon) → 1.0 (New Moon) */
  progress: number;
  onClick?: () => void;
  isClickable?: boolean;
  /** Switches from Cyber Cyan to Crimson Merkhet mode */
  isMerkhet?: boolean;
  className?: string;
}

export function CyberMoon({
  progress,
  onClick,
  isClickable = false,
  isMerkhet = false,
  className,
}: CyberMoonProps) {
  let phaseIndex = 0;
  if (progress < 0.5) {
    phaseIndex = Math.floor(progress * 2 * 4);
  } else {
    phaseIndex = 4 + Math.floor((progress - 0.5) * 2 * 4);
  }
  if (phaseIndex > 8) phaseIndex = 8;

  const colorClass = isMerkhet ? "text-rose-600" : "text-cyan-400";
  const glowClass = isClickable
    ? isMerkhet
      ? "drop-shadow-[0_0_35px_rgba(255,0,60,1)] cursor-pointer hover:scale-110"
      : "drop-shadow-[0_0_35px_rgba(0,255,255,0.9)] cursor-pointer hover:scale-110"
    : isMerkhet
      ? "drop-shadow-[0_0_15px_rgba(255,0,60,0.8)]"
      : "drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]";

  const svgClasses = cn("w-full h-full transition-all duration-300", colorClass, glowClass);

  const renderPhase = (index: number) => {
    switch (index) {
      case 0:
      case 8:
        return (
          <svg viewBox="0 0 100 100" className={svgClasses}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          </svg>
        );
      case 1:
        return (
          <svg viewBox="0 0 100 100" className={svgClasses}>
            <path d="M50 5 A45 45 0 0 1 50 95 A35 45 0 0 0 50 5 Z" fill="currentColor" />
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 100 100" className={svgClasses}>
            <path d="M50 5 A45 45 0 0 1 50 95 L50 5 Z" fill="currentColor" />
          </svg>
        );
      case 3:
        return (
          <svg viewBox="0 0 100 100" className={svgClasses}>
            <path d="M50 5 A45 45 0 0 1 50 95 A35 45 0 0 1 50 5 Z" fill="currentColor" />
          </svg>
        );
      case 4:
        return (
          <svg viewBox="0 0 100 100" className={svgClasses}>
            <circle cx="50" cy="50" r="45" fill="currentColor" />
          </svg>
        );
      case 5:
        return (
          <svg viewBox="0 0 100 100" className={svgClasses}>
            <path d="M50 5 A45 45 0 0 0 50 95 A35 45 0 0 0 50 5 Z" fill="currentColor" />
          </svg>
        );
      case 6:
        return (
          <svg viewBox="0 0 100 100" className={svgClasses}>
            <path d="M50 5 A45 45 0 0 0 50 95 L50 5 Z" fill="currentColor" />
          </svg>
        );
      case 7:
        return (
          <svg viewBox="0 0 100 100" className={svgClasses}>
            <path d="M50 5 A45 45 0 0 0 50 95 A35 45 0 0 1 50 5 Z" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div onClick={isClickable ? onClick : undefined} className={cn("w-28 h-28 relative", className)}>
      {renderPhase(phaseIndex)}
    </div>
  );
}

export interface CyberMoonTimerProps {
  onClose?: () => void;
  /** Optional ambient loop MP3 URL */
  ambienceSoundUrl?: string;
  /** Optional completion chime WAV/MP3 URL */
  chimeSoundUrl?: string;
  className?: string;
}

export function CyberMoonTimer({
  onClose,
  ambienceSoundUrl,
  chimeSoundUrl,
  className,
}: CyberMoonTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isMerkhet, setIsMerkhet] = useState(false);
  const [, setTapCount] = useState(0);
  const [mode, setMode] = useState<"setup" | "burning" | "done">("setup");
  const [rawDigits, setRawDigits] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const durations = [
    { label: "2m", seconds: 120 },
    { label: "5m", seconds: 300 },
    { label: "10m", seconds: 600 },
    { label: "42m", seconds: 2520 },
  ];

  const formatTime = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getFormattedInput = (digits: string) => {
    const padded = digits.padStart(6, "0").slice(-6);
    const hrs = parseInt(padded.slice(0, 2), 10);
    const mins = padded.slice(2, 4);
    const secs = padded.slice(4, 6);
    return `${hrs}:${mins}:${secs}`;
  };

  const resetAll = () => {
    setIsActive(false);
    setMode("setup");
    setElapsedTime(0);
    setTimeLeft(0);
    setTotalTime(0);
    setRawDigits("");
  };

  const handleKhonsuTap = () => {
    setTapCount((prev) => {
      const next = prev + 1;
      if (next === 4) {
        setIsMerkhet((m) => !m);
        resetAll();
        return 0;
      }
      return next;
    });
    setTimeout(() => setTapCount(0), 2000);
  };

  const [audio] = useState(() => {
    if (typeof window === "undefined") return { ambience: null, chime: null };
    return {
      ambience: ambienceSoundUrl ? new Audio(ambienceSoundUrl) : null,
      chime: chimeSoundUrl ? new Audio(chimeSoundUrl) : null,
    };
  });

  useEffect(() => {
    if (!audio.ambience) return;
    if (mode === "burning" && isActive) {
      audio.ambience.loop = true;
      audio.ambience.volume = 0.4;
      audio.ambience.play().catch(() => {});
    } else {
      audio.ambience.pause();
    }
    return () => {
      audio.ambience?.pause();
    };
  }, [mode, isActive, audio.ambience]);

  useEffect(() => {
    if (mode === "done") {
      audio.chime?.play().catch(() => {});
      if (totalTime === 2520) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 1000);
      }
    }
  }, [mode, audio.chime, totalTime]);

  useEffect(() => {
    if (!isActive || !isMerkhet) return;
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, [isActive, isMerkhet]);

  const progress = isMerkhet
    ? (elapsedTime % 3600) / 3600
    : mode === "setup"
      ? 0
      : mode === "done"
        ? 1
        : 1 - timeLeft / (totalTime || 1);

  const startRitual = (seconds: number) => {
    if (!seconds || seconds <= 0) return;
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setMode("burning");
    setIsActive(true);
    setRawDigits("");
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      if (isMerkhet) {
        setElapsedTime((prev) => prev + 1);
      } else if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else {
        setIsActive(false);
        setMode("done");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isMerkhet]);

  const timeString = isMerkhet
    ? formatTime(elapsedTime)
    : mode === "setup"
      ? getFormattedInput(rawDigits)
      : formatTime(timeLeft);

  const timeChars = timeString.split("");

  return (
    <div
      className={cn(
        "relative w-full min-h-[420px] rounded-2xl overflow-hidden flex flex-col justify-end bg-black border transition-all duration-1000",
        isMerkhet
          ? "border-rose-900/60 shadow-[0_0_60px_rgba(255,0,60,0.12)]"
          : "border-cyan-900/60 shadow-[0_0_50px_rgba(0,255,255,0.18)]",
        isGlitching && "glitch-active",
        className,
      )}
    >
      <div
        onClick={handleKhonsuTap}
        title="Quadruple-tap to toggle Chrono-Merkhet crimson stopwatch"
        className="absolute inset-0 z-0 cursor-crosshair"
      />

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 z-50 hover:text-white transition-colors",
            isMerkhet ? "text-rose-500" : "text-cyan-500",
          )}
        >
          <X />
        </button>
      )}

      <div className="relative z-20 flex flex-col gap-6 p-8 w-full mt-auto bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <div>
            <h2
              className={cn(
                "text-2xl font-bold tracking-[0.2em] uppercase transition-colors",
                isMerkhet ? "text-rose-500 animate-pulse" : "text-cyan-400",
              )}
            >
              {isMerkhet ? "CHRONO-MERKHET" : "KHONSU RECKONS"}
            </h2>
            <p
              className={cn(
                "text-[10px] font-mono mt-1 tracking-[0.35em] uppercase",
                isMerkhet ? "text-red-500/90 font-bold" : "text-cyan-300/80",
              )}
            >
              {mode === "setup"
                ? "Awaiting Offering · 4x tap background for Merkhet"
                : isActive
                  ? "Circuit Flow Active"
                  : "Circuit Flow Suspended"}
            </p>
          </div>

          <CyberMoon
            progress={progress}
            isClickable
            isMerkhet={isMerkhet}
            onClick={() => {
              if (mode === "setup" && !isMerkhet) {
                const padded = rawDigits.padStart(6, "0").slice(-6);
                const h = parseInt(padded.slice(0, 2), 10);
                const m = parseInt(padded.slice(2, 4), 10);
                const s = parseInt(padded.slice(4, 6), 10);
                const totalSecs = h * 3600 + m * 60 + s;
                if (totalSecs > 0) startRitual(totalSecs);
              } else {
                if (mode === "setup") setMode("burning");
                setIsActive(!isActive);
              }
            }}
          />
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          {mode === "setup" &&
            !isMerkhet &&
            durations.map((d) => (
              <button
                key={d.label}
                type="button"
                onClick={() => startRitual(d.seconds)}
                className="h-[42px] px-4 rounded-lg border bg-black/50 backdrop-blur-md border-cyan-600 text-cyan-300 hover:bg-cyan-500 hover:text-black font-mono text-xs tracking-[0.2em] transition-all duration-300"
              >
                {d.label}
              </button>
            ))}

          {(mode === "burning" || mode === "done") && (
            <button
              type="button"
              onClick={resetAll}
              className={cn(
                "py-2 px-4 border rounded-xl font-mono text-[10px] tracking-[0.2em] uppercase transition-colors",
                isMerkhet ? "border-rose-900 text-rose-400 hover:bg-rose-950" : "border-indigo-300/50 text-indigo-200 hover:bg-indigo-950/40",
              )}
            >
              Reset Cycle
            </button>
          )}

          {mode === "burning" && (
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={cn(
                "py-2 px-4 border rounded-xl font-mono text-[10px] tracking-[0.2em] uppercase transition-colors",
                isMerkhet
                  ? "border-rose-800 text-rose-500 hover:bg-rose-950"
                  : "border-cyan-500 text-cyan-400 hover:bg-cyan-950",
              )}
            >
              {isActive ? "Suspend" : "Resume"}
            </button>
          )}
        </div>

        <div
          className={cn(
            "group relative p-2 bg-black/40 backdrop-blur-md border-2 rounded-2xl w-full max-w-[460px] h-[92px] flex items-center justify-center transition-all duration-500 cursor-pointer",
            isMerkhet
              ? "border-rose-600 shadow-[0_0_30px_rgba(255,0,60,0.3)]"
              : "border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.2)]",
          )}
          onClick={() => !isMerkhet && mode === "setup" && setIsEditing(true)}
        >
          <div
            className={cn(
              "flex flex-row items-center justify-center w-full tabular-nums font-mono transition-all",
              isMerkhet ? "text-rose-500" : isEditing ? "text-cyan-300 animate-pulse" : "text-pink-500",
            )}
          >
            <div className="text-4xl sm:text-[46px] leading-none flex items-baseline">
              {timeChars.map((char, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-flex justify-center transition-all duration-100",
                    char === ":" ? "w-[0.4ch] opacity-90" : "w-[1.1ch] khonsu-digit-tall",
                  )}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {isEditing && !isMerkhet && (
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={rawDigits}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                setRawDigits(val);
              }}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsEditing(false);
                  const padded = rawDigits.padStart(6, "0").slice(-6);
                  const h = parseInt(padded.slice(0, 2), 10);
                  const m = parseInt(padded.slice(2, 4), 10);
                  const s = parseInt(padded.slice(4, 6), 10);
                  const totalSecs = h * 3600 + m * 60 + s;
                  if (totalSecs > 0) startRitual(totalSecs);
                }
              }}
              autoFocus
              className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-text"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { CyberMoonTimer as KhonsuTimer };

