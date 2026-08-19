# Módulo de Links no Sanity — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mover os links da página `/links` e do rodapé para documentos editáveis no Sanity Studio, mantendo as listas do código como fallback e sem nenhuma mudança visual.

**Architecture:** Três documentos singleton no Sanity (`linksPage`, `siteFooter`, `socialLinks`), lidos por queries validadas com Zod que retornam `null` em caso de erro em vez de lançar. Os componentes recebem os dados por props; quando a query devolve `null`, a página passa a lista hardcoded que já existe em `src/lib/links.ts`.

**Tech Stack:** Next.js 16 (App Router), Sanity 6 + next-sanity 13, Zod 4, TypeScript, Tailwind v4.

**Spec:** `docs/superpowers/specs/2026-08-19-sanity-links-module-design.md`

## Global Constraints

- **Este é o Plano 1 de 3.** Os campos de rastreio (`utmContent`, `trackingEvent`, `shortSlug`) e o consentimento de cookies ficam nos Planos 2 e 3. Não implementar aqui.
- **Sem comentários no código** — o codebase é intencionalmente livre de comentários (CLAUDE.md).
- **Imports absolutos** com o alias `@/*` → `./src/*`. Nunca relativos.
- **Nomes de código em inglês; texto de UI e títulos do Studio em português (pt-BR).**
- **Sem `any`.** O projeto usa TypeScript estrito nos arquivos novos.
- **O projeto não tem runner de testes** (sem Vitest/Jest). A verificação de cada task é `npx tsc --noEmit` e `yarn lint`, mais a checagem manual descrita na task. Não instalar runner de testes neste plano.
- **`yarn`, nunca `npm`/`npx` para scripts** — exceto `npx tsc --noEmit`, que é o comando de type-check já usado no projeto.
- **Nunca `git push`.**
- O design visual não muda. Classes Tailwind existentes são preservadas literalmente.

---

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `src/sanity/schemaTypes/objects/linkButton.ts` | Objeto de botão da `/links`: label, href, ícone, variante |
| `src/sanity/schemaTypes/objects/footerLink.ts` | Objeto de link do rodapé: label, href |
| `src/sanity/schemaTypes/documents/linksPage.ts` | Documento singleton da página `/links` |
| `src/sanity/schemaTypes/documents/siteFooter.ts` | Documento singleton do rodapé |
| `src/sanity/schemaTypes/documents/socialLinks.ts` | Documento singleton de redes sociais |
| `src/sanity/lib/structure.ts` | Estrutura do Studio: os três como singleton |
| `src/lib/safe-link-href.ts` | Valida href aceitando `mailto:`/`tel:` além de http(s) e caminhos |
| `src/lib/icons.ts` (mod) | `getIcon()` tolerante + ícones `youtube`/`tiktok` |
| `src/sanity/lib/validation.ts` (mod) | Schemas Zod dos três documentos |
| `src/sanity/types/content.ts` (mod) | Tipos TS dos três documentos |
| `src/sanity/lib/queries.ts` (mod) | 3 funções de query tolerantes a erro |
| `src/components/links/SocialRow.tsx` (mod) | Recebe `items` por prop |
| `src/app/links/page.tsx` (mod) | Busca no Sanity com fallback |
| `src/components/landing/Footer.tsx` (mod) | `async`, busca no Sanity, ganha `SocialRow` |

---

### Task 1: Helper de validação de href

**Files:**
- Create: `src/lib/safe-link-href.ts`

**Interfaces:**
- Consumes: `safeUrl` de `src/lib/safe-url.ts` (assinatura existente: `safeUrl(value: string | undefined): string | null`)
- Produces: `safeLinkHref(value: string | undefined): string | null` — usado nas Tasks 2, 5 e 6.

**Contexto:** O `safeUrl` existente aceita só caminhos relativos e `http(s):`; ele **rejeita** `mailto:` e `tel:`, que a `/links` usa hoje (botões de e-mail e telefone). Não alterar o `safeUrl` — ele protege o Portable Text do blog.

- [ ] **Step 1: Criar o helper**

Criar `src/lib/safe-link-href.ts`:

```ts
import { safeUrl } from "@/lib/safe-url";

const mailtoPattern = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const telPattern = /^tel:\+?[\d\s().-]{6,}$/i;

export function safeLinkHref(value: string | undefined): string | null {
  const candidate = value?.trim();

  if (!candidate) {
    return null;
  }

  if (mailtoPattern.test(candidate) || telPattern.test(candidate)) {
    return candidate;
  }

  return safeUrl(candidate);
}
```

- [ ] **Step 2: Verificar o comportamento manualmente**

Rodar:

```bash
npx tsx --eval "import {safeLinkHref} from './src/lib/safe-link-href.ts'; for (const v of ['/features','https://a.com','mailto:a@b.com','tel:+5561981896419','javascript:alert(1)','//evil.com','data:text/html,x','',undefined]) console.log(JSON.stringify(v), '=>', safeLinkHref(v));"
```

Se `tsx` não estiver disponível, verificar via `npx tsc --noEmit` (Step 3) e confiar na revisão do regex; o comportamento esperado é:

```
"/features"              => "/features"
"https://a.com"          => "https://a.com"
"mailto:a@b.com"         => "mailto:a@b.com"
"tel:+5561981896419"     => "tel:+5561981896419"
"javascript:alert(1)"    => null
"//evil.com"             => null
"data:text/html,x"       => null
""                       => null
undefined                => null
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/lib/safe-link-href.ts
git commit -m "feat: add safe-link-href helper accepting mailto and tel

The existing safeUrl rejects mailto: and tel:, which the /links page
uses. It stays unchanged because it guards blog Portable Text."
```

---

### Task 2: `getIcon` tolerante e ícones novos

**Files:**
- Modify: `src/lib/icons.ts`

**Interfaces:**
- Produces:
  - `getIcon(name: string): IconType` — devolve `Icons.arrowRight` se o nome não existir. Usado nas Tasks 6 e 7.
  - `iconNames: readonly string[]` — lista ordenada dos nomes, usada no dropdown do Studio (Task 3).
  - Novas chaves no mapa `Icons`: `youtube`, `tiktok`.

- [ ] **Step 1: Adicionar os imports dos ícones novos**

Em `src/lib/icons.ts`, localizar o bloco de import de `react-icons/si`:

```ts
import {
  SiApple,
  SiFacebook,
  SiGoogleplay,
  SiInstagram,
  SiMeta,
  SiWhatsapp,
} from "react-icons/si";
```

Substituir por (mantendo a ordem alfabética existente):

```ts
import {
  SiApple,
  SiFacebook,
  SiGoogleplay,
  SiInstagram,
  SiMeta,
  SiTiktok,
  SiWhatsapp,
  SiYoutube,
} from "react-icons/si";
```

- [ ] **Step 2: Adicionar as entradas no mapa `Icons`**

Localizar o fim do mapa:

```ts
  instagram: SiInstagram,
  linkedin: FaLinkedin,
  facebook: SiFacebook,
} as const;
```

Substituir por:

```ts
  instagram: SiInstagram,
  linkedin: FaLinkedin,
  facebook: SiFacebook,
  youtube: SiYoutube,
  tiktok: SiTiktok,
} as const;
```

- [ ] **Step 3: Adicionar `getIcon` e `iconNames` ao final do arquivo**

Após a linha `export type IconName = keyof typeof Icons;`, e antes ou depois do `export type { IconType };`, adicionar:

```ts
export const iconNames = Object.keys(Icons).sort() as readonly IconName[];

export function getIcon(name: string): IconType {
  return Icons[name as IconName] ?? Icons.arrowRight;
}
```

- [ ] **Step 4: Verificar que os ícones novos existem no react-icons instalado**

Run: `node -e "const si=require('react-icons/si'); console.log('SiYoutube', typeof si.SiYoutube, '| SiTiktok', typeof si.SiTiktok)"`
Expected: `SiYoutube function | SiTiktok function`

Se algum vier `undefined`, o nome mudou na versão instalada (`react-icons@^5.6.0`). Rodar `node -e "console.log(Object.keys(require('react-icons/si')).filter(k=>/tiktok|youtube/i.test(k)))"` e usar o nome exato retornado.

- [ ] **Step 5: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 6: Commit**

```bash
git add src/lib/icons.ts
git commit -m "feat: add youtube and tiktok icons plus tolerant getIcon

getIcon falls back to arrowRight so an icon name coming from the CMS
that is not in the map cannot break the page."
```

---

### Task 3: Objetos de schema `linkButton` e `footerLink`

**Files:**
- Create: `src/sanity/schemaTypes/objects/linkButton.ts`
- Create: `src/sanity/schemaTypes/objects/footerLink.ts`

**Interfaces:**
- Consumes: `safeLinkHref` (Task 1), `iconNames` (Task 2)
- Produces: tipos Sanity `"linkButton"` e `"footerLink"`, referenciados nos documentos da Task 4.

**Padrão a seguir:** `src/sanity/schemaTypes/documents/category.ts` — ícone do `@sanity/icons` com import por subcaminho (`@sanity/icons/Tag`), `defineField`/`defineType`, títulos em português, `preview.prepare()`.

- [ ] **Step 1: Criar `linkButton.ts`**

```ts
import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

import { safeLinkHref } from "@/lib/safe-link-href";
import { iconNames } from "@/lib/icons";

export const linkButton = defineType({
  name: "linkButton",
  title: "Botão de link",
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
      name: "href",
      title: "Destino",
      description:
        "Caminho interno (/features), endereço completo (https://...), e-mail (mailto:...) ou telefone (tel:...).",
      type: "string",
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
      options: { list: [...iconNames] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Estilo",
      type: "string",
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
```

- [ ] **Step 2: Criar `footerLink.ts`**

```ts
import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

import { safeLinkHref } from "@/lib/safe-link-href";

export const footerLink = defineType({
  name: "footerLink",
  title: "Link do rodapé",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Texto do link",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destino",
      description:
        "Caminho interno (/features) ou endereço completo (https://...).",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          typeof value === "string" && safeLinkHref(value) !== null
            ? true
            : "Use um caminho interno ou https://.",
        ),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Link sem texto",
      subtitle: subtitle || "Sem destino",
      media: LinkIcon,
    }),
  },
});
```

- [ ] **Step 3: Confirmar que o subcaminho do ícone existe**

Run: `node -e "console.log(Object.keys(require('@sanity/icons')).filter(k=>/^Link/.test(k)))"`
Expected: inclui `LinkIcon`.

Se o import por subcaminho `@sanity/icons/Link` falhar no type-check do Step 4, trocar por `import { LinkIcon } from "@sanity/icons";` em ambos os arquivos — o `category.ts` usa subcaminho, então o subcaminho é o padrão preferido; só troque se não resolver.

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros. (Os tipos ainda não estão registrados no schema — isso é esperado; a Task 5 registra.)

- [ ] **Step 5: Commit**

```bash
git add src/sanity/schemaTypes/objects/linkButton.ts src/sanity/schemaTypes/objects/footerLink.ts
git commit -m "feat: add linkButton and footerLink Sanity object types"
```

---

### Task 4: Documentos singleton `linksPage`, `siteFooter`, `socialLinks`

**Files:**
- Create: `src/sanity/schemaTypes/documents/linksPage.ts`
- Create: `src/sanity/schemaTypes/documents/siteFooter.ts`
- Create: `src/sanity/schemaTypes/documents/socialLinks.ts`

**Interfaces:**
- Consumes: tipos `"linkButton"` e `"footerLink"` (Task 3), `safeLinkHref` (Task 1), `iconNames` (Task 2)
- Produces: documentos `linksPage`, `siteFooter`, `socialLinks` — registrados na Task 5, consultados na Task 6.

- [ ] **Step 1: Criar `linksPage.ts`**

```ts
import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

export const linksPage = defineType({
  name: "linksPage",
  title: "Página de Links",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "tagline",
      title: "Frase de apoio",
      description: "Texto curto exibido abaixo do logo.",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "links",
      title: "Botões",
      description: "Arraste para reordenar.",
      type: "array",
      of: [{ type: "linkButton" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { subtitle: "tagline" },
    prepare: ({ subtitle }) => ({
      title: "Página de Links",
      subtitle: subtitle || "Sem frase de apoio",
      media: LinkIcon,
    }),
  },
});
```

- [ ] **Step 2: Criar `siteFooter.ts`**

```ts
import { MenuIcon } from "@sanity/icons/Menu";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteFooter = defineType({
  name: "siteFooter",
  title: "Rodapé",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "brandDescription",
      title: "Descrição da marca",
      description: "Parágrafo curto exibido ao lado do logo no rodapé.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "groups",
      title: "Grupos de links",
      description: "Cada grupo é uma coluna do rodapé. Arraste para reordenar.",
      type: "array",
      of: [
        defineArrayMember({
          name: "footerGroup",
          title: "Grupo",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título da coluna",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "footerLink" }],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title", links: "links" },
            prepare: ({ title, links }) => ({
              title: title || "Grupo sem título",
              subtitle: `${Array.isArray(links) ? links.length : 0} link(s)`,
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { groups: "groups" },
    prepare: ({ groups }) => ({
      title: "Rodapé",
      subtitle: `${Array.isArray(groups) ? groups.length : 0} grupo(s)`,
      media: MenuIcon,
    }),
  },
});
```

- [ ] **Step 3: Criar `socialLinks.ts`**

```ts
import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

import { safeLinkHref } from "@/lib/safe-link-href";
import { iconNames } from "@/lib/icons";

export const socialLinks = defineType({
  name: "socialLinks",
  title: "Redes Sociais",
  type: "document",
  icon: UsersIcon,
  description:
    "Usado na página de Links e no rodapé do site. Editar aqui altera os dois.",
  fields: [
    defineField({
      name: "items",
      title: "Redes",
      description: "Arraste para reordenar.",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialItem",
          title: "Rede",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Nome",
              description: "Usado como rótulo de acessibilidade.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Endereço do perfil",
              type: "string",
              validation: (Rule) =>
                Rule.required().custom((value) =>
                  typeof value === "string" && safeLinkHref(value) !== null
                    ? true
                    : "Use um endereço https://.",
                ),
            }),
            defineField({
              name: "icon",
              title: "Ícone",
              type: "string",
              options: { list: [...iconNames] },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
            prepare: ({ title, subtitle }) => ({
              title: title || "Rede sem nome",
              subtitle: subtitle || "Sem endereço",
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare: ({ items }) => ({
      title: "Redes Sociais",
      subtitle: `${Array.isArray(items) ? items.length : 0} rede(s)`,
      media: UsersIcon,
    }),
  },
});
```

- [ ] **Step 4: Confirmar os subcaminhos de ícone**

Run: `node -e "const i=require('@sanity/icons'); console.log(['LinkIcon','MenuIcon','UsersIcon'].map(k=>k+':'+typeof i[k]).join(' '))"`
Expected: `LinkIcon:function MenuIcon:function UsersIcon:function`

Se algum vier `undefined`, listar as opções com `node -e "console.log(Object.keys(require('@sanity/icons')).join('\n'))" | grep -i <termo>` e usar um existente.

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 6: Commit**

```bash
git add src/sanity/schemaTypes/documents/linksPage.ts src/sanity/schemaTypes/documents/siteFooter.ts src/sanity/schemaTypes/documents/socialLinks.ts
git commit -m "feat: add linksPage, siteFooter and socialLinks Sanity documents

socialLinks is shared by the /links page and the site footer, so a
profile URL is edited in one place."
```

---

### Task 5: Registrar os tipos e expor os singletons no Studio

**Files:**
- Modify: `src/sanity/schemaTypes/index.ts`
- Create: `src/sanity/lib/structure.ts`
- Modify: `sanity.config.ts`

**Interfaces:**
- Consumes: os 5 tipos das Tasks 3 e 4
- Produces: `structure` — passado ao `structureTool` no `sanity.config.ts`.

**Por que singleton:** sem estrutura customizada, o Studio ofereceria "criar novo documento" e seria possível ter dois "Rodapé" concorrentes, com a query pegando um deles ao acaso.

- [ ] **Step 1: Registrar os tipos no `schemaTypes/index.ts`**

Adicionar os imports, mantendo a ordem alfabética do arquivo (os imports de `documents/` vêm depois dos de `blocks/`):

```ts
import { author } from "@/sanity/schemaTypes/documents/author";
import { category } from "@/sanity/schemaTypes/documents/category";
import { linksPage } from "@/sanity/schemaTypes/documents/linksPage";
import { post } from "@/sanity/schemaTypes/documents/post";
import { siteFooter } from "@/sanity/schemaTypes/documents/siteFooter";
import { socialLinks } from "@/sanity/schemaTypes/documents/socialLinks";
import { footerLink } from "@/sanity/schemaTypes/objects/footerLink";
import { imageWithAlt } from "@/sanity/schemaTypes/objects/image";
import { linkButton } from "@/sanity/schemaTypes/objects/linkButton";
import { seo } from "@/sanity/schemaTypes/objects/seo";
```

E no array exportado, acrescentar os 5 novos ao final:

```ts
export const schemaTypes = [
  post,
  author,
  category,
  seo,
  imageWithAlt,
  richTextBlock,
  imageBlock,
  calloutBlock,
  ctaBlock,
  featureBlock,
  tableBlock,
  comparisonBlock,
  faqBlock,
  videoBlock,
  relatedPostsBlock,
  linksPage,
  siteFooter,
  socialLinks,
  linkButton,
  footerLink,
];
```

- [ ] **Step 2: Criar `src/sanity/lib/structure.ts`**

```ts
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
```

- [ ] **Step 3: Ligar a estrutura no `sanity.config.ts`**

Substituir o conteúdo de `sanity.config.ts` por:

```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemaTypes";
import {
  singletonActions,
  singletonTypeNames,
  structure,
} from "./src/sanity/lib/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const isStudioConfigured = Boolean(projectId && dataset);

export default defineConfig({
  basePath: "/studio",
  title: "MyLar Pro",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypeNames.has(schemaType)),
  },
  document: {
    actions: (input, { schemaType }) =>
      singletonTypeNames.has(schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
```

O `templates` remove a opção "criar novo" dos três; o `actions` remove "duplicar" e "excluir" deles.

- [ ] **Step 4: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 5: Verificar no Studio**

Run: `yarn dev`

Abrir `http://localhost:3000/studio` e confirmar:
- O menu lateral mostra "Posts", "Categorias", "Autores", um divisor, e então "Página de Links", "Rodapé", "Redes Sociais".
- Clicar em "Rodapé" abre **direto o formulário** do documento, sem lista e sem botão de criar.
- Não há opção de duplicar nem excluir nesses três.

Se o Studio não carregar por falta de env (`NEXT_PUBLIC_SANITY_PROJECT_ID`), esta verificação fica pendente para quem tiver as credenciais — registrar isso na conclusão da task em vez de declarar verificado.

- [ ] **Step 6: Commit**

```bash
git add src/sanity/schemaTypes/index.ts src/sanity/lib/structure.ts sanity.config.ts
git commit -m "feat: register link schemas and expose them as Studio singletons

Filtering templates and document actions prevents a second concurrent
Rodape document, which would make the query pick one at random."
```

---

### Task 6: Tipos, validação Zod e queries tolerantes a erro

**Files:**
- Modify: `src/sanity/types/content.ts`
- Modify: `src/sanity/lib/validation.ts`
- Modify: `src/sanity/lib/queries.ts`

**Interfaces:**
- Consumes: `safeLinkHref` (Task 1), documentos do Sanity (Task 4)
- Produces — usados na Task 7:
  - `getLinksPage(): Promise<LinksPageContent | null>`
  - `getSiteFooter(): Promise<SiteFooterContent | null>`
  - `getSocialLinks(): Promise<SocialLinkItem[] | null>`
  - Tipos `LinksPageContent`, `SiteFooterContent`, `SocialLinkItem`, `LinkButtonItem`, `FooterLinkItem`

**Diferença deliberada do blog:** estas funções **não lançam**. O rodapé aparece em 16 páginas; um link mal cadastrado não pode derrubar o site. Um item inválido é descartado da lista; se a lista esvaziar, a função devolve `null` e o consumidor usa o fallback.

- [ ] **Step 1: Adicionar os tipos em `src/sanity/types/content.ts`**

Ao final do arquivo:

```ts
export interface LinkButtonItem {
  label: string;
  href: string;
  icon: string;
  variant: "primary" | "secondary";
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLinkItem[];
}

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: string;
}

export interface LinksPageContent {
  tagline: string;
  links: LinkButtonItem[];
}

export interface SiteFooterContent {
  brandDescription: string;
  groups: FooterGroup[];
}
```

- [ ] **Step 2: Adicionar os schemas Zod em `src/sanity/lib/validation.ts`**

Ao final do arquivo. Nota: `safeLinkHrefSchema` é próprio deste módulo — o `safeUrlSchema` do topo do arquivo não aceita `mailto:`/`tel:`.

```ts
const safeLinkHrefSchema = z
  .string()
  .trim()
  .min(1)
  .refine((value) => safeLinkHref(value) !== null, {
    message: "Use an internal path, HTTP(S) URL, mailto: or tel:.",
  });

export const linkButtonSchema = z.object({
  label: z.string().trim().min(1),
  href: safeLinkHrefSchema,
  icon: z.string().trim().min(1),
  variant: z.enum(["primary", "secondary"]),
});

export const footerLinkSchema = z.object({
  label: z.string().trim().min(1),
  href: safeLinkHrefSchema,
});

export const socialLinkItemSchema = z.object({
  label: z.string().trim().min(1),
  href: safeLinkHrefSchema,
  icon: z.string().trim().min(1),
});

export const footerGroupSchema = z.object({
  title: z.string().trim().min(1),
  links: z.array(footerLinkSchema),
});

export const linksPageSchema = z.object({
  tagline: z.string().trim().min(1),
  links: z.array(linkButtonSchema),
});

export const siteFooterSchema = z.object({
  brandDescription: z.string().trim().min(1),
  groups: z.array(footerGroupSchema),
});

export const socialLinksSchema = z.object({
  items: z.array(socialLinkItemSchema),
});
```

E adicionar o import no topo do arquivo, junto ao `safeUrl` existente:

```ts
import { safeUrl } from "@/lib/safe-url";
import { safeLinkHref } from "@/lib/safe-link-href";
```

- [ ] **Step 3: Adicionar as queries em `src/sanity/lib/queries.ts`**

Primeiro, estender os imports no topo do arquivo:

```ts
import { getSanityClient, isSanityConfigured } from "@/sanity/lib/client";
import {
  categoryListSchema,
  footerGroupSchema,
  linkButtonSchema,
  linksPageSchema,
  postPreviewSchema,
  postSchema,
  siteFooterSchema,
  socialLinkItemSchema,
  socialLinksSchema,
} from "@/sanity/lib/validation";
import type {
  Category,
  FooterGroup,
  LinkButtonItem,
  LinksPageContent,
  Post,
  PostPreview,
  SiteFooterContent,
  SocialLinkItem,
} from "@/sanity/types/content";
```

Depois, adicionar ao final do arquivo:

```ts
const CONTENT_REVALIDATE_SECONDS = 600;

const linksPageQuery = `*[_type == "linksPage"][0] {
  tagline,
  links[] { label, href, icon, variant }
}`;

const siteFooterQuery = `*[_type == "siteFooter"][0] {
  brandDescription,
  groups[] { title, links[] { label, href } }
}`;

const socialLinksQuery = `*[_type == "socialLinks"][0] {
  items[] { label, href, icon }
}`;

async function fetchContent<T>(
  query: string,
  context: string,
): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await getSanityClient().fetch<T>(
      query,
      {},
      { next: { revalidate: CONTENT_REVALIDATE_SECONDS } },
    );
  } catch (error) {
    console.error(`[Sanity] Failed to fetch ${context}:`, error);
    return null;
  }
}

function keepValid<T>(
  schema: { safeParse: (value: unknown) => { success: boolean; data?: T } },
  items: unknown,
  context: string,
): T[] {
  if (!Array.isArray(items)) {
    return [];
  }

  const valid: T[] = [];

  items.forEach((item, index) => {
    const result = schema.safeParse(item);
    if (result.success && result.data !== undefined) {
      valid.push(result.data);
    } else {
      console.error(`[Sanity] Dropped invalid ${context} at index ${index}.`);
    }
  });

  return valid;
}

export async function getLinksPage(): Promise<LinksPageContent | null> {
  const data = await fetchContent<unknown>(linksPageQuery, "links page");

  if (!data || typeof data !== "object") {
    return null;
  }

  const raw = data as { tagline?: unknown; links?: unknown };
  const links = keepValid<LinkButtonItem>(
    linkButtonSchema,
    raw.links,
    "link button",
  );
  const parsed = linksPageSchema.safeParse({ tagline: raw.tagline, links });

  if (!parsed.success || parsed.data.links.length === 0) {
    console.error("[Sanity] Links page unusable; falling back to code list.");
    return null;
  }

  return parsed.data;
}

export async function getSiteFooter(): Promise<SiteFooterContent | null> {
  const data = await fetchContent<unknown>(siteFooterQuery, "site footer");

  if (!data || typeof data !== "object") {
    return null;
  }

  const raw = data as { brandDescription?: unknown; groups?: unknown };
  const groups = keepValid<FooterGroup>(
    footerGroupSchema,
    raw.groups,
    "footer group",
  ).filter((group) => group.links.length > 0);
  const parsed = siteFooterSchema.safeParse({
    brandDescription: raw.brandDescription,
    groups,
  });

  if (!parsed.success || parsed.data.groups.length === 0) {
    console.error("[Sanity] Site footer unusable; falling back to code list.");
    return null;
  }

  return parsed.data;
}

export async function getSocialLinks(): Promise<SocialLinkItem[] | null> {
  const data = await fetchContent<unknown>(socialLinksQuery, "social links");

  if (!data || typeof data !== "object") {
    return null;
  }

  const items = keepValid<SocialLinkItem>(
    socialLinkItemSchema,
    (data as { items?: unknown }).items,
    "social link",
  );
  const parsed = socialLinksSchema.safeParse({ items });

  if (!parsed.success || parsed.data.items.length === 0) {
    console.error("[Sanity] Social links unusable; falling back to code list.");
    return null;
  }

  return parsed.data.items;
}
```

- [ ] **Step 4: Verificar que `isSanityConfigured` é exportado pelo client**

Run: `grep -n "export const isSanityConfigured" src/sanity/lib/client.ts`
Expected: uma linha de match. (Já existe; a query nova o importa.)

- [ ] **Step 5: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 6: Commit**

```bash
git add src/sanity/types/content.ts src/sanity/lib/validation.ts src/sanity/lib/queries.ts
git commit -m "feat: add error-tolerant queries for link content

These return null instead of throwing, unlike the blog queries: the
footer renders on 16 pages, so one bad CMS entry must not take the site
down. Invalid items are dropped from the list; an empty list falls back
to the code."
```

---

### Task 7: Consumir no `/links` e no rodapé

**Files:**
- Modify: `src/components/links/SocialRow.tsx`
- Modify: `src/app/links/page.tsx`
- Modify: `src/components/landing/Footer.tsx`

**Interfaces:**
- Consumes: `getLinksPage`, `getSiteFooter`, `getSocialLinks` (Task 6), `getIcon` (Task 2), tipos `LinkItem`/`SocialItem` de `src/lib/links.ts`
- Produces: nada para tasks posteriores deste plano. O Plano 2 (rastreio) modifica estes mesmos arquivos.

**Regra:** nenhuma classe Tailwind muda. As listas de `src/lib/links.ts` e o `navGroups` do rodapé continuam no código como fallback.

- [ ] **Step 1: `SocialRow` recebe `items` por prop**

Substituir o conteúdo de `src/components/links/SocialRow.tsx` por:

```tsx
import { getIcon } from "@/lib/icons";
import type { SocialItem } from "@/lib/links";

export function SocialRow({ items }: { items: SocialItem[] }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {items.map((social) => {
        const Icon = getIcon(social.icon);
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex size-11 items-center justify-center rounded-full border border-slate-700 bg-white/5 text-slate-300 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#2facde] hover:text-[#2facde]"
          >
            <Icon className="size-5" />
          </a>
        );
      })}
    </div>
  );
}
```

Nota: o tipo do prop é `SocialItem` (de `@/lib/links`), cujo `icon` é `IconName`. O `SocialLinkItem` do Sanity tem `icon: string`. A conversão acontece na página (Step 2), que monta objetos compatíveis — `getIcon` aceita `string` e tolera nome inválido.

- [ ] **Step 2: `/links/page.tsx` busca no Sanity com fallback**

Substituir as linhas de import e a função `LinksPage`. Os imports passam a ser:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { linkItems, profile, socialItems, type LinkItem, type SocialItem } from "@/lib/links";
import { LinkButton } from "@/components/links/LinkButton";
import { SocialRow } from "@/components/links/SocialRow";
import { AnimateIn, AnimateInStagger } from "@/components/landing/AnimateIn";
import { getLinksPage, getSocialLinks } from "@/sanity/lib/queries";
```

O `export const metadata` fica inalterado. A função passa a ser:

```tsx
export default async function LinksPage() {
  const [content, socials] = await Promise.all([
    getLinksPage(),
    getSocialLinks(),
  ]);

  const tagline = content?.tagline ?? profile.tagline;
  const links: LinkItem[] = content
    ? content.links.map((link) => ({
        label: link.label,
        href: link.href,
        icon: link.icon as LinkItem["icon"],
        variant: link.variant,
      }))
    : linkItems;
  const socialRow: SocialItem[] = socials
    ? socials.map((social) => ({
        label: social.label,
        href: social.href,
        icon: social.icon as SocialItem["icon"],
      }))
    : socialItems;

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -top-1/4 right-0 h-[600px] w-[800px] rounded-full bg-[#2facde]/8 blur-[120px]" />
        <div className="absolute -bottom-1/4 left-0 h-[400px] w-[600px] rounded-full bg-[#2facde]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <AnimateIn className="flex flex-col items-center text-center">
          <Image
            src="/images/logo-white.svg"
            alt="Mylar Pro"
            width={160}
            height={42}
            className="h-10 w-auto"
            priority
          />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {tagline}
          </p>
        </AnimateIn>

        <AnimateInStagger className="mt-10 flex flex-col gap-3">
          {links.map((item) => (
            <LinkButton key={item.label} {...item} />
          ))}
        </AnimateInStagger>

        <div className="mt-10">
          <SocialRow items={socialRow} />
        </div>

        <p className="mt-10 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Mylar Pro. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: `Footer.tsx` vira `async`, busca no Sanity e ganha a `SocialRow`**

Em `src/components/landing/Footer.tsx`, estender os imports:

```tsx
import Image from "next/image";
import Link from "next/link";
import { APP_URL, REGISTER_URL } from "@/lib/navigation";
import { socialItems, type SocialItem } from "@/lib/links";
import { SocialRow } from "@/components/links/SocialRow";
import { getSiteFooter, getSocialLinks } from "@/sanity/lib/queries";
```

O `const navGroups = [...]` existente **permanece inalterado** — é o fallback.

Trocar a assinatura e o início da função:

```tsx
export async function Footer() {
  const [content, socials] = await Promise.all([
    getSiteFooter(),
    getSocialLinks(),
  ]);

  const brandDescription =
    content?.brandDescription ??
    "A plataforma que reúne CRM, atendimento, contratos, cobrança e financeiro do mercado imobiliário em uma operação só.";
  const groups = content?.groups ?? navGroups;
  const socialRow: SocialItem[] = socials
    ? socials.map((social) => ({
        label: social.label,
        href: social.href,
        icon: social.icon as SocialItem["icon"],
      }))
    : socialItems;
```

No JSX, trocar o parágrafo da marca — de:

```tsx
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              A plataforma que reúne CRM, atendimento, contratos, cobrança e
              financeiro do mercado imobiliário em uma operação só.
            </p>
```

para:

```tsx
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {brandDescription}
            </p>
```

Trocar `{navGroups.map((group) => (` por `{groups.map((group) => (`.

Dentro do `map` dos links, trocar a `key` de `link.href` para `` key={`${group.title}-${link.label}`} `` — dois grupos podem ter links para o mesmo href, e o Sanity não garante unicidade.

E na barra inferior, substituir:

```tsx
        <div className="flex flex-col items-center gap-2 border-t border-slate-800/80 py-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} MyLar Pro. Todos os direitos
            reservados. CNPJ 54.865.990/0001-50
          </p>
          <p className="text-xs text-slate-500">Feito no Brasil</p>
        </div>
```

por:

```tsx
        <div className="flex flex-col items-center gap-4 border-t border-slate-800/80 py-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} MyLar Pro. Todos os direitos
            reservados. CNPJ 54.865.990/0001-50
          </p>
          <SocialRow items={socialRow} />
          <p className="text-xs text-slate-500">Feito no Brasil</p>
        </div>
```

- [ ] **Step 4: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

Se aparecer erro de tipo em `groups` (o `navGroups` inferido do código vs. `FooterGroup[]` do Sanity), a causa é o `navGroups` ter tipo literal inferido. Corrigir anotando o fallback explicitamente logo acima da declaração:

```tsx
const navGroups: FooterGroup[] = [
```

e importando o tipo: `import type { FooterGroup } from "@/sanity/types/content";`

- [ ] **Step 5: Verificar o caminho do fallback (sem Sanity)**

Run: `yarn dev`

Com o Sanity vazio (ou sem env), abrir:
- `http://localhost:3000/links` — deve renderizar **idêntico** ao anterior: 13 botões na mesma ordem, 3 ícones sociais, mesma tagline.
- `http://localhost:3000/` — o rodapé deve renderizar com os 4 grupos de sempre, **e agora com os 3 ícones sociais** na barra inferior.

Comparar a `/links` com o estado anterior via `git stash` se houver dúvida sobre alguma diferença visual.

- [ ] **Step 6: Verificar o build de produção**

Run: `yarn build`
Expected: build conclui sem erro. Confirma que o `Footer` assíncrono não quebra nenhuma das 16 páginas que o usam, incluindo `FeatureLanding` e `PersonaLanding`.

- [ ] **Step 7: Commit**

```bash
git add src/components/links/SocialRow.tsx src/app/links/page.tsx src/components/landing/Footer.tsx
git commit -m "feat: read links page and footer content from Sanity

Both fall back to the existing code lists when Sanity is unconfigured,
unreachable, or returns unusable data. The footer also gains the social
row, which previously existed only on /links."
```

---

### Task 8: Popular o conteúdo no Studio

**Files:** nenhum arquivo de código. Esta task é operação de conteúdo.

**Interfaces:**
- Consumes: os três singletons funcionando (Tasks 5, 6, 7)
- Produces: os documentos populados, que fazem o site parar de usar o fallback.

**Pré-requisito:** as env `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET` configuradas. Sem elas, esta task não pode ser executada — registrar como pendente em vez de marcar concluída.

- [ ] **Step 1: Popular "Redes Sociais"**

Em `/studio` → "Redes Sociais", criar três itens com os valores exatos de `src/lib/links.ts`:

| Nome | Endereço | Ícone |
|---|---|---|
| Instagram | `https://www.instagram.com/mylar.app/` | `instagram` |
| LinkedIn | `https://www.linkedin.com/company/mylar-pro` | `linkedin` |
| Facebook | `https://www.facebook.com/mylarapp` | `facebook` |

Publicar.

- [ ] **Step 2: Popular "Página de Links"**

Frase de apoio: `Gestão imobiliária completa, num só lugar.`

Os 13 botões, **nesta ordem** (copiados de `src/lib/links.ts`):

| # | Texto | Destino | Ícone | Estilo |
|---|---|---|---|---|
| 1 | Agendar demonstração | `https://cognizy.ai/book/comercial-mylar-pro-erp` | `calendar` | Destaque |
| 2 | Criar conta grátis | `https://app.mylarpro.com.br/register` | `rocket` | Padrão |
| 3 | Acessar plataforma | `https://app.mylarpro.com.br` | `dashboard` | Padrão |
| 4 | App do corretor (iPhone) | `https://apps.apple.com/us/app/mylar-pro-brokers/id6762925131` | `apple` | Padrão |
| 5 | App do corretor (Android) | `https://play.google.com/store/apps/details?id=com.mylarprobrokers.app` | `googlePlay` | Padrão |
| 6 | App do cliente (iPhone) | `https://apps.apple.com/br/app/mylar-pro-home/id6784389538` | `apple` | Padrão |
| 7 | App do cliente (Android) | `https://play.google.com/store/apps/details?id=com.mylarprohome.app` | `googlePlay` | Padrão |
| 8 | Funcionalidades | `/features` | `sparkles` | Padrão |
| 9 | Para quem é | `/personas` | `users` | Padrão |
| 10 | WhatsApp | `https://wa.me/5561981896419` | `whatsapp` | Padrão |
| 11 | E-mail | `mailto:contato@mylarapp.com` | `mail` | Padrão |
| 12 | Telefone | `tel:+5561981896419` | `phone` | Padrão |

Verificado: `linkItems` tem exatamente estes 12 itens (as 3 redes sociais ficam
em `socialItems`, cadastradas no Step 1).

Publicar.

- [ ] **Step 3: Popular "Rodapé"**

Descrição da marca: `A plataforma que reúne CRM, atendimento, contratos, cobrança e financeiro do mercado imobiliário em uma operação só.`

Quatro grupos, com os links exatos do `navGroups` em `src/components/landing/Footer.tsx`:

**Produto:** Todos os recursos `/features` · CRM e negociações `/features/crm` · Canais de atendimento `/features/channels` · Cobranças e repasses `/features/billing` · Financeiro `/features/financial` · Mila e ferramentas de IA `/features/ai`

**Para quem:** Corretor autônomo `/personas/broker` · Imobiliária `/personas/real-estate` · Lançamentos `/personas/development` · Comparar as versões `/personas`

**Aplicativos:** MyLar Pro Brokers `/features/broker-app` · MyLar Pro Home `/features/client-portal` · Catálogo público `/features/property-catalog` · Assinatura de contratos `/features/digital-signature`

**Empresa:** Preços `/plans` · Contato `/contact` · Política de privacidade `/brokers/privacy-policy` · Termos de uso `/brokers/terms-of-use`

Publicar.

- [ ] **Step 4: Confirmar que o site agora lê do Sanity**

Alterar a frase de apoio no Studio (ex.: acrescentar um ponto ao final), publicar, aguardar até 10 minutos (ou reiniciar o `yarn dev`, que limpa o cache do fetch) e recarregar `/links`.

Expected: a frase alterada aparece. Isso prova que o caminho do Sanity está ativo, não só o fallback.

Reverter a alteração de teste.

- [ ] **Step 5: Verificar que um item inválido não derruba a página**

No Studio, num botão qualquer, trocar o destino por `javascript:alert(1)`. O Studio deve **recusar a publicação** com a mensagem "Use um caminho interno, https://, mailto: ou tel:.".

Isso confirma a primeira camada de validação. Reverter.

- [ ] **Step 6: Commit**

Não há arquivos a commitar. Registrar a conclusão no corpo da mensagem do último commit do plano, ou apenas anotar que a task foi de conteúdo.

---

## Verificação final do lote

Rodar uma vez, ao final de todas as tasks:

```bash
npx tsc --noEmit && yarn lint && yarn build
```

Expected: os três sem erro.

Checagem manual:

| O que | Esperado |
|---|---|
| `/links` com Sanity populado | 12 botões, 3 sociais, tagline do Studio |
| `/links` sem env do Sanity | idêntico, lendo do código |
| Rodapé em `/` | 4 grupos + 3 ícones sociais na barra inferior |
| Rodapé em `/features/crm` (via `FeatureLanding`) | renderiza sem erro |
| `/studio` | três singletons no menu, sem "criar novo" |

## Fora do escopo deste plano

- Campos `utmContent`, `trackingEvent`, `shortSlug` no `linkButton` → **Plano 2**
- Propagação de UTM, eventos de clique, rota `/go/*` → **Plano 2**
- Banner de consentimento de cookies → **Plano 3**
- Mega-menu do header (`src/lib/navigation.ts`) → não planejado
