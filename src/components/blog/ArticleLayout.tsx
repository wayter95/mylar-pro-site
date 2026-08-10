import type { ReactNode } from "react";

export function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white pt-12 pb-20 sm:pt-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">{children}</article>
      </div>
    </div>
  );
}
