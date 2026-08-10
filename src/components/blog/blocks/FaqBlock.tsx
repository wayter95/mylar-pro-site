import type { FaqBlock as FaqBlockData } from "@/sanity/types/content";

export function FaqBlock({
  title = "Perguntas frequentes",
  items,
}: FaqBlockData) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-label={title} className="my-10">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-slate-300" />
        <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
          Dúvidas
        </span>
      </div>

      <h3 className="mt-4 text-xl leading-snug font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h3>

      <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] leading-snug font-bold text-slate-900 marker:content-none">
              {item.question}
              <span
                aria-hidden
                className="mt-0.5 shrink-0 text-lg leading-none font-normal text-[#2facde] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
