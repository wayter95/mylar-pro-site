import Image from "next/image";
import Link from "next/link";
import {
  categoryAccent,
  formatPostDateShort,
  formatReadingTime,
} from "@/components/blog/format";
import type { PostPreview } from "@/sanity/types/content";

export function ArticleCard({
  post,
  imageSrc,
}: {
  post: PostPreview;
  imageSrc?: string;
}) {
  const accent = categoryAccent(post.category.title);

  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Ler o artigo: ${post.title}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
    >
      <div className="relative h-[172px] border-b border-slate-200">
        {imageSrc && post.coverImage ? (
          <Image
            src={imageSrc}
            alt={post.coverImage.alt}
            fill
            unoptimized
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #eef6f9 0 10px, #f8fafc 10px 20px)",
            }}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2.5">
          <span
            className="font-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase"
            style={{ color: accent }}
          >
            {post.category.title}
          </span>
          <span aria-hidden className="text-slate-300">
            ·
          </span>
          <span className="text-[11.5px] text-slate-500">
            {formatPostDateShort(post.publishedAt)}
          </span>
        </div>

        <h3 className="mt-2.5 text-[17.5px] leading-[1.32] font-extrabold tracking-tight text-slate-900">
          {post.title}
        </h3>

        <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-600">
          {post.excerpt}
        </p>

        <span className="mt-4 font-mono text-[11px] tracking-[0.08em] text-slate-400">
          {formatReadingTime(post.readingTime)}
        </span>
      </div>
    </Link>
  );
}
