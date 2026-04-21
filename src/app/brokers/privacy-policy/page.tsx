import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { brokersPrivacyPolicy } from "@/lib/legal/brokers-privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy — Mylar Pro Brokers App",
  description:
    "Privacy Policy for the Mylar Pro Brokers app. Learn how we handle your personal data, camera, location, and photo permissions.",
  alternates: {
    canonical: "/brokers/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BrokersPrivacyPolicyEnPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <LegalDocument
          slug="privacy-policy"
          defaultLocale="en"
          alternateHref="/brokers/terms-of-use"
          alternateLabel={{ pt: "Termos de Uso", en: "Terms of Use" }}
          content={brokersPrivacyPolicy}
        />
      </main>
      <Footer />
    </>
  );
}
