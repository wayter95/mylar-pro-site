"use client";

import { AnimateIn, AnimateInStagger, AnimateInItem } from "./AnimateIn";

const blocks = [
  {
    id: "assinatura",
    badge: "Diferencial exclusivo",
    title: "Assinatura Eletrônica",
    highlight: "Contratos digitais com validade jurídica",
    description:
      "Esqueça impressoras e cartórios. O signatário recebe o contrato, valida sua identidade, assina na tela e pronto — PDF assinado armazenado com segurança na nuvem. Conforme Lei 14.063/2020.",
    features: [
      { title: "Validação de documentos", desc: "Confirmação da identidade do cliente" },
      { title: "Assinatura digital", desc: "Cliente assina no dispositivo" },
      { title: "PDF assinado", desc: "Documento salvo e seguro" },
    ],
  },
  {
    id: "financeiro",
    badge: "Diferencial exclusivo",
    title: "Módulo Financeiro Integrado",
    highlight: "Repasse automático",
    description:
      "Gere boletos e PIX com um clique, acompanhe pagamentos em tempo real e tenha o financeiro da sua imobiliária integrado ao CRM — sem planilhas e sem retrabalho.",
    features: [
      { title: "Boleto e PIX", desc: "Cobranças integradas" },
      { title: "Repasse automático", desc: "Valores creditados automaticamente" },
      { title: "Segurança", desc: "Dados protegidos e criptografados" },
    ],
  },
  {
    id: "imoveis",
    badge: "Para incorporadoras",
    title: "Gestão de Imóveis e Unidades",
    highlight: "Múltiplas unidades por empreendimento",
    description:
      "Gerencie múltiplas unidades por empreendimento, acompanhe a jornada de venda de cada unidade e tenha visão consolidada de todos os seus projetos em uma única plataforma.",
    features: [
      { title: "Múltiplas unidades", desc: "Um empreendimento, várias unidades" },
      { title: "Controle de disponibilidade", desc: "Vendas e locações" },
      { title: "Organização por empreendimento", desc: "Tudo em um só lugar" },
    ],
  },
  {
    id: "crm",
    badge: null,
    title: "CRM e Pipeline de Vendas",
    highlight: "Do lead ao fechamento",
    description:
      "Visualize cada oportunidade no Kanban, acompanhe o funil de vendas e locações, e nunca perca um follow-up. O CRM do Mylar Pro foi feito para quem vive o dia a dia imobiliário.",
    features: [
      { title: "Pipeline Kanban", desc: "Vendas e locações" },
      { title: "Gestão de leads", desc: "Segmentação e histórico" },
      { title: "Visitas", desc: "Agendamento e controle" },
    ],
  },
  {
    id: "whatsapp",
    badge: null,
    title: "Notificações via WhatsApp",
    highlight: "Avisos e lembretes de cobrança",
    description:
      "Receba e envie avisos de cobrança e notificações importantes automaticamente pelo WhatsApp. Seus clientes sempre informados.",
    features: [
      { title: "Lembretes de cobrança", desc: "Envio automático de avisos" },
      { title: "Notificações", desc: "Avisos importantes para clientes" },
    ],
  },
  {
    id: "portal",
    badge: "Diferencial",
    title: "Portal de Catálogo Público",
    highlight: "Busca por geolocalização",
    description:
      "Cada imobiliária ganha um portal público profissional com busca por mapa, filtros inteligentes e páginas otimizadas para SEO — tudo atualizado automaticamente pelo CRM.",
    features: [
      { title: "Mapa interativo", desc: "Busca por localização" },
      { title: "Portal público", desc: "Separado da área administrativa" },
      { title: "Rápido e moderno", desc: "Interface otimizada" },
    ],
  },
];

export function FeatureBlocks() {
  return (
    <section className="border-t border-slate-200 bg-white">
      {blocks.map((block, blockIndex) => (
        <div
          key={block.id}
          id={block.id}
          className={`py-24 ${blockIndex % 2 === 1 ? "bg-slate-50" : ""}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <AnimateIn delay={0.1}>
                <div>
                  {block.badge && (
                    <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
                      {block.badge}
                    </span>
                  )}
                  <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    {block.title}
                  </h2>
                  <p className="mt-2 text-xl font-medium text-[#37B6D6]">
                    {block.highlight}
                  </p>
                  <p className="mt-4 text-slate-600">{block.description}</p>
                </div>
              </AnimateIn>
              <AnimateInStagger stagger={0.08}>
                <div className="space-y-4">
                  {block.features.map((f, i) => (
                    <AnimateInItem key={i}>
                      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#37B6D6]/50 hover:shadow-md">
                        <h3 className="font-semibold text-slate-900">{f.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
                      </div>
                    </AnimateInItem>
                  ))}
                </div>
              </AnimateInStagger>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
