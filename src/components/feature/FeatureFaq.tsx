"use client";

import { useState } from "react";
import type { FeatureFaq as FeatureFaqItem } from "@/lib/features/types";

type Props = {
  faq: FeatureFaqItem[];
  label: string;
};

export function FeatureFaq({ faq, label }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-slate-200 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Perguntas frequentes
          </span>
        </div>
        <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Dúvidas sobre {label.toLowerCase()}.
        </h2>

        <ul className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {faq.map((item, index) => {
            const open = openIndex === index;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900">{item.q}</span>
                  <span
                    className={`mt-0.5 shrink-0 text-slate-400 transition ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <p className="pb-5 text-[15px] leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
