type ArticleJsonLdProps = {
  url: string;
  headline: string;
  description: string;
  publishedAt: string;
  authorName: string;
  section?: string;
  imageUrl?: string;
};

export function ArticleJsonLd({
  url,
  headline,
  description,
  publishedAt,
  authorName,
  section,
  imageUrl,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: "pt-BR",
    articleSection: section,
    image: imageUrl,
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: "Mylar Pro",
      logo: {
        "@type": "ImageObject",
        url: "https://mylarpro.com.br/images/logo-full-color.svg",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
