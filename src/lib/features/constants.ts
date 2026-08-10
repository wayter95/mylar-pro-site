import type { FeatureSlug } from "./types";

export const FEATURE_ORDER: FeatureSlug[] = [
  "crm",
  "channels",
  "ai-attendance",
  "meta-ads",
  "schedule",
  "property-catalog",
  "properties",
  "keys",
  "inspections",
  "digital-signature",
  "billing",
  "financial",
  "ai",
  "mylar-score",
  "ai-media",
  "broker-app",
  "client-portal",
];

export const FEATURE_GROUPS: {
  title: string;
  description: string;
  slugs: FeatureSlug[];
}[] = [
  {
    title: "Vender e atender",
    description:
      "Do primeiro contato até a proposta aceita, com a conversa e o funil no mesmo lugar.",
    slugs: ["crm", "channels", "ai-attendance", "meta-ads", "schedule"],
  },
  {
    title: "Imóveis e captação",
    description:
      "A carteira cadastrada uma vez, publicada no seu site e trabalhada em campo.",
    slugs: ["property-catalog", "properties", "keys", "inspections"],
  },
  {
    title: "Contratos e dinheiro",
    description:
      "Contrato assinado, aluguel recebido, proprietário repassado e a margem visível.",
    slugs: ["digital-signature", "billing", "financial"],
  },
  {
    title: "Inteligência artificial",
    description:
      "Um copiloto que conhece a carteira, análise de risco e mídia do anúncio.",
    slugs: ["ai", "mylar-score", "ai-media"],
  },
  {
    title: "Aplicativos",
    description:
      "Nativos de iOS e Android, inclusos no plano e sem cobrança por corretor.",
    slugs: ["broker-app", "client-portal"],
  },
];

export const REGISTER_URL = "https://app.mylarpro.com.br/register";

export const BROKER_APP_URLS = {
  appStore: "https://apps.apple.com/us/app/mylar-pro-brokers/id6762925131",
  playStore:
    "https://play.google.com/store/apps/details?id=com.mylarprobrokers.app",
};

export const HOME_APP_URLS = {
  appStore: "https://apps.apple.com/br/app/mylar-pro-home/id6784389538",
  playStore:
    "https://play.google.com/store/apps/details?id=com.mylarprohome.app",
};

export const SIGNATURE_PORTAL_URL = "https://sign.mylarpro.com.br/";
export const CUSTOMER_PORTAL_URL = "https://customer.mylarpro.com.br/login";
