import { TagIcon } from "@sanity/icons/Tag";
import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categorias",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Categoria sem título",
      subtitle: subtitle || "Sem descrição",
      media: TagIcon,
    }),
  },
});
