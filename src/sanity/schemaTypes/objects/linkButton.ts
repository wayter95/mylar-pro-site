import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

import { safeLinkHref } from "@/lib/safe-link-href";
import { iconNames } from "@/lib/icons";

export const linkButton = defineType({
  name: "linkButton",
  title: "Botão de link",
  type: "object",
  icon: LinkIcon,
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "tracking", title: "Rastreio" },
  ],
  fields: [
    defineField({
      name: "label",
      title: "Texto do botão",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destino",
      description:
        "Caminho interno (/features), endereço completo (https://...), e-mail (mailto:...) ou telefone (tel:...).",
      type: "string",
      group: "content",
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
      group: "content",
      options: { list: [...iconNames] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Estilo",
      type: "string",
      group: "content",
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
    defineField({
      name: "utmContent",
      title: "Identificador de campanha",
      description:
        "Uma palavra, sem espaços (demo, teste, blog). Vira utm_content no destino. Opcional.",
      type: "string",
      group: "tracking",
      validation: (Rule) =>
        Rule.regex(/^[a-z0-9-]+$/, {
          name: "identificador",
        }).warning("Use apenas letras minúsculas, números e hífen."),
    }),
    defineField({
      name: "trackingEvent",
      title: "Evento de conversão",
      description:
        "Deixe vazio para o evento padrão de clique. Escolha um específico apenas nos botões de demonstração e teste.",
      type: "string",
      group: "tracking",
      options: {
        list: [
          { title: "Padrão (clique em link)", value: "ClickLink" },
          { title: "Agendar demonstração", value: "ClickDemo" },
          { title: "Criar conta / teste", value: "ClickTrial" },
        ],
      },
    }),
    defineField({
      name: "shortSlug",
      title: "Atalho curto",
      description:
        "Preencha com demo para criar mylarpro.com.br/go/demo apontando para este destino. Útil em bio e Stories, porque o destino pode mudar aqui sem reeditar o que já foi publicado.",
      type: "string",
      group: "tracking",
      validation: (Rule) =>
        Rule.regex(/^[a-z0-9-]+$/, { name: "atalho" }).warning(
          "Use apenas letras minúsculas, números e hífen.",
        ),
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
