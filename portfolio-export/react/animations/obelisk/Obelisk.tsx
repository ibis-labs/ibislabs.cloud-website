"use client";

import React from "react";
import { cn } from "../../utils";

export interface ObeliskProps {
  ritualStage: number;
  color?: string;
  capstoneColor?: string;
}

export const Obelisk = ({
  ritualStage,
  color = "#00FFFF",
  capstoneColor,
}: ObeliskProps) => {
  const ink = color;
  const shaftStroke = ritualStage === 0 ? "#666600" : ink;
  const finalCapstoneColor = capstoneColor || ink;

  return (
    <g id="obelisk-structure" className="animate-float-slow" color={ink}>
      {/* Main Shaft */}
      <path
        id="obelisk-outline"
        d="M 12.6, 245.5 L 15.688, 30.612 H 39.311 L 42.4, 245.5 Z"
        fill="none"
        stroke={shaftStroke}
        strokeWidth="0.3"
        strokeLinejoin="round"
        className="obelisk-shaft-transition"
      />

      {/* Benben Capstone */}
      <path
        id="capstone"
        d="M 15.588,30.612 27.5,10.388 39.4,30.612 Z"
        fill={finalCapstoneColor}
        stroke={ink}
        strokeWidth="0.2"
        className={cn("transition-all duration-1000", ritualStage >= 2 && "obelisk-capstone-glow")}
      />
    </g>
  );
};

