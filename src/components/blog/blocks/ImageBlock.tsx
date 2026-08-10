import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/types/content";

export function ImageBlock({ image }: { image: SanityImage }) {
  const src = urlForImage(image).width(1440).fit("max").auto("format").url();

  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative aspect-[16/9]">
        <Image
          src={src}
          alt={image.alt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 768px, calc(100vw - 48px)"
          className="object-cover"
        />
      </div>
      {image.caption ? (
        <figcaption className="border-t border-slate-200 bg-[#F8F9FB] px-5 py-3 text-[13px] leading-relaxed text-slate-500">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
