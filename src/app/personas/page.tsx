import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PersonasHubPage } from "@/components/persona/PersonasHubPage";

export const metadata: Metadata = {
  title: "Para quem é o Mylar Pro — Corretor, Imobiliária ou Incorporadora",
  description:
    "Compare as três versões do Mylar Pro: corretor autônomo, imobiliária e incorporadora. Veja preço inicial, módulos exclusivos e quem usa cada plano.",
  openGraph: {
    title: "Para quem é o Mylar Pro",
    description:
      "Plataforma que escala do corretor solo à incorporadora bilionária. Compare e escolha o ponto de partida.",
  },
};

export default function PersonasHub() {
  return (
    <main className="pt-14 sm:pt-16">
      <Header />
      <PersonasHubPage />
      <Footer />
    </main>
  );
}
