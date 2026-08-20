import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { sitePrivacyPolicy } from "@/lib/legal/site-privacy-policy";

export const metadata: Metadata = {
  title: "Política de Privacidade — Mylar Pro",
  description:
    "Política de Privacidade do site institucional da Mylar Pro. Saiba como tratamos dados de navegação, formulários e cookies.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SitePrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <LegalDocument
          slug="privacy-policy"
          defaultLocale="pt"
          alternateHref="/terms-of-use"
          alternateLabel={{ pt: "Termos de Uso", en: "Terms of Use" }}
          content={sitePrivacyPolicy}
          appLabel="Mylar Pro"
        />
      </main>
      <Footer />
    </>
  );
}
