import { Icons } from "@/lib/icons";

type Props = { accent: string };

export function CustomPlanCta({ accent }: Props) {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-8 text-center lg:p-12"
      style={{ boxShadow: `inset 0 0 0 1px ${accent}1f` }}
    >
      <span
        className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
        style={{ color: accent }}
      >
        Plano personalizado
      </span>
      <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        Para incorporadoras, construtoras e loteadoras, montamos o plano com você.
      </h3>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
        Volume de unidades, integrações com ERP, número de corretores e suporte
        dedicado variam muito de operação para operação. Conte como você trabalha
        e a gente devolve uma proposta sob medida.
      </p>
      <a
        href="/contact"
        className="mt-8 inline-flex items-center justify-center gap-1.5 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        style={{ backgroundColor: accent, boxShadow: `0 14px 24px -14px ${accent}99` }}
      >
        Falar com vendas
        <Icons.arrowRight className="size-4" />
      </a>
    </div>
  );
}
