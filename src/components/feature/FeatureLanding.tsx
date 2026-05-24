import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { FeatureAudience } from "@/components/feature/FeatureAudience";
import { FeatureBenefits } from "@/components/feature/FeatureBenefits";
import { FeatureCta } from "@/components/feature/FeatureCta";
import { FeatureFaq } from "@/components/feature/FeatureFaq";
import { FeatureHero } from "@/components/feature/FeatureHero";
import { FeatureKeyPoints } from "@/components/feature/FeatureKeyPoints";
import { FeatureModes } from "@/components/feature/FeatureModes";
import type { FeatureContent } from "@/lib/features/types";

type Props = {
  feature: FeatureContent;
};

export function FeatureLanding({ feature }: Props) {
  return (
    <main className="pt-14 sm:pt-16">
      <Header />
      <FeatureHero feature={feature} />
      {feature.modes && feature.modes.length > 0 && (
        <FeatureModes modes={feature.modes} accent={feature.accent} />
      )}
      <FeatureKeyPoints
        keyPoints={feature.keyPoints}
        headline={feature.keyPointsHeadline}
        accent={feature.accent}
      />
      <FeatureBenefits
        benefits={feature.benefits}
        headline={feature.benefitsHeadline}
        accent={feature.accent}
      />
      <FeatureAudience
        audience={feature.audience}
        headline={feature.audienceHeadline}
        accent={feature.accent}
      />
      <FeatureFaq faq={feature.faq} label={feature.shortLabel} />
      <FeatureCta feature={feature} />
      <Footer />
    </main>
  );
}
