"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Which platform and brokers does ST EA SB work with?",
    a: "ST EA SB is an Expert Advisor built for MetaTrader 5. It works with every MT5 broker, on every symbol and any timeframe. There are no special account requirements — drop it on a chart, enter your activation password, and it is armed.",
  },
  {
    q: "Do I need coding or trading experience?",
    a: "None at all. There is no code to write and no strategy to configure. The engine, the protection rules and the profit targets are all compiled in. Attach it, unlock it once with your password, and it manages everything from there.",
  },
  {
    q: "Can I change the settings?",
    a: "No — and that is by design. Every parameter is compiled deep into the EA itself, so it never appears in a settings window. There is nothing to edit, tweak or break. Your activation password is the only input it will ever ask for.",
  },
  {
    q: "How is every trade protected?",
    a: "Every position carries a stop loss from the very first second, parked exactly on the engine's signal line — same price, same tick. As the trend strengthens, the stop follows the line in real time. At $100 floating profit the stop locks to break-even, then trails $100 behind profit. A winner can never turn into a loser.",
  },
  {
    q: "What happens to trades I open manually?",
    a: "ST EA SB adopts them instantly — from the next tick. Your hand-opened trade receives the exact same treatment as the robot's own trades: line stop loss, dollar profit target and the break-even lock.",
  },
  {
    q: "What happens when my wallet goal is reached?",
    a: "You set a profit goal for your account — for example $10,000. The moment your balance or equity hits it, the EA closes everything, locks itself and stands down. The lock survives restarts and can only be reset by the owner.",
  },
  {
    q: "Can I stay in control?",
    a: "Absolutely. You keep full control of your account at all times — you can turn the EA off anytime. The compiled-in settings protect your risk rules from tampering, not you from your own account.",
  },
  {
    q: "Does ST EA SB guarantee profits?",
    a: "No. Trading foreign exchange and CFDs on margin carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results. ST EA SB is a trade-management tool and does not guarantee profits.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#b98a1e]/60" aria-hidden="true" />
            <p className="mono-label text-[11px] text-[#f0b429]">09 — Questions</p>
            <span className="h-px w-8 bg-[#b98a1e]/60" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#eceae2] sm:text-4xl">
            Everything you&apos;re <span className="text-[#f0b429]">wondering.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="border border-[rgba(236,234,226,0.1)] bg-[#14161c]">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className={i === FAQS.length - 1 ? "border-b-0" : "border-b border-[rgba(236,234,226,0.08)]"}
            >
              <AccordionTrigger className="px-5 py-5 text-left text-[15px] font-semibold text-[#eceae2] hover:no-underline hover:text-[#f0b429] sm:px-7 [&[data-state=open]]:text-[#f0b429]">
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-bold text-[#b98a1e]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 text-[14px] leading-relaxed text-[#a7acb8] sm:px-7 sm:pl-[60px]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
