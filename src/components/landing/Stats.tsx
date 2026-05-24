"use client";

import { Icons, type IconType } from "@/lib/icons";
import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

type Benefit = {
  title: string;
  description: string;
  icon: IconType;
};

const benefits: Benefit[] = [
  {
    title: "Menos burocracia",
    description: "Contratos assinados digitalmente, com validade jurídica e sem papel.",
    icon: Icons.fileCheck,
  },
  {
    title: "Cobranças organizadas",
    description: "Boleto e PIX integrados, repasse automático ao proprietário e controle total.",
    icon: Icons.dollar,
  },
  {
    title: "Tudo em um só lugar",
    description: "CRM, imóveis, contratos, cobranças e portal do cliente na mesma plataforma.",
    icon: Icons.grid,
  },
  {
    title: "Pensado para o Brasil",
    description: "Boleto, PIX, CNPJ, IGP-M, IPCA. Construído do zero para o mercado brasileiro.",
    icon: Icons.globe,
  },
];

export function Stats() {
  return (
    <section className="border-t border-slate-200 bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="mb-10 text-center sm:mb-16">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            O que você ganha com a plataforma
          </h2>
          <p className="mt-2 text-slate-600">
            Benefícios reais para o dia a dia da sua imobiliária
          </p>
        </AnimateIn>
        <AnimateInStagger className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4" stagger={0.1}>
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimateInItem key={i}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-center transition hover:border-[#37B6D6]/30 hover:bg-white hover:shadow-md">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#37B6D6] text-white">
                    <Icon className="size-7" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
              </AnimateInItem>
            );
          })}
        </AnimateInStagger>
      </div>
    </section>
  );
}
