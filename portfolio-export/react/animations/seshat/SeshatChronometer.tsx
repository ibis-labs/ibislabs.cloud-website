"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../utils";

export const SESHAT_BUDS = [
  "path71", "ellipse71", "ellipse72", "ellipse73", "ellipse74", "ellipse75",
  "ellipse76", "ellipse77", "ellipse78", "ellipse79", "ellipse80", "ellipse81",
  "ellipse82", "ellipse83", "ellipse84", "ellipse85", "ellipse86", "ellipse88",
  "ellipse87", "ellipse89", "ellipse90", "ellipse91", "ellipse92", "ellipse93",
  "ellipse129", "ellipse94", "ellipse95", "ellipse96", "ellipse97", "ellipse98",
  "ellipse99", "ellipse100", "ellipse101", "ellipse102", "ellipse103", "ellipse104",
  "ellipse105", "ellipse106", "ellipse107", "ellipse108", "ellipse109", "ellipse110",
  "ellipse111", "ellipse112", "ellipse113", "ellipse114", "ellipse115", "ellipse116",
  "ellipse117", "ellipse118", "ellipse119", "ellipse120", "ellipse121", "ellipse122",
  "ellipse123", "ellipse124", "ellipse125", "ellipse126", "ellipse127",
];

export interface SeshatChronometerProps {
  /** Path or URL to seshat-animation.svg (defaults to "/svg/seshat-animation.svg") */
  svgUrl?: string;
  /** Optional raw SVG markup string if bundling offline without fetch */
  svgMarkup?: string;
  /** Show interactive Quarter-Hour Ripple button & live palm-rib readout */
  showControls?: boolean;
  className?: string;
}

export function SeshatChronometer({
  svgUrl = "/svg/seshat-animation.svg",
  svgMarkup,
  showControls = true,
  className = "",
}: SeshatChronometerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleLockRef = useRef(false);
  const [svgContent, setSvgContent] = useState<string>(svgMarkup ?? "");
  const [timeReadout, setTimeReadout] = useState<string>("");
  const [activeBudIndex, setActiveBudIndex] = useState<number>(0);

  useEffect(() => {
    if (svgMarkup) {
      setSvgContent(svgMarkup);
      return;
    }
    fetch(svgUrl)
      .then((res) => (res.ok ? res.text() : fetch("/images/SeshatAnimation.svg").then((r) => r.text())))
      .then((text) => setSvgContent(text))
      .catch((err) => console.error("Failed to load Seshat Chronometer SVG:", err));
  }, [svgUrl, svgMarkup]);

  const triggerRipple = useCallback(() => {
    if (!containerRef.current || rippleLockRef.current) return;
    rippleLockRef.current = true;
    SESHAT_BUDS.forEach((id, i) => {
      const el = containerRef.current?.querySelector(`#${id}`) as SVGElement | null;
      if (el) {
        el.animate(
          [
            { fill: "#B915CC", filter: "none" },
            { fill: "#00ffff", filter: "drop-shadow(0 0 8px #00ffff)" },
            { fill: "#ff44ff", filter: "drop-shadow(0 0 10px #ff00ff)" },
            { fill: "#B915CC", filter: "none" },
          ],
          {
            duration: 800,
            delay: i * 25,
            easing: "ease-out",
          }
        );
      }
    });
    setTimeout(() => {
      rippleLockRef.current = false;
    }, 2400);
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    const tick = () => {
      if (!containerRef.current) return;
      const now = new Date();
      const mins = now.getHours() * 60 + now.getMinutes();
      const isQtr = now.getMinutes() % 15 === 0;
      const pastHalf = now.getMinutes() >= 30;
      const n = SESHAT_BUDS.length - 1;

      const mainIdx = Math.round((mins / 1440) * n);
      const halfMins = now.getHours() * 60 + 30;
      const halfIdx = Math.round((halfMins / 1440) * n);

      setActiveBudIndex(mainIdx + 1);
      setTimeReadout(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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

    tick();
    const intervalId = setInterval(tick, 30_000);
    return () => clearInterval(intervalId);
  }, [svgContent, triggerRipple]);

  return (
    <div className={cn("thoth-showcase-card flex flex-col items-center gap-4", className)}>
      <div
        id="seshat-button"
        ref={containerRef}
        className="seshat-chronometer-svg animate-pulse-purple"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {showControls && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-fuchsia-300/80">
            {timeReadout ? `${timeReadout} · Palm-Rib Bud ${activeBudIndex}/59` : "Synchronizing Palm-Rib..."}
          </span>
          <button
            type="button"
            onClick={triggerRipple}
            className="thoth-btn thoth-btn-purple"
          >
            Trigger Quarter-Hour Ripple
          </button>
        </div>
      )}
    </div>
  );
}

