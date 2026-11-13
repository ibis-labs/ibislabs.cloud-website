import React from "react";
import { NedjemBastet } from "../animations/obelisk/NedjemBastet";

export interface NedjemBastetStandaloneProps extends React.SVGProps<SVGSVGElement> {
  /** Primary bronze/neon wireframe color (defaults to currentColor, e.g. #00FFFF or #FFC000). */
  inkColor?: string;
  onEyeClick?: () => void;
}

/**
 * Standalone full-frame SVG component for Nedjem Bastet (viewBox="65 290 130 240").
 * Ready to drop into any portfolio card, hero section, or interactive modal at full resolution.
 */
export const NedjemBastetStandalone: React.FC<NedjemBastetStandaloneProps> = ({
  inkColor = "currentColor",
  onEyeClick,
  className,
  ...svgProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="65 290 130 240"
      fill="none"
      className={className}
      {...svgProps}
    >
      <NedjemBastet ritualStage={2} color={inkColor} standalone onEyeClick={onEyeClick} />
    </svg>
  );
};
