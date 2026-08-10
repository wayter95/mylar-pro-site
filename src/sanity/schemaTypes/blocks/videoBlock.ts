import { PlayIcon } from "@sanity/icons/Play";
import { defineField, defineType } from "sanity";

export const videoBlock = defineType({
  name: "videoBlock",
  title: "Vídeo",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL do vídeo",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "url" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Vídeo",
      subtitle: subtitle || "Sem URL",
      media: PlayIcon,
    }),
  },
});
