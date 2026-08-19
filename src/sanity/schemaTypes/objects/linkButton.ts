import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

import { safeLinkHref } from "@/lib/safe-link-href";
import { iconNames } from "@/lib/icons";

export const linkButton = defineType({
  name: "linkButton",
  title: "Botão de link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Texto do botão",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destino",
      description:
        "Caminho interno (/features), endereço completo (https://...), e-mail (mailto:...) ou telefone (tel:...).",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          typeof value === "string" && safeLinkHref(value) !== null
            ? true
            : "Use um caminho interno, https://, mailto: ou tel:.",
        ),
    }),
    defineField({
      name: "icon",
      title: "Ícone",
      type: "string",
      options: { list: [...iconNames] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Estilo",
      type: "string",
      options: {
        list: [
          { title: "Destaque", value: "primary" },
          { title: "Padrão", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "secondary",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Botão sem texto",
      subtitle: subtitle || "Sem destino",
      media: LinkIcon,
    }),
  },
});
