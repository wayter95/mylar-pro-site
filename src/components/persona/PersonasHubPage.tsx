"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import {
  PERSONA_HUB_CARDS,
  PERSONA_ORDER,
  personasRecord,
} from "@/lib/personas";
import type { PersonaHubCard, PersonaSlug } from "@/lib/personas/types";

const discoveryQuestions: { question: string; slug: PersonaSlug }[] = [
  {
    question: "Você opera sozinho ou em dupla?",
    slug: "broker",
  },
  {
    question: "Tem equipe administrando carteira de locação e venda?",
    slug: "real-estate",
  },
  {
    question: "Lança empreendimentos, condomínios ou loteamentos?",
    slug: "development",
  },
];

export function PersonasHubPage({
  fromPrices,
}: {
  fromPrices?: Partial<Record<PersonaSlug, number>>;
}) {
  return (
    <>
      <HubHero />
      <HubDiscovery />
      <HubPersonaCards fromPrices={fromPrices} />
      <HubComparisonTable fromPrices={fromPrices} />
      <HubCta />
    </>
  );
}

function HubHero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF7] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px)",
            backgroundSize: "120px 100%",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
            00
          </span>
          <span className="h-px w-8 bg-slate-300" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
            Para quem é o Mylar Pro
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mt-8 max-w-4xl text-[2.5rem] leading-[0.98] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]"
        >
          Do corretor solo à incorporadora.{" "}
          <span className="text-[#2facde]">
            A mesma plataforma cresce com você.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600"
        >
          Mesmo CRM, mesmo catálogo, mesmo motor financeiro. O que muda são os
          módulos liberados, a capacidade de equipe e o tipo de cliente que cada
          versão atende.
        </motion.p>
      </div>
    </section>
  );
}

function HubDiscovery() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Por onde começar
          </span>
        </div>

        <h2 className="mt-5 max-w-3xl text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2rem]">
          Responda uma pergunta — a gente te leva pra versão certa.
        </h2>

        <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-3">
          {discoveryQuestions.map((q, i) => {
            const persona = personasRecord[q.slug];
            return (
              <motion.li
                key={q.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
              >
                <Link
                  href={persona.href}
                  className="group flex h-full flex-col bg-white p-7 transition hover:bg-slate-50"
                >
                  <span
                    className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-lg leading-snug font-extrabold tracking-tight text-slate-900">
                    {q.question}
                  </p>
                  <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold transition group-hover:gap-2.5"
                    style={{ color: persona.accent }}
                  >
                    Sim → Mylar para {persona.shortLabel.toLowerCase()}
                    <Icons.arrowRight className="size-4" />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function HubPersonaCards({
  fromPrices,
}: {
  fromPrices?: Partial<Record<PersonaSlug, number>>;
}) {
  return (
    <section className="border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                As três versões
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Qual delas <span className="text-slate-400">descreve sua operação?</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            Cada versão tem foco, módulos e preço próprios. Mas você pode subir
            de plano sem perder dado — começa onde faz sentido hoje e cresce.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:mt-20 lg:gap-10">
          {PERSONA_HUB_CARDS.map((card, i) => (
            <HubPersonaCard
              key={card.slug}
              card={card}
              index={i}
              fromPrice={fromPrices?.[card.slug]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HubPersonaCard({
  card,
  index,
  fromPrice,
}: {
  card: PersonaHubCard;
  index: number;
  fromPrice?: number;
}) {
  const persona = personasRecord[card.slug];
  const quote = persona.testimonials.find((t) => t.featured) ?? persona.testimonials[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: 0.05 * index }}
      className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12 lg:p-10"
    >
      <div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-slate-300" />
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: card.accent }}
          >
            {persona.shortLabel}
          </span>
        </div>

        <h3 className="mt-5 text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">
          {card.label}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          {card.description}
        </p>

        <ul className="mt-6 space-y-2.5">
          {card.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2.5 text-sm text-slate-700"
            >
              <span
                aria-hidden
                className="mt-1.5 size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: card.accent }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href={persona.href}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            style={{
              backgroundColor: card.accent,
              boxShadow: `0 12px 24px -14px ${card.accent}aa`,
            }}
          >
            Ver Mylar para {persona.shortLabel.toLowerCase()}
            <Icons.arrowRight className="size-4" />
          </Link>
          {typeof fromPrice === "number" ? (
            <div className="text-[13px] text-slate-500">
              <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                A partir de
              </span>{" "}
              <span className="font-semibold text-slate-800">
                R$ {fromPrice.toLocaleString("pt-BR")}/mês
              </span>
            </div>
          ) : (
            <Link
              href="/plans"
              className="text-[13px] font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <span className="border-b border-dotted border-slate-400 pb-px">
                Ver planos e valores
              </span>
            </Link>
          )}
        </div>
      </div>

      {quote && (
        <figure
          className="rounded-2xl bg-[#F8F9FB] p-7 lg:border-l-2"
          style={{ borderColor: `${card.accent}40` }}
        >
          <Icons.quote
            aria-hidden
            className="size-5"
            style={{ color: card.accent, opacity: 0.4 }}
          />
          <blockquote className="mt-3">
            <p className="text-[15px] leading-[1.45] font-medium text-slate-800">
              “{quote.quote}”
            </p>
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: card.accent }}
            >
              {quote.avatar}
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">{quote.name}</p>
              <p className="text-[11px] text-slate-500">{quote.role}</p>
            </div>
          </figcaption>

          {quote.stats && quote.stats.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
              {quote.stats.map((stat) => (
                <div key={stat.l}>
                  <p
                    className="text-2xl font-extrabold tracking-tight"
                    style={{ color: card.accent }}
                  >
                    {stat.v}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium tracking-wide text-slate-500 uppercase">
                    {stat.l}
                  </p>
                </div>
              ))}
            </div>
          )}
        </figure>
      )}
    </motion.article>
  );
}

function HubComparisonTable({
  fromPrices,
}: {
  fromPrices?: Partial<Record<PersonaSlug, number>>;
}) {
  const hasSelfServicePrices =
    typeof fromPrices?.broker === "number" &&
    typeof fromPrices?.["real-estate"] === "number";

  const rows: {
    label: string;
    values: [string, string, string];
  }[] = [
    {
      label: "Foco principal",
      values: [
        "Captação e fechamento solo",
        "Locação e vendas com equipe",
        "Lançamentos verticais e loteamentos",
      ],
    },
    {
      label: "Tamanho típico",
      values: ["1 corretor", "10 a 20 corretores", "Incorporadora, construtora ou loteadora"],
    },
    {
      label: "Carteira recomendada",
      values: ["Até 200 imóveis", "500 a 1.000 imóveis", "Múltiplos empreendimentos e quadras"],
    },
    {
      label: "Destaques exclusivos",
      values: [
        "App mobile + WhatsApp + catálogo próprio",
        "Vistoria digital, DRE, DIMOB, conciliação",
        "Meta Ads, espelho vertical/horizontal, BI",
      ],
    },
  ];

  if (hasSelfServicePrices) {
    rows.push({
      label: "A partir de",
      values: PERSONA_ORDER.map((slug) => {
        const price = fromPrices?.[slug];
        return typeof price === "number"
          ? `R$ ${price.toLocaleString("pt-BR")}/mês`
          : "Sob consulta";
      }) as [string, string, string],
    });
  }

  return (
    <section className="border-t border-slate-200 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-slate-300" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Em que se diferenciam
            </span>
          </div>
          <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Lado a lado, sem letra miúda.
          </h2>
        </div>

        <div className="mt-12 overflow-x-auto lg:mt-16">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-4 pr-6 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  Dimensão
                </th>
                {PERSONA_ORDER.map((slug) => {
                  const persona = personasRecord[slug];
                  return (
                    <th
                      key={slug}
                      className="px-6 py-4 align-bottom"
                      style={{ width: "26%" }}
                    >
                      <span
                        className="block font-mono text-[10px] font-semibold tracking-[0.18em] uppercase"
                        style={{ color: persona.accent }}
                      >
                        Versão
                      </span>
                      <span className="mt-1 block text-base font-extrabold text-slate-900">
                        {persona.shortLabel}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.label}>
                  <th className="py-4 pr-6 text-[13px] font-semibold text-slate-700 align-top">
                    {row.label}
                  </th>
                  {row.values.map((value, ci) => {
                    const slug = PERSONA_ORDER[ci];
                    const persona = personasRecord[slug];
                    return (
                      <td
                        key={slug}
                        className="px-6 py-4 align-top text-[13px] leading-relaxed text-slate-700"
                      >
                        {row.label === "A partir de" ? (
                          <span
                            className="font-bold"
                            style={{ color: persona.accent }}
                          >
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th className="py-6 pr-6"></th>
                {PERSONA_ORDER.map((slug) => {
                  const persona = personasRecord[slug];
                  return (
                    <td key={slug} className="px-6 py-6 align-top">
                      <Link
                        href={persona.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5"
                        style={{ color: persona.accent }}
                      >
                        Ver plano completo
                        <Icons.arrowRight className="size-3.5" />
                      </Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function HubCta() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px)",
            backgroundSize: "120px 100%",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
            Ainda na dúvida
          </span>
        </div>

        <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
          Não sabe qual versão é a sua?{" "}
          <span className="text-slate-400">
            Em 15 minutos a gente desenha o ponto de partida com você.
          </span>
        </h2>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
          Conversa com alguém do produto, sem pitch, sem cartão. A gente entende
          sua operação e indica por onde começar — mesmo que não seja agora.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2facde] px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5"
            style={{ boxShadow: "0 14px 24px -14px rgba(47, 172, 222, 0.7)" }}
          >
            Agendar conversa
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
