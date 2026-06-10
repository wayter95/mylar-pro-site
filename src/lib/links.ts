import type { IconName } from "@/lib/icons";

type LinkVariant = "primary" | "secondary";

export type LinkItem = {
  label: string;
  href: string;
  icon: IconName;
  variant: LinkVariant;
};

export type SocialItem = {
  label: string;
  href: string;
  icon: IconName;
};

export const profile = {
  tagline: "Gestão imobiliária completa, num só lugar.",
};

export const linkItems: LinkItem[] = [
  {
    label: "Agendar demonstração",
    href: "https://cognizy.ai/book/comercial-mylar-pro-erp",
    icon: "calendar",
    variant: "primary",
  },
  {
    label: "Criar conta grátis",
    href: "https://app.mylarpro.com.br/register",
    icon: "rocket",
    variant: "secondary",
  },
  {
    label: "Acessar plataforma",
    href: "https://app.mylarpro.com.br",
    icon: "dashboard",
    variant: "secondary",
  },
  {
    label: "App do corretor (iPhone)",
    href: "https://apps.apple.com/us/app/mylar-pro-brokers/id6762925131",
    icon: "apple",
    variant: "secondary",
  },
  {
    label: "App do corretor (Android)",
    href: "https://play.google.com/store/apps/details?id=com.mylarprobrokers.app",
    icon: "googlePlay",
    variant: "secondary",
  },
  {
    label: "Funcionalidades",
    href: "/features",
    icon: "sparkles",
    variant: "secondary",
  },
  {
    label: "Para quem é",
    href: "/personas",
    icon: "users",
    variant: "secondary",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5561981896419",
    icon: "whatsapp",
    variant: "secondary",
  },
  {
    label: "E-mail",
    href: "mailto:contato@mylarapp.com",
    icon: "mail",
    variant: "secondary",
  },
  {
    label: "Telefone",
    href: "tel:+5561981896419",
    icon: "phone",
    variant: "secondary",
  },
];

export const socialItems: SocialItem[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mylar.app/",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mylar-pro",
    icon: "linkedin",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mylarapp",
    icon: "facebook",
  },
];

export const isExternalHref = (href: string): boolean =>
  href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
