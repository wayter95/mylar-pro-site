import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { homeTermsOfUse } from "@/lib/legal/home-terms-of-use";

export const metadata: Metadata = {
  title: "Terms of Use — Mylar Pro Home App",
  description:
    "Terms and Conditions of Use for the Mylar Pro Home application for tenants and property owners managed by real estate agencies.",
  alternates: {
    canonical: "/home/terms-of-use",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomeTermsOfUsePage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <LegalDocument
          slug="terms-of-use"
          defaultLocale="pt"
          alternateHref="/home/privacy-policy"
          alternateLabel={{ pt: "Política de Privacidade", en: "Privacy Policy" }}
          content={homeTermsOfUse}
          appLabel="Mylar Pro Home"
        />
      </main>
      <Footer />
    </>
  );
}
