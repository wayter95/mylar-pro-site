import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Imagem",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "asset",
      title: "Arquivo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "alt",
      title: "Texto alternativo",
      description: "Descreva a imagem para leitores de tela.",
      type: "string",
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          const parent = context.parent as { asset?: unknown } | undefined;
          return parent?.asset && !alt?.trim()
            ? "Inclua o texto alternativo quando houver uma imagem."
            : true;
        }),
    }),
    defineField({
      name: "caption",
      title: "Legenda",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "alt", subtitle: "caption", media: "asset" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Imagem",
      subtitle: subtitle || "Sem legenda",
      media: media || ImageIcon,
    }),
  },
});
