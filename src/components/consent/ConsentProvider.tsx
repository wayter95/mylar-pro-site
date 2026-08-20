"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { readConsentFromDocument } from "@/lib/consent/cookie";
import type { ConsentValue } from "@/lib/consent/types";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  dataLayer?: Array<unknown>;
};

type ConsentContextValue = {
  consent: ConsentValue | null;
  decided: boolean;
  save: (analytics: boolean, marketing: boolean) => Promise<void>;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function applyToTools(analytics: boolean, marketing: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  const scope = window as GtagWindow;

  scope.dataLayer = scope.dataLayer ?? [];

  function gtag(...args: unknown[]) {
    scope.dataLayer?.push(args);
  }

  gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });

  scope.fbq?.("consent", marketing ? "grant" : "revoke");
}

export function hasMarketingConsentInBrowser(): boolean {
  return readConsentFromDocument()?.marketing === true;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [decided, setDecided] = useState(true);

  useEffect(() => {
    const stored = readConsentFromDocument();
    setConsent(stored);
    setDecided(stored !== null);

    if (stored) {
      applyToTools(stored.analytics, stored.marketing);
    }
  }, []);

  const save = useCallback(async (analytics: boolean, marketing: boolean) => {
    try {
      const response = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analytics, marketing }),
      });

      if (!response.ok) {
        throw new Error(`Consent endpoint returned ${response.status}`);
      }
    } catch (error) {
      console.error("[Consent] Falha ao registrar a escolha:", error);
      return;
    }

    applyToTools(analytics, marketing);
    setConsent(readConsentFromDocument());
    setDecided(true);
  }, []);

  const value = useMemo(
    () => ({ consent, decided, save }),
    [consent, decided, save],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used inside ConsentProvider.");
  }

  return context;
}
