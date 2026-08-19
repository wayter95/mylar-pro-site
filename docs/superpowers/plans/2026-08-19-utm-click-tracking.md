# UTM e Rastreio de Cliques — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Propagar UTM e click ids (`fbclid`, `gclid`) da URL de entrada até o destino de cada link, contar o clique em GTM/GA4 + Meta Pixel + Conversions API com deduplicação, e expor redirects curtos `/go/*` configurados no Sanity.

**Architecture:** Os parâmetros de campanha são lidos da URL de entrada e propagados ao destino — não cadastrados fixos por link, o que atribuiria ao Instagram uma visita vinda do LinkedIn. Cada link no Sanity ganha só um `utmContent` (uma palavra) e, opcionalmente, um nome de evento e um slug curto. O clique dispara três camadas: `dataLayer` (GTM/GA4), Pixel client-side e Conversions API server-side, as duas últimas com o **mesmo `event_id`** para a Meta deduplicar.

**Tech Stack:** Next.js 16 (App Router), Sanity 6, Zod 4, TypeScript, Meta Conversions API v21.0, GTM, GA4.

**Spec:** `docs/superpowers/specs/2026-08-19-sanity-links-module-design.md` (seção "Rastreio")

**Depende de:** Plano 1 (`2026-08-19-sanity-links-module.md`) concluído — este plano estende os schemas e componentes criados lá.

## Global Constraints

- **Este é o Plano 2 de 3.** O consentimento de cookies é o Plano 3. Este plano dispara os eventos **sem** checagem de consentimento; o Plano 3 adiciona o gate. Ordem deliberada: o gate precisa de algo para bloquear.
- **Sem comentários no código** — o codebase é intencionalmente livre de comentários (CLAUDE.md).
- **Imports absolutos** com `@/*` → `./src/*`.
- **Nomes de código em inglês; texto de UI e Studio em pt-BR.**
- **Clique nunca é evento `Lead`.** O `Lead` fica reservado ao envio de formulário, onde já está. Usar `ClickLink`, `ClickDemo`, `ClickTrial`.
- **`event_id` compartilhado** entre Pixel e Conversions API é obrigatório, não opcional — sem ele a Meta conta o evento duas vezes e o CPA fica falso.
- **Sem `any`.**
- **O projeto não tem runner de testes.** Verificação: `npx tsc --noEmit`, `yarn lint`, mais a checagem manual de cada task.
- **Nunca `git push`.**
- Nenhuma classe Tailwind muda. O design permanece idêntico.

---

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `src/lib/tracking/params.ts` | Nomes dos parâmetros rastreados; extração de um `URLSearchParams` ou string |
| `src/lib/tracking/build-href.ts` | Monta o href de destino com os parâmetros propagados |
| `src/lib/tracking/events.ts` | Dispara `dataLayer` + `fbq` no cliente; gera o `event_id` |
| `src/components/tracking/TrackedLink.tsx` | Envolve `<a>`/`<Link>`, resolve href e dispara os eventos |
| `src/app/go/[slug]/route.ts` | Redirect curto + evento server-side |
| `src/lib/meta-conversions.ts` (mod) | Aceita `eventName`, `eventId`, `fbc`, `fbp`; sem e-mail obrigatório |
| `src/sanity/schemaTypes/objects/linkButton.ts` (mod) | + grupo "Rastreio": `utmContent`, `trackingEvent`, `shortSlug` |
| `src/sanity/schemaTypes/objects/footerLink.ts` (mod) | + `utmContent` |
| `src/sanity/lib/validation.ts` (mod) | Campos de rastreio nos schemas Zod |
| `src/sanity/types/content.ts` (mod) | Campos de rastreio nos tipos |
| `src/sanity/lib/queries.ts` (mod) | Query traz os campos novos; nova `getLinkByShortSlug` |
| `src/components/links/LinkButton.tsx` (mod) | Usa `TrackedLink` |
| `src/app/links/page.tsx` (mod) | Lê `searchParams`, repassa os parâmetros |
| `src/components/landing/Footer.tsx` (mod) | Links do rodapé via `TrackedLink` |

---

### Task 1: Parâmetros rastreados e extração

**Files:**
- Create: `src/lib/tracking/params.ts`

**Interfaces:**
- Produces — usados nas Tasks 2, 4, 5, 6:
  - `TRACKED_PARAMS: readonly string[]`
  - `type TrackingParams = Record<string, string>`
  - `extractTrackingParams(source: URLSearchParams | Record<string, string | string[] | undefined>): TrackingParams`
  - `DEFAULT_SOURCE: TrackingParams`

- [ ] **Step 1: Criar o arquivo**

```ts
export const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
] as const;

export type TrackingParams = Record<string, string>;

export const DEFAULT_SOURCE: TrackingParams = {
  utm_source: "site",
  utm_medium: "links-page",
};

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export function extractTrackingParams(
  source: URLSearchParams | Record<string, string | string[] | undefined>,
): TrackingParams {
  const params: TrackingParams = {};

  for (const key of TRACKED_PARAMS) {
    const raw =
      source instanceof URLSearchParams
        ? source.get(key) ?? undefined
        : firstValue(source[key]);
    const value = raw?.trim();

    if (value) {
      params[key] = value;
    }
  }

  return params;
}
```

Nota sobre `utm_content`: ele está em `TRACKED_PARAMS` porque pode vir da entrada, mas o `utmContent` do link **sobrescreve** o da entrada na Task 2 — o botão específico é informação mais precisa que o parâmetro genérico da URL.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/lib/tracking/params.ts
git commit -m "feat: add tracking param extraction

Covers utm_* plus fbclid and gclid, which are what Meta and Google Ads
actually use to match a click to a conversion."
```

---

### Task 2: Montagem do href de destino

**Files:**
- Create: `src/lib/tracking/build-href.ts`

**Interfaces:**
- Consumes: `TrackingParams`, `DEFAULT_SOURCE` (Task 1); `isExternalHref` de `@/lib/links`
- Produces — usados nas Tasks 4, 5, 6:
  - `buildTrackedHref(href: string, params: TrackingParams, utmContent?: string): string`

**Regra:** `mailto:` e `tel:` **não** recebem query string — anexar `?utm_source=` a um `mailto:` produz um endereço quebrado. Caminhos internos e URLs http(s) recebem.

- [ ] **Step 1: Criar o arquivo**

```ts
import { DEFAULT_SOURCE, type TrackingParams } from "@/lib/tracking/params";

const nonQueryableSchemes = ["mailto:", "tel:"];

function acceptsQuery(href: string): boolean {
  return !nonQueryableSchemes.some((scheme) =>
    href.toLowerCase().startsWith(scheme),
  );
}

export function buildTrackedHref(
  href: string,
  params: TrackingParams,
  utmContent?: string,
): string {
  if (!acceptsQuery(href)) {
    return href;
  }

  const merged: TrackingParams = {
    ...DEFAULT_SOURCE,
    ...params,
  };

  if (utmContent) {
    merged.utm_content = utmContent;
  }

  const isAbsolute = /^https?:\/\//i.test(href);
  const base = isAbsolute ? undefined : "https://mylarpro.com.br";

  try {
    const url = new URL(href, base);

    for (const [key, value] of Object.entries(merged)) {
      url.searchParams.set(key, value);
    }

    return isAbsolute ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}
```

O `base` fictício existe só para o `URL` conseguir parsear um caminho relativo; para caminhos internos o retorno descarta a origem e devolve caminho + query.

- [ ] **Step 2: Verificar o comportamento**

Run:

```bash
npx tsc --noEmit
```

Comportamento esperado (revisar mentalmente contra o código; a verificação executável vem na Task 6, no navegador):

| href | params | utmContent | resultado |
|---|---|---|---|
| `/features` | `{utm_source:"linkedin"}` | `demo` | `/features?utm_source=linkedin&utm_medium=links-page&utm_content=demo` |
| `https://app.x.com/register` | `{utm_source:"instagram",utm_medium:"bio"}` | `teste` | `https://app.x.com/register?utm_source=instagram&utm_medium=bio&utm_content=teste` |
| `mailto:a@b.com` | qualquer | qualquer | `mailto:a@b.com` (inalterado) |
| `tel:+5561` | qualquer | qualquer | `tel:+5561` (inalterado) |
| `https://a.com?x=1` | `{utm_source:"x"}` | — | `https://a.com/?x=1&utm_source=x&utm_medium=links-page` |

Atenção ao caso `utm_medium`: sem `utm_medium` na entrada, o default `links-page` entra. Com `utm_medium=bio` na entrada, o default é sobrescrito — é o comportamento correto.

- [ ] **Step 3: Commit**

```bash
git add src/lib/tracking/build-href.ts
git commit -m "feat: build destination href from propagated tracking params

Propagating the entry UTM instead of hardcoding it per link keeps
attribution honest: a visit arriving from LinkedIn is not reported as
Instagram traffic."
```

---

### Task 3: `meta-conversions.ts` aceita evento e id de fora

**Files:**
- Modify: `src/lib/meta-conversions.ts`

**Interfaces:**
- Produces — usado na Task 5:
  - `sendConversionEvent(payload: ConversionEventPayload): Promise<void>`
  - `type ConversionEventPayload = { eventName: string; eventId: string; eventSourceUrl?: string; userAgent?: string | null; clientIp?: string | null; fbc?: string; fbp?: string; customData?: Record<string, string> }`
- Mantém: `sendLeadEvent(payload: LeadEventPayload)` — a assinatura atual, usada por `src/app/api/contact/route.ts`, **não muda**.

**Contexto:** o arquivo hoje tem `sendLeadEvent`, que exige `email` e força `event_name: "Lead"`. O clique não tem e-mail e não é um Lead. Em vez de afrouxar o `sendLeadEvent` (o que permitiria enviar Lead sem e-mail por acidente), extrai-se um `sendConversionEvent` genérico e o `sendLeadEvent` passa a delegar a ele.

- [ ] **Step 1: Adicionar o tipo e a função genérica**

Em `src/lib/meta-conversions.ts`, após o tipo `LeadEventPayload` existente, adicionar:

```ts
export type ConversionEventPayload = {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  userAgent?: string | null;
  clientIp?: string | null;
  fbc?: string;
  fbp?: string;
  userData?: Record<string, string>;
  customData?: Record<string, string>;
};

export async function sendConversionEvent(
  payload: ConversionEventPayload,
): Promise<void> {
  if (!pixelId || !accessToken) {
    return;
  }

  const userData: Record<string, string> = { ...payload.userData };

  if (payload.clientIp && payload.clientIp !== "unknown") {
    userData.client_ip_address = payload.clientIp;
  }
  if (payload.userAgent) {
    userData.client_user_agent = payload.userAgent;
  }
  if (payload.fbc) {
    userData.fbc = payload.fbc;
  }
  if (payload.fbp) {
    userData.fbp = payload.fbp;
  }

  const body = {
    data: [
      {
        event_name: payload.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId,
        action_source: "website",
        user_data: userData,
        ...(payload.customData && { custom_data: payload.customData }),
        ...(payload.eventSourceUrl && {
          event_source_url: payload.eventSourceUrl,
        }),
      },
    ],
    access_token: accessToken,
  };

  try {
    const url = `${META_GRAPH_BASE}/${META_API_VERSION}/${pixelId}/events`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("[Meta Conversions API] Erro:", res.status, data);
    }
  } catch (err) {
    console.error(
      `[Meta Conversions API] Falha ao enviar evento ${payload.eventName}:`,
      err,
    );
  }
}
```

- [ ] **Step 2: Fazer o `sendLeadEvent` delegar**

Substituir o corpo do `sendLeadEvent` existente por:

```ts
export async function sendLeadEvent(payload: LeadEventPayload): Promise<void> {
  const userData: Record<string, string> = {
    em: sha256(payload.email),
  };

  if (payload.telefone?.trim()) {
    const ph = sha256Phone(payload.telefone.trim());
    if (ph) userData.ph = ph;
  }

  await sendConversionEvent({
    eventName: "Lead",
    eventId: crypto.randomUUID(),
    eventSourceUrl: payload.eventSourceUrl,
    userAgent: payload.userAgent,
    clientIp: payload.clientIp,
    userData,
    ...(payload.nome && { customData: { nome: payload.nome } }),
  });
}
```

O comportamento visível do `sendLeadEvent` é idêntico ao anterior: mesmo `event_name`, mesmo hash de e-mail e telefone, mesmo `custom_data`, mesmo tratamento de erro. `src/app/api/contact/route.ts` não muda.

- [ ] **Step 3: Confirmar que o contact route não quebrou**

Run: `grep -n "sendLeadEvent" src/app/api/contact/route.ts && npx tsc --noEmit`
Expected: o `grep` mostra a chamada existente; o `tsc` sem erros.

- [ ] **Step 4: Lint**

Run: `yarn lint`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
git add src/lib/meta-conversions.ts
git commit -m "refactor: extract generic sendConversionEvent from sendLeadEvent

Click events carry no email and are not Leads. Extracting a generic
sender keeps sendLeadEvent strict about requiring an email instead of
loosening it, and lets the caller pass an event_id so the Pixel and the
Conversions API can be deduplicated."
```

---

### Task 4: Campos de rastreio no Sanity

**Files:**
- Modify: `src/sanity/schemaTypes/objects/linkButton.ts`
- Modify: `src/sanity/schemaTypes/objects/footerLink.ts`
- Modify: `src/sanity/types/content.ts`
- Modify: `src/sanity/lib/validation.ts`
- Modify: `src/sanity/lib/queries.ts`

**Interfaces:**
- Consumes: os schemas do Plano 1
- Produces — usados nas Tasks 5 e 6:
  - `LinkButtonItem` ganha `utmContent?: string`, `trackingEvent?: string`, `shortSlug?: string`
  - `FooterLinkItem` ganha `utmContent?: string`
  - `getLinkByShortSlug(slug: string): Promise<LinkButtonItem | null>`

- [ ] **Step 1: Adicionar o grupo "Rastreio" ao `linkButton.ts`**

No `defineType` de `linkButton`, adicionar a chave `groups` logo após `icon: LinkIcon,`:

```ts
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "tracking", title: "Rastreio" },
  ],
```

Adicionar `group: "content"` a cada um dos 4 campos existentes (`label`, `href`, `icon`, `variant`). Exemplo no `label`:

```ts
    defineField({
      name: "label",
      title: "Texto do botão",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
```

E acrescentar os três campos novos ao final do array `fields`:

```ts
    defineField({
      name: "utmContent",
      title: "Identificador de campanha",
      description:
        "Uma palavra, sem espaços (demo, teste, blog). Vira utm_content no destino. Opcional.",
      type: "string",
      group: "tracking",
      validation: (Rule) =>
        Rule.regex(/^[a-z0-9-]+$/, {
          name: "identificador",
        }).warning("Use apenas letras minúsculas, números e hífen."),
    }),
    defineField({
      name: "trackingEvent",
      title: "Evento de conversão",
      description:
        "Deixe vazio para o evento padrão de clique. Escolha um específico apenas nos botões de demonstração e teste.",
      type: "string",
      group: "tracking",
      options: {
        list: [
          { title: "Padrão (clique em link)", value: "ClickLink" },
          { title: "Agendar demonstração", value: "ClickDemo" },
          { title: "Criar conta / teste", value: "ClickTrial" },
        ],
      },
    }),
    defineField({
      name: "shortSlug",
      title: "Atalho curto",
      description:
        "Preencha com demo para criar mylarpro.com.br/go/demo apontando para este destino. Útil em bio e Stories, porque o destino pode mudar aqui sem reeditar o que já foi publicado.",
      type: "string",
      group: "tracking",
      validation: (Rule) =>
        Rule.regex(/^[a-z0-9-]+$/, { name: "atalho" }).warning(
          "Use apenas letras minúsculas, números e hífen.",
        ),
    }),
```

- [ ] **Step 2: Validar unicidade do `shortSlug` no documento `linksPage`**

Em `src/sanity/schemaTypes/documents/linksPage.ts`, trocar a validação do campo `links` por:

```ts
    defineField({
      name: "links",
      title: "Botões",
      description: "Arraste para reordenar.",
      type: "array",
      of: [{ type: "linkButton" }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((links) => {
            if (!Array.isArray(links)) {
              return true;
            }

            const slugs = links
              .map((link) =>
                typeof link === "object" && link !== null
                  ? (link as { shortSlug?: unknown }).shortSlug
                  : undefined,
              )
              .filter((slug): slug is string => typeof slug === "string" && slug.length > 0);

            const duplicates = slugs.filter(
              (slug, index) => slugs.indexOf(slug) !== index,
            );

            return duplicates.length === 0
              ? true
              : `Atalho repetido: ${[...new Set(duplicates)].join(", ")}. Cada atalho deve ser único.`;
          }),
    }),
```

Sem isso, dois links com `shortSlug: "demo"` fariam `/go/demo` apontar para um deles ao acaso.

- [ ] **Step 3: Adicionar `utmContent` ao `footerLink.ts`**

Ao final do array `fields` de `footerLink`:

```ts
    defineField({
      name: "utmContent",
      title: "Identificador de campanha",
      description: "Uma palavra, sem espaços. Vira utm_content no destino. Opcional.",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^[a-z0-9-]+$/, { name: "identificador" }).warning(
          "Use apenas letras minúsculas, números e hífen.",
        ),
    }),
```

- [ ] **Step 4: Estender os tipos em `src/sanity/types/content.ts`**

Substituir as interfaces criadas no Plano 1:

```ts
export interface LinkButtonItem {
  label: string;
  href: string;
  icon: string;
  variant: "primary" | "secondary";
  utmContent?: string;
  trackingEvent?: string;
  shortSlug?: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
  utmContent?: string;
}
```

- [ ] **Step 5: Estender os schemas Zod em `src/sanity/lib/validation.ts`**

Nos schemas criados no Plano 1, acrescentar os campos opcionais. O `optionalText` já existe no topo do arquivo e trata `null` → `undefined`:

```ts
export const linkButtonSchema = z.object({
  label: z.string().trim().min(1),
  href: safeLinkHrefSchema,
  icon: z.string().trim().min(1),
  variant: z.enum(["primary", "secondary"]),
  utmContent: optionalText,
  trackingEvent: z
    .enum(["ClickLink", "ClickDemo", "ClickTrial"])
    .nullish()
    .transform((value) => value ?? undefined),
  shortSlug: optionalText,
});

export const footerLinkSchema = z.object({
  label: z.string().trim().min(1),
  href: safeLinkHrefSchema,
  utmContent: optionalText,
});
```

- [ ] **Step 6: Trazer os campos nas queries e adicionar `getLinkByShortSlug`**

Em `src/sanity/lib/queries.ts`, atualizar as projeções criadas no Plano 1:

```ts
const linksPageQuery = `*[_type == "linksPage"][0] {
  tagline,
  links[] { label, href, icon, variant, utmContent, trackingEvent, shortSlug }
}`;

const siteFooterQuery = `*[_type == "siteFooter"][0] {
  brandDescription,
  groups[] { title, links[] { label, href, utmContent } }
}`;
```

E adicionar ao final do arquivo:

```ts
const linkByShortSlugQuery = `*[_type == "linksPage"][0].links[shortSlug == $slug][0] {
  label, href, icon, variant, utmContent, trackingEvent, shortSlug
}`;

export async function getLinkByShortSlug(
  slug: string,
): Promise<LinkButtonItem | null> {
  const data = await fetchContent<unknown>(
    linkByShortSlugQuery,
    `link for slug "${slug}"`,
    { slug },
  );

  if (!data) {
    return null;
  }

  const parsed = linkButtonSchema.safeParse(data);

  if (!parsed.success) {
    console.error(`[Sanity] Link for slug "${slug}" is invalid.`);
    return null;
  }

  return parsed.data;
}
```

O `fetchContent` do Plano 1 recebe agora um terceiro argumento de parâmetros. Ajustar a assinatura dele:

```ts
async function fetchContent<T>(
  query: string,
  context: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await getSanityClient().fetch<T>(query, params, {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    });
  } catch (error) {
    console.error(`[Sanity] Failed to fetch ${context}:`, error);
    return null;
  }
}
```

- [ ] **Step 7: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 8: Verificar no Studio**

Run: `yarn dev`

Em `/studio` → "Página de Links" → abrir um botão. Confirmar:
- Há duas abas: "Conteúdo" e "Rastreio".
- A aba "Rastreio" tem os três campos, todos opcionais.
- Preencher `shortSlug: demo` em **dois** botões diferentes e tentar publicar → deve aparecer o erro "Atalho repetido: demo".

Reverter o teste de duplicidade.

- [ ] **Step 9: Commit**

```bash
git add src/sanity/schemaTypes/objects/linkButton.ts src/sanity/schemaTypes/objects/footerLink.ts src/sanity/schemaTypes/documents/linksPage.ts src/sanity/types/content.ts src/sanity/lib/validation.ts src/sanity/lib/queries.ts
git commit -m "feat: add tracking fields to Sanity link schemas

utmContent holds one word, not a full query string: the rest of the UTM
comes from the entry URL at render time. shortSlug uniqueness is
validated, otherwise /go/demo would resolve to an arbitrary link."
```

---

### Task 5: Redirect curto `/go/[slug]`

**Files:**
- Create: `src/app/go/[slug]/route.ts`

**Interfaces:**
- Consumes: `getLinkByShortSlug` (Task 4), `extractTrackingParams` (Task 1), `buildTrackedHref` (Task 2), `sendConversionEvent` (Task 3)
- Produces: rota `GET /go/:slug`.

**Regras:**
- Slug inexistente → **307 para `/links`**, nunca 404: a URL pode já estar impressa ou publicada num Stories.
- O evento server-side não bloqueia o redirect.
- O redirect acontece mesmo se o evento falhar.

- [ ] **Step 1: Criar a rota**

```ts
import { NextResponse, type NextRequest } from "next/server";

import { buildTrackedHref } from "@/lib/tracking/build-href";
import { extractTrackingParams } from "@/lib/tracking/params";
import { sendConversionEvent } from "@/lib/meta-conversions";
import { getLinkByShortSlug } from "@/sanity/lib/queries";

function clientIpFrom(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");

  if (!forwarded) {
    return request.headers.get("x-real-ip");
  }

  const parts = forwarded.split(",").map((part) => part.trim());
  return parts[parts.length - 1] || null;
}

function fbcFrom(fbclid: string | undefined, cookieFbc: string | undefined) {
  if (cookieFbc) {
    return cookieFbc;
  }
  if (!fbclid) {
    return undefined;
  }
  return `fb.1.${Date.now()}.${fbclid}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const link = await getLinkByShortSlug(slug);

  if (!link) {
    return NextResponse.redirect(new URL("/links", request.url), 307);
  }

  const trackingParams = extractTrackingParams(request.nextUrl.searchParams);
  const destination = buildTrackedHref(
    link.href,
    trackingParams,
    link.utmContent,
  );

  void sendConversionEvent({
    eventName: link.trackingEvent ?? "ClickLink",
    eventId: crypto.randomUUID(),
    eventSourceUrl: request.url,
    userAgent: request.headers.get("user-agent"),
    clientIp: clientIpFrom(request),
    fbc: fbcFrom(
      trackingParams.fbclid,
      request.cookies.get("_fbc")?.value,
    ),
    fbp: request.cookies.get("_fbp")?.value,
    customData: { link_label: link.label, short_slug: slug },
  });

  return NextResponse.redirect(destination, 307);
}
```

Nota sobre `clientIpFrom`: usa o **último** elemento do `x-forwarded-for`, não o primeiro. O primeiro é fornecido pelo cliente e pode ser forjado; o último é o que o proxy confiável acrescentou. Este é um erro já cometido antes neste projeto em código de rate limit.

Nota sobre `void sendConversionEvent(...)`: sem `await`, o redirect não espera a Meta responder. O `void` sinaliza que a promise é deliberadamente não aguardada.

- [ ] **Step 2: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 3: Verificar o redirect com um slug existente**

Pré-requisito: no Studio, o botão "Agendar demonstração" com `shortSlug: demo`, `utmContent: demo`, `trackingEvent: ClickDemo`, publicado.

Run: `yarn dev`, e então:

```bash
curl -sI "http://localhost:3000/go/demo?utm_source=instagram&utm_medium=bio&fbclid=abc123" | grep -i "^HTTP\|^location"
```

Expected:

```
HTTP/1.1 307 Temporary Redirect
location: https://cognizy.ai/book/comercial-mylar-pro-erp?utm_source=instagram&utm_medium=bio&fbclid=abc123&utm_content=demo
```

A ordem dos parâmetros pode variar. O que importa: `utm_source=instagram` (propagado, não o default `site`), `utm_medium=bio` (propagado), `fbclid` presente, `utm_content=demo` (do Sanity).

- [ ] **Step 4: Verificar o slug inexistente**

Run: `curl -sI "http://localhost:3000/go/nao-existe" | grep -i "^HTTP\|^location"`
Expected: `307` e `location: http://localhost:3000/links`. **Não** 404.

- [ ] **Step 5: Verificar o evento no Events Manager**

Com `NEXT_PUBLIC_META_PIXEL_ID` e `META_CONVERSIONS_API_ACCESS_TOKEN` configurados, abrir Events Manager → Testar eventos, e repetir o `curl` do Step 3.

Expected: aparece um evento `ClickDemo` com `action_source: website`.

Se as env não estiverem configuradas, o `sendConversionEvent` retorna cedo sem erro — o redirect funciona igual. Registrar esta verificação como pendente em vez de declarar concluída.

- [ ] **Step 6: Commit**

```bash
git add src/app/go/\[slug\]/route.ts
git commit -m "feat: add /go/:slug short redirects with server-side event

The click is counted on our own server, so an ad blocker cannot hide it,
and the destination can change in the Studio without reediting links
already published in a bio or Stories.

Unknown slug redirects to /links rather than 404, since the short URL may
already be printed or published. Reads the last x-forwarded-for element,
not the first, which is client-controlled."
```

---

### Task 6: Eventos de clique no cliente e `TrackedLink`

**Files:**
- Create: `src/lib/tracking/events.ts`
- Create: `src/components/tracking/TrackedLink.tsx`
- Modify: `src/components/links/LinkButton.tsx`

**Interfaces:**
- Consumes: `TrackingParams` (Task 1), `buildTrackedHref` (Task 2), `isExternalHref` de `@/lib/links`
- Produces:
  - `trackLinkClick(input: TrackClickInput): void`
  - `type TrackClickInput = { label: string; href: string; eventName: string; utmContent?: string }`
  - `TrackedLink` — usado no `LinkButton` (aqui) e no `Footer` (Task 7)

- [ ] **Step 1: Criar `src/lib/tracking/events.ts`**

```ts
type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  fbq?: (...args: unknown[]) => void;
};

const dataLayerEventNames: Record<string, string> = {
  ClickLink: "link_click",
  ClickDemo: "click_demo",
  ClickTrial: "click_trial",
};

export type TrackClickInput = {
  label: string;
  href: string;
  eventName: string;
  utmContent?: string;
};

export function trackLinkClick(input: TrackClickInput): void {
  if (typeof window === "undefined") {
    return;
  }

  const scope = window as DataLayerWindow;
  const eventId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

  scope.dataLayer = scope.dataLayer ?? [];
  scope.dataLayer.push({
    event: dataLayerEventNames[input.eventName] ?? "link_click",
    link_label: input.label,
    link_url: input.href,
    utm_content: input.utmContent,
    event_id: eventId,
  });

  scope.fbq?.("trackCustom", input.eventName, {
    link_label: input.label,
    link_url: input.href,
  }, { eventID: eventId });
}
```

O `eventID` (com `ID` maiúsculo) é o nome exato que o Pixel espera para deduplicação. O mesmo valor vai ao `dataLayer` para depuração.

**Limitação conhecida, registrada de propósito:** este `event_id` é gerado no cliente e o da rota `/go/*` é gerado no servidor. Eles **não** coincidem, portanto um clique num botão que aponta para `/go/demo` produz dois eventos distintos na Meta — um do Pixel, um da Conversions API — que não deduplicam entre si. Ver "Limitação de deduplicação" no fim deste plano.

- [ ] **Step 2: Criar `src/components/tracking/TrackedLink.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useCallback } from "react";

import { isExternalHref } from "@/lib/links";
import { buildTrackedHref } from "@/lib/tracking/build-href";
import { extractTrackingParams, type TrackingParams } from "@/lib/tracking/params";
import { trackLinkClick } from "@/lib/tracking/events";

type Props = {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
  utmContent?: string;
  trackingEvent?: string;
  entryParams?: TrackingParams;
  ariaLabel?: string;
};

export function TrackedLink({
  href,
  label,
  className,
  children,
  utmContent,
  trackingEvent,
  entryParams,
  ariaLabel,
}: Props) {
  const resolveHref = useCallback(() => {
    const params =
      entryParams ??
      (typeof window === "undefined"
        ? {}
        : extractTrackingParams(new URLSearchParams(window.location.search)));

    return buildTrackedHref(href, params, utmContent);
  }, [entryParams, href, utmContent]);

  const handleClick = useCallback(() => {
    trackLinkClick({
      label,
      href,
      eventName: trackingEvent ?? "ClickLink",
      utmContent,
    });
  }, [href, label, trackingEvent, utmContent]);

  const target = entryParams ? buildTrackedHref(href, entryParams, utmContent) : href;
  const external = isExternalHref(href);

  if (external) {
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
        onClick={(event) => {
          handleClick();
          if (!entryParams) {
            event.currentTarget.href = resolveHref();
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={target}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        handleClick();
        if (!entryParams) {
          event.currentTarget.setAttribute("href", resolveHref());
        }
      }}
    >
      {children}
    </Link>
  );
}
```

Duas vias deliberadas:
- Quando `entryParams` é passado (página `/links`, resolvido no servidor), o `href` já sai correto no HTML — funciona sem JS.
- Quando não é (rodapé, que é Server Component e não pode ler `searchParams`), o href sai limpo e é reescrito no clique a partir de `window.location.search`.

- [ ] **Step 3: `LinkButton` passa a usar o `TrackedLink`**

Substituir `src/components/links/LinkButton.tsx` por:

```tsx
"use client";

import { getIcon } from "@/lib/icons";
import type { LinkItem } from "@/lib/links";
import { AnimateInItem } from "@/components/landing/AnimateIn";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import type { TrackingParams } from "@/lib/tracking/params";

const baseClasses =
  "group flex w-full items-center gap-3 rounded-xl px-5 py-4 text-base font-semibold transition";

const variantClasses = {
  primary:
    "bg-[#2facde] text-white shadow-[0_14px_28px_-12px_rgba(47,172,222,0.4)] hover:-translate-y-0.5 hover:bg-[#2599bb] hover:shadow-[0_20px_36px_-12px_rgba(47,172,222,0.5)]",
  secondary:
    "border border-slate-700 bg-white/5 text-slate-200 backdrop-blur-sm hover:-translate-y-0.5 hover:border-slate-500 hover:bg-white/10",
} as const;

type Props = LinkItem & {
  utmContent?: string;
  trackingEvent?: string;
  entryParams?: TrackingParams;
};

export function LinkButton({
  label,
  href,
  icon,
  variant,
  utmContent,
  trackingEvent,
  entryParams,
}: Props) {
  const Icon = getIcon(icon);
  const ArrowIcon = getIcon("arrowRight");

  return (
    <AnimateInItem>
      <TrackedLink
        href={href}
        label={label}
        className={`${baseClasses} ${variantClasses[variant]}`}
        utmContent={utmContent}
        trackingEvent={trackingEvent}
        entryParams={entryParams}
      >
        <Icon className="size-5 shrink-0" />
        <span className="flex-1 text-left">{label}</span>
        <ArrowIcon className="size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5" />
      </TrackedLink>
    </AnimateInItem>
  );
}
```

As classes Tailwind são as mesmas de antes, caractere por caractere.

- [ ] **Step 4: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
git add src/lib/tracking/events.ts src/components/tracking/TrackedLink.tsx src/components/links/LinkButton.tsx
git commit -m "feat: fire dataLayer and Pixel events on link click

The Pixel event carries an eventID so it can be deduplicated against a
matching server event. Links given entryParams render the resolved href
server-side and work without JS; the rest resolve on click."
```

---

### Task 7: Ligar na página `/links` e no rodapé

**Files:**
- Modify: `src/app/links/page.tsx`
- Modify: `src/components/landing/Footer.tsx`

**Interfaces:**
- Consumes: tudo das Tasks 1, 2, 4, 6
- Produces: nada para tasks posteriores.

- [ ] **Step 1: `/links/page.tsx` lê `searchParams` e repassa**

Estender os imports:

```tsx
import { extractTrackingParams } from "@/lib/tracking/params";
```

Trocar a assinatura da função e o mapeamento dos links:

```tsx
export default async function LinksPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [content, socials, resolvedSearchParams] = await Promise.all([
    getLinksPage(),
    getSocialLinks(),
    searchParams,
  ]);

  const entryParams = extractTrackingParams(resolvedSearchParams);
```

O `tagline` e o `socialRow` ficam como no Plano 1. O mapeamento de `links` passa a preservar os campos de rastreio:

```tsx
  const links = content
    ? content.links
    : linkItems.map((item) => ({
        label: item.label,
        href: item.href,
        icon: item.icon as string,
        variant: item.variant,
        utmContent: undefined,
        trackingEvent: undefined,
        shortSlug: undefined,
      }));
```

E o `map` no JSX passa a repassar os campos:

```tsx
        <AnimateInStagger className="mt-10 flex flex-col gap-3">
          {links.map((item) => (
            <LinkButton
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon as LinkItem["icon"]}
              variant={item.variant}
              utmContent={item.utmContent}
              trackingEvent={item.trackingEvent}
              entryParams={entryParams}
            />
          ))}
        </AnimateInStagger>
```

Nota: ler `searchParams` torna esta rota dinâmica. É aceitável e desejável aqui — é uma página só, e a UTM resolvida no servidor não depende de JS. O `fetch` do Sanity mantém o cache de 600s, então o Sanity não é consultado a cada visita.

- [ ] **Step 2: Rodapé usa `TrackedLink` nos links dos grupos**

Em `src/components/landing/Footer.tsx`, estender os imports:

```tsx
import { TrackedLink } from "@/components/tracking/TrackedLink";
```

Substituir o `<Link>` de dentro do `map` dos grupos — de:

```tsx
                  <li key={`${group.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
```

para:

```tsx
                  <li key={`${group.title}-${link.label}`}>
                    <TrackedLink
                      href={link.href}
                      label={link.label}
                      utmContent={link.utmContent}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </TrackedLink>
                  </li>
```

Se o `import Link from "next/link"` ficar sem uso após a troca, removê-lo — o `yarn lint` acusaria.

Nota: o rodapé **não** passa `entryParams`. Ele é Server Component em 16 páginas; ler `searchParams` tornaria todas dinâmicas. O `TrackedLink` resolve pelo `window.location.search` no clique.

- [ ] **Step 3: Type-check, lint e build**

Run: `npx tsc --noEmit && yarn lint && yarn build`
Expected: os três sem erro.

- [ ] **Step 4: Verificar a propagação de UTM no HTML**

Run: `yarn dev`

```bash
curl -s "http://localhost:3000/links?utm_source=linkedin&utm_medium=organic&fbclid=xyz789" | grep -o 'href="[^"]*cognizy[^"]*"'
```

Expected: o href contém `utm_source=linkedin`, `utm_medium=organic`, `fbclid=xyz789` e `utm_content=demo` (se o botão da demo tiver `utmContent: demo` no Studio).

**Isto é a verificação central deste plano.** Se aparecer `utm_source=site` em vez de `linkedin`, a propagação falhou e o default está sobrescrevendo a entrada — o bug que o design existe para evitar.

- [ ] **Step 5: Verificar o default sem UTM na entrada**

```bash
curl -s "http://localhost:3000/links" | grep -o 'href="[^"]*cognizy[^"]*"'
```

Expected: contém `utm_source=site&utm_medium=links-page`.

- [ ] **Step 6: Verificar o `dataLayer` e o Pixel no navegador**

Abrir `http://localhost:3000/links?utm_source=teste&utm_medium=manual` no navegador, abrir o console e rodar:

```js
window.dataLayer = window.dataLayer || []; window.dataLayer.length
```

Clicar num botão (usar o do meio do clique para não navegar, ou clicar com Cmd/Ctrl para abrir em nova aba) e rodar de novo:

```js
window.dataLayer.filter(e => /click/.test(e.event))
```

Expected: um objeto com `event`, `link_label`, `link_url`, `utm_content` e `event_id`.

Com a extensão **Meta Pixel Helper** ativa, o clique deve mostrar um evento customizado (`ClickDemo`, `ClickTrial` ou `ClickLink`).

- [ ] **Step 7: Verificar o rodapé (resolução no clique)**

Abrir `http://localhost:3000/?utm_source=teste&utm_medium=footer`, rolar até o rodapé, clicar com Cmd/Ctrl num link de grupo e conferir na nova aba que a URL contém `utm_source=teste`.

- [ ] **Step 8: Commit**

```bash
git add src/app/links/page.tsx src/components/landing/Footer.tsx
git commit -m "feat: propagate entry UTM through links page and footer

The /links route resolves params server-side from searchParams, which
makes it dynamic but means the UTM survives without JS. The footer stays
static across 16 pages and resolves on click instead."
```

---

## Verificação final do lote

```bash
npx tsc --noEmit && yarn lint && yarn build
```

| O que | Como | Esperado |
|---|---|---|
| UTM propagada | `curl "/links?utm_source=linkedin&utm_medium=organic"` | hrefs com `linkedin`/`organic`, não `site`/`links-page` |
| Default sem UTM | `curl "/links"` | `utm_source=site&utm_medium=links-page` |
| `utm_content` do Sanity | mesmo curl | `utm_content=demo` no botão da demo |
| `fbclid` propagado | `curl "/links?fbclid=xyz"` | `fbclid=xyz` nos hrefs |
| Redirect existente | `curl -sI "/go/demo?utm_source=x"` | `307` + destino com `utm_source=x` |
| Redirect inexistente | `curl -sI "/go/nada"` | `307` para `/links`, não 404 |
| `dataLayer` | console, após clique | evento com `event_id` |
| Pixel | Meta Pixel Helper | evento customizado com `eventID` |
| Evento server-side | Events Manager → Test Events | `ClickDemo` após `curl` em `/go/demo` |

## Limitação de deduplicação — conhecida e deliberada

O `event_id` do Pixel é gerado no cliente; o da rota `/go/*` é gerado no servidor. **Eles não coincidem.**

Consequência: um clique num link cujo `href` aponta para `/go/demo` gera dois eventos na Meta que não deduplicam entre si.

Como isso é contido neste plano: os botões da página `/links` apontam **direto** para o destino final (não para `/go/*`), portanto disparam só o evento do Pixel. Os `/go/*` existem para uso em **bio e Stories**, onde não há Pixel na origem — ali só o evento server-side ocorre. Nos dois casos há um evento por clique.

O caminho duplo só aparece se alguém cadastrar `href: /go/demo` num botão da própria `/links`. **Não fazer isso.** Se essa necessidade surgir, a correção é o cliente gerar o `event_id` e passá-lo ao `/go/*` como parâmetro de query, para o servidor reusar o mesmo valor — trabalho de uma task, fora deste plano.

## Fora do escopo deste plano

- **Gate de consentimento** nos eventos → **Plano 3**. Até lá, os eventos disparam para todos os visitantes.
- **Google Ads Enhanced Conversions** — exige configuração no painel do Google Ads.
- **Campo "como nos conheceu"** no formulário de demo/registro — pendência de produto.
- Mega-menu do header.
