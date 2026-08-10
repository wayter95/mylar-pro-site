"use client";

import { motion } from "framer-motion";
import { Icons, type IconType } from "@/lib/icons";
import { AnimateInStagger, AnimateInItem } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: IconType;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Crie a conta",
    description:
      "Sem cartão de crédito e sem falar com vendedor. Você entra na plataforma com todas as funcionalidades liberadas.",
    icon: Icons.userCheck,
  },
  {
    number: "02",
    title: "Traga a sua carteira",
    description:
      "Imóveis, clientes e corretores entram por planilha, com mapeamento de colunas e prévia validada. Nossa equipe ajuda na migração do sistema antigo.",
    icon: Icons.database,
  },
  {
    number: "03",
    title: "Decida depois de usar",
    description:
      "Trinta dias operando com os seus contratos e a sua equipe. Só então você escolhe o plano — e cancela quando quiser, levando seus dados.",
    icon: Icons.sparkles,
  },
];

export function GettingStarted() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-slate-950 py-16 lg:py-24">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 left-1/3 h-[400px] w-[500px] rounded-full bg-[#2facde]/6 blur-[120px]" />
        <div className="absolute -bottom-1/4 right-1/4 h-[300px] w-[400px] rounded-full bg-indigo-500/4 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Como começar"
          title="Trinta dias para testar"
          highlight="com a sua operação real."
          description="Não é ambiente de demonstração com dados de exemplo: são os seus imóveis, os seus contratos e a sua equipe."
          dark
        />

        {/* Steps */}
        <AnimateInStagger
          className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8"
          stagger={0.12}
        >
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            return (
            <AnimateInItem key={step.number} className="flex">
              <motion.div
                className="group relative flex h-full w-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:border-[#2facde]/20 hover:bg-white/[0.06]"
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                {/* Step number */}
                <span className="mb-5 text-4xl font-extrabold tracking-tighter text-white/[0.06] transition-colors group-hover:text-[#2facde]/15">
                  {step.number}
                </span>

                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#2facde]/10 text-[#2facde] transition-all duration-300 group-hover:bg-[#2facde] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#2facde]/25">
                  <StepIcon className="size-7" strokeWidth={1.6} />
                </div>

                <h3 className="text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {step.description}
                </p>

                {/* Connector arrow (between cards on desktop) */}
                {i < steps.length - 1 && (
                  <div className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <Icons.chevronRight className="size-8 text-white/10" strokeWidth={2} />
                  </div>
                )}
              </motion.div>
            </AnimateInItem>
            );
          })}
        </AnimateInStagger>
      </div>
    </section>
  );
}
