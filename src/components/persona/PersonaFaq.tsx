"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import type { PersonaFaq } from "@/lib/personas/types";

type Props = {
  faq: PersonaFaq[];
  personaLabel: string;
};

export function PersonaFaq({ faq, personaLabel }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Dúvidas de"
          highlight={personaLabel.toLowerCase()}
        />

        <ul className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faq.map((item, index) => {
            const open = openIndex === index;

            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900">{item.q}</span>
                  <span
                    className={`mt-0.5 shrink-0 text-slate-400 transition ${open ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{item.a}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
