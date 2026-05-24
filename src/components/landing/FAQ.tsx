"use client";

import { useState } from "react";
import { Icons } from "@/lib/icons";

const faqs = [
  {
    pergunta: "O que é o Mylar Pro?",
    resposta:
      "O Mylar Pro é uma plataforma completa de gestão imobiliária que reúne CRM, assinatura eletrônica, cobranças com boleto e PIX, portal de imóveis e portal do cliente — tudo em um só lugar, pensado para o mercado brasileiro.",
  },
  {
    pergunta: "Quando a plataforma estará disponível?",
    resposta:
      "Estamos em fase final de desenvolvimento. Quem entrar na lista de espera terá acesso antecipado e receberá um cupom de desconto exclusivo de lançamento por e-mail.",
  },
  {
    pergunta: "Posso gerenciar vendas e locações?",
    resposta:
      "Sim. O Mylar Pro tem CRM completo para vendas e locações, pipeline visual com Kanban, gestão de leads, histórico de interações e controle de visitas. Tudo em um só lugar.",
  },
  {
    pergunta: "Os contratos podem ser assinados digitalmente?",
    resposta:
      "Sim. A plataforma possui assinatura eletrônica integrada com validade jurídica (Lei 14.063), validação de identidade e geração de PDF assinado. Sem papel, sem scanner, sem depender de plataformas externas.",
  },
  {
    pergunta: "O módulo financeiro emite boleto e PIX?",
    resposta:
      "Sim. O módulo financeiro está integrado para cobranças com boleto e PIX, com reajuste automático por IGP-M, IPCA ou índice fixo, além de repasse automático ao proprietário.",
  },
  {
    pergunta: "Meus dados ficam seguros?",
    resposta:
      "Sim. Cada organização tem seus dados completamente isolados e protegidos. A plataforma foi desenvolvida com foco em segurança, privacidade e conformidade com a LGPD.",
  },
  {
    pergunta: "Para quem é o Mylar Pro?",
    resposta:
      "Para imobiliárias que querem profissionalizar a gestão, incorporadoras, construtoras e loteadoras que precisam controlar empreendimentos e comissões, e corretores autônomos que buscam um CRM completo sem complexidade.",
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
            <Icons.chevronDown
              className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <p className="mt-3 text-slate-600">{faq.resposta}</p>
          )}
        </div>
      ))}
    </div>
  );
}
