import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

export const linksPage = defineType({
  name: "linksPage",
  title: "Página de Links",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "tagline",
      title: "Frase de apoio",
      description: "Texto curto exibido abaixo do logo.",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "links",
      title: "Botões",
      description: "Arraste para reordenar.",
      type: "array",
      of: [{ type: "linkButton" }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((links) => {
            if (!Array.isArray(links)) {
              return true;
            }

            const slugs = links
              .map((link) =>
                typeof link === "object" && link !== null
                  ? (link as { shortSlug?: unknown }).shortSlug
                  : undefined,
              )
              .filter((slug): slug is string => typeof slug === "string" && slug.length > 0);

            const duplicates = slugs.filter(
              (slug, index) => slugs.indexOf(slug) !== index,
            );

            return duplicates.length === 0
              ? true
              : `Atalho repetido: ${[...new Set(duplicates)].join(", ")}. Cada atalho deve ser único.`;
          }),
    }),
  ],
  preview: {
    select: { subtitle: "tagline" },
    prepare: ({ subtitle }) => ({
      title: "Página de Links",
      subtitle: subtitle || "Sem frase de apoio",
      media: LinkIcon,
    }),
  },
});
