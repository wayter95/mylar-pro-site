import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { brokersTermsOfUse } from "@/lib/legal/brokers-terms-of-use";

export const metadata: Metadata = {
  title: "Terms of Use — Mylar Pro Brokers App",
  description:
    "Terms and Conditions of Use for the Mylar Pro Brokers application for authorized real estate professionals.",
  alternates: {
    canonical: "/brokers/terms-of-use",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BrokersTermsOfUseEnPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <LegalDocument
          slug="terms-of-use"
          defaultLocale="en"
          alternateHref="/brokers/privacy-policy"
          alternateLabel={{ pt: "Política de Privacidade", en: "Privacy Policy" }}
          content={brokersTermsOfUse}
        />
      </main>
      <Footer />
    </>
  );
}
