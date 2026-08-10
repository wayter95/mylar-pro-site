import { Icons } from "@/lib/icons";
import type { CalloutBlock as CalloutBlockData } from "@/sanity/types/content";

const TONES = {
  informação: {
    icon: Icons.alert,
    accent: "#2facde",
    surface: "border-[#2facde]/25 bg-[#2facde]/[0.06]",
  },
  dica: {
    icon: Icons.sparkles,
    accent: "#7c3aed",
    surface: "border-[#7c3aed]/25 bg-[#7c3aed]/[0.06]",
  },
  aviso: {
    icon: Icons.alert,
    accent: "#d97706",
    surface: "border-amber-300/60 bg-amber-50",
  },
} as const;

export function CalloutBlock({ tone, title, message }: CalloutBlockData) {
  const config = TONES[tone] ?? TONES.informação;
  const Icon = config.icon;

  return (
    <aside className={`my-9 rounded-2xl border p-6 ${config.surface}`}>
      <div className="flex items-center gap-2.5">
        <Icon aria-hidden className="size-4" style={{ color: config.accent }} />
        <span
          className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: config.accent }}
        >
          {tone}
        </span>
      </div>

      <h3 className="mt-3 text-[17px] leading-snug font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
        {message}
      </p>
    </aside>
  );
}
