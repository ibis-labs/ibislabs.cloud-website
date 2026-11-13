/* ==========================================================================
   Thoth's Notebook — Master Portfolio Gallery Controller
   Renders all 8 interactive animation cards + all 34 vector SVG assets.
   ========================================================================== */

(function () {
  "use strict";

  var SVGS = window.THOTH_SVGS || {};

  function normalizeInkscape(raw) {
    if (!raw) return "";
    return raw
      .replace(/stroke:#000000/gi, "stroke:currentColor")
      .replace(/stroke:#624040/gi, "stroke:currentColor")
      .replace(/stroke="#000000"/gi, 'stroke="currentColor"')
      .replace(/stroke="#624040"/gi, 'stroke="currentColor"');
  }

  var ANIMATIONS = [
    {
      title: "Ka Terminal Artifact Deck",
      desc: "Six-node Cyber-Egyptian artifact deck (Thoth Chip, Duamutef Jar, Seshat Harp, First Pylon, Iphty Duck, Cyber Ankh) with click-to-etch & ripple.",
      previewUrl: "html-previews/ka-terminal.html",
      reactPath: "react/icons/* + react/animations/seshat/SeshatChronometer.tsx",
      thumb: "duamutef-jar.svg",
    },
    {
      title: "Seshat Harp Chronometer",
      desc: "Animated Harp Goddess with sparkling crown star, pulsing emerald/ruby gems, hair-harp wave, and live 59-bud palm-rib clock + quarter-hour ripple.",
      previewUrl: "html-previews/seshat-chronometer.html",
      reactPath: "react/animations/seshat/SeshatChronometer.tsx",
      thumb: "seshet-icon.svg",
    },
    {
      title: "Hieroglyph Decryption Header",
      desc: "4-phase scribe teletype → accelerating hieroglyph scramble → Greek lock (ΕΥΚΛΕΙΔΗΣ ΣΤΟΙΧΕΙΑ) → excess-cell collapse into EUCLID ELEMENTS, plus custom text mode.",
      previewUrl: "html-previews/decryption-header.html",
      reactPath: "react/animations/seshat/euclid/DecryptionHeader.tsx",
      thumb: "eye-of-horus-icon.svg",
    },
    {
      title: "Neheh-Circuit & Shen Ring",
      desc: "36-rib SMIL harp-arpeggio Shen Ring of Commitment with interactive Decan 1–10, Iris 1–7, Outer, and Outermost ring toggles.",
      previewUrl: "html-previews/neheh-circuit.html",
      reactPath: "react/animations/neheh/NehehCircuitShowcase.tsx",
      thumb: "shen-ring.svg",
    },
    {
      title: "Obelisk of Istanbul Ritual",
      desc: "Animated viewBox camera pan from Benben capstone summit to Theodosius pedestal relief & Nedjem Bastet guardian, 3x knock chromatic shift, and hero-glyph keypad migration.",
      previewUrl: "html-previews/obelisk-ritual.html",
      reactPath: "react/animations/obelisk/ObeliskRitualShowcase.tsx",
      thumb: "crypto-obelisk-minimal.svg",
    },
    {
      title: "Nedjem Bastet · Guardian of Sultanahmet",
      desc: "Complete 121-path Egyptian Bastet sculpture (hoop earring, 60-gem lapis & carnelian collar, Udjat pectoral) placed beside the Obelisk of Istanbul in homage to the cats of Sultanahmet.",
      previewUrl: "html-previews/nedjem-bastet.html",
      reactPath: "react/icons/NedjemBastetStandalone.tsx + react/animations/obelisk/NedjemBastet.tsx",
      thumb: "nedjem-bastet-cat.svg",
    },
    {
      title: "Evening Chronicle · Khepri Scarab Etch",
      desc: "Complete Evening Chronicle threshold ritual: 11-tier interleaved symmetrical feather glissando, fuzzy pearl solar & lunar orbs, obsidian neon cartouche, 8s spectrum cycle, and click-to-seal Solar Gold.",
      previewUrl: "html-previews/khepri-etch.html",
      reactPath: "react/animations/EveningChronicleThreshold.tsx + KhepriEtchAnimation.tsx",
      thumb: "khepri-evening-chronicle.svg",
    },
    {
      title: "Thoth's Chip Splash Etch",
      desc: "Login/splash 11-stage circuit etch: inner silicon die → diagonal ticks → sacred Ibis crest, beak & eye → outer package → 16 outward pins.",
      previewUrl: "html-previews/ibis-etch.html",
      reactPath: "react/animations/IbisLogoEtch.tsx (IbisLogoEtch + ThothSplashLockup)",
      thumb: "thoth-ibis-chip-etch.svg",
    },
  ];

  var SVG_CATALOG = [
    { file: "thoth-ibis-chip-etch.svg", title: "Thoth's Chip Splash Etch (Animated)", cat: "animated", tag: "11-Stage Etch" },
    { file: "khepri-evening-chronicle.svg", title: "Evening Chronicle Khepri (Animated)", cat: "animated", tag: "8s Spectrum + Orbs" },
    { file: "seshat-animation.svg", title: "Seshat Harp (Animated)", cat: "animated", tag: "CSS Keyframes" },
    { file: "neheh-circuit-akh.svg", title: "Neheh-Circuit Akh (Animated)", cat: "animated", tag: "SMIL Arpeggio" },
    { file: "iphty-link-duck-shimmer.svg", title: "Iphty Duck (52-Feather Shimmer)", cat: "animated", tag: "CSS Shimmer" },
    { file: "duamutef-jar.svg", title: "Duamutef Canopic Jar (Pulsing)", cat: "animated", tag: "Dual Glow" },
    { file: "shen-ring.svg", title: "Shen Ring (360-Day Arc)", cat: "animated", tag: "SMIL Arc" },
    { file: "cyber-ankh.svg", title: "Cyber Ankh (Luminous)", cat: "animated", tag: "SVG Glow Filter" },

    { file: "nedjem-bastet-cat.svg", title: "Nedjem Bastet Cat (Lapis & Gold)", cat: "deities", tag: "121 Vector Paths" },
    { file: "duamutef-head.svg", title: "Duamutef Jackal Head", cat: "deities", tag: "Guardian" },
    { file: "khepri-scarab.svg", title: "Khepri Winged Scarab", cat: "deities", tag: "Detailed Line Art", normalize: true },
    { file: "seshat-detailed-paths.svg", title: "Seshat Detailed Vector Paths", cat: "deities", tag: "Full Line Art", normalize: true },
    { file: "pharaoh-avatar.svg", title: "Pharaoh Scribe Avatar", cat: "deities", tag: "Inkscape Master", imgOnly: true },
    { file: "iphty-link-duck.svg", title: "Iphty Pintail Duck (Master)", cat: "deities", tag: "Inkscape Master", imgOnly: true },
    { file: "iphty-link-duck-badge.svg", title: "Iphty Duck Badge", cat: "deities", tag: "24x24 Emblem" },
    { file: "iphty-link-icon.svg", title: "Iphty Link Emblem", cat: "deities", tag: "Inkscape Icon", imgOnly: true },

    { file: "thoth-chip-logo.svg", title: "Thoth Ibis Silicon Chip", cat: "monuments", tag: "Circuit Emblem" },
    { file: "first-pylon-icon.svg", title: "First Pylon of Philae (Silicon Etch)", cat: "monuments", tag: "Gateway Traces" },
    { file: "first-pylon-of-philae.svg", title: "First Pylon of Philae (Master)", cat: "monuments", tag: "Inkscape Master", imgOnly: true },
    { file: "crypto-obelisk-of-istanbul-detailed.svg", title: "Obelisk of Istanbul & Pedestal", cat: "monuments", tag: "Full Relief", normalize: true },
    { file: "crypto-obelisk-minimal.svg", title: "Crypto Obelisk (Minimal)", cat: "monuments", tag: "Clean Icon" },
    { file: "crypto-obelisk-of-istanbul.svg", title: "Obelisk of Istanbul (Master)", cat: "monuments", tag: "Inkscape Master", imgOnly: true },
    { file: "ostracon-circuit-tablet.svg", title: "Ostracon Circuit Tablet", cat: "monuments", tag: "PCB Shard" },
    { file: "ostracon-outline.svg", title: "Ostracon Stone Outline", cat: "monuments", tag: "Inkscape Master", imgOnly: true },
    { file: "neheh-circuit.svg", title: "Neheh-Circuit (Master)", cat: "monuments", tag: "Inkscape Master", imgOnly: true },

    { file: "cyber-stylus.svg", title: "Cyber Scribe Stylus", cat: "glyphs", tag: "Tool Glyph" },
    { file: "cyber-jar.svg", title: "Cyber Canopic Vessel", cat: "glyphs", tag: "Relic Glyph" },
    { file: "moon-phases-sheet.svg", title: "8-Phase Lunar Cycle Sheet", cat: "glyphs", tag: "Khonsu Lunar" },
    { file: "ankh-icon.svg", title: "Ankh Glyph", cat: "glyphs", tag: "24x24 Icon" },
    { file: "eye-of-horus-icon.svg", title: "Eye of Horus (Wedjat)", cat: "glyphs", tag: "24x24 Icon" },
    { file: "ibis-icon.svg", title: "Sacred Ibis Glyph", cat: "glyphs", tag: "24x24 Icon" },
    { file: "pyramids-icon.svg", title: "Giza Pyramids Glyph", cat: "glyphs", tag: "24x24 Icon" },
    { file: "scroll-icon.svg", title: "Papyrus Scroll Glyph", cat: "glyphs", tag: "24x24 Icon" },
    { file: "seshet-icon.svg", title: "Seshat Rosette Glyph", cat: "glyphs", tag: "24x24 Icon" },
  ];

  function renderAnimations() {
    var grid = document.getElementById("anim-grid");
    if (!grid) return;
    grid.innerHTML = "";

    ANIMATIONS.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "anim-card";

      var rawThumb = SVGS[item.thumb] || "";
      if (item.thumb === "khepri-scarab.svg" || item.thumb === "thoth-chip-logo.svg") {
        rawThumb = normalizeInkscape(rawThumb);
      }

      var top = document.createElement("div");
      top.className = "anim-card-top";

      var thumb = document.createElement("div");
      thumb.className = "anim-thumb";
      thumb.innerHTML = rawThumb;

      var textWrap = document.createElement("div");
      var h3 = document.createElement("h3");
      h3.className = "anim-card-title";
      h3.textContent = item.title;
      var p = document.createElement("p");
      p.className = "anim-card-desc";
      p.textContent = item.desc;
      textWrap.appendChild(h3);
      textWrap.appendChild(p);

      top.appendChild(thumb);
      top.appendChild(textWrap);

      var chip = document.createElement("code");
      chip.className = "code-chip";
      chip.textContent = item.reactPath;

      var actions = document.createElement("div");
      actions.className = "card-actions";

      var modalBtn = document.createElement("button");
      modalBtn.type = "button";
      modalBtn.className = "pill-btn pill-btn-active";
      modalBtn.textContent = "Live Preview";
      modalBtn.addEventListener("click", function () {
        openModal(item.title, item.previewUrl);
      });

      var pageLink = document.createElement("a");
      pageLink.className = "pill-btn";
      pageLink.href = item.previewUrl;
      pageLink.target = "_blank";
      pageLink.rel = "noopener";
      pageLink.textContent = "Open Standalone HTML ↗";

      actions.appendChild(modalBtn);
      actions.appendChild(pageLink);

      card.appendChild(top);
      card.appendChild(chip);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  function renderSvgGrid(filterCat) {
    var grid = document.getElementById("svg-grid");
    var countEl = document.getElementById("svg-count-meta");
    if (!grid) return;
    grid.innerHTML = "";

    var list = SVG_CATALOG.filter(function (item) {
      return !filterCat || filterCat === "all" || item.cat === filterCat;
    });

    if (countEl) {
      countEl.textContent = "SHOWING " + list.length + " OF " + SVG_CATALOG.length + " STANDALONE .SVG ASSETS";
    }

    list.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "svg-card";

      var stage = document.createElement("div");
      stage.className = "svg-stage";
      if (item.file === "seshat-animation.svg") {
        stage.id = "seshat-button";
      }

      if (!item.imgOnly && SVGS[item.file]) {
        stage.innerHTML = item.normalize ? normalizeInkscape(SVGS[item.file]) : SVGS[item.file];
      } else {
        var img = document.createElement("img");
        img.src = "svg/" + item.file;
        img.alt = item.title;
        img.loading = "lazy";
        stage.appendChild(img);
      }

      var tag = document.createElement("span");
      tag.className = "svg-badge-tag";
      tag.textContent = item.tag;

      var title = document.createElement("h3");
      title.className = "svg-card-name";
      title.textContent = item.title;

      var fileLabel = document.createElement("p");
      fileLabel.className = "svg-card-file";
      fileLabel.textContent = "svg/" + item.file;

      var actions = document.createElement("div");
      actions.className = "card-actions";

      var openLink = document.createElement("a");
      openLink.className = "pill-btn";
      openLink.href = "svg/" + item.file;
      openLink.target = "_blank";
      openLink.rel = "noopener";
      openLink.textContent = "Open .svg ↗";
      actions.appendChild(openLink);

      if (SVGS[item.file]) {
        var copyBtn = document.createElement("button");
        copyBtn.type = "button";
        copyBtn.className = "pill-btn";
        copyBtn.textContent = "Copy SVG";
        copyBtn.addEventListener("click", function () {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(SVGS[item.file]).then(function () {
              copyBtn.textContent = "Copied!";
              setTimeout(function () { copyBtn.textContent = "Copy SVG"; }, 1400);
            });
          }
        });
        actions.appendChild(copyBtn);
      }

      card.appendChild(stage);
      card.appendChild(tag);
      card.appendChild(title);
      card.appendChild(fileLabel);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  function openModal(title, url) {
    var modal = document.getElementById("stage-modal");
    var frame = document.getElementById("stage-iframe");
    var titleEl = document.getElementById("stage-modal-title");
    if (!modal || !frame) return;
    if (titleEl) titleEl.textContent = title;
    frame.src = url;
    modal.classList.remove("stage-modal-hidden");
  }

  function closeModal() {
    var modal = document.getElementById("stage-modal");
    var frame = document.getElementById("stage-iframe");
    if (!modal || !frame) return;
    frame.src = "about:blank";
    modal.classList.add("stage-modal-hidden");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAnimations();
    renderSvgGrid("all");

    // Theme switcher
    var themeBtns = document.querySelectorAll("[data-theme]");
    themeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var t = btn.getAttribute("data-theme");
        document.body.classList.remove("theme-cyan", "theme-gold", "theme-purple", "theme-red", "theme-lime");
        document.body.classList.add("theme-" + t);
        themeBtns.forEach(function (b) { b.classList.remove("pill-btn-active"); });
        btn.classList.add("pill-btn-active");
      });
    });

    // Canvas backdrop toggle
    var canvasBtn = document.getElementById("canvas-toggle-btn");
    if (canvasBtn) {
      canvasBtn.addEventListener("click", function () {
        var isPapyrus = document.body.classList.toggle("canvas-papyrus");
        canvasBtn.textContent = isPapyrus ? "Backdrop: Papyrus" : "Backdrop: Obsidian";
        canvasBtn.classList.toggle("pill-btn-active", isPapyrus);
      });
    }

    // Category filter buttons
    var filterBtns = document.querySelectorAll("[data-filter]");
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) { b.classList.remove("pill-btn-active"); });
        btn.classList.add("pill-btn-active");
        renderSvgGrid(cat);
      });
    });

    // Modal close handlers
    var closeBtn = document.getElementById("stage-close-btn");
    var modal = document.getElementById("stage-modal");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  });
})();

