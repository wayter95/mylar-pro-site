import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PersonasHubPage } from "@/components/persona/PersonasHubPage";
import { fetchPersonaFromPrices } from "@/lib/personas/plans-api";

export const metadata: Metadata = {
  title:
    "Para quem é o Mylar Pro — Corretor, Imobiliária ou Lançamentos",
  description:
    "Compare as três versões do Mylar Pro: corretor autônomo, imobiliária e lançamentos (incorporadora, construtora e loteadora). Veja preço inicial, módulos exclusivos e quem usa cada plano.",
  openGraph: {
    title: "Para quem é o Mylar Pro",
    description:
      "Plataforma que escala do corretor solo à incorporadora, construtora ou loteadora. Compare e escolha o ponto de partida.",
  },
};

export default async function PersonasHub() {
  const fromPrices = await fetchPersonaFromPrices();

  return (
    <main className="pt-14 sm:pt-16">
      <Header />
      <PersonasHubPage fromPrices={fromPrices} />
      <Footer />
    </main>
  );
}
