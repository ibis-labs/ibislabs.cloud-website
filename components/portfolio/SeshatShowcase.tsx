"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { SESHAT_BUDS } from "@/portfolio-export/react/animations/seshat/SeshatChronometer";

interface TimePreset {
  label: string;
  minutes: number | null; // null = Live System Clock
}

const TIME_PRESETS: TimePreset[] = [
  { label: "Live Clock", minutes: null },
  { label: "Dawn 06:00", minutes: 6 * 60 },
  { label: "Noon 12:00", minutes: 12 * 60 },
  { label: "Dusk 18:35", minutes: 18 * 60 + 35 },
  { label: "Night 23:45", minutes: 23 * 60 + 45 },
];

function formatMinutes(totalMins: number): string {
  const hrs24 = Math.floor(totalMins / 60) % 24;
  const mins = totalMins % 60;
  const period = hrs24 >= 12 ? "PM" : "AM";
  const hrs12 = hrs24 % 12 === 0 ? 12 : hrs24 % 12;
  return `${String(hrs12).padStart(2, "0")}:${String(mins).padStart(2, "0")} ${period}`;
}

export default function SeshatShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleLockRef = useRef(false);

  const [svgContent, setSvgContent] = useState<string>("");
  const [simulatedMinutes, setSimulatedMinutes] = useState<number | null>(null);
  const [auraPulse, setAuraPulse] = useState<boolean>(true);
  const [timeReadout, setTimeReadout] = useState<string>("");
  const [activeBudIndex, setActiveBudIndex] = useState<number>(1);
  const [halfBudIndex, setHalfBudIndex] = useState<number | null>(null);
  const [isRippling, setIsRippling] = useState<boolean>(false);

  // Fetch standalone animated Seshat SVG authored by Ibis Labs LLC
  useEffect(() => {
    fetch("/portfolio-svg/seshat-animation.svg")
      .then((res) => (res.ok ? res.text() : fetch("/svg/seshat-animation.svg").then((r) => r.text())))
      .then((text) => setSvgContent(text))
      .catch((err) => console.error("Failed to load Seshat Chronometer SVG:", err));
  }, []);

  const triggerRipple = useCallback(() => {
    if (!containerRef.current || rippleLockRef.current) return;
    rippleLockRef.current = true;
    setIsRippling(true);

    SESHAT_BUDS.forEach((id, i) => {
      const el = containerRef.current?.querySelector(`#${id}`) as SVGElement | null;
      if (el && typeof el.animate === "function") {
        el.animate(
          [
            { fill: "#B915CC", filter: "none" },
            { fill: "#00ffff", filter: "drop-shadow(0 0 8px #00ffff)" },
            { fill: "#ff44ff", filter: "drop-shadow(0 0 10px #ff00ff)" },
            { fill: "#B915CC", filter: "none" },
          ],
          {
            duration: 820,
            delay: i * 25,
            easing: "ease-out",
          }
        );
      }
    });

    setTimeout(() => {
      rippleLockRef.current = false;
      setIsRippling(false);
    }, 2400);
  }, []);

  // Sync 59 palm-rib buds with either live system clock or user-selected time
  useEffect(() => {
    if (!svgContent) return;

    const syncBuds = () => {
      if (!containerRef.current) return;

      const now = new Date();
      const mins =
        simulatedMinutes !== null
          ? simulatedMinutes
          : now.getHours() * 60 + now.getMinutes();

      const minuteOfHour = mins % 60;
      const hourOfDay = Math.floor(mins / 60);
      const isQtr = simulatedMinutes === null && minuteOfHour % 15 === 0;
      const pastHalf = minuteOfHour >= 30;
      const n = SESHAT_BUDS.length - 1;

      const mainIdx = Math.round((mins / 1440) * n);
      const halfMins = hourOfDay * 60 + 30;
      const halfIdx = Math.round((halfMins / 1440) * n);

      setActiveBudIndex(mainIdx + 1);
      setHalfBudIndex(pastHalf && halfIdx !== mainIdx ? halfIdx + 1 : null);
      setTimeReadout(
        simulatedMinutes !== null
          ? `${formatMinutes(simulatedMinutes)} (Simulated)`
          : now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );

      const getBud = (id: string) =>
        containerRef.current?.querySelector(`#${id}`) as Element | null;

      SESHAT_BUDS.forEach((id) => {
        const el = getBud(id);
        if (el) el.classList.remove("seshat-bud-on", "seshat-bud-dim");
      });

      const mainEl = getBud(SESHAT_BUDS[mainIdx]);
      if (mainEl) mainEl.classList.add("seshat-bud-on");

      if (pastHalf && halfIdx !== mainIdx) {
        const halfEl = getBud(SESHAT_BUDS[halfIdx]);
        if (halfEl) halfEl.classList.add("seshat-bud-dim");
      }

      if (isQtr) {
        triggerRipple();
      }
    };

    syncBuds();
    if (simulatedMinutes !== null) return undefined;

    const intervalId = setInterval(syncBuds, 30_000);
    return () => clearInterval(intervalId);
  }, [svgContent, simulatedMinutes, triggerRipple]);

  const currentSliderValue =
    simulatedMinutes !== null
      ? simulatedMinutes
      : (() => {
          const d = new Date();
          return d.getHours() * 60 + d.getMinutes();
        })();

  return (
    <section id="seshat-chronometer" className="w-full max-w-6xl scroll-mt-24">
      <div className="border border-cyber-cyan ring-1 ring-cyber-cyan/40 ring-offset-2 ring-offset-black bg-black/80 rounded-lg p-6 md:p-10 shadow-[0_0_50px_-12px_rgba(31,170,254,0.18)]">
        {/* Top Attribution & Title Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-5 mb-8">
          <div>
            <p className="text-xs font-mono text-cyber-cyan uppercase tracking-[0.25em] mb-1">
              Featured Exhibit 02 · Custom Vector Graphic by Ibis Labs LLC
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-[0.18em]">
              Seshat Harp Chronometer
            </h2>
          </div>
          <span className="text-xs border border-cyber-cyan text-cyber-cyan px-3 py-1 rounded uppercase tracking-wider font-mono">
            59-Bud SVG + CSS + WAAPI Clock
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Chronometer Stage */}
          <div className="lg:col-span-7 flex flex-col items-center justify-between rounded-lg border border-gray-800 bg-black p-6 sm:p-8 shadow-inner">
            <div className="text-center mb-3">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-fuchsia-400">
                Goddess of Wisdom, Architecture &amp; Timekeeping
              </span>
            </div>

            {/* Seshat SVG Mount (#seshat-button activates embedded CSS keyframe animations) */}
            <div className="w-full flex items-center justify-center py-2 min-h-[380px]">
              {svgContent ? (
                <div
                  id="seshat-button"
                  ref={containerRef}
                  className={
                    auraPulse
                      ? "seshat-chronometer-svg animate-pulse-purple"
                      : "seshat-chronometer-svg-flat"
                  }
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              ) : (
                <div className="text-xs font-mono uppercase tracking-widest text-fuchsia-400 animate-pulse">
                  Loading Custom Vector Paths...
                </div>
              )}
            </div>

            {/* Live Palm-Rib Readout */}
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-fuchsia-300/90 mt-3 mb-4 text-center">
              {isRippling
                ? "QUARTER-HOUR CASCADE ACTIVE · RIPPLING 59 PALM-RIB BUDS"
                : timeReadout
                ? `${timeReadout} · PRIMARY BUD ${activeBudIndex}/59${
                    halfBudIndex ? ` · HALF-HOUR BUD ${halfBudIndex}/59` : ""
                  }`
                : "SYNCHRONIZING PALM-RIB CLOCK..."}
            </div>

            {/* Interactive Controls Deck */}
            <div className="w-full pt-4 border-t border-gray-800/90 space-y-4">
              {/* Primary Action Row */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={triggerRipple}
                  className={`thoth-btn thoth-btn-purple ${
                    isRippling ? "thoth-btn-purple-active" : ""
                  }`}
                >
                  {isRippling ? "Rippling Palm-Rib..." : "Trigger Quarter-Hour Ripple"}
                </button>

                <button
                  type="button"
                  onClick={() => setAuraPulse((prev) => !prev)}
                  className={`thoth-btn ${auraPulse ? "thoth-btn-active" : ""}`}
                >
                  Neon Aura: {auraPulse ? "On" : "Off"}
                </button>
              </div>

              {/* Time-of-Day Presets & 24h Palm-Rib Scrubber */}
              <div className="rounded border border-gray-800/90 bg-black/70 p-3.5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyber-cyan">
                    Palm-Rib Time Inspector
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    {simulatedMinutes === null ? "Synced to Local Clock" : "Manual Time Scrub"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {TIME_PRESETS.map((preset) => {
                    const isSelected = simulatedMinutes === preset.minutes;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setSimulatedMinutes(preset.minutes)}
                        className={`thoth-btn ${isSelected ? "thoth-btn-active" : ""}`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[10px] font-mono text-gray-500">00:00</span>
                  <input
                    type="range"
                    min={0}
                    max={1439}
                    step={5}
                    value={currentSliderValue}
                    aria-label="Scrub 24-hour time across all 59 palm-rib buds"
                    onChange={(e) => setSimulatedMinutes(Number(e.target.value))}
                    className="flex-1 accent-cyber-cyan cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-gray-500">23:59</span>
                </div>
              </div>
            </div>
          </div>

          {/* Craftsmanship & Controls Explanation Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="border border-gray-800 bg-black/60 rounded-lg p-6">
              <h3 className="text-sm text-cyber-cyan uppercase tracking-widest border-b border-gray-800 pb-2 mb-4">
                In-House Vector Craftsmanship
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                The <strong>Seshat Chronometer</strong> is an original,
                intricately layered custom vector illustration drawn and
                animated in-house by{" "}
                <strong className="text-white">Ibis Labs LLC</strong>. Depicting
                Seshat—the ancient Egyptian goddess of wisdom, architecture,
                astronomy, and the notched palm-rib (<em>renpet</em>) of time—the
                artwork weaves hundreds of custom Inkscape vector paths into a
                functional timepiece.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Embedded CSS keyframes continuously pluck{" "}
                <strong className="text-cyber-cyan">28 hair-harp strings</strong>{" "}
                in a 12-second arpeggio, sweep her wrist bangles in opposing
                7-second micro-harps, and sparkle her seven-pointed rosette
                headdress, collar gems, and dress stars.
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
                    <strong className="text-white">Trigger Quarter-Hour Ripple:</strong>{" "}
                    Fires a staggered Web Animations API wave across all{" "}
                    <strong className="text-fuchsia-300">59 palm-rib buds</strong>{" "}
                    (25ms per bud, shifting Purple → Cyber Cyan → Magenta). In
                    live mode, this ripple also fires automatically at{" "}
                    <code className="text-cyber-cyan font-mono">:00</code>,{" "}
                    <code className="text-cyber-cyan font-mono">:15</code>,{" "}
                    <code className="text-cyber-cyan font-mono">:30</code>, and{" "}
                    <code className="text-cyber-cyan font-mono">:45</code>.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyber-cyan mr-2.5 mt-0.5 shrink-0">▹</span>
                  <span>
                    <strong className="text-white">Live Clock &amp; Time Presets:</strong>{" "}
                    Defaults to <span className="text-cyber-cyan font-mono text-xs">Live Clock</span>,
                    mapping the 1,440 minutes of your local 24-hour day onto
                    buds 1–59 (plus a dim secondary bud past the{" "}
                    <code className="text-cyber-cyan font-mono">:30</code>{" "}
                    half-hour mark). Select Dawn, Noon, Dusk, or Night to jump
                    instantly.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyber-cyan mr-2.5 mt-0.5 shrink-0">▹</span>
                  <span>
                    <strong className="text-white">24-Hour Palm-Rib Slider:</strong>{" "}
                    Drag the range slider from <code className="text-cyber-cyan font-mono">00:00</code>{" "}
                    to <code className="text-cyber-cyan font-mono">23:59</code>{" "}
                    to watch the illuminated chronometer bud travel smoothly
                    along Seshat&apos;s notched palm-rib wand.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyber-cyan mr-2.5 mt-0.5 shrink-0">▹</span>
                  <span>
                    <strong className="text-white">Neon Aura Toggle:</strong>{" "}
                    Switches the ambient 6-second purple bloom on or off for
                    inspecting fine vector stroke detail.
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

