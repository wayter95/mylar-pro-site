import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { homePrivacyPolicy } from "@/lib/legal/home-privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy — Mylar Pro Home App",
  description:
    "Privacy Policy for the Mylar Pro Home app. Learn how we handle personal data, biometrics, OTP authentication, and payment receipts for tenants and property owners.",
  alternates: {
    canonical: "/home/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <LegalDocument
          slug="privacy-policy"
          defaultLocale="pt"
          alternateHref="/home/terms-of-use"
          alternateLabel={{ pt: "Termos de Uso", en: "Terms of Use" }}
          content={homePrivacyPolicy}
        />
      </main>
      <Footer />
    </>
  );
}
