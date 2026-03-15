"use client";

import { AnimateIn } from "./AnimateIn";

const WAITLIST_URL = "https://lista.mylarpro.com.br";

export function CTA() {
  return (
    <section className="border-t border-slate-200 bg-[#37B6D6] py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimateIn>
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
          Pronto para modernizar sua operação imobiliária?
        </h2>
        <p className="mt-4 text-lg text-white/90">
          Estamos nos preparando para o lançamento. Solicite acesso e seja um dos
          primeiros a conhecer a plataforma.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-white px-8 py-4 text-center font-semibold text-[#37B6D6] shadow-xl transition hover:bg-white/90 sm:w-auto"
          >
            Solicitar acesso
          </a>
          <a
            href="/contato"
            className="w-full rounded-xl border-2 border-white/50 px-8 py-4 text-center font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
          >
            Falar com especialista
          </a>
        </div>
        </AnimateIn>
      </div>
    </section>
  );
}
