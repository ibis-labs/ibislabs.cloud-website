/* ==========================================================================
   Thoth's Notebook — Standalone HTML Preview Controller
   Drives all 8 standalone portfolio embeds using pure DOM + Web Animations API.
   ========================================================================== */

(function () {
  "use strict";

  var SVGS = window.THOTH_SVGS || {};
  var NEHEH = window.THOTH_NEHEH_DATA || null;

  /**
   * Normalizes raw Inkscape dark strokes (#000000 / #624040) to currentColor
   * so line-art SVGs glow cleanly against dark Cyber-Egyptian backgrounds.
   */
  function normalizeInkscapeSvg(rawSvg) {
    if (!rawSvg) return "";
    return rawSvg
      .replace(/stroke:#000000/gi, "stroke:currentColor")
      .replace(/stroke:#624040/gi, "stroke:currentColor")
      .replace(/stroke="#000000"/gi, 'stroke="currentColor"')
      .replace(/stroke="#624040"/gi, 'stroke="currentColor"');
  }

  /**
   * Animates all drawable SVG geometry inside a container with a staggered stroke-etch.
   */
  function runStrokeEtch(container, opts) {
    var options = opts || {};
    var duration = options.duration || 1350;
    var stagger = options.stagger || 18;
    var shapes = container.querySelectorAll("path, circle, ellipse, line, polyline, polygon, rect");

    shapes.forEach(function (el, idx) {
      if (typeof el.getTotalLength !== "function") return;
      var len = 0;
      try {
        len = el.getTotalLength();
      } catch (_err) {
        return;
      }
      if (!len || !isFinite(len) || len <= 0.1) return;

      el.setAttribute("stroke-dasharray", String(len));
      el.setAttribute("stroke-dashoffset", String(len));

      el.animate(
        [
          { strokeDashoffset: len, opacity: 0.05 },
          { strokeDashoffset: 0, opacity: 1 },
        ],
        {
          duration: duration,
          delay: idx * stagger,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      );
    });
  }

  // ── 1. SESHAT CHRONOMETER ────────────────────────────────────────────────
  var SESHAT_BUDS = [
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

  function triggerSeshatRipple(mountEl) {
    if (!mountEl) return;
    SESHAT_BUDS.forEach(function (id, i) {
      var el = mountEl.querySelector("#" + id);
      if (el && typeof el.animate === "function") {
        el.animate(
          [
            { fill: "#B915CC", filter: "none" },
            { fill: "#00ffff", filter: "drop-shadow(0 0 8px #00ffff)" },
            { fill: "#ff44ff", filter: "drop-shadow(0 0 10px #ff00ff)" },
            { fill: "#B915CC", filter: "none" },
          ],
          { duration: 820, delay: i * 25, easing: "ease-out" }
        );
      }
    });
  }

  function initSeshat() {
    var mount = document.getElementById("seshat-button");
    var status = document.getElementById("seshat-status");
    var rippleBtn = document.getElementById("seshat-ripple-btn");
    if (!mount) return;

    mount.innerHTML = SVGS["seshat-animation.svg"] || "";

    function syncClock() {
      var now = new Date();
      var mins = now.getHours() * 60 + now.getMinutes();
      var n = SESHAT_BUDS.length - 1;
      var mainIdx = Math.round((mins / 1440) * n);
      var halfIdx = Math.round(((now.getHours() * 60 + 30) / 1440) * n);

      SESHAT_BUDS.forEach(function (id) {
        var el = mount.querySelector("#" + id);
        if (el) el.classList.remove("seshat-bud-on", "seshat-bud-dim");
      });

      var mainEl = mount.querySelector("#" + SESHAT_BUDS[mainIdx]);
      if (mainEl) mainEl.classList.add("seshat-bud-on");

      if (now.getMinutes() >= 30 && halfIdx !== mainIdx) {
        var halfEl = mount.querySelector("#" + SESHAT_BUDS[halfIdx]);
        if (halfEl) halfEl.classList.add("seshat-bud-dim");
      }

      if (status) {
        status.textContent =
          now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
          " · PALM-RIB BUD " + (mainIdx + 1) + " / 59";
      }
    }

    syncClock();
    setInterval(syncClock, 30000);

    if (rippleBtn) {
      rippleBtn.addEventListener("click", function () {
        triggerSeshatRipple(mount);
      });
    }
  }

  // ── 2. THOTH'S CHIP SPLASH ETCH (src/components/ibis-logo-etch.tsx) ──────
  var IBIS_PRONG_PATHS = [
    "M 25.251859,42.125438 C 14.675524,42.066366 14.675524,42.066366 14.675524,42.066366",
    "M 25.401476,58.763 C 14.825397,58.85743 14.825397,58.85743 14.825397,58.85743",
    "m 25.267933,75.477312 c -10.576079,0.09443 -10.576079,0.09443 -10.576079,0.09443",
    "m 25.201161,92.191625 c -10.576079,0.09443 -10.576079,0.09443 -10.576079,0.09443",
  ];

  var IBIS_PRONG_TRANSFORMS = [
    "translate(0,0.03804616)",
    "translate(94.580504,0.03804616)",
    "rotate(-90,18.133256,18.065305)",
    "rotate(-90,69.770031,69.70208)",
  ];

  function buildThothIbisChipSvg() {
    var parts = [
      '<svg viewBox="0 0 135.46667 135.46667" xmlns="http://www.w3.org/2000/svg">',
      '<g>',
      // outer-circuit rect1 (delay: 750ms, dur: 900ms, dash: 341.3)
      '<rect data-ibis-rect="341.3" data-delay="750" data-dur="900" fill="none" stroke="currentColor" stroke-width="6.387" stroke-linecap="square" stroke-linejoin="round" width="82.591743" height="88.054283" x="26.143431" y="23.205481" ry="12.942643"/>',
      // inner-circuit rect3 (delay: 0ms, dur: 900ms, dash: 254.9)
      '<rect data-ibis-rect="254.9" data-delay="0" data-dur="900" fill="none" stroke="currentColor" stroke-width="2.64297" stroke-linecap="square" stroke-linejoin="round" stroke-miterlimit="1" width="61.347393" height="66.112717" x="36.619404" y="34.313408"/>',
      // eye path4 (delay: 950ms, dur: 250ms)
      '<path data-ibis-stroke="1" data-delay="950" data-dur="250" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="square" stroke-linejoin="round" d="m 61.746529,50.760232 c 0.534171,-1.969763 3.16489,-2.813567 4.557654,-2.697824 1.636921,0.136033 1.615746,0.569995 3.815553,1.572975 1.18232,0.539067 2.131223,0.962846 1.492091,1.263629 -2.529057,1.190202 -2.036386,1.008063 -4.131942,2.16721 -0.836187,0.462533 -2.079798,0.499569 -2.998092,0.20535 -1.563597,-0.500972 -2.809577,-1.668292 -2.735264,-2.51134 z"/>',
      // beak path8 (delay: 500ms, dur: 400ms)
      '<path data-ibis-stroke="1" data-delay="500" data-dur="400" fill="currentColor" stroke="currentColor" stroke-width="0.4" d="m 57.162109,47.136719 c -0.138457,-0.0023 -0.273225,0.01608 -0.40625,0.05469 -3.47637,1.012002 -6.725514,2.554909 -9.519531,4.75 -2.23825,1.758459 -3.98679,3.780756 -5.279297,5.91211 -1.069868,1.764221 -1.736034,3.427198 -2.138672,4.789062 -0.183793,0.621653 -0.302861,1.148292 -0.378906,1.550781 -0.03663,0.19389 -0.06204,0.353514 -0.08008,0.478516 -0.0086,0.05938 -0.01634,0.109488 -0.02148,0.150391 0.004,0.0047 0.0073,0.01 0.0098,0.01563 l -0.01953,0.07422 c -6.67e-4,1.1e-5 -0.0013,1.1e-5 -0.002,0 -1.5e-4,0.0013 1.29e-4,0.0047 0,0.0059 1.66e-4,0.0026 1.66e-4,0.0052 0,0.0078 l -0.0039,0.01758 c -6.67e-4,1.1e-5 -0.0013,1.1e-5 -0.002,0 -1.04e-4,5.17e-4 1.07e-4,0.0014 0,0.002 -0.0037,0.01812 -0.0087,0.04086 -0.01367,0.06445 -0.0049,0.02368 -0.01,0.04883 -0.01367,0.06641 -0.0018,0.0088 -0.0048,0.01444 -0.0059,0.01953 -5.32e-4,0.0025 2.83e-4,0.0045 0,0.0059 v 0.002 l -0.0059,0.03906 c -0.01905,0.198864 -0.0011,0.388242 0.05078,0.560547 0.05193,0.172389 0.136463,0.323225 0.244141,0.453125 0.106999,0.129083 0.23496,0.234923 0.375,0.314453 0.14,0.0795 0.293187,0.1344 0.449219,0.164063 0.31272,0.05946 0.647216,0.02121 0.941406,-0.140625 0.147274,-0.08101 0.280699,-0.192286 0.392578,-0.333985 0.10878,-0.137771 0.194645,-0.300574 0.25,-0.486328 10e-4,-0.0034 0.0023,-0.0067 0.0039,-0.0098 0.0014,-0.0028 0.0062,-0.01464 0.01367,-0.0293 0.01243,-0.02442 0.03008,-0.06177 0.05664,-0.111329 0.100918,-0.1882 0.29921,-0.505079 0.65039,-0.945312 0.746539,-0.935848 2.123164,-2.326937 4.56836,-4.089844 3.423783,-2.468437 6.22129,-3.312516 8.099609,-3.572265 0.03191,-0.0045 0.06215,-0.0078 0.0918,-0.01172 1.796033,-0.234007 2.91161,0.06242 2.998047,0.08594 0.002,5.66e-4 0.004,0.0012 0.0059,0.002 0.425348,0.157495 0.761836,0.27614 1.019531,0.355469 0.12947,0.03986 0.244306,0.06996 0.34375,0.0918 0.09646,0.02118 0.191577,0.0381 0.277344,0.03906 0.04277,4.83e-4 0.09176,-0.0048 0.142578,-0.01563 0.05108,-0.01084 0.108283,-0.02945 0.164063,-0.06641 0.0287,-0.01902 0.05409,-0.04003 0.07813,-0.06641 0.02452,-0.02692 0.04448,-0.05735 0.06055,-0.08789 0.03261,-0.06202 0.04712,-0.123807 0.05078,-0.175781 0.0036,-0.05089 -0.0027,-0.09879 -0.0098,-0.138672 -0.0069,-0.0388 -0.01792,-0.07406 -0.0293,-0.109375 -0.02182,-0.06773 -0.04984,-0.140498 -0.08008,-0.207031 -0.06286,-0.138297 -0.141833,-0.288687 -0.21875,-0.460937 -0.07631,-0.170894 -0.151506,-0.360883 -0.208984,-0.566407 -0.057,-0.203822 -0.09467,-0.421263 -0.09961,-0.652343 -0.0049,-0.228905 0.0229,-0.473231 0.103515,-0.730469 0.01422,-0.04628 0.01835,-0.09657 0.01172,-0.144531 -0.01646,-0.124858 -0.06408,-0.233617 -0.130859,-0.326172 -0.06528,-0.09048 -0.147833,-0.163437 -0.232422,-0.222657 -0.08472,-0.05931 -0.178101,-0.109376 -0.273438,-0.15039 -0.0952,-0.04095 -0.194181,-0.07474 -0.296875,-0.103516 -0.203152,-0.05691 -0.422685,-0.09543 -0.626953,-0.115234 -0.193907,-0.0188 -0.384078,-0.02235 -0.546875,-0.01172 -0.002,9.5e-5 -0.0039,9.5e-5 -0.0059,0 -0.182585,-0.0046 -1.390928,-0.009 -3.404297,0.566406 -2.150921,0.614681 -5.216937,1.891771 -8.902344,4.548828 -0.382793,0.275981 -0.72211,0.537028 -1.035156,0.78711 -0.05367,0.04283 -0.126244,-0.02186 -0.08984,-0.08008 1.026227,-1.615046 2.439599,-3.299954 4.402344,-4.841797 2.167017,-1.702313 4.969193,-3.202674 8.59375,-4.257813 0.185141,-0.05416 0.348155,-0.143025 0.486328,-0.255859 0.141096,-0.115223 0.256006,-0.254999 0.339844,-0.408203 0.08603,-0.157217 0.139711,-0.329523 0.160156,-0.50586 0.0211,-0.182036 0.0058,-0.36695 -0.04687,-0.546875 -0.05399,-0.185423 -0.142267,-0.347237 -0.253906,-0.484375 -0.115981,-0.142471 -0.25682,-0.258603 -0.408203,-0.341796 -0.158484,-0.08709 -0.331437,-0.139575 -0.50586,-0.160157 -0.04611,-0.0055 -0.09262,-0.009 -0.138672,-0.0098 z"/>',
      // throat path12 (delay: 750ms, dur: 400ms -> fade 200ms)
      '<path data-ibis-fill="1" data-delay="750" data-dur="400" fill="currentColor" stroke="none" d="m 58.714246,53.486141 c -0.006,1.29e-4 -0.01256,8.24e-4 -0.01912,0.0015 -0.01302,0.0014 -0.02887,0.0044 -0.04599,0.01085 -0.01738,0.0066 -0.03717,0.01753 -0.05581,0.03514 -0.01929,0.01823 -0.03422,0.04068 -0.04289,0.06615 -0.0085,0.02485 -0.0097,0.04857 -0.0083,0.0677 0.0015,0.01891 0.0059,0.0349 0.01033,0.04754 0.0087,0.02459 0.02134,0.04535 0.03204,0.06046 0.01138,0.01607 0.02414,0.03147 0.03772,0.04599 0.01386,0.01482 0.02957,0.03008 0.04651,0.04548 a 0.10071126,0.00275642 22.705878 0 0 0.100769,0.03876 c 0,0 0.02646,0.01095 0.06098,0.0279 l -0.06615,-0.01499 c 0.03511,0.01724 0.07627,0.03897 0.113688,0.06305 0.01981,0.01274 0.03697,0.02513 0.05116,0.03669 0.0014,0.0012 0.0028,0.0025 0.0041,0.0036 -0.0029,5.3e-5 -0.0065,-1.31e-4 -0.01085,-5.17e-4 -0.01271,-0.0012 -0.03048,-0.0047 -0.05374,-0.0124 -0.04558,-0.01502 -0.101227,-0.04212 -0.172082,-0.08217 -0.06872,-0.03884 -0.136329,-0.08069 -0.220142,-0.131258 -0.07548,-0.04555 -0.160379,-0.09554 -0.247013,-0.138493 -0.08305,-0.04117 -0.174832,-0.07981 -0.269235,-0.102319 -0.04628,-0.01103 -0.09422,-0.01819 -0.14366,-0.02015 -0.04866,-0.0019 -0.09892,0.0013 -0.149345,0.0124 -0.04979,0.01101 -0.09913,0.02945 -0.146761,0.05633 -0.0468,0.02641 -0.0909,0.06049 -0.131775,0.10232 -0.384557,0.391297 -0.68235,0.719755 -0.897103,0.994771 -0.10519,0.134709 -0.191748,0.258331 -0.259415,0.371554 -0.06659,0.111421 -0.116491,0.215342 -0.147795,0.313159 -0.03096,0.09675 -0.0445,0.19075 -0.03566,0.28112 0.0044,0.04485 0.01394,0.08788 0.02946,0.129191 0.01542,0.04104 0.03609,0.07901 0.06098,0.114205 0.04916,0.0695 0.11343,0.125742 0.186552,0.173632 0.07176,0.047 0.154185,0.0876 0.243396,0.124024 0.174745,0.07135 0.38804,0.133012 0.622184,0.201538 0.229846,0.06727 0.486712,0.143139 0.753443,0.242879 0.2619,0.09793 0.537079,0.2202 0.809252,0.382923 0.267208,0.159755 0.534096,0.359854 0.785482,0.617533 0.148354,0.156967 0.30046,0.356259 0.439767,0.594796 0.135071,0.231281 0.258547,0.500099 0.353983,0.803051 0.182979,0.580853 0.267181,1.299159 0.121957,2.120801 -0.04483,0.253624 -0.11118,0.526659 -0.223243,0.832508 -0.110144,0.300613 -0.265605,0.636647 -0.492476,1.022676 -0.443096,0.753945 -1.162254,1.705059 -2.369881,2.976046 -0.0045,0.0048 -0.0087,0.0092 -0.0124,0.01344 -0.01865,0.0056 -0.03688,0.01123 -0.05581,0.01705 -0.0034,0.001 -0.0094,0.0024 -0.01964,0.0047 -0.01,0.0023 -0.02258,0.0049 -0.03721,0.0078 -0.02928,0.0057 -0.06549,0.01201 -0.108521,0.01912 -0.08599,0.0142 -0.226653,0.03594 -0.312642,0.05013 -0.118247,0.01932 -0.247495,0.04177 -0.376204,0.06718 -0.128057,0.02528 -0.257109,0.05406 -0.374138,0.08682 -0.523465,0.146541 -1.016987,0.257993 -1.65933,0.399976 -0.641553,0.141809 -1.426667,0.312753 -2.528528,0.578776 -0.903929,0.218237 -1.702897,0.454307 -2.426725,0.727088 -0.726038,0.273614 -1.375652,0.583993 -1.978174,0.950329 -0.604886,0.367772 -1.160337,0.790958 -1.696537,1.286743 -0.538607,0.498011 -1.057309,1.06871 -1.5844,1.728577 -0.125131,0.156653 -0.280197,0.339825 -0.457336,0.54777 -0.178698,0.209775 -0.377744,0.442508 -0.590662,0.699182 -0.432582,0.521479 -0.911345,1.1284 -1.378727,1.816944 -0.960958,1.415677 -1.782189,2.649253 -1.78232,2.64945 -0.111869,0.168236 -0.182943,0.34988 -0.217558,0.533301 -0.03535,0.187339 -0.03254,0.37635 0.0036,0.556038 0.03621,0.179687 0.106722,0.355157 0.211874,0.514181 0.102954,0.155699 0.238988,0.295482 0.40721,0.40721 0.164839,0.109511 0.345469,0.182258 0.532267,0.217558 0.183507,0.03468 0.372501,0.03306 0.555522,-0.0036 0.18024,-0.03617 0.354886,-0.106516 0.513147,-0.21084 0.156235,-0.102989 0.296257,-0.2391 0.407727,-0.406177 -3.4e-5,5.2e-5 0.826365,-1.242279 1.766817,-2.627746 0.460353,-0.678188 0.970314,-1.413995 1.388546,-2.008663 0.207506,-0.295044 0.391479,-0.553964 0.534334,-0.751893 0.07128,-0.09876 0.132273,-0.181897 0.180351,-0.246496 0.02402,-0.03228 0.04438,-0.05995 0.0615,-0.08217 0.01732,-0.02249 0.03015,-0.03834 0.03876,-0.04857 0.395272,-0.470255 0.780444,-0.893178 1.183907,-1.274858 0.403025,-0.381265 0.824725,-0.72184 1.292945,-1.026811 0.468444,-0.305116 0.984732,-0.575358 1.577681,-0.816487 0.594061,-0.241582 1.265008,-0.453778 2.041736,-0.641305 1.016101,-0.245319 1.650296,-0.368281 2.199349,-0.45992 0.276686,-0.04618 0.533715,-0.08469 0.806669,-0.126607 0.275214,-0.04226 0.565794,-0.08796 0.910022,-0.148312 0.693881,-0.121656 1.307108,-0.23947 1.860868,-0.428397 0.280802,-0.0958 0.545719,-0.20956 0.796334,-0.350883 0.253593,-0.143003 0.491011,-0.313022 0.715202,-0.518832 0.473459,-0.434642 0.901488,-0.959412 1.278992,-1.524971 0.383273,-0.574202 0.716872,-1.193674 0.996838,-1.81281 0.284762,-0.62974 0.514776,-1.261631 0.687297,-1.852083 0.175789,-0.601642 0.292679,-1.163372 0.346749,-1.644861 0.110992,-0.988372 0.0483,-1.832693 -0.112655,-2.527494 -0.169884,-0.733329 -0.45139,-1.309913 -0.769462,-1.730644 -0.5252,-0.694709 -1.022837,-1.248301 -1.460376,-1.680517 -0.455041,-0.449504 -0.854013,-0.77633 -1.16582,-1.000456 -0.161823,-0.116319 -0.302945,-0.20693 -0.42013,-0.274402 -0.05975,-0.0344 -0.11355,-0.06298 -0.161747,-0.0863 -0.04856,-0.0235 -0.09275,-0.04242 -0.131258,-0.05581 -0.01951,-0.0068 -0.03838,-0.01267 -0.05684,-0.01705 -0.01815,-0.0043 -0.0386,-0.0078 -0.05943,-0.0088 -0.0053,-2.67e-4 -0.01103,-6.47e-4 -0.01705,-5.17e-4 z"/>',
      // head arc path10 (delay: 450ms, dur: 400ms)
      '<path data-ibis-stroke="1" data-delay="450" data-dur="400" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="m 57.271357,48.631078 c 4.438175,-5.807402 10.765096,-5.218709 12.747952,-5.19361 3.729957,0.04721 8.486081,1.282298 10.906583,2.644018 4.138685,2.328331 7.522839,5.712662 9.726215,9.915075 5.2153,9.946936 3.549198,27.435061 3.549198,27.435061 l -6.076859,0.04959 c 0,0 0.301756,-7.868941 -0.56756,-10.761177 -1.295665,-4.31071 -4.417533,-6.394513 -5.39589,-7.003966 -2.079409,-1.295336 -5.961426,-2.717149 -6.007139,-1.98105 -0.199332,3.209781 -2.926838,6.842758 -4.906967,8.456166 -2.930586,2.38784 -9.224437,2.027517 -11.318261,2.002572"/>',
      // left-circuit-mid (delay: 700ms, dur: 400ms)
      '<path data-ibis-stroke="1" data-delay="700" data-dur="400" fill="none" stroke="currentColor" stroke-width="2.83302" stroke-linecap="round" stroke-linejoin="round" d="m 36.805144,78.729423 4.318167,-0.03344"/>',
      // lower-left node (delay: 650ms, dur: 400ms -> fade 200ms)
      '<ellipse data-ibis-fill="1" data-delay="650" data-dur="400" fill="currentColor" stroke="currentColor" stroke-width="0.917558" ry="1.9217174" rx="1.89811" cy="79.934387" cx="47.911057"/>',
      // lower-left-corner (delay: 650ms, dur: 400ms -> fade 200ms)
      '<path data-ibis-fill="1" data-delay="650" data-dur="400" fill="currentColor" d="m 46.607422,81.0625 -0.09833,0.854534 0.0788,6.584919 c -0.0012,0.281581 0.09236,0.555379 0.265625,0.777344 l 9.013671,11.517583 0.773438,0.98828 1.976562,-1.54688 L 57.84375,99.25 49.097656,88.074219 c 0,0 0.123327,-4.877711 0.09826,-6.045091 -0.02507,-1.16738 -0.01971,-0.640117 -0.01971,-0.640117 l -1.284392,-0.163255 z"/>',
      // left-circuit-lower (delay: 650ms, dur: 400ms)
      '<path data-ibis-stroke="1" data-delay="650" data-dur="400" fill="currentColor" stroke="currentColor" stroke-width="2.509" stroke-linecap="square" stroke-linejoin="round" d="m 37.71244,88.93772 h 9.218574"/>',
      // lower-circuit-left fill (delay: 650ms, dur: 400ms -> fade 200ms)
      '<path data-ibis-fill="1" data-delay="650" data-dur="400" fill="currentColor" fill-rule="nonzero" stroke="none" d="m 46.607422,81.0625 c -0.02294,0.199404 -0.05709,0.496092 -0.09833,0.854534 0.02373,1.983389 0.05041,4.212152 0.0788,6.584917 -0.0012,0.271056 0.08599,0.547223 0.265625,0.777346 2.97939,3.807037 6.012762,7.68305 9.013671,11.517583 0.263372,0.33653 0.52383,0.66934 0.773438,0.98828 0.338231,-0.2647 0.668666,-0.52331 0.988281,-0.77344 0.315696,-0.24707 0.646179,-0.50571 0.988281,-0.77344 C 58.372081,99.925088 58.111731,99.59242 57.84375,99.25 54.981208,95.592236 52.041662,91.836077 49.097656,88.074219 c 0,0 0.03092,-1.223767 0.05853,-2.584778 0.01391,-0.685631 0.02694,-1.403627 0.03495,-2.023279 0.004,-0.311513 0.0068,-0.597555 0.0078,-0.842118 9.76e-4,-0.245822 1.5e-4,-0.449372 -0.003,-0.594916 -0.0063,-0.293593 -0.01066,-0.478694 -0.01366,-0.592507 -0.0015,-0.05758 -0.0027,-0.09705 -0.0036,-0.123039 -4.56e-4,-0.01308 -8.45e-4,-0.02276 -0.0012,-0.02961 -1.66e-4,-0.0034 -3.17e-4,-0.0062 -4.54e-4,-0.0083 -9.76e-4,-0.0023 -0.001,-7.24e-4 -0.0011,0.0012 -4.9e-5,0.0019 -8.8e-5,0.0042 -1.2e-4,0.0068 -6.3e-5,0.0052 -9.5e-5,0.01159 -1.04e-4,0.0186 -9e-6,0.0071 5e-6,0.01475 3.2e-5,0.02252 1.13e-4,0.03184 4.46e-4,0.06414 4.46e-4,0.06414 -0.463898,-0.05897 -0.897983,-0.11414 -1.284392,-0.163255 -0.53557,-0.06808 -0.979554,-0.124509 -1.284392,-0.163256 z"/>',
      // lower-circuit-mid (delay: 700ms, dur: 400ms)
      '<path data-ibis-stroke="1" data-delay="700" data-dur="400" fill="none" stroke="currentColor" stroke-width="2.509" stroke-linecap="square" stroke-linejoin="round" d="M 67.144943,100.30582 l -12.986398,-20.501623 -0.133543,-10.609467"/>',
      // lower-circuit-right 1 & 2 (delay: 500ms, dur: 400ms)
      '<path data-ibis-stroke="1" data-delay="500" data-dur="400" fill="none" stroke="currentColor" stroke-width="2.49784" stroke-linecap="round" stroke-linejoin="round" d="m 67.416923,86.644445 h 4.629608 l 7.889258,-8.653669 7.558518,-0.09223"/>',
      '<path data-ibis-stroke="1" data-delay="500" data-dur="400" fill="none" stroke="currentColor" stroke-width="2.509" stroke-linecap="round" stroke-linejoin="round" d="M 76.086217,100.45784 l -16.525967,-26.141068 v -8.747078"/>',
      // upper-right ticks (delay: 250ms, dur: 400ms)
      '<path data-ibis-stroke="1" data-delay="250" data-dur="400" fill="none" stroke="currentColor" stroke-width="2.509" stroke-linecap="round" stroke-linejoin="round" d="M 92.47864,34.220436 82.087559,45.46572"/>',
      '<path data-ibis-stroke="1" data-delay="250" data-dur="400" fill="none" stroke="currentColor" stroke-width="2.509" stroke-linecap="round" stroke-linejoin="round" d="M 97.753595,40.263264 87.6296,51.375005"/>',
    ];

    // 16 outer silicon pins (delay: 1150ms, dur: 1500ms)
    IBIS_PRONG_TRANSFORMS.forEach(function (transform) {
      parts.push('<g transform="' + transform + '">');
      IBIS_PRONG_PATHS.forEach(function (d) {
        parts.push('<path data-ibis-stroke="1" data-delay="1150" data-dur="1500" fill="none" stroke="currentColor" stroke-width="5.509" stroke-linecap="round" stroke-linejoin="round" d="' + d + '"/>');
      });
      parts.push('</g>');
    });

    parts.push('</g></svg>');
    return parts.join("");
  }

  function playIbisChipEtch(container, onDone) {
    if (!container) return null;
    container.innerHTML = buildThothIbisChipSvg();

    // 1. Rectangles (rect3 inner die + rect1 outer package) — exact Framer Motion r(seq)
    var rects = container.querySelectorAll("[data-ibis-rect]");
    rects.forEach(function (el) {
      var dash = Number(el.getAttribute("data-ibis-rect") || 255);
      var delay = Number(el.getAttribute("data-delay") || 0);
      var dur = Number(el.getAttribute("data-dur") || 900);
      el.setAttribute("stroke-dasharray", String(dash));
      el.setAttribute("stroke-dashoffset", String(dash));

      var dashAnim = el.animate(
        [{ strokeDashoffset: dash }, { strokeDashoffset: 0 }],
        { duration: dur, delay: delay, easing: "ease-in-out", fill: "both" }
      );
      el.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: dur * 0.4, delay: delay, easing: "ease-in", fill: "both" }
      );
      dashAnim.onfinish = function () {
        el.removeAttribute("stroke-dasharray");
        el.removeAttribute("stroke-dashoffset");
        el.setAttribute("opacity", "1");
      };
    });

    // 2. Stroked paths (ticks, head, beak, eye, internal buses, 16 prongs) — exact Framer Motion p(seq)
    var strokes = container.querySelectorAll("[data-ibis-stroke]");
    strokes.forEach(function (el) {
      if (typeof el.getTotalLength !== "function") return;
      var len = 0;
      try {
        len = el.getTotalLength();
      } catch (_e) {
        return;
      }
      if (!len || !isFinite(len)) return;

      var dash = len + 0.25;
      var delay = Number(el.getAttribute("data-delay") || 0);
      var dur = Number(el.getAttribute("data-dur") || 400);
      el.setAttribute("stroke-dasharray", String(dash));
      el.setAttribute("stroke-dashoffset", String(dash));

      var strokeAnim = el.animate(
        [{ strokeDashoffset: dash }, { strokeDashoffset: 0 }],
        { duration: dur, delay: delay, easing: "ease-in-out", fill: "both" }
      );
      el.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: dur * 0.4, delay: delay, easing: "ease-in", fill: "both" }
      );
      strokeAnim.onfinish = function () {
        el.removeAttribute("stroke-dasharray");
        el.removeAttribute("stroke-dashoffset");
        el.setAttribute("opacity", "1");
      };
    });

    // 3. Fill-only nodes (lower-left node, corner fill, throat contour) — exact Framer Motion f(seq)
    var fills = container.querySelectorAll("[data-ibis-fill]");
    fills.forEach(function (el) {
      var delay = Number(el.getAttribute("data-delay") || 0);
      var dur = Number(el.getAttribute("data-dur") || 400);
      el.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: dur * 0.5, delay: delay, easing: "ease-in", fill: "both" }
      );
    });

    if (typeof onDone === "function") {
      return setTimeout(onDone, 2680);
    }
    return null;
  }

  function initIbis() {
    var mount = document.getElementById("ibis-mount");
    var statusEl = document.getElementById("ibis-status");
    var headingEl = document.getElementById("ibis-splash-heading");
    var bylineEl = document.getElementById("ibis-splash-byline");
    var replayBtn = document.getElementById("ibis-replay-btn");
    var lockupBtn = document.getElementById("ibis-lockup-btn");
    var colorBtns = document.querySelectorAll("[data-ibis-color]");
    if (!mount) return;

    var doneTimer = null;
    var showLockup = true;

    function play() {
      if (doneTimer) clearTimeout(doneTimer);
      if (statusEl) {
        statusEl.textContent = "ETCHING SILICON DIE → IBIS CREST & BEAK → PACKAGE → 16 OUTER PINS";
      }
      doneTimer = playIbisChipEtch(mount, function () {
        if (statusEl) {
          statusEl.textContent = "THOTH'S CHIP SEALED (2.65S) · CLICK CHIP OR REPLAY TO RE-ETCH";
        }
      });
    }

    play();
    if (replayBtn) replayBtn.addEventListener("click", play);
    mount.addEventListener("click", play);
    mount.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        play();
      }
    });

    if (lockupBtn) {
      lockupBtn.addEventListener("click", function () {
        showLockup = !showLockup;
        if (headingEl) headingEl.classList.toggle("ibis-splash-hidden", !showLockup);
        if (bylineEl) bylineEl.classList.toggle("ibis-splash-hidden", !showLockup);
        lockupBtn.classList.toggle("cyber-btn-active", showLockup);
        lockupBtn.textContent = showLockup ? "Splash Lockup: On" : "Splash Lockup: Off";
      });
    }

    colorBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        colorBtns.forEach(function (b) { b.classList.remove("cyber-btn-active"); });
        btn.classList.add("cyber-btn-active");
        var theme = btn.getAttribute("data-ibis-color");
        mount.classList.remove("ibis-glow-cyan", "ibis-glow-gold", "ibis-glow-purple");
        if (theme) mount.classList.add("ibis-glow-" + theme);
      });
    });
  }

  // ── 3. EVENING CHRONICLE · KHEPRI SCARAB ETCH ────────────────────────────
  var KHEPRI_FEATHER_TIERS = [
    ["m 2.433,39.878 c 0.069,0.11 0.139,0.219 0.21,0.325 2.021,-0.003 20.08,-0.027 29.248,0.079 3.543,0.041 7.829,-0.104 10.415,1.806", "m 2.255,39.817 c 1.858,2.943 3.975,4.460 5.629,5.238 1.653,0.777 2.861,0.818 2.861,0.818"],
    ["m 6.85,46.68 c 4.61,3.76 8.34,2.91 8.34,2.91", "M 6.88,46.67 27.56,43.15"],
    ["m 12.84,50.39 c 3.33,1.86 7.74,1.37 7.74,1.37", "M 12.84,50.39 29.67,44.67"],
    ["m 19.24,52.48 c 3.41,0.88 6.78,-0.14 6.78,-0.14", "M 19.26,52.47 31.94,45.85"],
    ["m 25.18,52.95 c 2.48,0.19 5.05,-0.49 5.05,-0.49", "m 25.21,52.93 9.06,-6.46"],
    ["m 29.58,53.09 c 2.53,0.09 4.01,-0.83 4.01,-0.83", "M 29.59,53.07 36.41,46.6"],
    ["m 32.94,53.04 c 2.57,-0.09 3.27,-0.77 3.27,-0.77", "m 32.96,53.03 5.4,-6.4"],
    ["m 35.8,53.04 c 1.96,-0.05 2.77,-0.94 2.77,-0.94", "m 35.75,53.03 3.95,-6.38"],
    ["m 38.23,52.96 c 1.5,-0.09 1.96,-0.82 1.96,-0.82", "m 38.24,52.93 2.59,-6.28"],
    ["m 39.94,52.95 c 1.82,0.2 2.27,-0.88 2.27,-0.88", "M 39.95,52.92 41.85,46.67"],
    ["m 41.98,53.22 c 0.63,-0.12 0.72,0.03 0.92,0.16 0.47,0.28 0.78,1.03 0.78,1.03", "m 41.97,53.21 1.36,-6.53"],
  ];

  function buildEveningChronicleKhepriSvg() {
    var bodyIdx = 0;
    var limbsIdx = 0;
    var wingsIdx = 0;
    var GROUP_SIZE = 1;

    function bStep() { return bodyIdx++; }
    function lStep() { return GROUP_SIZE + limbsIdx++; }
    function wStep() { return GROUP_SIZE * 2 + wingsIdx++; }

    var parts = [
      '<svg viewBox="-3 18 106 56" xmlns="http://www.w3.org/2000/svg">',
      '<rect class="khepri-substrate" x="2.0" y="21.5" width="97" height="49" rx="4" pointer-events="none"/>',
      '<g id="celestial-bodies">',
      '<circle id="solar-orb" class="khepri-orb-el" cx="50.48" cy="31.94" r="5.27" data-orb-step="4"/>',
      '<circle id="lunar-orb" class="khepri-orb-el" cx="50.52" cy="60.94" r="3.14" data-orb-step="5"/>',
      '</g>',
      '<g id="scarab-strokes" fill="none" stroke="currentColor" stroke-width="0.35" stroke-linecap="round" stroke-linejoin="round">',
      '<g id="body-and-legs">',
      '<path id="thorax-lower" data-etch-step="' + bStep() + '" d="m 55.64,46.24 c 0.56,0.99 0.7,3.33 0.62,5.74 -0.04,1.06 -0.55,1.86 -0.55,1.86 m 0,0 c -1.37,2.81 -5.23,2.75 -5.23,2.75 0,0 -3.84,0.05 -5.21,-2.75 m 0.07,-7.6 c -0.56,0.99 -0.7,3.33 -0.62,5.74 0.04,1.06 0.55,1.86 0.55,1.86"/>',
      '<g id="thorax-upper">',
      '<path data-etch-step="' + bStep() + '" d="m 45.3,46.32 c 0.05,-0.45 0.67,-0.93 2.25,-0.68 1.74,0.28 2.99,1.35 2.99,1.35"/>',
      '<path id="thorax-upper-main" data-etch-step="' + bStep() + '" d="m 55.69,46.33 c -0.28,-5.01 -5.18,-5.21 -5.18,-5.21 0,0 -4.96,0.2 -5.24,5.21"/>',
      '<path data-etch-step="' + bStep() + '" d="m 55.67,46.32 c -0.05,-0.45 -0.67,-0.93 -2.25,-0.68 -1.74,0.28 -2.9,1.35 -2.9,1.35"/>',
      '</g>',
      '<path id="head" data-etch-step="' + bStep() + '" d="m 50.48,39.2 c 2.17,0.02 2.41,2.48 2.41,2.48 m -2.41,-2.48 c -2.17,0.02 -2.41,2.48 -2.41,2.48"/>',
      '<g id="antennae">',
      '<path id="left-antenna" data-etch-step="' + lStep() + '" d="m 48.45,39.03 0.58,0.54 m -0.53,-1.83 -0.09,1.15 -0.4,0.37"/>',
      '<path id="right-antenna" data-etch-step="' + lStep() + '" d="m 52.52,39.03 -0.58,0.54 m 0.53,-1.83 0.09,1.15 0.4,0.37"/>',
      '</g>',
      '<g id="legs">',
      '<path id="left-leg-fore" data-etch-step="' + lStep() + '" d="m 46.87,42.47 c -3.04,0.03 -3.69,-0.73 -3.82,-1.85 -0.13,-1.12 0.36,-1.19 0.36,-1.19 0,0 -0.07,-0.6 -0.03,-1.03 0.03,-0.43 0.02,-0.28 0.02,-0.28 l 1.9,-2.7 c 0,0 0.5,-1.65 -0.07,-1.69 -0.56,-0.03 0,-0.13 -0.13,-1.16 -0.13,-1.03 -2.55,-0.89 -1.52,-0.73 1.03,0.17 0.33,3.6 0.33,3.6 l -1.03,2.12 -0.63,0.66 c 0,0 -0.3,2.3 -0.1,2.41 0.64,0.36 0.4,1.36 0.4,1.36 l 2.84,3.42"/>',
      '<path id="left-leg-hind" data-etch-step="' + lStep() + '" d="m 43.68,54.38 0.96,-3.7 m -0.96,3.73 c 0,0 -0.07,0.43 -0.03,1.69 0.03,1.26 -0.2,-0.13 2.18,1.65 2.38,1.79 2.05,3.88 2.45,3.54 1,-0.86 0.78,-1.02 0.73,-2.02 -0.03,-0.62 -2.19,-1.9 -3.24,-2.51 -0.42,-0.24 -1.03,-0.66 -1.03,-1.59 0,-0.93 0.53,-1.32 0.53,-1.32"/>',
      '<path id="right-leg-fore" data-etch-step="' + lStep() + '" d="m 54.1,42.47 c 3.04,0.03 3.69,-0.73 3.82,-1.85 0.13,-1.12 -0.36,-1.19 -0.36,-1.19 0,0 0.07,-0.6 0.03,-1.03 -0.03,-0.43 -0.02,-0.28 -0.02,-0.28 l -1.9,-2.7 c 0,0 -0.5,-1.65 0.07,-1.69 0.56,-0.03 0,-0.13 0.13,-1.16 0.13,-1.03 2.55,-0.89 1.52,-0.73 -1.03,0.17 -0.33,3.6 -0.33,3.6 l 1.03,2.12 0.63,0.66 c 0,0 0.3,2.3 0.1,2.41 -0.64,0.36 -0.4,1.36 -0.4,1.36 l -2.84,3.42"/>',
      '<path id="right-leg-hind" transform="matrix(-1,0,0,1,100.71732,0)" data-etch-step="' + lStep() + '" d="m 43.43,54.38 0.96,-3.7 m -0.96,3.73 c 0,0 -0.07,0.43 -0.03,1.69 0.03,1.26 -0.2,-0.13 2.18,1.65 2.38,1.79 2.05,3.88 2.45,3.54 1,-0.86 0.78,-1.02 0.73,-2.02 -0.03,-0.62 -2.19,-1.9 -3.24,-2.51 -0.42,-0.24 -1.03,-0.66 -1.03,-1.59 0,-0.93 0.53,-1.32 0.53,-1.32"/>',
      '</g></g>',
      '<g id="wings-assembly">',
      '<g id="left-wing-frame">',
      '<path data-etch-step="' + wStep() + '" d="m 24.69,40.2 c 5.56,6.67 10.78,6.36 10.78,6.36 l 9.44,0.1"/>',
      '<path data-etch-step="' + wStep() + '" d="m 44.7,44.59 c -0.69,-0.92 -9.68,-0.56 -9.68,-0.56 0,0 -1.75,0.21 -2.29,-0.18 -0.47,-0.34 -0.49,-1 -0.45,-1.17 0.16,-0.68 0.7,-0.91 1.16,-0.84 0.19,0.03 0.64,0.13 0.69,0.93 0.05,0.79 -0.74,0.6 -0.74,0.6"/>',
      '<path data-etch-step="' + wStep() + '" d="m 32.67,41.97 c 0,0 -3.23,-0.21 -3.84,-0.26 -1.22,-0.1 -1.69,-0.93 -1.69,-0.93 H 26.41 L 25.82,40.12"/>',
      '</g>',
      '<g id="right-wing-frame" transform="matrix(-1,0,0,1,100.71732,0)">',
      '<path data-etch-step="' + wStep() + '" d="m 24.44,40.2 c 5.56,6.67 10.78,6.36 10.78,6.36 l 9.44,0.1"/>',
      '<path data-etch-step="' + wStep() + '" d="m 44.45,44.59 c -0.69,-0.92 -9.68,-0.56 -9.68,-0.56 0,0 -1.75,0.21 -2.29,-0.18 -0.47,-0.34 -0.49,-1 -0.45,-1.17 0.16,-0.68 0.7,-0.91 1.16,-0.84 0.19,0.03 0.64,0.13 0.69,0.93 0.05,0.79 -0.74,0.6 -0.74,0.6"/>',
      '<path data-etch-step="' + wStep() + '" d="m 32.42,41.97 c 0,0 -3.23,-0.21 -3.84,-0.26 -1.22,-0.1 -1.69,-0.93 -1.69,-0.93 h -0.73 l -0.6,-0.66"/>',
      '</g>',
      '<g id="feathers-master-group">'
    ];

    KHEPRI_FEATHER_TIERS.forEach(function (pair, tIdx) {
      var tier = tIdx + 1;
      parts.push('<path id="L' + tier + '-1" data-etch-step="' + wStep() + '" d="' + pair[0] + '"/>');
      parts.push('<path id="L' + tier + '-2" data-etch-step="' + wStep() + '" d="' + pair[1] + '"/>');
      parts.push('<g transform="matrix(-1,0,0,1,100.71732,0)">');
      parts.push('<path id="R' + tier + '-1" data-etch-step="' + wStep() + '" d="' + pair[0] + '"/>');
      parts.push('<path id="R' + tier + '-2" data-etch-step="' + wStep() + '" d="' + pair[1] + '"/>');
      parts.push('</g>');
    });

    parts.push('</g></g></g></svg>');
    return parts.join("");
  }

  function initKhepri() {
    var mount = document.getElementById("khepri-mount");
    var trigger = document.getElementById("khepri-protocol-trigger");
    var promptEl = document.getElementById("khepri-protocol-prompt");
    var statusEl = document.getElementById("khepri-status");
    var liturgyEl = document.getElementById("khepri-liturgy");
    var replayBtn = document.getElementById("khepri-replay-btn");
    var goldBtn = document.getElementById("khepri-gold-btn");
    var contextBtn = document.getElementById("khepri-context-btn");
    if (!mount) return;

    var forceGold = false;
    var showLiturgy = true;
    var cycleTimer = null;
    var doneTimer = null;

    function syncGoldUi() {
      mount.classList.toggle("khepri-gold", forceGold);
      if (goldBtn) {
        goldBtn.classList.toggle("cyber-btn-active", forceGold);
        goldBtn.textContent = forceGold ? "Solar Gold Sealed ✓" : "Seal Solar Gold";
      }
      if (promptEl) {
        promptEl.textContent = forceGold ? "Khepri Protocol Sealed" : "Initiate Khepri Protocol";
        promptEl.classList.toggle("khepri-protocol-prompt-gold", forceGold);
      }
      if (forceGold) {
        mount.classList.remove("khepri-cycling");
        if (statusEl) statusEl.textContent = "KHEPRI PROTOCOL INITIATED · RADIANT SOLAR GOLD SEALED";
      }
    }

    function play(resetGold) {
      if (cycleTimer) clearTimeout(cycleTimer);
      if (doneTimer) clearTimeout(doneTimer);
      if (resetGold) {
        forceGold = false;
      }
      mount.classList.remove("khepri-cycling");
      syncGoldUi();

      mount.innerHTML = buildEveningChronicleKhepriSvg();
      if (!forceGold && statusEl) {
        statusEl.textContent = "ETCHING BODY → LIMBS → 11-TIER SYMMETRICAL FEATHER GLISSANDO";
      }

      // 1. Materialize Solar & Lunar Pearl Orbs with soft 6px -> 2px blur emission
      var orbs = mount.querySelectorAll("[data-orb-step]");
      orbs.forEach(function (orb) {
        var step = Number(orb.getAttribute("data-orb-step") || 4);
        orb.animate(
          [
            { opacity: 0, transform: "scale(0.8)", filter: "blur(6px)" },
            { opacity: 0.89, transform: "scale(0.85)", filter: "blur(2px)" },
          ],
          {
            duration: 5000,
            delay: step * 50,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          }
        );
      });

      // 2. Staggered 4-group stroke etch matching src/components/khepri-animation.tsx
      var paths = mount.querySelectorAll("path[data-etch-step]");
      paths.forEach(function (el) {
        if (typeof el.getTotalLength !== "function") return;
        var len = 0;
        try {
          len = el.getTotalLength();
        } catch (_e) {
          return;
        }
        if (!len || !isFinite(len)) return;

        var step = Number(el.getAttribute("data-etch-step") || 0);
        el.setAttribute("stroke-dasharray", String(len + 0.5));
        el.setAttribute("stroke-dashoffset", String(len + 0.5));

        var anim = el.animate(
          [
            { strokeDashoffset: len + 0.5, opacity: 0 },
            { strokeDashoffset: len + 0.5, opacity: 1, offset: 0.025 },
            { strokeDashoffset: 0, opacity: 1 },
          ],
          {
            duration: 900,
            delay: step * 50,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          }
        );

        anim.onfinish = function () {
          el.removeAttribute("stroke-dasharray");
          el.removeAttribute("stroke-dashoffset");
          el.setAttribute("opacity", "1");
        };
      });

      // 3. Activate 8s Neon Spectrum Cycle (matches postDelay = 1.3s in KhepriIconMotion)
      if (!forceGold) {
        cycleTimer = setTimeout(function () {
          if (!forceGold) {
            mount.classList.add("khepri-cycling");
          }
        }, 1300);

        doneTimer = setTimeout(function () {
          if (!forceGold && statusEl) {
            statusEl.textContent = "8S NEON SPECTRUM ACTIVE · CLICK SCARAB TO SEAL SOLAR GOLD";
          }
        }, 3500);
      }
    }

    function toggleGold(explicitState) {
      forceGold = typeof explicitState === "boolean" ? explicitState : !forceGold;
      syncGoldUi();
      if (!forceGold) {
        mount.classList.add("khepri-cycling");
        if (statusEl) statusEl.textContent = "8S NEON SPECTRUM ACTIVE · CLICK SCARAB TO SEAL SOLAR GOLD";
      }
    }

    play(false);

    if (trigger) {
      trigger.addEventListener("click", function () {
        toggleGold(!forceGold);
      });
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleGold(!forceGold);
        }
      });
    }

    if (replayBtn) {
      replayBtn.addEventListener("click", function () {
        play(true);
      });
    }

    if (goldBtn) {
      goldBtn.addEventListener("click", function () {
        toggleGold();
      });
    }

    if (contextBtn && liturgyEl) {
      contextBtn.addEventListener("click", function () {
        showLiturgy = !showLiturgy;
        liturgyEl.classList.toggle("khepri-liturgy-hidden", !showLiturgy);
        contextBtn.classList.toggle("cyber-btn-active", showLiturgy);
        contextBtn.textContent = showLiturgy ? "Chronicle Liturgy: On" : "Chronicle Liturgy: Off";
      });
    }
  }

  // ── 4. EUCLID / HIEROGLYPH DECRYPTION HEADER ─────────────────────────────
  function initDecryption() {
    var row1 = document.getElementById("decrypt-row-1");
    var row2 = document.getElementById("decrypt-row-2");
    var status = document.getElementById("decrypt-status");
    var replayEuclidBtn = document.getElementById("decrypt-euclid-btn");
    var customRunBtn = document.getElementById("decrypt-custom-btn");
    var input1 = document.getElementById("decrypt-line1-input");
    var input2 = document.getElementById("decrypt-line2-input");
    if (!row1 || !row2) return;

    var POOL = [
      "𓄿", "𓅀", "𓅁", "𓅂", "𓅃", "𓅆", "𓅇", "𓅈", "𓆑", "𓆓", "𓆦", "𓇋", "𓇌", "𓇍",
      "𓈖", "𓈘", "𓉔", "𓉡", "𓊃", "𓊆", "𓊇", "𓊪", "𓋀", "𓋁", "𓌀", "𓌁", "𓌃", "𓍿",
      "𓎛", "𓎜", "𓏏", "𓏑", "𓂀", "𓂋", "𓂌", "𓃭", "𓃮", "𓄂", "𓄃", "𓁹", "𓁺",
    ];
    var EGYPT_1 = ["𓇋", "𓅱", "𓎡", "𓃭", "𓇋", "𓇋", "𓂧", "𓇋", "𓊃"];
    var EGYPT_2 = ["𓊃", "𓏏", "𓂋", "𓇋", "𓎛", "𓄿", "𓇋", "𓄿"];
    var GREEK_1 = ["Ε", "Υ", "Κ", "Λ", "Ε", "Ι", "Δ", "Η", "Σ"];
    var GREEK_2 = ["Σ", "Τ", "Ο", "Ι", "Χ", "Ε", "Ι", "Α"];
    var MORPH_1 = ["E", "U", "C", "L", null, "I", "D", null, null];
    var MORPH_2 = ["E", "L", "E", "M", "E", "N", "T", "S"];

    var timers = [];
    function clearAll() {
      timers.forEach(function (t) { clearTimeout(t); });
      timers = [];
    }
    function later(fn, ms) {
      var id = setTimeout(fn, ms);
      timers.push(id);
      return id;
    }
    function randGlyph() {
      return POOL[Math.floor(Math.random() * POOL.length)];
    }

    function buildCells(container, count) {
      container.innerHTML = "";
      var cells = [];
      for (var i = 0; i < count; i++) {
        var cell = document.createElement("span");
        cell.className = "decrypt-cell decrypt-fuchsia";
        var glyphSpan = document.createElement("span");
        glyphSpan.className = "decrypt-glyph-hidden";
        var cursorSpan = document.createElement("span");
        cursorSpan.className = "decrypt-cursor decrypt-glyph-hidden";
        cursorSpan.textContent = "▌";
        cell.appendChild(glyphSpan);
        cell.appendChild(cursorSpan);
        container.appendChild(cell);
        cells.push({ cell: cell, glyph: glyphSpan, cursor: cursorSpan });
      }
      return cells;
    }

    function runSequence(opts) {
      clearAll();
      var isCustom = Boolean(opts && opts.custom);
      var l1Target = isCustom ? (opts.line1 || "THOTH").toUpperCase().split("") : GREEK_1;
      var l2Target = isCustom ? (opts.line2 || "NOTEBOOK").toUpperCase().split("") : GREEK_2;
      var init1 = isCustom ? l1Target.map(randGlyph) : EGYPT_1;
      var init2 = isCustom ? l2Target.map(randGlyph) : EGYPT_2;

      var c1 = buildCells(row1, init1.length);
      var c2 = buildCells(row2, init2.length);

      c1.forEach(function (o, i) { o.glyph.textContent = init1[i]; });
      c2.forEach(function (o, i) { o.glyph.textContent = init2[i]; });

      if (status) status.textContent = "PHASE 1 · HIEROGLYPH TELETYPE";

      var idx1 = 0;
      var idx2 = 0;
      if (c1[0]) c1[0].cursor.classList.remove("decrypt-glyph-hidden");

      function typeLine2() {
        if (idx2 < c2.length) {
          c2[idx2].cursor.classList.add("decrypt-glyph-hidden");
          c2[idx2].glyph.classList.remove("decrypt-glyph-hidden");
          idx2++;
          if (idx2 < c2.length) {
            c2[idx2].cursor.classList.remove("decrypt-glyph-hidden");
            later(typeLine2, 75);
          } else {
            later(startScramble, 650);
          }
        }
      }

      function typeLine1() {
        if (idx1 < c1.length) {
          c1[idx1].cursor.classList.add("decrypt-glyph-hidden");
          c1[idx1].glyph.classList.remove("decrypt-glyph-hidden");
          idx1++;
          if (idx1 < c1.length) {
            c1[idx1].cursor.classList.remove("decrypt-glyph-hidden");
            later(typeLine1, 120);
          } else {
            if (c2[0]) c2[0].cursor.classList.remove("decrypt-glyph-hidden");
            later(typeLine2, 550);
          }
        }
      }

      function startScramble() {
        if (status) {
          status.textContent = isCustom
            ? "PHASE 2 · SCRAMBLE LOCK"
            : "PHASE 2 · SCRAMBLE → GREEK (ΕΥΚΛΕΙΔΗΣ ΣΤΟΙΧΕΙΑ)";
        }
        var total = c1.length + c2.length;
        var start = Date.now();
        var ramp = 1300;
        var locked = 0;

        function tick() {
          var elapsed = Date.now() - start;
          var pct = Math.min(1, elapsed / ramp);
          var interval = Math.round(280 + (30 - 280) * pct);

          if (pct >= 1) {
            locked = Math.min(total, Math.floor((elapsed - ramp) / 115));
          }

          c1.forEach(function (o, i) {
            if (i < locked) {
              o.glyph.textContent = l1Target[i];
              o.cell.classList.remove("decrypt-fuchsia");
              o.cell.classList.add("decrypt-gold");
            } else {
              o.glyph.textContent = randGlyph();
            }
          });

          c2.forEach(function (o, i) {
            var pos = c1.length + i;
            if (pos < locked) {
              o.glyph.textContent = l2Target[i];
              o.cell.classList.remove("decrypt-fuchsia");
              o.cell.classList.add("decrypt-gold");
            } else {
              o.glyph.textContent = randGlyph();
            }
          });

          if (locked >= total) {
            if (isCustom) {
              if (status) status.textContent = "DECRYPTION COMPLETE";
            } else {
              later(startMorph, 1000);
            }
            return;
          }
          later(tick, interval);
        }

        later(tick, 120);
      }

      function startMorph() {
        if (status) status.textContent = "PHASE 3 · EXCESS CELL COLLAPSE → EUCLID ELEMENTS";
        c1.forEach(function (o, i) {
          if (MORPH_1[i] === null) {
            o.cell.classList.add("decrypt-cell-collapsed");
          }
        });

        later(function () {
          c1.forEach(function (o, i) {
            if (MORPH_1[i] !== null) o.glyph.textContent = MORPH_1[i];
          });
          c2.forEach(function (o, i) {
            o.glyph.textContent = MORPH_2[i];
          });
          if (status) status.textContent = "PHASE 4 · EUCLID ELEMENTS REVEALED";
        }, 900);
      }

      later(typeLine1, 550);
    }

    runSequence({ custom: false });

    if (replayEuclidBtn) {
      replayEuclidBtn.addEventListener("click", function () {
        runSequence({ custom: false });
      });
    }
    if (customRunBtn) {
      customRunBtn.addEventListener("click", function () {
        var v1 = input1 && input1.value.trim() ? input1.value.trim() : "THOTH";
        var v2 = input2 && input2.value.trim() ? input2.value.trim() : "PORTFOLIO";
        runSequence({ custom: true, line1: v1, line2: v2 });
      });
    }
  }

  // ── 5. NEHEH-CIRCUIT INTERACTIVE MATRIX ──────────────────────────────────
  function initNeheh() {
    var mount = document.getElementById("neheh-mount");
    var decanRow = document.getElementById("neheh-decan-row");
    var irisRow = document.getElementById("neheh-iris-row");
    var outerBtn = document.getElementById("neheh-outer-btn");
    var outermostBtn = document.getElementById("neheh-outermost-btn");
    var presetBtns = document.querySelectorAll("[data-neheh-preset]");
    if (!mount || !NEHEH) return;

    var decan = ["active", "active", "active", "active", "active", "active", "active", "active", "active", "active"];
    var iris = ["active", "active", "active", "active", "active", "active", "active"];
    var outer = "active";
    var outermost = "active";

    var PRESETS = {
      empty: { d: Array(10).fill("unlit"), ir: Array(7).fill("unlit"), o: "unlit", om: "unlit" },
      day5: { d: ["active", "active", "active", "active", "active", "unlit", "unlit", "unlit", "unlit", "unlit"], ir: Array(7).fill("unlit"), o: "unlit", om: "unlit" },
      day10: { d: Array(10).fill("active"), ir: Array(7).fill("unlit"), o: "unlit", om: "unlit" },
      irishalf: { d: Array(10).fill("active"), ir: ["active", "active", "active", "active", "unlit", "unlit", "unlit"], o: "unlit", om: "unlit" },
      full: { d: Array(10).fill("active"), ir: Array(7).fill("active"), o: "active", om: "active" },
      decay: { d: ["active", "active", "active", "missed", "active", "active", "missed", "missed", "active", "unlit"], ir: Array(7).fill("unlit"), o: "unlit", om: "unlit" },
    };

    // Build SVG once using NehehCircuitSVGData
    var S = NEHEH.structural;
    var IND = NEHEH.indicators;
    var ribs = [];
    var i;
    for (i = 0; i < 9; i++) if (S["decan-bar-ribs-left-upper-" + i]) ribs.push(S["decan-bar-ribs-left-upper-" + i]);
    for (i = 0; i < 9; i++) if (S["decan-bar-ribs-left-lower-" + i]) ribs.push(S["decan-bar-ribs-left-lower-" + i]);
    for (i = 0; i < 9; i++) if (S["decan-bar-ribs-right-upper-" + i]) ribs.push(S["decan-bar-ribs-right-upper-" + i]);
    for (i = 0; i < 9; i++) if (S["decan-bar-ribs-right-lower-" + i]) ribs.push(S["decan-bar-ribs-right-lower-" + i]);

    var parts = [
      '<svg viewBox="46 95 122 110" width="360" height="325" xmlns="http://www.w3.org/2000/svg">',
      "<defs>",
      '<filter id="nhc-s-cyan" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="b"/><feFlood flood-color="#22d3ee" flood-opacity="0.6" result="c"/><feComposite in="c" in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
      '<filter id="nhc-s-purple" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.0" result="b"/><feFlood flood-color="#a855f7" flood-opacity="0.6" result="c"/><feComposite in="c" in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
      '<filter id="nhc-s-amber" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="b"/><feFlood flood-color="#f59e0b" flood-opacity="0.6" result="c"/><feComposite in="c" in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
      '<filter id="nhc-green" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/><feFlood flood-color="#39FF14" flood-opacity="0.7" result="c"/><feComposite in="c" in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
      '<filter id="nhc-red" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/><feFlood flood-color="#f87171" flood-opacity="0.7" result="c"/><feComposite in="c" in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
      '<filter id="nhc-purple" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/><feFlood flood-color="#c084fc" flood-opacity="0.65" result="c"/><feComposite in="c" in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
      '<filter id="nhc-cyan" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/><feFlood flood-color="#22d3ee" flood-opacity="0.7" result="c"/><feComposite in="c" in2="b" operator="in" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
      "</defs>",
      '<path d="' + S["outer-ring-1"] + '" fill="rgba(6,182,212,0.04)" stroke="#22d3ee" stroke-width="0.45" filter="url(#nhc-s-cyan)"><animate attributeName="opacity" values="0.55;0.95;0.55" dur="4s" repeatCount="indefinite"/></path>',
      '<path d="' + S["outer-ring-2"] + '" fill="none" stroke="#0891b2" stroke-width="0.3" opacity="0.5"/>',
      '<path d="' + S["iris-outer"] + '" fill="none" stroke="#a855f7" stroke-width="0.5" filter="url(#nhc-s-purple)"><animate attributeName="opacity" values="0.65;1;0.65" dur="3s" repeatCount="indefinite"/></path>',
      '<path d="' + S["iris-inner"] + '" fill="none" stroke="#22d3ee" stroke-width="0.45" filter="url(#nhc-s-cyan)"/>',
    ];

    for (i = 1; i <= 12; i++) {
      if (S["iris-detail-" + i]) {
        parts.push('<path d="' + S["iris-detail-" + i] + '" fill="#001a22" stroke="#22d3ee" stroke-width="0.14" filter="url(#nhc-s-cyan)"/>');
      }
    }

    parts.push('<g transform="translate(-0.37417734,1.8708867)">');
    ["inner-bit-1", "inner-bit-2", "inner-bit-3", "inner-bit-4", "inner-bit-7"].forEach(function (k) {
      if (S[k]) parts.push('<path d="' + S[k] + '" fill="rgba(34,211,238,0.25)" stroke="#22d3ee" stroke-width="0.18" opacity="0.75"/>');
    });
    parts.push("</g>");

    parts.push('<path d="' + S["ankh-circuit"] + '" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" stroke-width="0.45" filter="url(#nhc-s-amber)"><animate attributeName="opacity" values="0.5;0.95;0.5" dur="3.5s" repeatCount="indefinite"/></path>');
    parts.push('<path d="' + S["ankh"] + '" fill="#f59e0b" opacity="0.88" filter="url(#nhc-s-amber)"/>');
    parts.push('<path d="' + S["decan-bar-outline"] + '" fill="none" stroke="#f59e0b" stroke-width="0.55" filter="url(#nhc-s-amber)"/>');

    for (i = 1; i <= 10; i++) {
      if (S["decan-tick-" + i]) parts.push('<path d="' + S["decan-tick-" + i] + '" fill="#0c1626" stroke="#1e3a5f" stroke-width="0.25"/>');
    }

    ribs.forEach(function (d, idx) {
      parts.push('<path d="' + d + '" fill="none" stroke="#22d3ee" stroke-width="0.5"><animate attributeName="opacity" values="0.15;1;0.15" dur="3.6s" begin="' + (idx * 0.1).toFixed(1) + 's" repeatCount="indefinite"/></path>');
    });

    parts.push('<g transform="scale(0.26458333)">');
    for (i = 1; i <= 10; i++) {
      parts.push('<path id="nhc-decan-' + (i - 1) + '" d="' + IND["decan-indicator-" + i] + '"/>');
    }
    for (i = 1; i <= 7; i++) {
      parts.push('<path id="nhc-iris-' + (i - 1) + '" d="' + IND["iris-indicator-" + i] + '"/>');
    }
    parts.push('<path id="nhc-outer" d="' + IND["outer-ring-indicator"] + '"/>');
    parts.push('<path id="nhc-outermost" d="' + IND["outermost-ring-indicator"] + '"/>');
    parts.push("</g></svg>");

    mount.innerHTML = parts.join("");

    function renderState() {
      decan.forEach(function (st, idx) {
        var p = document.getElementById("nhc-decan-" + idx);
        if (!p) return;
        p.setAttribute("fill", st === "active" ? "#39FF14" : st === "missed" ? "#f87171" : "#071207");
        p.setAttribute("opacity", st === "unlit" ? "0.25" : "0.9");
        if (st === "active") p.setAttribute("filter", "url(#nhc-green)");
        else if (st === "missed") p.setAttribute("filter", "url(#nhc-red)");
        else p.removeAttribute("filter");
      });

      iris.forEach(function (st, idx) {
        var p = document.getElementById("nhc-iris-" + idx);
        if (!p) return;
        p.setAttribute("fill", st === "active" ? "#c084fc" : "#140a1e");
        p.setAttribute("opacity", st === "active" ? "0.85" : "0.15");
        if (st === "active") p.setAttribute("filter", "url(#nhc-purple)");
        else p.removeAttribute("filter");
      });

      var pOuter = document.getElementById("nhc-outer");
      if (pOuter) {
        pOuter.setAttribute("fill", outer === "active" ? "#f87171" : "#1a0000");
        pOuter.setAttribute("opacity", outer === "active" ? "0.85" : "0.1");
        if (outer === "active") pOuter.setAttribute("filter", "url(#nhc-red)");
        else pOuter.removeAttribute("filter");
      }

      var pOutermost = document.getElementById("nhc-outermost");
      if (pOutermost) {
        pOutermost.setAttribute("fill", outermost === "active" ? "#22d3ee" : "#001519");
        pOutermost.setAttribute("opacity", outermost === "active" ? "0.85" : "0.08");
        if (outermost === "active") pOutermost.setAttribute("filter", "url(#nhc-cyan)");
        else pOutermost.removeAttribute("filter");
      }

      // Update UI buttons
      if (decanRow) {
        decanRow.innerHTML = "";
        decan.forEach(function (st, idx) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "nhc-chip" + (st === "active" ? " nhc-chip-active" : st === "missed" ? " nhc-chip-missed" : "");
          b.textContent = String(idx + 1);
          b.addEventListener("click", function () {
            decan[idx] = st === "unlit" ? "active" : st === "active" ? "missed" : "unlit";
            renderState();
          });
          decanRow.appendChild(b);
        });
      }

      if (irisRow) {
        irisRow.innerHTML = "";
        iris.forEach(function (st, idx) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "nhc-chip" + (st === "active" ? " nhc-chip-iris" : "");
          b.textContent = String(idx + 1);
          b.addEventListener("click", function () {
            iris[idx] = st === "active" ? "unlit" : "active";
            renderState();
          });
          irisRow.appendChild(b);
        });
      }

      if (outerBtn) {
        outerBtn.textContent = "OUTER RING · " + outer.toUpperCase();
        outerBtn.className = "nhc-ring-btn" + (outer === "active" ? " nhc-ring-outer-on" : "");
      }
      if (outermostBtn) {
        outermostBtn.textContent = "OUTERMOST · " + outermost.toUpperCase();
        outermostBtn.className = "nhc-ring-btn" + (outermost === "active" ? " nhc-ring-outermost-on" : "");
      }
    }

    if (outerBtn) {
      outerBtn.addEventListener("click", function () {
        outer = outer === "active" ? "unlit" : "active";
        renderState();
      });
    }
    if (outermostBtn) {
      outermostBtn.addEventListener("click", function () {
        outermost = outermost === "active" ? "unlit" : "active";
        renderState();
      });
    }

    presetBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.getAttribute("data-neheh-preset");
        var p = PRESETS[k];
        if (!p) return;
        presetBtns.forEach(function (b) { b.classList.remove("cyber-btn-active"); });
        btn.classList.add("cyber-btn-active");
        decan = p.d.slice();
        iris = p.ir.slice();
        outer = p.o;
        outermost = p.om;
        renderState();
      });
    });

    renderState();
  }

  // ── 6. OBELISK OF ISTANBUL CAMERA RITUAL ─────────────────────────────────
  function initObelisk() {
    var viewport = document.getElementById("obelisk-viewport");
    var status = document.getElementById("obelisk-status");
    var knockBtn = document.getElementById("obelisk-knock-btn");
    var resetBtn = document.getElementById("obelisk-reset-btn");
    var camBtns = document.querySelectorAll("[data-obelisk-cam]");
    if (!viewport) return;

    viewport.innerHTML = normalizeInkscapeSvg(SVGS["crypto-obelisk-of-istanbul-detailed.svg"]);
    var svgEl = viewport.querySelector("svg");
    if (!svgEl) return;

    svgEl.setAttribute("color", "#00FFFF");
    svgEl.classList.add("obelisk-float");

    var VIEWS = {
      summit: [5, 0, 45, 50],
      landing: [5, 225, 45, 55],
      anchored: [-8, 225, 70, 72],
      totality: [-22, 0, 100, 300],
      pedestal: [-1, 245, 51, 53],
      bastet: [-0.5, 275.5, 13.5, 22],
    };

    var currentVb = [-22, 0, 100, 300];
    var animFrame = null;
    var knocks = 0;

    function animateViewBox(targetKey) {
      var target = VIEWS[targetKey] || VIEWS.totality;
      if (animFrame) cancelAnimationFrame(animFrame);
      var startVb = currentVb.slice();
      var startTime = performance.now();
      var dur = 950;

      function step(now) {
        var t = Math.min(1, (now - startTime) / dur);
        var ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        currentVb = startVb.map(function (v, idx) {
          return v + (target[idx] - v) * ease;
        });
        svgEl.setAttribute(
          "viewBox",
          currentVb.map(function (n) { return n.toFixed(2); }).join(" ")
        );
        if (t < 1) {
          animFrame = requestAnimationFrame(step);
        }
      }
      animFrame = requestAnimationFrame(step);

      camBtns.forEach(function (b) {
        b.classList.toggle("cyber-btn-active", b.getAttribute("data-obelisk-cam") === targetKey);
      });
      updateHud(targetKey);
    }

    function applyKnockColor() {
      var colors = ["#00FFFF", "#a855f7", "#e879f9", "#39ff14"];
      svgEl.setAttribute("color", colors[Math.min(3, knocks)]);
    }

    function updateHud(camLabel) {
      if (status) {
        status.textContent =
          "CAMERA: " + (camLabel || "TOTALITY").toUpperCase() +
          " · KNOCK SEQUENCE: " + knocks + " / 3";
      }
      if (knockBtn) {
        knockBtn.textContent = "KNOCK (" + knocks + "/3)";
      }
    }

    function doKnock() {
      knocks = Math.min(3, knocks + 1);
      applyKnockColor();
      if (knocks === 3) {
        animateViewBox("pedestal");
      } else {
        updateHud("totality");
      }
    }

    svgEl.setAttribute("viewBox", VIEWS.summit.join(" "));
    currentVb = VIEWS.summit.slice();
    setTimeout(function () { animateViewBox("totality"); }, 650);

    viewport.addEventListener("click", doKnock);
    if (knockBtn) knockBtn.addEventListener("click", doKnock);
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        knocks = 0;
        applyKnockColor();
        animateViewBox("totality");
      });
    }

    camBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cam = btn.getAttribute("data-obelisk-cam");
        if (cam) animateViewBox(cam);
      });
    });
  }

  // ── 7. KA TERMINAL ARTIFACT DECK ─────────────────────────────────────────
  function initKaTerminal() {
    var mounts = document.querySelectorAll("[data-ka-svg]");
    var status = document.getElementById("ka-terminal-status");

    mounts.forEach(function (el) {
      var file = el.getAttribute("data-ka-svg");
      if (file === "thoth-chip-logo.svg") {
        playIbisChipEtch(el);
        return;
      }
      var raw = SVGS[file] || "";
      if (file === "khepri-scarab.svg") {
        raw = normalizeInkscapeSvg(raw);
      }
      el.innerHTML = raw;
    });

    var cards = document.querySelectorAll("[data-ka-relic]");
    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        var name = card.getAttribute("data-ka-relic");
        if (status) status.textContent = "ACTIVE TELEMETRY CHANNEL · " + name;
        var seshatBox = card.querySelector("#seshat-button");
        var thothBox = card.querySelector('[data-ka-svg="thoth-chip-logo.svg"]');
        if (seshatBox) {
          triggerSeshatRipple(seshatBox);
        } else if (thothBox) {
          playIbisChipEtch(thothBox);
        } else {
          runStrokeEtch(card, { duration: 950, stagger: 12 });
        }
      });
    });
  }

  // ── 8. NEDJEM BASTET · GUARDIAN OF SULTANAHMET ───────────────────────────
  function triggerBastetGemGleam(container) {
    if (!container) return;
    var gems = container.querySelectorAll(
      '#nedjem-bastet-collar-gems path, [data-part^="red-"], [data-part^="blue-"]'
    );
    gems.forEach(function (gem, idx) {
      if (typeof gem.animate !== "function") return;
      var part = gem.getAttribute("data-part") || "";
      var isRed = part.indexOf("red-") === 0;
      gem.animate(
        [
          { opacity: 0.95, filter: "none" },
          {
            opacity: 1,
            fill: isRed ? "#fde047" : "#ffffff",
            filter: isRed
              ? "drop-shadow(0 0 5px #f59e0b)"
              : "drop-shadow(0 0 5px #00ffff)",
          },
          { opacity: 0.95, filter: "none" },
        ],
        {
          duration: 620,
          delay: idx * 14,
          easing: "ease-out",
        }
      );
    });

    var goldParts = container.querySelectorAll(
      '[data-part="eye"], [data-part="eye-right"], [data-part="earring"], [data-part^="eye-of-horus"]'
    );
    goldParts.forEach(function (el, idx) {
      if (typeof el.animate !== "function") return;
      el.animate(
        [
          { filter: "none" },
          { filter: "drop-shadow(0 0 7px #ffd700)" },
          { filter: "none" },
        ],
        { duration: 850, delay: idx * 55, easing: "ease-in-out" }
      );
    });
  }

  function initBastet() {
    var viewport = document.getElementById("bastet-viewport");
    var status = document.getElementById("bastet-status");
    var etchBtn = document.getElementById("bastet-etch-btn");
    var viewBtns = document.querySelectorAll("[data-bastet-view]");
    var colorBtns = document.querySelectorAll("[data-bastet-color]");
    if (!viewport) return;

    var STANDALONE_VIEWS = {
      sculpture: [65, 290, 130, 240],
      regalia: [102, 293, 90, 108],
    };
    var ISTANBUL_VIEWS = {
      pedestalAndCat: [-1, 245, 51, 53],
      catClose: [-0.5, 275.5, 13.5, 22],
    };

    var activeMode = "sculpture";
    var istanbulZoomedIn = false;
    var currentVb = STANDALONE_VIEWS.sculpture.slice();
    var animFrame = null;

    function animateVb(svgEl, targetVb, dur) {
      if (!svgEl) return;
      if (animFrame) cancelAnimationFrame(animFrame);
      var startVb = currentVb.slice();
      var startTime = performance.now();
      var duration = dur || 820;

      function step(now) {
        var t = Math.min(1, (now - startTime) / duration);
        var ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        currentVb = startVb.map(function (v, i) {
          return v + (targetVb[i] - v) * ease;
        });
        svgEl.setAttribute(
          "viewBox",
          currentVb.map(function (n) { return n.toFixed(2); }).join(" ")
        );
        if (t < 1) {
          animFrame = requestAnimationFrame(step);
        }
      }
      animFrame = requestAnimationFrame(step);
    }

    function mountStandalone(targetKey, withEtch) {
      var raw = (SVGS["nedjem-bastet-cat.svg"] || "").replace(
        /\scolor="#00FFFF"/i,
        ""
      );
      viewport.innerHTML = raw;
      var svgEl = viewport.querySelector("svg");
      if (!svgEl) return;

      var vb = STANDALONE_VIEWS[targetKey] || STANDALONE_VIEWS.sculpture;
      svgEl.setAttribute("viewBox", vb.join(" "));
      currentVb = vb.slice();

      if (withEtch) {
        runStrokeEtch(viewport, { duration: 1100, stagger: 9 });
        setTimeout(function () {
          triggerBastetGemGleam(viewport);
        }, 550);
      } else {
        triggerBastetGemGleam(viewport);
      }
    }

    function mountIstanbul() {
      var raw = normalizeInkscapeSvg(SVGS["crypto-obelisk-of-istanbul-detailed.svg"] || "");
      viewport.innerHTML = raw;
      var svgEl = viewport.querySelector("svg");
      if (!svgEl) return;

      svgEl.removeAttribute("width");
      svgEl.removeAttribute("height");
      istanbulZoomedIn = false;
      var start = [-22, 0, 100, 300];
      svgEl.setAttribute("viewBox", start.join(" "));
      currentVb = start.slice();
      setTimeout(function () {
        animateVb(svgEl, ISTANBUL_VIEWS.pedestalAndCat, 1050);
      }, 120);
    }

    function setViewMode(nextMode) {
      viewBtns.forEach(function (b) {
        b.classList.toggle("cyber-btn-active", b.getAttribute("data-bastet-view") === nextMode);
      });

      if (nextMode === "istanbul") {
        activeMode = "istanbul";
        mountIstanbul();
        if (status) {
          status.textContent =
            "BESIDE THE OBELISK OF ISTANBUL · CLICK VIEWPORT TO ZOOM IN ON NEDJEM BASTET";
        }
        return;
      }

      var wasIstanbul = activeMode === "istanbul";
      activeMode = nextMode;
      var targetVb = STANDALONE_VIEWS[nextMode] || STANDALONE_VIEWS.sculpture;

      if (wasIstanbul || !viewport.querySelector("#nedjem-bastet-cat")) {
        mountStandalone(nextMode, false);
      } else {
        animateVb(viewport.querySelector("svg"), targetVb, 780);
        triggerBastetGemGleam(viewport);
      }

      if (status) {
        status.textContent =
          nextMode === "regalia"
            ? "VIEW: HOOP EARRING, 60 CARNELIAN/LAPIS GEMS & EYE OF HORUS PECTORAL"
            : "VIEW: FULL SCULPTURE · 121 VECTOR PATHS · CLICK SCULPTURE TO GLEAM";
      }
    }

    mountStandalone("sculpture", true);

    viewBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var m = btn.getAttribute("data-bastet-view");
        if (m) setViewMode(m);
      });
    });

    if (etchBtn) {
      etchBtn.addEventListener("click", function () {
        if (activeMode === "istanbul") {
          runStrokeEtch(viewport, { duration: 1100, stagger: 5 });
          setTimeout(function () {
            triggerBastetGemGleam(viewport);
          }, 500);
        } else {
          mountStandalone(activeMode, true);
        }
      });
    }

    function handleViewportActivate() {
      if (activeMode === "istanbul") {
        var svgEl = viewport.querySelector("svg");
        istanbulZoomedIn = !istanbulZoomedIn;
        animateVb(
          svgEl,
          istanbulZoomedIn ? ISTANBUL_VIEWS.catClose : ISTANBUL_VIEWS.pedestalAndCat,
          820
        );
        triggerBastetGemGleam(viewport);
        if (status) {
          status.textContent = istanbulZoomedIn
            ? "CLOSE-UP BESIDE THEODOSIUS PEDESTAL · CLICK TO PULL BACK TO PEDESTAL"
            : "BESIDE THE OBELISK OF ISTANBUL · CLICK VIEWPORT TO ZOOM IN ON NEDJEM BASTET";
        }
      } else {
        triggerBastetGemGleam(viewport);
      }
    }

    viewport.addEventListener("click", handleViewportActivate);
    viewport.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleViewportActivate();
      }
    });

    colorBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        colorBtns.forEach(function (b) { b.classList.remove("cyber-btn-active"); });
        btn.classList.add("cyber-btn-active");
        var c = btn.getAttribute("data-bastet-color") || "cyan";
        viewport.classList.remove(
          "bastet-finish-cyan",
          "bastet-finish-gold",
          "bastet-finish-turquoise",
          "bastet-finish-purple"
        );
        viewport.classList.add("bastet-finish-" + c);
        triggerBastetGemGleam(viewport);
      });
    });
  }

  // ── Bootstrap matching preview ───────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    var mode = document.body.getAttribute("data-preview");
    if (mode === "seshat") initSeshat();
    else if (mode === "ibis") initIbis();
    else if (mode === "khepri") initKhepri();
    else if (mode === "decryption") initDecryption();
    else if (mode === "neheh") initNeheh();
    else if (mode === "obelisk") initObelisk();
    else if (mode === "ka-terminal") initKaTerminal();
    else if (mode === "bastet") initBastet();
  });
})();

