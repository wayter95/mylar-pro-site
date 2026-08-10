import Link from "next/link";
import { Icons } from "@/lib/icons";
import { safeUrl } from "@/lib/safe-url";
import type { CtaBlock as CtaBlockData } from "@/sanity/types/content";

const BUTTON_CLASS =
  "mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2facde] px-6 py-3 text-[15px] font-semibold text-white transition hover:-translate-y-0.5";

const BUTTON_SHADOW = { boxShadow: "0 14px 24px -14px rgba(47, 172, 222, 0.7)" };

export function CtaBlock({ label, destination }: CtaBlockData) {
  const href = safeUrl(destination);

  if (!href) {
    return null;
  }

  const internal = href.startsWith("/");

  return (
    <div className="my-10 rounded-2xl border border-slate-200 bg-[#FAFAF7] p-7">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-slate-300" />
        <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
          No Mylar Pro
        </span>
      </div>

      {internal ? (
        <Link href={href} className={BUTTON_CLASS} style={BUTTON_SHADOW}>
          {label}
          <Icons.arrowRight aria-hidden className="size-4" />
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={BUTTON_CLASS}
          style={BUTTON_SHADOW}
        >
          {label}
          <Icons.arrowRight aria-hidden className="size-4" />
        </a>
      )}
    </div>
  );
}
