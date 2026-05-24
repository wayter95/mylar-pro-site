"use client";

import { Icons } from "@/lib/icons";
import { AnimateIn } from "./AnimateIn";

export function Roadmap() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Integração com portais imobiliários
          </h2>
          <p className="mt-2 text-slate-600">
            Publique e gerencie seus anúncios em portais como OLX e outros
            diretamente pela plataforma — sem duplicar trabalho nem perder leads.
          </p>
        </AnimateIn>
        <AnimateIn className="mt-8">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#37B6D6]/30 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center justify-center gap-3 text-center text-[#37B6D6] sm:flex-row sm:text-left">
              <Icons.check className="h-6 w-6 shrink-0" strokeWidth={2} />
              <p className="font-medium">
                Mais alcance, menos retrabalho. Seus imóveis onde seus clientes
                estão.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
