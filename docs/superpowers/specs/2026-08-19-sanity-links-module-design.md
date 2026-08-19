# Links e redes sociais gerenciados no Sanity

**Data:** 2026-08-19
**Projeto:** `mylar-pro-site` (Next.js 16, App Router, Tailwind v4, Sanity)

## Objetivo

Duas entregas ligadas:

1. **Conteúdo gerenciável** — mover os links da página `/links` e do rodapé para
   módulos editáveis no Sanity Studio, para adicionar, alterar e reordenar links
   sem editar código nem fazer deploy.
2. **Rastreio de ponta a ponta** — propagar UTM e click ids da entrada até o
   destino, contar o clique em GTM/GA4, Meta Pixel e Conversions API, e expor
   redirects curtos `/go/*` cujo destino também vem do Sanity.
3. **Consentimento de cookies** — banner opt-in com Consent Mode v2 e três
   categorias, que o site não tem hoje. Condição para o rastreio acima ser
   legítimo, inclusive no envio server-side.

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

Do lado do rastreio, GTM, Meta Pixel, GA4 e Conversions API **já existem** (ver
seção "Rastreio"); o que falta é UTM, click ids e evento de clique.

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
| `objects/linkButton.ts` | object | `label`, `href`, `icon` (dropdown), `variant` (`primary`/`secondary`), `utmContent`, `trackingEvent`, `shortSlug` |
| `objects/footerLink.ts` | object | `label`, `href`, `utmContent` |

Os três campos de rastreio do `linkButton` são **opcionais** e ficam num grupo
recolhido ("Rastreio") no Studio, para não poluir a edição do dia a dia:

- `utmContent` — uma palavra, vira `utm_content` no destino (`demo`, `teste`)
- `trackingEvent` — dropdown: vazio (`ClickLink`), `ClickDemo`, `ClickTrial`
- `shortSlug` — preenchido com `demo`, cria `/go/demo`; validado como único no
  documento e restrito a `[a-z0-9-]`

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

## Rastreio: UTM, click ids e eventos

### O que já existe

`src/app/layout.tsx` já carrega, cada um atrás da sua env var:

- **GTM** (`NEXT_PUBLIC_GTM_ID`)
- **Meta Pixel** (`NEXT_PUBLIC_META_PIXEL_ID`)
- **GA4 / gtag** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`)

E `src/lib/meta-conversions.ts` já implementa a **Conversions API** server-side
com hash SHA-256, usada hoje pelo formulário de contato (`sendLeadEvent`).

O que **não** existe: nenhum tratamento de `utm_*`, e nenhuma captura de
`fbclid` / `gclid` / `_fbp` / `_fbc`.

### Propagação de UTM, não UTM fixa por link

A UTM de saída **não** é cadastrada inteira em cada link. A página lê os
parâmetros `utm_*` da própria URL de entrada e os repassa ao destino,
acrescentando apenas o `utm_content` específico do botão.

No Sanity, cada link tem um campo `utmContent` (uma palavra: `demo`, `teste`,
`blog`). A query string completa é montada em tempo de render.

A razão é atribuição correta. Com UTM fixa, o botão "Agendar demonstração"
carregaria `utm_source=instagram&utm_medium=bio` mesmo para quem chegou pelo
LinkedIn ou pelos Stories — atribuindo ao Instagram uma visita que veio de outro
lugar, justamente nas superfícies que se quer separar. Com propagação, um clique
via Stories chega ao registro como `utm_medium=stories&utm_content=teste`.

Quando não há UTM na entrada (alguém digitou o endereço, ou veio de busca
orgânica), aplica-se um default por página: `utm_source=site`,
`utm_medium=links-page`. O default é o comportamento de fallback, não sobrescreve
UTM presente.

### Click ids (mais importante que a UTM para mídia paga)

`fbclid` e `gclid` são propagados junto com as UTMs. São eles — não a UTM — que
a Meta e o Google Ads usam para casar o clique no anúncio com a conversão. Sem
eles, a atribuição da campanha paga fica cega mesmo com UTM perfeita.

O `fbclid` também é convertido no parâmetro `fbc` no formato que a Conversions
API espera (`fb.1.<timestamp>.<fbclid>`), e o cookie `_fbp` (posto pelo próprio
Pixel) é lido e enviado. Ambos melhoram muito a taxa de correspondência de
eventos no Events Manager.

### Eventos de clique: as três camadas

As três disparam no mesmo clique, cada uma cobrindo o furo da outra:

| Camada | Serve para | Cobre |
|---|---|---|
| `dataLayer` → GTM/GA4 | Google Ads: importar conversão, otimizar lance | Ajuste de gatilho sem deploy |
| Meta Pixel (`fbq`) | Meta Ads: sinal rápido | — |
| Conversions API | Meta Ads: mesmo evento, pelo servidor | Cliques perdidos por adblocker / ITP |

**Deduplicação é obrigatória.** Pixel e Conversions API disparam com o **mesmo
`event_id`**, e a Meta reconhece como um evento só. Sem isso a contagem dobra e o
CPA fica falso. O `meta-conversions.ts` hoje gera o `event_id` internamente;
passa a **aceitar um `eventId` de fora** para casar com o disparo do Pixel.

### Nomes de evento

Clique em botão **não** é `Lead`. O lead acontece quando a pessoa preenche o
formulário (Cognizy ou registro). Marcar o clique como `Lead` inflaria a
contagem e envenenaria a otimização da campanha.

| Ação | Evento Meta | Evento dataLayer/GA4 |
|---|---|---|
| Clique num link da `/links` ou rodapé | `ClickLink` (customizado) | `link_click` |
| Clique em "Agendar demonstração" | `ClickDemo` (customizado) | `click_demo` |
| Clique em "Criar conta" / teste | `ClickTrial` (customizado) | `click_trial` |
| Envio do formulário de contato | `Lead` (**já existe, não muda**) | — |

Eventos customizados em vez de padrão (`InitiateCheckout`) mantêm nomes claros no
Events Manager e não sequestram a semântica de um evento padrão que pode ser
usado de verdade depois. O evento de destaque (`ClickDemo` / `ClickTrial`) é
determinado por um campo `trackingEvent` opcional no link, no Sanity; sem ele,
cai em `ClickLink`.

### Redirects curtos `/go/*`

Rota `src/app/go/[slug]/route.ts`. Cada link no Sanity ganha um campo opcional
`shortSlug`; preenchê-lo com `demo` faz `/go/demo` redirecionar (HTTP 307) para o
destino daquele link, com UTMs e click ids da requisição repassados.

Vantagens: o clique é contado no **seu** servidor (imune a adblocker), e o
destino pode ser trocado no Studio sem editar bio ou Stories já publicados.

O destino vive num lugar só — o próprio link — em vez de um módulo de redirects
separado, que duplicaria a URL da demo em dois documentos e permitiria que
divergissem.

Slug não encontrado → 307 para a `/links` (nunca 404 numa URL que já pode estar
impressa ou publicada). O evento server-side é enviado antes do redirect, sem
`await` bloqueando a resposta.

### Fora de escopo, anotado

**Google Ads Enhanced Conversions** — o equivalente do Google à Conversions API.
Exige configuração no painel do Google Ads, não só código. Não implementado aqui.

## Consentimento de cookies (LGPD)

Hoje o site **não tem banner algum**: GTM, Meta Pixel e GA4 carregam e rastreiam
desde o primeiro acesso. Entra no escopo um banner **opt-in com Consent Mode v2**
e três categorias.

### Categorias

| Categoria | O que controla | Padrão |
|---|---|---|
| Necessários | nada de rastreio; o próprio cookie de consentimento | sempre ativo, sem toggle |
| Analíticos | GA4 (`analytics_storage`) | negado |
| Marketing | Meta Pixel, Conversions API, Google Ads (`ad_storage`, `ad_user_data`, `ad_personalization`) | negado |

O **CognizyWidget** (chat de atendimento) é classificado como **funcional/necessário**
e não é bloqueado. É uma ferramenta de suporte que o próprio visitante aciona, não
rastreio publicitário; bloqueá-la deixaria o atendimento indisponível para quem
recusa marketing. **Classificação a validar juridicamente.**

### Ordem de carregamento (o ponto crítico)

O Consent Mode exige que o estado default seja declarado **antes** de o GTM
carregar. Fora de ordem, o Consent Mode não tem efeito — é o erro mais comum
nessa implementação.

```
1. gtag('consent','default', { analytics_storage:'denied',
                               ad_storage:'denied',
                               ad_user_data:'denied',
                               ad_personalization:'denied',
                               wait_for_update: 500 })
   ← inline, síncrono, ANTES de qualquer outro script
2. GTM / GA4 / Pixel carregam (e respeitam o estado negado)
3. Visitante aceita → gtag('consent','update', {...'granted'})
                    → fbq('consent','grant')
```

Em `layout.tsx` isso significa um `<Script id="consent-default" strategy="beforeInteractive">`
posicionado acima dos blocos de GTM, Pixel e GA4 que já existem. O Pixel recebe
`fbq('consent','revoke')` imediatamente após o `init`, e `grant` só no aceite.

### O evento server-side também respeita o consentimento

Ponto que não pode ser esquecido: a **Conversions API não passa pelo navegador**,
portanto não vê o banner. Se o `/go/*` disparar o evento para quem recusou, o
banner é decorativo.

A rota `/go/[slug]` lê o cookie de consentimento via `cookies()` do Next e só
chama o `sendLeadEvent` se a categoria **marketing** estiver aceita. O redirect
acontece de qualquer forma — recusar rastreio não pode quebrar a navegação.

### Persistência

Cookie `mylar-consent`, 6 meses, `SameSite=Lax`, sem `httpOnly` (o cliente precisa
ler para decidir se dispara os eventos), legível no servidor pela rota `/go/*`.
Valor: JSON compacto com versão, categorias e timestamp — a versão permite
re-solicitar consentimento se as categorias mudarem no futuro.

Registrar o timestamp e a versão é o que dá evidência de consentimento, exigível
pela LGPD; sem isso não há como demonstrar quando e a quê a pessoa consentiu.

### Componentes

| Arquivo | Papel |
|---|---|
| `src/lib/consent/types.ts` | categorias, versão, formato do cookie |
| `src/lib/consent/cookie.ts` | ler/gravar, isomórfico (cliente e servidor) |
| `src/components/consent/ConsentProvider.tsx` | contexto client-side; aplica `consent update` |
| `src/components/consent/CookieBanner.tsx` | banner + tela de preferências |
| `src/app/api/consent/route.ts` | grava o cookie server-side (opcional; ver abaixo) |

O banner segue a identidade do site (`bg-slate-950`, primária `#2facde`), fixo na
base, sem bloquear a página com overlay modal — recusar deve ser tão fácil quanto
aceitar, e um overlay que obriga a escolher para ver o conteúdo é prática que a
ANPD critica.

A rota `/api/consent` existe porque o cookie precisa ser legível no servidor pelo
`/go/*`; gravar via `document.cookie` no cliente funciona, mas a rota garante os
atributos corretos (`Max-Age`, `SameSite`, `Path`) de forma consistente.

### Pendência: política de privacidade não menciona cookies

Os arquivos legais (`src/lib/legal/brokers-privacy-policy.ts` e afins) **não têm
nenhuma menção a cookies**. Um banner que aponta para uma política silenciosa a
respeito é inconsistente na prática e perante a ANPD.

Redigir a seção de cookies da política é **trabalho jurídico, fora deste escopo**.
O banner linkará para a política existente; a seção precisa ser escrita antes de
o banner ir para produção.

## Revalidação (ISR)

`next: { revalidate: 600 }` na chamada `fetch` do cliente Sanity, dentro das
funções de query deste módulo — não `export const revalidate` por página.

O rodapé aparece em 16 páginas; declarar por página significaria tocar em ~14
arquivos com uma linha cada, e qualquer página nova criada depois esqueceria a
linha. Na query, é uma linha no lugar certo e vale para todo consumidor.

Efeito: link editado no Studio aparece no site em até 10 minutos. Se um dia for
preciso instantâneo, um webhook `/api/revalidate` se acrescenta por cima sem
refazer nada disso.

### Consequência do `searchParams` na `/links`

Ler `searchParams` torna a rota `/links` **dinâmica** — ela passa a renderizar a
cada request, e o `revalidate: 600` deixa de valer ali (segue valendo no rodapé,
em todas as outras páginas).

Isso é aceitável e até desejável nessa rota: é uma página só, leve, e é o ponto de
entrada das campanhas — a UTM resolvida no servidor não depende de JS, o que a
torna mais confiável exatamente onde importa. O `fetch` do Sanity continua com
cache de 600s, então o Sanity **não** é consultado a cada visita; apenas o HTML é
remontado.

## Componentes

Nenhuma mudança visual. Os componentes passam a receber dados por props em vez
de importar do módulo de config.

| Arquivo | Mudança |
|---|---|
| `components/links/LinkButton.tsx` | nenhuma (já recebe `LinkItem` por props) |
| `components/links/SocialRow.tsx` | passa a receber `items: SocialItem[]` por prop |
| `app/links/page.tsx` | busca no Sanity, aplica fallback, lê `searchParams` para a UTM |
| `components/landing/Footer.tsx` | vira `async`; busca no Sanity; **ganha a `SocialRow`** na barra inferior |

O `LinkButton` passa a usar o `TrackedLink`, um client component fino que envolve
o `<a>`/`<Link>` e dispara os eventos no `onClick`. O `LinkButton` já é
`"use client"`, então não há mudança de fronteira servidor/cliente ali.

O rodapé é um Server Component e **não** lê `searchParams` (não pode, sem tornar
todas as 16 páginas dinâmicas). Os links do rodapé recebem UTM pelo cliente: o
`TrackedLink` lê `window.location.search` no clique e monta o destino ali. A
página `/links`, que é uma rota só e já é o ponto de entrada de campanha, resolve
a UTM no servidor via `searchParams` — mais confiável, porque não depende de JS.

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

O rastreio se verifica nas ferramentas das próprias plataformas, que é onde os
erros de fato aparecem:

| O que checar | Onde |
|---|---|
| `dataLayer.push` com nome, destino e `utm_content` | GTM Preview / console |
| Evento do Pixel e seu `event_id` | Meta Pixel Helper (extensão) |
| Evento server-side chegando | Events Manager → Test Events |
| **Dedup Pixel × Conversions API** | Events Manager → o evento deve aparecer **uma vez**, com "Deduplicated" |
| UTM propagada até o destino | abrir `/links?utm_source=teste&utm_medium=x` e inspecionar o `href` dos botões |
| `fbclid`/`gclid` repassados | mesma checagem, com `?fbclid=abc123` |
| Redirect e destino | `curl -sI localhost:3000/go/demo` → `307` + `location` correto |

A verificação de deduplicação é a que não pode ser pulada: é o erro que passa
despercebido em desenvolvimento e só aparece como CPA inflado no relatório da
campanha.

Consentimento — as três checagens que provam que o banner não é decorativo:

| O que checar | Como |
|---|---|
| `consent default` roda **antes** do GTM | GTM Preview → o primeiro evento deve ser o `consent` negado, não `gtm.js` |
| Recusar impede o Pixel | recusar → clicar num botão → Pixel Helper **não** deve mostrar evento |
| Recusar impede o **server-side** | recusar → `curl` no `/go/demo` com o cookie de recusa → Events Manager sem evento, mas resposta `307` normal |

A terceira é a que costuma falhar: o evento server-side não passa pelo navegador,
então um banner implementado só no cliente continua enviando dados de quem
recusou.

Se um runner de testes for desejado, é tarefa separada — os candidatos naturais
seriam `safeLinkHref` (schemes aceitos/rejeitados), o builder de UTM (propaga,
aplica default, não sobrescreve), as funções de query (dado válido, inválido,
Sanity não configurado) e `getIcon`.

## Arquivos

**Novos (16):**

```
src/sanity/schemaTypes/documents/linksPage.ts
src/sanity/schemaTypes/documents/siteFooter.ts
src/sanity/schemaTypes/documents/socialLinks.ts
src/sanity/schemaTypes/objects/linkButton.ts
src/sanity/schemaTypes/objects/footerLink.ts
src/sanity/lib/structure.ts
src/lib/safe-link-href.ts
src/lib/tracking/utm.ts              lê/propaga utm_* + fbclid/gclid; monta href
src/lib/tracking/events.ts           dataLayer + fbq no clique, com event_id
src/components/tracking/TrackedLink.tsx   client component que dispara no clique
src/app/go/[slug]/route.ts           redirect curto + evento server-side
src/lib/consent/types.ts             categorias, versão, formato do cookie
src/lib/consent/cookie.ts            ler/gravar, isomórfico
src/components/consent/ConsentProvider.tsx   contexto + consent update
src/components/consent/CookieBanner.tsx      banner + preferências
src/app/api/consent/route.ts         grava o cookie com atributos corretos
```

**Alterados (13):**

```
sanity.config.ts                     structure customizada (singletons)
src/sanity/schemaTypes/index.ts      registra os 5 novos tipos
src/sanity/lib/queries.ts            3 funções tolerantes a erro + revalidate
src/sanity/lib/validation.ts         schemas Zod dos 3 documentos
src/sanity/types/content.ts          tipos dos 3 documentos
src/lib/icons.ts                     + youtube, tiktok, getIcon()
src/lib/links.ts                     listas mantidas como fallback
src/lib/meta-conversions.ts          aceita eventId + eventName + fbc/fbp
src/components/links/LinkButton.tsx  usa TrackedLink
src/components/links/SocialRow.tsx   recebe items por prop
src/components/landing/Footer.tsx    async + Sanity + SocialRow
src/app/links/page.tsx               async + Sanity + lê searchParams
src/app/layout.tsx                   consent default ANTES do GTM + Provider + Banner
```

O `meta-conversions.ts` é o único arquivo pré-existente com lógica de negócio
alterado. A mudança é aditiva: `eventName` e `eventId` passam a ser parâmetros
opcionais com os defaults atuais (`Lead`, `crypto.randomUUID()`), então a chamada
do formulário de contato continua funcionando sem alteração.

## Conteúdo inicial no Sanity

Após a implementação, os três documentos precisam ser populados uma vez no
Studio com o conteúdo que hoje está no código (13 botões, 3 redes, 4 grupos do
rodapé). Enquanto não forem populados, o site segue renderizando o fallback —
sem quebra e sem diferença visual.

Ao popular, preencher o grupo "Rastreio" nos links que importam para a campanha:

| Link | `utmContent` | `trackingEvent` | `shortSlug` |
|---|---|---|---|
| Agendar demonstração | `demo` | `ClickDemo` | `demo` |
| Criar conta grátis | `teste` | `ClickTrial` | `teste` |
| Acessar plataforma | `app` | — | — |
| Apps (corretor/cliente) | `app-ios` / `app-android` | — | — |
| WhatsApp | `whatsapp` | — | `whatsapp` |

Os demais podem ficar sem nada — caem em `ClickLink` e sem `utm_content`.

## Uso das UTMs na divulgação (fora do código)

Para referência de quem publica, e para o rastreio fazer sentido de ponta a ponta:

| Superfície | URL a publicar |
|---|---|
| Bio do Instagram | `mylarpro.com.br/links?utm_source=instagram&utm_medium=bio` |
| Sticker de Stories | `mylarpro.com.br/links?utm_source=instagram&utm_medium=stories&utm_campaign=<tema>` |
| LinkedIn orgânico | `mylarpro.com.br/links?utm_source=linkedin&utm_medium=organic` |
| Anúncios Meta | parâmetros de URL configurados no próprio anúncio, `utm_medium=paid` |

O `utm_medium` diferente por superfície é o que permite saber se o resultado veio
da bio ou dos Stories — sem isso tudo colapsa em "instagram" e a comparação fica
impossível.

Pendência de produto, não de código: campo "como nos conheceu" no formulário de
demo e no registro. É o que captura quem vê no Instagram e depois chega pelo
Google — caso que nenhuma UTM alcança, e que é a maioria em B2B.
