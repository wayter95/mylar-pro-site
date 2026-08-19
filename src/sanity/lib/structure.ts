import type { StructureResolver } from "sanity/structure";

const singletonTypes = ["linksPage", "siteFooter", "socialLinks"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categorias"),
      S.documentTypeListItem("author").title("Autores"),
      S.divider(),
      S.listItem()
        .title("Página de Links")
        .id("linksPage")
        .child(S.document().schemaType("linksPage").documentId("linksPage")),
      S.listItem()
        .title("Rodapé")
        .id("siteFooter")
        .child(S.document().schemaType("siteFooter").documentId("siteFooter")),
      S.listItem()
        .title("Redes Sociais")
        .id("socialLinks")
        .child(
          S.document().schemaType("socialLinks").documentId("socialLinks"),
        ),
    ]);

export const singletonActions = new Set([
  "publish",
  "discardChanges",
  "restore",
]);

export const singletonTypeNames = new Set(singletonTypes);
