import { Icons } from "@/lib/icons";
import type { FeatureBlock as FeatureBlockData } from "@/sanity/types/content";

export function FeatureBlock({ title, features }: FeatureBlockData) {
  return (
    <section className="my-10 rounded-2xl border border-slate-200 bg-white p-7">
      <h3 className="text-xl leading-snug font-extrabold tracking-tight text-slate-900">
        {title}
      </h3>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-slate-700"
          >
            <Icons.check
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-[#2facde]"
            />
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
}
