const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mylar Pro",
  legalName: "My Lar",
  url: "https://mylarpro.com.br",
  logo: "https://mylarpro.com.br/images/logo-full-color.svg",
  description:
    "Plataforma completa de gestão imobiliária para imobiliárias, incorporadoras, construtoras, loteadoras e corretores autônomos. CRM, assinatura eletrônica, boleto e PIX, portal do cliente e catálogo público de imóveis.",
  taxID: "54.865.990/0001-50",
  email: "contato@mylarapp.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-61-98189-6419",
    contactType: "sales",
    availableLanguage: "Portuguese",
  },
  sameAs: [
    "https://www.instagram.com/mylar.app/",
    "https://www.linkedin.com/company/mylar-pro",
    "https://www.facebook.com/mylarapp",
  ],
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
    />
  );
}
