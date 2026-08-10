import { ListIcon } from "@sanity/icons/List";
import { defineField, defineType } from "sanity";

export const tableBlock = defineType({
  name: "tableBlock",
  title: "Tabela",
  type: "object",
  icon: ListIcon,
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "rows",
      title: "Linhas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Células",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({
              title: cells?.join(" | ") || "Linha",
              media: ListIcon,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", rows: "rows" },
    prepare: ({ title, rows }) => ({
      title: title || "Tabela",
      subtitle: `${rows?.length || 0} linhas`,
      media: ListIcon,
    }),
  },
});
