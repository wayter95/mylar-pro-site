import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { defineField, defineType } from "sanity";

export const faqBlock = defineType({
  name: "faqBlock",
  title: "Perguntas frequentes",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "items",
      title: "Perguntas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Pergunta",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Resposta",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
            prepare: ({ title, subtitle }) => ({
              title: title || "Pergunta",
              subtitle: subtitle || "Sem resposta",
              media: HelpCircleIcon,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare: ({ title, items }) => ({
      title: title || "Perguntas frequentes",
      subtitle: `${items?.length || 0} perguntas`,
      media: HelpCircleIcon,
    }),
  },
});
