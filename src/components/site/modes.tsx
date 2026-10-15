"use client";

import { motion } from "framer-motion";
import { Bot, MousePointerClick, Layers } from "lucide-react";
import { SectionHeading } from "./section-heading";

const MODES = [
  {
    icon: Bot,
    mode: "Mode A",
    name: "Full Auto",
    body: "It trades the trend flips itself — stop & reverse — with the SL on the line from the first tick. You watch. It works.",
    points: ["Automatic entries & exits", "Stop & reverse on flips", "Hands-free operation"],
  },
  {
    icon: MousePointerClick,
    mode: "Mode B",
    name: "Manual + Bodyguard",
    body: "You click, it adopts. Your hand-opened trade instantly gets the line SL, $ targets and break-even lock.",
    points: ["You choose the entries", "Instant adoption, next tick", "Full protection suite"],
    featured: true,
  },
  {
    icon: Layers,
    mode: "Mode C",
    name: "Hybrid",
    body: "Both at once. One engine, one chart — every position protected, however it was opened.",
    points: ["Auto + manual together", "One engine, one chart", "Every position guarded"],
  },
];

export function Modes() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          eyebrow="Run it your way"
          title={
            <>
              Three ways to <span className="text-[#f0b429]">deploy.</span>
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-3">
          {MODES.map((m, i) => (
            <motion.article
              key={m.mode}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col border p-7 ${
                m.featured
                  ? "border-[#f0b429] bg-[#15130c] shadow-[0_0_40px_rgba(240,180,41,0.12)]"
                  : "border-[rgba(236,234,226,0.1)] bg-[#14161c]"
              }`}
            >
              {m.featured && (
                <span className="mono-label absolute -top-2.5 left-6 bg-[#f0b429] px-2.5 py-1 text-[8px] font-bold text-[#0d0e11]">
                  Most popular
                </span>
              )}
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center border border-[rgba(240,180,41,0.3)] bg-[#101218]">
                  <m.icon className="h-5 w-5 text-[#f0b429]" strokeWidth={1.8} />
                </div>
                <span className="mono-label text-[9.5px] text-[#5d616d]">{m.mode}</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-[#eceae2]">{m.name}</h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#a7acb8]">{m.body}</p>
              <ul className="mt-5 space-y-2.5 border-t border-[rgba(236,234,226,0.08)] pt-5">
                {m.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 text-[13px] text-[#eceae2]">
                    <span className="h-1 w-1 rotate-45 bg-[#f0b429]" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
