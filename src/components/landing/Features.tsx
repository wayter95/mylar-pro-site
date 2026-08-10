"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons, type IconName } from "@/lib/icons";

type PrimaryCard = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  icon: IconName;
  accent: string;
};

type CompactCard = {
  title: string;
  description: string;
  href: string;
  icon: IconName;
  accent: string;
};

const primaryCards: PrimaryCard[] = [
  {
    title: "CRM e negociações",
    description:
      "Funil de leads em kanban com estágios próprios, atribuição automática e escalação. Negociações de venda e locação com propostas, contraofertas, participantes e fluxo de comissão centralizado ou direto.",
    linkLabel: "Conhecer o CRM",
    href: "/features/crm",
    icon: "chart",
    accent: "#2facde",
  },
  {
    title: "Canais de atendimento",
    description:
      "Inbox único com WhatsApp e e-mail no mesmo histórico, em tempo real. Templates de mensagem, broadcast, chamados do inquilino e a régua de cobrança falando pelos mesmos canais.",
    linkLabel: "Ver atendimento",
    href: "/features/channels",
    icon: "message",
    accent: "#10a892",
  },
];

const compactCards: CompactCard[] = [
  {
    title: "Financeiro",
    description:
      "DRE, conciliação bancária por OFX, centros de custo e DIMOB.",
    href: "/features/financial",
    icon: "briefcase",
    accent: "#10b981",
  },
  {
    title: "Cobranças e repasses",
    description:
      "Boleto e PIX, reajuste por índice, acordos e demonstrativo ao proprietário.",
    href: "/features/billing",
    icon: "dollar",
    accent: "#2facde",
  },
  {
    title: "Assinatura de contratos",
    description:
      "Templates versionados e assinatura com validade jurídica (Lei 14.063).",
    href: "/features/digital-signature",
    icon: "fileSign",
    accent: "#f59e0b",
  },
  {
    title: "Mila e ferramentas de IA",
    description:
      "Copiloto do corretor, MyLar Score e edição de fotos com IA.",
    href: "/features/ai",
    icon: "sparkles",
    accent: "#7c3aed",
  },
];

export function Features() {
  return (
    <section
      id="funcionalidades"
      className="border-t border-slate-200 bg-[#FAFAFA] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 lg:gap-10">
          <div className="max-w-[620px]">
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
              A plataforma
            </span>
            <h2 className="mt-3.5 text-[27px] leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              Ferramentas separadas nunca vão se comportar como uma só.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 lg:text-[17px]">
              Aqui o imóvel, o cliente, o contrato e o lançamento financeiro são
              os mesmos em todos os módulos. Cadastrar em um é ter em todos, e o
              que muda em um chega no outro no mesmo instante.
            </p>
          </div>

          <Link
            href="/features"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:border-[#2facde] hover:text-[#2facde]"
          >
            Ver todos os recursos
            <Icons.arrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <div className="mt-11 grid gap-4 lg:grid-cols-2">
          {primaryCards.map((card, i) => {
            const CardIcon = Icons[card.icon];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.07 * i }}
              >
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-[20px] border border-slate-200 bg-white p-7 transition-all duration-300 hover:border-(--accent-border) hover:shadow-(--accent-shadow) focus-visible:border-(--accent-border) focus-visible:shadow-(--accent-shadow)"
                  style={
                    {
                      "--accent-border": `${card.accent}80`,
                      "--accent-shadow": `0 22px 44px -26px ${card.accent}8c`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="flex size-[42px] items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${card.accent}1f` }}
                  >
                    <CardIcon
                      aria-hidden
                      className="size-5"
                      style={{ color: card.accent }}
                    />
                  </span>

                  <h3 className="mt-[18px] text-xl leading-tight font-extrabold tracking-tight text-slate-900 lg:text-[21px]">
                    {card.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 lg:text-[14.5px]">
                    {card.description}
                  </p>

                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold transition-transform group-hover:translate-x-0.5"
                    style={{ color: card.accent }}
                  >
                    {card.linkLabel}
                    <Icons.arrowRight aria-hidden className="size-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {compactCards.map((card, i) => {
            const CardIcon = Icons[card.icon];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.05 * i }}
              >
                <Link
                  href={card.href}
                  className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white p-6 transition-colors duration-300 hover:border-(--accent-border) focus-visible:border-(--accent-border)"
                  style={
                    {
                      "--accent-border": `${card.accent}80`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="flex size-[38px] items-center justify-center rounded-[11px]"
                    style={{ backgroundColor: `${card.accent}1f` }}
                  >
                    <CardIcon
                      aria-hidden
                      className="size-[17px]"
                      style={{ color: card.accent }}
                    />
                  </span>

                  <h3 className="mt-[15px] text-[16.5px] leading-snug font-extrabold text-slate-900">
                    {card.title}
                  </h3>

                  <p className="mt-1.5 text-[13.5px] leading-[1.55] text-slate-500">
                    {card.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
