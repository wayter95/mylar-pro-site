import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

import { safeLinkHref } from "@/lib/safe-link-href";
import { iconNames } from "@/lib/icons";

export const socialLinks = defineType({
  name: "socialLinks",
  title: "Redes Sociais",
  type: "document",
  icon: UsersIcon,
  description:
    "Usado na página de Links e no rodapé do site. Editar aqui altera os dois.",
  fields: [
    defineField({
      name: "items",
      title: "Redes",
      description: "Arraste para reordenar.",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialItem",
          title: "Rede",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Nome",
              description: "Usado como rótulo de acessibilidade.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Endereço do perfil",
              type: "string",
              validation: (Rule) =>
                Rule.required().custom((value) =>
                  typeof value === "string" && safeLinkHref(value) !== null
                    ? true
                    : "Use um endereço https://.",
                ),
            }),
            defineField({
              name: "icon",
              title: "Ícone",
              type: "string",
              options: { list: [...iconNames] },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
            prepare: ({ title, subtitle }) => ({
              title: title || "Rede sem nome",
              subtitle: subtitle || "Sem endereço",
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Redes Sociais",
      subtitle: `${Array.isArray(items) ? items.length : 0} rede(s)`,
      media: UsersIcon,
    }),
  },
});
