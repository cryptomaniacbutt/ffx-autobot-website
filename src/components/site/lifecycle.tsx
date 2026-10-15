"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./section-heading";

/* deterministic candles for the journey chart */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Candle {
  o: number;
  h: number;
  l: number;
  c: number;
}

function buildCandles(): Candle[] {
  const rnd = mulberry32(7);
  const out: Candle[] = [];
  let price = 100;
  for (let i = 0; i < 26; i++) {
    const drift = i < 6 ? -0.2 : 0.62 + Math.sin(i / 2.2) * 0.22;
    const o = price;
    const c = price + drift + (rnd() - 0.5) * 1.3;
    out.push({ o, h: Math.max(o, c) + rnd() * 0.8, l: Math.min(o, c) - rnd() * 0.8, c });
    price = c;
  }
  return out;
}

const MARKER_STEPS = [7, 9, 13, 17, 21, 24];

const LIFECYCLE = [
  {
    title: "Trend flip — Entry",
    body: "The hidden engine detects the flip. Entry armed — it buys the up-trend, sells the down-trend, stop & reverse.",
  },
  {
    title: "SL parks on the line",
    body: "From the very first tick, the stop loss sits exactly on the signal line. Zero drift. Zero approximation. Zero lag.",
  },
  {
    title: "Line steps — SL rides it",
    body: "When the line steps, your SL steps. Same price, same tick — updated on every tick, on the live bar.",
  },
  {
    title: "+$100 — BE locked",
    body: "Floating profit reaches $100 and the stop jumps to your entry price. From that moment, a winner can never turn into a loser.",
  },
  {
    title: "Trails $100 behind",
    body: "The stop trails $100 behind profit — every tick, in real time. When line and $ trail disagree, the tighter rule wins.",
  },
  {
    title: "Target banked",
    body: "The fixed dollar profit target is hit — sized automatically to your lot. The winner is banked, not gambled. Next trade.",
  },
];

export function Lifecycle() {
  const candles = useMemo(() => buildCandles(), []);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const iv = setInterval(() => setActive((a) => (a + 1) % LIFECYCLE.length), 3800);
    return () => clearInterval(iv);
  }, [paused]);

  const W = 900;
  const H = 300;
  const padL = 14;
  const padR = 56;
  const padT = 22;
  const padB = 26;
  const cw = (W - padL - padR) / candles.length;

  const line = candles.map((_, i) => {
    const from = Math.max(0, i - 4);
    const slice = candles.slice(from, i + 1);
    return slice.reduce((s, c) => s + c.c, 0) / slice.length;
  });

  const allV = candles.flatMap((c) => [c.h, c.l]).concat(line);
  const min = Math.min(...allV) - 2;
  const max = Math.max(...allV) + 2;
  const y = (v: number) => padT + ((max - v) / (max - min)) * (H - padT - padB);
  const x = (i: number) => padL + i * cw + cw / 2;

  const linePath = line.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="A trade's life under ST EA SB"
          title={
            <>
              From flip to <span className="text-[#f0b429]">banked.</span>
            </>
          }
          description="Follow one trade from entry to banked profit — click any stage to see exactly what the engine does."
        />

        <div className="border border-[rgba(236,234,226,0.1)] bg-[#101218]">
          {/* chart */}
          <div className="relative px-2 pt-2 sm:px-4 sm:pt-4">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-auto w-full"
              role="img"
              aria-label="The six stages of a trade managed by ST EA SB"
            >
              {[0, 1, 2, 3, 4].map((i) => {
                const gy = padT + (i / 4) * (H - padT - padB);
                return (
                  <g key={i}>
                    <line x1={padL} x2={W - padR} y1={gy} y2={gy} stroke="rgba(236,234,226,0.05)" />
                    <text x={W - padR + 8} y={gy + 3} fontSize="9" fill="#5d616d" fontFamily="var(--font-jetbrains-mono), monospace">
                      {(max - (i / 4) * (max - min)).toFixed(0)}
                    </text>
                  </g>
                );
              })}

              {/* candles */}
              {candles.map((c, i) => {
                const bullish = c.c >= c.o;
                const color = bullish ? "#3dd68c" : "#e5484d";
                const faded = active > 0 && MARKER_STEPS[active] < i - 1;
                return (
                  <g key={i} opacity={faded ? 0.35 : 1} style={{ transition: "opacity 0.4s" }}>
                    <line x1={x(i)} x2={x(i)} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="1.4" />
                    <rect
                      x={x(i) - cw * 0.3}
                      y={y(Math.max(c.o, c.c))}
                      width={cw * 0.6}
                      height={Math.max(1.6, Math.abs(y(c.o) - y(c.c)))}
                      fill={color}
                    />
                  </g>
                );
              })}

              {/* signal line */}
              <path d={linePath} fill="none" stroke="#f0b429" strokeWidth="2.4" strokeLinecap="round" />

              {/* entry marker */}
              <g>
                <line
                  x1={x(MARKER_STEPS[0])}
                  x2={x(MARKER_STEPS[0])}
                  y1={padT}
                  y2={H - padB}
                  stroke="rgba(236,234,226,0.25)"
                  strokeDasharray="3 4"
                />
                <text x={x(MARKER_STEPS[0]) - 8} y={padT - 8} fontSize="9" fill="#a7acb8" textAnchor="end" fontFamily="var(--font-jetbrains-mono), monospace">
                  ENTRY
                </text>
              </g>

              {/* SL line at active stage */}
              {active >= 1 && (
                <g>
                  <line
                    x1={x(MARKER_STEPS[active])}
                    x2={W - padR + 4}
                    y1={y(line[MARKER_STEPS[active]])}
                    y2={y(line[MARKER_STEPS[active]])}
                    stroke="#f0b429"
                    strokeWidth="1.4"
                    strokeDasharray="5 4"
                    opacity="0.75"
                  />
                  <rect x={W - padR + 6} y={y(line[MARKER_STEPS[active]]) - 9} width={padR - 12} height={18} fill="#f0b429" />
                  <text x={W - padR / 2 - 1} y={y(line[MARKER_STEPS[active]]) + 4} fontSize="9.5" fontWeight="700" fill="#0d0e11" textAnchor="middle" fontFamily="var(--font-jetbrains-mono), monospace">
                    SL
                  </text>
                </g>
              )}

              {/* stage markers */}
              {MARKER_STEPS.map((idx, i) => {
                const isActive = i === active;
                const done = i < active;
                return (
                  <g
                    key={i}
                    onClick={() => {
                      setActive(i);
                      setPaused(true);
                    }}
                    style={{ cursor: "pointer" }}
                    role="button"
                    aria-label={`Stage ${i + 1}: ${LIFECYCLE[i].title}`}
                  >
                    <circle
                      cx={x(idx)}
                      cy={y(line[idx]) - 26}
                      r={isActive ? 13 : 10}
                      fill={isActive ? "#f0b429" : done ? "#3dd68c" : "#14161c"}
                      stroke={isActive ? "#f0b429" : done ? "#3dd68c" : "#5d616d"}
                      strokeWidth="2"
                      style={{ transition: "all 0.3s" }}
                    />
                    <text
                      x={x(idx)}
                      y={y(line[idx]) - 22.5}
                      fontSize="11"
                      fontWeight="700"
                      fill={isActive || done ? "#0d0e11" : "#a7acb8"}
                      textAnchor="middle"
                      fontFamily="var(--font-jetbrains-mono), monospace"
                      style={{ transition: "fill 0.3s" }}
                    >
                      {i + 1}
                    </text>
                    <line
                      x1={x(idx)}
                      x2={x(idx)}
                      y1={y(line[idx]) - 13}
                      y2={y(line[idx])}
                      stroke={isActive ? "#f0b429" : "rgba(236,234,226,0.2)"}
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* active stage detail */}
          <div className="flex min-h-[86px] items-center gap-4 border-t border-[rgba(236,234,226,0.08)] px-5 py-4 sm:px-7">
            <span className="font-mono text-3xl font-black text-[#f0b429] tabular-nums sm:text-4xl">
              0{active + 1}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="flex-1"
              >
                <p className="text-[15px] font-bold uppercase tracking-[0.06em] text-[#eceae2] sm:text-base">
                  {LIFECYCLE[active].title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#a7acb8]">
                  {LIFECYCLE[active].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* step buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {LIFECYCLE.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => {
                setActive(i);
                setPaused(true);
              }}
              onMouseEnter={() => setPaused(true)}
              className={`border px-3 py-3 text-left font-mono text-[10px] font-bold uppercase tracking-[0.08em] transition-all ${
                i === active
                  ? "border-[#f0b429] bg-[rgba(240,180,41,0.1)] text-[#f0b429]"
                  : i < active
                    ? "border-[rgba(61,214,140,0.3)] bg-[rgba(61,214,140,0.05)] text-[#3dd68c]"
                    : "border-[rgba(236,234,226,0.1)] bg-[#14161c] text-[#a7acb8] hover:border-[rgba(240,180,41,0.35)] hover:text-[#eceae2]"
              }`}
              aria-pressed={i === active}
            >
              <span className="mr-1.5 opacity-70">0{i + 1}</span>
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
