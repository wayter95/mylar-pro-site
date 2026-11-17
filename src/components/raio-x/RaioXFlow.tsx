"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icons } from "@/lib/icons";
import { extractTrackingParams } from "@/lib/tracking/params";
import {
  buildPath,
  type Answers,
  type Profile,
  type Question,
  type QuestionId,
} from "@/lib/raio-x/questions";
import { RaioXResult, type Contact } from "./RaioXResult";
import "./raio-x.css";

type Stage = "intro" | "contact" | "questions" | "closing" | "result";

const EMPTY_CONTACT: Contact = {
  name: "",
  phone: "",
  email: "",
  brand: "",
  city: "",
  site: "",
  instagram: "",
  deliveryConsent: false,
  marketingConsent: false,
};

const SAMPLE_ANSWERS: Answers = {
  profile: "agency",
  fronts: ["sale", "rental"],
  mainFront: "sale",
  team: "6-10",
  listings: "151-500",
  leads: "51-150",
  source: "portals",
  registry: "whatsapp",
  response: "sameDay",
  goal: "moreLeads",
  pain: "coldLeads",
};

const SAMPLE_CONTACT: Contact = {
  name: "Marina",
  phone: "(61) 99999-0000",
  email: "marina@exemplo.com.br",
  brand: "Imobiliária Exemplo",
  city: "Brasília",
  site: "",
  instagram: "",
  deliveryConsent: true,
  marketingConsent: false,
};

const PROFILE_CHOICES: { value: Profile; title: string; detail: string }[] = [
  {
    value: "broker",
    title: "Sou corretor autônomo",
    detail: "Olhamos sua rotina, sua carteira e de onde vêm seus clientes.",
  },
  {
    value: "agency",
    title: "Respondo por uma imobiliária",
    detail: "Olhamos atendimento, equipe, carteira e gestão.",
  },
];

const INPUT_CLASS =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-slate-400 transition focus-visible:border-[#2facde] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2facde]";

const PRIMARY_BUTTON_CLASS =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2facde] px-7 py-3.5 text-base font-bold text-[#052330] transition hover:bg-[#54c0ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-400 sm:w-auto";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const CONTACT_FIELD_IDS: Record<string, string> = { name: "rx-name", phone: "rx-phone" };

const CLOSING_FIELD_IDS: Record<string, string> = {
  email: "rx-email",
  brand: "rx-brand",
  city: "rx-city",
  deliveryConsent: "rx-consent-delivery",
};

function focusFirstInvalid(errors: Record<string, string>, fieldIds: Record<string, string>): boolean {
  const firstKey = Object.keys(fieldIds).find((key) => errors[key]);
  if (!firstKey) return false;
  document.getElementById(fieldIds[firstKey])?.focus();
  return true;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function RaioXFlow({ showExample = false }: { showExample?: boolean }) {
  const [stage, setStage] = useState<Stage>(showExample ? "result" : "intro");
  const [answers, setAnswers] = useState<Answers>(showExample ? SAMPLE_ANSWERS : {});
  const [contact, setContact] = useState<Contact>(showExample ? SAMPLE_CONTACT : EMPTY_CONTACT);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const path = buildPath(answers);
  const question = path[questionIndex];
  const totalQuestions = path.length + 1;
  const stepKey = stage === "questions" ? `question-${question?.id}` : stage;

  useEffect(() => {
    if (stage === "intro") return;
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [stepKey, stage]);

  function restart() {
    setAnswers({});
    setContact(EMPTY_CONTACT);
    setQuestionIndex(0);
    setErrors({});
    setSubmitError("");
    setSubmitted(false);
    setStage("intro");
  }

  function chooseProfile(profile: Profile) {
    setStartedAt(Date.now());
    setAnswers({ profile });
    setStage("contact");
  }

  function submitContact() {
    const next: Record<string, string> = {};
    if (contact.name.trim().length < 2) next.name = "Diga como podemos chamar você.";
    if (contact.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Informe o WhatsApp com DDD, por exemplo (61) 99999-0000.";
    }
    setErrors(next);
    if (focusFirstInvalid(next, CONTACT_FIELD_IDS)) return;
    setQuestionIndex(0);
    setStage("questions");
  }

  function advanceFrom(updated: Answers, currentId: QuestionId) {
    const updatedPath = buildPath(updated);
    const currentPosition = updatedPath.findIndex((item) => item.id === currentId);
    const nextIndex = currentPosition + 1;
    if (nextIndex >= updatedPath.length) {
      setStage("closing");
      return;
    }
    setQuestionIndex(nextIndex);
  }

  function answerSingle(currentId: QuestionId, value: string) {
    const updated = { ...answers, [currentId]: value };
    setAnswers(updated);
    window.setTimeout(() => advanceFrom(updated, currentId), 220);
  }

  function toggleMulti(value: string) {
    setAnswers((previous) => {
      const current = previous.fronts ?? [];
      const fronts = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      const mainFront = fronts.includes(previous.mainFront ?? "") ? previous.mainFront : undefined;
      return { ...previous, fronts, mainFront };
    });
  }

  function goBack() {
    setErrors({});
    if (stage === "contact") {
      setStage("intro");
      return;
    }
    if (stage === "closing") {
      setQuestionIndex(path.length - 1);
      setStage("questions");
      return;
    }
    if (questionIndex === 0) {
      setStage("contact");
      return;
    }
    setQuestionIndex(questionIndex - 1);
  }

  async function submitClosing() {
    const next: Record<string, string> = {};
    if (!isValidEmail(contact.email)) next.email = "Confira o e-mail, parece faltar alguma parte.";
    if (contact.brand.trim().length < 2) next.brand = "Informe o nome que seus clientes conhecem.";
    if (contact.city.trim().length < 2) next.city = "Informe a cidade principal de atuação.";
    if (!contact.deliveryConsent) {
      next.deliveryConsent = "Precisamos da sua permissão para enviar o Raio X.";
    }
    setErrors(next);
    if (focusFirstInvalid(next, CLOSING_FIELD_IDS)) return;

    setSending(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/raio-x", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          contact,
          origin: {
            tracking: extractTrackingParams(new URLSearchParams(window.location.search)),
            landingPage: window.location.pathname,
            referrer: document.referrer,
          },
          finalScreen: "Leitura inicial",
          _honeypot: honeypot,
          _formLoadTime: startedAt,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setSubmitError(
          result?.error ?? "Não foi possível registrar suas respostas. Tente novamente.",
        );
        return;
      }

      setSubmitted(true);
      setStage("result");
    } catch {
      setSubmitError("Sem conexão no momento. Confira sua internet e tente de novo.");
    } finally {
      setSending(false);
    }
  }

  if (stage === "result") {
    return (
      <div className="rx-root">
        <RaioXResult answers={answers} contact={contact} submitted={submitted} onRestart={restart} />
      </div>
    );
  }

  const progress =
    stage === "intro"
      ? 0
      : stage === "contact"
        ? 1 / (totalQuestions + 2)
        : stage === "questions"
          ? (questionIndex + 2) / (totalQuestions + 2)
          : (totalQuestions + 1) / (totalQuestions + 2);

  return (
    <div className="rx-root rx-ground flex min-h-dvh flex-col text-white">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 pt-6 sm:px-8 sm:pt-8">
        <Link href="/" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2facde]">
          <Image
            src="/images/logo-white.svg"
            alt="MyLar Pro"
            width={120}
            height={32}
            className="h-7 w-auto sm:h-8"
            priority
          />
        </Link>
        {stage === "intro" ? (
          <p className="text-sm font-medium text-slate-300">Cerca de 10 perguntas, poucos minutos</p>
        ) : (
          <p className="text-sm font-medium text-slate-300" aria-live="polite">
            {stage === "questions"
              ? questionIndex === path.length - 1
                ? "Última pergunta"
                : path.length - questionIndex === 2
                  ? "Falta 1 pergunta"
                  : `Faltam ${path.length - questionIndex - 1} perguntas`
              : stage === "contact"
                ? "Seu contato"
                : "Último passo"}
          </p>
        )}
      </header>

      <div className="mx-auto mt-5 h-0.5 w-full max-w-5xl px-5 sm:px-8" aria-hidden="true">
        <div className="h-full overflow-hidden rounded-full bg-white/10">
          <div
            className="rx-progress h-full bg-[#2facde]"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-12 pt-7 sm:px-8 sm:pt-12">
        {stage === "intro" && <Intro onChoose={chooseProfile} />}

        {stage !== "intro" && (
          <div key={stepKey} className="rx-step w-full max-w-2xl">
            <button
              type="button"
              onClick={goBack}
              className="mb-8 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-slate-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2facde]"
            >
              <Icons.chevronRight className="size-4 rotate-180" aria-hidden="true" />
              Voltar
            </button>

            {stage === "contact" && (
              <form
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  submitContact();
                }}
              >
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-3xl leading-tight font-extrabold tracking-[-0.025em] text-balance outline-none sm:text-4xl"
                >
                  Como podemos chamar você?
                </h1>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">
                  O WhatsApp serve para enviar o seu Raio X e combinar a conversa.
                </p>

                <div className="mt-8 grid gap-5">
                  <Field label="Seu nome" htmlFor="rx-name" error={errors.name}>
                    <input
                      id="rx-name"
                      type="text"
                      autoComplete="given-name"
                      value={contact.name}
                      onChange={(event) => setContact({ ...contact, name: event.target.value })}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "rx-name-error" : undefined}
                      className={INPUT_CLASS}
                    />
                  </Field>
                  <Field label="Seu WhatsApp" htmlFor="rx-phone" error={errors.phone}>
                    <input
                      id="rx-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="(00) 00000-0000"
                      value={contact.phone}
                      onChange={(event) =>
                        setContact({ ...contact, phone: formatPhone(event.target.value) })
                      }
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "rx-phone-error" : undefined}
                      className={INPUT_CLASS}
                    />
                  </Field>
                </div>

                <button type="submit" className={`${PRIMARY_BUTTON_CLASS} mt-8`}>
                  Continuar
                  <Icons.arrowRight className="size-5" aria-hidden="true" />
                </button>
              </form>
            )}

            {stage === "questions" && question && (
              <QuestionStep
                question={question}
                answers={answers}
                headingRef={headingRef}
                onSingle={(value) => answerSingle(question.id, value)}
                onToggle={toggleMulti}
                onText={(value) => setAnswers({ ...answers, crmName: value })}
                onContinue={() => advanceFrom(answers, question.id)}
              />
            )}

            {stage === "closing" && (
              <form
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  submitClosing();
                }}
              >
                <h1
                  ref={headingRef}
                  tabIndex={-1}
                  className="text-3xl leading-tight font-extrabold tracking-[-0.025em] text-balance outline-none sm:text-4xl"
                >
                  Para onde enviamos o seu Raio X?
                </h1>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">
                  O Raio X chega também por e-mail, para você guardar. Com o site e o
                  Instagram, a análise do que seus clientes veem fica mais completa.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Seu e-mail" htmlFor="rx-email" error={errors.email}>
                      <input
                        id="rx-email"
                        type="email"
                        autoComplete="email"
                        value={contact.email}
                        onChange={(event) => setContact({ ...contact, email: event.target.value })}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "rx-email-error" : undefined}
                        className={INPUT_CLASS}
                      />
                    </Field>
                  </div>
                  <Field
                    label={answers.profile === "agency" ? "Nome da imobiliária" : "Seu nome profissional"}
                    htmlFor="rx-brand"
                    error={errors.brand}
                  >
                    <input
                      id="rx-brand"
                      type="text"
                      autoComplete="organization"
                      value={contact.brand}
                      onChange={(event) => setContact({ ...contact, brand: event.target.value })}
                      aria-invalid={Boolean(errors.brand)}
                      aria-describedby={errors.brand ? "rx-brand-error" : undefined}
                      className={INPUT_CLASS}
                    />
                  </Field>
                  <Field label="Cidade principal" htmlFor="rx-city" error={errors.city}>
                    <input
                      id="rx-city"
                      type="text"
                      autoComplete="address-level2"
                      value={contact.city}
                      onChange={(event) => setContact({ ...contact, city: event.target.value })}
                      aria-invalid={Boolean(errors.city)}
                      aria-describedby={errors.city ? "rx-city-error" : undefined}
                      className={INPUT_CLASS}
                    />
                  </Field>
                  <Field label="Site" htmlFor="rx-site" optional>
                    <input
                      id="rx-site"
                      type="url"
                      inputMode="url"
                      placeholder="seusite.com.br"
                      value={contact.site}
                      onChange={(event) => setContact({ ...contact, site: event.target.value })}
                      className={INPUT_CLASS}
                    />
                  </Field>
                  <Field label="Instagram" htmlFor="rx-instagram" optional>
                    <input
                      id="rx-instagram"
                      type="text"
                      placeholder="@seuperfil"
                      value={contact.instagram}
                      onChange={(event) => setContact({ ...contact, instagram: event.target.value })}
                      className={INPUT_CLASS}
                    />
                  </Field>
                </div>

                <div className="mt-8 grid gap-4">
                  <Consent
                    id="rx-consent-delivery"
                    checked={contact.deliveryConsent}
                    onChange={(checked) => setContact({ ...contact, deliveryConsent: checked })}
                    error={errors.deliveryConsent}
                  >
                    Quero receber meu Raio X e os avisos da conversa por WhatsApp e e-mail.
                  </Consent>
                  <Consent
                    id="rx-consent-marketing"
                    checked={contact.marketingConsent}
                    onChange={(checked) => setContact({ ...contact, marketingConsent: checked })}
                  >
                    Aceito receber também conteúdos e novidades do MyLar Pro. Opcional.
                  </Consent>
                </div>

                <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400">
                  Seus dados são usados para preparar e entregar o Raio X. Veja a{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-slate-200 underline decoration-[#2facde] underline-offset-4 hover:text-white"
                  >
                    política de privacidade
                  </Link>
                  .
                </p>

                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="rx-company-url">Não preencha este campo</label>
                  <input
                    id="rx-company-url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>

                {submitError && (
                  <p role="alert" className="mt-6 text-base font-medium text-amber-300">
                    {submitError}
                  </p>
                )}

                <button type="submit" disabled={sending} className={`${PRIMARY_BUTTON_CLASS} mt-8`}>
                  {sending ? "Enviando suas respostas" : "Enviar respostas"}
                  <Icons.arrowRight className="size-5" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function Intro({ onChoose }: { onChoose: (profile: Profile) => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <h1 className="max-w-4xl text-[2rem] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl sm:leading-[1.04] lg:text-6xl">
        Veja onde sua operação pode estar perdendo negócios.
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-xl">
        O Raio X MyLar é um diagnóstico gratuito do seu negócio imobiliário, com as
        prioridades dos próximos 90 dias.
      </p>

      <h2 className="mt-7 text-lg font-bold tracking-[-0.01em] sm:mt-10 sm:text-2xl">
        Para começar, quem é você?
      </h2>
      <div className="mt-3 grid gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4">
        {PROFILE_CHOICES.map((choice) => (
          <button
            key={choice.value}
            type="button"
            onClick={() => onChoose(choice.value)}
            className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-left transition duration-300 hover:border-[#2facde] hover:bg-[#2facde]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2facde] sm:min-h-40 sm:p-7"
          >
            <span className="flex items-start justify-between gap-4">
              <span className="text-xl leading-tight font-extrabold tracking-[-0.02em] sm:text-3xl">
                {choice.title}
              </span>
              <Icons.arrowRight
                className="mt-1 size-6 shrink-0 text-[#2facde] transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
            <span className="mt-2 max-w-sm text-sm leading-relaxed text-slate-300 sm:mt-6 sm:text-base">
              {choice.detail}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-slate-400">
        Trabalha em incorporadora?{" "}
        <Link
          href="/contact"
          className="font-semibold text-slate-200 underline decoration-[#2facde] underline-offset-4 hover:text-white"
        >
          Fale com a equipe
        </Link>
        .
      </p>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-400">
        Preparado com IA a partir das suas respostas e do que é público sobre o seu
        negócio, e revisado pela equipe MyLar antes de chegar a você.
      </p>
    </div>
  );
}

function QuestionStep({
  question,
  answers,
  headingRef,
  onSingle,
  onToggle,
  onText,
  onContinue,
}: {
  question: Question;
  answers: Answers;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onSingle: (value: string) => void;
  onToggle: (value: string) => void;
  onText: (value: string) => void;
  onContinue: () => void;
}) {
  const selectedMulti = answers.fronts ?? [];
  const selectedSingle = answers[question.id] as string | undefined;

  return (
    <div>
      <h1
        ref={headingRef}
        tabIndex={-1}
        id="rx-question-title"
        className="text-3xl leading-tight font-extrabold tracking-[-0.025em] text-balance outline-none sm:text-4xl"
      >
        {question.title}
      </h1>
      {question.help && (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-300">{question.help}</p>
      )}

      {question.kind === "text" && (
        <form
          className="mt-8"
          onSubmit={(event) => {
            event.preventDefault();
            onContinue();
          }}
        >
          <label htmlFor="rx-text" className="sr-only">
            {question.title}
          </label>
          <input
            id="rx-text"
            type="text"
            placeholder={question.placeholder}
            value={answers.crmName ?? ""}
            onChange={(event) => onText(event.target.value)}
            className={INPUT_CLASS}
          />
          <button type="submit" className={`${PRIMARY_BUTTON_CLASS} mt-6`}>
            {(answers.crmName ?? "").trim() ? "Continuar" : "Pular esta pergunta"}
            <Icons.arrowRight className="size-5" aria-hidden="true" />
          </button>
        </form>
      )}

      {question.kind !== "text" && (
        <div
          role="group"
          aria-labelledby="rx-question-title"
          className="mt-8 grid gap-3"
        >
          {question.options?.map((option) => {
            const selected =
              question.kind === "multi"
                ? selectedMulti.includes(option.value)
                : selectedSingle === option.value;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  question.kind === "multi" ? onToggle(option.value) : onSingle(option.value)
                }
                className={`flex items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2facde] ${
                  selected
                    ? "border-[#2facde] bg-[#2facde]/15"
                    : "border-white/15 bg-white/[0.04] hover:border-white/40 hover:bg-white/[0.07]"
                }`}
              >
                <span>
                  <span className="block text-lg font-semibold">{option.label}</span>
                  {option.hint && (
                    <span className="mt-0.5 block text-sm text-slate-300">{option.hint}</span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex size-6 shrink-0 items-center justify-center border transition ${
                    question.kind === "multi" ? "rounded-md" : "rounded-full"
                  } ${selected ? "border-[#2facde] bg-[#2facde] text-[#052330]" : "border-white/30"}`}
                >
                  {selected && <Icons.check className="size-4" strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {question.kind === "multi" && (
        <button
          type="button"
          onClick={onContinue}
          disabled={selectedMulti.length === 0}
          className={`${PRIMARY_BUTTON_CLASS} mt-8`}
        >
          Continuar
          <Icons.arrowRight className="size-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-sm font-semibold text-slate-100">
        {label}
        {optional && <span className="font-medium text-slate-400">Opcional</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-sm font-medium text-amber-300">
          {error}
        </p>
      )}
    </div>
  );
}

function Consent({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-base leading-snug text-slate-200">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 rounded accent-[#2facde] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2facde]"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 pl-8 text-sm font-medium text-amber-300">
          {error}
        </p>
      )}
    </div>
  );
}
