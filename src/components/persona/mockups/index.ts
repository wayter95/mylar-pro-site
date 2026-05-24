import type { PersonaFeatureBlockVisual, PersonaSlug } from "@/lib/personas/types";
import { BrokerCatalogMockup } from "./BrokerCatalogMockup";
import { BrokerMobileMockup } from "./BrokerMobileMockup";
import { BrokerPipelineMockup } from "./BrokerPipelineMockup";
import { DevelopmentBIMockup } from "./DevelopmentBIMockup";
import { DevelopmentMetaAdsMockup } from "./DevelopmentMetaAdsMockup";
import { DevelopmentMirrorMockup } from "./DevelopmentMirrorMockup";
import { RealEstateBillingMockup } from "./RealEstateBillingMockup";
import { RealEstateDashboardMockup } from "./RealEstateDashboardMockup";
import { RealEstateNegotiationsMockup } from "./RealEstateNegotiationsMockup";

type MockupProps = { accent: string; className?: string };
type MockupComponent = (props: MockupProps) => React.JSX.Element;

export const PERSONA_HERO_MOCKUP: Record<PersonaSlug, MockupComponent> = {
  broker: BrokerPipelineMockup,
  "real-estate": RealEstateNegotiationsMockup,
  development: DevelopmentMirrorMockup,
};

export const PERSONA_FEATURE_VISUAL: Record<PersonaFeatureBlockVisual, MockupComponent> = {
  "broker-pipeline": BrokerPipelineMockup,
  "broker-catalog": BrokerCatalogMockup,
  "broker-mobile": BrokerMobileMockup,
  "real-estate-negotiations": RealEstateNegotiationsMockup,
  "real-estate-billing": RealEstateBillingMockup,
  "real-estate-financial": RealEstateDashboardMockup,
  "development-mirror": DevelopmentMirrorMockup,
  "development-meta-ads": DevelopmentMetaAdsMockup,
  "development-bi": DevelopmentBIMockup,
};

export {
  BrokerCatalogMockup,
  BrokerMobileMockup,
  BrokerPipelineMockup,
  DevelopmentBIMockup,
  DevelopmentMetaAdsMockup,
  DevelopmentMirrorMockup,
  RealEstateBillingMockup,
  RealEstateDashboardMockup,
  RealEstateNegotiationsMockup,
};
