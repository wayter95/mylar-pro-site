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
      "Envie contratos de locação, venda, intermediação e parcerias para assinatura digital. Sem impressora, sem cartório, sem deslocamento — com identidade confirmada por código e trilha de auditoria anexada ao documento.",
    ctaPrimary: "Começar 30 dias grátis",
    ctaSecondary: "Ver portal de assinatura",
    trust: [
      "Assinatura eletrônica · Lei 14.063/2020",
      "Verificação pública por QR e hash",
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
      title: "Identidade confirmada por código",
      body: "Cada signatário recebe o contrato por e-mail e confirma a assinatura com um código de verificação enviado para ele. A assinatura eletrônica segue a Lei 14.063/2020 para contratos entre partes que aceitam esse meio.",
    },
    {
      title: "Verificação pública por QR e hash",
      body: "O PDF assinado sai com um QR Code e o hash SHA-256 do documento. Qualquer pessoa confere a autenticidade sem depender de você — se um byte do arquivo mudar, a verificação acusa.",
    },
    {
      title: "Múltiplos signatários",
      body: "Inquilino, proprietário, fiador, testemunha e procurador no mesmo contrato, cada um com o seu papel registrado.",
    },
    {
      title: "Trilha de auditoria",
      body: "Cada assinatura registra IP, dispositivo, data e hora, além do consentimento LGPD com versão do termo aceito. Fica tudo anexado ao documento.",
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
    "Contrato assinado no mesmo dia, sem imprimir nem despachar",
    "Zero papel: economia de impressão, cartório e correio",
    "Zero fricção: cliente assina de qualquer lugar, sem cadastro",
    "Autenticidade conferível por QR e hash, por qualquer parte",
    "Trilha de IP, dispositivo, data e consentimento LGPD anexada",
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
      q: "Que tipo de assinatura é essa?",
      a: "É assinatura eletrônica na modalidade simples, prevista na Lei 14.063/2020: o signatário é identificado, confirma por código enviado ao e-mail dele e a plataforma registra IP, dispositivo e data. Vale entre partes que aceitam esse meio, o que cobre contrato de locação, intermediação e parceria. Não é assinatura qualificada com certificado ICP-Brasil — se o seu caso exigir isso, o contrato pode ser assinado por fora e anexado ao imóvel.",
    },
    {
      q: "O cliente precisa ter certificado digital?",
      a: "Não. Ele recebe o link por e-mail, confere o documento e confirma com o código de verificação. Não precisa instalar aplicativo, criar conta nem ter certificado.",
    },
    {
      q: "Como eu provo que o documento não foi alterado?",
      a: "O PDF assinado traz um QR Code e o hash SHA-256 do arquivo. Pela página pública de verificação, qualquer parte confirma que aquele documento é o mesmo que foi assinado — sem precisar pedir nada para a imobiliária.",
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
      "Contrato gerado do CRM, enviado por WhatsApp e assinado pelo cliente em minutos, com verificação por QR e hash.",
    highlights: [
      "Assinatura eletrônica · Lei 14.063/2020",
      "Múltiplos signatários + trilha de auditoria",
      "Código de verificação por e-mail",
    ],
  },
};
