export function BlogEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-slate-300" />
        <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
          Em breve
        </span>
        <span className="h-px w-8 bg-slate-300" />
      </div>

      <h2 className="mt-5 text-xl leading-snug font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  );
}
