import { SplitVerticalIcon } from "@sanity/icons/SplitVertical";
import { defineField, defineType } from "sanity";

export const comparisonBlock = defineType({
  name: "comparisonBlock",
  title: "Comparativo",
  type: "object",
  icon: SplitVerticalIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introdução",
      description: "Texto curto explicando o que está sendo comparado.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "columns",
      title: "Itens comparados",
      description:
        "Os nomes das colunas do comparativo (ex.: IGP-M, IPCA, INPC). De 2 a 4 itens.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
    defineField({
      name: "rows",
      title: "Linhas de comparação",
      description:
        "Cada linha é um critério. Preencha um valor por item comparado, na mesma ordem das colunas.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Critério",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "values",
              title: "Valores",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(2),
            }),
          ],
          preview: {
            select: { title: "label", values: "values" },
            prepare: ({ title, values }) => ({
              title: title || "Critério",
              subtitle: values?.join(" | ") || "Sem valores",
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", columns: "columns", rows: "rows" },
    prepare: ({ title, columns, rows }) => ({
      title: title || "Comparativo",
      subtitle: `${columns?.length || 0} colunas · ${rows?.length || 0} linhas`,
      media: SplitVerticalIcon,
    }),
  },
});
