"use client";

import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

const testimonials = [
  {
    quote:
      "O Mylar Pro simplificou nossa gestão. O CRM com Kanban e a assinatura eletrônica fazem toda a diferença no dia a dia.",
    author: "Gestor de imobiliária",
  },
  {
    quote:
      "Por fim uma plataforma que entende incorporadoras. O suporte a múltiplas unidades por empreendimento é essencial para nós.",
    author: "Incorporadora",
  },
  {
    quote:
      "O módulo financeiro e o repasse automático eliminaram a dor de cabeça com cobranças. Tudo automatizado.",
    author: "Administradora de imóveis",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            O que dizem sobre o Mylar Pro
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Depoimentos de quem já transformou sua gestão
          </p>
        </AnimateIn>
        <AnimateInStagger className="mt-16 grid gap-8 md:grid-cols-3" stagger={0.15}>
          {testimonials.map((t, i) => (
            <AnimateInItem key={i}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <svg
                  className="h-10 w-10 text-[#37B6D6]/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="mt-4 text-slate-700">{t.quote}</p>
                <p className="mt-4 text-sm font-medium text-slate-500">
                  — {t.author}
                </p>
              </div>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
