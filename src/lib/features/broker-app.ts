import { BROKER_APP_URLS } from "./constants";
import type { FeatureContent } from "./types";

export const brokerApp: FeatureContent = {
  slug: "broker-app",
  label: "App do Corretor",
  shortLabel: "App do Corretor",
  href: "/features/broker-app",
  accent: "#1FB3D6",
  eyebrow: "Recurso · App nativo",
  hero: {
    title: "O app do corretor que vem com o ",
    titleHighlight: "Mylar Pro",
    subtitle:
      "Acesse sua carteira, atenda no WhatsApp, agende visitas e feche negócios direto do celular — onde você estiver. iOS e Android, sem custo adicional por agente.",
    ctaPrimary: "Começar 30 dias grátis",
    ctaSecondary: "Baixar agora",
    trust: [
      "Disponível na App Store e Google Play",
      "Funciona offline em visita",
      "Sincronização em tempo real com o painel web",
    ],
  },
  externalLinks: [
    {
      label: "Baixar na App Store",
      href: BROKER_APP_URLS.appStore,
      kind: "app-store",
    },
    {
      label: "Baixar no Google Play",
      href: BROKER_APP_URLS.playStore,
      kind: "play-store",
    },
  ],
  keyPoints: [
    {
      title: "Sua carteira completa, offline",
      body: "Consulte todos os imóveis cadastrados com fotos em alta resolução, ficha técnica, valores e disponibilidade — funciona mesmo sem internet em visitas no campo.",
    },
    {
      title: "Inbox unificado",
      body: "Atenda WhatsApp, e-mail e chat do site em um só lugar. Histórico completo do cliente, modelos de resposta rápida e sincronização automática com o CRM.",
    },
    {
      title: "Agenda inteligente",
      body: "Visitas, reuniões e follow-ups sincronizados com Google Calendar. Receba lembretes push e veja a rota do dia direto no mapa.",
    },
    {
      title: "Pipeline no bolso",
      body: "Acompanhe propostas, suba documentos, registre tarefas e atualize o estágio do negócio com 1 toque — sem precisar abrir o computador.",
    },
    {
      title: "Captação em campo",
      body: "Cadastre imóveis novos durante a visita: tire fotos, preencha a ficha e publique no catálogo em minutos. Aparece no painel web na hora.",
    },
    {
      title: "Notificações em tempo real",
      body: "Saiba na hora quando um lead chega, uma proposta avança ou um cliente responde no WhatsApp.",
    },
  ],
  keyPointsHeadline: {
    title: "O escritório do corretor no bolso, integrado ao Mylar Pro.",
    subtitle:
      "Tudo o que você faz no app aparece no painel da imobiliária na hora. E vice-versa.",
  },
  benefits: [
    "Mais visitas por dia com agenda otimizada e rotas integradas",
    "Resposta 3× mais rápida — inbox unificado evita troca de apps",
    "Nada se perde: toda interação fica registrada no CRM",
    "Funciona em iOS e Android, online ou offline",
    "Sem custo adicional por agente — vem com seu plano Mylar Pro",
  ],
  benefitsHeadline: {
    title: "Por que os corretores escolhem o app do Mylar Pro.",
    subtitle:
      "Não é um app à parte. É a mesma plataforma — pensada para quem passa o dia em campo.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description: "Que quer profissionalizar a operação sem virar refém do escritório.",
    },
    {
      label: "Equipes de imobiliária",
      description: "Que precisam de mobilidade para atender em campo e plantões.",
    },
    {
      label: "Captadores e plantonistas",
      description: "Que passam o dia visitando, fotografando e respondendo no WhatsApp.",
    },
    {
      label: "Forças de venda externa",
      description: "De incorporadoras, construtoras e loteadoras com equipe em stands e empreendimentos.",
    },
  ],
  audienceHeadline: {
    title: "Feito para quem trabalha fora do escritório.",
    subtitle: "Quem está em campo precisa de ferramenta que acompanha o ritmo.",
  },
  faq: [
    {
      q: "Preciso de internet para usar?",
      a: "Não. O app funciona offline — você consulta imóveis, registra visitas e atualiza dados, e tudo sincroniza assim que voltar a ter conexão.",
    },
    {
      q: "Funciona em iPhone e Android?",
      a: "Sim. Disponível na App Store e Google Play. A versão é a mesma — apenas adaptada ao sistema operacional.",
    },
    {
      q: "Os dados ficam sincronizados com o sistema web?",
      a: "Sim, em tempo real. Tudo o que você faz no app aparece no painel administrativo na hora, e vice-versa.",
    },
    {
      q: "Preciso de licença separada por corretor?",
      a: "Não. Cada agente cadastrado no seu plano Mylar Pro tem acesso ao app sem custo adicional.",
    },
    {
      q: "E se eu cancelar o teste?",
      a: "Sem multa, sem fidelidade. Seus dados ficam disponíveis por 30 dias para exportação.",
    },
  ],
  hubCard: {
    description:
      "Carteira, WhatsApp, agenda, pipeline e captação no celular. iOS e Android, com sincronização em tempo real.",
    highlights: [
      "App nativo iOS + Android",
      "Funciona offline em visitas",
      "Sem custo adicional por agente",
    ],
  },
};
