import type { Metadata } from "next";
import Image from "next/image";
import { linkItems, profile, socialItems, type LinkItem, type SocialItem } from "@/lib/links";
import { LinkButton } from "@/components/links/LinkButton";
import { SocialRow } from "@/components/links/SocialRow";
import { AnimateIn, AnimateInStagger } from "@/components/landing/AnimateIn";
import { getLinksPage, getSocialLinks } from "@/sanity/lib/queries";
import { extractTrackingParams } from "@/lib/tracking/params";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Todos os links do Mylar Pro num só lugar: agende uma demonstração, crie sua conta, baixe o app do corretor e fale com a gente.",
  openGraph: {
    title: "Links | Mylar Pro",
    description:
      "Todos os links do Mylar Pro num só lugar: demonstração, conta grátis, app do corretor e contato.",
  },
};

export default async function LinksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [content, socials, resolvedSearchParams] = await Promise.all([
    getLinksPage(),
    getSocialLinks(),
    searchParams,
  ]);

  const entryParams = extractTrackingParams(resolvedSearchParams);

  const tagline = content?.tagline ?? profile.tagline;
  const links = content
    ? content.links
    : linkItems.map((item) => ({
        label: item.label,
        href: item.href,
        icon: item.icon as string,
        variant: item.variant,
        utmContent: undefined,
        trackingEvent: undefined,
        shortSlug: undefined,
      }));
  const socialRow: SocialItem[] = socials
    ? socials.map((social) => ({
        label: social.label,
        href: social.href,
        icon: social.icon as SocialItem["icon"],
      }))
    : socialItems;

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -top-1/4 right-0 h-[600px] w-[800px] rounded-full bg-[#2facde]/8 blur-[120px]" />
        <div className="absolute -bottom-1/4 left-0 h-[400px] w-[600px] rounded-full bg-[#2facde]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <AnimateIn className="flex flex-col items-center text-center">
          <Image
            src="/images/logo-white.svg"
            alt="Mylar Pro"
            width={160}
            height={42}
            className="h-10 w-auto"
            priority
          />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {tagline}
          </p>
        </AnimateIn>

        <AnimateInStagger className="mt-10 flex flex-col gap-3">
          {links.map((item) => (
            <LinkButton
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon as LinkItem["icon"]}
              variant={item.variant}
              utmContent={item.utmContent}
              trackingEvent={item.trackingEvent}
              entryParams={entryParams}
            />
          ))}
        </AnimateInStagger>

        <div className="mt-10">
          <SocialRow items={socialRow} />
        </div>

        <p className="mt-10 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Mylar Pro. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}
