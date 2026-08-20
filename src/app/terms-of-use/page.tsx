import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { siteTermsOfUse } from "@/lib/legal/site-terms-of-use";

export const metadata: Metadata = {
  title: "Termos de Uso — Mylar Pro",
  description:
    "Termos e Condições de Uso do site institucional da Mylar Pro.",
  alternates: {
    canonical: "/terms-of-use",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SiteTermsOfUsePage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <LegalDocument
          slug="terms-of-use"
          defaultLocale="pt"
          alternateHref="/privacy-policy"
          alternateLabel={{ pt: "Política de Privacidade", en: "Privacy Policy" }}
          content={siteTermsOfUse}
          appLabel="Mylar Pro"
        />
      </main>
      <Footer />
    </>
  );
}
