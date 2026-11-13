"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Obelisk } from "./Obelisk";
import { HeroGlyphs } from "./HeroGlyphs";
import { VariousGlyphs } from "./VariousGlyphs";
import { Pedestal } from "./Pedestal";
import { NedjemBastet } from "./NedjemBastet";

export interface ObeliskGuardianProps {
  onRitualComplete?: () => void;
}

export const ObeliskGuardian = ({ onRitualComplete }: ObeliskGuardianProps) => {
  const [knocks, setKnocks] = useState(0);
  const [ritualStage, setRitualStage] = useState(0);
  const [isAwakened, setIsAwakened] = useState(false);

  const handleInteraction = () => {
    if (!isAwakened) {
      const nextKnock = knocks + 1;
      setKnocks(nextKnock);
      if (nextKnock >= 3) setIsAwakened(true);
      return;
    }

    if (ritualStage < 3) {
      const nextStage = ritualStage + 1;
      setRitualStage(nextStage);
      if (nextStage === 3) onRitualComplete?.();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[600px] cursor-pointer">
      <motion.svg
        viewBox={isAwakened ? "0 0 55 297" : "0 70 55 100"}
        onClick={handleInteraction}
        className="h-full w-auto"
      >
        <motion.g id="main-monument">
          <Obelisk ritualStage={isAwakened ? ritualStage : 0} />
          <VariousGlyphs ritualStage={isAwakened ? ritualStage : 0} />
          <HeroGlyphs ritualStage={isAwakened ? ritualStage : 0} />

          {isAwakened && (
            <>
              <Pedestal ritualStage={ritualStage} />
              <NedjemBastet
                ritualStage={ritualStage}
                onEyeClick={() => {
                  setRitualStage(4);
                  onRitualComplete?.();
                }}
              />
            </>
          )}
        </motion.g>

        {!isAwakened && (
          <text
            x="27.5"
            y="160"
            textAnchor="middle"
            fill="#fbbf24"
            fontSize="3"
            className="uppercase tracking-widest animate-pulse"
          >
            Knock {3 - knocks}x to Awaken
          </text>
        )}
      </motion.svg>
    </div>
  );
};

