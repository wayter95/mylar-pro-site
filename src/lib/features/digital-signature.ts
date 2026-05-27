import { SIGNATURE_PORTAL_URL } from "./constants";
import type { FeatureContent } from "./types";

export const digitalSignature: FeatureContent = {
  slug: "digital-signature",
  label: "Assinatura Digital",
  shortLabel: "Assinatura Digital",
  href: "/features/digital-signature",
  accent: "#F59E0B",
  eyebrow: "Recurso · Contratos",
  hero: {
    title: "Assinatura digital ",
    titleHighlight: "integrada ao CRM",
    subtitle:
      "Envie contratos de locação, venda, intermediação e parcerias para assinatura digital. Sem impressora, sem cartório, sem deslocamento — com plena validade jurídica.",
    ctaPrimary: "Começar 30 dias grátis",
    ctaSecondary: "Ver portal de assinatura",
    trust: [
      "MP 2.200-2/2001 · Lei 14.063/2020",
      "Trilha de auditoria com IP e geolocalização",
      "Cliente assina pelo celular, sem app",
    ],
  },
  externalLinks: [
    {
      label: "Ver portal de assinatura",
      href: SIGNATURE_PORTAL_URL,
      kind: "external",
    },
  ],
  keyPoints: [
    {
      title: "Modelos prontos e personalizados",
      body: "Templates de locação, compra e venda, intermediação e administração — ou crie os seus com variáveis dinâmicas que preenchem dados do imóvel, cliente e negociação automaticamente.",
    },
    {
      title: "Validade jurídica garantida",
      body: "Cada documento é assinado com certificado ICP-Brasil ou autenticação por SMS/e-mail + selo de tempo, garantindo plena validade jurídica em todo território nacional.",
    },
    {
      title: "Múltiplos signatários",
      body: "Envie para inquilino, proprietário, fiador, testemunhas e corretor de uma só vez. Cada um assina pelo celular, na ordem que você definir.",
    },
    {
      title: "Trilha de auditoria",
      body: "Cada contrato registra IP, geolocalização, dispositivo, data e hora de cada assinatura — pronto para qualquer disputa judicial.",
    },
    {
      title: "Integrado ao CRM",
      body: "Contrato é gerado direto da negociação, com dados preenchidos automaticamente. Assinado, vira documento oficial vinculado ao cliente e ao imóvel.",
    },
    {
      title: "Assinatura por WhatsApp",
      body: "Envie o link de assinatura direto pelo WhatsApp. O cliente assina pelo celular, sem precisar baixar app ou criar conta.",
    },
  ],
  keyPointsHeadline: {
    title: "Contrato assinado sem cliente sair de casa.",
    subtitle:
      "O fluxo de assinatura vem amarrado ao contrato — sem ferramenta paralela.",
  },
  benefits: [
    "De 7 dias para 7 minutos: tempo médio de fechamento de contrato",
    "Zero papel: economia de impressão, cartório e correio",
    "Zero fricção: cliente assina de qualquer lugar, sem cadastro",
    "100% rastreável: auditoria completa anexada ao documento",
    "Validade total: aceito em qualquer tribunal brasileiro",
  ],
  benefitsHeadline: {
    title: "Por que a assinatura digital muda o jogo.",
    subtitle: "Cliente que demora pra assinar, frequentemente é cliente que some.",
  },
  audience: [
    {
      label: "Imobiliárias",
      description: "Com alto volume de locações que precisam acelerar o fechamento.",
    },
    {
      label: "Incorporadoras, construtoras e loteadoras",
      description: "Que fecham contratos de compra (na planta ou lote) com cliente em qualquer cidade.",
    },
    {
      label: "Administradoras",
      description: "Que renovam contratos anualmente com toda a base de proprietários.",
    },
    {
      label: "Corretores autônomos",
      description: "Que querem fechar a venda na hora — sem ligar para o jurídico.",
    },
  ],
  audienceHeadline: {
    title: "Para quem perde negócio esperando assinatura.",
    subtitle: "Quanto antes assinar, menor a chance de o cliente repensar.",
  },
  faq: [
    {
      q: "A assinatura digital tem validade jurídica?",
      a: "Sim. A assinatura atende à MP 2.200-2/2001 e à Lei 14.063/2020, garantindo plena validade em todo território nacional — aceita em qualquer tribunal brasileiro.",
    },
    {
      q: "O cliente precisa ter certificado digital?",
      a: "Não. A assinatura pode ser feita por autenticação via SMS, e-mail ou selfie — todas reconhecidas legalmente conforme a legislação brasileira.",
    },
    {
      q: "Quantos contratos posso enviar?",
      a: "Depende do seu plano Mylar Pro. Planos com módulo de contratos incluem assinaturas ilimitadas — sem custo por documento.",
    },
    {
      q: "Posso usar meus próprios modelos?",
      a: "Sim. Você pode subir seus templates ou criar novos com variáveis dinâmicas (nome, CPF, valor, endereço, fiador, etc.).",
    },
    {
      q: "E se o cliente recusar assinar?",
      a: "Você é notificado na hora e pode cancelar, renegociar ou reenviar o documento. O CRM mantém o histórico de todas as tentativas.",
    },
    {
      q: "O contrato fica armazenado por quanto tempo?",
      a: "Permanentemente, enquanto sua conta estiver ativa. Você pode baixar PDF assinado com trilha de auditoria a qualquer momento.",
    },
  ],
  hubCard: {
    description:
      "Contrato gerado do CRM, enviado por WhatsApp e assinado pelo cliente em minutos, com validade jurídica.",
    highlights: [
      "MP 2.200-2/2001 · Lei 14.063/2020",
      "Múltiplos signatários + trilha de auditoria",
      "Assinatura por SMS/e-mail/selfie",
    ],
  },
};
