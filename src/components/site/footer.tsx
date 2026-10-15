"use client";

import { ShieldCheck, TriangleAlert } from "lucide-react";

const FOOTER_LINKS = [
  { href: "#promises", label: "Why ST EA SB" },
  { href: "#strategy", label: "The Engine" },
  { href: "#benefits", label: "Benefits" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#control-panel", label: "Control Panel" },
  { href: "#security", label: "Security" },
  { href: "#faq", label: "FAQ" },
  { href: "#get-access", label: "Get Access" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-[rgba(236,234,226,0.08)] bg-[#0a0b0d]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* brand row */}
        <div className="flex flex-col items-center gap-6 border-b border-[rgba(236,234,226,0.07)] pb-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-[rgba(240,180,41,0.35)] bg-[#14161c]">
              <ShieldCheck className="h-4.5 w-4.5 text-[#f0b429]" strokeWidth={2.2} />
            </div>
            <div className="leading-none">
              <p className="font-mono text-[13px] font-bold tracking-[0.06em] text-[#eceae2] sm:text-[15px]">
                FFX&nbsp;AUTOBOT&nbsp;<span className="text-[#f0b429]">TRADING</span>
              </p>
              <p className="mono-label mt-1.5 text-[8px] text-[#5d616d]">
                Home of ST EA SB — Automated Trading Assistant
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Footer">
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[12.5px] text-[#a7acb8] transition-colors hover:text-[#f0b429]"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* risk warning */}
        <div className="mt-8 border border-[rgba(229,72,77,0.25)] bg-[rgba(229,72,77,0.05)] p-5 sm:p-6">
          <p className="mono-label mb-2.5 flex items-center gap-2 text-[9px] text-[#e5484d]">
            <TriangleAlert className="h-3.5 w-3.5" />
            Risk warning
          </p>
          <p className="max-w-4xl text-[12px] leading-relaxed text-[#a7acb8]">
            Trading foreign exchange and CFDs on margin carries a high level of risk and may
            not be suitable for all investors. Past performance is not indicative of future
            results. ST EA SB is a trade-management tool and does not guarantee profits. The
            Hidden Strategy by SB is proprietary and sealed. Engine internals are never exposed.
          </p>
        </div>

        {/* bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[rgba(236,234,226,0.07)] pt-6 sm:flex-row">
          <p className="mono-label text-[8.5px] text-[#5d616d]">
            FFX Autobot Trading · ST EA SB Expert Advisor V2.50 · Engine: Hidden Strategy by SB [Sealed]
          </p>
          <p className="mono-label text-[8.5px] text-[#5d616d]">
            © 2025 FFX Autobot Trading — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
