"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* BACKGROUND.png como fundo de toda a seção — sem overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/BACKGROUND.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[55%_45%] lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full border border-white/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:px-4 sm:text-sm"
            >
              Plataforma para imobiliárias e incorporadoras
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
            >
              Gerencie imóveis, contratos e cobranças em um só lugar — e feche
              negócios{" "}
              <span className="text-[#37B6D6]">mais rápido</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-base text-white/90 sm:mt-6 sm:text-lg"
            >
              CRM completo, assinatura eletrônica, boleto e PIX integrados e
              catálogo público para seus imóveis. Tudo com dados isolados por
              empresa e sem depender de sistemas legados.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="https://management.mylarpro.com.br/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-[#37B6D6] shadow-xl transition hover:scale-[1.02] hover:bg-white/95 sm:w-auto"
              >
                Criar conta grátis
              </a>
              <a
                href="/contato"
                className="inline-flex w-full justify-center rounded-xl border-2 border-white bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:w-auto"
              >
                Falar com especialista
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-sm text-white/80"
            >
              Sem cartão de crédito • Setup em 5 minutos • Cancele quando quiser
            </motion.p>
          </div>

          {/* Espaço reservado para imagens — apenas em telas grandes */}
          <div className="hidden min-h-0 lg:block lg:min-h-[400px]" aria-hidden />
        </div>
      </div>
      {/* Imagens no bottom da section — visíveis apenas em telas grandes */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-0 right-0 left-0 z-10 hidden justify-end px-4 sm:px-6 lg:flex lg:px-8"
      >
        <div className="relative mx-auto flex w-full max-w-7xl justify-end">
          <div className="relative flex items-end justify-end">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative z-0"
            >
              <Image
                src="/images/plan.png"
                alt="Plataforma de gestão imobiliária"
                width={500}
                height={380}
                className="h-auto w-full max-w-[320px] object-contain object-bottom drop-shadow-xl md:max-w-[400px] lg:max-w-[460px]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute bottom-0 right-0 z-10"
            >
              <Image
                src="/images/modelo.png"
                alt="Profissional utilizando a plataforma"
                width={340}
                height={420}
                className="h-auto w-[200px] object-contain object-bottom drop-shadow-2xl md:w-[260px] lg:w-[300px]"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
