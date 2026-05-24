"use client";

import { Icons, type IconType } from "@/lib/icons";
import { AnimateInItem, AnimateInStagger } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

type Comparison = {
  pain: string;
  old: string;
  modern: string;
  modernDesc: string;
  icon: IconType;
};

const comparisons: Comparison[] = [
  {
    pain: "Instalação demorada",
    old: "Semanas de setup e treinamento",
    modern: "Setup em minutos",
    modernDesc: "Onboarding guiado. Sua equipe opera no mesmo dia.",
    icon: Icons.zap,
  },
  {
    pain: "Interface confusa",
    old: "Menus infinitos e sobrecarga visual",
    modern: "Navegação fluida",
    modernDesc: "Design limpo e intuitivo. Zero curva de aprendizado.",
    icon: Icons.dashboard,
  },
  {
    pain: "Dados espalhados",
    old: "5 sistemas, 5 logins, zero visão unificada",
    modern: "Inteligência centralizada",
    modernDesc: "Uma fonte de verdade para leads, imóveis, contratos e financeiro.",
    icon: Icons.database,
  },
];

type Highlight = {
  title: string;
  description: string;
  features: string[];
  icon: IconType;
};

const highlights: Highlight[] = [
  {
    title: "CRM & WhatsApp Nativo",
    description:
      "Pare de alternar entre abas. Enquanto seus concorrentes colam links do WhatsApp no CRM, sua equipe fecha negócios em uma plataforma onde tudo já está conectado.",
    features: ["Multiatendimento integrado", "Fluxo visual de vendas com dados"],
    icon: Icons.whatsapp,
  },
  {
    title: "Automação Financeira Real",
    description:
      "Administrar aluguéis não precisa ser pesadelo de conciliação. Cobrança, baixa e repasse automático que devolve seu tempo.",
    features: ["Conciliação bancária automática", "Repasse com demonstrativo PDF"],
    icon: Icons.wallet,
  },
];

export function AntiChaosSection() {
  return (
    <div className="relative overflow-hidden bg-slate-950">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[400px] w-[500px] rounded-full bg-[#2facde]/6 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[400px] rounded-full bg-indigo-500/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Comparison cards */}
      <section className="relative border-t border-white/5 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Elimine o caos"
            title="Pare de pagar 5 boletos"
            highlight="para ter 5 problemas."
            description="O MyLar Pro substitui custo e desordem por uma plataforma que funciona de verdade."
            dark
          />

          <AnimateInStagger
            className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-3"
            stagger={0.08}
          >
            {comparisons.map((item) => {
              const Icon = item.icon;
              return (
              <AnimateInItem key={item.pain} className="flex">
                <div className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-[#2facde]/20 hover:bg-white/[0.06]">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#2facde]/10 text-[#2facde] transition-all group-hover:bg-[#2facde]/20 group-hover:scale-110">
                    <Icon className="size-6" strokeWidth={1.6} />
                  </div>
                  <p className="text-sm font-medium text-slate-500 line-through decoration-slate-600">
                    {item.old}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {item.modern}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {item.modernDesc}
                  </p>
                </div>
              </AnimateInItem>
              );
            })}
          </AnimateInStagger>

          {/* Highlight cards */}
          <AnimateInStagger
            className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2"
            stagger={0.08}
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
              <AnimateInItem key={item.title} className="flex">
                <div className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-7 backdrop-blur-sm">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#2facde]/10 text-[#2facde]">
                    <Icon className="size-7" strokeWidth={1.6} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-slate-400">{item.description}</p>
                  <ul className="mt-4 space-y-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                        <Icons.checkCircle className="size-4 shrink-0 text-[#2facde]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInItem>
              );
            })}
          </AnimateInStagger>
        </div>
      </section>
    </div>
  );
}
