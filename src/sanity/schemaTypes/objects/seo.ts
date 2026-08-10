import { SearchIcon } from "@sanity/icons/Search";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título para mecanismos de busca",
      type: "string",
      validation: (Rule) => Rule.max(60).warning("Prefira até 60 caracteres."),
    }),
    defineField({
      name: "description",
      title: "Descrição para mecanismos de busca",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160).warning("Prefira até 160 caracteres."),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
    prepare: ({ title, subtitle }) => ({
      title: title || "SEO",
      subtitle: subtitle || "Metadados de busca",
      media: SearchIcon,
    }),
  },
});
