import { type TrackingParams } from "@/lib/tracking/params";

const nonQueryableSchemes = ["mailto:", "tel:"];

function acceptsQuery(href: string): boolean {
  return !nonQueryableSchemes.some((scheme) =>
    href.toLowerCase().startsWith(scheme),
  );
}

export type BuildTrackedHrefOptions = {
  defaultSource?: TrackingParams;
};

export function buildTrackedHref(
  href: string,
  params: TrackingParams,
  utmContent?: string,
  options?: BuildTrackedHrefOptions,
): string {
  const trimmedHref = href.trim();

  if (!acceptsQuery(trimmedHref)) {
    return trimmedHref;
  }

  const merged: TrackingParams = {
    ...(options?.defaultSource ?? {}),
    ...params,
  };

  if (utmContent) {
    merged.utm_content = utmContent;
  }

  if (Object.keys(merged).length === 0) {
    return trimmedHref;
  }

  const isAbsolute = /^https?:\/\//i.test(trimmedHref);
  const base = isAbsolute ? undefined : "https://mylarpro.com.br";

  try {
    const url = new URL(trimmedHref, base);

    for (const [key, value] of Object.entries(merged)) {
      url.searchParams.set(key, value);
    }

    return isAbsolute ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return trimmedHref;
  }
}
