"use client";

import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

const metrics = [
  { value: "50+", label: "Clientes ativos" },
  { value: "200+", label: "Imóveis cadastrados" },
  { value: "80+", label: "Negociações encerradas" },
  { value: "150+", label: "Contratos assinados na plataforma" },
];

export function Trust() {
  return (
    <section className="border-t border-[#37B6D6]/20 bg-[#0c4a6e] py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Números reais
          </h2>
          <p className="mt-2 text-slate-300">
            O que quem já usa conquistou na plataforma
          </p>
        </AnimateIn>
        <AnimateInStagger
          className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4"
          stagger={0.1}
        >
          {metrics.map((m, i) => (
            <AnimateInItem key={i}>
              <div className="text-center">
                <p className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  {m.value}
                </p>
                <p className="mt-1 text-xs text-slate-300 sm:text-sm">{m.label}</p>
              </div>
            </AnimateInItem>
          ))}
        </AnimateInStagger>
        <AnimateIn className="mt-10 text-center">
          <p className="text-sm text-slate-400">
            E você pode ser o próximo a simplificar sua operação
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
