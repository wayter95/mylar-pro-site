import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { PartnersPage } from "@/components/partners/PartnersPage";

export const metadata: Metadata = {
  title: "Programa de parceiros — Mylar Pro",
  description:
    "Indique, venda ou implante o Mylar Pro e receba comissão recorrente enquanto o cliente continuar ativo. Sem custo de adesão, sem meta mínima e sem exclusividade.",
  openGraph: {
    title: "Programa de parceiros — Mylar Pro",
    description:
      "Três modelos de parceria para quem já atende o mercado imobiliário: indicar, vender ou implantar. Comissão recorrente e time comercial de apoio.",
  },
};

export default function Partners() {
  return (
    <>
      <Header />
      <PartnersPage />
      <Footer />
    </>
  );
}
