import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import "../styles/globals.css";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

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
    "Plataforma completa para imobiliárias, incorporadoras, construtoras e loteadoras. CRM com Kanban, assinatura eletrônica, boleto e PIX integrados, portal do cliente e catálogo público de imóveis.",
  keywords: [
    "gestão imobiliária",
    "sistema imobiliário",
    "CRM imobiliário",
    "software para imobiliária",
    "assinatura eletrônica imóveis",
    "boleto aluguel",
    "plataforma imobiliária",
    "incorporadora software",
    "construtora software",
    "loteadora software",
    "gestão locação",
    "contratos digitais imobiliária",
  ],
  authors: [{ name: "Mylar Pro" }],
  creator: "Mylar Pro",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Mylar Pro",
    url: "https://mylarpro.com.br",
    title: "Mylar Pro — Gerencie Imóveis, Contratos e Cobranças em Um Só Lugar",
    description:
      "CRM, assinatura eletrônica, boleto/PIX, portal do cliente e catálogo para imobiliárias, incorporadoras, construtoras e loteadoras.",
    images: [
      {
        url: "/images/logo-full-color.svg",
        alt: "Mylar Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mylar Pro — Gestão Imobiliária Completa",
    description:
      "CRM, assinatura eletrônica, boleto/PIX, portal do cliente e catálogo para imobiliárias, incorporadoras, construtoras e loteadoras.",
    images: ["/images/logo-full-color.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(GSC_VERIFICATION
    ? { verification: { google: GSC_VERIFICATION } }
    : {}),
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
        <OrganizationJsonLd />
        {/* Google Tag Manager */}
        {GTM_ID && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
        {/* End Google Tag Manager */}

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

        {/* Google tag (gtag.js) */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        {/* End Google tag */}

        {children}

        {/* Cognizy Widget */}
        <Script id="cognizy-widget" strategy="afterInteractive">
          {`(function(){
  var d=document,f=d.createElement('iframe');
  f.src="https://cognizy.ai/widget?org=cmnnt9j2j00013smq9tyin6ct";
  f.allow="microphone";
  f.style.cssText="position:fixed;bottom:0;right:0;border:none;z-index:9999;width:100px;height:100px;background:transparent;pointer-events:none;max-width:100vw;max-height:100vh;";
  f.setAttribute("allowtransparency","true");
  d.body.appendChild(f);
  f.onload=function(){f.style.pointerEvents="auto";};
  var isOpen=false;
  function applySize(){
    if(isOpen){
      var isMobile=window.innerWidth<480;
      if(isMobile){
        f.style.width="100vw";
        f.style.height="100dvh";
        f.style.bottom="0";
        f.style.right="0";
      }else{
        f.style.width="440px";
        f.style.height="620px";
        f.style.bottom="0";
        f.style.right="0";
      }
    }else{
      f.style.width="100px";
      f.style.height="100px";
    }
  }
  window.addEventListener("message",function(e){
    if(e.data&&e.data.type==="conversa-widget-resize"){
      isOpen=!!e.data.isOpen;
      applySize();
    }
  });
  window.addEventListener("resize",applySize);
})();`}
        </Script>
        {/* End Cognizy Widget */}
      </body>
    </html>
  );
}
