"use client";

import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

const personas = [
  {
    title: "Imobiliárias",
    description:
      "Gestão completa da sua carteira de vendas e locações com CRM, contratos, cobranças e catálogo online — tudo integrado.",
    cta: "Ver funcionalidades",
    href: "/#funcionalidades",
  },
  {
    title: "Incorporadoras",
    description:
      "Controle de empreendimentos, vendas por unidade e CRM para equipes de lançamento — em uma plataforma pensada para quem constrói.",
    cta: "Conhecer a plataforma",
    href: "https://management.mylarpro.com.br/register",
  },
  {
    title: "Corretores Autônomos",
    description:
      "CRM pessoal com pipeline visual, assinatura de contratos e portal de imóveis para captar clientes — sem mensalidade alta.",
    cta: "Criar conta grátis",
    href: "https://management.mylarpro.com.br/register",
  },
];

export function Personas() {
  return (
    <section id="personas" className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Para quem é o Mylar Pro?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Uma plataforma para cada perfil do mercado imobiliário
          </p>
        </AnimateIn>
        <AnimateInStagger
          className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-3 lg:mt-16"
          stagger={0.15}
        >
          {personas.map((p, i) => (
            <AnimateInItem key={i}>
              <a
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#37B6D6] hover:shadow-lg sm:p-8"
              >
                <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                <p className="mt-4 text-slate-600">{p.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-medium text-[#37B6D6]">
                  {p.cta}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </a>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
