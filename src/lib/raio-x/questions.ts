export type Profile = "broker" | "agency";

export type QuestionId =
  | "fronts"
  | "mainFront"
  | "team"
  | "listings"
  | "leads"
  | "source"
  | "registry"
  | "crmName"
  | "response"
  | "goal"
  | "pain";

export type Answers = {
  profile?: Profile;
  fronts?: string[];
  mainFront?: string;
  team?: string;
  listings?: string;
  leads?: string;
  source?: string[];
  registry?: string[];
  crmName?: string;
  response?: string;
  goal?: string;
  pain?: string[];
};

export type Option = {
  value: string;
  label: string;
  hint?: string;
  exclusive?: boolean;
};

export type Question = {
  id: QuestionId;
  kind: "single" | "multi" | "text";
  title: string;
  help?: string;
  options?: Option[];
  placeholder?: string;
  optional?: boolean;
  maxSelections?: number;
};

export type MultiQuestionId = "fronts" | "source" | "registry" | "pain";

export const MULTI_QUESTION_IDS: MultiQuestionId[] = ["fronts", "source", "registry", "pain"];

const FRONT_OPTIONS: Option[] = [
  { value: "sale", label: "Venda" },
  { value: "rental", label: "Locação" },
  { value: "management", label: "Administração de imóveis" },
  { value: "launches", label: "Lançamentos" },
];

const DONT_KNOW: Option = { value: "unknown", label: "Não sei dizer" };

function frontsQuestion(): Question {
  return {
    id: "fronts",
    kind: "multi",
    title: "Com o que você trabalha hoje?",
    help: "Marque todas as frentes que fazem parte da operação.",
    options: FRONT_OPTIONS,
  };
}

function mainFrontQuestion(answers: Answers): Question {
  const selected = answers.fronts ?? [];
  return {
    id: "mainFront",
    kind: "single",
    title: "Qual dessas frentes pesa mais no seu resultado?",
    options: FRONT_OPTIONS.filter((option) => selected.includes(option.value)),
  };
}

function teamQuestion(profile: Profile): Question {
  if (profile === "broker") {
    return {
      id: "team",
      kind: "single",
      title: "Como você trabalha hoje?",
      options: [
        { value: "solo", label: "Sozinho", hint: "Atendo, capto e divulgo" },
        { value: "assistant", label: "Com assistente", hint: "Alguém me ajuda no dia a dia" },
        { value: "partners", label: "Com corretores parceiros", hint: "Divido negócios com frequência" },
      ],
    };
  }

  return {
    id: "team",
    kind: "single",
    title: "Quantas pessoas atendem clientes na imobiliária?",
    help: "Conte corretores e atendentes, sem a área administrativa.",
    options: [
      { value: "1-2", label: "1 a 2" },
      { value: "3-5", label: "3 a 5" },
      { value: "6-10", label: "6 a 10" },
      { value: "11-20", label: "11 a 20" },
      { value: "20+", label: "Mais de 20" },
    ],
  };
}

function listingsQuestion(): Question {
  return {
    id: "listings",
    kind: "single",
    title: "Quantos imóveis ativos há na carteira?",
    options: [
      { value: "0-20", label: "Até 20" },
      { value: "21-50", label: "21 a 50" },
      { value: "51-150", label: "51 a 150" },
      { value: "151-500", label: "151 a 500" },
      { value: "500+", label: "Mais de 500" },
      DONT_KNOW,
    ],
  };
}

function leadsQuestion(): Question {
  return {
    id: "leads",
    kind: "single",
    title: "Quantos contatos novos chegam por mês?",
    help: "Some WhatsApp, portais, redes, telefone e indicações.",
    options: [
      { value: "0-20", label: "Até 20" },
      { value: "21-50", label: "21 a 50" },
      { value: "51-150", label: "51 a 150" },
      { value: "150+", label: "Mais de 150" },
      DONT_KNOW,
    ],
  };
}

function sourceQuestion(): Question {
  return {
    id: "source",
    kind: "multi",
    title: "De onde vêm esses contatos?",
    help: "Marque todos os canais que trazem contatos hoje.",
    options: [
      { value: "referral", label: "Indicação" },
      { value: "portals", label: "Portais de imóveis" },
      { value: "social", label: "Redes sociais" },
      { value: "ads", label: "Anúncios pagos" },
      { value: "sign", label: "Placa e plantão" },
      { value: "site", label: "Site próprio" },
    ],
  };
}

function registryQuestion(profile: Profile): Question {
  return {
    id: "registry",
    kind: "multi",
    title: "Onde esses contatos ficam registrados?",
    help: "Marque todos os lugares que você usa.",
    options: [
      {
        value: "whatsapp",
        label: profile === "agency" ? "No WhatsApp de cada corretor" : "No meu WhatsApp",
      },
      { value: "sheet", label: "Em planilha ou caderno" },
      { value: "crm", label: "Em um CRM ou sistema" },
      { value: "none", label: "Não há um lugar fixo", exclusive: true },
    ],
  };
}

function crmNameQuestion(): Question {
  return {
    id: "crmName",
    kind: "text",
    title: "Qual sistema você usa?",
    help: "Ajuda a entender o que já está montado.",
    placeholder: "Nome do sistema",
    optional: true,
  };
}

function responseQuestion(): Question {
  return {
    id: "response",
    kind: "single",
    title: "Em quanto tempo um contato novo recebe a primeira resposta?",
    help: "Pense em um dia comum, não no melhor dia.",
    options: [
      { value: "5min", label: "Em até 5 minutos" },
      { value: "1h", label: "Em até 1 hora" },
      { value: "sameDay", label: "No mesmo dia" },
      { value: "nextDay", label: "No dia seguinte ou depois" },
      DONT_KNOW,
    ],
  };
}

function goalQuestion(profile: Profile): Question {
  return {
    id: "goal",
    kind: "single",
    title: "O que você mais quer alcançar nos próximos 90 dias?",
    options: [
      { value: "moreLeads", label: "Receber mais contatos" },
      { value: "closeMore", label: "Fechar mais com os contatos que já chegam" },
      {
        value: "organize",
        label: profile === "agency" ? "Organizar o atendimento e a equipe" : "Organizar minha rotina",
      },
      { value: "moreListings", label: "Captar mais imóveis" },
      { value: "stuckListings", label: "Girar imóveis parados" },
      { value: "presence", label: "Melhorar presença e imagem" },
    ],
  };
}

function painQuestion(profile: Profile): Question {
  const options: Option[] = [
    { value: "fewLeads", label: "Chegam poucos contatos" },
    { value: "coldLeads", label: "Contatos esfriam sem retorno" },
    { value: "noTime", label: "Falta tempo para dar conta de tudo" },
    { value: "noNumbers", label: "Não sei meus números" },
    { value: "weakListings", label: "A carteira não atrai o cliente que eu quero" },
  ];

  if (profile === "agency") {
    options.push({ value: "noStandard", label: "Cada corretor atende de um jeito" });
  }

  return {
    id: "pain",
    kind: "multi",
    title: "Quais são as maiores dificuldades hoje?",
    help: "Escolha até duas.",
    maxSelections: 2,
    options,
  };
}

export function buildPath(answers: Answers): Question[] {
  const profile = answers.profile;
  if (!profile) return [];

  const path: Question[] = [frontsQuestion()];

  if ((answers.fronts?.length ?? 0) > 1) {
    path.push(mainFrontQuestion(answers));
  }

  path.push(
    teamQuestion(profile),
    listingsQuestion(),
    leadsQuestion(),
    sourceQuestion(),
    registryQuestion(profile),
  );

  if (answers.registry?.includes("crm")) {
    path.push(crmNameQuestion());
  }

  path.push(responseQuestion(), goalQuestion(profile), painQuestion(profile));

  return path;
}

export function optionLabel(question: Question, value: string | undefined): string {
  return question.options?.find((option) => option.value === value)?.label ?? "";
}

export function answerLabels(question: Question, answers: Answers): string[] {
  const value = answers[question.id];
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.map((item) => optionLabel(question, item)).filter(Boolean);
}

export function toggleSelection(question: Question, current: string[], value: string): string[] {
  if (current.includes(value)) return current.filter((item) => item !== value);

  const option = question.options?.find((item) => item.value === value);
  if (option?.exclusive) return [value];

  const exclusiveValues = question.options?.filter((item) => item.exclusive).map((item) => item.value) ?? [];
  const kept = current.filter((item) => !exclusiveValues.includes(item));
  if (question.maxSelections && kept.length >= question.maxSelections) return kept;
  return [...kept, value];
}

export const PROFILE_LABEL: Record<Profile, string> = {
  broker: "Corretor autônomo",
  agency: "Imobiliária",
};

export const MEETING_MINUTES: Record<Profile, number> = {
  broker: 20,
  agency: 30,
};
