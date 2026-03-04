"use client";

import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "179",
      description: "Para pequenas imobiliárias e profissionais autônomos",
      features: ["Até 50 imóveis", "Até 3 usuários", "Todos os módulos básicos"],
      cta: "Começar agora",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "449",
      description: "Para imobiliárias em crescimento",
      features: [
        "Até 200 imóveis",
        "Até 10 usuários",
        "Suporte prioritário",
        "Integração completa",
      ],
      cta: "Mais popular",
      highlighted: true,
    },
    {
      name: "Business",
      price: "899",
      description: "Para redes de imobiliárias",
      features: [
        "Até 600 imóveis",
        "Até 30 usuários",
        "Integrações avançadas",
        "Onboarding dedicado",
      ],
      cta: "Falar com vendas",
      highlighted: false,
    },
    {
      name: "Enterprise",
      price: "2.200+",
      description: "Para construtoras e incorporadoras",
      features: [
        "Imóveis ilimitados",
        "Usuários ilimitados",
        "SLA garantido",
        "Suporte 24/7",
      ],
      cta: "Contato comercial",
      highlighted: false,
    },
  ];

  return (
    <section id="planos" className="border-t border-slate-200 bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Planos para cada estágio do seu negócio
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Escolha o plano ideal. Sem taxa de adesão. Cancele quando quiser.
          </p>
        </AnimateIn>
        <AnimateInStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {plans.map((plan, i) => (
            <AnimateInItem key={i}>
            <div
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-[#37B6D6] bg-white shadow-xl ring-2 ring-[#37B6D6]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#37B6D6] px-4 py-1 text-sm font-semibold text-white">
                  Mais popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold text-slate-900">
                  R$ {plan.price}
                </span>
                <span className="ml-1 text-slate-500">/mês</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                    <svg
                      className="h-5 w-5 shrink-0 text-[#37B6D6]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.highlighted ? "https://management.mylarpro.com.br" : "#contato"}
                target={plan.highlighted ? "_blank" : undefined}
                rel={plan.highlighted ? "noopener noreferrer" : undefined}
                className={`mt-6 block w-full rounded-xl py-3 text-center font-semibold transition ${
                  plan.highlighted
                    ? "bg-[#37B6D6] text-white hover:bg-[#2ea5c4]"
                    : "border-2 border-slate-300 text-slate-700 hover:border-[#37B6D6] hover:bg-[#37B6D6]/5 hover:text-[#37B6D6]"
                }`}
              >
                {plan.cta}
              </a>
            </div>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
        <p className="mt-8 text-center text-sm text-slate-500">
          Receita adicional: R$ 1,50 por cobrança emitida no módulo financeiro
        </p>
      </div>
    </section>
  );
}
