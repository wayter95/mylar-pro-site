import type { ComparisonBlock as ComparisonBlockData } from "@/sanity/types/content";

export function ComparisonBlock({
  title,
  intro,
  columns,
  rows,
}: ComparisonBlockData) {
  if (rows.length === 0 || columns.length === 0) {
    return null;
  }

  return (
    <section className="my-10">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-slate-300" />
        <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
          Comparativo
        </span>
      </div>

      <h3 className="mt-4 text-xl leading-snug font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h3>

      {intro ? (
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
          {intro}
        </p>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-[14px]">
            <thead className="bg-slate-900">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-4 font-mono text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase"
                >
                  Critério
                </th>
                {columns.map((column, index) => (
                  <th
                    key={`${column}-${index}`}
                    scope="col"
                    className="px-5 py-4 text-[13.5px] font-bold whitespace-nowrap text-white"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row, rowIndex) => (
                <tr
                  key={`${row.label}-${rowIndex}`}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#F8F9FB]"}
                >
                  <th
                    scope="row"
                    className="px-5 py-4 text-left text-[14px] font-semibold text-slate-900"
                  >
                    {row.label}
                  </th>
                  {columns.map((column, columnIndex) => (
                    <td
                      key={`${column}-${columnIndex}`}
                      className="px-5 py-4 leading-relaxed text-slate-600"
                    >
                      {row.values[columnIndex] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
