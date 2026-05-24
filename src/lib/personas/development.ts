import type { PersonaContent } from "./types";

export const development: PersonaContent = {
  slug: "development",
  label: "Incorporadora",
  shortLabel: "Incorporadora",
  accent: "#0E2849",
  href: "/personas/development",
  hero: {
    tag: "Para incorporadoras",
    title: [
      "Venda na planta com a ",
      "precisão",
      " de quem opera VGV bilionário.",
    ],
    subtitle:
      "Espelho de vendas em tempo real, tabela de preços dinâmica, Meta Ads integrado e BI executivo. A plataforma que escala do primeiro lançamento ao décimo.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Agendar conversa executiva",
    trust: [
      "30 dias grátis · todas as funcionalidades",
      "Onboarding com Customer Success",
      "SLA enterprise · LGPD certificado",
    ],
  },
  pains: [
    {
      title: "Espelho de vendas em PDF, defasado",
      body: "Corretor envia proposta de unidade que já foi reservada ontem. Cliente assina, conflito. Diretoria descobre só no fechamento.",
      resolved: "Espelho em tempo real, sincronizado entre todos.",
    },
    {
      title: "Meta Ads ROI no escuro",
      body: "R$ 80k/mês em mídia, mas você não sabe qual criativo trouxe a venda. Atribuição morre no formulário.",
      resolved: "Lead-to-deal tracking nativo Meta + UTMs.",
    },
    {
      title: "Tabela de preços em planilha versão V47",
      body: "Cada gerente tem a sua. Desconto não autorizado, comissão errada, condição expirada. Auditoria? Nem pensar.",
      resolved: "Tabela viva com aprovação e workflow.",
    },
    {
      title: "Múltiplos empreendimentos, um caos",
      body: "Cada torre tem CRM separado, financeiro separado, relatório separado. Diretoria pede consolidado, leva 1 semana.",
      resolved: "Multi-empreendimento nativo + BI consolidado.",
    },
  ],
  featureBlocks: [
    {
      eyebrow: "Espelho de vendas",
      title: "Tabela viva. Toda equipe vê a mesma unidade, no mesmo segundo.",
      body: "Torres, blocos, unidades, vagas, fração ideal e memorial em um espelho que atualiza em tempo real. Tabela de preços com workflow de aprovação de desconto. Reserva, proposta e contrato amarrados à unidade — nunca mais duas propostas na mesma vaga.",
      bullets: [
        "Espelho em tempo real sincronizado",
        "Workflow de desconto com aprovação",
        "Reserva → proposta → contrato amarrados",
        "Memorial e fração ideal por unidade",
      ],
      visual: "development-mirror",
    },
    {
      eyebrow: "Meta Ads + Atribuição",
      title: "Veja qual criativo virou contrato assinado — não apenas formulário preenchido.",
      body: "Conecte sua Business Manager via OAuth oficial. Leads dos Lead Ads entram com UTM, campanha, criativo e custo. Atribuição lead-to-deal vai até a venda — você sabe CAC real por criativo e mata o que não converte.",
      bullets: [
        "OAuth oficial Meta Business Manager",
        "Atribuição até a venda assinada",
        "CAC e ROAS reais por criativo",
        "Distribuição automática de leads",
      ],
      visual: "development-meta-ads",
    },
    {
      eyebrow: "BI executivo",
      title: "VSO, velocidade de vendas e projeção de receita — em telas que vão pro comitê.",
      body: "Dashboards de diretoria por empreendimento e consolidado. VSO, velocidade, mix por tipologia, ticket médio, projeção de receita. A reunião de comitê comercial deixa de ser planilha — vira a tela do Mylar projetada.",
      bullets: [
        "VSO e velocidade por empreendimento",
        "Mix por tipologia e ticket médio",
        "Projeção de receita 6/12/24 meses",
        "Consolidado executivo multi-projeto",
      ],
      visual: "development-bi",
    },
  ],
  features: [
    {
      hero: true,
      title: "Módulo de Empreendimentos",
      body: "Gestão de torres, blocos, unidades, vagas, fração ideal e memorial. Tabela de preços com workflow de aprovação. Espelho de vendas vivo. Distribuição automática de leads entre stand e corretores parceiros.",
    },
    {
      title: "Meta Ads integrado",
      body: "Conecte sua conta de anúncios, importe leads automaticamente com UTMs preservadas e veja CAC real por campanha.",
    },
    {
      title: "Multi-empreendimento",
      body: "Quantos lançamentos você precisar. Carteira de corretores parceiros, comissão por unidade, regras por torre.",
    },
    {
      title: "BI executivo",
      body: "VSO, velocidade de vendas, ticket médio, mix por tipologia, projeção de receita. Dashboards de diretoria.",
    },
    {
      title: "Contratos multi-parte",
      body: "CCV, distrato, aditivos. Templates por empreendimento. Assinatura digital com fluxo customizado.",
    },
    {
      title: "Compliance & LGPD",
      body: "SSO/SAML, auditoria granular, retenção configurável. Certificações ISO 27001 e LGPD.",
    },
  ],
  featuresHeadline: {
    title: "A plataforma que cresce do lançamento à entrega das chaves.",
    subtitle:
      "Tudo que CRM, ERP e BI faziam separados — agora numa stack pensada para incorporação.",
  },
  steps: [
    {
      num: "01",
      title: "Discovery executivo",
      body: "Sessão com diretoria de Vendas, Marketing e Financeiro para mapear stack e processos.",
    },
    {
      num: "02",
      title: "Setup & integrações",
      body: "Implementação com Customer Success dedicado. Integração com ERP, BI atual e Meta Business.",
    },
    {
      num: "03",
      title: "Piloto em 1 empreendimento",
      body: "Validamos a operação numa torre antes de escalar para o portfólio inteiro.",
    },
    {
      num: "04",
      title: "Rollout completo",
      body: "Treinamento de equipe (vendas, marketing, financeiro), migração e go-live por etapas.",
    },
  ],
  stepsHeadline: {
    title: "Implantação executiva guiada por Customer Success.",
    subtitle: "Sem perda de dados. Sem trauma. Equipe operando com confiança.",
  },
  testimonials: [
    {
      featured: true,
      quote:
        "Lançamos 3 torres em paralelo com o mesmo time. O espelho de vendas em tempo real eliminou todo conflito de unidade reservada. VSO subiu 22% no primeiro lançamento na plataforma.",
      name: "Eng. Rodrigo Maciel",
      role: "Diretor Comercial · Construtora Verde · VGV R$ 380M",
      avatar: "RM",
      stats: [
        { v: "+22%", l: "VSO" },
        { v: "−40%", l: "CAC" },
      ],
    },
    {
      quote:
        "A integração com Meta Ads mudou o jogo. Pela primeira vez vemos qual criativo virou contrato assinado.",
      name: "Mariana Tellini",
      role: "CMO · Habitat Construções",
      avatar: "MT",
    },
    {
      quote:
        "BI executivo é o que vendi pro board. Hoje a reunião de comitê comercial é a tela do Mylar projetada.",
      name: "Felipe Caputo",
      role: "CEO · Caputo Empreendimentos",
      avatar: "FC",
    },
  ],
  plans: [
    {
      name: "Essencial",
      price: 897,
      priceAnnual: 762,
      tagline: "Plataforma completa + módulo de Empreendimentos.",
      idealFor: "Construtora com 1-3 empreendimentos ativos, vendendo do stand próprio.",
      limits: [
        { v: "2.000", l: "Imóveis" },
        { v: "10", l: "Agentes" },
      ],
      features: [
        "Tudo da Imobiliária Avançado",
        "Módulo de Empreendimentos completo",
        "Gestão de torres e unidades",
        "Tabela de preços com aprovação",
        "Espelho de vendas em tempo real",
        "Contratos multi-parte",
      ],
      cta: "Falar com vendas",
      contactSales: true,
    },
    {
      name: "Intermediário",
      price: 997,
      priceAnnual: 847,
      tagline: "Vendas com performance de marketing digital.",
      idealFor: "Incorporadora investindo em Meta Ads/Google que precisa medir CAC real.",
      featured: true,
      badge: "Mais popular",
      limits: [
        { v: "3.000", l: "Imóveis" },
        { v: "30", l: "Agentes" },
      ],
      features: [
        "Tudo do Essencial",
        "Campanhas Meta Ads integradas",
        "Atribuição lead-to-deal",
        "CAC e ROAS por campanha",
        "Distribuição de leads automática",
        "Painel de marketing performance",
      ],
      cta: "Agendar demo executiva",
      contactSales: true,
    },
    {
      name: "Avançado",
      price: 1297,
      priceAnnual: 1102,
      tagline: "Sem limites. Sua incorporadora opera em escala.",
      idealFor: "Incorporadora de portfólio multi-projeto que exige SSO, SLA e API.",
      limits: [
        { v: "∞", l: "Imóveis" },
        { v: "∞", l: "Agentes" },
      ],
      features: [
        "Tudo do Intermediário",
        "Imóveis e agentes ilimitados",
        "Customer Success dedicado",
        "SLA enterprise 99.9%",
        "SSO/SAML + auditoria granular",
        "API completa e webhooks",
        "Onboarding white-glove",
      ],
      cta: "Falar com diretoria comercial",
      contactSales: true,
    },
  ],
  comparison: {
    headers: ["Essencial", "Intermediário", "Avançado"],
    groups: [
      {
        name: "Suíte completa",
        rows: [
          ["Tudo de Imobiliária Avançado", true, true, true],
          ["DRE + DIMOB + Conciliação", true, true, true],
          ["BI avançado", true, true, true],
        ],
      },
      {
        name: "Empreendimentos",
        rows: [
          ["Gestão de torres e unidades", true, true, true],
          ["Espelho de vendas em tempo real", true, true, true],
          ["Tabela de preços com workflow", true, true, true],
          ["Comissão por unidade", true, true, true],
        ],
      },
      {
        name: "Marketing performance",
        rows: [
          ["Meta Ads integrado", false, true, true],
          ["Atribuição lead-to-deal", false, true, true],
          ["Distribuição automática de leads", false, true, true],
        ],
      },
      {
        name: "Enterprise",
        rows: [
          ["Customer Success dedicado", false, false, true],
          ["SLA 99.9%", false, false, true],
          ["SSO/SAML", false, false, true],
          ["API & webhooks", false, false, true],
        ],
      },
    ],
  },
  faq: [
    {
      q: "Posso testar antes de fechar contrato?",
      a: "Sim. Oferecemos 30 dias de trial com TODAS as funcionalidades liberadas — incluindo módulo de empreendimentos, Meta Ads e BI executivo. Ótimo para validar internamente antes do contrato corporativo. Para pilotos formais em lançamentos específicos, veja a pergunta abaixo.",
    },
    {
      q: "Como funciona o piloto antes do contrato completo?",
      a: "Selecionamos 1 empreendimento (geralmente o próximo lançamento) e rodamos a plataforma por 60-90 dias com Customer Success dedicado. Sucesso comprovado vira contrato corporativo para o portfólio inteiro.",
    },
    {
      q: "Vocês integram com nosso ERP atual (TOTVS, Sienge, UAU)?",
      a: "Sim. Temos integrações nativas com Sienge, TOTVS Construção, UAU, Globaltec e outros. APIs e webhooks bidirecionais para sincronização contábil e de obra.",
    },
    {
      q: "Como funciona a integração com Meta Ads?",
      a: "Conectamos sua conta de Business Manager via OAuth oficial. Leads dos Lead Ads entram automaticamente com UTMs, ID de campanha, criativo e custo. Atribuição vai até a venda assinada, calculando CAC real por anúncio.",
    },
    {
      q: "Quem é o ponto focal no nosso onboarding?",
      a: "Você tem um Customer Success Manager dedicado no plano Avançado, com SLA de resposta em 2h em horário comercial. Reuniões mensais de QBR (Quarterly Business Review).",
    },
    {
      q: "É compatível com LGPD?",
      a: "Sim. Mylar Pro é certificado LGPD com Data Protection Officer dedicado. Retenção configurável, base legal por finalidade, exportação e exclusão sob demanda, DPA disponível.",
    },
    {
      q: "Tem SSO corporativo?",
      a: "Sim, plano Avançado. Suportamos SAML 2.0 (Okta, Azure AD, Google Workspace) e OIDC. Provisionamento SCIM disponível.",
    },
    {
      q: "E se precisarmos de customização para um lançamento específico?",
      a: "Plano Avançado inclui sessões de produto customizadas. Para roadmap dedicado, oferecemos contrato Enterprise sob medida — fale com nosso time comercial.",
    },
  ],
};
