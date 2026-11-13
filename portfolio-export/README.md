# Thoth's Notebook — Portable Portfolio Export

This folder (`portfolio-export/`) is a **100% self-contained showcase bundle** of all custom animations, interactive Cyber-Egyptian rituals, and vector graphics from **Thoth's Notebook**. Every file is decoupled from Firebase, Auth providers, and Next.js `@/` path aliases so you can copy-paste individual pieces or the entire folder directly into your personal website.

---

## Quick Preview (Zero Server Needed)

Double-click **`portfolio-export/index.html`** in your file explorer (or serve the folder on any static host) to launch the **Master Portfolio Gallery**:
- Switch live neon ink themes (**Cyber Cyan**, **Ankh Gold**, **Seshat Purple**, **Duamutef Red**, **Decan Lime**) and toggle between **Obsidian** and **Papyrus** backdrops.
- Launch all **8 interactive animation demos** inline or as standalone pages.
- Browse, filter, and copy raw markup for all **34 standalone `.svg` files**.

---

## Folder Structure

```text
portfolio-export/
├── index.html                        # Master interactive showcase & 34-SVG gallery
├── gallery.css / gallery.js          # Gallery styles & controller (zero inline styles)
├── svg/                              # 34 standalone .svg files (15 Inkscape + 19 extracted/animated)
├── html-previews/                    # 8 drop-in vanilla HTML/CSS/JS interactive embeds
│   ├── ka-terminal.html              # 6-relic interactive neon deck
│   ├── seshat-chronometer.html       # Animated Harp Goddess + 59-bud palm-rib clock
│   ├── decryption-header.html        # Hieroglyph → Greek → English decryption sequence
│   ├── neheh-circuit.html            # Interactive Shen Ring of Commitment state matrix
│   ├── obelisk-ritual.html           # Animated viewBox camera pan + 3x knock ritual + Nedjem Bastet
│   ├── nedjem-bastet.html            # Standalone 121-path Bastet sculpture + regalia zoom + Istanbul view
│   ├── khepri-etch.html              # Evening Chronicle Khepri glissando etch + pearl orbs + neon cycle
│   ├── ibis-etch.html                # Splash login 11-stage Thoth's Chip circuit etch + lockup
│   ├── previews.css / previews.js    # Shared Cyber-Egyptian CSS & WAAPI controller
│   └── svg-bundle.js                 # Offline SVG/path bundle for file:// compatibility
└── react/                            # Self-contained React (.tsx) components & barrel exports
    ├── index.ts                      # Master barrel export
    ├── utils.ts                      # Zero-dependency cn() helper
    ├── styles/
    │   └── portfolio-animations.css  # Keyframes, neon glows, & showcase card styles
    ├── icons/                        # 20 custom React SVG icon components + index.ts
    └── animations/
        ├── IbisLogoEtch.tsx          # IbisLogoEtch + ThothSplashLockup
        ├── KhepriEtchAnimation.tsx
        ├── EveningChronicleThreshold.tsx
        ├── KhepriLineEtch.tsx
        ├── HieroglyphScrambleReveal.tsx
        ├── MoonPhaseIcon.tsx
        ├── CyberMoonTimer.tsx
        ├── neheh/                    # NehehCircuitSvg, ShenRing, NehehCircuitShowcase
        ├── obelisk/                  # Obelisk, Pedestal, HeroGlyphs, NedjemBastet, ObeliskRitualShowcase, IstanbulDial
        └── seshat/                   # SeshatChronometer, SeshatInterface, DecryptionHeader, EuclidElementsVoid
```

---

## How to Use in Your Website

### Option A: React / Next.js / Vite / Astro (`react/`)

1. Copy `portfolio-export/react/` (and `portfolio-export/svg/seshat-animation.svg` into `public/svg/seshat-animation.svg` if using `SeshatChronometer` or `SeshatInterface`).
2. Install peer packages if your site doesn't already have them:
   ```bash
   npm install framer-motion lucide-react
   ```
   *(Tailwind CSS is optional for layout utilities; all custom keyframes and showcase classes live in `react/styles/portfolio-animations.css`.)*
3. Import the stylesheet once in your app root (`layout.tsx`, `App.tsx`, or `main.tsx`) and render any piece:
   ```tsx
   import "./portfolio-export/react/styles/portfolio-animations.css";
   import {
     IbisLogoEtch,
     KhepriEtchAnimation,
     HieroglyphScrambleReveal,
     NehehCircuitShowcase,
     ObeliskRitualShowcase,
     SeshatChronometer,
     DuamatefJar,
     IphtyLinkDuckIcon,
   } from "./portfolio-export/react";

   export function PortfolioShowcase() {
     return (
       <section>
         <IbisLogoEtch size={220} />
         <KhepriEtchAnimation className="w-64 h-64" />
         <HieroglyphScrambleReveal inline line1="YOUR" line2="PORTFOLIO" />
         <NehehCircuitShowcase />
         <ObeliskRitualShowcase />
         <SeshatChronometer svgUrl="/svg/seshat-animation.svg" />
       </section>
     );
   }
   ```

### Option B: Vanilla HTML / Webflow / Static Site / `<iframe>` (`html-previews/`)

Copy `portfolio-export/html-previews/` to your static site and link or embed any piece directly:

```html
<iframe
  src="/portfolio/html-previews/neheh-circuit.html"
  width="100%"
  height="760"
  loading="lazy"
  title="Neheh-Circuit Interactive SVG"
></iframe>
```

### Option C: Standalone Vector & Animated `.svg` Files (`svg/`)

Every extracted/animated `.svg` file in `portfolio-export/svg/` works both as a standalone `<img src="...">` (with built-in default neon color) **and** as an inline `<svg>` that inherits `currentColor` from parent CSS:
- **`thoth-ibis-chip-etch.svg`** — Self-running 11-stage login/splash silicon chip etching animation (inner die → ticks → sacred Ibis → package → 16 pins).
- **`khepri-evening-chronicle.svg`** — Evening Chronicle scarab with obsidian neon cartouche, fuzzy pearl solar/lunar orbs, and 8s spectrum cycle.
- **`seshat-animation.svg`** — Wrap inline markup in `<div id="seshat-button">` to activate all internal CSS hair-harp, crown-star, rosette, and gem animations.
- **`neheh-circuit-akh.svg`** — Self-running SMIL 36-rib harp arpeggio + pulsing Ankh & decan indicators.
- **`iphty-link-duck-shimmer.svg`** — Self-running 52-feather cyan shimmer wave + ruby eye flash.
- **`duamutef-jar.svg`**, **`cyber-ankh.svg`**, **`shen-ring.svg`**, **`nedjem-bastet-cat.svg`**, **`first-pylon-icon.svg`**, **`thoth-chip-logo.svg`**, **`khepri-scarab.svg`**, and 22 more.

