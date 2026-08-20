import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

import { safeLinkHref } from "@/lib/safe-link-href";

export const footerLink = defineType({
  name: "footerLink",
  title: "Link do rodapé",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Texto do link",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destino",
      description:
        "Caminho interno (/features) ou endereço completo (https://...).",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          typeof value === "string" && safeLinkHref(value) !== null
            ? true
            : "Use um caminho interno ou https://.",
        ),
    }),
    defineField({
      name: "utmContent",
      title: "Identificador de campanha",
      description: "Uma palavra, sem espaços. Vira utm_content no destino. Opcional.",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^[a-z0-9-]+$/, { name: "identificador" }).warning(
          "Use apenas letras minúsculas, números e hífen.",
        ),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Link sem texto",
      subtitle: subtitle || "Sem destino",
      media: LinkIcon,
    }),
  },
});
