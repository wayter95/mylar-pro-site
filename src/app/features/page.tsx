import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { FeaturesHubPage } from "@/components/feature/FeaturesHubPage";

export const metadata: Metadata = {
  title: "Recursos do Mylar Pro — Tudo em uma plataforma",
  description:
    "Conheça os recursos do Mylar Pro: App do Corretor, Catálogo Público, Portal do Cliente e Assinatura Digital. Tudo integrado, em uma só plataforma.",
  openGraph: {
    title: "Recursos do Mylar Pro",
    description:
      "App do Corretor, Catálogo, Portal do Cliente e Assinatura Digital — integrados na mesma plataforma.",
  },
};

export default function FeaturesHub() {
  return (
    <main className="pt-14 sm:pt-16">
      <Header />
      <FeaturesHubPage />
      <Footer />
    </main>
  );
}
