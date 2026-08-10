"use client";

import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";

const withoutMylar = [
  "Lead chega no Instagram, é copiado à mão para a planilha e esfria antes do primeiro contato.",
  "Contrato vai e volta por e-mail até alguém imprimir, assinar e digitalizar.",
  "Reajuste de IGP-M calculado na calculadora, cobrança gerada uma a uma.",
  "Proprietário liga perguntando do repasse porque não tem onde consultar.",
  "Fechamento do mês reconstruído no Excel, sem saber a margem real.",
];

const withMylar = [
  "O anúncio no Meta cria o lead no funil, distribui para um corretor e dispara o primeiro atendimento.",
  "Contrato sai do template, é assinado com validade jurídica e fica arquivado no imóvel.",
  "Reajuste por IGP-M, IPCA ou INPC aplicado em lote, com aprovação antes de valer.",
  "Proprietário abre o portal e vê o demonstrativo de repasse em PDF sozinho.",
  "Receita, despesa, margem e DIMOB prontos, conciliados com o extrato do banco.",
];

export function AntiChaosSection() {
  return (
    <section className="border-t border-slate-200 bg-[#FAFAF7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
                O problema
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              Seu contrato está em uma ferramenta. A cobrança em outra. O lead,
              no WhatsApp de alguém.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            Cada sistema resolve um pedaço e nenhum conversa com o outro. O custo
            aparece no retrabalho, no repasse atrasado e no lead que ninguém
            respondeu.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-2 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-7 lg:p-8"
          >
            <p className="text-[15px] font-bold text-slate-500">
              Sem MyLar Pro
            </p>
            <ul className="mt-6 space-y-4">
              {withoutMylar.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icons.close
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-slate-400"
                  />
                  <span className="text-sm leading-relaxed text-slate-500">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border-2 border-[#2facde]/25 bg-white p-7 shadow-[0_20px_40px_-28px_rgba(47,172,222,0.45)] lg:p-8"
          >
            <p className="text-[15px] font-bold text-[#2facde]">Com MyLar Pro</p>
            <ul className="mt-6 space-y-4">
              {withMylar.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icons.check
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-[#2facde]"
                  />
                  <span className="text-sm leading-relaxed text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
