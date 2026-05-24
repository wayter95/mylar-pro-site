"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrokerMobileMockup } from "@/components/persona/mockups";
import { GooglePlayLogo } from "@/components/ui/GooglePlayLogo";
import { BROKER_APP_URLS } from "@/lib/features";
import { Icons, type IconType } from "@/lib/icons";
import { AnimateInStagger, AnimateInItem } from "./AnimateIn";
import { SectionHeader } from "./SectionHeader";

const BROKER_APP_ACCENT = "#1FB3D6";

type Feature = {
  title: string;
  description: string;
  badge?: string;
  icon: IconType;
};

const features: Feature[] = [
  {
    title: "CRM com Kanban",
    description:
      "Pipeline visual de vendas e locações. Gerencie leads, agende visitas e acompanhe cada negociação do primeiro contato ao fechamento.",
    icon: Icons.chart,
  },
  {
    title: "Assinatura Eletrônica",
    description:
      "Assine contratos direto na plataforma com validação de identidade, código de confirmação e validade jurídica (Lei 14.063).",
    badge: "Diferencial",
    icon: Icons.fileSign,
  },
  {
    title: "Cobranças Integradas",
    description:
      "Boleto e PIX integrados com reajuste automático por IGP-M, IPCA ou índice fixo. Repasses e comissões por cobrança.",
    icon: Icons.wallet,
  },
  {
    title: "Portal de Imóveis",
    description:
      "Catálogo online com busca por mapa interativo. Cada imobiliária tem seu portal próprio, integrado ao CRM e captação de leads.",
    badge: "Diferencial",
    icon: Icons.mapPin,
  },
  {
    title: "Gestão Completa",
    description:
      "Cadastre imóveis, proprietários e inquilinos. Inclua corretores como parceiros, com comissões e acessos controlados.",
    icon: Icons.briefcase,
  },
  {
    title: "Portal do Cliente",
    description:
      "Inquilino e proprietário com acesso próprio para faturas, contratos, chamados e manutenção. Menos WhatsApp, mais autonomia.",
    badge: "Diferencial",
    icon: Icons.userCheck,
  },
];

export function Features() {
  return (
    <section
      id="funcionalidades"
      className="relative border-t border-slate-100 bg-gradient-to-b from-slate-50/80 to-white py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Funcionalidades"
          title="Tudo que sua imobiliária precisa"
          highlight="em um só lugar."
          description="Tecnologia moderna, diferenciais competitivos e zero dependência de sistemas legados ou integrações frágeis."
        />

        <AnimateInStagger
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          stagger={0.08}
        >
          {features.map((feature, i) => {
            const FeatureIcon = feature.icon;
            return (
            <AnimateInItem key={i} className="flex">
              <div className="group relative flex h-full w-full flex-col">
                <motion.div
                  className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-[border-color] duration-300 hover:border-[#2facde]/40"
                  whileHover={{
                    y: -6,
                    boxShadow:
                      "0 20px 40px -12px rgba(47, 172, 222, 0.15), 0 0 0 1px rgba(47, 172, 222, 0.1)",
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {/* Shine overlay */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#2facde]/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {feature.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold tracking-wider text-amber-700 uppercase">
                      {feature.badge}
                    </span>
                  )}

                  <div className="mb-5 flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#2facde]/10 text-[#2facde] transition-all duration-300 group-hover:bg-[#2facde] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#2facde]/25">
                    <FeatureIcon className="size-6" strokeWidth={1.8} />
                  </div>

                  <h3 className="shrink-0 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 min-h-0 flex-1 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </motion.div>
              </div>
            </AnimateInItem>
            );
          })}
        </AnimateInStagger>

        {/* App do Corretor — card full-width destacado */}
        <BrokerAppSpotlight />
      </div>
    </section>
  );
}

function BrokerAppSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mt-16 overflow-hidden rounded-3xl border border-slate-900/95 bg-slate-950 lg:mt-20"
    >
      {/* Background subtle accent */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute -top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ backgroundColor: `${BROKER_APP_ACCENT}18` }}
        />
        <div
          className="absolute -bottom-1/3 -left-1/4 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${BROKER_APP_ACCENT}10` }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:p-14">
        {/* Text */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-white/20" />
            <span
              className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: BROKER_APP_ACCENT }}
            >
              Recurso · App nativo iOS & Android
            </span>
          </div>

          <h3 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
            O escritório do corretor{" "}
            <span className="text-slate-400">no bolso, em campo.</span>
          </h3>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 lg:text-lg">
            Carteira completa, WhatsApp, agenda, pipeline e captação de imóvel
            pelo celular — funcionando offline em visitas. Toda equipe sincroniza
            em tempo real com o painel web.
          </p>

          <ul className="mt-7 space-y-2.5">
            {[
              "Funciona offline · sincroniza ao voltar online",
              "App nativo iOS e Android, sem custo por agente",
              "Notificação push de novos leads e propostas",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-slate-300"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: BROKER_APP_ACCENT }}
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/features/broker-app"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              style={{
                backgroundColor: BROKER_APP_ACCENT,
                boxShadow: `0 14px 24px -14px ${BROKER_APP_ACCENT}aa`,
              }}
            >
              Conhecer o app
              <Icons.arrowRight className="size-4" />
            </Link>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <a
                href={BROKER_APP_URLS.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                <Icons.apple className="size-4" />
                App Store
              </a>
              <a
                href={BROKER_APP_URLS.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                <GooglePlayLogo className="size-4" />
                Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Mockup */}
        <div className="relative">
          <BrokerMobileMockup accent={BROKER_APP_ACCENT} />
        </div>
      </div>
    </motion.div>
  );
}
