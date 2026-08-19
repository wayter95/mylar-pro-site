import {
  CONSENT_COOKIE_NAME,
  CONSENT_VERSION,
  type ConsentValue,
} from "@/lib/consent/types";

export function serializeConsent(value: ConsentValue): string {
  return `v${value.version}.${value.analytics ? 1 : 0}${
    value.marketing ? 1 : 0
  }.${value.timestamp}`;
}

export function parseConsent(raw: string | undefined): ConsentValue | null {
  if (!raw) {
    return null;
  }

  const match = /^v(\d+)\.([01])([01])\.(.+)$/.exec(raw.trim());

  if (!match) {
    return null;
  }

  const version = Number(match[1]);

  if (version !== CONSENT_VERSION) {
    return null;
  }

  return {
    version,
    analytics: match[2] === "1",
    marketing: match[3] === "1",
    timestamp: match[4],
  };
}

export function readConsentFromDocument(): ConsentValue | null {
  if (typeof document === "undefined") {
    return null;
  }

  const entry = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!entry) {
    return null;
  }

  return parseConsent(decodeURIComponent(entry.slice(CONSENT_COOKIE_NAME.length + 1)));
}
