"use client";

import Link from "next/link";
import { useState } from "react";

export type LegalLocale = "pt" | "en";

export type LegalSection = {
  id: string;
  title: { pt: string; en: string };
  body: { pt: string; en: string };
};

export type LegalContent = {
  title: { pt: string; en: string };
  subtitle: { pt: string; en: string };
  lastUpdated: { pt: string; en: string };
  intro: { pt: string; en: string };
  sections: LegalSection[];
};

type Props = {
  slug: "privacy-policy" | "terms-of-use";
  defaultLocale?: LegalLocale;
  alternateHref: string;
  alternateLabel: { pt: string; en: string };
  content: LegalContent;
};

const L = {
  pt: {
    switchTo: "English",
    toc: "Sumário",
    updated: "Última atualização",
    contactTitle: "Dúvidas ou solicitações",
    contactBody:
      "Entre em contato com nosso Encarregado pelo Tratamento de Dados (DPO) pelo e-mail abaixo para exercer seus direitos LGPD (acesso, correção, exclusão, portabilidade).",
    controller: "Controlador dos Dados",
    controllerName: "My Lar — CNPJ 54.865.990/0001-50",
    contactEmail: "contato@mylarapp.com",
    back: "Voltar ao início",
  },
  en: {
    switchTo: "Português",
    toc: "Table of Contents",
    updated: "Last updated",
    contactTitle: "Questions or requests",
    contactBody:
      "Contact our Data Protection Officer (DPO) at the email below to exercise your rights (access, correction, deletion, portability).",
    controller: "Data Controller",
    controllerName: "My Lar — CNPJ 54.865.990/0001-50",
    contactEmail: "contato@mylarapp.com",
    back: "Back to home",
  },
} as const;

export function LegalDocument({
  defaultLocale = "pt",
  alternateHref,
  alternateLabel,
  content,
}: Props) {
  const [locale, setLocale] = useState<LegalLocale>(defaultLocale);
  const t = L[locale];

  const toggle = () => setLocale((l) => (l === "pt" ? "en" : "pt"));

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="text-sm text-slate-500 transition hover:text-slate-900"
        >
          ← {t.back}
        </Link>
        <button
          type="button"
          onClick={toggle}
          className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          {t.switchTo}
        </button>
      </div>

      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
          Mylar Pro Brokers
        </p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          {content.title[locale]}
        </h1>
        <p className="mt-3 text-base text-slate-600">
          {content.subtitle[locale]}
        </p>
        <p className="mt-4 text-sm text-slate-500">
          {t.updated}: {content.lastUpdated[locale]}
        </p>
      </header>

      <nav className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {t.toc}
        </p>
        <ol className="space-y-1.5 text-sm">
          {content.sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-slate-700 transition hover:text-blue-600"
              >
                {i + 1}. {s.title[locale]}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <article className="prose-legal">
        <p className="mb-10 whitespace-pre-line text-[15px] leading-7 text-slate-700">
          {content.intro[locale]}
        </p>

        {content.sections.map((section, idx) => (
          <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
            <h2 className="mb-3 text-xl font-semibold text-slate-900">
              {idx + 1}. {section.title[locale]}
            </h2>
            <div className="whitespace-pre-line text-[15px] leading-7 text-slate-700">
              {section.body[locale]}
            </div>
          </section>
        ))}

        <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
          <h3 className="mb-2 text-base font-semibold text-slate-900">
            {t.contactTitle}
          </h3>
          <p className="mb-4 text-sm text-slate-600">{t.contactBody}</p>
          <dl className="space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-slate-700">{t.controller}:</dt>
              <dd className="text-slate-600">{t.controllerName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-slate-700">E-mail:</dt>
              <dd>
                <a
                  href={`mailto:${t.contactEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {t.contactEmail}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm">
          <Link
            href={alternateHref}
            className="text-blue-600 hover:underline"
          >
            → {alternateLabel[locale]}
          </Link>
        </div>
      </article>
    </div>
  );
}
