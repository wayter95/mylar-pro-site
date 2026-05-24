import { AntiChaosSection } from "@/components/landing/AntiChaosSection";
import { CampaignFunnel } from "@/components/landing/CampaignFunnel";
import { CTA } from "@/components/landing/CTA";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { GettingStarted } from "@/components/landing/GettingStarted";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Personas } from "@/components/landing/Personas";
import { Newsletter } from "@/components/landing/Newsletter";
import { Trust } from "@/components/landing/Trust";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mylar Pro",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Plataforma de gestão imobiliária com CRM, assinatura eletrônica, portal de catálogo e módulo financeiro integrado para imobiliárias, construtoras, incorporadoras e loteadoras.",
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
      <DashboardPreview />
      <Features />
      <AntiChaosSection />
      <CampaignFunnel />
      <Trust />
      <Personas />
      <GettingStarted />
      <CTA />
      <Newsletter />
      <Footer />
    </main>
  );
}
