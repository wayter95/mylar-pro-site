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
      type: "datetime",
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
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "coverImage.asset" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Post sem título",
      subtitle: subtitle || "Sem resumo",
      media: media || DocumentTextIcon,
    }),
  },
});
