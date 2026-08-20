"use client";

import { getIcon } from "@/lib/icons";
import type { LinkItem } from "@/lib/links";
import { AnimateInItem } from "@/components/landing/AnimateIn";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import type { TrackingParams } from "@/lib/tracking/params";

const baseClasses =
  "group flex w-full items-center gap-3 rounded-xl px-5 py-4 text-base font-semibold transition";

const variantClasses = {
  primary:
    "bg-[#2facde] text-white shadow-[0_14px_28px_-12px_rgba(47,172,222,0.4)] hover:-translate-y-0.5 hover:bg-[#2599bb] hover:shadow-[0_20px_36px_-12px_rgba(47,172,222,0.5)]",
  secondary:
    "border border-slate-700 bg-white/5 text-slate-200 backdrop-blur-sm hover:-translate-y-0.5 hover:border-slate-500 hover:bg-white/10",
} as const;

const ArrowIcon = getIcon("arrowRight");

type Props = LinkItem & {
  utmContent?: string;
  trackingEvent?: string;
  entryParams?: TrackingParams;
  applyDefaultSource?: boolean;
};

export function LinkButton({
  label,
  href,
  icon,
  variant,
  utmContent,
  trackingEvent,
  entryParams,
  applyDefaultSource,
}: Props) {
  const Icon = getIcon(icon);

  return (
    <AnimateInItem>
      <TrackedLink
        href={href}
        label={label}
        className={`${baseClasses} ${variantClasses[variant]}`}
        utmContent={utmContent}
        trackingEvent={trackingEvent}
        entryParams={entryParams}
        applyDefaultSource={applyDefaultSource}
      >
        <Icon className="size-5 shrink-0" />
        <span className="flex-1 text-left">{label}</span>
        <ArrowIcon className="size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5" />
      </TrackedLink>
    </AnimateInItem>
  );
}
