"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 1000, prefix: "$", suffix: "", label: "Take-profit per trade", sub: "Auto-sized per lot" },
  { value: 100, prefix: "$", suffix: "", label: "Break-even trigger", sub: "Profit lock engages" },
  { value: 100, prefix: "$", suffix: "", label: "Trailing distance", sub: "Held behind profit" },
  { value: 1, prefix: "", suffix: ":1", label: "SL ↔ signal-line sync", sub: "Same price, same tick" },
];

function Counter({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1300;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  return (
    <section className="relative border-b border-[rgba(236,234,226,0.08)] bg-[#101218] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-[rgba(240,180,41,0.18)] bg-[rgba(240,180,41,0.18)] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#101218] px-6 py-7 text-center"
            >
              <p className="font-mono text-3xl font-black text-[#f0b429] md:text-4xl">
                <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mono-label mt-2.5 text-[9.5px] text-[#eceae2]">{s.label}</p>
              <p className="mono-label mt-1 text-[8.5px] text-[#5d616d]">{s.sub}</p>
            </motion.div>
          ))}
        </div>
        <p className="mono-label mt-4 text-center text-[9px] leading-relaxed text-[#5d616d]">
          Defaults shown — all values are compiled in &amp; password-locked. The owner&apos;s
          numbers, set in stone.
        </p>
      </div>
    </section>
  );
}
