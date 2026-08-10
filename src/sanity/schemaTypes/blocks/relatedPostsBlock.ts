import { DocumentsIcon } from "@sanity/icons/Documents";
import { defineField, defineType } from "sanity";

export const relatedPostsBlock = defineType({
  name: "relatedPostsBlock",
  title: "Posts relacionados",
  type: "object",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      initialValue: "Leia também",
    }),
    defineField({
      name: "posts",
      title: "Posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", posts: "posts" },
    prepare: ({ title, posts }) => ({
      title: title || "Posts relacionados",
      subtitle: `${posts?.length || 0} posts`,
      media: DocumentsIcon,
    }),
  },
});
