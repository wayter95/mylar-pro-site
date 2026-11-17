import { TRACKED_PARAMS } from "@/lib/tracking/params";
import {
  PROFILE_LABEL,
  buildPath,
  optionLabel,
  type Answers,
  type Question,
  type QuestionId,
} from "./questions";
import { buildReading } from "./reading";

export type RaioXContact = {
  name: string;
  phone: string;
  email: string;
  brand: string;
  city: string;
  site: string;
  instagram: string;
  deliveryConsent: boolean;
  marketingConsent: boolean;
};

export type RaioXOrigin = {
  tracking: Record<string, string>;
  landingPage: string;
  referrer: string;
};

export type RaioXSubmission = {
  answers: Answers;
  contact: RaioXContact;
  origin: RaioXOrigin;
  finalScreen: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_TEXT_LENGTH = 200;

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_TEXT_LENGTH) : "";
}

function findQuestion(path: Question[], id: QuestionId): Question | undefined {
  return path.find((question) => question.id === id);
}

function singleLabel(path: Question[], answers: Answers, id: QuestionId): string {
  const question = findQuestion(path, id);
  return question ? optionLabel(question, answers[id] as string | undefined) : "";
}

export function validateSubmission(input: unknown): { data?: RaioXSubmission; error?: string } {
  if (!input || typeof input !== "object") return { error: "Dados inválidos." };

  const raw = input as Record<string, unknown>;
  const rawAnswers = (raw.answers ?? {}) as Record<string, unknown>;
  const rawContact = (raw.contact ?? {}) as Record<string, unknown>;
  const rawOrigin = (raw.origin ?? {}) as Record<string, unknown>;

  const profile = rawAnswers.profile;
  if (profile !== "broker" && profile !== "agency") {
    return { error: "Informe se você é corretor ou responde por uma imobiliária." };
  }

  const answers: Answers = { profile };
  const fronts = Array.isArray(rawAnswers.fronts)
    ? rawAnswers.fronts.filter((item): item is string => typeof item === "string")
    : [];
  answers.fronts = fronts;

  const singleIds: QuestionId[] = [
    "mainFront",
    "team",
    "listings",
    "leads",
    "source",
    "registry",
    "response",
    "goal",
    "pain",
  ];
  for (const id of singleIds) {
    const value = rawAnswers[id];
    if (typeof value === "string") (answers as Record<string, unknown>)[id] = value;
  }
  answers.crmName = cleanText(rawAnswers.crmName);

  const path = buildPath(answers);
  for (const question of path) {
    if (question.kind === "text") continue;
    const allowed = question.options?.map((option) => option.value) ?? [];

    if (question.kind === "multi") {
      if (fronts.length === 0 || fronts.some((value) => !allowed.includes(value))) {
        return { error: "Responda com o que você trabalha hoje." };
      }
      continue;
    }

    const value = answers[question.id] as string | undefined;
    if (!value || !allowed.includes(value)) {
      return { error: `Falta responder: ${question.title}` };
    }
  }

  const contact: RaioXContact = {
    name: cleanText(rawContact.name),
    phone: cleanText(rawContact.phone),
    email: cleanText(rawContact.email),
    brand: cleanText(rawContact.brand),
    city: cleanText(rawContact.city),
    site: cleanText(rawContact.site),
    instagram: cleanText(rawContact.instagram),
    deliveryConsent: rawContact.deliveryConsent === true,
    marketingConsent: rawContact.marketingConsent === true,
  };

  if (contact.name.length < 2) return { error: "Informe seu nome." };
  const phoneDigits = contact.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    return { error: "Informe o WhatsApp com DDD." };
  }
  if (!EMAIL_PATTERN.test(contact.email)) return { error: "Informe um e-mail válido." };
  if (contact.brand.length < 2) return { error: "Informe o nome da imobiliária ou da sua marca." };
  if (contact.city.length < 2) return { error: "Informe a cidade principal." };
  if (!contact.deliveryConsent) {
    return { error: "Precisamos da sua permissão para enviar o Raio X." };
  }

  const rawTracking = (rawOrigin.tracking ?? {}) as Record<string, unknown>;
  const tracking: Record<string, string> = {};
  for (const key of TRACKED_PARAMS) {
    const value = cleanText(rawTracking[key]);
    if (value) tracking[key] = value;
  }

  return {
    data: {
      answers,
      contact,
      origin: {
        tracking,
        landingPage: cleanText(rawOrigin.landingPage),
        referrer: cleanText(rawOrigin.referrer),
      },
      finalScreen: cleanText(raw.finalScreen) || "Leitura inicial",
    },
  };
}

export function buildCognizyPayload(
  submission: RaioXSubmission,
  submittedAt: Date,
): Record<string, string> {
  const { answers, contact, origin } = submission;
  const path = buildPath(answers);
  const frontsQuestion = findQuestion(path, "fronts");
  const frontLabels = frontsQuestion
    ? (answers.fronts ?? []).map((value) => optionLabel(frontsQuestion, value)).filter(Boolean)
    : [];
  const mainFront = singleLabel(path, answers, "mainFront") || frontLabels[0] || "";
  const nameParts = contact.name.split(/\s+/).filter(Boolean);
  const reading = buildReading(answers);
  const profileLabel = answers.profile ? PROFILE_LABEL[answers.profile] : "";

  const originParts = Object.entries(origin.tracking).map(([key, value]) => `${key}=${value}`);
  if (origin.landingPage) originParts.push(`página=${origin.landingPage}`);
  if (origin.referrer) originParts.push(`veio de=${origin.referrer}`);

  const contextLines = [
    `Raio X: ${profileLabel} em ${contact.city}.`,
    `Frentes: ${frontLabels.join(", ")}${frontLabels.length > 1 ? ` (principal: ${mainFront})` : ""}.`,
    `Quem atende: ${singleLabel(path, answers, "team")}.`,
    `Imóveis ativos: ${singleLabel(path, answers, "listings")}.`,
    `Contatos por mês: ${singleLabel(path, answers, "leads")}, a maior parte por ${singleLabel(path, answers, "source")}.`,
    `Registro dos contatos: ${singleLabel(path, answers, "registry")}${answers.crmName ? ` (${answers.crmName})` : ""}.`,
    `Primeira resposta: ${singleLabel(path, answers, "response")}.`,
    `Objetivo em 90 dias: ${singleLabel(path, answers, "goal")}.`,
    `Maior dificuldade: ${singleLabel(path, answers, "pain")}.`,
    `Ponto de atenção da leitura inicial: ${reading.attention.title}.`,
  ];
  if (originParts.length > 0) contextLines.push(`Origem: ${originParts.join("; ")}.`);

  const consentDate = submittedAt.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });

  return {
    nome: nameParts[0] ?? "",
    sobrenome: nameParts.slice(1).join(" "),
    email: contact.email,
    telefone: contact.phone,
    "nome-imobiliaria": contact.brand,
    cidade: contact.city,
    site: contact.site,
    instagram: contact.instagram,
    "rx-perfil": profileLabel,
    operations: frontLabels.join(", "),
    "rx-frente-principal": mainFront,
    "team-size": singleLabel(path, answers, "team"),
    "rx-imoveis-ativos": singleLabel(path, answers, "listings"),
    "rx-contatos-mes": singleLabel(path, answers, "leads"),
    "rx-origem-contatos": singleLabel(path, answers, "source"),
    "rx-registro-contatos": singleLabel(path, answers, "registry"),
    "sistema-atual": answers.crmName ?? "",
    "rx-tempo-resposta": singleLabel(path, answers, "response"),
    "rx-objetivo-90d": singleLabel(path, answers, "goal"),
    "rx-dificuldade": singleLabel(path, answers, "pain"),
    context: contextLines.join("\n"),
    origem: "Raio X",
    "rx-tela-final": submission.finalScreen,
    "rx-consent-marketing": contact.marketingConsent ? `Sim, em ${consentDate}` : "Não",
  };
}
