"use client";

import { motion } from "framer-motion";
import { Code2, Ban, EyeOff, RefreshCcw, Paperclip, KeyRound, Rocket, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";

const FORTRESS = [
  {
    icon: Code2,
    title: "All parameters compiled-in",
    body: "Settings don't live in a dialog — they live in the code. There is nothing to change.",
  },
  {
    icon: Ban,
    title: "Self-eject on wrong password",
    body: "The wrong password doesn't get a warning — the EA removes itself from the chart, instantly.",
  },
  {
    icon: EyeOff,
    title: "Obfuscated password storage",
    body: "The password never appears inside the file — stored encoded, invisible to prying eyes.",
  },
  {
    icon: RefreshCcw,
    title: "Shutdown that survives restarts",
    body: "When your wallet target is hit, the lock persists — re-enabling is owner-only, by design.",
  },
];

const DEPLOY_STEPS = [
  {
    icon: Paperclip,
    step: "01",
    title: "Attach",
    body: "Drop ST EA SB on any MetaTrader 5 chart — any broker, any symbol, any timeframe.",
  },
  {
    icon: KeyRound,
    step: "02",
    title: "Unlock",
    body: "Enter your activation password once. That's the only thing it will ever ask you.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Armed",
    body: "It trades, trails, locks profit — and stands down at your wallet target. Done.",
  },
];

export function Security() {
  return (
    <section
      id="security"
      className="relative overflow-hidden border-y border-[rgba(236,234,226,0.08)] bg-[#0f1014] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="08"
          eyebrow="Fortress settings"
          title={
            <>
              One password. <span className="text-[#f0b429]">Zero tampering.</span>
            </>
          }
          description="ST EA SB asks for one thing at startup: your activation password. Every parameter is compiled deep into the binary — no settings window to argue with, no 'just this once' lot-size change, no curious fingers on your risk rules."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FORTRESS.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group border border-[rgba(236,234,226,0.1)] bg-[#14161c] p-6 transition-colors hover:border-[rgba(240,180,41,0.35)]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-[rgba(240,180,41,0.3)] bg-[#101218]">
                <f.icon className="h-4.5 w-4.5 text-[#f0b429]" strokeWidth={1.9} />
              </div>
              <h3 className="text-[15px] font-bold leading-snug text-[#eceae2]">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#a7acb8]">{f.body}</p>
            </motion.article>
          ))}
        </div>

        {/* deployment steps */}
        <div className="mt-20 md:mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center text-2xl font-black tracking-tight text-[#eceae2] sm:text-3xl"
          >
            Live in <span className="text-[#f0b429]">three steps.</span>
          </motion.h3>

          <div className="relative grid gap-5 md:grid-cols-3">
            <span
              className="absolute left-[16%] right-[16%] top-[52px] hidden h-px bg-gradient-to-r from-[#f0b429]/10 via-[#f0b429]/40 to-[#f0b429]/10 md:block"
              aria-hidden="true"
            />
            {DEPLOY_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative border border-[rgba(236,234,226,0.1)] bg-[#14161c] p-7 text-center"
              >
                <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[rgba(240,180,41,0.35)] bg-[#101218]">
                  <s.icon className="h-6 w-6 text-[#f0b429]" strokeWidth={1.8} />
                </div>
                <p className="mono-label text-[9.5px] text-[#f0b429]">Step {s.step}</p>
                <h4 className="mt-2 text-xl font-bold text-[#eceae2]">{s.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-[#a7acb8]">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* compatibility strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border border-[rgba(236,234,226,0.1)] bg-[#101218] px-6 py-4"
        >
          <span className="mono-label flex items-center gap-2 text-[9.5px] text-[#a7acb8]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#f0b429]" />
            MetaTrader 5
          </span>
          <span className="mono-label text-[9.5px] text-[#5d616d]">Every broker</span>
          <span className="mono-label text-[9.5px] text-[#5d616d]">Every symbol</span>
          <span className="mono-label text-[9.5px] text-[#5d616d]">Any timeframe</span>
          <span className="mono-label text-[9.5px] text-[#5d616d]">Account-currency targets</span>
          <span className="mono-label text-[9.5px] text-[#3dd68c]">Turn it off anytime</span>
        </motion.div>
      </div>
    </section>
  );
}
