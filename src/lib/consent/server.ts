import { parseConsent } from "@/lib/consent/cookie";
import { CONSENT_COOKIE_NAME, type ConsentValue } from "@/lib/consent/types";

type CookieReader = {
  cookies: { get(name: string): { value: string } | undefined };
};

export function readConsentFromRequest(
  request: CookieReader,
): ConsentValue | null {
  return parseConsent(request.cookies.get(CONSENT_COOKIE_NAME)?.value);
}

export function hasMarketingConsent(request: CookieReader): boolean {
  return readConsentFromRequest(request)?.marketing === true;
}

export function readConsentFromCookieHeader(
  header: string | null,
): ConsentValue | null {
  if (!header) {
    return null;
  }

  const entry = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!entry) {
    return null;
  }

  return parseConsent(
    decodeURIComponent(entry.slice(CONSENT_COOKIE_NAME.length + 1)),
  );
}

export function hasMarketingConsentFromHeaders(headers: Headers): boolean {
  return readConsentFromCookieHeader(headers.get("cookie"))?.marketing === true;
}
