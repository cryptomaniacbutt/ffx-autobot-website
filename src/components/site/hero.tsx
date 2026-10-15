"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  TrendingUp,
  ShieldCheck,
  Lock,
  Activity,
  Crosshair,
} from "lucide-react";

/* ---------------- deterministic PRNG (no hydration mismatch) ---------------- */
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

function buildCandles(count: number, seed = 42): Candle[] {
  const rnd = mulberry32(seed);
  const candles: Candle[] = [];
  let price = 100;
  for (let i = 0; i < count; i++) {
    const drift = i < 8 ? -0.35 : 0.55 + Math.sin(i / 3) * 0.25; // dip then trend up
    const o = price;
    const c = price + drift + (rnd() - 0.5) * 1.6;
    const h = Math.max(o, c) + rnd() * 0.9;
    const l = Math.min(o, c) - rnd() * 0.9;
    candles.push({ o, h, l, c });
    price = c;
  }
  return candles;
}

function signalLine(candles: Candle[], lookback = 5): number[] {
  return candles.map((_, i) => {
    const from = Math.max(0, i - lookback + 1);
    const slice = candles.slice(from, i + 1);
    return slice.reduce((s, c) => s + c.c, 0) / slice.length;
  });
}

const HERO_STATS = [
  { value: "24/5", label: "Non-stop market watching" },
  { value: "100%", label: "Automatic entries & exits" },
  { value: "0", label: "Unprotected trades" },
  { value: "1", label: "Goal — auto shut-off" },
];

const EVENT_LOG = [
  "TREND FLIP — ENTRY ARMED",
  "SL PARKED ON SIGNAL LINE — 1:1 SYNC",
  "LINE STEPS UP — SL RIDES IT, EVERY TICK",
  "FLOATING P/L ≥ $100 — BREAK-EVEN LOCKED",
  "TRAILING $100 BEHIND PROFIT — REAL TIME",
  "TARGET BANKED — +$1,000",
];

/* ---------------------------------- Hero ---------------------------------- */

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const baseCandles = useMemo(() => buildCandles(46), []);
  const [tick, setTick] = useState(0); // how many extra candles revealed
  const [logIndex, setLogIndex] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => {
      setTick((t) => (t + 1) % 21);
      setLogIndex((i) => (i + 1) % EVENT_LOG.length);
      setProfit((p) => (p >= 1000 ? 0 : Math.min(1000, p + 175)));
    }, 2600);
    return () => clearInterval(iv);
  }, [inView]);

  const revealed = baseCandles.slice(0, 26 + tick);
  const line = signalLine(revealed);
  const lastClose = revealed[revealed.length - 1]?.c ?? 100;
  const entryPrice = revealed[10]?.c ?? 100;

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-[72px]">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-grid-gold" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 gold-radial" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d0e11] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pb-24">
        {/* ------------------------------ Left column ------------------------------ */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 border border-[rgba(240,180,41,0.25)] bg-[#14161c]/80 px-3 py-1.5 lg:justify-start"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#3dd68c]" />
            <span className="mono-label text-[10px] text-[#a7acb8]">
              FFX Autobot Trading · Expert Advisor · MT5
            </span>
            <span className="hidden h-3 w-px bg-[rgba(236,234,226,0.15)] sm:block" />
            <span className="mono-label hidden text-[10px] text-[#f0b429] sm:block">
              V2.50 · Secure Build
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[2.6rem] font-black leading-[1.02] tracking-tight text-[#eceae2] sm:text-6xl lg:text-[4.4rem]"
          >
            It trades for you.
            <br />
            It <span className="text-[#f0b429]">protects</span> every trade.
            <br />
            It never sleeps.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#a7acb8] md:text-lg lg:mx-0"
          >
            <span className="font-semibold text-[#eceae2]">ST EA SB</span> is a professional
            trading robot for MetaTrader 5. Attach it to any chart and it does the hard work
            for you — finding trades, protecting them and locking in profit — while the
            strategy that powers it stays a sealed secret.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#get-access"
              className="group inline-flex w-full items-center justify-center gap-2 bg-[#f0b429] px-8 py-4 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-[#0d0e11] transition-all hover:bg-[#ffc94a] hover:shadow-[0_0_36px_rgba(240,180,41,0.35)] sm:w-auto"
            >
              Ask for ST EA SB today
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-2 border border-[rgba(236,234,226,0.16)] px-8 py-4 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-[#eceae2] transition-colors hover:border-[rgba(240,180,41,0.45)] hover:text-[#f0b429] sm:w-auto"
            >
              <PlayCircle className="h-4 w-4" />
              See how it works
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mono-label mt-5 text-[9.5px] leading-relaxed text-[#5d616d]"
          >
            Every broker · Every symbol · Full control — turn it off anytime
          </motion.p>

          {/* stats */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-[rgba(236,234,226,0.1)] bg-[rgba(236,234,226,0.1)] sm:grid-cols-4"
          >
            {HERO_STATS.map((s) => (
              <div key={s.value} className="bg-[#101218] px-4 py-5 text-center lg:text-left">
                <dt className="order-2 mt-1 block text-[10.5px] leading-snug text-[#a7acb8]">
                  {s.label}
                </dt>
                <dd className="order-1 font-mono text-2xl font-bold text-[#f0b429] md:text-3xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ------------------------------ Right: live chart ------------------------------ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="absolute -inset-3 bg-[radial-gradient(closest-side,rgba(240,180,41,0.14),transparent)] blur-xl" aria-hidden="true" />
          <div className="relative border border-[rgba(240,180,41,0.22)] bg-[#101218] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            {/* terminal header */}
            <div className="flex items-center justify-between border-b border-[rgba(236,234,226,0.08)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#e5484d]/70" />
                <span className="h-2 w-2 rounded-full bg-[#f0b429]/70" />
                <span className="h-2 w-2 rounded-full bg-[#3dd68c]/70" />
              </div>
              <p className="mono-label text-[9.5px] text-[#a7acb8]">
                ST EA SB · Live on your chart
              </p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#3dd68c]" />
                <span className="mono-label text-[9px] text-[#3dd68c]">Armed</span>
              </div>
            </div>

            {/* chart */}
            <div className="relative px-3 pt-4">
              <LiveChart
                candles={revealed}
                line={line}
                entryPrice={entryPrice}
                lastClose={lastClose}
              />
            </div>

            {/* readouts */}
            <div className="grid grid-cols-3 gap-px border-t border-[rgba(236,234,226,0.08)] bg-[rgba(236,234,226,0.08)]">
              <div className="bg-[#101218] px-4 py-3">
                <p className="mono-label text-[8.5px] text-[#5d616d]">Floating P/L</p>
                <p className="mt-1 font-mono text-lg font-bold text-[#3dd68c] tabular-nums">
                  +${profit.toLocaleString("en-US")}
                </p>
              </div>
              <div className="bg-[#101218] px-4 py-3">
                <p className="mono-label text-[8.5px] text-[#5d616d]">Stop Loss</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-sm font-bold text-[#f0b429]">
                  <Crosshair className="h-3.5 w-3.5" />
                  ON THE LINE · 1:1
                </p>
              </div>
              <div className="bg-[#101218] px-4 py-3">
                <p className="mono-label text-[8.5px] text-[#5d616d]">Protection</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-sm font-bold text-[#eceae2]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#3dd68c]" />
                  BE LOCKED
                </p>
              </div>
            </div>

            {/* event log */}
            <div className="flex items-center gap-3 border-t border-[rgba(236,234,226,0.08)] px-4 py-3">
              <Activity className="h-3.5 w-3.5 shrink-0 text-[#f0b429]" />
              <div className="min-h-[16px] flex-1 overflow-hidden">
                <motion.p
                  key={logIndex}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="font-mono text-[10.5px] tracking-[0.06em] text-[#a7acb8]"
                >
                  {EVENT_LOG[logIndex]}
                </motion.p>
              </div>
              <span className="mono-label shrink-0 text-[8.5px] text-[#5d616d]">tick {String(tick + 10).padStart(2, "0")}</span>
            </div>

            {/* sealed footer */}
            <div className="flex items-center justify-between border-t border-[rgba(240,180,41,0.22)] bg-[rgba(240,180,41,0.05)] px-4 py-2.5">
              <p className="mono-label flex items-center gap-1.5 text-[8.5px] text-[#f0b429]">
                <Lock className="h-3 w-3" />
                Engine: Hidden Strategy by SB [Sealed]
              </p>
              <TrendingUp className="h-3.5 w-3.5 text-[#3dd68c]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------- Live chart ------------------------------- */

function LiveChart({
  candles,
  line,
  entryPrice,
  lastClose,
}: {
  candles: Candle[];
  line: number[];
  entryPrice: number;
  lastClose: number;
}) {
  const W = 520;
  const H = 230;
  const padL = 8;
  const padR = 46;
  const padT = 10;
  const padB = 18;

  const allValues = candles.flatMap((c) => [c.h, c.l]).concat(line);
  const min = Math.min(...allValues) - 2;
  const max = Math.max(...allValues) + 2;
  const y = (v: number) => padT + ((max - v) / (max - min)) * (H - padT - padB);
  const cw = (W - padL - padR) / 30;

  const linePath = line
    .map((v, i) => `${i === 0 ? "M" : "L"}${(padL + i * cw + cw / 2).toFixed(1)},${y(v).toFixed(1)}`)
    .join(" ");

  const lastLine = line[line.length - 1] ?? 100;
  const up = lastClose >= entryPrice;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Live chart showing ST EA SB managing a trade — candles, gold signal line and stop loss riding the line"
    >
      {/* horizontal grid */}
      {[0, 1, 2, 3, 4].map((i) => {
        const gy = padT + (i / 4) * (H - padT - padB);
        return (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={gy} y2={gy} stroke="rgba(236,234,226,0.05)" strokeWidth="1" />
            <text x={W - padR + 6} y={gy + 3} fontSize="8" fill="#5d616d" fontFamily="var(--font-jetbrains-mono), monospace">
              {(max - (i / 4) * (max - min)).toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* candles */}
      {candles.map((c, i) => {
        const x = padL + i * cw + cw / 2;
        const bullish = c.c >= c.o;
        const color = bullish ? "#3dd68c" : "#e5484d";
        const bodyTop = y(Math.max(c.o, c.c));
        const bodyH = Math.max(1.5, Math.abs(y(c.o) - y(c.c)));
        return (
          <g key={i} opacity={i > 25 ? 0.85 : 1}>
            <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth="1" />
            <rect x={x - cw * 0.28} y={bodyTop} width={cw * 0.56} height={bodyH} fill={color} />
          </g>
        );
      })}

      {/* signal line (gold) */}
      <path d={linePath} fill="none" stroke="#f0b429" strokeWidth="2" strokeLinecap="round" />

      {/* SL marker — exactly on the line */}
      <g>
        <rect
          x={W - padR + 2}
          y={y(lastLine) - 8}
          width="42"
          height="16"
          fill="#f0b429"
        />
        <text
          x={W - padR + 23}
          y={y(lastLine) + 3.5}
          fontSize="8.5"
          fontWeight="700"
          fill="#0d0e11"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono), monospace"
        >
          SL
        </text>
        <line
          x1={padL}
          x2={W - padR + 2}
          y1={y(lastLine)}
          y2={y(lastLine)}
          stroke="#f0b429"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.55"
        />
      </g>

      {/* price tag */}
      <g>
        <rect x={W - padR + 2} y={y(lastClose) - 8} width="42" height="16" fill={up ? "#3dd68c" : "#e5484d"} />
        <text
          x={W - padR + 23}
          y={y(lastClose) + 3.5}
          fontSize="8.5"
          fontWeight="700"
          fill="#0d0e11"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono), monospace"
        >
          {lastClose.toFixed(1)}
        </text>
      </g>
    </svg>
  );
}
