import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mylarpro.com.br"),
  title: {
    default: "Mylar Pro | Plataforma de Gestão Imobiliária com CRM, Assinatura Eletrônica e Financeiro Integrado",
    template: "%s | Mylar Pro",
  },
  description:
    "Plataforma completa para imobiliárias e incorporadoras. CRM com Kanban, assinatura eletrônica, boleto e PIX integrados, catálogo público e notificações via WhatsApp. Crie sua conta grátis.",
  keywords: [
    "gestão imobiliária",
    "sistema imobiliário",
    "CRM imobiliário",
    "software para imobiliária",
    "assinatura eletrônica imóveis",
    "boleto aluguel",
    "plataforma imobiliária",
    "incorporadora software",
    "gestão locação",
    "contratos digitais imobiliária",
  ],
  authors: [{ name: "Mylar Pro" }],
  creator: "Mylar Pro",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Mylar Pro",
    title: "Mylar Pro — Gerencie Imóveis, Contratos e Cobranças em Um Só Lugar",
    description:
      "CRM, assinatura eletrônica, boleto/PIX e catálogo para imobiliárias e incorporadoras. Crie sua conta grátis.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${jakarta.variable} overflow-x-hidden font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
