"use client";

import Image from "next/image";
import { MEETING_MINUTES, type Answers } from "@/lib/raio-x/questions";
import { buildReading } from "@/lib/raio-x/reading";

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

const REGISTER_URL = "https://app.mylarpro.com.br/register";

const PAPER_FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1a22]";

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
  const reading = buildReading(answers);
  const firstName = contact.name.trim().split(" ")[0];
  const minutes = MEETING_MINUTES[answers.profile ?? "agency"];

  const steps = [
    {
      title: "Nosso time fala com você",
      body: "Pelo WhatsApp, com algumas perguntas rápidas para completar o diagnóstico.",
    },
    {
      title: "Preparamos o seu Raio X",
      body: "Juntamos suas respostas com o que é público sobre o seu negócio. A análise é feita com IA e revisada por uma pessoa da equipe MyLar.",
    },
    {
      title: "Você escolhe o horário da conversa",
      body: `Enviamos o link da agenda. Em ${minutes} minutos, apresentamos o Raio X e fechamos com você o plano de 90 dias.`,
    },
  ];

  return (
    <div className="rx-ground flex min-h-dvh flex-col">
      {!submitted && (
        <div className="bg-[#0b1a22] text-white">
          <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 sm:px-8">
            <p className="text-sm text-slate-300">
              <strong className="font-bold text-white">Exemplo preenchido.</strong> Nada foi enviado.
            </p>
            <button
              type="button"
              onClick={onRestart}
              className="rounded-md px-2 py-1.5 text-sm font-semibold text-slate-200 underline decoration-white/40 underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Começar do início
            </button>
          </div>
        </div>
      )}

      <div className="rx-sheet flex-1 bg-[#f7f8f6] pb-24 text-[#0b1a22]">
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
            <p className="text-right text-sm font-semibold text-[#3d5560]">{contact.brand}</p>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl px-5 pt-10 sm:px-8 sm:pt-14">
          <h1 className="text-4xl leading-[1.06] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl">
            Recebemos suas respostas, {firstName}.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#3d5560]">
            Nosso time vai entrar em contato pelo WhatsApp{" "}
            <strong className="font-bold whitespace-nowrap text-[#0b1a22]">{contact.phone}</strong>{" "}
            para dar sequência ao seu Raio X.
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
                  <span className="text-2xl font-extrabold text-[#12647f] tabular-nums">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-lg leading-snug font-bold">{step.title}</p>
                    <p className="mt-1 max-w-xl text-base leading-relaxed text-[#3d5560]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {reading.told.length > 0 && (
            <section aria-labelledby="rx-told" className="mt-14">
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

          {answers.profile === "broker" && (
            <p className="mt-12 text-base leading-relaxed text-[#3d5560]">
              Enquanto isso, se quiser conhecer a plataforma:{" "}
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-sm font-bold text-[#0b1a22] underline decoration-[#2facde] decoration-2 underline-offset-4 hover:text-[#12647f] ${PAPER_FOCUS}`}
              >
                teste o MyLar Pro por 30 dias
              </a>
              , sem cartão.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
