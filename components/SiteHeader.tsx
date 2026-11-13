"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  desc: string;
  badge?: string;
}

const PRIMARY_NAV: NavItem[] = [
  {
    label: "Main Terminal",
    href: "/",
    desc: "Digital Stewardship, Core Values & Product Lineup",
  },
  {
    label: "Vector & Motion Portfolio",
    href: "/portfolio",
    desc: "Custom SVG Graphics, Khepri Scarab & Seshat Chronometer",
    badge: "New",
  },
  {
    label: "Studio Merch & E-Commerce",
    href: "/shop",
    desc: "Normalized Shopify & Fourthwall Headless Showcase",
  },
  {
    label: "Contact Principal",
    href: "/#contact",
    desc: "Direct Inquiries & Platform Demo Requests",
  },
];

const PORTFOLIO_SHORTCUTS = [
  { label: "Khepri Scarab Etch", href: "/portfolio#khepri-scarab" },
  { label: "Seshat Chronometer", href: "/portfolio#seshat-chronometer" },
  { label: "Interactive Rituals", href: "/portfolio#interactive-rituals" },
  { label: "34-Asset Vector Vault", href: "/portfolio#vector-vault" },
];

const LIVE_PLATFORMS = [
  { label: "HOA-hub.cloud", href: "https://www.hoa-hub.cloud/", status: "Beta" },
  { label: "Thoth's Notebook", href: "https://thoths-notebook.ibislabs.cloud", status: "Live" },
  { label: "Trainer Notebook Pro", href: "https://trainer-notebook-pro.ibislabs.cloud", status: "Live" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Security Stance", href: "/security" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on Esc key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background body scroll when mobile/full drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/85 backdrop-blur-md border-b border-gray-800/90 selection:bg-cyber-cyan selection:text-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Lockup */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded border border-cyber-cyan/50 bg-black flex items-center justify-center p-1 group-hover:border-cyber-cyan group-hover:shadow-[0_0_14px_rgba(31,170,254,0.45)] transition-all">
              <Image
                src="/thoth-icon-32x32.png"
                alt="Ibis Labs LLC emblem"
                width={26}
                height={26}
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-white group-hover:text-cyber-cyan transition-colors">
                Ibis Labs LLC
              </span>
              <span className="hidden sm:inline text-[10px] text-gray-400 tracking-[0.18em] uppercase">
                Digital Stewardship &amp; Architecture
              </span>
            </div>
          </Link>

          {/* Desktop Quick Links + Always-Available Hamburger Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav
              aria-label="Primary quick links"
              className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest"
            >
              <Link
                href="/"
                className={`transition-colors ${
                  pathname === "/"
                    ? "text-cyber-cyan drop-shadow-[0_0_6px_rgba(31,170,254,0.7)]"
                    : "text-gray-300 hover:text-cyber-cyan"
                }`}
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className={`inline-flex items-center gap-2 transition-colors ${
                  pathname?.startsWith("/portfolio")
                    ? "text-cyber-cyan drop-shadow-[0_0_6px_rgba(31,170,254,0.7)]"
                    : "text-gray-300 hover:text-cyber-cyan"
                }`}
              >
                <span>Vector &amp; Motion</span>
                <span className="text-[9px] border border-cyber-cyan/70 bg-cyber-cyan/10 text-cyber-cyan px-1.5 py-0.5 rounded">
                  Portfolio
                </span>
              </Link>
              <Link
                href="/shop"
                className={`transition-colors ${
                  pathname?.startsWith("/shop")
                    ? "text-cyber-cyan drop-shadow-[0_0_6px_rgba(31,170,254,0.7)]"
                    : "text-gray-300 hover:text-cyber-cyan"
                }`}
              >
                Merch Demo
              </Link>
              <Link
                href="/#contact"
                className="text-gray-300 hover:text-cyber-cyan transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="ibis-navigation-drawer"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className={`inline-flex items-center gap-2.5 px-3 py-2 rounded border transition-all cursor-pointer focus:outline-none ${
                isOpen
                  ? "border-cyber-cyan bg-cyber-cyan/15 text-cyber-cyan shadow-[0_0_18px_rgba(31,170,254,0.45)]"
                  : "border-cyber-cyan/50 hover:border-cyber-cyan bg-black/80 text-white hover:text-cyber-cyan hover:shadow-[0_0_14px_rgba(31,170,254,0.35)]"
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] hidden sm:inline">
                {isOpen ? "Close" : "Menu"}
              </span>
              <span className="relative w-5 h-4 flex flex-col justify-between items-center">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-0.5 bg-current rounded-full block origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.15 }}
                  className="w-5 h-0.5 bg-current rounded-full block"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-0.5 bg-current rounded-full block origin-center"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Over Hamburger Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 top-16 z-40 bg-black/80 backdrop-blur-sm"
            />

            <motion.aside
              id="ibis-navigation-drawer"
              key="nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site Navigation Menu"
              initial={{ x: "100%", opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.6 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-16 right-0 bottom-0 z-50 w-full max-w-md bg-black border-l border-cyber-cyan/50 shadow-[0_0_60px_rgba(31,170,254,0.22)] overflow-y-auto p-6 sm:p-8 flex flex-col justify-between gap-8"
            >
              <div className="space-y-8">
                {/* Primary Destinations */}
                <div>
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyber-cyan">
                      Site Directory
                    </span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      ibislabs.cloud
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {PRIMARY_NAV.map((item) => {
                      const isActive =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname?.startsWith(item.href);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className={`group block p-3.5 rounded border transition-all ${
                            isActive
                              ? "border-cyber-cyan bg-cyber-cyan/10 shadow-[0_0_20px_rgba(31,170,254,0.2)]"
                              : "border-gray-800 hover:border-cyber-cyan/70 bg-black/60 hover:bg-cyber-cyan/5"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-sm font-bold uppercase tracking-widest text-white group-hover:text-cyber-cyan transition-colors">
                              <span className="text-cyber-cyan mr-2">▹</span>
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] border border-cyber-cyan text-cyber-cyan px-2 py-0.5 rounded uppercase tracking-wider">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 pl-4 leading-relaxed">
                            {item.desc}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Portfolio Deep-Links */}
                <div>
                  <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyber-cyan border-b border-gray-800 pb-2 mb-3">
                    Portfolio Exhibits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PORTFOLIO_SHORTCUTS.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={closeMenu}
                        className="text-xs text-gray-300 hover:text-cyber-cyan border border-gray-800 hover:border-cyber-cyan/60 rounded px-3 py-2 tracking-wider uppercase transition-all flex items-center justify-between"
                      >
                        <span>{sub.label}</span>
                        <span className="text-cyber-cyan">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Live Platforms */}
                <div>
                  <h3 className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyber-cyan border-b border-gray-800 pb-2 mb-3">
                    Live Cloud Platforms
                  </h3>
                  <div className="flex flex-col gap-2">
                    {LIVE_PLATFORMS.map((plat) => (
                      <a
                        key={plat.href}
                        href={plat.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="flex items-center justify-between px-3 py-2 rounded border border-gray-800/90 hover:border-cyber-cyan/60 text-xs text-gray-300 hover:text-cyber-cyan transition-colors"
                      >
                        <span className="tracking-wider">{plat.label}</span>
                        <span className="flex items-center gap-2">
                          <span className="text-[10px] text-cyber-cyan/80 border border-cyber-cyan/40 px-1.5 py-0.5 rounded uppercase">
                            {plat.status}
                          </span>
                          <span>↗</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer / Governance */}
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {LEGAL_LINKS.map((leg) => (
                    <Link
                      key={leg.href}
                      href={leg.href}
                      onClick={closeMenu}
                      className="text-[10px] text-gray-400 hover:text-cyber-cyan border border-gray-800 hover:border-cyber-cyan/50 px-2.5 py-1 rounded uppercase tracking-widest transition-colors"
                    >
                      {leg.label}
                    </Link>
                  ))}
                </div>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} Ibis Labs LLC · Digital Service by Ka
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

