import { AiSection } from "@/components/landing/AiSection";
import { AntiChaosSection } from "@/components/landing/AntiChaosSection";
import { CTA } from "@/components/landing/CTA";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { HomeBlog } from "@/components/landing/HomeBlog";
import { HomeFaq } from "@/components/landing/HomeFaq";
import { MobileApps } from "@/components/landing/MobileApps";
import { Newsletter } from "@/components/landing/Newsletter";
import { PersonaCards } from "@/components/landing/PersonaCards";
import { PricingTeaser } from "@/components/landing/PricingTeaser";
import { BROKER_APP_URLS, HOME_APP_URLS } from "@/lib/features";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Mylar Pro",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Plataforma de gestão imobiliária com CRM, canais de atendimento, assinatura de contratos, cobranças e financeiro integrados para imobiliárias, construtoras, incorporadoras e loteadoras.",
    },
    {
      "@type": "MobileApplication",
      name: "MyLar Pro Brokers",
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android",
      description:
        "Aplicativo do corretor: carteira, pipeline, agenda e captação de imóvel funcionando offline durante a visita.",
      downloadUrl: [BROKER_APP_URLS.appStore, BROKER_APP_URLS.playStore],
    },
    {
      "@type": "MobileApplication",
      name: "MyLar Pro Home",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "iOS, Android",
      description:
        "Aplicativo do inquilino e do proprietário: fatura, comprovante, chamado de manutenção e demonstrativo de repasse.",
      downloadUrl: [HOME_APP_URLS.appStore, HOME_APP_URLS.playStore],
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <AntiChaosSection />
      <Features />
      <AiSection />
      <MobileApps />
      <PersonaCards />
      <PricingTeaser />
      <HomeBlog />
      <HomeFaq />
      <CTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
