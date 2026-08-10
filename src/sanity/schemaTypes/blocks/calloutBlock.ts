import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { defineField, defineType } from "sanity";

export const calloutBlock = defineType({
  name: "calloutBlock",
  title: "Destaque",
  type: "object",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Mensagem",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tone",
      title: "Tom",
      type: "string",
      options: { list: ["informação", "dica", "aviso"] },
      initialValue: "informação",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "message" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Destaque",
      subtitle: subtitle || "Sem mensagem",
      media: InfoOutlineIcon,
    }),
  },
});
