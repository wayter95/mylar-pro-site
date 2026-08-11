import type { FeatureContent } from "./types";

export const schedule: FeatureContent = {
  slug: "schedule",
  label: "Agenda e tarefas",
  shortLabel: "Agenda",
  href: "/features/schedule",
  accent: "#EC4899",
  eyebrow: "Recurso · agenda e tarefas",
  hero: {
    title: "A visita marcada aparece na agenda ",
    titleHighlight: "e no celular do corretor",
    subtitle:
      "Calendário em dia, semana e mês com as visitas de cada imóvel, e quadros kanban para organizar as tarefas da equipe no mesmo sistema do funil.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Dia, semana e mês",
      "Kanban de tarefas da equipe",
      "Visita no app do corretor",
    ],
  },
  keyPoints: [
    {
      title: "Três visões do mesmo calendário. Dia para executar, semana para organizar a rota de visitas e mês para enxergar a carga do período.",
      body: "Dia para executar, semana para organizar a rota de visitas e mês para enxergar a carga do período. É a mesma agenda vista de três distâncias.",
    },
    {
      title: "A visita nasce presa ao imóvel",
      body: "O agendamento aponta para o imóvel visitado, então o histórico de visitas fica no cadastro dele. Dá para saber quantas vezes um imóvel foi mostrado antes de discutir o preço com o proprietário.",
    },
    {
      title: "Tarefa em kanban, não em lista de e-mails",
      body: "Os quadros de tarefa da equipe funcionam por colunas, com a tarefa passando de uma etapa para a outra. O que está travado fica visível sem ninguém precisar perguntar.",
    },
    {
      title: "Tarefa ligada ao lead e à negociação",
      body: "O quadro fica ao lado do funil, então a pendência da semana e a negociação em andamento vivem no mesmo sistema — sem uma lista de tarefas paralela em outro aplicativo.",
    },
    {
      title: "O corretor vê a agenda no celular",
      body: "A visita agendada aparece no aplicativo do corretor, com o imóvel e o horário. Ele sai para a rua com o dia inteiro na mão, sem depender de mensagem no WhatsApp.",
    },
    {
      title: "A agenda da equipe em um lugar",
      body: "Cada pessoa enxerga a própria agenda e os compromissos em que foi incluída como participante. Distribuir uma visita nova deixa de exigir uma rodada de perguntas.",
    },
  ],
  keyPointsHeadline: {
    title:
      "Visita esquecida não é falha de memória — é falha de onde ela estava anotada.",
    subtitle:
      "Quando o compromisso mora no bloco de notas de um e a tarefa no e-mail de outro, o cliente é quem descobre o furo.",
  },
  benefits: [
    "Visitas do dia na mão do corretor antes de ele sair do escritório",
    "Histórico de visitas por imóvel, útil na conversa com o proprietário",
    "Tarefa da equipe em kanban, com o travamento visível",
    "Pendência da equipe no mesmo sistema do funil e da carteira, sem contexto perdido",
    "Compromisso compartilhado aparece na agenda de todos os participantes no período",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "Menos confirmação por mensagem e menos visita que ninguém lembrou de fazer.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description:
        "A agenda do dia no celular, com o imóvel de cada visita e as tarefas que sobraram da semana.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "Quadros de tarefa por time, agenda de cada corretor visível ao gestor e distribuição de visitas sem conflito de horário.",
    },
    {
      label: "Administradora de carteira",
      description:
        "Rotinas recorrentes em quadro próprio: vistoria periódica, renovação de contrato e cobrança que precisa de acompanhamento.",
    },
  ],
  audienceHeadline: {
    title: "A agenda muda de tamanho conforme o time.",
    subtitle:
      "Sozinho, ela organiza o seu dia. Com equipe, ela mostra onde a operação está congestionada.",
  },
  connectsWith: [
    {
      label: "CRM e negociações",
      description: "A tarefa nasce da negociação e volta para ela.",
      href: "/features/crm",
    },
    {
      label: "Imóveis e empreendimentos",
      description: "A visita fica no histórico do imóvel visitado.",
      href: "/features/properties",
    },
    {
      label: "Canais de atendimento",
      description: "A confirmação da visita sai pelo WhatsApp do inbox.",
      href: "/features/channels",
    },
    {
      label: "MyLar Pro Brokers",
      description: "A agenda do dia no celular, durante a rua.",
      href: "/features/broker-app",
    },
    {
      label: "Vistorias",
      description: "Vistoria periódica agendada como compromisso da equipe.",
      href: "/features/inspections",
    },
  ],
  connectsWithHeadline: {
    title: "Agenda que não conversa com o funil é só um calendário.",
    subtitle:
      "Aqui o compromisso e a tarefa apontam para o lead, a negociação e o imóvel de origem.",
  },
  faq: [
    {
      q: "A visita agendada chega ao corretor?",
      a: "Sim. O compromisso aparece na agenda dele dentro do aplicativo do corretor, com o imóvel e o horário, para que ele saia com o dia já organizado.",
    },
    {
      q: "Como funciona a agenda compartilhada?",
      a: "Cada usuário vê os compromissos que criou e aqueles em que foi incluído como participante. Ao marcar uma visita com o corretor responsável, o evento aparece na agenda dele também.",
    },
    {
      q: "Qual a diferença entre agenda e quadro de tarefas?",
      a: "A agenda guarda o que tem hora marcada, como a visita ao imóvel. O quadro de tarefas guarda o que precisa ser feito mas não tem horário, e avança por colunas até ser concluído.",
    },
    {
      q: "O quadro de tarefas é separado do funil de leads?",
      a: "São dois quadros com propósitos diferentes: o funil move o lead entre estágios de negociação, e o quadro de tarefas organiza o trabalho da equipe. Os dois ficam no mesmo sistema, com as mesmas permissões.",
    },
    {
      q: "Dá para ver quantas visitas um imóvel recebeu?",
      a: "Sim. Como o agendamento fica preso ao imóvel, o histórico de visitas dele acumula no cadastro. É um dado concreto para a conversa sobre preço com o proprietário.",
    },
    {
      q: "Os quadros de tarefa dão para adaptar ao meu processo?",
      a: "Os quadros funcionam por colunas que representam as etapas do trabalho, então você organiza o fluxo do jeito que a sua equipe já trabalha, seja captação, locação ou pós-venda.",
    },
  ],
  hubCard: {
    description:
      "Calendário em dia, semana e mês com as visitas de cada imóvel, e quadros kanban de tarefas para a equipe.",
    highlights: [
      "Visita presa ao imóvel, com histórico",
      "Quadro de tarefas em kanban para a equipe",
      "Agenda do dia no celular do corretor",
    ],
  },
};
