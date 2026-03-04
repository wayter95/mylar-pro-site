"use client";

import { useState } from "react";

const faqs = [
  {
    pergunta: "Como faço para criar minha conta?",
    resposta:
      "Basta clicar em \"Criar conta grátis\" no site e preencher seus dados. O cadastro é rápido e você pode começar a usar a plataforma em poucos minutos.",
  },
  {
    pergunta: "A plataforma tem custo para começar?",
    resposta:
      "Não. Você cria sua conta gratuitamente e pode explorar a plataforma. O plano e a assinatura são definidos dentro da própria plataforma, conforme sua necessidade.",
  },
  {
    pergunta: "Posso gerenciar vendas e locações?",
    resposta:
      "Sim. O Mylar Pro tem CRM completo para vendas e locações, pipeline visual, gestão de leads, histórico de interações e controle de visitas. Tudo em um só lugar.",
  },
  {
    pergunta: "Os contratos podem ser assinados digitalmente?",
    resposta:
      "Sim. Seus clientes assinam contratos digitalmente pela plataforma, com validação segura e geração de PDF assinado. Sem papel e sem atrasos.",
  },
  {
    pergunta: "O módulo financeiro emite boleto e PIX?",
    resposta:
      "Sim. O módulo financeiro está integrado para cobranças com boleto e PIX, além de repasse automático. Cada imobiliária com sua própria conta.",
  },
  {
    pergunta: "Meus dados ficam seguros?",
    resposta:
      "Sim. Cada imobiliária tem seus dados isolados e protegidos. A plataforma foi desenvolvida com foco em segurança e privacidade.",
  },
  {
    pergunta: "Haverá integração com portais como OLX?",
    resposta:
      "Sim. Estamos trabalhando na integração com portais imobiliários para que você possa publicar e gerenciar seus anúncios diretamente pela plataforma. Em breve você terá essa funcionalidade.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200">
      {faqs.map((faq, i) => (
        <div key={i} className="py-5 first:pt-0">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 text-left"
          >
            <span className="font-medium text-slate-900">{faq.pergunta}</span>
            <svg
              className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === i && (
            <p className="mt-3 text-slate-600">{faq.resposta}</p>
          )}
        </div>
      ))}
    </div>
  );
}
