import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { CampaignFunnel } from "@/components/landing/CampaignFunnel";
import { Trust } from "@/components/landing/Trust";
import { Features } from "@/components/landing/Features";
import { Personas } from "@/components/landing/Personas";
import { Stats } from "@/components/landing/Stats";
import { Roadmap } from "@/components/landing/Roadmap";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mylar Pro",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Plataforma de gestão imobiliária com CRM, assinatura eletrônica, portal de catálogo e módulo financeiro integrado para imobiliárias, construtoras e incorporadoras.",
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
      <CampaignFunnel />
      <Trust />
      <Features />
      <Personas />
      <Stats />
      <Roadmap />
      <CTA />
      <Footer />
    </main>
  );
}
