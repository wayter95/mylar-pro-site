import type { PersonaContent } from "./types";

export const broker: PersonaContent = {
  slug: "broker",
  label: "Corretor Autônomo",
  shortLabel: "Corretor",
  accent: "#1FB3D6",
  href: "/personas/broker",
  hero: {
    tag: "Para o corretor autônomo",
    title: [
      "Sua carteira de imóveis ",
      "organizada",
      " e gerando comissão todo mês.",
    ],
    subtitle:
      "O Mylar Pro reúne CRM, catálogo, WhatsApp e contratos digitais num só lugar — para você fechar mais sem perder lead na planilha.",
    ctaPrimary: "Começar 30 dias grátis",
    ctaSecondary: "Ver demo de 2 minutos",
    trust: [
      "30 dias grátis · sem cartão",
      "Todas as funcionalidades liberadas",
      "Implantação em 1 hora",
    ],
  },
  pains: [
    {
      title: "Lead perdido em conversa de WhatsApp",
      body: "Você atende 30 contatos por semana — mas no fim do mês não lembra quem queria 2 quartos no Centro.",
      resolved: "CRM com pipeline + inbox unificado.",
    },
    {
      title: "Catálogo limitado ou na mão do portal",
      body: "Depende de portais que cobram caro por anúncio e ainda escondem seu lead até o cliente assinar.",
      resolved: "Catálogo próprio com domínio na sua marca.",
    },
    {
      title: "Contrato no Word, assinatura presencial",
      body: "Cliente some entre a proposta verbal e a assinatura. Você imprime, anda até a imobiliária, perde o gatilho.",
      resolved: "Contratos prontos + assinatura digital.",
    },
  ],
  featureBlocks: [
    {
      eyebrow: "CRM + Inbox",
      title:
        "Cada conversa de WhatsApp vira um lead com etapa, anotações e próximas ações.",
      body: "Pipeline visual com Captação → Visita → Proposta → Fechamento. Filtros por bairro, tipologia, ticket e temperatura do lead. Inbox unificado liga a conversa ao funil — nenhuma negociação fica esquecida no rascunho do WhatsApp.",
      bullets: [
        "Pipeline Kanban com etapas customizáveis",
        "Inbox unificado WhatsApp + e-mail",
        "Templates de mensagem aprovados",
        "Lead scoring e temperatura automática",
      ],
      visual: "broker-pipeline",
    },
    {
      eyebrow: "Catálogo público",
      title:
        "Site próprio com seu domínio, sua marca e seu WhatsApp — sem refém de portal.",
      body: "Catálogo em seusite.com.br com filtros por bairro, tipologia e preço. Fotos otimizadas para SEO, OG image automática, botão direto pro seu WhatsApp. CRECI e dados regionais já preenchidos conforme exigência do COFECI.",
      bullets: [
        "Domínio próprio (seusite.com.br)",
        "Filtros por bairro, tipologia e preço",
        "SEO técnico + OG image automática",
        "Botão WhatsApp direto na ficha",
      ],
      visual: "broker-catalog",
    },
    {
      eyebrow: "App do Corretor",
      title:
        "Cadastre imóvel, responda lead e marque visita do celular — em qualquer rua.",
      body: "Tire fotos pelo app e publique na hora. Ficha do imóvel, agenda de visita, contrato e assinatura digital — tudo no bolso. Lembrete automático pro cliente, GPS até o imóvel, e check-in de visita com 1 toque.",
      bullets: [
        "Cadastro de imóvel com foto pelo celular",
        "Agenda de visitas com GPS",
        "Contrato + assinatura digital no app",
        "Notificação push de novos leads",
      ],
      visual: "broker-mobile",
    },
  ],
  features: [
    {
      hero: true,
      title: "WhatsApp + CRM no mesmo lugar",
      body: "Cada conversa vira um lead com etapa do funil, anotações, imóveis enviados e próximas ações. Templates aprovados, multi-atendente, histórico completo. Nenhuma negociação cai no esquecimento.",
    },
    {
      title: "Pipeline de negociações",
      body: "Arraste leads entre etapas (Captação → Visita → Proposta → Fechamento). Filtros por bairro, tipologia e ticket.",
    },
    {
      title: "Catálogo na sua marca",
      body: "Site próprio com seusite.com.br, fotos otimizadas, filtros e botão direto pro seu WhatsApp.",
    },
    {
      title: "Agenda de visitas",
      body: "Marque visitas direto da ficha do imóvel. Lembrete automático pro cliente e pra você.",
    },
    {
      title: "Contratos prontos",
      body: "Modelos de compra, venda e locação. Preencha em 2 minutos e envie pra assinatura digital com validade jurídica.",
    },
    {
      title: "App do Corretor",
      body: "Cadastre imóveis e responda leads do celular — incluindo tirar fotos pelo app e publicar na hora.",
    },
  ],
  featuresHeadline: {
    title: "Tudo que um corretor profissional precisa, num lugar só.",
    subtitle:
      "Você é o produto principal. Tudo aqui foi feito pra você fechar mais sem virar refém de plataforma de portal.",
  },
  steps: [
    {
      num: "01",
      title: "Crie sua conta",
      body: "Cadastro em 3 minutos, sem cartão de crédito.",
    },
    {
      num: "02",
      title: "Importe sua carteira",
      body: "Suba sua planilha ou conecte com portais. Imóveis prontos em minutos.",
    },
    {
      num: "03",
      title: "Conecte WhatsApp",
      body: "Number link via WhatsApp Business — todas as conversas viram leads.",
    },
    {
      num: "04",
      title: "Comece a fechar",
      body: "Use catálogo, contratos e pipeline para acelerar suas negociações.",
    },
  ],
  stepsHeadline: {
    title: "Você começa hoje. Em 1 hora está usando.",
    subtitle:
      "Sem treinamento, sem dor de cabeça. Trial de 30 dias com seus imóveis já lá dentro.",
  },
  testimonials: [
    {
      featured: true,
      quote:
        "Em 4 meses dobrei o número de visitas marcadas e parei de perder lead no WhatsApp. Hoje, 70% das minhas vendas saem do pipeline do Mylar.",
      name: "Camila Ferraz",
      role: "Corretora autônoma · Curitiba",
      avatar: "CF",
      stats: [
        { v: "+120%", l: "Visitas/mês" },
        { v: "4×", l: "Comissão" },
      ],
    },
    {
      quote:
        "O catálogo no meu domínio é o diferencial. Cliente liga já querendo o imóvel X. Saí dependente de portal.",
      name: "Roberto Andrade",
      role: "Corretor · Florianópolis",
      avatar: "RA",
    },
    {
      quote:
        "A assinatura digital sozinha já paga o plano. Fechei 2 locações em 1 dia sem o cliente sair de casa.",
      name: "Luana Pires",
      role: "Corretora · Vitória",
      avatar: "LP",
    },
  ],
  comparison: {
    headers: ["Essencial", "Intermediário", "Avançado"],
    groups: [
      {
        name: "Gestão de leads",
        rows: [
          ["Pipeline de negociações", true, true, true],
          ["Inbox unificado", true, true, true],
          ["Lead scoring", false, false, true],
          ["Split de comissão", false, false, true],
        ],
      },
      {
        name: "Catálogo & site",
        rows: [
          ["Catálogo público", true, true, true],
          ["Customização com marca", false, true, true],
          ["Domínio próprio", false, false, true],
        ],
      },
      {
        name: "Atendimento",
        rows: [
          ["Agenda de visitas", true, true, true],
          ["WhatsApp integrado", false, true, true],
          ["Templates de mensagem", false, true, true],
          ["App do Corretor", false, true, true],
        ],
      },
      {
        name: "Contratos",
        rows: [
          ["Modelos prontos", false, true, true],
          ["Contratos personalizados", false, false, true],
          ["Assinatura digital", false, false, true],
        ],
      },
    ],
  },
  faq: [
    {
      q: "Como funciona o teste grátis?",
      a: "30 dias com acesso a TODAS as funcionalidades — independente do plano. Você testa tudo (CRM, catálogo, WhatsApp, contratos, domínio próprio, assinatura digital) e só depois escolhe o plano que faz sentido pra você. Sem cartão de crédito, sem letras miúdas.",
    },
    {
      q: "Posso migrar minha planilha de imóveis?",
      a: "Sim. Aceitamos CSV, Excel e importação direta de Imovelweb, ZAP, Viva Real e OLX. Nosso time faz a primeira carga junto com você na onboarding.",
    },
    {
      q: "O catálogo conta como site oficial pro CRECI?",
      a: "Sim. O catálogo customizado já vem com os campos obrigatórios (CRECI, endereço de regional) que o COFECI exige em sites de corretor.",
    },
    {
      q: "Vocês integram com meu WhatsApp pessoal?",
      a: "Trabalhamos com WhatsApp Business via API oficial. Recomendamos um número dedicado — orientamos a configuração no onboarding.",
    },
    {
      q: "E se eu crescer e virar imobiliária?",
      a: "Você muda de plano sem perder nenhum dado. O Mylar Pro foi desenhado pra crescer com você — do corretor solo à incorporadora, construtora ou loteadora.",
    },
  ],
};
