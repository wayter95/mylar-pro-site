import Link from "next/link";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Icons } from "@/lib/icons";
import { isSanityConfigured } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { getRecentPosts } from "@/sanity/lib/queries";
import type { PostPreview } from "@/sanity/types/content";

async function loadPosts(): Promise<PostPreview[]> {
  if (!isSanityConfigured) {
    console.error(
      "[HomeBlog] Sanity não configurado: defina NEXT_PUBLIC_SANITY_PROJECT_ID e NEXT_PUBLIC_SANITY_DATASET no build.",
    );
    return [];
  }

  try {
    return await getRecentPosts(3);
  } catch (error) {
    console.error("[HomeBlog] falha ao buscar posts:", error);
    return [];
  }
}

function coverUrl(post: PostPreview): string | undefined {
  if (!post.coverImage?.asset) return undefined;
  try {
    return urlForImage(post.coverImage).width(760).height(344).fit("crop").url();
  } catch {
    return undefined;
  }
}

export async function HomeBlog() {
  const posts = await loadPosts();

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 lg:gap-10">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2facde] uppercase">
              Blog
            </span>
            <h2 className="mt-3.5 text-[26px] leading-[1.12] font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Mercado imobiliário e novidades do produto.
            </h2>
          </div>

          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#2facde] transition hover:text-[#2599bb]"
          >
            Ver o blog
            <Icons.arrowRight
              aria-hidden
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} imageSrc={coverUrl(post)} />
          ))}
        </div>
      </div>
    </section>
  );
}
