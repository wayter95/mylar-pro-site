import { brokerApp } from "./broker-app";
import { clientPortal } from "./client-portal";
import {
  BROKER_APP_URLS,
  CUSTOMER_PORTAL_URL,
  FEATURE_ORDER,
  REGISTER_URL,
  SIGNATURE_PORTAL_URL,
} from "./constants";
import { digitalSignature } from "./digital-signature";
import { propertyCatalog } from "./property-catalog";
import type { FeatureContent, FeatureSlug } from "./types";

export {
  BROKER_APP_URLS,
  CUSTOMER_PORTAL_URL,
  FEATURE_ORDER,
  REGISTER_URL,
  SIGNATURE_PORTAL_URL,
};

export const featuresRecord: Record<FeatureSlug, FeatureContent> = {
  "broker-app": brokerApp,
  "property-catalog": propertyCatalog,
  "client-portal": clientPortal,
  "digital-signature": digitalSignature,
};

export const allFeatureSlugs: FeatureSlug[] = [...FEATURE_ORDER];

export function getFeature(slug: string): FeatureContent | undefined {
  if (isFeatureSlug(slug)) {
    return featuresRecord[slug];
  }
  return undefined;
}

export function isFeatureSlug(slug: string): slug is FeatureSlug {
  return (FEATURE_ORDER as readonly string[]).includes(slug);
}
