"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import {
  partnersAudience,
  partnersAudienceHeadline,
  partnersBenefits,
  partnersBenefitsHeadline,
  partnersCta,
  partnersFaq,
  partnersFaqHeadline,
  partnersHero,
  partnersReasons,
  partnersReasonsHeadline,
  partnersSteps,
  partnersStepsHeadline,
  partnersTiers,
  partnersTiersHeadline,
} from "@/lib/partners";

const ACCENT = "#2facde";

export function PartnersPage() {
  return (
    <main className="pt-14 sm:pt-16">
      <PartnersHero />
      <PartnersReasons />
      <PartnersTiers />
      <PartnersSteps />
      <PartnersBenefits />
      <PartnersAudience />
      <PartnersFaq />
      <PartnersCta />
    </main>
  );
}

function Eyebrow({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-slate-300" />
      <span
        className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
        style={{ color: muted ? undefined : ACCENT }}
      >
        <span className={muted ? "text-slate-500" : undefined}>{label}</span>
      </span>
    </div>
  );
}

function PartnersHero() {
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
        <Eyebrow label={partnersHero.eyebrow} />

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mt-8 max-w-4xl text-[2rem] leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-[2.5rem] sm:leading-[1] md:text-5xl lg:text-[3.75rem] lg:leading-[0.98]"
        >
          {partnersHero.title}{" "}
          <span className="text-[#2facde]">{partnersHero.titleHighlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:text-[1.125rem]"
        >
          {partnersHero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2facde] px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5"
            style={{ boxShadow: "0 14px 24px -14px rgba(47, 172, 222, 0.7)" }}
          >
            {partnersHero.ctaPrimary}
            <Icons.arrowRight className="size-4" />
          </Link>
          <a
            href="#modelos"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
          >
            <span className="border-b border-dotted border-slate-400 pb-px">
              {partnersHero.ctaSecondary}
            </span>
            <span>→</span>
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
        >
          {partnersHero.trust.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-600"
            >
              <Icons.check aria-hidden className="size-3.5 text-[#2facde]" />
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function PartnersReasons() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow label={partnersReasonsHeadline.eyebrow} muted />
            <h2 className="mt-4 text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
              {partnersReasonsHeadline.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600">
            {partnersReasonsHeadline.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {partnersReasons.map((reason, index) => {
            const Icon = Icons[reason.icon];

            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.06 * index }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span
                  className="inline-flex size-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(47, 172, 222, 0.1)" }}
                >
                  <Icon aria-hidden className="size-5 text-[#2facde]" />
                </span>
                <h3 className="mt-4 text-[17px] leading-snug font-bold text-slate-900">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {reason.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnersTiers() {
  return (
    <section
      id="modelos"
      className="scroll-mt-20 border-t border-slate-200 bg-[#F8F9FB] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow label={partnersTiersHeadline.eyebrow} muted />
            <h2 className="mt-4 text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
              {partnersTiersHeadline.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600">
            {partnersTiersHeadline.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-3">
          {partnersTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.06 * index }}
              className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 lg:p-7 ${
                tier.badge ? "border-[#2facde] shadow-sm" : "border-slate-200"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-[#2facde] px-3 py-1 text-[11px] font-bold tracking-wide text-white">
                  {tier.badge}
                </span>
              )}

              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
                {tier.number}
              </span>

              <h3 className="mt-3 text-xl leading-snug font-extrabold tracking-tight text-slate-900">
                {tier.name}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {tier.tagline}
              </p>

              <p className="mt-5 border-t border-slate-100 pt-5 text-[15px] font-semibold text-[#2facde]">
                {tier.commission}
              </p>

              <ul className="mt-5 space-y-2.5">
                {tier.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-[13px] leading-snug text-slate-700"
                  >
                    <Icons.check
                      aria-hidden
                      className="mt-0.5 size-3.5 shrink-0 text-[#2facde]"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-slate-500">
          {partnersTiersHeadline.footnote}
        </p>
      </div>
    </section>
  );
}

function PartnersSteps() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow label={partnersStepsHeadline.eyebrow} muted />
        <h2 className="mt-4 max-w-2xl text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
          {partnersStepsHeadline.title}
        </h2>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {partnersSteps.map((step, index) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.06 * index }}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span
                className="inline-flex size-9 items-center justify-center rounded-xl font-mono text-[12px] font-bold text-[#2facde]"
                style={{ backgroundColor: "rgba(47, 172, 222, 0.1)" }}
              >
                {step.number}
              </span>
              <h3 className="mt-4 text-[16px] leading-snug font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PartnersBenefits() {
  return (
    <section className="border-t border-slate-200 bg-[#F8F9FB] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow label={partnersBenefitsHeadline.eyebrow} muted />
        <h2 className="mt-4 max-w-2xl text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
          {partnersBenefitsHeadline.title}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12">
          {partnersBenefits.map((benefit, index) => {
            const Icon = Icons[benefit.icon];

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.06 * index }}
                className="flex h-full gap-4 rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(47, 172, 222, 0.1)" }}
                >
                  <Icon aria-hidden className="size-5 text-[#2facde]" />
                </span>
                <div>
                  <h3 className="text-[17px] leading-snug font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {benefit.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnersAudience() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Eyebrow label={partnersAudienceHeadline.eyebrow} muted />
        <h2 className="mt-4 max-w-2xl text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
          {partnersAudienceHeadline.title}
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {partnersAudience.map((item, index) => {
            const Icon = Icons[item.icon];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.04 * index }}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6"
              >
                <Icon aria-hidden className="size-5 text-[#2facde]" />
                <h3 className="mt-4 text-[16px] leading-snug font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnersFaq() {
  return (
    <section className="border-t border-slate-200 bg-[#F8F9FB] py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Eyebrow label={partnersFaqHeadline.eyebrow} muted />
        <h2 className="mt-4 text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
          {partnersFaqHeadline.title}
        </h2>

        <ul className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white lg:mt-12">
          {partnersFaq.map((item) => (
            <li key={item.q}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-semibold text-slate-900">{item.q}</span>
                  <Icons.chevronDown
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-slate-400 transition group-open:rotate-180"
                  />
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PartnersCta() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-[#FAFAF7] py-20 lg:py-24">
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
        <Eyebrow label={partnersCta.eyebrow} />

        <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
          {partnersCta.title}
        </h2>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
          {partnersCta.subtitle}
        </p>

        <ul className="mt-8 space-y-2.5">
          {partnersCta.trust.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm leading-snug text-slate-700"
            >
              <Icons.check
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-[#2facde]"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2facde] px-7 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5"
            style={{ boxShadow: "0 14px 24px -14px rgba(47, 172, 222, 0.7)" }}
          >
            {partnersCta.ctaLabel}
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
