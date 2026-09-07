# CLAUDE.md — mylar-pro-site

Site institucional + blog. Next.js 16 + React 19 + Tailwind v4, porta 3000.
Studio Sanity embarcado em `/studio`.

## O que é específico deste projeto

**Branch: vai direto na `main`.** Diferente do core e do web, que trabalham em
`dev` e recebem depois via homolog.

**Sem i18n, sem auth, sem React Query.** Conteúdo vem do Sanity (server
components) ou é estático. As únicas dependências de peso são `framer-motion`,
`zod` e o Sanity.

**Sem travessão nos textos.** `—` entrega que o texto é de IA. Vale para página,
post de blog e meta description.

## Sanity

Config em `sanity.config.ts` (`basePath: "/studio"`), schemas em
`src/sanity/schemaTypes/` divididos em `documents/`, `blocks/`, `objects/`.
Queries GROQ em `src/sanity/lib/queries.ts`.

`isStudioConfigured` protege o boot quando `NEXT_PUBLIC_SANITY_PROJECT_ID` está
vazio — não remova essa guarda.

### Duas armadilhas já pagas em produção

**`imageWithAlt` aninha `asset` duas vezes.** A referência correta é
`asset.asset._ref`, não `asset._ref`. Errar isso não dá erro: a capa
simplesmente não aparece.

**O Studio embarcado quebra o build por causa do `swr`.** O `export default` do
`swr` não existe na variante `react-server`. Se o build falhar mencionando
`swr`, é isso — não é o seu código.

## Regras de conteúdo

**Todo artigo precisa de plano de divulgação.** O blog não tem audiência própria;
publicar sem distribuir é escrever para ninguém.

**Elemento 3D ou ilustração entra por sentido**, não por enfeite. Se não
significa o que o texto diz, é decoração e sai.

**Nunca escreva preço em documento que alimenta a IA.** Tabela de preço muda e o
documento vira resposta errada na boca da Mila. (Vale para
`docs/suporte-ia-cognizy/` na raiz do monorepo — não para as páginas deste
site, que têm preço por desenho e são atualizadas junto.)

## Animação: cuidado ao verificar por screenshot

`framer-motion` congela em `opacity: 0` quando o pane do navegador está oculto
(`visibilityState = hidden`). Screenshot branco geralmente é isso, não CSS
quebrado.

E CSS de `scroll-animate` que esconde sem condição, revelando só por JS, deixa a
página **inteira** invisível se o JS não rodar. Esconda com condição, ou não
esconda.

## Comandos

```bash
yarn dev
yarn build
yarn lint
yarn seed:links     # popula os links de /links
```

Sem teste configurado.

## Estrutura

`src/app/` com 20 rotas (`blog/`, `features/`, `personas/`, `plans/`, `brokers/`,
`partners/`, `contact/`, `links/`, `go/`, `studio/`, legais). Código de apoio em
`src/lib/`, `src/sanity/`, `src/components/`.

## SEO e descoberta por IA

Quatro arquivos governam isso, e são fáceis de esquecer ao adicionar página:

| Arquivo | O que faz |
|---|---|
| `src/app/robots.ts` | Libera explicitamente os bots de IA |
| `src/app/sitemap.ts` | Precisa listar a rota nova |
| `public/llms.txt` | Resumo para LLM |
| `public/llms-full.txt` | Versão longa, com FAQs |

Página nova que não entra no `sitemap.ts` não é indexada.
