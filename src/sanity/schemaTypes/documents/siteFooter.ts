import { MenuIcon } from "@sanity/icons/Menu";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteFooter = defineType({
  name: "siteFooter",
  title: "Rodapé",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "brandDescription",
      title: "Descrição da marca",
      description: "Parágrafo curto exibido ao lado do logo no rodapé.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "groups",
      title: "Grupos de links",
      description: "Cada grupo é uma coluna do rodapé. Arraste para reordenar.",
      type: "array",
      of: [
        defineArrayMember({
          name: "footerGroup",
          title: "Grupo",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título da coluna",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "footerLink" }],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title", links: "links" },
            prepare: ({ title, links }) => ({
              title: title || "Grupo sem título",
              subtitle: `${Array.isArray(links) ? links.length : 0} link(s)`,
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { groups: "groups" },
    prepare: ({ groups }) => ({
      title: "Rodapé",
      subtitle: `${Array.isArray(groups) ? groups.length : 0} grupo(s)`,
      media: MenuIcon,
    }),
  },
});
