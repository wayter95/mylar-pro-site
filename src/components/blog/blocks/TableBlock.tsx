import type { TableBlock as TableBlockData } from "@/sanity/types/content";

export function TableBlock({ title, rows }: TableBlockData) {
  if (rows.length === 0) {
    return null;
  }

  const [headingRow, ...bodyRows] = rows;

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {title ? (
        <p className="border-b border-slate-200 px-5 py-4 text-[15px] font-bold text-slate-900">
          {title}
        </p>
      ) : null}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-[14px]">
          <thead className="bg-[#F8F9FB]">
            <tr>
              {headingRow.cells.map((cell, index) => (
                <th
                  key={`${cell}-${index}`}
                  scope="col"
                  className="border-b border-slate-200 px-5 py-3.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-slate-500 uppercase"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {bodyRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className={`px-5 py-3.5 leading-relaxed ${
                      cellIndex === 0
                        ? "font-semibold text-slate-900"
                        : "text-slate-600"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
