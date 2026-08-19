# Links e redes sociais gerenciados no Sanity

**Data:** 2026-08-19
**Projeto:** `mylar-pro-site` (Next.js 16, App Router, Tailwind v4, Sanity)

## Objetivo

Mover os links da página `/links` e do rodapé do site para módulos editáveis no
Sanity Studio, para que novos links possam ser adicionados e os existentes
alterados ou reordenados sem editar código nem fazer deploy.

O design visual atual não muda em nada. As redes sociais, hoje presentes apenas
em `/links`, passam a aparecer também no rodapé, lidas do mesmo documento.

## Contexto: o que é hardcoded hoje

| Onde | Arquivo | Conteúdo |
|---|---|---|
| Página `/links` | `src/lib/links.ts` | tagline + 13 botões (`linkItems`) + 3 redes (`socialItems`) |
| Rodapé | `src/components/landing/Footer.tsx` | descrição da marca + 4 grupos × ~5 links (`navGroups`) |

O spec anterior (`2026-06-09-links-page-design.md`) decidiu deliberadamente por
config hardcoded, sem CMS. Esta é a reversão consciente daquela decisão: o Sanity
agora existe no projeto (blog em produção), então o custo de usá-lo é baixo e o
ganho — editar link sem deploy — é real.

O mega-menu do header (`src/lib/navigation.ts`) fica **fora do escopo**. Tem
campos aninhados (badges, cards de destaque, cores de accent) que pedem um
desenho próprio.

## Decisão de arquitetura

Três documentos singleton no Sanity, com as redes sociais compartilhadas entre a
página `/links` e o rodapé:

```
Sanity Studio (/studio)
├── "Página de Links"  (linksPage)    → tagline + links[]
├── "Rodapé"           (siteFooter)   → brandDescription + groups[]
└── "Redes Sociais"    (socialLinks)  → items[]        ← consumido pelos dois
                    │
                    ▼
  src/sanity/lib/queries.ts   getLinksPage() / getSiteFooter() / getSocialLinks()
                    │   Zod valida; erro ou lista vazia → null
                    ▼
  src/lib/links.ts (fallback)  ──►  /links/page.tsx  +  Footer.tsx
```

Alternativas descartadas:

- **Documento único `siteSettings`** com tudo dentro — um lugar só para editar,
  mas vira um documento longo de seções aninhadas, e as redes sociais ficariam
  sem fronteira clara.
- **Um documento por link** com campo `order` numérico — reordenar 13 botões
  passaria a ser edição manual de números, pior que o arrastar-e-soltar nativo
  dos arrays do Sanity.

### Fallback: as listas do código permanecem

`src/lib/links.ts` e o `navGroups` do rodapé continuam existindo como fallback.
Se o Sanity não estiver configurado (sem env), estiver fora do ar, ou devolver
dados inválidos, o site renderiza a lista do código. É o mesmo princípio do
`isSanityConfigured` já usado pelo blog, e garante que o build continue
funcionando sem variáveis de ambiente.

### Queries tolerantes a erro (diferente do blog)

As funções de query deste módulo **nunca lançam** para o consumidor: em caso de
erro retornam `null` e registram em `console.error`. Isso difere do
`parseCmsData` usado pelo blog, que lança de propósito.

A razão é o raio de alcance: o rodapé aparece em 16 páginas. Um link mal
cadastrado no Studio não pode derrubar o site inteiro. Já um post de blog
malformado deve falhar alto, porque afeta só aquele post.

Dentro de uma lista, um item inválido é **descartado** em vez de invalidar o
documento todo. Se a lista ficar vazia após o descarte, a query retorna `null` e
o consumidor cai no fallback.

## Schemas

Novos tipos em `src/sanity/schemaTypes/`, seguindo o padrão de `documents/category.ts`
(ícone do `@sanity/icons`, títulos em português, `preview.prepare()`).

| Arquivo | Tipo | Campos |
|---|---|---|
| `documents/linksPage.ts` | document | `tagline` (string, obrigatório), `links[]` de `linkButton` |
| `documents/siteFooter.ts` | document | `brandDescription` (text), `groups[]` (título + `footerLink[]`) |
| `documents/socialLinks.ts` | document | `items[]` (label, href, ícone) |
| `objects/linkButton.ts` | object | `label`, `href`, `icon` (dropdown), `variant` (`primary`/`secondary`) |
| `objects/footerLink.ts` | object | `label`, `href` |

Os três documentos são expostos como **singleton** por uma `structure`
customizada em `src/sanity/lib/structure.ts`, registrada no `sanity.config.ts`.
Sem isso, o Studio ofereceria "criar novo" e seria possível ter dois "Rodapé"
concorrentes.

### Campo de ícone: lista fechada

O `icon` é um `string` com `options.list` — dropdown com os nomes semânticos do
mapa `Icons` de `src/lib/icons.ts`. Escolha fechada evita erro de digitação.

Para o site nunca quebrar por um nome fora do mapa (ícone removido do
`icons.ts` depois de já estar cadastrado no Sanity), o `icons.ts` ganha:

```ts
export function getIcon(name: string): IconType   // devolve Icons.arrowRight se não achar
```

Ficam adicionados ao mapa: `youtube` (`SiYoutube`) e `tiktok` (`SiTiktok`), para
essas redes poderem ser cadastradas sem alteração de código.

## Validação de href

O `safeUrl` de `src/lib/safe-url.ts` aceita apenas caminhos relativos e
`http(s):` — ele **rejeita** `mailto:` e `tel:`, que a página `/links` usa hoje
(e-mail, telefone). Ele não será afrouxado: protege o Portable Text do blog, e
relaxá-lo lá seria um risco de segurança sem necessidade.

Novo helper `src/lib/safe-link-href.ts`, que reusa o `safeUrl` para o caso
http(s)/relativo e adiciona os dois schemes de contato:

```
aceita:  /caminho-interno | https://… | http://… | mailto:… | tel:…
rejeita: javascript: | data: | //host | \host | qualquer outro scheme
```

Camadas de proteção, do Studio ao navegador:

1. **Studio** — `Rule.required().custom()` avisa na hora se o href for inválido.
2. **Query/Zod** — item com href inválido é descartado da lista.
3. **Componente** — `getIcon()` devolve ícone genérico se o nome não existir.

O `isExternalHref`, que já existe em `src/lib/links.ts`, continua decidindo entre
`<a target="_blank">` e `<Link>`.

## Revalidação (ISR)

`next: { revalidate: 600 }` na chamada `fetch` do cliente Sanity, dentro das
funções de query deste módulo — não `export const revalidate` por página.

O rodapé aparece em 16 páginas; declarar por página significaria tocar em ~14
arquivos com uma linha cada, e qualquer página nova criada depois esqueceria a
linha. Na query, é uma linha no lugar certo e vale para todo consumidor.

Efeito: link editado no Studio aparece no site em até 10 minutos. Se um dia for
preciso instantâneo, um webhook `/api/revalidate` se acrescenta por cima sem
refazer nada disso.

## Componentes

Nenhuma mudança visual. Os componentes passam a receber dados por props em vez
de importar do módulo de config.

| Arquivo | Mudança |
|---|---|
| `components/links/LinkButton.tsx` | nenhuma (já recebe `LinkItem` por props) |
| `components/links/SocialRow.tsx` | passa a receber `items: SocialItem[]` por prop |
| `app/links/page.tsx` | busca no Sanity, aplica fallback, passa para baixo |
| `components/landing/Footer.tsx` | vira `async`; busca no Sanity; **ganha a `SocialRow`** na barra inferior |

O `Footer` é usado em 16 lugares, incluindo `FeatureLanding.tsx` e
`PersonaLanding.tsx`. Todos são Server Components, e JSX de Server Component
assíncrono é suportado pelo App Router — **nenhuma das 16 chamadas precisa
mudar**.

## Verificação

O projeto `mylar-pro-site` não tem runner de testes configurado (sem Vitest, sem
Jest, zero arquivos de teste). Introduzir essa infraestrutura para validar três
helpers está fora do escopo pedido.

Verificação com o que o projeto já usa:

```bash
npx tsc --noEmit
yarn lint
```

Mais a checagem manual de que `/links` e o rodapé renderizam idênticos ao atual
com o Sanity vazio (caminho do fallback) e com o Sanity populado.

Se um runner de testes for desejado, é tarefa separada — os candidatos naturais
seriam `safeLinkHref` (schemes aceitos/rejeitados), as funções de query (dado
válido, inválido, Sanity não configurado) e `getIcon`.

## Arquivos

**Novos (7):**

```
src/sanity/schemaTypes/documents/linksPage.ts
src/sanity/schemaTypes/documents/siteFooter.ts
src/sanity/schemaTypes/documents/socialLinks.ts
src/sanity/schemaTypes/objects/linkButton.ts
src/sanity/schemaTypes/objects/footerLink.ts
src/sanity/lib/structure.ts
src/lib/safe-link-href.ts
```

**Alterados (10):**

```
sanity.config.ts                     structure customizada (singletons)
src/sanity/schemaTypes/index.ts      registra os 5 novos tipos
src/sanity/lib/queries.ts            3 funções tolerantes a erro + revalidate
src/sanity/lib/validation.ts         schemas Zod dos 3 documentos
src/sanity/types/content.ts          tipos dos 3 documentos
src/lib/icons.ts                     + youtube, tiktok, getIcon()
src/lib/links.ts                     listas mantidas como fallback
src/components/links/SocialRow.tsx   recebe items por prop
src/components/landing/Footer.tsx    async + Sanity + SocialRow
src/app/links/page.tsx               async + Sanity
```

## Conteúdo inicial no Sanity

Após a implementação, os três documentos precisam ser populados uma vez no
Studio com o conteúdo que hoje está no código (13 botões, 3 redes, 4 grupos do
rodapé). Enquanto não forem populados, o site segue renderizando o fallback —
sem quebra e sem diferença visual.
