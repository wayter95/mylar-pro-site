import { hasMarketingConsentInBrowser } from "@/components/consent/ConsentProvider";

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  fbq?: (...args: unknown[]) => void;
};

const dataLayerEventNames: Record<string, string> = {
  ClickLink: "link_click",
  ClickDemo: "click_demo",
  ClickTrial: "click_trial",
};

export type TrackClickInput = {
  label: string;
  href: string;
  eventName: string;
  utmContent?: string;
};

export function trackLinkClick(input: TrackClickInput): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!hasMarketingConsentInBrowser()) {
    return;
  }

  const scope = window as DataLayerWindow;
  const eventId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

  scope.dataLayer = scope.dataLayer ?? [];
  scope.dataLayer.push({
    event: dataLayerEventNames[input.eventName] ?? "link_click",
    link_label: input.label,
    link_url: input.href,
    utm_content: input.utmContent,
    event_id: eventId,
  });

  scope.fbq?.("trackCustom", input.eventName, {
    link_label: input.label,
    link_url: input.href,
  }, { eventID: eventId });
}
