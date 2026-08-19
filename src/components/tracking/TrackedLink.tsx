"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { isExternalHref } from "@/lib/links";
import { buildTrackedHref } from "@/lib/tracking/build-href";
import { extractTrackingParams, type TrackingParams } from "@/lib/tracking/params";
import { trackLinkClick } from "@/lib/tracking/events";

type Props = {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
  utmContent?: string;
  trackingEvent?: string;
  entryParams?: TrackingParams;
  ariaLabel?: string;
};

export function TrackedLink({
  href,
  label,
  className,
  children,
  utmContent,
  trackingEvent,
  entryParams,
  ariaLabel,
}: Props) {
  const [clientParams, setClientParams] = useState<TrackingParams | null>(null);

  useEffect(() => {
    if (entryParams) {
      return;
    }

    setClientParams(extractTrackingParams(new URLSearchParams(window.location.search)));
  }, [entryParams]);

  const handleClick = useCallback(() => {
    trackLinkClick({
      label,
      href,
      eventName: trackingEvent ?? "ClickLink",
      utmContent,
    });
  }, [href, label, trackingEvent, utmContent]);

  const target = entryParams
    ? buildTrackedHref(href, entryParams, utmContent)
    : clientParams
      ? buildTrackedHref(href, clientParams, utmContent)
      : href;
  const external = isExternalHref(href);

  if (external) {
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={target} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
