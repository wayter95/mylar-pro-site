"use client";

import { Fragment } from "react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import type { PersonaComparison as PersonaComparisonData } from "@/lib/personas/types";

type Props = {
  comparison: PersonaComparisonData;
  accent: string;
};

function Cell({ value }: { value: boolean }) {
  return (
    <td className="px-4 py-3 text-center">
      {value ? (
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          ✓
        </span>
      ) : (
        <span className="text-slate-300">—</span>
      )}
    </td>
  );
}

export function PersonaComparison({ comparison, accent }: Props) {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="O que muda"
          highlight="entre os planos"
          description="Transparência total — sem surpresa na hora de escalar."
        />

        <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 font-semibold text-slate-900">Recurso</th>
                {comparison.headers.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-4 text-center font-semibold text-slate-900"
                    style={{ color: accent }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.groups.map((group) => (
                <Fragment key={group.name}>
                  <tr className="bg-slate-50">
                    <td
                      colSpan={4}
                      className="px-6 py-3 text-xs font-bold tracking-wider text-slate-500 uppercase"
                    >
                      {group.name}
                    </td>
                  </tr>
                  {group.rows.map(([label, a, b, c]) => (
                    <tr key={label} className="border-t border-slate-100">
                      <td className="px-6 py-3 text-slate-700">{label}</td>
                      <Cell value={a} />
                      <Cell value={b} />
                      <Cell value={c} />
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
