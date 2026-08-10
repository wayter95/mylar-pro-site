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
      "Calendário em dia, semana, mês e ano com as visitas de cada imóvel. Quadros kanban de tarefas para a equipe, ligados aos leads e às negociações que estão andando.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Dia, semana, mês e ano",
      "Kanban de tarefas da equipe",
      "Visita no app do corretor",
    ],
  },
  keyPoints: [
    {
      title: "Quatro visões do mesmo calendário",
      body: "Dia para executar, semana para se organizar, mês e ano para enxergar carga e sazonalidade. É a mesma agenda vista de quatro distâncias diferentes.",
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
      body: "A tarefa não vive solta: ela aponta para o lead ou a negociação de origem. Abrir a tarefa é chegar ao contexto, e abrir a negociação é ver o que ficou pendente nela.",
    },
    {
      title: "O corretor vê a agenda no celular",
      body: "A visita agendada aparece no aplicativo do corretor, com o imóvel e o horário. Ele sai para a rua com o dia inteiro na mão, sem depender de mensagem no WhatsApp.",
    },
    {
      title: "A agenda da equipe em um lugar",
      body: "O gestor enxerga o que está marcado para cada corretor no período. Distribuir uma visita nova deixa de exigir uma rodada de perguntas.",
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
    "Pendência ligada à negociação que a originou, sem contexto perdido",
    "Visão do gestor sobre a agenda de cada corretor no período",
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
      q: "Consigo ver a agenda de toda a equipe?",
      a: "Sim. O calendário mostra os compromissos do período por corretor, o que evita marcar duas visitas no mesmo horário para a mesma pessoa.",
    },
    {
      q: "Qual a diferença entre agenda e quadro de tarefas?",
      a: "A agenda guarda o que tem hora marcada, como a visita ao imóvel. O quadro de tarefas guarda o que precisa ser feito mas não tem horário, e avança por colunas até ser concluído.",
    },
    {
      q: "A tarefa fica ligada ao lead?",
      a: "Fica. A tarefa aponta para o lead ou a negociação que a originou, então quem a executa chega ao contexto sem procurar, e a negociação mostra o que está pendente nela.",
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
      "Calendário em dia, semana, mês e ano com as visitas de cada imóvel, e quadros kanban de tarefas da equipe ligados aos leads e às negociações.",
    highlights: [
      "Visita presa ao imóvel, com histórico",
      "Tarefa em kanban ligada à negociação",
      "Agenda do dia no celular do corretor",
    ],
  },
};
