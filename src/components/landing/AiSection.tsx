"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";

const capabilities = [
  {
    title: "Mila · copiloto do corretor",
    description:
      "Responde no atendimento, prepara propostas e antecipa o que falta em cada negociação.",
    border: "rgba(167,139,250,0.5)",
  },
  {
    title: "MyLar Score",
    description:
      "Consulta integrada ao Serasa e a outras fontes, analisada por IA em um score único de risco para aquele cliente.",
    border: "rgba(234,179,8,0.5)",
  },
  {
    title: "Ferramentas de IA",
    description:
      "Mobiliar um ambiente vazio, melhorar a foto do imóvel e gerar a descrição do anúncio.",
    border: "rgba(47,172,222,0.5)",
  },
];

const quickActions = ["Enviar pedido", "Ver o score completo", "Gerar proposta"];

export function AiSection() {
  return (
    <section className="relative overflow-hidden bg-[#020617]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-[20%] h-[500px] w-[700px] rounded-full blur-[140px]"
        style={{ background: "rgba(124,58,237,0.14)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#a78bfa] uppercase">
              Inteligência artificial
            </span>

            <h2 className="mt-3.5 text-[27px] leading-[1.08] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
              A Mila trabalha ao lado do corretor, não no lugar dele.
            </h2>

            <p className="mt-4.5 text-base leading-[1.65] text-slate-400 lg:text-[17px]">
              Um copiloto que conhece a carteira: sugere o próximo passo da
              negociação, escreve a resposta ao lead, resume a conversa e
              encontra o imóvel certo para o cliente certo.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {capabilities.map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 pl-4"
                  style={{ borderColor: item.border }}
                >
                  <h3 className="text-[15.5px] font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-[1.55] text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/features/ai"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#7c3aed] px-5 py-3 text-[14.5px] font-bold text-white transition hover:bg-[#8b5cf6]"
            >
              Ver o que a IA faz
              <Icons.arrowRight aria-hidden className="size-4" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="rounded-[22px] border border-white/10 p-[22px]"
            style={{
              background: "rgba(15,23,42,0.7)",
              boxShadow: "0 40px 80px -40px rgba(0,0,0,0.9)",
            }}
          >
            <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-4">
              <span
                className="flex size-[30px] items-center justify-center rounded-[9px] text-[13px] font-extrabold text-white"
                style={{
                  background: "linear-gradient(140deg, #7c3aed, #2facde)",
                }}
              >
                M
              </span>
              <span className="text-sm font-bold text-white">Mila</span>
              <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-[#34d399]">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-[#34d399]"
                />
                analisando negociação #MYLC-2041
              </span>
            </div>

            <div className="mt-[18px] flex flex-col gap-3.5">
              <p
                className="max-w-[82%] self-end rounded-[14px] rounded-br-[4px] border px-[15px] py-3 text-[13.5px] leading-[1.5] text-slate-200"
                style={{
                  background: "rgba(47,172,222,0.16)",
                  borderColor: "rgba(47,172,222,0.25)",
                }}
              >
                Esse cliente serve para o apartamento da Rua Bento Gonçalves?
              </p>

              <div
                className="max-w-[90%] self-start space-y-3 rounded-[14px] rounded-bl-[4px] border px-4 py-3.5 text-[13.5px] leading-[1.6] text-slate-300"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.09)",
                }}
              >
                <p>
                  Serve. As preferências dele batem em 4 de 5 critérios e o MyLar
                  Score é 782 — risco baixo.
                </p>
                <p>
                  Faltam duas coisas na negociação: o comprovante de renda e a
                  data da visita. Quer que eu envie o pedido pelo WhatsApp e já
                  sugira três horários da sua agenda?
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <span
                    key={action}
                    className="rounded-full border border-white/[0.14] px-3.5 py-[7px] text-[12.5px] font-semibold text-slate-300"
                  >
                    {action}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
