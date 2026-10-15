"use client";

import { motion } from "framer-motion";
import {
  Lock,
  Cpu,
  Compass,
  Crosshair,
  Target,
  DollarSign,
  Scale,
  HandMetal,
  PowerOff,
  LayoutDashboard,
  KeyRound,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

interface Row {
  k: string;
  v: string;
  tone?: "gold" | "green" | "muted";
  locked?: boolean;
}

interface Module {
  icon: React.ElementType;
  name: string;
  note?: string;
  rows: Row[];
}

const MODULES: Module[] = [
  {
    icon: Cpu,
    name: "Signal Engine",
    note: "Volatility-adaptive, trend-following. Name, formula and parameters ship redacted — your edge stays yours.",
    rows: [
      { k: "Engine name", v: "CLASSIFIED", tone: "gold", locked: true },
      { k: "Formula & parameters", v: "REDACTED", tone: "gold", locked: true },
      { k: "Price source", v: "CLASSIFIED", tone: "gold", locked: true },
    ],
  },
  {
    icon: Compass,
    name: "Trend & Execution",
    rows: [
      { k: "Direction mode", v: "BUY & SELL · stop & reverse", tone: "green" },
      { k: "Entry timing", v: "BAR CLOSE · confirmed flips", tone: "green" },
      { k: "Spread filter", v: "MAX-SPREAD CONTROL · on entry", tone: "green" },
    ],
  },
  {
    icon: Crosshair,
    name: "Stop Loss — On The Line",
    rows: [
      { k: "Placement", v: "EXACTLY ON THE SIGNAL LINE", tone: "gold" },
      { k: "Sync accuracy", v: "1:1 · same price, same tick", tone: "green" },
      { k: "Update rate", v: "EVERY TICK · live bar", tone: "green" },
      { k: "Follows", v: "BOTH DIRECTIONS · mirrored", tone: "muted" },
      { k: "If broker rejects", v: "HOLD · retry exact price every tick", tone: "muted" },
    ],
  },
  {
    icon: Target,
    name: "Take Profit",
    rows: [
      { k: "Mode", v: "FIXED $ PROFIT · per trade", tone: "gold" },
      { k: "Target (default)", v: "$1,000", tone: "gold" },
      { k: "Auto lot-sizing", v: "ON · every trade banks the target", tone: "green" },
      { k: "Enforcer", v: "EVERY TICK · heals slippage & manual edits", tone: "muted" },
    ],
  },
  {
    icon: DollarSign,
    name: "$ Break-Even + $ Trailing",
    rows: [
      { k: "BE trigger", v: "FLOATING PROFIT ≥ $100", tone: "gold" },
      { k: "BE action", v: "SL → ENTRY PRICE · can't lose", tone: "green" },
      { k: "Trail distance", v: "$100 BEHIND PROFIT", tone: "gold" },
      { k: "Trail rate", v: "EVERY TICK · real time", tone: "muted" },
      { k: "Conflict rule", v: "TIGHTER WINS · line vs $ trail", tone: "muted" },
    ],
  },
  {
    icon: Scale,
    name: "Money Management",
    rows: [
      { k: "Lot sizing", v: "FIXED 0.10 LOTS · or risk-% mode", tone: "green" },
    ],
  },
  {
    icon: HandMetal,
    name: "Manual Trade Takeover",
    note: "Open a trade by hand and ST EA SB adopts it immediately — line SL, $ targets, break-even lock, the lot.",
    rows: [
      { k: "Adoption", v: "ON · instant, next tick", tone: "green" },
      { k: "Coverage", v: "EVERY RULE ABOVE APPLIES", tone: "muted" },
    ],
  },
  {
    icon: PowerOff,
    name: "Wallet Shutdown",
    rows: [
      { k: "Trigger", v: "BALANCE / EQUITY HITS TARGET", tone: "gold" },
      { k: "Target", v: "YOU SET IT · e.g. $10,000", tone: "green" },
      { k: "On trigger", v: "CLOSE ALL · lock · self-remove", tone: "muted" },
      { k: "Memory", v: "SURVIVES RESTARTS · owner-only reset", tone: "muted" },
    ],
  },
  {
    icon: LayoutDashboard,
    name: "On-Chart Visuals",
    rows: [
      { k: "Draws", v: "SIGNAL LINE · live SL/TP · entry markers", tone: "green" },
      { k: "Journal", v: "FULL SL-UPDATE LOGGING", tone: "muted" },
    ],
  },
  {
    icon: KeyRound,
    name: "Security",
    rows: [
      { k: "The only input", v: "ACTIVATION PASSWORD", tone: "gold" },
      { k: "All parameters", v: "COMPILED-IN · not editable", tone: "muted" },
      { k: "Wrong password", v: "EA REMOVES ITSELF · instantly", tone: "green" },
      { k: "Password storage", v: "OBFUSCATED · never visible", tone: "muted" },
    ],
  },
];

const toneClass: Record<string, string> = {
  gold: "text-[#f0b429]",
  green: "text-[#3dd68c]",
  muted: "text-[#a7acb8]",
};

export function ControlPanel() {
  return (
    <section
      id="control-panel"
      className="relative overflow-hidden border-y border-[rgba(236,234,226,0.08)] bg-[#0f1014] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          eyebrow="The control panel"
          title={
            <>
              Every setting. <span className="text-[#f0b429]">Explained.</span>
            </>
          }
          description="One password unlocks the EA. Zero settings can be changed. Here is exactly what runs under the hood — engine parameters redacted."
        />

        {/* panel frame */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="border border-[rgba(240,180,41,0.22)] bg-[#101218]"
        >
          {/* panel header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(240,180,41,0.22)] bg-[rgba(240,180,41,0.05)] px-5 py-4 sm:px-7">
            <p className="mono-label text-[10px] text-[#eceae2]">
              ST EA SB <span className="text-[#f0b429]">· Control Panel</span>
            </p>
            <p className="mono-label flex items-center gap-1.5 border border-[rgba(240,180,41,0.3)] bg-[#14161c] px-3 py-1.5 text-[9px] text-[#f0b429]">
              <Lock className="h-3 w-3" />
              Settings: Locked
            </p>
          </div>

          <div className="grid gap-px bg-[rgba(236,234,226,0.08)] md:grid-cols-2 xl:grid-cols-3">
            {MODULES.map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
                className="flex flex-col bg-[#14161c] p-5 sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[rgba(240,180,41,0.3)] bg-[#101218]">
                    <m.icon className="h-4 w-4 text-[#f0b429]" strokeWidth={1.9} />
                  </div>
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#eceae2]">
                    {m.name}
                  </h3>
                </div>

                <dl className="flex-1 space-y-2.5">
                  {m.rows.map((r) => (
                    <div
                      key={r.k}
                      className="flex items-start justify-between gap-3 border-b border-[rgba(236,234,226,0.06)] pb-2.5"
                    >
                      <dt className="mono-label mt-0.5 shrink-0 text-[8.5px] text-[#5d616d]">
                        {r.k}
                      </dt>
                      <dd
                        className={`flex items-center gap-1 text-right font-mono text-[10.5px] font-bold leading-snug tracking-[0.04em] ${toneClass[r.tone ?? "muted"]}`}
                      >
                        {r.locked && <Lock className="h-2.5 w-2.5 shrink-0" />}
                        {r.v}
                      </dd>
                    </div>
                  ))}
                </dl>

                {m.note ? (
                  <p className="mt-4 border-l-2 border-[rgba(240,180,41,0.4)] pl-3 text-[11.5px] leading-relaxed text-[#a7acb8]">
                    {m.note}
                  </p>
                ) : null}
              </motion.article>
            ))}

            {/* summary tile */}
            <div className="flex flex-col items-center justify-center bg-[rgba(240,180,41,0.06)] p-8 text-center">
              <p className="font-mono text-4xl font-black text-[#f0b429]">10</p>
              <p className="mono-label mt-1 text-[9px] text-[#a7acb8]">Modules</p>
              <p className="mt-5 font-mono text-4xl font-black text-[#f0b429]">30+</p>
              <p className="mono-label mt-1 text-[9px] text-[#a7acb8]">Locked parameters</p>
              <p className="mt-5 font-mono text-4xl font-black text-[#f0b429]">1</p>
              <p className="mono-label mt-1 text-[9px] text-[#a7acb8]">Password</p>
            </div>
          </div>

          <div className="border-t border-[rgba(240,180,41,0.22)] bg-[rgba(240,180,41,0.05)] px-5 py-3.5 sm:px-7">
            <p className="mono-label text-center text-[9px] text-[#f0b429]">
              The panel you can&apos;t touch — on purpose.
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-relaxed text-[#a7acb8]"
        >
          Every value above is <span className="text-[#eceae2]">compiled into the file itself</span>{" "}
          — it never appears in a settings window, so there is nothing to edit, tweak or break.
          The engine&apos;s identity stays redacted.
        </motion.p>
      </div>
    </section>
  );
}
