import type { IconName } from "@/lib/icons";

export const APP_URL = "https://app.mylarpro.com.br";
export const REGISTER_URL = "https://app.mylarpro.com.br/register";

export type NavBadge = "novo" | "popular";

export type MegaMenuItem = {
  href: string;
  label: string;
  description: string;
  icon: IconName;
  badge?: NavBadge;
};

export type MegaMenuGroup = {
  title: string;
  items: MegaMenuItem[];
};

export type MegaMenuFeature = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  accent: string;
};

export type MegaMenuCategory = {
  key: string;
  label: string;
  icon: IconName;
  groups: MegaMenuGroup[];
  feature: MegaMenuFeature;
};

export const featureCategories: MegaMenuCategory[] = [
  {
    key: "sell",
    label: "Vender e atender",
    icon: "handshake",
    groups: [
      {
        title: "Funil e negociação",
        items: [
          {
            href: "/features/crm",
            label: "CRM e negociações",
            description: "Kanban de leads, propostas, contraofertas e comissões.",
            icon: "grid",
            badge: "popular",
          },
          {
            href: "/features/schedule",
            label: "Agenda e tarefas",
            description: "Visitas do imóvel e quadros de tarefas da equipe.",
            icon: "calendar",
          },
        ],
      },
      {
        title: "Conversa com o cliente",
        items: [
          {
            href: "/features/channels",
            label: "Canais de atendimento",
            description: "WhatsApp, Instagram, Messenger e e-mail num inbox só.",
            icon: "message",
          },
          {
            href: "/features/ai-attendance",
            label: "IA no atendimento",
            description: "Primeira resposta em segundos e lead já qualificado.",
            icon: "sparkles",
            badge: "novo",
          },
          {
            href: "/features/meta-ads",
            label: "Campanhas e anúncios Meta",
            description: "Anúncio do Instagram e Facebook ligado ao funil.",
            icon: "meta",
            badge: "novo",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "CRM e negociações",
      title: "Nenhum lead esquecido na tela",
      description:
        "Distribuição automática por corretor, prazo de resposta e escalação quando ninguém responde.",
      ctaLabel: "Conhecer o CRM",
      ctaHref: "/features/crm",
      accent: "#2facde",
    },
  },
  {
    key: "properties",
    label: "Imóveis e captação",
    icon: "house",
    groups: [
      {
        title: "Vitrine e cadastro",
        items: [
          {
            href: "/features/property-catalog",
            label: "Catálogo público",
            description: "Site de imóveis no seu domínio, com SEO e busca por mapa.",
            icon: "globe",
          },
          {
            href: "/features/properties",
            label: "Imóveis e empreendimentos",
            description: "Mídia, documentos, torres, lotes e tabela de preço.",
            icon: "building",
          },
        ],
      },
      {
        title: "Operação de campo",
        items: [
          {
            href: "/features/inspections",
            label: "Vistorias",
            description: "Checklist por ambiente, fotos e laudo em PDF assinado.",
            icon: "fileCheck",
          },
          {
            href: "/features/keys",
            label: "Controle de chaves",
            description: "Quem pegou, para qual imóvel e quando devolveu.",
            icon: "key",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Catálogo público",
      title: "Cada visita ao site vira lead",
      description:
        "Seu domínio, seu SEO, seu pixel do Meta. O contato cai direto no funil do CRM.",
      ctaLabel: "Ver o catálogo",
      ctaHref: "/features/property-catalog",
      accent: "#2D6BE0",
    },
  },
  {
    key: "money",
    label: "Contratos e dinheiro",
    icon: "wallet",
    groups: [
      {
        title: "Contrato",
        items: [
          {
            href: "/features/digital-signature",
            label: "Assinatura de contratos",
            description: "Templates versionados e validade jurídica pela Lei 14.063.",
            icon: "fileSign",
          },
        ],
      },
      {
        title: "Recebimento e resultado",
        items: [
          {
            href: "/features/billing",
            label: "Cobranças e repasses",
            description: "Boleto e PIX, reajuste por índice e demonstrativo ao dono.",
            icon: "dollar",
          },
          {
            href: "/features/financial",
            label: "Financeiro",
            description: "DRE, conciliação bancária por OFX, centros de custo e DIMOB.",
            icon: "chart",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Financeiro",
      title: "O fechamento do mês pronto no dia 1º",
      description:
        "Comissão, aluguel e repasse entram sozinhos. Você concilia com o extrato e vê a margem real.",
      ctaLabel: "Ver o financeiro",
      ctaHref: "/features/financial",
      accent: "#10B981",
    },
  },
  {
    key: "ai",
    label: "Inteligência artificial",
    icon: "sparkles",
    groups: [
      {
        title: "Copiloto e análise",
        items: [
          {
            href: "/features/ai",
            label: "Mila · copiloto do corretor",
            description: "Sugere o próximo passo, escreve a resposta e acha o imóvel certo.",
            icon: "sparkles",
            badge: "novo",
          },
          {
            href: "/features/mylar-score",
            label: "MyLar Score",
            description: "Serasa e outras bases lidas por IA num score único de risco.",
            icon: "shieldCheck",
          },
        ],
      },
      {
        title: "Mídia do anúncio",
        items: [
          {
            href: "/features/ai-media",
            label: "Ferramentas de IA para imagem",
            description: "Mobiliar ambiente vazio, melhorar foto e gerar descrição.",
            icon: "zap",
            badge: "novo",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Mila",
      title: "A IA trabalha ao lado do corretor",
      description:
        "Não no lugar dele. A Mila conhece a carteira e antecipa o que falta em cada negociação.",
      ctaLabel: "Ver o que a IA faz",
      ctaHref: "/features/ai",
      accent: "#7C3AED",
    },
  },
  {
    key: "apps",
    label: "Aplicativos",
    icon: "phone",
    groups: [
      {
        title: "Nativos iOS e Android",
        items: [
          {
            href: "/features/broker-app",
            label: "MyLar Pro Brokers",
            description: "Carteira, pipeline e captação no celular, funcionando offline.",
            icon: "briefcase",
          },
          {
            href: "/features/client-portal",
            label: "MyLar Pro Home",
            description: "Inquilino paga e abre chamado; proprietário acompanha o repasse.",
            icon: "house",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Aplicativos",
      title: "Inclusos no plano, sem cobrança por corretor",
      description:
        "O que define o valor é o porte da operação, não quantas pessoas usam o aplicativo.",
      ctaLabel: "Ver os aplicativos",
      ctaHref: "/features",
      accent: "#1FB3D6",
    },
  },
];

export type PersonaNavItem = {
  href: string;
  label: string;
  description: string;
  icon: IconName;
  accent: string;
};

export const personaNavItems: PersonaNavItem[] = [
  {
    href: "/personas/broker",
    label: "Corretor autônomo",
    description: "CRM, catálogo próprio e WhatsApp num só lugar.",
    icon: "user",
    accent: "#1FB3D6",
  },
  {
    href: "/personas/real-estate",
    label: "Imobiliária",
    description: "Locação, vendas, cobrança e financeiro com equipe.",
    icon: "building",
    accent: "#2D6BE0",
  },
  {
    href: "/personas/development",
    label: "Lançamentos e empreendimentos",
    description: "Espelho de vendas, Meta Ads e BI executivo.",
    icon: "rocket",
    accent: "#10B981",
  },
];

export const badgeLabels: Record<NavBadge, string> = {
  novo: "Novo",
  popular: "Popular",
};
