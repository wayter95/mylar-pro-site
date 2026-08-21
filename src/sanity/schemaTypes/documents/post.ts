import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Posts",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "imageWithAlt",
    }),
    defineField({
      name: "author",
      title: "Autor",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      description:
        "O artigo só aparece no site a partir desta data e hora. Use uma data futura para agendar a publicação.",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 15 },
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "content",
      title: "Conteúdo",
      description:
        "Adicione blocos e arraste-os para definir a ordem do artigo.",
      type: "array",
      of: [
        defineArrayMember({ type: "richTextBlock" }),
        defineArrayMember({ type: "imageBlock" }),
        defineArrayMember({ type: "calloutBlock" }),
        defineArrayMember({ type: "ctaBlock" }),
        defineArrayMember({ type: "featureBlock" }),
        defineArrayMember({ type: "tableBlock" }),
        defineArrayMember({ type: "comparisonBlock" }),
        defineArrayMember({ type: "faqBlock" }),
        defineArrayMember({ type: "videoBlock" }),
        defineArrayMember({ type: "relatedPostsBlock" }),
      ],
    }),
  ],
  orderings: [
    {
      name: "publishedAtDesc",
      title: "Data de publicação (mais recente)",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      excerpt: "excerpt",
      media: "coverImage.asset",
      publishedAt: "publishedAt",
    },
    prepare: ({ title, excerpt, media, publishedAt }) => {
      const scheduled = publishedAt && new Date(publishedAt) > new Date();
      const scheduledLabel = scheduled
        ? `Agendado para ${new Date(publishedAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          })}`
        : null;

      return {
        title: scheduled
          ? `🕒 ${title || "Post sem título"}`
          : title || "Post sem título",
        subtitle: scheduledLabel ?? excerpt ?? "Sem resumo",
        media: media || DocumentTextIcon,
      };
    },
  },
});
