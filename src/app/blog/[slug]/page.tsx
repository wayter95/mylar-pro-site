import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { ArticleBlockRenderer } from "@/components/blog/blocks/ArticleBlockRenderer";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { isSanityConfigured } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { getPostBySlug, getPublishedPostSlugs } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/types/content";

const SITE_URL = "https://mylarpro.com.br";

export const revalidate = 600;

type PageProps = { params: Promise<{ slug: string }> };

async function findPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) {
    console.error(
      "[blog/slug] Sanity não configurado: defina NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET no build.",
    );
    return null;
  }

  try {
    return await getPostBySlug(slug);
  } catch (error) {
    console.error(`[blog/slug] falha ao carregar "${slug}":`, error);
    return null;
  }
}

function socialImageUrl(post: Post) {
  if (!post.coverImage) {
    return undefined;
  }

  try {
    return urlForImage(post.coverImage)
      .width(1200)
      .height(630)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return undefined;
  }
}

export async function generateStaticParams() {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const slugs = await getPublishedPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("[blog/slug] generateStaticParams falhou:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);

  if (!post) {
    return {};
  }

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const canonical = `/blog/${post.slug}`;
  const image = socialImageUrl(post);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonical}`,
      title,
      description,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: image
        ? [{ url: image, alt: post.coverImage?.alt ?? post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await findPost(slug);

  if (!post) {
    notFound();
  }

  const coverImage = socialImageUrl(post);

  return (
    <main className="pt-14 sm:pt-16">
      <Header />

      <ArticleLayout>
        <ArticleHeader post={post} coverImageSrc={coverImage} />

        <div className="mt-10">
          <ArticleBlockRenderer blocks={post.content} />
        </div>
      </ArticleLayout>

      <ArticleJsonLd
        url={`${SITE_URL}/blog/${post.slug}`}
        headline={post.title}
        description={post.seo?.description ?? post.excerpt}
        publishedAt={post.publishedAt}
        authorName={post.author.name}
        section={post.category.title}
        imageUrl={coverImage}
      />

      <Footer />
    </main>
  );
}
