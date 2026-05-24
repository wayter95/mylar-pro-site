"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { AnimateInStagger, AnimateInItem } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

const plans = [
  {
    name: "Starter",
    price: "179",
    description: "Para pequenas imobiliárias e profissionais autônomos",
    features: [
      "Até 50 imóveis",
      "Até 3 usuários",
      "Todos os módulos básicos",
      "Portal de imóveis",
    ],
    cta: "Começar agora",
    href: "https://app.mylarpro.com.br/register",
    external: true,
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
      "Assinatura eletrônica",
    ],
    cta: "Mais popular",
    href: "https://app.mylarpro.com.br/register",
    external: true,
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
      "API completa",
    ],
    cta: "Falar com vendas",
    href: "/contact",
    external: false,
  },
  {
    name: "Enterprise",
    price: "2.200+",
    description: "Para incorporadoras, construtoras e loteadoras",
    features: [
      "Imóveis ilimitados",
      "Usuários ilimitados",
      "SLA garantido",
      "Suporte 24/7",
      "Ambiente dedicado",
    ],
    cta: "Contato comercial",
    href: "/contact",
    external: false,
  },
];

export function Pricing() {
  return (
    <section
      id="planos"
      className="border-t border-slate-200 bg-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Planos"
          title="Para cada estágio"
          highlight="do seu negócio."
          description="Sem taxa de adesão. Cancele quando quiser. Comece pequeno e escale."
        />

        <AnimateInStagger
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
          stagger={0.1}
        >
          {plans.map((plan) => (
            <AnimateInItem key={plan.name} className="flex">
              <motion.div
                className={`relative flex h-full w-full flex-col rounded-2xl border p-6 ${
                  plan.highlighted
                    ? "border-[#2facde]/50 bg-gradient-to-b from-[#2facde]/5 to-white shadow-xl shadow-[#2facde]/10 ring-1 ring-[#2facde]/30"
                    : "border-slate-200 bg-white"
                }`}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25 },
                }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2facde] to-[#37d6c0] px-4 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow-lg shadow-[#2facde]/25">
                    Mais popular
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{plan.description}</p>

                <div className="mt-5 flex items-baseline">
                  <span className="text-[11px] font-medium text-slate-400">
                    R$
                  </span>
                  <span className="ml-1 text-4xl font-extrabold tracking-tight text-slate-900">
                    {plan.price}
                  </span>
                  <span className="ml-1.5 text-sm text-slate-400">/mês</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Icons.checkCircle className="size-4 shrink-0 text-[#2facde]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  target={plan.external ? "_blank" : undefined}
                  rel={plan.external ? "noopener noreferrer" : undefined}
                  className={`mt-6 block w-full rounded-xl py-3 text-center text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-[#2facde] text-white shadow-lg shadow-[#2facde]/25 hover:bg-[#2599bb]"
                      : "border border-slate-200 text-slate-700 hover:border-[#2facde]/40 hover:bg-[#2facde]/5 hover:text-[#2facde]"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
      </div>
    </section>
  );
}
