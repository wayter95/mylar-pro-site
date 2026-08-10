import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Imagem",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Imagem",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "image.alt",
      subtitle: "image.caption",
      media: "image.asset",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Imagem",
      subtitle: subtitle || "Bloco de imagem",
      media: media || ImageIcon,
    }),
  },
});
