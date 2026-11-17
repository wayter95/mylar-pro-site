import type { Metadata } from "next";
import { RaioXFlow } from "@/components/raio-x/RaioXFlow";

export const metadata: Metadata = {
  title: "Raio X MyLar: diagnóstico gratuito do seu negócio imobiliário",
  description:
    "Responda cerca de 10 perguntas e receba um diagnóstico da sua imobiliária ou da sua atuação como corretor, com as prioridades dos próximos 90 dias.",
  robots: { index: false, follow: false },
};

export default async function RaioXPage({
  searchParams,
}: {
  searchParams: Promise<{ exemplo?: string }>;
}) {
  const { exemplo } = await searchParams;
  return <RaioXFlow showExample={exemplo === "imobiliaria"} />;
}
