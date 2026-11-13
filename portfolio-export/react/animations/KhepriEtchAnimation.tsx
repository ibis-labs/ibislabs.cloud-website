"use client";

import { motion } from "framer-motion";
import type { SVGMotionProps } from "framer-motion";
import React from "react";
import { cn } from "../utils";

export interface KhepriEtchProps extends Omit<SVGMotionProps<SVGSVGElement>, "className"> {
  className?: string;
  forceGold?: boolean;
  initialColor?: string;
  showSubstrate?: boolean;
}

const DELAY_MULTIPLIER = 0.05;
const GROUP_SIZE = 1;
const INITIAL_COLOR = "#001EFF";
const PEARL_ORB_COLOR = "#F0EAD6";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const etchPath: any = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * DELAY_MULTIPLIER, type: "spring", duration: 0.9, bounce: 0 },
      opacity: { delay: i * DELAY_MULTIPLIER, duration: 0.02 },
    },
  }),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pearlOrbVariant: any = {
  hidden: {
    opacity: 0.0,
    scale: 0.8,
    filter: "blur(6px)",
  },
  visible: (i: number) => ({
    opacity: 0.89,
    scale: 0.85,
    filter: "blur(2px)",
    transition: {
      opacity: { delay: i * DELAY_MULTIPLIER, duration: 6 },
      scale: { delay: i * DELAY_MULTIPLIER, duration: 5, type: "spring" },
      filter: { delay: i * DELAY_MULTIPLIER, duration: 2 },
    },
  }),
};

export const KhepriEtchAnimation = React.forwardRef<SVGSVGElement, KhepriEtchProps>(
  ({ className, forceGold = false, initialColor = INITIAL_COLOR, showSubstrate = true, ...rest }, ref) => {
    let bodyIdx = 0;
    let limbsIdx = 0;
    let wingsIdx = 0;
    let orbsIdx = 0;
    const bodyCustom = () => bodyIdx++;
    const limbsCustom = () => GROUP_SIZE + limbsIdx++;
    const wingsCustom = () => GROUP_SIZE * 2 + wingsIdx++;
    const ORB_BASE = GROUP_SIZE * 4;
    const orbsCustom = () => ORB_BASE + orbsIdx++;

    const POST_ETCH_BUFFER = 1.2;
    const postDelay = GROUP_SIZE * 2 * DELAY_MULTIPLIER + POST_ETCH_BUFFER;
    const [cycleActive, setCycleActive] = React.useState(false);

    React.useEffect(() => {
      setCycleActive(false);
      if (forceGold) return undefined;
      const t = setTimeout(() => setCycleActive(true), postDelay * 1000);
      return () => clearTimeout(t);
    }, [postDelay, forceGold]);

    return (
      <motion.svg
        ref={ref}
        viewBox="0 0 100 100"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
        color={forceGold ? "#FFD700" : initialColor}
        className={cn(
          "w-full h-full overflow-visible khepri-root",
          cycleActive && !forceGold && "khepri-color-cycle",
          forceGold && "khepri-force-gold",
          className,
        )}
        initial="hidden"
        animate="visible"
        {...rest}
      >
        {showSubstrate && (
          <motion.rect
            x="2.0"
            y="21.5"
            width="97"
            height="49"
            rx="4"
            fill="#000000"
            stroke={forceGold ? "#FFD700" : initialColor}
            strokeWidth="0.7"
            className={forceGold ? "khepri-substrate-gold" : "khepri-substrate-cobalt"}
            pointerEvents="none"
          />
        )}
        <g
          fill="none"
          stroke={cycleActive && !forceGold ? "currentColor" : forceGold ? "#FFD700" : initialColor}
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.g id="celestial-bodies">
            <motion.circle
              id="solar-orb"
              cx="50.48"
              cy="31.94"
              r="5.27"
              fill={forceGold ? "#FFD700" : PEARL_ORB_COLOR}
              stroke="none"
              className="khepri-orb"
              custom={orbsCustom()}
              variants={pearlOrbVariant}
            />
            <motion.circle
              id="lunar-orb"
              cx="50.52"
              cy="60.94"
              r="3.14"
              fill={forceGold ? "#FFD700" : PEARL_ORB_COLOR}
              stroke="none"
              className="khepri-orb"
              custom={orbsCustom()}
              variants={pearlOrbVariant}
            />
          </motion.g>

          <motion.g id="body-and-legs">
            <motion.path id="thorax-lower" d="m 55.64,46.24 c 0.56,0.99 0.7,3.33 0.62,5.74 -0.04,1.06 -0.55,1.86 -0.55,1.86 m 0,0 c -1.37,2.81 -5.23,2.75 -5.23,2.75 0,0 -3.84,0.05 -5.21,-2.75 m 0.07,-7.6 c -0.56,0.99 -0.7,3.33 -0.62,5.74 0.04,1.06 0.55,1.86 0.55,1.86" custom={bodyCustom()} variants={etchPath} />
            <motion.g id="thorax-upper">
              <motion.path d="m 45.3,46.32 c 0.05,-0.45 0.67,-0.93 2.25,-0.68 1.74,0.28 2.99,1.35 2.99,1.35" custom={bodyCustom()} variants={etchPath} />
              <motion.path id="thorax-upper-main" d="m 55.69,46.33 c -0.28,-5.01 -5.18,-5.21 -5.18,-5.21 0,0 -4.96,0.2 -5.24,5.21" custom={bodyCustom()} variants={etchPath} />
              <motion.path d="m 55.67,46.32 c -0.05,-0.45 -0.67,-0.93 -2.25,-0.68 -1.74,0.28 -2.9,1.35 -2.9,1.35" custom={bodyCustom()} variants={etchPath} />
            </motion.g>
            <motion.path id="head" d="m 50.48,39.2 c 2.17,0.02 2.41,2.48 2.41,2.48 m -2.41,-2.48 c -2.17,0.02 -2.41,2.48 -2.41,2.48" custom={bodyCustom()} variants={etchPath} />
            <motion.g id="antennae">
              <motion.path id="left-antenna" d="m 48.45,39.03 0.58,0.54 m -0.53,-1.83 -0.09,1.15 -0.4,0.37" custom={limbsCustom()} variants={etchPath} />
              <motion.path id="right-antenna" d="m 52.52,39.03 -0.58,0.54 m 0.53,-1.83 0.09,1.15 0.4,0.37" custom={limbsCustom()} variants={etchPath} />
            </motion.g>
            <motion.g id="legs">
              <motion.path id="left-leg-fore" d="m 46.87,42.47 c -3.04,0.03 -3.69,-0.73 -3.82,-1.85 -0.13,-1.12 0.36,-1.19 0.36,-1.19 0,0 -0.07,-0.6 -0.03,-1.03 0.03,-0.43 0.02,-0.28 0.02,-0.28 l 1.9,-2.7 c 0,0 0.5,-1.65 -0.07,-1.69 -0.56,-0.03 0,-0.13 -0.13,-1.16 -0.13,-1.03 -2.55,-0.89 -1.52,-0.73 1.03,0.17 0.33,3.6 0.33,3.6 l -1.03,2.12 -0.63,0.66 c 0,0 -0.3,2.3 -0.1,2.41 0.64,0.36 0.4,1.36 0.4,1.36 l 2.84,3.42" custom={limbsCustom()} variants={etchPath} />
              <motion.path id="left-leg-hind" d="m 43.68,54.38 0.96,-3.7 m -0.96,3.73 c 0,0 -0.07,0.43 -0.03,1.69 0.03,1.26 -0.2,-0.13 2.18,1.65 2.38,1.79 2.05,3.88 2.45,3.54 1,-0.86 0.78,-1.02 0.73,-2.02 -0.03,-0.62 -2.19,-1.9 -3.24,-2.51 -0.42,-0.24 -1.03,-0.66 -1.03,-1.59 0,-0.93 0.53,-1.32 0.53,-1.32" custom={limbsCustom()} variants={etchPath} />
              <motion.path id="right-leg-fore" d="m 54.1,42.47 c 3.04,0.03 3.69,-0.73 3.82,-1.85 0.13,-1.12 -0.36,-1.19 -0.36,-1.19 0,0 0.07,-0.6 0.03,-1.03 -0.03,-0.43 -0.02,-0.28 -0.02,-0.28 l -1.9,-2.7 c 0,0 -0.5,-1.65 0.07,-1.69 0.56,-0.03 0,-0.13 0.13,-1.16 0.13,-1.03 2.55,-0.89 1.52,-0.73 -1.03,0.17 -0.33,3.6 -0.33,3.6 l 1.03,2.12 0.63,0.66 c 0,0 0.3,2.3 0.1,2.41 -0.64,0.36 -0.4,1.36 -0.4,1.36 l -2.84,3.42" custom={limbsCustom()} variants={etchPath} />
              <motion.path id="right-leg-hind" transform="matrix(-1,0,0,1,100.71732,0)" d="m 43.43,54.38 0.96,-3.7 m -0.96,3.73 c 0,0 -0.07,0.43 -0.03,1.69 0.03,1.26 -0.2,-0.13 2.18,1.65 2.38,1.79 2.05,3.88 2.45,3.54 1,-0.86 0.78,-1.02 0.73,-2.02 -0.03,-0.62 -2.19,-1.9 -3.24,-2.51 -0.42,-0.24 -1.03,-0.66 -1.03,-1.59 0,-0.93 0.53,-1.32 0.53,-1.32" custom={limbsCustom()} variants={etchPath} />
            </motion.g>
          </motion.g>

          <motion.g id="wings-assembly">
            <motion.g id="left-wing-frame">
              <motion.path d="m 24.69,40.2 c 5.56,6.67 10.78,6.36 10.78,6.36 l 9.44,0.1" custom={wingsCustom()} variants={etchPath} />
              <motion.path d="m 44.7,44.59 c -0.69,-0.92 -9.68,-0.56 -9.68,-0.56 0,0 -1.75,0.21 -2.29,-0.18 -0.47,-0.34 -0.49,-1 -0.45,-1.17 0.16,-0.68 0.7,-0.91 1.16,-0.84 0.19,0.03 0.64,0.13 0.69,0.93 0.05,0.79 -0.74,0.6 -0.74,0.6" custom={wingsCustom()} variants={etchPath} />
              <motion.path d="m 32.67,41.97 c 0,0 -3.23,-0.21 -3.84,-0.26 -1.22,-0.1 -1.69,-0.93 -1.69,-0.93 H 26.41 L 25.82,40.12" custom={wingsCustom()} variants={etchPath} />
            </motion.g>

            <motion.g id="right-wing-frame" transform="matrix(-1,0,0,1,100.71732,0)">
              <motion.path d="m 24.44,40.2 c 5.56,6.67 10.78,6.36 10.78,6.36 l 9.44,0.1" custom={wingsCustom()} variants={etchPath} />
              <motion.path d="m 44.45,44.59 c -0.69,-0.92 -9.68,-0.56 -9.68,-0.56 0,0 -1.75,0.21 -2.29,-0.18 -0.47,-0.34 -0.49,-1 -0.45,-1.17 0.16,-0.68 0.7,-0.91 1.16,-0.84 0.19,0.03 0.64,0.13 0.69,0.93 0.05,0.79 -0.74,0.6 -0.74,0.6" custom={wingsCustom()} variants={etchPath} />
              <motion.path d="m 32.42,41.97 c 0,0 -3.23,-0.21 -3.84,-0.26 -1.22,-0.1 -1.69,-0.93 -1.69,-0.93 h -0.73 l -0.6,-0.66" custom={wingsCustom()} variants={etchPath} />
            </motion.g>

            <motion.g id="feathers-master-group">
              <motion.path id="L1-1" d="m 2.433,39.878 c 0.069,0.11 0.139,0.219 0.21,0.325 2.021,-0.003 20.08,-0.027 29.248,0.079 3.543,0.041 7.829,-0.104 10.415,1.806" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L1-2" d="m 2.255,39.817 c 1.858,2.943 3.975,4.460 5.629,5.238 1.653,0.777 2.861,0.818 2.861,0.818" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R1-1" d="m 2.433,39.878 c 0.069,0.11 0.139,0.219 0.21,0.325 2.021,-0.003 20.08,-0.027 29.248,0.079 3.543,0.041 7.829,-0.104 10.415,1.806" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R1-2" d="m 2.255,39.817 c 1.858,2.943 3.975,4.460 5.629,5.238 1.653,0.777 2.861,0.818 2.861,0.818" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L2-1" d="m 6.85,46.68 c 4.61,3.76 8.34,2.91 8.34,2.91" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L2-2" d="M 6.88,46.67 27.56,43.15" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R2-1" d="m 6.85,46.68 c 4.61,3.76 8.34,2.91 8.34,2.91" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R2-2" d="M 6.88,46.67 27.56,43.15" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L3-1" d="m 12.84,50.39 c 3.33,1.86 7.74,1.37 7.74,1.37" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L3-2" d="M 12.84,50.39 29.67,44.67" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R3-1" d="m 12.84,50.39 c 3.33,1.86 7.74,1.37 7.74,1.37" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R3-2" d="M 12.84,50.39 29.67,44.67" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L4-1" d="m 19.24,52.48 c 3.41,0.88 6.78,-0.14 6.78,-0.14" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L4-2" d="M 19.26,52.47 31.94,45.85" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R4-1" d="m 19.24,52.48 c 3.41,0.88 6.78,-0.14 6.78,-0.14" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R4-2" d="M 19.26,52.47 31.94,45.85" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L5-1" d="m 25.18,52.95 c 2.48,0.19 5.05,-0.49 5.05,-0.49" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L5-2" d="m 25.21,52.93 9.06,-6.46" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R5-1" d="m 25.18,52.95 c 2.48,0.19 5.05,-0.49 5.05,-0.49" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R5-2" d="m 25.21,52.93 9.06,-6.46" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L6-1" d="m 29.58,53.09 c 2.53,0.09 4.01,-0.83 4.01,-0.83" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L6-2" d="M 29.59,53.07 36.41,46.6" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R6-1" d="m 29.58,53.09 c 2.53,0.09 4.01,-0.83 4.01,-0.83" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R6-2" d="M 29.59,53.07 36.41,46.6" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L7-1" d="m 32.94,53.04 c 2.57,-0.09 3.27,-0.77 3.27,-0.77" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L7-2" d="m 32.96,53.03 5.4,-6.4" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R7-1" d="m 32.94,53.04 c 2.57,-0.09 3.27,-0.77 3.27,-0.77" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R7-2" d="m 32.96,53.03 5.4,-6.4" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L8-1" d="m 35.8,53.04 c 1.96,-0.05 2.77,-0.94 2.77,-0.94" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L8-2" d="m 35.75,53.03 3.95,-6.38" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R8-1" d="m 35.8,53.04 c 1.96,-0.05 2.77,-0.94 2.77,-0.94" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R8-2" d="m 35.75,53.03 3.95,-6.38" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L9-1" d="m 38.23,52.96 c 1.5,-0.09 1.96,-0.82 1.96,-0.82" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L9-2" d="m 38.24,52.93 2.59,-6.28" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R9-1" d="m 38.23,52.96 c 1.5,-0.09 1.96,-0.82 1.96,-0.82" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R9-2" d="m 38.24,52.93 2.59,-6.28" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L10-1" d="m 39.94,52.95 c 1.82,0.2 2.27,-0.88 2.27,-0.88" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L10-2" d="M 39.95,52.92 41.85,46.67" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R10-1" d="m 39.94,52.95 c 1.82,0.2 2.27,-0.88 2.27,-0.88" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R10-2" d="M 39.95,52.92 41.85,46.67" custom={wingsCustom()} variants={etchPath} />
              </motion.g>

              <motion.path id="L11-1" d="m 41.98,53.22 c 0.63,-0.12 0.72,0.03 0.92,0.16 0.47,0.28 0.78,1.03 0.78,1.03" custom={wingsCustom()} variants={etchPath} />
              <motion.path id="L11-2" d="m 41.97,53.21 1.36,-6.53" custom={wingsCustom()} variants={etchPath} />
              <motion.g transform="matrix(-1,0,0,1,100.71732,0)">
                <motion.path id="R11-1" d="m 41.98,53.22 c 0.63,-0.12 0.72,0.03 0.92,0.16 0.47,0.28 0.78,1.03 0.78,1.03" custom={wingsCustom()} variants={etchPath} />
                <motion.path id="R11-2" d="m 41.97,53.21 1.36,-6.53" custom={wingsCustom()} variants={etchPath} />
              </motion.g>
            </motion.g>
          </motion.g>
        </g>
      </motion.svg>
    );
  }
);

KhepriEtchAnimation.displayName = "KhepriEtchAnimation";
export { KhepriEtchAnimation as KhepriIconMotion };
