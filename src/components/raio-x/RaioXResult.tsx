"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icons } from "@/lib/icons";
import { MEETING_MINUTES, type Answers } from "@/lib/raio-x/questions";
import { buildReading, type DimensionState, type Reading } from "@/lib/raio-x/reading";

export type Contact = {
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

type Variant = "reading" | "confirmation";

type Slot = { day: string; date: string; time: string };

const REGISTER_URL = "https://app.mylarpro.com.br/register";

const STATE_LABEL: Record<DimensionState, string> = {
  read: "Já dá para ler",
  partial: "Leitura parcial",
  pending: "A completar",
  research: "Depende da pesquisa",
};

const SLOT_TIMES = ["09:30", "11:00", "14:30", "16:30"];

const PAPER_FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1a22]";

function subscribeToNothing() {
  return () => {};
}

function buildSlots(): { label: string; slots: Slot[] }[] {
  const days: { label: string; slots: Slot[] }[] = [];
  const cursor = new Date();

  while (days.length < 3) {
    cursor.setDate(cursor.getDate() + 1);
    const weekday = cursor.getDay();
    if (weekday === 0 || weekday === 6) continue;

    const weekdayName = cursor.toLocaleDateString("pt-BR", { weekday: "long" });
    const day = weekdayName.charAt(0).toUpperCase() + weekdayName.slice(1);
    const date = cursor.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    days.push({
      label: `${day}, ${date}`,
      slots: SLOT_TIMES.map((time) => ({ day, date, time })),
    });
  }

  return days;
}

export function RaioXResult({
  answers,
  contact,
  submitted,
  onRestart,
}: {
  answers: Answers;
  contact: Contact;
  submitted: boolean;
  onRestart: () => void;
}) {
  const [variant, setVariant] = useState<Variant>("reading");
  const reading = buildReading(answers);
  const firstName = contact.name.trim().split(" ")[0];
  const minutes = MEETING_MINUTES[answers.profile ?? "agency"];

  return (
    <div className="rx-ground flex min-h-dvh flex-col">
      <div className="z-10 bg-[#0b1a22] text-white sm:sticky sm:top-0">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-3 sm:px-8">
          <p className="text-sm text-slate-300">
            <strong className="font-bold text-white">Protótipo.</strong>{" "}
            {submitted
              ? "Suas respostas foram registradas. O agendamento ainda é só exemplo."
              : "Exemplo preenchido: nada foi enviado nem agendado."}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div role="group" aria-label="Versão da tela final" className="flex rounded-lg bg-white/10 p-1">
              {(
                [
                  ["reading", "Leitura inicial"],
                  ["confirmation", "Só confirmação"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={variant === value}
                  onClick={() => {
                    setVariant(value);
                    window.scrollTo({ top: 0 });
                  }}
                  className={`rounded-md px-3 py-1.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    variant === value ? "bg-[#2facde] text-[#052330]" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onRestart}
              className="rounded-md px-2 py-1.5 text-sm font-semibold text-slate-200 underline decoration-white/40 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Recomeçar
            </button>
          </div>
        </div>
      </div>

      <div key={variant} className="rx-sheet flex-1 bg-[#f7f8f6] pb-32 text-[#0b1a22]">
        <header className="border-b border-[#0b1a22]/10">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
            <Image
              src="/images/logo-full-color.svg"
              alt="MyLar Pro"
              width={120}
              height={32}
              className="h-7 w-auto sm:h-8"
              priority
            />
            <p className="text-right text-sm font-semibold text-[#3d5560]">
              {variant === "reading" ? `Leitura inicial de ${contact.brand}` : contact.brand}
            </p>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl px-5 pt-10 sm:px-8 sm:pt-14">
          {variant === "reading" ? (
            <ReadingView firstName={firstName} reading={reading} />
          ) : (
            <ConfirmationView firstName={firstName} email={contact.email} />
          )}

          <Scheduler minutes={minutes} openQuestions={reading.openQuestions} />

          {answers.profile === "broker" && (
            <p className="mt-10 text-base leading-relaxed text-[#3d5560]">
              Prefere começar sozinho?{" "}
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-sm font-bold text-[#0b1a22] underline decoration-[#2facde] decoration-2 underline-offset-4 hover:text-[#12647f] ${PAPER_FOCUS}`}
              >
                Teste o MyLar Pro por 30 dias
              </a>
              , sem cartão.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

function ReadingView({ firstName, reading }: { firstName: string; reading: Reading }) {
  return (
    <>
      <h1 className="text-4xl leading-[1.06] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl">
        {firstName}, isto é o que suas respostas já mostram.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d5560]">
        Esta é uma leitura inicial, não o Raio X. O Raio X completo junta estas
        respostas com a análise do seu site e dos seus perfis, e passa pela revisão
        da equipe MyLar antes de chegar a você.
      </p>

      {reading.told.length > 0 && (
        <section aria-labelledby="rx-told" className="mt-12">
          <h2 id="rx-told" className="text-2xl font-extrabold tracking-[-0.02em]">
            O que você nos contou
          </h2>
          <dl className="mt-5 grid gap-x-10 gap-y-4 border-t border-[#0b1a22]/15 pt-5 sm:grid-cols-2">
            {reading.told.map((item) => (
              <div key={item.label}>
                <dt className="text-sm font-semibold text-[#5b6b73]">{item.label}</dt>
                <dd className="mt-0.5 text-lg leading-snug font-bold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section aria-labelledby="rx-dimensions" className="mt-14">
        <h2 id="rx-dimensions" className="text-2xl font-extrabold tracking-[-0.02em]">
          As cinco dimensões do Raio X
        </h2>
        <ol className="mt-6 border-t border-[#0b1a22]/15">
          {reading.dimensions.map((dimension, index) => {
            const hasEnough = dimension.state === "read" || dimension.state === "partial";

            return (
              <li
                key={dimension.key}
                className="rx-row grid gap-x-8 gap-y-3 border-b border-[#0b1a22]/15 py-5 sm:grid-cols-[1fr_1.3fr]"
                style={{ animationDelay: `${350 + index * 140}ms` }}
              >
                <div>
                  <p className="text-lg leading-snug font-bold">{dimension.name}</p>
                  <p className={`mt-1 text-sm font-semibold ${hasEnough ? "text-[#12647f]" : "text-[#5b6b73]"}`}>
                    {STATE_LABEL[dimension.state]}
                  </p>
                </div>
                <div>
                  <div
                    aria-hidden="true"
                    className={
                      hasEnough
                        ? "rx-bar-fill h-0.5 w-full bg-[#0b1a22]"
                        : "h-0 w-full border-t-2 border-dashed border-[#0b1a22]/35"
                    }
                    style={hasEnough ? { animationDelay: `${600 + index * 140}ms` } : undefined}
                  />
                  <p className="mt-3 text-base leading-relaxed text-[#3d5560]">{dimension.note}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-[#5b6b73]">
          Traço cheio: já há informação para ler a dimensão. Tracejado: ainda falta.
          Não é uma nota, e nenhuma dimensão recebe classificação sem informação
          suficiente.
        </p>
      </section>

      <section aria-labelledby="rx-attention" className="mt-14 rounded-2xl bg-[#0b1a22] p-6 text-white sm:p-9">
        <h2
          id="rx-attention"
          className="text-2xl leading-tight font-extrabold tracking-[-0.02em] text-balance sm:text-3xl"
        >
          {reading.attention.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-200">
          {reading.attention.body}
        </p>
        <div className="mt-8 border-t border-white/15 pt-6">
          <h3 className="text-xl font-extrabold tracking-[-0.01em]">Para fazer nesta semana</h3>
          <p className="mt-2 max-w-2xl text-lg leading-relaxed text-slate-200">{reading.action}</p>
        </div>
      </section>
    </>
  );
}

function ConfirmationView({ firstName, email }: { firstName: string; email: string }) {
  const steps = [
    {
      title: "Olhamos o que seus clientes veem",
      body: "Seu site, sua presença no Google e seus perfis, quando informados.",
    },
    {
      title: "Uma pessoa da equipe MyLar revisa",
      body: "A análise é preparada com IA e conferida antes de sair.",
    },
    {
      title: "Você recebe o Raio X",
      body: `Pelo WhatsApp e no e-mail ${email}, com o que encontramos e o que ainda é hipótese.`,
    },
  ];

  return (
    <>
      <h1 className="text-4xl leading-[1.06] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl">
        Recebemos suas respostas, {firstName}.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d5560]">
        Agora preparamos o seu Raio X. Você não precisa fazer mais nada para
        recebê-lo.
      </p>

      <section aria-labelledby="rx-next" className="mt-14">
        <h2 id="rx-next" className="text-2xl font-extrabold tracking-[-0.02em]">
          O que acontece agora
        </h2>
        <ol className="mt-6 border-t border-[#0b1a22]/15">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rx-row grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-[#0b1a22]/15 py-5"
              style={{ animationDelay: `${350 + index * 140}ms` }}
            >
              <span className="text-2xl font-extrabold text-[#12647f] tabular-nums">{index + 1}</span>
              <div>
                <p className="text-lg leading-snug font-bold">{step.title}</p>
                <p className="mt-1 text-base leading-relaxed text-[#3d5560]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function Scheduler({ minutes, openQuestions }: { minutes: number; openQuestions: string[] }) {
  const isClient = useSyncExternalStore(subscribeToNothing, () => true, () => false);
  const days = isClient ? buildSlots() : [];
  const [chosen, setChosen] = useState<Slot | null>(null);
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (chosen) confirmationRef.current?.focus();
  }, [chosen]);

  if (chosen) {
    return (
      <section className="mt-14 border-t-2 border-[#0b1a22] pt-8">
        <h2
          ref={confirmationRef}
          tabIndex={-1}
          className="flex items-start gap-3 text-3xl leading-tight font-extrabold tracking-[-0.02em] text-balance outline-none sm:text-4xl"
        >
          <Icons.checkCircle className="mt-1 size-8 shrink-0 text-[#12647f]" aria-hidden="true" />
          <span>
            Conversa marcada para {chosen.day.toLowerCase()}, {chosen.date}, às {chosen.time}.
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#3d5560]">
          São {minutes} minutos por vídeo. A confirmação e os lembretes chegam pelo
          WhatsApp. Na conversa, fechamos juntos o plano de 90 dias.
        </p>
        <button
          type="button"
          onClick={() => setChosen(null)}
          className={`mt-5 rounded-md text-base font-bold text-[#0b1a22] underline decoration-[#2facde] decoration-2 underline-offset-4 hover:text-[#12647f] ${PAPER_FOCUS}`}
        >
          Escolher outro horário
        </button>
      </section>
    );
  }

  return (
    <section aria-labelledby="rx-schedule" className="mt-14 border-t-2 border-[#0b1a22] pt-8">
      <h2 id="rx-schedule" className="text-3xl leading-tight font-extrabold tracking-[-0.02em] text-balance sm:text-4xl">
        Feche o plano de 90 dias em uma conversa de {minutes} minutos.
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#3d5560]">
        O plano depende de coisas que só você pode dizer:
      </p>
      <ul className="mt-3 grid gap-2">
        {openQuestions.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-[#22323a]">
            <Icons.chevronRight className="mt-1 size-4 shrink-0 text-[#12647f]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {days.map((day) => (
          <div key={day.label}>
            <p className="text-base font-bold">{day.label}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-1">
              {day.slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  aria-label={`${day.label}, às ${slot.time}`}
                  onClick={() => setChosen(slot)}
                  className={`rounded-xl border border-[#0b1a22]/25 bg-white px-4 py-3 text-base font-bold tabular-nums transition hover:border-[#0b1a22] hover:bg-[#0b1a22] hover:text-white ${PAPER_FOCUS}`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-[#5b6b73]">
        Horários de exemplo. Se preferir não agendar agora, você recebe o Raio X do
        mesmo jeito, com o plano em versão preliminar.
      </p>
    </section>
  );
}
