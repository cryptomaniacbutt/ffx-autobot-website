import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FFX Autobot Trading — ST EA SB | Automated Trading Assistant for MetaTrader 5",
  description:
    "FFX Autobot Trading presents ST EA SB — a professional Expert Advisor for MetaTrader 5 powered by the Hidden Strategy by SB. Fully automatic entries & exits, a stop loss on every trade from second one, line-exact trailing, break-even locks and auto shut-off at your wallet goal.",
  keywords: [
    "FFX Autobot Trading",
    "ST EA SB",
    "Expert Advisor",
    "MQL5",
    "MetaTrader 5",
    "automated trading",
    "forex robot",
    "trading bot",
    "Hidden Strategy by SB",
    "EA",
  ],
  authors: [{ name: "FFX Autobot Trading" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "FFX Autobot Trading — It trades for you. It protects every trade.",
    description:
      "Home of ST EA SB — professional Expert Advisor for MetaTrader 5. Fully automated, always protected, follows the trend, locks in profit.",
    siteName: "FFX Autobot Trading",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FFX Autobot Trading — ST EA SB Automated Trading Assistant",
    description:
      "Professional Expert Advisor for MetaTrader 5. Powered by the Hidden Strategy by SB.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
