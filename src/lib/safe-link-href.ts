import { safeUrl } from "@/lib/safe-url";

const mailtoPattern = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const telPattern = /^tel:\+?[\d\s().-]{6,}$/i;

export function safeLinkHref(value: string | undefined): string | null {
  const candidate = value?.trim();

  if (!candidate) {
    return null;
  }

  if (mailtoPattern.test(candidate) || telPattern.test(candidate)) {
    return candidate;
  }

  return safeUrl(candidate);
}
