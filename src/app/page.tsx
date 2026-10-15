import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Promises } from "@/components/site/promises";
import { Strategy } from "@/components/site/strategy";
import { StatsBand } from "@/components/site/stats-band";
import { Benefits } from "@/components/site/benefits";
import { HowItWorks } from "@/components/site/how-it-works";
import { Lifecycle } from "@/components/site/lifecycle";
import { ControlPanel } from "@/components/site/control-panel";
import { Modes } from "@/components/site/modes";
import { Security } from "@/components/site/security";
import { Faq } from "@/components/site/faq";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0e11] text-[#eceae2]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Promises />
        <Strategy />
        <StatsBand />
        <Benefits />
        <HowItWorks />
        <Lifecycle />
        <ControlPanel />
        <Modes />
        <Security />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
