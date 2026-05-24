"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { AnimateIn } from "./AnimateIn";
import { FinancialMockup } from "./FinancialMockup";

const REGISTER_URL = "https://app.mylarpro.com.br/register";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.04] bg-slate-950 py-20 sm:py-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/2 left-1/4 h-[600px] w-[600px] rounded-full bg-[#2facde]/8 blur-[120px]" />
        <div className="absolute -bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Text */}
          <AnimateIn>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/15" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2facde]">
                30 dias grátis · Sem cartão
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Pronto para modernizar
              <br />
              <span className="bg-gradient-to-r from-[#2facde] to-[#37d6c0] bg-clip-text text-transparent">
                sua operação imobiliária?
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">
              <span className="font-semibold text-white">
                30 dias grátis com tudo liberado.
              </span>{" "}
              Plataforma all-in-one que unifica CRM, financeiro, contratos e
              portal do cliente — sem cartão e sem fidelidade.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full justify-center rounded-xl bg-[#2facde] px-8 py-4 text-base font-semibold text-white shadow-[0_14px_28px_-12px_rgba(47,172,222,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-12px_rgba(47,172,222,0.5)] sm:w-auto"
              >
                Começar 30 dias grátis
                <Icons.arrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/contact"
                className="inline-flex w-full justify-center rounded-xl border border-slate-600 bg-white/5 px-8 py-4 text-base font-semibold text-slate-300 backdrop-blur-sm transition hover:border-slate-500 hover:bg-white/10 sm:w-auto"
              >
                Falar com especialista
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-500">
              Sem cartão · Sem fidelidade · Migração de dados inclusa
            </p>
          </AnimateIn>

          {/* Financial mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block"
          >
            <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-[#2facde]/8 blur-3xl" />
            <FinancialMockup className="relative" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
