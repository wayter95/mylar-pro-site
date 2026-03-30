import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a equipe Mylar Pro. Tire suas dúvidas sobre a plataforma de gestão imobiliária.",
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
