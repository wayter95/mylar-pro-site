"use client";

import { Icons, type IconType } from "@/lib/icons";
import { AnimateInStagger, AnimateInItem } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

type Highlight = {
  label: string;
  description: string;
  icon: IconType;
};

const highlights: Highlight[] = [
  {
    label: "Sua carteira é só sua",
    description: "Cada organização em base isolada, sem cruzamento de dados",
    icon: Icons.shieldCheck,
  },
  {
    label: "Permissão por função",
    description: "O corretor vê a carteira dele; o gestor vê a operação inteira",
    icon: Icons.lock,
  },
  {
    label: "Dados hospedados no Brasil",
    description: "LGPD, registro de quem acessou o quê e contrato de tratamento",
    icon: Icons.globe,
  },
  {
    label: "Você leva seus dados embora",
    description: "Sem fidelidade e com exportação da base se decidir sair",
    icon: Icons.database,
  },
];

export function Trust() {
  return (
    <section className="relative overflow-hidden border-t border-[#2facde]/10 bg-slate-950 py-16 sm:py-20">
      {/* Subtle gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 h-[300px] w-[400px] rounded-full bg-[#2facde]/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-[200px] w-[300px] rounded-full bg-indigo-500/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="A carteira da sua imobiliária"
          highlight="continua sendo sua."
          description="Dados no Brasil, acesso controlado por função e nenhuma amarra contratual para sair levando a base."
          dark
        />

        <AnimateInStagger
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
            <AnimateInItem key={item.label}>
              <div className="group flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all hover:border-[#2facde]/20 hover:bg-white/[0.06]">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#2facde]/10 text-[#2facde] transition-all group-hover:bg-[#2facde]/20 group-hover:scale-110">
                  <Icon className="size-6" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="mt-1.5 text-sm text-slate-400">{item.description}</p>
                </div>
              </div>
            </AnimateInItem>
            );
          })}
        </AnimateInStagger>
      </div>
    </section>
  );
}
