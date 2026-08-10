import { safeUrl } from "@/lib/safe-url";
import type { VideoBlock as VideoBlockData } from "@/sanity/types/content";

function getYoutubeEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\.|^m\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
    }

    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const id = url.pathname.startsWith("/embed/")
        ? url.pathname.slice("/embed/".length)
        : url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

export function VideoBlock({ title, url }: VideoBlockData) {
  const href = safeUrl(url);

  if (!href) {
    return null;
  }

  const embedUrl = getYoutubeEmbedUrl(href);

  if (!embedUrl) {
    return (
      <div className="my-10 rounded-2xl border border-slate-200 bg-[#F8F9FB] p-6">
        {title && (
          <p className="text-[15px] font-bold text-slate-900">{title}</p>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex text-[14px] font-semibold text-[#2facde] underline decoration-[#2facde]/40 underline-offset-4 transition hover:text-[#2599bb]"
        >
          Assistir ao vídeo
        </a>
      </div>
    );
  }

  return (
    <figure className="my-10">
      <div className="aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
        <iframe
          src={embedUrl}
          title={title ?? "Vídeo do artigo"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      </div>
      {title && (
        <figcaption className="mt-3 text-[13px] text-slate-500">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
