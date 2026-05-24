"use client";

import { Icons } from "@/lib/icons";
import { SectionHeader } from "./SectionHeader";
import { KanbanMockup } from "./KanbanMockup";
import { AnimateIn } from "./AnimateIn";

export function CampaignFunnel() {
  return (
    <section className="relative overflow-hidden border-t border-[#2facde]/8 bg-gradient-to-b from-[#e7f8fc]/60 via-[#e7f8fc]/30 to-white py-16 lg:py-24">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#2facde]/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-[#2facde]/6 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Kanban mockup */}
          <AnimateIn className="order-2 lg:order-1">
            <KanbanMockup />
          </AnimateIn>

          {/* Text */}
          <AnimateIn delay={0.15} className="order-1 lg:order-2">
            <SectionHeader
              badge="CRM Integrado"
              title="Pipeline visual que converte"
              highlight="leads em contratos."
              description="Gerencie campanhas de captação e vendas direto na plataforma. Dados sincronizados, sem retrabalho e sem planilhas entre sistemas."
              align="left"
            />

            <ul className="mt-8 space-y-4">
              {[
                { text: "Kanban customizável por equipe e tipo de operação", icon: "kanban" },
                { text: "Integração direta via API REST com portais e campanhas", icon: "api" },
                { text: "Histórico completo de interações por lead", icon: "history" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#2facde]/10">
                    <Icons.checkCircle className="size-3.5 text-[#2facde]" />
                  </span>
                  <span className="text-slate-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
