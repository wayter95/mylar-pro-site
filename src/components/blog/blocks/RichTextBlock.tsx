import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { safeUrl } from "@/lib/safe-url";
import type { PortableTextBlock } from "@/sanity/types/content";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-[17px] leading-[1.75] text-slate-700">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-[1.75rem]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-3 text-xl leading-snug font-bold tracking-tight text-slate-900">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-[#2facde] pl-5 text-lg leading-[1.7] font-medium text-slate-800">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-[17px] leading-[1.75] text-slate-700 marker:text-[#2facde]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-[17px] leading-[1.75] text-slate-700 marker:font-semibold marker:text-[#2facde]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = safeUrl(value?.href);

      if (!href) {
        return <>{children}</>;
      }

      const className =
        "font-semibold text-[#2facde] underline decoration-[#2facde]/40 underline-offset-4 transition hover:text-[#2599bb]";

      if (href.startsWith("/")) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    },
  },
};

export function RichTextBlock({ content }: { content: PortableTextBlock[] }) {
  return <PortableText components={components} value={content} />;
}
