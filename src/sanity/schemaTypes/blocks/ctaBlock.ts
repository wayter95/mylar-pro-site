import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

const externalUrlPattern = /^https?:\/\/\S+$/i;
const internalPathPattern = /^\/(?!\/)[\w\-./?#=&%]*$/;

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Chamada para ação",
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
      name: "destination",
      title: "Destino",
      description:
        "Use um caminho interno do site (ex.: /features/billing) ou uma URL completa começando com https://.",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((destination) => {
          const value = typeof destination === "string" ? destination.trim() : "";

          if (!value) {
            return "Informe o destino do botão.";
          }

          if (
            externalUrlPattern.test(value) ||
            internalPathPattern.test(value)
          ) {
            return true;
          }

          return "Use um caminho interno começando com / ou uma URL http(s) completa.";
        }),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "destination" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Chamada para ação",
      subtitle: subtitle || "Sem destino",
      media: LinkIcon,
    }),
  },
});
