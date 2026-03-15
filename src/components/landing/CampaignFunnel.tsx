"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AnimateIn } from "./AnimateIn";

export function CampaignFunnel() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-white py-12 sm:py-16 lg:py-24">
      {/* Elemento decorativo */}
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#37B6D6]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-[#37B6D6]/5 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Imagem à esquerda */}
          <AnimateIn className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40 ring-1 ring-slate-900/5">
                <Image
                  src="/images/FUNIL.png"
                  alt="Pipeline visual de vendas — Mylar Pro"
                  width={1200}
                  height={750}
                  className="w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </AnimateIn>

          {/* Texto à direita */}
          <AnimateIn delay={0.15} className="order-1 lg:order-2">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#37B6D6]/30 bg-[#37B6D6]/5 px-4 py-1.5 text-sm font-medium text-[#37B6D6]"
              >
                <span className="size-1.5 animate-pulse rounded-full bg-[#37B6D6]" />
                Integração via API
              </motion.span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Campanhas e empreendimentos integrados
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Gerencie campanhas de captação e vendas direto na plataforma.
                Integre empreendimentos e projetos via API — dados
                sincronizados, sem retrabalho e sem planilhas entre sistemas.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Gestão de campanhas em um único painel",
                  "Integração direta via API REST",
                  "Empreendimentos e unidades sincronizados em tempo real",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#37B6D6]/10">
                      <svg
                        className="size-3 text-[#37B6D6]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
