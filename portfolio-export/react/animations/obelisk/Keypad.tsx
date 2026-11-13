"use client";

import React from "react";
import { motion } from "framer-motion";

export interface KeypadProps {
  isVisible: boolean;
  onKeyClick: (num: number) => void;
}

export const Keypad = ({ isVisible, onKeyClick }: KeypadProps) => {
  const rows = 4;
  const cols = 3;
  const keyW = 2.8;
  const keyH = 3.2;
  const gap = 0.4;

  return (
    <motion.g
      id="keypad-terminal"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <rect
        width="10"
        height="15"
        rx="1"
        fill="rgba(0, 10, 5, 0.95)"
        stroke="#00ff41"
        strokeWidth="0.1"
        className="drop-shadow-[0_0_2px_#00ff41]"
      />

      <g transform="translate(0.4, 0.8)">
        {[...Array(rows)].map((_, r) =>
          [...Array(cols)].map((__, c) => {
            const index = r * cols + c + 1;
            const displayNum = index.toString().padStart(2, "0");

            return (
              <g
                key={`${r}-${c}`}
                tabIndex={-1}
                className="cursor-pointer obelisk-key-group"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  if (e.currentTarget instanceof HTMLElement) e.currentTarget.blur();
                  if (typeof window !== "undefined" && window.navigator.vibrate) {
                    window.navigator.vibrate(10);
                  }
                  onKeyClick(index);
                }}
              >
                <motion.rect
                  className="outline-none ring-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  layout={false}
                  x={c * (keyW + gap)}
                  y={r * (keyH + gap)}
                  width={keyW}
                  height={keyH}
                  rx="0.3"
                  fill="rgba(20, 20, 20, 0.4)"
                  stroke="#333"
                  strokeWidth="0.05"
                  whileTap={{
                    fill: "rgba(0, 255, 65, 0.25)",
                    stroke: "#00ff41",
                    scale: 0.94,
                    transition: { duration: 0.2 },
                  }}
                />

                <text
                  x={c * (keyW + gap) + keyW / 2}
                  y={r * (keyH + gap) + keyH - 0.5}
                  textAnchor="middle"
                  fill="#00ff41"
                  fontSize="0.7"
                  fontFamily="monospace"
                  className="obelisk-key-label"
                >
                  {displayNum}
                </text>
              </g>
            );
          })
        )}
      </g>
    </motion.g>
  );
};

