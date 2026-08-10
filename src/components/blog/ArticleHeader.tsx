import Image from "next/image";
import Link from "next/link";
import {
  categoryAccent,
  formatPostDate,
  formatReadingTime,
} from "@/components/blog/format";
import { urlForImage } from "@/sanity/lib/image";
import type { Post } from "@/sanity/types/content";

export function ArticleHeader({
  post,
  coverImageSrc,
}: {
  post: Post;
  coverImageSrc?: string;
}) {
  const accent = categoryAccent(post.category.title);
  const authorPhotoSrc = post.author.photo
    ? urlForImage(post.author.photo)
        .width(96)
        .height(96)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return (
    <header className="border-b border-slate-200 pb-10">
      <nav
        aria-label="Trilha de navegação"
        className="font-mono text-[11px] tracking-[0.14em] text-slate-400 uppercase"
      >
        <Link href="/blog" className="transition hover:text-slate-600">
          Blog
        </Link>
        <span aria-hidden className="px-2">
          /
        </span>
        <Link
          href={`/blog?categoria=${encodeURIComponent(post.category.slug)}`}
          className="transition hover:text-slate-600"
          style={{ color: accent }}
        >
          {post.category.title}
        </Link>
      </nav>

      <h1 className="mt-6 text-[2rem] leading-[1.08] font-extrabold tracking-tight text-slate-900 sm:text-[2.5rem]">
        {post.title}
      </h1>

      <p className="mt-5 text-[17px] leading-relaxed text-slate-600 sm:text-lg">
        {post.excerpt}
      </p>

      <div className="mt-8 flex items-center gap-3">
        {authorPhotoSrc && post.author.photo ? (
          <Image
            src={authorPhotoSrc}
            alt={post.author.photo.alt}
            width={40}
            height={40}
            unoptimized
            className="size-10 shrink-0 rounded-full border border-slate-200 object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#F8F9FB] text-[13px] font-bold text-slate-500"
          >
            {getInitials(post.author.name)}
          </span>
        )}

        <div>
          <p className="text-[14px] font-bold text-slate-900">
            {post.author.name}
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-slate-400">
            {formatPostDate(post.publishedAt)} ·{" "}
            {formatReadingTime(post.readingTime)}
          </p>
        </div>
      </div>

      {coverImageSrc && post.coverImage ? (
        <figure className="relative mt-9 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200">
          <Image
            src={coverImageSrc}
            alt={post.coverImage.alt}
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 768px, calc(100vw - 48px)"
            className="object-cover"
          />
        </figure>
      ) : null}
    </header>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
