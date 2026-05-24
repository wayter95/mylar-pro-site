"use client";

import { motion } from "framer-motion";
import type { FeatureKeyPoint } from "@/lib/features/types";

type Props = {
  keyPoints: FeatureKeyPoint[];
  headline: { title: string; subtitle: string };
  accent: string;
};

export function FeatureKeyPoints({ keyPoints, headline, accent }: Props) {
  return (
    <section className="border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: accent }}
              >
                O que vem dentro
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              {headline.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            {headline.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {keyPoints.map((point, i) => (
            <motion.article
              key={point.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              className="border-l-2 pl-5"
              style={{ borderColor: `${accent}40` }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {point.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
