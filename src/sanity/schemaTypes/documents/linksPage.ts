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
      validation: (Rule) => Rule.required().min(1),
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
