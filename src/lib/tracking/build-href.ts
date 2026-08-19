import { DEFAULT_SOURCE, type TrackingParams } from "@/lib/tracking/params";

const nonQueryableSchemes = ["mailto:", "tel:"];

function acceptsQuery(href: string): boolean {
  return !nonQueryableSchemes.some((scheme) =>
    href.toLowerCase().startsWith(scheme),
  );
}

export function buildTrackedHref(
  href: string,
  params: TrackingParams,
  utmContent?: string,
): string {
  if (!acceptsQuery(href)) {
    return href;
  }

  const merged: TrackingParams = {
    ...DEFAULT_SOURCE,
    ...params,
  };

  if (utmContent) {
    merged.utm_content = utmContent;
  }

  const isAbsolute = /^https?:\/\//i.test(href);
  const base = isAbsolute ? undefined : "https://mylarpro.com.br";

  try {
    const url = new URL(href, base);

    for (const [key, value] of Object.entries(merged)) {
      url.searchParams.set(key, value);
    }

    return isAbsolute ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}
