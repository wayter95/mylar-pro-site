"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icons } from "@/lib/icons";
import { ModuleOrbit } from "./ModuleOrbit";

const REGISTER_URL = "https://app.mylarpro.com.br/register";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-28">
      {/* Background gradient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -top-1/4 right-0 h-[600px] w-[800px] rounded-full bg-[#2facde]/8 blur-[120px]" />
        <div className="absolute -bottom-1/4 left-0 h-[400px] w-[600px] rounded-full bg-[#2facde]/5 blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-indigo-600/5 blur-[80px]" />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-center">
          {/* Text */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
            >
              A imobiliária inteira
              <br />
              em uma operação só.
              <br />
              <span className="bg-gradient-to-r from-[#2facde] to-[#37d6c0] bg-clip-text text-transparent">
                Do lead ao repasse.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400"
            >
              Seu contrato está em uma ferramenta, a cobrança em outra e o lead
              no WhatsApp de alguém. Aqui o CRM, o atendimento, o contrato
              assinado, a cobrança e o financeiro dividem os mesmos dados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full justify-center rounded-xl bg-[#2facde] px-7 py-3.5 text-base font-semibold text-white shadow-[0_14px_28px_-12px_rgba(47,172,222,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-12px_rgba(47,172,222,0.5)] sm:w-auto"
              >
                Começar 30 dias grátis
                <Icons.arrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex w-full justify-center rounded-xl border border-slate-600 bg-white/5 px-7 py-3.5 text-base font-semibold text-slate-300 backdrop-blur-sm transition hover:border-slate-500 hover:bg-white/10 sm:w-auto"
              >
                Falar com especialista
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500"
            >
              {["30 dias grátis", "Sem cartão de crédito", "Migração dos seus dados"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Icons.checkCircle className="size-3.5 text-[#2facde]/60" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Module orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex min-h-[420px] items-center justify-center px-2 sm:px-8"
          >
            <ModuleOrbit />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
