export const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
] as const;

export type TrackingParams = Record<string, string>;

export const DEFAULT_SOURCE: TrackingParams = {
  utm_source: "site",
  utm_medium: "links-page",
};

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export function extractTrackingParams(
  source: URLSearchParams | Record<string, string | string[] | undefined>,
): TrackingParams {
  const params: TrackingParams = {};

  for (const key of TRACKED_PARAMS) {
    const raw =
      source instanceof URLSearchParams
        ? source.get(key) ?? undefined
        : firstValue(source[key]);
    const value = raw?.trim();

    if (value) {
      params[key] = value;
    }
  }

  return params;
}
