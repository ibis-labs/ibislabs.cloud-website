"use client";

import { useState, useEffect } from "react";

export default function StewardshipCounter() {
  const [duration, setDuration] = useState<string>("");

  useEffect(() => {
    const startDate = new Date("2026-03-03T00:00:00");

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      // Handle pre-launch vs post-launch logic visually
      const isFuture = diff < 0;
      const absDiff = Math.abs(diff);

      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((absDiff / 1000 / 60) % 60);
      const seconds = Math.floor((absDiff / 1000) % 60);

      const timeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      
      setDuration(isFuture ? `T-Minus: ${timeString}` : ` ${timeString}`);
    };

    const timerId = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="font-mono text-sm md:text-base tracking-widest text-gray-400 mt-4 border border-gray-800 p-2 inline-block rounded bg-black/50 backdrop-blur-sm">
      <span className="text-cyber-cyan uppercase mr-2">On the Grind for:</span>
      <span className="text-cyber-cyan shadow-cyber-cyan drop-shadow-[0_0_2px_rgba(0,255,255,0.8)]">
        {duration || "Initializing..."}
      </span>
    </div>
  );
}
