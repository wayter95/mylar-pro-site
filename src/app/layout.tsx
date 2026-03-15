import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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
    "Plataforma completa para imobiliárias e incorporadoras. CRM com Kanban, assinatura eletrônica, boleto e PIX integrados, portal do cliente e catálogo público de imóveis.",
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
      "CRM, assinatura eletrônica, boleto/PIX, portal do cliente e catálogo para imobiliárias e incorporadoras.",
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
        {/* Meta Pixel Code */}
        {META_PIXEL_ID && (
          <>
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${META_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        {/* End Meta Pixel Code */}
        {children}
      </body>
    </html>
  );
}
