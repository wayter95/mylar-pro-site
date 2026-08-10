import { ArticleCard } from "@/components/blog/ArticleCard";
import { urlForImage } from "@/sanity/lib/image";
import type { PostPreview } from "@/sanity/types/content";

export function RelatedArticles({
  posts,
  title = "Leia também",
}: {
  posts: PostPreview[];
  title?: string;
}) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={title}
      className="mt-14 border-t border-slate-200 pt-10"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-slate-300" />
        <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
          {title}
        </span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <ArticleCard
            key={post._id ?? post.slug}
            post={post}
            imageSrc={
              post.coverImage
                ? urlForImage(post.coverImage)
                    .width(760)
                    .height(428)
                    .fit("crop")
                    .auto("format")
                    .url()
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
