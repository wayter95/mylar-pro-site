import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Autores",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "photo", title: "Foto", type: "imageWithAlt" }),
    defineField({ name: "bio", title: "Biografia", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "name", subtitle: "bio", media: "photo.asset" },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Autor sem nome",
      subtitle: subtitle || "Sem biografia",
      media: media || UserIcon,
    }),
  },
});
