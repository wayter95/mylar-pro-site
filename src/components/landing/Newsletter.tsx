"use client";

import { AnimateIn } from "./AnimateIn";
import { NewsletterForm } from "./NewsletterForm";

export function Newsletter() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-32 top-0 h-[300px] w-[400px] rounded-full bg-[#2facde]/5 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[200px] w-[300px] rounded-full bg-[#2facde]/3 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2facde]/20 bg-[#2facde]/5 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#2facde] uppercase">
              <svg viewBox="0 0 16 16" fill="currentColor" className="size-3">
                <path d="M2.5 3A1.5 1.5 0 001 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0015 5.293V4.5A1.5 1.5 0 0013.5 3h-11z" />
                <path d="M15 6.954L8.978 9.86a2.25 2.25 0 01-1.956 0L1 6.954V11.5A1.5 1.5 0 002.5 13h11a1.5 1.5 0 001.5-1.5V6.954z" />
              </svg>
              Newsletter
            </span>
            <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              Fique por dentro das novidades
            </h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-600">
              Receba conteúdos exclusivos, dicas para sua imobiliária e
              novidades da plataforma direto no seu e-mail.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <NewsletterForm />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
