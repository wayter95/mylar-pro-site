export const CONSENT_COOKIE_NAME = "mylar-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_SECONDS = 15552000;

export type ConsentCategory = "analytics" | "marketing";

export type ConsentValue = {
  version: number;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};
