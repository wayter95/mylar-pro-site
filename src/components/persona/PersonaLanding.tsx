import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PersonaComparison } from "@/components/persona/PersonaComparison";
import { PersonaCta } from "@/components/persona/PersonaCta";
import { PersonaFaq } from "@/components/persona/PersonaFaq";
import { PersonaFeatures } from "@/components/persona/PersonaFeatures";
import { PersonaHero } from "@/components/persona/PersonaHero";
import { PersonaPains } from "@/components/persona/PersonaPains";
import { PersonaPricing } from "@/components/persona/PersonaPricing";
import { PersonaSteps } from "@/components/persona/PersonaSteps";
import { PersonaSwitcher } from "@/components/persona/PersonaSwitcher";
import { PersonaTestimonials } from "@/components/persona/PersonaTestimonials";
import type { PersonaContent } from "@/lib/personas/types";

type Props = {
  persona: PersonaContent;
};

export function PersonaLanding({ persona }: Props) {
  return (
    <main className="pt-14 sm:pt-16">
      <Header />
      <PersonaHero persona={persona} />
      <PersonaPains pains={persona.pains} accent={persona.accent} />
      <PersonaFeatures
        blocks={persona.featureBlocks}
        features={persona.features}
        headline={persona.featuresHeadline}
        accent={persona.accent}
      />
      <PersonaSteps
        steps={persona.steps}
        headline={persona.stepsHeadline}
        accent={persona.accent}
      />
      <PersonaTestimonials testimonials={persona.testimonials} accent={persona.accent} />
      <PersonaPricing
        plans={persona.plans}
        personaLabel={persona.label}
        accent={persona.accent}
      />
      <PersonaComparison comparison={persona.comparison} accent={persona.accent} />
      <PersonaFaq faq={persona.faq} personaLabel={persona.label} />
      <PersonaCta persona={persona} />
      <Footer />
    </main>
  );
}
