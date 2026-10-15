"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "#promises", label: "Why ST EA SB" },
  { href: "#strategy", label: "The Engine" },
  { href: "#benefits", label: "Benefits" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#control-panel", label: "Control Panel" },
  { href: "#security", label: "Security" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[rgba(236,234,226,0.08)] bg-[#0d0e11]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — website brand: FFX Autobot Trading */}
        <a href="#top" className="group flex items-center gap-3" aria-label="FFX Autobot Trading home">
          <div className="flex h-9 w-9 items-center justify-center border border-[rgba(240,180,41,0.35)] bg-[#14161c]">
            <ShieldCheck className="h-4.5 w-4.5 text-[#f0b429]" strokeWidth={2.2} />
          </div>
          <div className="leading-none">
            <span className="font-mono text-[13px] font-bold tracking-[0.05em] text-[#eceae2] sm:text-[15px] sm:tracking-[0.07em]">
              FFX&nbsp;AUTOBOT&nbsp;<span className="text-[#f0b429]">TRADING</span>
            </span>
            <p className="mono-label mt-1 hidden text-[8.5px] text-[#a7acb8] sm:block">
              Home of ST EA SB
            </p>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-[13px] font-medium text-[#a7acb8] transition-colors hover:bg-[#191c23] hover:text-[#eceae2]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#get-access"
            className="group hidden items-center gap-2 bg-[#f0b429] px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-[#0d0e11] transition-all hover:bg-[#ffc94a] sm:inline-flex"
          >
            Get ST EA SB
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(236,234,226,0.14)] text-[#eceae2] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-b border-[rgba(236,234,226,0.08)] bg-[#0d0e11]/97 backdrop-blur-md lg:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-medium text-[#a7acb8] transition-colors hover:bg-[#191c23] hover:text-[#eceae2]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#get-access"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-[#f0b429] px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-[#0d0e11]"
              >
                Get ST EA SB
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
