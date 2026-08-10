import { ai } from "./ai";
import { aiAttendance } from "./ai-attendance";
import { aiMedia } from "./ai-media";
import { billing } from "./billing";
import { brokerApp } from "./broker-app";
import { channels } from "./channels";
import { clientPortal } from "./client-portal";
import {
  BROKER_APP_URLS,
  CUSTOMER_PORTAL_URL,
  FEATURE_GROUPS,
  FEATURE_ORDER,
  HOME_APP_URLS,
  REGISTER_URL,
  SIGNATURE_PORTAL_URL,
} from "./constants";
import { crm } from "./crm";
import { digitalSignature } from "./digital-signature";
import { financial } from "./financial";
import { inspections } from "./inspections";
import { keys } from "./keys";
import { metaAds } from "./meta-ads";
import { mylarScore } from "./mylar-score";
import { properties } from "./properties";
import { propertyCatalog } from "./property-catalog";
import { schedule } from "./schedule";
import type { FeatureContent, FeatureSlug } from "./types";

export {
  BROKER_APP_URLS,
  CUSTOMER_PORTAL_URL,
  FEATURE_GROUPS,
  FEATURE_ORDER,
  HOME_APP_URLS,
  REGISTER_URL,
  SIGNATURE_PORTAL_URL,
};

export const featuresRecord: Record<FeatureSlug, FeatureContent> = {
  crm,
  channels,
  financial,
  ai,
  "ai-attendance": aiAttendance,
  "meta-ads": metaAds,
  schedule,
  billing,
  properties,
  inspections,
  keys,
  "mylar-score": mylarScore,
  "ai-media": aiMedia,
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
