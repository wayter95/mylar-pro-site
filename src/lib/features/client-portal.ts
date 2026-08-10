import { CUSTOMER_PORTAL_URL, HOME_APP_URLS } from "./constants";
import type { FeatureContent } from "./types";

export const clientPortal: FeatureContent = {
  slug: "client-portal",
  label: "MyLar Pro Home",
  shortLabel: "App do Cliente",
  href: "/features/client-portal",
  accent: "#7C3AED",
  eyebrow: "Recurso · Aplicativo e área logada",
  hero: {
    title: "Os dois lados do contrato ",
    titleHighlight: "se resolvem sozinhos",
    subtitle:
      "Inquilinos pagam aluguel, enviam comprovante e abrem chamado de manutenção. Proprietários acompanham o repasse, baixam o demonstrativo e o informe de rendimentos. Pelo aplicativo ou pelo navegador.",
    ctaPrimary: "Começar 30 dias grátis",
    ctaSecondary: "Acessar portal",
    trust: [
      "Aplicativo nativo de iOS e Android",
      "Acesso por CPF/CNPJ + código de verificação",
      "Também pelo navegador, sem instalar nada",
    ],
  },
  externalLinks: [
    {
      label: "App Store",
      href: HOME_APP_URLS.appStore,
      kind: "app-store",
    },
    {
      label: "Google Play",
      href: HOME_APP_URLS.playStore,
      kind: "play-store",
    },
    {
      label: "Acessar portal",
      href: CUSTOMER_PORTAL_URL,
      kind: "external",
    },
  ],
  keyPoints: [
    {
      title: "Pagamento de faturas",
      body: "Inquilino paga boleto, PIX com QR Code ou cartão direto pelo portal. Vê histórico, segunda via e situação de cada cobrança a qualquer hora.",
    },
    {
      title: "Contratos sempre à mão",
      body: "Cliente acessa contrato assinado, anexos, comprovantes de pagamento e demonstrativos de repasse — sem precisar pedir nada para a imobiliária.",
    },
    {
      title: "Repasses para o proprietário",
      body: "Vê quanto recebeu, quando recebeu, com breakdown completo: aluguel − taxa admin − comissão − encargos = repasse líquido. Tudo com PDF para o IR.",
    },
    {
      title: "Chamados de manutenção",
      body: "Inquilino abre chamado, anexa fotos e acompanha o status. Imobiliária recebe na régua de operações, sem ligação no fim de semana.",
    },
    {
      title: "Comprovantes e DIMOB",
      body: "Cliente baixa Informe de Rendimentos anual (DIMOB), comprovantes de pagamento e demonstrativos com 1 clique — durante todo o período fiscal.",
    },
    {
      title: "Notificações automáticas",
      body: "Lembrete de vencimento, confirmação de pagamento, novo chamado, novo repasse — tudo por e-mail, WhatsApp ou push, sem você levantar um dedo.",
    },
  ],
  keyPointsHeadline: {
    title: "Tudo que seu cliente precisa, sem ligar para você.",
    subtitle:
      "Portal personalizado com seu logo, cores e domínio próprio (portal.suaimobiliaria.com.br).",
  },
  benefits: [
    "Menos ligações na imobiliária — clientes resolvem sozinhos",
    "Inadimplência menor com lembretes automáticos e pagamento em 3 cliques",
    "Transparência total: proprietário confia mais quando vê o financeiro em tempo real",
    "Imagem profissional — portal moderno reforça sua marca",
    "Atendimento 24/7 sem depender do horário comercial",
  ],
  benefitsHeadline: {
    title: "Por que clientes amam o Portal do Mylar Pro.",
    subtitle:
      "Quando cliente resolve sozinho, sua equipe foca em vender — não em apagar incêndio.",
  },
  audience: [
    {
      label: "Imobiliárias",
      description: "Que querem reduzir tickets de atendimento e profissionalizar o pós-venda.",
    },
    {
      label: "Administradoras",
      description: "Com muitos proprietários e prestações de contas mensais detalhadas.",
    },
    {
      label: "Incorporadoras, construtoras e loteadoras",
      description: "Com clientes em fase de pós-venda, acompanhamento de obra e entrega.",
    },
    {
      label: "Qualquer operação",
      description: "Que queira modernizar a relação com o cliente e sair do WhatsApp manual.",
    },
  ],
  audienceHeadline: {
    title: "Para quem quer escalar sem perder qualidade.",
    subtitle: "Crescer não pode significar mais tempo no telefone.",
  },
  faq: [
    {
      q: "Como o cliente acessa o portal?",
      a: "Por CPF/CNPJ + código OTP enviado por e-mail ou WhatsApp. Sem senha para lembrar, sem reset de senha, sem chamado de suporte.",
    },
    {
      q: "O cliente precisa instalar o aplicativo?",
      a: "Não é obrigatório. Existe o MyLar Pro Home, aplicativo nativo de iOS e Android, com notificação de fatura e de repasse. Quem preferir não instalar acessa tudo pelo navegador, no computador ou no celular.",
    },
    {
      q: "Posso personalizar com a marca da minha imobiliária?",
      a: "Sim. Logo, cores, domínio próprio (portal.suaimobiliaria.com.br) e textos são totalmente customizáveis.",
    },
    {
      q: "Quantos clientes posso cadastrar?",
      a: "Ilimitado em qualquer plano que inclua o módulo Portal. Cada inquilino e proprietário tem seu acesso individual.",
    },
    {
      q: "E a segurança dos dados?",
      a: "Acesso por OTP a cada login, dados criptografados, conformidade com LGPD e isolamento total entre organizações.",
    },
    {
      q: "Inquilino e proprietário compartilham a mesma tela?",
      a: "Não. Cada perfil tem visualização própria: inquilino vê faturas e chamados; proprietário vê repasses, demonstrativos e relatórios.",
    },
  ],
  hubCard: {
    description:
      "Aplicativo e área logada onde o inquilino paga o aluguel e abre chamados, e o proprietário acompanha o repasse.",
    highlights: [
      "App nativo de iOS e Android",
      "Pagamento por boleto, PIX ou cartão",
      "Demonstrativo de repasse e informe de rendimentos",
    ],
  },
};
