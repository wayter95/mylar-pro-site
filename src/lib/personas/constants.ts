import type { PersonaHubCard, PersonaSlug } from "./types";

export const REGISTER_URL = "https://app.mylarpro.com.br/register";

export const PERSONA_HERO_IMAGES: Record<
  PersonaSlug,
  { src: string; alt: string; width: number; height: number }
> = {
  broker: {
    src: "/images/leads.png",
    alt: "Gestão de leads e pipeline de negociações no Mylar Pro",
    width: 3248,
    height: 2120,
  },
  "real-estate": {
    src: "/images/negotiation.png",
    alt: "Negociações e operação comercial da imobiliária no Mylar Pro",
    width: 3248,
    height: 2120,
  },
  development: {
    src: "/images/developments.png",
    alt: "Empreendimentos e vendas na planta no Mylar Pro",
    width: 3248,
    height: 2120,
  },
};

export const PERSONA_ORDER: PersonaSlug[] = [
  "broker",
  "real-estate",
  "development",
];

export const PERSONA_HUB_CARDS: PersonaHubCard[] = [
  {
    slug: "broker",
    label: "Corretor autônomo",
    description:
      "Você trabalha sozinho e quer profissionalizar a operação sem virar refém de portal.",
    fromPrice: 197,
    highlights: [
      "CRM com pipeline de negociações",
      "Catálogo no seu domínio",
      "WhatsApp + assinatura digital",
    ],
    accent: "#1a9bb8",
  },
  {
    slug: "real-estate",
    label: "Imobiliária",
    description:
      "Equipe administrando locação, vendas, cobrança, vistoria e financeiro — sob um sistema só.",
    fromPrice: 497,
    highlights: [
      "Cobrança automática + portal do cliente",
      "Vistoria digital + chamados",
      "DRE + DIMOB + conciliação",
    ],
    accent: "#2563c7",
  },
  {
    slug: "development",
    label: "Lançamentos & Empreendimentos",
    description:
      "Para incorporadoras, construtoras e loteadoras. Espelho de vendas vertical e horizontal, Meta Ads e BI executivo em uma stack só.",
    fromPrice: 897,
    highlights: [
      "Torres, unidades e loteamentos",
      "Meta Ads + atribuição lead-to-deal",
      "SSO/SAML · LGPD certificado",
    ],
    accent: "#0f2847",
  },
];
