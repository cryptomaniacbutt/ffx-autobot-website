"use client";

const ITEMS = [
  "LINE-EXACT STOP LOSS",
  "FIXED $ TAKE-PROFIT",
  "$100 BREAK-EVEN LOCK",
  "$100 LIVE TRAILING",
  "MANUAL-TRADE ADOPTION",
  "WALLET SHUTDOWN",
  "PASSWORD-SEALED SETTINGS",
  "24/5 NON-STOP WATCHING",
  "FOLLOWS THE TREND",
  "NO CODING · NO EXPERIENCE NEEDED",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-[rgba(240,180,41,0.18)] bg-[#101218] py-3.5">
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="mono-label px-6 text-[10.5px] text-[#a7acb8] whitespace-nowrap">
              {item}
            </span>
            <span className="h-1 w-1 rotate-45 bg-[#f0b429]/70" aria-hidden="true" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0d0e11] to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0d0e11] to-transparent" aria-hidden="true" />
    </div>
  );
}
