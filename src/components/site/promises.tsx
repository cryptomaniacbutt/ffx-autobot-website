"use client";

import { motion } from "framer-motion";
import { Bot, ShieldCheck, TrendingUp } from "lucide-react";
import { SectionHeading } from "./section-heading";

const PROMISES = [
  {
    icon: Bot,
    title: "Trades",
    titleAccent: "for you",
    body: "No screens to stare at, no buttons to smash. It finds the entries, opens the trades and closes them — automatically, day and night.",
    tag: "Fully automated",
  },
  {
    icon: ShieldCheck,
    title: "Protects",
    titleAccent: "every trade",
    body: "Every position carries a stop loss from the very first second. The market can turn whenever it wants — your downside is always capped.",
    tag: "Zero unprotected trades",
  },
  {
    icon: TrendingUp,
    title: "Rides",
    titleAccent: "the trend",
    body: "When the trend moves your way, your stop loss follows the trend line — tick by tick, in real time — locking ground as it goes.",
    tag: "Real-time trailing",
  },
];

export function Promises() {
  return (
    <section id="promises" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="Why traders choose it"
          title={
            <>
              Three promises.
              <br />
              <span className="text-[#f0b429]">Kept every second.</span>
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-3">
          {PROMISES.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="group relative border border-[rgba(236,234,226,0.1)] bg-[#14161c] p-7 transition-colors hover:border-[rgba(240,180,41,0.35)]"
            >
              <div className="absolute right-0 top-0 h-16 w-16 bg-[radial-gradient(closest-side,rgba(240,180,41,0.1),transparent)]" aria-hidden="true" />
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center border border-[rgba(240,180,41,0.3)] bg-[#101218]">
                <p.icon className="h-5.5 w-5.5 text-[#f0b429]" strokeWidth={1.8} />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-[#eceae2]">
                {p.title} <span className="text-[#f0b429]">{p.titleAccent}</span>
              </h3>
              <p className="mt-3 min-h-[96px] text-[15px] leading-relaxed text-[#a7acb8]">
                {p.body}
              </p>
              <p className="mono-label mt-4 border-t border-[rgba(236,234,226,0.08)] pt-4 text-[9.5px] text-[#f0b429]">
                {p.tag}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
