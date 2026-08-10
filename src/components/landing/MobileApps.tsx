"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@/lib/icons";
import { BROKER_APP_URLS, HOME_APP_URLS } from "@/lib/features";

const brokerPoints = [
  "Funciona sem sinal no prédio e sincroniza sozinho quando a conexão volta.",
  "Push de lead novo e de proposta — quem responde primeiro fecha.",
  "Incluso no plano, sem cobrança por corretor da equipe.",
];

const homeGroups = [
  {
    title: "Quem aluga",
    description:
      "Segunda via da fatura, pagamento por PIX ou boleto, envio de comprovante, contrato à mão e chamado de manutenção com foto.",
  },
  {
    title: "Quem é dono",
    description:
      "Repasse do mês com data e valor, demonstrativo em PDF, situação de cada imóvel da carteira e o informe de rendimentos no fim do ano.",
  },
];

const BROKER = "#1fb3d6";
const HOME = "#7c3aed";

export function MobileApps() {
  return (
    <section className="border-t border-slate-200 bg-[#f8fafc] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[700px]">
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
            Aplicativos
          </span>
          <h2 className="mt-3.5 text-[27px] leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
            A imobiliária não cabe só na tela do escritório.
          </h2>
          <p className="mt-4 text-base leading-[1.65] text-slate-600 lg:text-[17px]">
            Dois aplicativos nativos, iOS e Android, ligados ao mesmo sistema: um
            para quem vende e capta, outro para quem aluga e para quem é dono do
            imóvel.
          </p>
        </div>

        <div className="mt-11 grid gap-[22px] lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col rounded-[20px] border border-slate-200 bg-white p-[30px]"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex size-[42px] items-center justify-center rounded-xl"
                style={{ backgroundColor: `${BROKER}21`, color: BROKER }}
              >
                <Icons.briefcase aria-hidden className="size-5" />
              </span>
              <span
                className="rounded-full px-3 py-[5px] text-[10.5px] font-extrabold tracking-[0.1em] uppercase"
                style={{ backgroundColor: `${BROKER}1f`, color: "#1391b0" }}
              >
                Para o corretor
              </span>
            </div>

            <h3 className="mt-5 text-[22px] leading-tight font-extrabold tracking-tight text-slate-900">
              MyLar Pro Brokers
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.62] text-slate-600">
              O escritório inteiro cabe no celular durante a visita. Carteira,
              pipeline, agenda e WhatsApp na mão, e o imóvel cadastrado ali mesmo,
              com foto tirada na hora.
            </p>

            <div className="mt-5 flex flex-1 flex-col gap-[11px]">
              {brokerPoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-1.5 size-[5px] shrink-0 rounded-full"
                    style={{ backgroundColor: BROKER }}
                  />
                  <span className="text-sm leading-[1.55] text-slate-700">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <StoreLink href={BROKER_APP_URLS.appStore} icon="apple" label="App Store" accent={BROKER} />
              <StoreLink href={BROKER_APP_URLS.playStore} icon="googlePlay" label="Google Play" accent={BROKER} />
            </div>

            <Link
              href="/features/broker-app"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold"
              style={{ color: BROKER }}
            >
              Ver o que o aplicativo faz
              <Icons.arrowRight aria-hidden className="size-3.5" />
            </Link>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex flex-col rounded-[20px] border border-slate-200 bg-white p-[30px]"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex size-[42px] items-center justify-center rounded-xl"
                style={{ backgroundColor: `${HOME}1f`, color: HOME }}
              >
                <Icons.house aria-hidden className="size-5" />
              </span>
              <span
                className="rounded-full px-3 py-[5px] text-[10.5px] font-extrabold tracking-[0.1em] uppercase"
                style={{ backgroundColor: `${HOME}1a`, color: "#6d28d9" }}
              >
                Para inquilino e proprietário
              </span>
            </div>

            <h3 className="mt-5 text-[22px] leading-tight font-extrabold tracking-tight text-slate-900">
              MyLar Pro Home
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.62] text-slate-600">
              Os dois lados do contrato se resolvem sozinhos. Cada um entra e
              encontra o que precisa, sem depender de alguém no balcão para
              responder.
            </p>

            <div className="mt-5 flex flex-1 flex-col gap-3.5">
              {homeGroups.map((group) => (
                <div
                  key={group.title}
                  className="border-l-2 pl-3.5"
                  style={{ borderColor: `${HOME}66` }}
                >
                  <h4 className="text-[13.5px] font-extrabold text-slate-900">
                    {group.title}
                  </h4>
                  <p className="mt-1 text-sm leading-[1.55] text-slate-600">
                    {group.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-[22px] text-[13px] leading-[1.55] text-slate-400">
              Cada ligação que o cliente não precisa fazer é uma hora que a sua
              equipe usa para vender.
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <StoreLink href={HOME_APP_URLS.appStore} icon="apple" label="App Store" accent={HOME} />
              <StoreLink href={HOME_APP_URLS.playStore} icon="googlePlay" label="Google Play" accent={HOME} />
            </div>

            <Link
              href="/features/client-portal"
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold"
              style={{ color: HOME }}
            >
              Ver o que o aplicativo faz
              <Icons.arrowRight aria-hidden className="size-3.5" />
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function StoreLink({
  href,
  icon,
  label,
  accent,
}: {
  href: string;
  icon: "apple" | "googlePlay";
  label: string;
  accent: string;
}) {
  const StoreIcon = Icons[icon];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-[10px] border border-slate-300 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-900 transition hover:border-(--store-accent)"
      style={{ "--store-accent": accent } as React.CSSProperties}
    >
      <StoreIcon aria-hidden className="size-4" />
      {label}
    </a>
  );
}
