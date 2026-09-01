import type { PersonaContent } from "./types";

export const realEstate: PersonaContent = {
  slug: "real-estate",
  label: "Imobiliária",
  shortLabel: "Imobiliária",
  accent: "#2D6BE0",
  href: "/personas/real-estate",
  hero: {
    tag: "Para imobiliárias",
    title: [
      "Toda sua imobiliária ",
      "sob controle",
      " — da captação ao repasse.",
    ],
    subtitle:
      "Vendas, locação, cobrança, vistoria e financeiro num só sistema. Equipe alinhada, proprietário pago em dia, inadimplência sob controle.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Agendar demonstração",
    trust: [
      "30 dias grátis · todas as funcionalidades",
      "Migração de dados inclusa",
      "Treinamento da equipe",
    ],
  },
  pains: [
    {
      title: "Inadimplência fora de controle",
      body: "Régua de cobrança no Excel, boletos manuais, proprietário cobrando todo dia 5. Você gasta mais energia cobrando que vendendo.",
      resolved: "Régua automática + boletos/PIX + acordo digital.",
    },
    {
      title: "Chamados de manutenção perdidos",
      body: "Inquilino reclama no WhatsApp, encanador no Telegram, proprietário no e-mail. Ninguém sabe o status.",
      resolved: "Chamados centralizados + fornecedor + status.",
    },
    {
      title: "Vistoria, chaves e contratos em pastas",
      body: "Cada agente tem seu jeito. Auditoria vira pesadelo, troca de equipe vira black box.",
      resolved: "Vistoria digital, controle de chaves, contrato vivo.",
    },
    {
      title: "Você não sabe quanto realmente lucra",
      body: "Repasse aqui, comissão ali, taxa do banco no extrato. Fechamento mensal toma dias.",
      resolved: "DRE gerencial + conciliação bancária automática.",
    },
  ],
  featureBlocks: [
    {
      eyebrow: "Negociações",
      title: "Da captação à assinatura, num funil que toda a equipe enxerga.",
      body: "Cada negociação tem etapa, agente responsável, próxima ação e valor. Locação ou venda, todos os contratos vivos em uma tela. A diretoria abre o pipeline e vê em segundos o que vai fechar este mês.",
      bullets: [
        "Funil unificado de locação e venda",
        "Próxima ação visível em cada negociação",
        "Atribuição automática por agente ou rodízio",
        "Pipeline R$ + projeção de fechamento",
      ],
      visual: "real-estate-negotiations",
    },
    {
      eyebrow: "Cobrança & Régua",
      title: "Boletos, PIX e régua de cobrança no piloto automático.",
      body: "Boletos e PIX emitidos sozinhos pelo banco da imobiliária. Régua de e-mail + WhatsApp dispara antes, no dia e após o vencimento. Acordos e parcelamentos negociados pelo portal do cliente — sem ligação, sem planilha.",
      bullets: [
        "Boleto + PIX integrados com o seu banco",
        "Régua e-mail e WhatsApp configurável",
        "Acordos e parcelamentos pelo portal",
        "Multa e juros automáticos por contrato",
      ],
      visual: "real-estate-billing",
    },
    {
      eyebrow: "Financeiro & DRE",
      title: "Você sabe quanto realmente lucra — fechamento do mês em horas, não dias.",
      body: "Repasse calculado com taxa, IRRF e despesas. Conciliação bancária automática via OFX/CSV. DRE gerencial, DIMOB em 1 clique, BI de inadimplência e vacância. O financeiro vira estratégico, para de viver atrás de cliente.",
      bullets: [
        "Repasse automático com IRRF e despesas",
        "Conciliação bancária OFX/CSV",
        "DRE gerencial e DIMOB em 1 clique",
        "BI de inadimplência, vacância, ticket médio",
      ],
      visual: "real-estate-financial",
    },
  ],
  features: [
    {
      hero: true,
      title: "Gestão de locação ponta a ponta",
      body: "Da captação ao reajuste IGP-M. Contrato, vistoria, boleto, repasse, DIMOB — tudo amarrado por imóvel, com auditoria completa e área logada para inquilino e proprietário.",
    },
    {
      title: "Cobrança automática",
      body: "Boletos e PIX gerados sozinhos. Régua de e-mail + WhatsApp. Acordo e parcelamento direto pelo portal do cliente.",
    },
    {
      title: "Repasse ao proprietário",
      body: "Cálculo automático considerando taxa, IRRF, despesas. Pagamento via PIX ou TED com 1 clique.",
    },
    {
      title: "Vistoria digital",
      body: "Faça pelo app no imóvel. Fotos georeferenciadas, laudo PDF, assinatura digital. Reduz disputa em até 80%.",
    },
    {
      title: "Chamados & fornecedores",
      body: "Inquilino abre, sistema designa fornecedor, proprietário aprova orçamento. SLA, custo e histórico por imóvel.",
    },
    {
      title: "BI e DRE gerencial",
      body: "Dashboard de inadimplência, vacância, ticket médio. DIMOB e Informe de Rendimentos prontos para a Receita.",
    },
  ],
  featuresHeadline: {
    title: "Uma plataforma para vendas, locação e gestão predial.",
    subtitle:
      "O que antes era contrato + planilha + boleto + WhatsApp + vistoria virou um sistema só.",
  },
  steps: [
    {
      num: "01",
      title: "Diagnóstico gratuito",
      body: "Conversa de 30 minutos para entender sua operação e mapear ganhos.",
    },
    {
      num: "02",
      title: "Migração assistida",
      body: "Nosso time importa contratos, imóveis e histórico financeiro. Sem perda de dados.",
    },
    {
      num: "03",
      title: "Treinamento da equipe",
      body: "Sessões com gestor, financeiro e corretores. Material de apoio gravado.",
    },
    {
      num: "04",
      title: "Go-live & acompanhamento",
      body: "Acompanhamento dedicado nos primeiros 60 dias para garantir adoção.",
    },
  ],
  stepsHeadline: {
    title: "Migração assistida, equipe treinada, go-live em até 14 dias.",
    subtitle: "Sem perda de dados. Sem trauma. Equipe operando com confiança.",
  },
  testimonials: [
    {
      featured: true,
      quote:
        "Reduzimos a inadimplência de 18% para 6% em 5 meses só com a régua automatizada. O time financeiro virou estratégico, parou de viver atrás de cliente.",
      name: "Dra. Patrícia Mendonça",
      role: "Diretora · Imobiliária Lar+ · 420 imóveis",
      avatar: "PM",
      stats: [
        { v: "−67%", l: "Inadimplência" },
        { v: "12 h", l: "Fechamento/mês" },
      ],
    },
    {
      quote:
        "Antes eu tinha 3 sistemas: CRM, financeiro e vistoria. Hoje tenho um. Cancelei os outros e ainda pago menos.",
      name: "Eduardo Salles",
      role: "Sócio · Imobiliária Praia Brava",
      avatar: "ES",
    },
    {
      quote:
        "A DIMOB sai em 1 clique. Antes era uma semana de planilha. Meu contador agradece.",
      name: "Marcia Lopes",
      role: "CFO · Grupo Habitar",
      avatar: "ML",
    },
  ],
  comparison: {
    headers: ["Intermediário", "Avançado"],
    groups: [
      {
        name: "CRM & catálogo",
        rows: [
          ["Tudo de Corretor Avançado", true, true],
          ["Domínio próprio", true, true],
          ["App do Corretor", true, true],
        ],
      },
      {
        name: "Portal & cobrança",
        rows: [
          ["Portal do Cliente", true, true],
          ["Boletos e PIX automáticos", true, true],
          ["Reajuste IGP-M/IPCA", true, true],
          ["Régua de cobrança avançada", true, true],
        ],
      },
      {
        name: "Operação predial",
        rows: [
          ["Chamados & manutenção", true, true],
          ["Vistorias digitais", true, true],
          ["Controle de chaves", true, true],
          ["Fornecedores", true, true],
          ["Quadros Kanban + automações", true, true],
        ],
      },
      {
        name: "Financeiro",
        rows: [
          ["Repasses & comissões", true, true],
          ["Conciliação bancária", false, true],
          ["DRE gerencial", false, true],
          ["DIMOB + Informe", false, true],
          ["BI avançado", false, true],
        ],
      },
    ],
  },
  faq: [
    {
      q: "Como funciona o teste grátis?",
      a: "30 dias com TODAS as funcionalidades liberadas — inclusive os recursos do plano Avançado (DRE, DIMOB, vistoria digital, BI). Você opera com a equipe, valida na prática e só depois escolhe o plano. Sem cartão de crédito.",
    },
    {
      q: "Como funciona a migração do meu sistema atual?",
      a: "Nosso time de implantação importa contratos, imóveis, histórico financeiro, vistorias e clientes. Trabalhamos com saídas dos principais sistemas (Superlógica, Imobzi, Vista, Console, Universal e outros). Migração é incluída em todos os planos.",
    },
    {
      q: "Os boletos e PIX são emitidos pelo Mylar ou pelo meu banco?",
      a: "Integramos com Itaú, Bradesco, Santander, Banco do Brasil, Inter, Sicoob, BTG e outras instituições. Você mantém sua conta — emitimos via API do seu banco com seus convênios.",
    },
    {
      q: "A DIMOB é gerada automaticamente?",
      a: "Sim. No plano Avançado, geramos DIMOB e Informe de Rendimentos com base nos contratos e pagamentos do ano. Você baixa o arquivo TXT pronto para envio à Receita.",
    },
    {
      q: "Vocês fazem vistoria no aplicativo offline?",
      a: "Sim. O vistoriador faz tudo no app, mesmo sem internet. Sincroniza ao voltar ao sinal. Fotos georeferenciadas, áudios e laudo PDF assinado digitalmente.",
    },
    {
      q: "Posso ter perfis diferentes para corretores e financeiro?",
      a: "Sim. Cada usuário tem perfil de permissões granular: o que vê, o que edita, quais relatórios acessa. Auditoria completa por usuário.",
    },
    {
      q: "Como funciona o reajuste anual?",
      a: "O sistema calcula automaticamente com base no índice contratado (IGP-M, IPCA, INPC). Avisa o inquilino com 30 dias de antecedência, gera o adendo, atualiza o boleto.",
    },
    {
      q: "Tem multa de fidelidade?",
      a: "Não. Pagamento mensal, cancele quando quiser. Planos anuais têm desconto mas mantêm flexibilidade.",
    },
  ],
};
