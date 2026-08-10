import Link from "next/link";
import { Icons } from "@/lib/icons";

export function PricingTeaser() {
  return (
    <section className="border-t border-[#cbe9f5] bg-[#f0fbff]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-4 py-10 sm:px-6 lg:gap-10 lg:px-8">
        <div className="max-w-[640px]">
          <h2 className="text-[21px] leading-tight font-extrabold tracking-tight text-slate-900">
            Um preço por porte de imobiliária, com todos os módulos inclusos.
          </h2>
          <p className="mt-2 text-[14.5px] leading-[1.55] text-slate-600">
            Sem cobrança por módulo e sem cobrança por corretor no aplicativo.
            Você paga pelo tamanho da operação, não por quantas partes do sistema
            usa.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-[14.5px] font-bold text-white transition hover:bg-slate-800"
          >
            Ver planos e valores
            <Icons.arrowRight aria-hidden className="size-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-[14.5px] font-bold text-slate-900 transition hover:border-[#2facde] hover:text-[#2facde]"
          >
            Simular com um especialista
          </Link>
        </div>
      </div>
    </section>
  );
}
