"use client";

import React, { useEffect, useState } from "react";

type AssetCategory = "all" | "animated" | "deities" | "monuments" | "glyphs";
type InkTheme = "cyan" | "gold" | "purple" | "red" | "lime";

interface VectorAsset {
  file: string;
  title: string;
  cat: Exclude<AssetCategory, "all">;
  tag: string;
  desc: string;
  normalize?: boolean;
  imgOnly?: boolean;
}

const VECTOR_ASSETS: VectorAsset[] = [
  // Animated SVGs
  {
    file: "thoth-ibis-chip-etch.svg",
    title: "Thoth's Chip Splash Etch",
    cat: "animated",
    tag: "11-Stage Etch",
    desc: "Self-running 11-stage silicon die, sacred Ibis, IC package, and 16-pin circuit etch.",
  },
  {
    file: "khepri-evening-chronicle.svg",
    title: "Evening Chronicle Khepri",
    cat: "animated",
    tag: "8s Spectrum + Orbs",
    desc: "Winged scarab inside obsidian neon cartouche with pearl solar/lunar orbs and 8s spectrum cycle.",
  },
  {
    file: "seshat-animation.svg",
    title: "Seshat Harp Goddess",
    cat: "animated",
    tag: "CSS Keyframes",
    desc: "28 plucked hair-harp strands, opposing wrist bangle sweeps, sparkling crown star, and 59 palm-rib buds.",
  },
  {
    file: "neheh-circuit-akh.svg",
    title: "Neheh-Circuit Akh",
    cat: "animated",
    tag: "SMIL Arpeggio",
    desc: "36-rib SMIL harp arpeggio with pulsing Ankh core and multi-ring decan indicators.",
  },
  {
    file: "iphty-link-duck-shimmer.svg",
    title: "Iphty Pintail Duck Shimmer",
    cat: "animated",
    tag: "52-Feather Wave",
    desc: "Custom pintail duck emblem with a 52-feather cascading cyan shimmer and ruby eye flash.",
  },
  {
    file: "duamutef-jar.svg",
    title: "Duamutef Canopic Jar",
    cat: "animated",
    tag: "Dual Neon Glow",
    desc: "Jackal-headed guardian vessel with pulsing crimson head and cyber-cyan inscribed body.",
  },
  {
    file: "shen-ring.svg",
    title: "Shen Ring 360-Day Arc",
    cat: "animated",
    tag: "SMIL Arc",
    desc: "Eternal protection loop with animated 360-day orbital progress arc and degree ticks.",
  },
  {
    file: "cyber-ankh.svg",
    title: "Luminous Cyber Ankh",
    cat: "animated",
    tag: "SVG Glow Filter",
    desc: "Circuit-routed Ankh emblem illuminated by multi-stage SVG Gaussian glow filters.",
  },

  // Deities & Guardians
  {
    file: "nedjem-bastet-cat.svg",
    title: "Nedjem Bastet Sculpture",
    cat: "deities",
    tag: "121 Vector Paths",
    desc: "Seated Egyptian Bastet guardian with gold hoop earring, 60-gem lapis/carnelian collar, and Udjat pectoral.",
  },
  {
    file: "duamutef-head.svg",
    title: "Duamutef Jackal Head",
    cat: "deities",
    tag: "Guardian Profile",
    desc: "Angular cyber-jackal profile emblem representing protective data stewardship.",
  },
  {
    file: "khepri-scarab.svg",
    title: "Khepri Scarab Line Master",
    cat: "deities",
    tag: "Detailed Line Art",
    desc: "Raw Inkscape master line-art of the symmetrical 11-tier winged Khepri scarab.",
    normalize: true,
  },
  {
    file: "seshat-detailed-paths.svg",
    title: "Seshat Detailed Vector Master",
    cat: "deities",
    tag: "Full Line Art",
    desc: "Complete unshaded Inkscape path master for the Seshat Chronometer illustration.",
    normalize: true,
  },
  {
    file: "pharaoh-avatar.svg",
    title: "Pharaoh Scribe Avatar",
    cat: "deities",
    tag: "Inkscape Master",
    desc: "Full-color custom illustrated Pharaoh scribe portrait created in Inkscape.",
    imgOnly: true,
  },
  {
    file: "iphty-link-duck.svg",
    title: "Iphty Pintail Duck Master",
    cat: "deities",
    tag: "Inkscape Master",
    desc: "Detailed multi-feather pintail duck master vector illustration.",
    imgOnly: true,
  },
  {
    file: "iphty-link-duck-badge.svg",
    title: "Iphty Duck Minimal Badge",
    cat: "deities",
    tag: "24x24 Emblem",
    desc: "Compact UI badge distillation of the Iphty pintail duck silhouette.",
  },
  {
    file: "iphty-link-icon.svg",
    title: "Iphty Link Crest",
    cat: "deities",
    tag: "Inkscape Emblem",
    desc: "Encrypted peer-link crest icon crafted for zero-knowledge messaging.",
    imgOnly: true,
  },

  // Monuments & Circuitry
  {
    file: "thoth-chip-logo.svg",
    title: "Thoth Ibis Silicon Chip",
    cat: "monuments",
    tag: "Brand Signature",
    desc: "Primary Ibis Labs LLC & Thoth's Notebook integrated circuit emblem.",
    normalize: true,
  },
  {
    file: "first-pylon-icon.svg",
    title: "First Pylon of Philae (Etch)",
    cat: "monuments",
    tag: "Gateway Traces",
    desc: "Monumental temple gateway rendered with PCB trace geometry.",
  },
  {
    file: "first-pylon-of-philae.svg",
    title: "First Pylon of Philae Master",
    cat: "monuments",
    tag: "Inkscape Master",
    desc: "Architectural master vector study of the First Pylon at Philae.",
    imgOnly: true,
  },
  {
    file: "crypto-obelisk-of-istanbul-detailed.svg",
    title: "Obelisk of Istanbul & Relief",
    cat: "monuments",
    tag: "Monument + Pedestal",
    desc: "Complete Thutmose III obelisk shaft with Theodosius pedestal relief line-work.",
    normalize: true,
  },
  {
    file: "crypto-obelisk-minimal.svg",
    title: "Crypto Obelisk Minimal",
    cat: "monuments",
    tag: "Clean Icon",
    desc: "Streamlined UI icon variant of the Obelisk monument.",
  },
  {
    file: "ostracon-circuit-tablet.svg",
    title: "Ostracon Circuit Tablet",
    cat: "monuments",
    tag: "PCB Limestone Shard",
    desc: "Ancient scribe limestone shard fused with modern copper circuit traces.",
  },

  // Cyber Glyphs & Icons
  {
    file: "cyber-stylus.svg",
    title: "Cyber Scribe Stylus",
    cat: "glyphs",
    tag: "Tool Glyph",
    desc: "Precision digital reed stylus vector icon.",
  },
  {
    file: "cyber-jar.svg",
    title: "Cyber Canopic Vessel",
    cat: "glyphs",
    tag: "Vault Glyph",
    desc: "Encrypted archive vessel icon with circuit nodes.",
  },
  {
    file: "moon-phases-sheet.svg",
    title: "8-Phase Khonsu Lunar Sheet",
    cat: "glyphs",
    tag: "Lunar Sprite Sheet",
    desc: "Eight-phase lunar cycle vector sheet engineered for astronomical timers.",
  },
  {
    file: "eye-of-horus-icon.svg",
    title: "Eye of Horus (Wedjat)",
    cat: "glyphs",
    tag: "24x24 Glyph",
    desc: "Geometric Wedjat protection and fractional measurement icon.",
  },
  {
    file: "ibis-icon.svg",
    title: "Sacred Ibis Glyph",
    cat: "glyphs",
    tag: "24x24 Glyph",
    desc: "Clean monoline sacred Ibis icon.",
  },
  {
    file: "seshet-icon.svg",
    title: "Seshat Seven-Pointed Rosette",
    cat: "glyphs",
    tag: "24x24 Glyph",
    desc: "Minimalist seven-petalled Seshat star emblem.",
  },
];

const CATEGORIES: { id: AssetCategory; label: string }[] = [
  { id: "all", label: `All Curated (${VECTOR_ASSETS.length})` },
  { id: "animated", label: "Animated SVGs" },
  { id: "deities", label: "Deities & Guardians" },
  { id: "monuments", label: "Monuments & Circuitry" },
  { id: "glyphs", label: "Cyber Glyphs" },
];

const INK_THEMES: { id: InkTheme; label: string }[] = [
  { id: "cyan", label: "Cyber Cyan" },
  { id: "gold", label: "Solar Gold" },
  { id: "purple", label: "Seshat Purple" },
  { id: "red", label: "Duamutef Red" },
  { id: "lime", label: "Decan Lime" },
];

const INK_CLASS_MAP: Record<InkTheme, string> = {
  cyan: "vault-ink-cyan",
  gold: "vault-ink-gold",
  purple: "vault-ink-purple",
  red: "vault-ink-red",
  lime: "vault-ink-lime",
};

function normalizeInkscapeSvg(raw: string): string {
  return raw
    .replace(/stroke:#000000/gi, "stroke:currentColor")
    .replace(/stroke:#624040/gi, "stroke:currentColor")
    .replace(/stroke="#000000"/gi, 'stroke="currentColor"')
    .replace(/stroke="#624040"/gi, 'stroke="currentColor"');
}

function InlineSvgAsset({
  file,
  title,
  normalize = false,
  imgOnly = false,
}: {
  file: string;
  title: string;
  normalize?: boolean;
  imgOnly?: boolean;
}) {
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    if (imgOnly) return;
    let cancelled = false;
    fetch(`/portfolio-svg/${file}`)
      .then((r) => (r.ok ? r.text() : ""))
      .then((txt) => {
        if (cancelled || !txt) return;
        setMarkup(normalize ? normalizeInkscapeSvg(txt) : txt);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [file, normalize, imgOnly]);

  if (imgOnly || !markup) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/portfolio-svg/${file}`}
        alt={title}
        loading="lazy"
        className="max-h-full max-w-full object-contain"
      />
    );
  }

  return (
    <div
      id={file === "seshat-animation.svg" ? "seshat-button" : undefined}
      className="vault-inline-svg"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

export default function VectorVaultGallery() {
  const [category, setCategory] = useState<AssetCategory>("all");
  const [inkTheme, setInkTheme] = useState<InkTheme>("cyan");
  const [papyrusBackdrop, setPapyrusBackdrop] = useState(false);
  const [inspectedAsset, setInspectedAsset] = useState<VectorAsset | null>(null);

  useEffect(() => {
    if (!inspectedAsset) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInspectedAsset(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inspectedAsset]);

  const filtered = VECTOR_ASSETS.filter(
    (a) => category === "all" || a.cat === category
  );

  return (
    <section id="vector-vault" className="w-full max-w-6xl scroll-mt-24 space-y-8">
      <div className="text-center space-y-2">
        <p className="text-xs font-mono text-cyber-cyan uppercase tracking-[0.25em]">
          Original Inkscape &amp; Hand-Tuned SVG Assets · Ibis Labs LLC
        </p>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.18em] text-white">
          Custom Vector Graphics Vault
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Browse custom vector illustrations, animated SMIL/CSS emblems, and
          architectural reliefs designed by Ibis Labs LLC. Switch neon ink
          palettes or toggle the stage backdrop to inspect stroke geometry.
        </p>
      </div>

      {/* Filter & Theme Control Bar */}
      <div className="border border-gray-800 bg-black/70 rounded-lg p-4 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`thoth-btn ${category === cat.id ? "thoth-btn-active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Backdrop Toggle */}
          <button
            type="button"
            onClick={() => setPapyrusBackdrop((p) => !p)}
            className={`thoth-btn ${papyrusBackdrop ? "thoth-btn-gold thoth-btn-gold-active" : ""}`}
          >
            Stage: {papyrusBackdrop ? "Papyrus Light" : "Obsidian Black"}
          </button>
        </div>

        {/* Neon Ink Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-800/80">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mr-1">
            Vector Neon Ink:
          </span>
          {INK_THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setInkTheme(t.id)}
              className={`thoth-btn ${inkTheme === t.id ? "thoth-btn-active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((item) => (
          <article
            key={item.file}
            className="group border border-gray-800 hover:border-cyber-cyan bg-black/60 rounded-lg p-4 flex flex-col justify-between gap-3 hover:shadow-[0_0_24px_rgba(31,170,254,0.22)] transition-all duration-200"
          >
            <div className="space-y-3">
              {/* Vector Stage */}
              <div
                onClick={() => setInspectedAsset(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setInspectedAsset(item);
                  }
                }}
                aria-label={`Inspect ${item.title}`}
                className={`h-44 rounded border border-gray-800/90 p-4 flex items-center justify-center overflow-hidden cursor-pointer transition-colors ${
                  INK_CLASS_MAP[inkTheme]
                } ${papyrusBackdrop ? "vault-stage-papyrus" : "bg-black"}`}
              >
                <InlineSvgAsset
                  file={item.file}
                  title={item.title}
                  normalize={item.normalize}
                  imgOnly={item.imgOnly}
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono border border-cyber-cyan/40 text-cyber-cyan px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.tag}
                </span>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                  Ibis Labs SVG
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-cyber-cyan transition-colors tracking-wider">
                {item.title}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-800/80 text-xs">
              <button
                type="button"
                onClick={() => setInspectedAsset(item)}
                className="text-cyber-cyan hover:underline font-mono text-[11px] uppercase tracking-wider cursor-pointer"
              >
                Inspect ⤢
              </button>
              <a
                href={`/portfolio-svg/${item.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyber-cyan font-mono text-[11px] uppercase tracking-wider transition-colors"
              >
                Raw .SVG ↗
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Vector Lightbox Inspector Modal */}
      {inspectedAsset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={inspectedAsset.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setInspectedAsset(null);
          }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div className="w-full max-w-3xl border border-cyber-cyan ring-1 ring-cyber-cyan/40 bg-black rounded-lg p-6 sm:p-8 shadow-[0_0_60px_rgba(31,170,254,0.3)] space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyber-cyan mb-1">
                  Custom Vector Graphic · Ibis Labs LLC
                </p>
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">
                  {inspectedAsset.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedAsset(null)}
                className="thoth-btn"
              >
                Close ✕
              </button>
            </div>

            <div
              className={`h-80 sm:h-96 rounded-lg border border-gray-800 p-6 flex items-center justify-center overflow-hidden ${
                INK_CLASS_MAP[inkTheme]
              } ${papyrusBackdrop ? "vault-stage-papyrus" : "bg-black"}`}
            >
              <InlineSvgAsset
                file={inspectedAsset.file}
                title={inspectedAsset.title}
                normalize={inspectedAsset.normalize}
                imgOnly={inspectedAsset.imgOnly}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                {inspectedAsset.desc}
              </p>
              <a
                href={`/portfolio-svg/${inspectedAsset.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="thoth-btn thoth-btn-active shrink-0"
              >
                Open Standalone .SVG ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

