"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center justify-center gap-3"
      >
        <span className="h-px w-8 bg-[#b98a1e]/60" aria-hidden="true" />
        <p className="mono-label text-[11px] text-[#f0b429]">
          {index} — {eyebrow}
        </p>
        <span className="h-px w-8 bg-[#b98a1e]/60" aria-hidden="true" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-3xl font-black leading-[1.08] tracking-tight text-[#eceae2] sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-5 text-base leading-relaxed text-[#a7acb8] md:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
