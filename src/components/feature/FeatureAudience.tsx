"use client";

import { motion } from "framer-motion";
import type { FeatureAudience as FeatureAudienceItem } from "@/lib/features/types";

type Props = {
  audience: FeatureAudienceItem[];
  headline: { title: string; subtitle: string };
  accent: string;
};

export function FeatureAudience({ audience, headline, accent }: Props) {
  return (
    <section className="border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-slate-300" />
            <span
              className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: accent }}
            >
              Para quem é
            </span>
          </div>
          <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            {headline.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 lg:text-lg">
            {headline.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {audience.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
              className="flex flex-col bg-white p-6 lg:p-7"
            >
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-extrabold text-slate-900 lg:text-[1.05rem]">
                {item.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
