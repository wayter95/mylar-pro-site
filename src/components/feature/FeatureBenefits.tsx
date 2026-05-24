"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";

type Props = {
  benefits: string[];
  headline: { title: string; subtitle: string };
  accent: string;
};

export function FeatureBenefits({ benefits, headline, accent }: Props) {
  return (
    <section className="border-t border-slate-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: accent }}
              >
                Por que escolher
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

        <ul className="mt-14 divide-y divide-slate-200 border-y border-slate-200 lg:mt-20">
          {benefits.map((benefit, i) => (
            <motion.li
              key={benefit}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="flex items-start gap-4 py-5 lg:items-center lg:py-6"
            >
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full text-white lg:mt-0"
                style={{ backgroundColor: accent }}
              >
                <Icons.check className="size-3" />
              </span>
              <p className="flex-1 text-base font-medium text-slate-800 lg:text-lg">
                {benefit}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
