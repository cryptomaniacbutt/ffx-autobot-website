"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Crosshair,
  Target,
  Lock,
  HandMetal,
  PowerOff,
  LayoutDashboard,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

const BENEFITS = [
  {
    icon: Zap,
    title: "Fully automatic entries & exits",
    body: "It watches your market around the clock and trades the moment the hidden engine speaks. You never miss a move again.",
  },
  {
    icon: ShieldCheck,
    title: "A stop loss on every trade",
    body: "From the very first second of every position, protection is in place. You never hold an unprotected trade.",
  },
  {
    icon: Crosshair,
    title: "Stop loss follows the trend line",
    body: "As the trend strengthens, your stop moves with it — updated on every tick, in real time — never wider than the trend allows.",
  },
  {
    icon: Target,
    title: "Smart profit targets",
    body: "A fixed profit target is calculated and locked onto every trade — sized automatically to your lot — so winners get banked, not gambled.",
  },
  {
    icon: Lock,
    title: "Break-even protection",
    body: "When a trade runs into healthy profit, the stop can jump to break-even — from that moment, a winner can never turn into a loser.",
  },
  {
    icon: HandMetal,
    title: "Takes over your manual trades",
    body: "Opened a trade by hand? It gets adopted instantly and protected exactly like the robot's own trades.",
  },
  {
    icon: PowerOff,
    title: "Auto shut-off at your goal",
    body: "Set a profit goal for your account. The moment it's reached, everything is closed, the robot stands down — mission complete.",
  },
  {
    icon: LayoutDashboard,
    title: "Live dashboard on your chart",
    body: "Trend, trades, stops, wallet — the full picture shown right on the chart, at a glance. No menus, no digging.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="Benefits"
          title={
            <>
              Everything it does <span className="text-[#f0b429]">for you.</span>
            </>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <motion.article
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              className="group flex flex-col border border-[rgba(236,234,226,0.1)] bg-[#14161c] p-6 transition-all hover:-translate-y-1 hover:border-[rgba(240,180,41,0.35)] hover:bg-[#15171e]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-[rgba(240,180,41,0.3)] bg-[#101218] transition-colors group-hover:border-[#f0b429]">
                <b.icon className="h-4.5 w-4.5 text-[#f0b429]" strokeWidth={1.9} />
              </div>
              <h3 className="text-[15px] font-bold leading-snug text-[#eceae2]">{b.title}</h3>
              <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-[#a7acb8]">{b.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
