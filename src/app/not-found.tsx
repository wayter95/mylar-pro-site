import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Icons } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description:
    "Essa página não existe ou foi movida. Encontre o que procura nos recursos do Mylar Pro ou volte para o início.",
  robots: { index: false, follow: false },
};

const suggestions = [
  {
    label: "Conhecer os recursos",
    description:
      "App do Corretor, Catálogo, Portal do Cliente e Assinatura Digital.",
    href: "/features",
    accent: "#2facde",
  },
  {
    label: "Ver para quem é",
    description:
      "Corretor autônomo, imobiliária ou incorporadora — compare as três versões.",
    href: "/personas",
    accent: "#2D6BE0",
  },
  {
    label: "Falar com a equipe",
    description: "Tire suas dúvidas ou agende uma conversa com nosso time.",
    href: "/contact",
    accent: "#0E2849",
  },
];

export default function NotFound() {
  return (
    <main className="pt-14 sm:pt-16">
      <Header />

      <section className="relative overflow-hidden bg-[#FAFAF7] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        {/* Editorial grid lines */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.6]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(226 232 240 / 0.5) 1px, transparent 1px)",
              backgroundSize: "120px 100%",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(47, 172, 222, 0.3), transparent)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Editorial marker */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
              404
            </span>
            <span className="h-px w-8 bg-slate-300" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
              Página não encontrada
            </span>
          </div>

          <h1 className="mt-8 max-w-3xl text-[2.5rem] leading-[0.98] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
            Essa página{" "}
            <span className="relative inline-block">
              <span className="relative z-10">não existe</span>
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 -z-0 h-[0.35em] bg-[#2facde]/40"
              />
            </span>{" "}
            <span className="text-slate-400">
              ou foi movida para outro lugar.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg lg:text-[1.125rem]">
            Mas o Mylar Pro tem muita coisa pra te mostrar. Continue navegando
            pelos atalhos abaixo ou volte para o início.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2facde] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:text-base"
              style={{ boxShadow: "0 14px 24px -14px rgba(47, 172, 222, 0.7)" }}
            >
              <Icons.house className="size-4" />
              Voltar para o início
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:text-base"
            >
              Ver recursos
              <Icons.arrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Suggestions */}
      <section className="border-t border-slate-200 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-slate-300" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Talvez você procurasse
            </span>
          </div>
          <h2 className="mt-5 max-w-3xl text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2rem]">
            Continue por aqui.
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-3">
            {suggestions.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex h-full flex-col bg-white p-7 transition hover:bg-slate-50/60"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-6 bg-slate-300" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold tracking-tight text-slate-900 lg:text-[1.15rem]">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <span
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold transition group-hover:gap-2.5"
                  style={{ color: item.accent }}
                >
                  Ir para {item.label.toLowerCase()}
                  <Icons.arrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
