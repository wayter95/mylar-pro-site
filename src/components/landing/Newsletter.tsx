"use client";

import { Icons } from "@/lib/icons";
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
              <Icons.mail className="size-3" />
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
