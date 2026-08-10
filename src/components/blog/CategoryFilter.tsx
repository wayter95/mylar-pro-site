import Link from "next/link";
import type { Category } from "@/sanity/types/content";

export function CategoryFilter({
  categories,
  selectedCategory,
  resultCount,
}: {
  categories: Category[];
  selectedCategory?: string;
  resultCount: number;
}) {
  const options = [
    { title: "Tudo", slug: undefined },
    ...categories.map((category) => ({
      title: category.title,
      slug: category.slug,
    })),
  ];

  return (
    <div className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Filtrar artigos por categoria"
        className="mx-auto flex max-w-7xl flex-wrap items-center gap-2.5 px-4 py-4 sm:px-6 lg:px-8"
      >
        <span className="mr-1.5 font-mono text-[11px] tracking-[0.14em] text-slate-400 uppercase">
          Filtrar
        </span>

        {options.map((option) => {
          const active = option.slug === selectedCategory;

          return (
            <Link
              key={option.slug ?? "all"}
              href={
                option.slug
                  ? `/blog?categoria=${encodeURIComponent(option.slug)}`
                  : "/blog"
              }
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-4 py-2 text-[13.5px] font-semibold transition ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {option.title}
            </Link>
          );
        })}

        <span className="ml-auto text-[13px] text-slate-400">
          {resultCount === 1 ? "1 artigo" : `${resultCount} artigos`}
        </span>
      </nav>
    </div>
  );
}
