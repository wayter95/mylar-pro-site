import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { BlogHero } from "@/components/blog/BlogHero";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { isSanityConfigured } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { getAllPosts, getCategories } from "@/sanity/lib/queries";
import type {
  Category,
  PostPreview,
  SanityImage,
} from "@/sanity/types/content";

export const metadata: Metadata = {
  title: "Blog do Mylar Pro — Mercado imobiliário e novidades da plataforma",
  description:
    "Índices de reajuste, legislação, gestão de carteira e as novidades que entram no Mylar Pro. Conteúdo para imobiliárias, incorporadoras e loteadoras.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    title: "Blog do Mylar Pro",
    description:
      "O que muda no mercado imobiliário — e o que muda na plataforma.",
  },
};

type BlogData = {
  posts: PostPreview[];
  categories: Category[];
};

async function getBlogData(): Promise<BlogData> {
  if (!isSanityConfigured) {
    console.error(
      "[blog] Sanity não configurado: defina NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET no build.",
    );
    return { posts: [], categories: [] };
  }

  try {
    const [posts, categories] = await Promise.all([
      getAllPosts(),
      getCategories(),
    ]);

    return { posts, categories };
  } catch (error) {
    console.error("[blog] falha ao buscar posts:", error);
    return { posts: [], categories: [] };
  }
}

function coverImageSrc(
  image: SanityImage | undefined,
  width: number,
  height: number,
) {
  if (!image) {
    return undefined;
  }

  try {
    return urlForImage(image)
      .width(width)
      .height(height)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return undefined;
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string | string[] }>;
}) {
  const { categoria } = await searchParams;
  const selectedCategory = typeof categoria === "string" ? categoria : undefined;

  const { posts, categories } = await getBlogData();

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category.slug === selectedCategory)
    : posts;

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <main className="pt-14 sm:pt-16">
      <Header />
      <BlogHero />

      {posts.length > 0 ? (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          resultCount={filteredPosts.length}
        />
      ) : null}

      <section className="bg-[#FAFAFA] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <BlogEmptyState
              title="Em breve os primeiros artigos"
              description="Estamos preparando o conteúdo do blog. Volte em alguns dias para acompanhar as análises do mercado e as novidades da plataforma."
            />
          ) : filteredPosts.length === 0 ? (
            <BlogEmptyState
              title="Nenhum artigo nesta categoria"
              description="Ainda não publicamos nada por aqui. Escolha outra categoria ou veja todos os artigos."
            />
          ) : (
            <>
              <FeaturedArticle
                post={featuredPost}
                imageSrc={coverImageSrc(featuredPost.coverImage, 1200, 675)}
              />

              {remainingPosts.length > 0 ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
                  {remainingPosts.map((post) => (
                    <ArticleCard
                      key={post._id ?? post.slug}
                      post={post}
                      imageSrc={coverImageSrc(post.coverImage, 760, 428)}
                    />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
