import { StarIcon } from "@sanity/icons/Star";
import { defineField, defineType } from "sanity";

export const featureBlock = defineType({
  name: "featureBlock",
  title: "Lista de benefícios",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Benefícios",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", count: "features" },
    prepare: ({ title, count }) => ({
      title: title || "Lista de benefícios",
      subtitle: `${count?.length || 0} itens`,
      media: StarIcon,
    }),
  },
});
