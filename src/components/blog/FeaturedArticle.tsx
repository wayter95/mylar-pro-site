import Image from "next/image";
import Link from "next/link";
import {
  categoryAccent,
  formatPostDateShort,
  formatReadingTime,
} from "@/components/blog/format";
import { Icons } from "@/lib/icons";
import type { PostPreview } from "@/sanity/types/content";

export function FeaturedArticle({
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
      aria-label={`Ler o artigo em destaque: ${post.title}`}
      className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm lg:grid-cols-[1.05fr_0.95fr]"
    >
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Em destaque
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
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
            {formatPostDateShort(post.publishedAt)} ·{" "}
            {formatReadingTime(post.readingTime)}
          </span>
        </div>

        <h2 className="mt-3 text-2xl leading-[1.14] font-extrabold tracking-tight text-slate-900 sm:text-[2rem]">
          {post.title}
        </h2>

        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
          {post.excerpt}
        </p>

        <span className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#2facde] transition-transform group-hover:translate-x-0.5">
          Ler o artigo
          <Icons.arrowRight aria-hidden className="size-3.5" />
        </span>
      </div>

      <div className="relative min-h-64 border-t border-slate-200 lg:min-h-80 lg:border-t-0 lg:border-l">
        {imageSrc && post.coverImage ? (
          <Image
            src={imageSrc}
            alt={post.coverImage.alt}
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #eef6f9 0 12px, #f8fafc 12px 24px)",
            }}
          />
        )}
      </div>
    </Link>
  );
}
