"use client";

import { motion } from "framer-motion";
import { Lock, FileLock2, EyeOff, KeyRound, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";

const SPEC_ROWS = [
  { label: "Strategy engine", value: "Hidden by SB", classified: true },
  { label: "Formula & calculations", value: "Sealed", classified: true },
  { label: "Settings & parameters", value: "Sealed", classified: true },
  {
    label: "What you receive",
    value: "The complete package — signals, entries, protection and profit management, fully automatic.",
    classified: false,
  },
];

export function Strategy() {
  return (
    <section id="strategy" className="relative overflow-hidden border-y border-[rgba(236,234,226,0.08)] bg-[#0f1014] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="The secret inside"
          title={
            <>
              Powered by the{" "}
              <span className="text-[#f0b429]">Hidden Strategy by SB</span>
            </>
          }
          description="Most trading robots proudly print the name of the indicator they follow — and hand their edge to everyone who can read a chart. ST EA SB takes a different path."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-[#eceae2]">
              The engine that drives every signal is{" "}
              <span className="font-semibold text-[#f0b429]">sealed</span>. You enjoy the
              results — the strategy stays ours.
            </p>
            <p className="text-[15px] leading-relaxed text-[#a7acb8]">
              You don&apos;t need the recipe to enjoy the meal. The hidden engine is a{" "}
              <span className="text-[#eceae2]">volatility-adaptive, trend-following</span>{" "}
              core. It reads the market&apos;s rhythm, acts on every tick and manages each
              trade from entry to exit — the{" "}
              <span className="font-mono text-[#f0b429]">how</span> stays sealed inside.
            </p>
            <ul className="space-y-3.5">
              {[
                "One signal line drawn directly on your chart",
                "Your stop loss sits exactly on that line — same price, same tick",
                "When the line steps, your stop steps. Zero drift. Zero lag.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[#eceae2]">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#f0b429]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: sealed spec card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative border border-[rgba(240,180,41,0.22)] bg-[#101218]">
              <div className="flex items-center justify-between border-b border-[rgba(240,180,41,0.22)] px-5 py-3.5">
                <p className="mono-label flex items-center gap-2 text-[10px] text-[#f0b429]">
                  <FileLock2 className="h-3.5 w-3.5" />
                  Engine specification
                </p>
                <p className="mono-label text-[9px] text-[#5d616d]">File · SB-Sealed</p>
              </div>

              <div className="divide-y divide-[rgba(236,234,226,0.07)]">
                {SPEC_ROWS.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 px-5 py-4">
                    <p className="mono-label mt-0.5 shrink-0 text-[9.5px] text-[#a7acb8]">
                      {row.label}
                    </p>
                    {row.classified ? (
                      <span className="inline-flex items-center gap-1.5 border border-[rgba(240,180,41,0.3)] bg-[rgba(240,180,41,0.07)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#f0b429]">
                        <EyeOff className="h-3 w-3" />
                        {row.value}
                      </span>
                    ) : (
                      <p className="max-w-[260px] text-right text-[12.5px] leading-relaxed text-[#eceae2]">
                        {row.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-[rgba(240,180,41,0.22)] bg-[rgba(240,180,41,0.05)] px-5 py-3">
                <p className="mono-label flex items-center gap-1.5 text-[8.5px] text-[#f0b429]">
                  <Lock className="h-3 w-3" />
                  Embedded · Licensed · Owner-only
                </p>
                <p className="mono-label text-[8.5px] text-[#5d616d]">
                  Never exposed · Never copied
                </p>
              </div>
            </div>

            {/* password hint chip */}
            <div className="mt-4 flex items-center justify-center gap-2 border border-[rgba(236,234,226,0.1)] bg-[#14161c] px-4 py-3">
              <KeyRound className="h-4 w-4 text-[#f0b429]" />
              <p className="text-[12.5px] text-[#a7acb8]">
                One password unlocks the EA.{" "}
                <span className="text-[#eceae2]">Zero settings can be changed.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
