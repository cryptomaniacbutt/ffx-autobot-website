"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Zap, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const HIGHLIGHTS = [
  { icon: Zap, text: "Fully automatic entries & exits — 24/5" },
  { icon: ShieldCheck, text: "A stop loss on every trade from second one" },
  { icon: Lock, text: "Break-even lock + $100 live trailing" },
  { icon: CheckCircle2, text: "Auto shut-off at your wallet goal" },
];

export function Cta() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, plan: "ST EA SB — Access Request", message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setDone(true);
      toast({
        title: "Request received",
        description: "Your request for ST EA SB has been logged. We'll be in touch.",
      });
    } catch (err) {
      toast({
        title: "Couldn't send request",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="get-access" className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-gold" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_360px_at_50%_110%,rgba(240,180,41,0.12),rgba(240,180,41,0)_70%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="border border-[rgba(240,180,41,0.28)] bg-[#101218]/95 shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
          <div className="grid lg:grid-cols-2">
            {/* Left: pitch */}
            <div className="border-b border-[rgba(236,234,226,0.08)] p-8 sm:p-10 lg:border-b-0 lg:border-r">
              <p className="mono-label text-[10px] text-[#f0b429]">
                FFX Autobot Trading · ST EA SB · MT5
              </p>
              <h2 className="mt-4 text-3xl font-black leading-[1.05] tracking-tight text-[#eceae2] sm:text-4xl">
                Put your trading on{" "}
                <span className="text-[#f0b429]">autopilot.</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#a7acb8]">
                ST EA SB — powered by the Hidden Strategy by SB. Ask for ST EA SB today and
                put the sealed engine to work on your charts.
              </p>

              <ul className="mt-7 space-y-3.5">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.li
                    key={h.text}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-3 text-[14px] text-[#eceae2]"
                  >
                    <h.icon className="h-4.5 w-4.5 shrink-0 text-[#f0b429]" strokeWidth={1.9} />
                    {h.text}
                  </motion.li>
                ))}
              </ul>

              <p className="mono-label mt-8 border-t border-[rgba(236,234,226,0.08)] pt-5 text-[9px] leading-relaxed text-[#5d616d]">
                Every broker · Every symbol · Full control — turn it off anytime
              </p>
            </div>

            {/* Right: form */}
            <div className="p-8 sm:p-10">
              {done ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(61,214,140,0.4)] bg-[rgba(61,214,140,0.08)]">
                    <CheckCircle2 className="h-8 w-8 text-[#3dd68c]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#eceae2]">Request received.</h3>
                  <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-[#a7acb8]">
                    Your request for ST EA SB has been logged. Keep an eye on your inbox —
                    we&apos;ll reach out with the next steps.
                  </p>
                  <p className="mono-label mt-6 text-[9px] text-[#5d616d]">
                    Ref: SB-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 9000) + 1000)}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-[#eceae2]">Ask for ST EA SB today</h3>
                    <p className="mt-1 text-[13px] text-[#a7acb8]">
                      Leave your details — we&apos;ll get back to you.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lead-name" className="mono-label block text-[9.5px] text-[#a7acb8]">
                      Your name
                    </label>
                    <Input
                      id="lead-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Carter"
                      required
                      minLength={2}
                      maxLength={120}
                      className="h-11 border-[rgba(236,234,226,0.14)] bg-[#14161c] text-[14px] text-[#eceae2] placeholder:text-[#5d616d] focus-visible:ring-[#f0b429]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lead-email" className="mono-label block text-[9.5px] text-[#a7acb8]">
                      Email address
                    </label>
                    <Input
                      id="lead-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      maxLength={190}
                      className="h-11 border-[rgba(236,234,226,0.14)] bg-[#14161c] text-[14px] text-[#eceae2] placeholder:text-[#5d616d] focus-visible:ring-[#f0b429]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lead-message" className="mono-label block text-[9.5px] text-[#a7acb8]">
                      Message <span className="text-[#5d616d]">(optional)</span>
                    </label>
                    <Textarea
                      id="lead-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your account, your goals, or any questions…"
                      rows={3}
                      maxLength={2000}
                      className="min-h-[88px] resize-none border-[rgba(236,234,226,0.14)] bg-[#14161c] text-[14px] text-[#eceae2] placeholder:text-[#5d616d] focus-visible:ring-[#f0b429]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="group h-12 w-full bg-[#f0b429] font-mono text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#0d0e11] hover:bg-[#ffc94a] hover:shadow-[0_0_36px_rgba(240,180,41,0.35)]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Unlock yours today
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>

                  <p className="mono-label text-center text-[8.5px] leading-relaxed text-[#5d616d]">
                    No spam. Your details are used only to answer your request.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
