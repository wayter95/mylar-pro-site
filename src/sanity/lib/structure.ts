import type { StructureResolver } from "sanity/structure";

const singletonTypes = ["linksPage", "siteFooter", "socialLinks"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.list()
            .title("Posts")
            .items([
              S.listItem()
                .title("Publicados")
                .id("publishedPosts")
                .child(
                  S.documentTypeList("post")
                    .title("Publicados")
                    .filter(
                      '_type == "post" && defined(publishedAt) && publishedAt <= now()',
                    )
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("Agendados")
                .id("scheduledPosts")
                .child(
                  S.documentTypeList("post")
                    .title("Agendados")
                    .filter(
                      '_type == "post" && defined(publishedAt) && publishedAt > now()',
                    )
                    .defaultOrdering([
                      { field: "publishedAt", direction: "asc" },
                    ]),
                ),
              S.divider(),
              S.documentTypeListItem("post").title("Todos os posts"),
            ]),
        ),
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
