import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Texto rico",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "content",
      title: "Conteúdo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título 2", value: "h2" },
            { title: "Título 3", value: "h3" },
            { title: "Citação", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.required().uri({ scheme: ["http", "https"] }),
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((value) => {
            const hasText =
              Array.isArray(value) &&
              value.some((block) => {
                if (
                  !block ||
                  typeof block !== "object" ||
                  !("children" in block) ||
                  !Array.isArray(block.children)
                ) {
                  return false;
                }

                return block.children.some((child) =>
                  Boolean(
                    child &&
                      typeof child === "object" &&
                      "text" in child &&
                      typeof child.text === "string" &&
                      child.text.trim(),
                  ),
                );
              });
            return hasText || "Inclua pelo menos um texto não vazio.";
          }),
    }),
  ],
  preview: {
    select: { text: "content.0.children.0.text" },
    prepare: ({ text }) => ({
      title: text || "Texto rico",
      subtitle: "Bloco de texto",
      media: DocumentTextIcon,
    }),
  },
});
