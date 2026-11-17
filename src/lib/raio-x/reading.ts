import { buildPath, optionLabel, type Answers, type QuestionId } from "./questions";

export type DimensionState = "read" | "partial" | "pending" | "research";

export type DimensionReading = {
  key: "service" | "management" | "listings" | "presence" | "relationship";
  name: string;
  state: DimensionState;
  note: string;
};

export type Reading = {
  told: { label: string; value: string }[];
  dimensions: DimensionReading[];
  attention: { title: string; body: string };
  action: string;
  openQuestions: string[];
};

const HIGH_VOLUMES = ["51-150", "150+"];

const RESPONSE_PHRASE: Record<string, string> = {
  "5min": "em até 5 minutos",
  "1h": "em até 1 hora",
  sameDay: "no mesmo dia",
  nextDay: "no dia seguinte ou depois",
};

const SOURCE_PHRASE: Record<string, string> = {
  referral: "indicação",
  portals: "portais de imóveis",
  social: "redes sociais",
  ads: "anúncios pagos",
  sign: "placa e plantão",
  site: "site próprio",
};

const REGISTRY_PHRASE: Record<string, string> = {
  whatsapp: "no WhatsApp",
  sheet: "em planilha ou caderno",
  crm: "em um sistema",
  none: "sem um lugar fixo",
};

const TOLD_FIELDS: { id: QuestionId; label: string }[] = [
  { id: "mainFront", label: "Frente principal" },
  { id: "team", label: "Quem atende" },
  { id: "listings", label: "Imóveis ativos" },
  { id: "leads", label: "Contatos por mês" },
  { id: "goal", label: "Objetivo em 90 dias" },
  { id: "pain", label: "Maior dificuldade" },
];

function responsePhrase(answers: Answers): string {
  return RESPONSE_PHRASE[answers.response ?? ""] ?? "em um prazo não informado";
}

function registryPhrase(answers: Answers): string {
  return REGISTRY_PHRASE[answers.registry ?? ""] ?? "em local não informado";
}

function sourcePhrase(answers: Answers): string {
  return SOURCE_PHRASE[answers.source ?? ""] ?? "um canal";
}

function worksAlone(answers: Answers): boolean {
  return answers.profile === "broker" && answers.team !== "partners";
}

function hasSmallService(answers: Answers): boolean {
  return worksAlone(answers) || answers.team === "1-2";
}

function toldSummary(answers: Answers): { label: string; value: string }[] {
  const path = buildPath(answers);
  const fronts = path.find((question) => question.id === "fronts");
  const singleFront =
    fronts && answers.fronts?.length === 1 ? optionLabel(fronts, answers.fronts[0]) : "";

  return TOLD_FIELDS.map(({ id, label }) => {
    const question = path.find((item) => item.id === id);
    const value = question ? optionLabel(question, answers[id] as string | undefined) : "";
    return { label, value: id === "mainFront" && !value ? singleFront : value };
  }).filter((item) => item.value);
}

function serviceDimension(answers: Answers): DimensionReading {
  if (answers.response === "unknown") {
    return {
      key: "service",
      name: "Atendimento e acompanhamento",
      state: "partial",
      note: `Você não soube dizer o tempo de primeira resposta. Os contatos ficam ${registryPhrase(answers)}.`,
    };
  }

  return {
    key: "service",
    name: "Atendimento e acompanhamento",
    state: "read",
    note: `Primeira resposta ${responsePhrase(answers)}. Os contatos ficam ${registryPhrase(answers)}.`,
  };
}

function managementDimension(answers: Answers): DimensionReading {
  const unknown: string[] = [];
  if (answers.leads === "unknown") unknown.push("volume de contatos");
  if (answers.response === "unknown") unknown.push("tempo de resposta");
  if (answers.listings === "unknown") unknown.push("tamanho da carteira");

  const note =
    unknown.length > 0
      ? `Você não soube dizer: ${unknown.join(", ")}. Falta saber quais números você acompanha toda semana.`
      : "Você informou volume de contatos, tempo de resposta e carteira. Falta saber quais desses números são acompanhados toda semana.";

  return {
    key: "management",
    name: "Gestão e indicadores",
    state: "partial",
    note,
  };
}

function attention(answers: Answers): { title: string; body: string; action: string } {
  const response = answers.response ?? "";
  const registry = answers.registry ?? "";
  const leads = answers.leads ?? "";
  const wantsMoreLeads = answers.goal === "moreLeads";

  if (response === "nextDay") {
    const goalLine = wantsMoreLeads
      ? "Como seu objetivo é receber mais contatos, esse número ajuda a decidir se o primeiro passo é trazer mais ou aproveitar melhor os que já chegam."
      : "Vale conferir quantos desses contatos ainda respondem quando o retorno chega.";

    return {
      title: "Tempo até a primeira resposta",
      body: `Pelas suas respostas, um contato novo é respondido no dia seguinte ou depois. ${goalLine}`,
      action:
        "Nos próximos 7 dias, anote a hora em que cada contato chegou e a hora da primeira resposta.",
    };
  }

  if (response === "sameDay") {
    return {
      title: "Quanto tempo é “no mesmo dia”",
      body: "Você disse que um contato novo é respondido no mesmo dia. Isso pode ser uma hora ou o fim do expediente, e só medindo dá para saber qual dos dois acontece mais.",
      action:
        "Nos próximos 7 dias, anote a hora em que cada contato chegou e a hora da primeira resposta.",
    };
  }

  if (response === "unknown" || leads === "unknown") {
    return {
      title: "Números que você não soube dizer",
      body: "Sem saber quantos contatos chegam ou em quanto tempo são respondidos, fica difícil separar falta de contato de contato perdido no caminho.",
      action:
        "Durante uma semana, registre em um só lugar cada contato novo, com o dia, a origem e quando foi respondido.",
    };
  }

  if (registry === "whatsapp" && answers.profile === "agency" && answers.team !== "1-2") {
    return {
      title: "Contatos no WhatsApp de cada corretor",
      body: "Com os contatos no aparelho de cada pessoa, a imobiliária não enxerga quem foi atendido nem quem aguarda retorno.",
      action:
        "Peça a cada corretor a lista dos contatos em aberto desta semana e junte tudo em um único arquivo.",
    };
  }

  if (registry === "none") {
    return {
      title: "Contatos sem um lugar fixo",
      body: "Sem um lugar único para registrar quem entrou em contato, os retornos dependem da memória de quem atendeu.",
      action:
        "Escolha um único lugar, mesmo que seja uma planilha simples, e registre nele todo contato novo durante duas semanas.",
    };
  }

  if (HIGH_VOLUMES.includes(leads) && hasSmallService(answers)) {
    return {
      title: "Volume de contatos e capacidade de atender",
      body: "Chega um volume alto para poucas pessoas atendendo. Vale verificar quantos contatos ficam sem um segundo retorno.",
      action:
        "Separe os contatos dos últimos 15 dias em três grupos: conversando, aguardando retorno seu e sem resposta.",
    };
  }

  if (leads === "0-20") {
    return {
      title: "Poucos contatos entrando",
      body: `Chegam até 20 contatos por mês, a maior parte por ${sourcePhrase(answers)}. Com esse volume, vale saber o destino de cada um antes de decidir onde investir.`,
      action: "Liste os últimos 20 contatos e marque o que aconteceu com cada um.",
    };
  }

  return {
    title: "Nada se destaca só pelas respostas",
    body: "Pelo que você respondeu até aqui, nenhum ponto salta aos olhos. As prioridades vão sair da análise do que é público e das dimensões que ainda faltam completar.",
    action:
      "Anote a origem de cada contato novo por duas semanas. Esse registro ajuda qualquer que seja a prioridade.",
  };
}

export function buildReading(answers: Answers): Reading {
  const { title, body, action } = attention(answers);

  return {
    told: toldSummary(answers),
    dimensions: [
      serviceDimension(answers),
      managementDimension(answers),
      {
        key: "listings",
        name: "Captação e carteira",
        state: "pending",
        note: "Falta saber sobre exclusividade, imóveis parados e rotina de captação.",
      },
      {
        key: "presence",
        name: "Presença digital e confiança",
        state: "research",
        note: "Vamos olhar seu site e seus perfis públicos antes de dizer qualquer coisa.",
      },
      {
        key: "relationship",
        name: "Relacionamento e indicação",
        state: "pending",
        note: "Falta saber o que acontece depois do fechamento e de onde vêm as indicações.",
      },
    ],
    attention: { title, body },
    action,
    openQuestions: [
      "Quanto tempo e orçamento você tem para executar mudanças",
      worksAlone(answers)
        ? "O que depende só de você e o que poderia sair das suas mãos"
        : "Quem seria responsável por cada ação",
      "O que já foi tentado e não funcionou",
    ],
  };
}
