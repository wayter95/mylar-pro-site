import { getIcon } from "@/lib/icons";
import type { SocialItem } from "@/lib/links";

export function SocialRow({ items }: { items: SocialItem[] }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {items.map((social) => {
        const Icon = getIcon(social.icon);
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex size-11 items-center justify-center rounded-full border border-slate-700 bg-white/5 text-slate-300 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#2facde] hover:text-[#2facde]"
          >
            <Icon className="size-5" />
          </a>
        );
      })}
    </div>
  );
}
