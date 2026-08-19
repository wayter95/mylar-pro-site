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
