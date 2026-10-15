"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Eye, ArrowLeftRight, PiggyBank } from "lucide-react";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Attach",
    body: "Drop ST EA SB on any MetaTrader 5 chart — any broker, any symbol. Two-minute setup.",
  },
  {
    icon: Eye,
    step: "02",
    title: "It watches",
    body: "The hidden engine reads every tick of your market, around the clock — no coffee breaks.",
  },
  {
    icon: ArrowLeftRight,
    step: "03",
    title: "It trades",
    body: "Buys the up-trend, sells the down-trend — every trade protected from second one.",
  },
  {
    icon: PiggyBank,
    step: "04",
    title: "You collect",
    body: "Stops follow the trend, targets get banked — and at your goal, it stops. Done.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-[rgba(236,234,226,0.08)] bg-[#0f1014] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="How it works"
          title={
            <>
              From zero to autopilot in{" "}
              <span className="text-[#f0b429]">four simple steps.</span>
            </>
          }
        />

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.step}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative border border-[rgba(236,234,226,0.1)] bg-[#14161c] p-7"
            >
              {/* connector */}
              {i < STEPS.length - 1 && (
                <span
                  className="absolute -right-[13px] top-1/2 z-10 hidden h-[2px] w-[22px] bg-gradient-to-r from-[#f0b429]/60 to-[#f0b429]/15 lg:block"
                  aria-hidden="true"
                />
              )}
              <div className="flex items-start justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center border border-[rgba(240,180,41,0.3)] bg-[#101218]">
                  <s.icon className="h-5 w-5 text-[#f0b429]" strokeWidth={1.8} />
                </div>
                <span className="font-mono text-4xl font-black text-[rgba(240,180,41,0.16)]">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight text-[#eceae2]">{s.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#a7acb8]">{s.body}</p>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mono-label mt-10 text-center text-[10px] text-[#5d616d]"
        >
          Automated trading · Made simple
        </motion.p>
      </div>
    </section>
  );
}
