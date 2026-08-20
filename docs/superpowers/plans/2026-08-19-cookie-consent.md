# Consentimento de Cookies — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar banner de consentimento opt-in com Consent Mode v2 e três categorias, bloqueando GA4, Meta Pixel e o envio server-side da Conversions API até o visitante aceitar.

**Architecture:** O estado default de consentimento é declarado inline no `<head>`, **antes** do GTM carregar — fora dessa ordem o Consent Mode não tem efeito. Um provider client-side aplica `consent update` e `fbq('consent','grant')` quando o visitante aceita, e grava um cookie legível também no servidor, que a rota `/go/*` consulta antes de enviar o evento pela Conversions API.

**Tech Stack:** Next.js 16 (App Router), Google Consent Mode v2, Meta Pixel, TypeScript, Tailwind v4.

**Spec:** `docs/superpowers/specs/2026-08-19-sanity-links-module-design.md` (seção "Consentimento de cookies")

**Depende de:** Plano 2 (`2026-08-19-utm-click-tracking.md`) concluído — este plano adiciona o gate aos eventos criados lá.

## Global Constraints

- **Este é o Plano 3 de 3.**
- **A ordem de carregamento é o requisito central.** O `gtag('consent','default')` roda antes de qualquer script de rastreio. Um banner cuja ordem esteja errada é decorativo.
- **O envio server-side também obedece.** A Conversions API não passa pelo navegador; um gate só no cliente continuaria enviando dados de quem recusou.
- **Recusar não pode quebrar nada.** Navegação, redirects e o chat de atendimento funcionam igual para quem recusa.
- **Recusar é tão fácil quanto aceitar** — os dois botões no mesmo nível visual, sem overlay que obrigue a escolher para ver a página.
- **O chat Cognizy não é bloqueado** — classificado como funcional. Classificação a validar juridicamente.
- **Sem comentários no código.** Imports absolutos `@/*`. Sem `any`. Texto de UI em pt-BR.
- **O projeto não tem runner de testes.** Verificação: `npx tsc --noEmit`, `yarn lint` e as checagens manuais de cada task.
- **Nunca `git push`.**

## Pendência bloqueante para produção

**A política de privacidade não menciona cookies.** Verificado: zero ocorrências de "cookie" em `src/lib/legal/`. O banner linka para a política existente, mas a seção sobre cookies precisa ser redigida — trabalho jurídico, fora deste plano — **antes de o banner ir para produção**. Registrar isso na entrega.

---

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `src/lib/consent/types.ts` | Categorias, versão, formato do valor do cookie |
| `src/lib/consent/cookie.ts` | Serializar, parsear, ler no cliente. Sem dependência de DOM na leitura |
| `src/lib/consent/server.ts` | Ler o cookie no servidor (route handlers) |
| `src/components/consent/ConsentProvider.tsx` | Contexto; aplica `consent update` e `fbq consent` |
| `src/components/consent/CookieBanner.tsx` | Banner + tela de preferências |
| `src/app/api/consent/route.ts` | Grava o cookie com os atributos corretos |
| `src/app/layout.tsx` (mod) | `consent default` antes do GTM; Provider e Banner |
| `src/app/go/[slug]/route.ts` (mod) | Só envia o evento se marketing aceito |
| `src/lib/tracking/events.ts` (mod) | Só dispara `dataLayer`/`fbq` se marketing aceito |

---

### Task 1: Tipos e serialização do consentimento

**Files:**
- Create: `src/lib/consent/types.ts`
- Create: `src/lib/consent/cookie.ts`

**Interfaces:**
- Produces — usados nas Tasks 2, 3, 4, 5, 6:
  - `CONSENT_COOKIE_NAME = "mylar-consent"`
  - `CONSENT_VERSION = 1`
  - `CONSENT_MAX_AGE_SECONDS = 15552000`
  - `type ConsentCategory = "analytics" | "marketing"`
  - `type ConsentValue = { version: number; analytics: boolean; marketing: boolean; timestamp: string }`
  - `serializeConsent(value: ConsentValue): string`
  - `parseConsent(raw: string | undefined): ConsentValue | null`
  - `readConsentFromDocument(): ConsentValue | null`

- [ ] **Step 1: Criar `src/lib/consent/types.ts`**

```ts
export const CONSENT_COOKIE_NAME = "mylar-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_SECONDS = 15552000;

export type ConsentCategory = "analytics" | "marketing";

export type ConsentValue = {
  version: number;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};
```

O `timestamp` e a `version` são o que dá evidência de consentimento, exigível pela LGPD; sem eles não há como demonstrar quando e a quê a pessoa consentiu. A `version` também permite re-solicitar consentimento se as categorias mudarem.

- [ ] **Step 2: Criar `src/lib/consent/cookie.ts`**

```ts
import {
  CONSENT_COOKIE_NAME,
  CONSENT_VERSION,
  type ConsentValue,
} from "@/lib/consent/types";

export function serializeConsent(value: ConsentValue): string {
  return `v${value.version}.${value.analytics ? 1 : 0}${
    value.marketing ? 1 : 0
  }.${value.timestamp}`;
}

export function parseConsent(raw: string | undefined): ConsentValue | null {
  if (!raw) {
    return null;
  }

  const match = /^v(\d+)\.([01])([01])\.(.+)$/.exec(raw.trim());

  if (!match) {
    return null;
  }

  const version = Number(match[1]);

  if (version !== CONSENT_VERSION) {
    return null;
  }

  return {
    version,
    analytics: match[2] === "1",
    marketing: match[3] === "1",
    timestamp: match[4],
  };
}

export function readConsentFromDocument(): ConsentValue | null {
  if (typeof document === "undefined") {
    return null;
  }

  const entry = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!entry) {
    return null;
  }

  return parseConsent(decodeURIComponent(entry.slice(CONSENT_COOKIE_NAME.length + 1)));
}
```

Formato compacto (`v1.11.2026-08-19T...`) em vez de JSON: evita problemas de escape de cookie e mantém o valor legível a olho na aba de aplicação do navegador.

Uma versão diferente da atual devolve `null` — o visitante volta a ver o banner, que é o comportamento correto quando as categorias mudam.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/lib/consent/types.ts src/lib/consent/cookie.ts
git commit -m "feat: add consent cookie types and serialization

Stores version and timestamp, which is what makes consent demonstrable
under LGPD. A version mismatch parses as null so the banner reappears
when the categories change."
```

---

### Task 2: Leitura do consentimento no servidor

**Files:**
- Create: `src/lib/consent/server.ts`

**Interfaces:**
- Consumes: `parseConsent`, `CONSENT_COOKIE_NAME` (Task 1)
- Produces — usado na Task 6:
  - `readConsentFromRequest(request: { cookies: { get(name: string): { value: string } | undefined } }): ConsentValue | null`
  - `hasMarketingConsent(request: ...): boolean`

**Por que um arquivo separado:** o `cookie.ts` da Task 1 é importado pelo cliente. Manter a leitura de request fora dele evita arrastar tipos de servidor para o bundle do navegador.

- [ ] **Step 1: Criar o arquivo**

```ts
import { parseConsent } from "@/lib/consent/cookie";
import { CONSENT_COOKIE_NAME, type ConsentValue } from "@/lib/consent/types";

type CookieReader = {
  cookies: { get(name: string): { value: string } | undefined };
};

export function readConsentFromRequest(
  request: CookieReader,
): ConsentValue | null {
  return parseConsent(request.cookies.get(CONSENT_COOKIE_NAME)?.value);
}

export function hasMarketingConsent(request: CookieReader): boolean {
  return readConsentFromRequest(request)?.marketing === true;
}
```

O tipo estrutural `CookieReader` evita depender do `NextRequest` concreto, o que mantém o arquivo testável e desacoplado.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/lib/consent/server.ts
git commit -m "feat: add server-side consent reader"
```

---

### Task 3: Rota que grava o cookie

**Files:**
- Create: `src/app/api/consent/route.ts`

**Interfaces:**
- Consumes: `serializeConsent`, tipos e constantes (Task 1)
- Produces: `POST /api/consent` recebendo `{ analytics: boolean; marketing: boolean }`.

**Por que uma rota, e não só `document.cookie`:** garante `Max-Age`, `SameSite`, `Path` e `Secure` consistentes, e o cookie precisa ser legível no servidor pela rota `/go/*`.

- [ ] **Step 1: Criar a rota**

```ts
import { NextResponse, type NextRequest } from "next/server";

import { serializeConsent } from "@/lib/consent/cookie";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_SECONDS,
  CONSENT_VERSION,
} from "@/lib/consent/types";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Corpo da requisição inválido." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { message: "Corpo da requisição inválido." },
      { status: 400 },
    );
  }

  const { analytics, marketing } = body as {
    analytics?: unknown;
    marketing?: unknown;
  };

  if (typeof analytics !== "boolean" || typeof marketing !== "boolean") {
    return NextResponse.json(
      { message: "Informe analytics e marketing como booleanos." },
      { status: 400 },
    );
  }

  const value = serializeConsent({
    version: CONSENT_VERSION,
    analytics,
    marketing,
    timestamp: new Date().toISOString(),
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: CONSENT_COOKIE_NAME,
    value,
    maxAge: CONSENT_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
```

`httpOnly: false` é deliberado: o cliente precisa ler o cookie para decidir se dispara os eventos. O cookie não contém dado pessoal — só as duas escolhas e um timestamp.

- [ ] **Step 2: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 3: Verificar a rota**

Run: `yarn dev`, e então:

```bash
curl -s -i -X POST http://localhost:3000/api/consent -H "Content-Type: application/json" -d '{"analytics":true,"marketing":false}' | grep -i "^HTTP\|set-cookie"
```

Expected: `200` e um `set-cookie: mylar-consent=v1.10.2026-...; Path=/; Max-Age=15552000; SameSite=Lax`.

Verificar a rejeição:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/consent -H "Content-Type: application/json" -d '{"analytics":"sim"}'
```

Expected: `400`.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/consent/route.ts
git commit -m "feat: add consent cookie write endpoint

Writing through a route keeps Max-Age, SameSite and Secure consistent,
and the cookie must be server-readable by the /go/ route."
```

---

### Task 4: Provider de consentimento

**Files:**
- Create: `src/components/consent/ConsentProvider.tsx`

**Interfaces:**
- Consumes: `readConsentFromDocument`, tipos (Task 1); `POST /api/consent` (Task 3)
- Produces — usados nas Tasks 5 e 7:
  - `ConsentProvider` — componente de contexto
  - `useConsent(): { consent: ConsentValue | null; decided: boolean; save: (analytics: boolean, marketing: boolean) => Promise<void> }`
  - `hasMarketingConsentInBrowser(): boolean` — função pura, para o `events.ts` consultar sem hook

- [ ] **Step 1: Criar o arquivo**

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { readConsentFromDocument } from "@/lib/consent/cookie";
import type { ConsentValue } from "@/lib/consent/types";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  dataLayer?: Array<unknown>;
};

type ConsentContextValue = {
  consent: ConsentValue | null;
  decided: boolean;
  save: (analytics: boolean, marketing: boolean) => Promise<void>;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function applyToTools(analytics: boolean, marketing: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  const scope = window as GtagWindow;

  scope.dataLayer = scope.dataLayer ?? [];

  function gtag(...args: unknown[]) {
    scope.dataLayer?.push(args);
  }

  gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });

  scope.fbq?.("consent", marketing ? "grant" : "revoke");
}

export function hasMarketingConsentInBrowser(): boolean {
  return readConsentFromDocument()?.marketing === true;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [decided, setDecided] = useState(true);

  useEffect(() => {
    const stored = readConsentFromDocument();
    setConsent(stored);
    setDecided(stored !== null);

    if (stored) {
      applyToTools(stored.analytics, stored.marketing);
    }
  }, []);

  const save = useCallback(async (analytics: boolean, marketing: boolean) => {
    applyToTools(analytics, marketing);

    try {
      await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analytics, marketing }),
      });
    } catch (error) {
      console.error("[Consent] Falha ao registrar a escolha:", error);
    }

    setConsent(readConsentFromDocument());
    setDecided(true);
  }, []);

  const value = useMemo(
    () => ({ consent, decided, save }),
    [consent, decided, save],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent must be used inside ConsentProvider.");
  }

  return context;
}
```

Nota sobre `decided` iniciar em `true`: evita que o banner apareça no primeiro paint e desapareça em seguida para quem já decidiu. O `useEffect` corrige para `false` quando não há cookie, e só então o banner surge.

Nota sobre `applyToTools` empurrar no `dataLayer` em vez de chamar `window.gtag`: o `gtag` do site é definido dentro de um `<Script>` com escopo próprio; empurrar o array de argumentos no `dataLayer` é a forma documentada e funciona sem depender daquele escopo.

- [ ] **Step 2: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/consent/ConsentProvider.tsx
git commit -m "feat: add consent provider applying Consent Mode updates"
```

---

### Task 5: Banner e tela de preferências

**Files:**
- Create: `src/components/consent/CookieBanner.tsx`

**Interfaces:**
- Consumes: `useConsent` (Task 4)
- Produces: `CookieBanner` — montado no layout (Task 7).

**Identidade visual:** `bg-slate-950`, borda `border-slate-800`, primária `#2facde` — as mesmas do rodapé e da `/links`. Fixo na base, **sem overlay modal**: recusar deve ser tão fácil quanto aceitar.

- [ ] **Step 1: Criar o componente**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";

import { useConsent } from "@/components/consent/ConsentProvider";

const primaryButton =
  "rounded-xl bg-[#2facde] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2599bb]";
const secondaryButton =
  "rounded-xl border border-slate-700 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-white/10";
const linkButton =
  "text-sm font-medium text-slate-400 underline underline-offset-4 transition hover:text-white";

export function CookieBanner() {
  const { decided, save } = useConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saving, setSaving] = useState(false);

  if (decided) {
    return null;
  }

  async function handleSave(nextAnalytics: boolean, nextMarketing: boolean) {
    setSaving(true);
    await save(nextAnalytics, nextMarketing);
    setSaving(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      className="fixed inset-x-0 bottom-0 z-[9998] border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {showPreferences ? (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Preferências de cookies
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Escolha o que podemos usar. Os cookies necessários mantêm o site
                funcionando e não podem ser desativados.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked
                  disabled
                  aria-label="Cookies necessários, sempre ativos"
                  className="mt-0.5 size-4 accent-[#2facde]"
                />
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Necessários
                  </p>
                  <p className="text-xs text-slate-500">
                    Sempre ativos. Guardam apenas a sua escolha aqui.
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-0.5 size-4 accent-[#2facde]"
                />
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Analíticos
                  </p>
                  <p className="text-xs text-slate-500">
                    Ajudam a entender quais páginas são mais úteis.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                  className="mt-0.5 size-4 accent-[#2facde]"
                />
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Marketing
                  </p>
                  <p className="text-xs text-slate-500">
                    Permitem medir a eficácia dos nossos anúncios.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave(analytics, marketing)}
                className={primaryButton}
              >
                Salvar preferências
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => setShowPreferences(false)}
                className={linkButton}
              >
                Voltar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs leading-relaxed text-slate-400">
              Usamos cookies para entender como o site é usado e medir nossos
              anúncios. Você escolhe o que permitir.{" "}
              <Link
                href="/brokers/privacy-policy"
                className="underline underline-offset-4 transition hover:text-white"
              >
                Política de privacidade
              </Link>
              .
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave(true, true)}
                className={primaryButton}
              >
                Aceitar tudo
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave(false, false)}
                className={secondaryButton}
              >
                Recusar
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => setShowPreferences(true)}
                className={linkButton}
              >
                Preferências
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

"Aceitar tudo" e "Recusar" têm o mesmo peso visual e estão lado a lado — requisito de conformidade, não estética.

O `z-[9998]` fica logo abaixo do `z-index: 9999` do iframe do CognizyWidget, para o banner não cobrir o botão de atendimento.

- [ ] **Step 2: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/consent/CookieBanner.tsx
git commit -m "feat: add cookie consent banner with category preferences

Accept and decline carry equal visual weight and there is no blocking
overlay, which is a compliance requirement rather than a style choice."
```

---

### Task 6: Gate nos eventos, cliente e servidor

**Files:**
- Modify: `src/lib/tracking/events.ts`
- Modify: `src/app/go/[slug]/route.ts`

**Interfaces:**
- Consumes: `hasMarketingConsentInBrowser` (Task 4), `hasMarketingConsent` (Task 2)
- Produces: nada novo. Altera o comportamento do que o Plano 2 criou.

**Este é o coração do plano.** Sem o gate no servidor, o banner é decorativo.

- [ ] **Step 1: Gate no cliente**

Em `src/lib/tracking/events.ts`, adicionar o import:

```ts
import { hasMarketingConsentInBrowser } from "@/components/consent/ConsentProvider";
```

E, no início de `trackLinkClick`, após a checagem de `window`:

```ts
export function trackLinkClick(input: TrackClickInput): void {
  if (typeof window === "undefined") {
    return;
  }

  if (!hasMarketingConsentInBrowser()) {
    return;
  }

  const scope = window as DataLayerWindow;
```

O resto da função fica inalterado.

- [ ] **Step 2: Gate no servidor**

Em `src/app/go/[slug]/route.ts`, adicionar o import:

```ts
import { hasMarketingConsent } from "@/lib/consent/server";
```

E envolver o envio do evento — trocar:

```ts
  void sendConversionEvent({
```

por:

```ts
  if (hasMarketingConsent(request)) {
    void sendConversionEvent({
```

fechando o bloco após o `});` do `sendConversionEvent`:

```ts
      customData: { link_label: link.label, short_slug: slug },
    });
  }

  return NextResponse.redirect(destination, 307);
```

O redirect permanece **fora** do `if` — recusar rastreio não pode quebrar a navegação.

- [ ] **Step 3: Type-check e lint**

Run: `npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 4: Verificar que recusar bloqueia o servidor**

Run: `yarn dev`

Com cookie de recusa (`v1.00`):

```bash
curl -sI "http://localhost:3000/go/demo" -H "Cookie: mylar-consent=v1.00.2026-08-19T00:00:00.000Z" | grep -i "^HTTP\|^location"
```

Expected: `307` e o `location` do destino — o redirect funciona. No Events Manager → Testar eventos, **nenhum** evento novo deve aparecer.

Com cookie de aceite (`v1.11`):

```bash
curl -sI "http://localhost:3000/go/demo" -H "Cookie: mylar-consent=v1.11.2026-08-19T00:00:00.000Z" | grep -i "^HTTP"
```

Expected: `307`, e **agora** o evento aparece no Events Manager.

Sem cookie algum: comporta-se como recusa (nenhum evento), porque o opt-in é o default.

**Esta é a verificação que não pode ser pulada.** É o teste que distingue um banner real de um decorativo.

- [ ] **Step 5: Commit**

```bash
git add src/lib/tracking/events.ts src/app/go/\[slug\]/route.ts
git commit -m "feat: gate click events behind marketing consent

The server-side gate is the one that matters: the Conversions API never
passes through the browser, so a client-only banner would keep sending
events for visitors who declined. The redirect stays outside the gate,
since declining tracking must not break navigation."
```

---

### Task 7: Consent default antes do GTM, no layout

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `ConsentProvider` (Task 4), `CookieBanner` (Task 5)
- Produces: nada.

**O requisito central deste plano.** O `consent default` precisa executar antes de o GTM carregar; fora de ordem, o Consent Mode não tem efeito nenhum.

- [ ] **Step 1: Adicionar os imports**

```tsx
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
```

- [ ] **Step 2: Inserir o `consent default` como primeiro script**

No `<body>`, **antes** do bloco `{GTM_ID && (`, inserir:

```tsx
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  analytics_storage:'denied',
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  wait_for_update: 500
});`}
        </Script>
```

O `strategy="beforeInteractive"` faz o Next injetar o script antes da hidratação e antes dos `afterInteractive` do GTM, GA4 e Pixel. O `wait_for_update: 500` dá 500 ms para o `update` chegar antes de as tags decidirem.

- [ ] **Step 3: Revogar o consentimento do Pixel após o `init`**

No bloco do Meta Pixel, na string do `dangerouslySetInnerHTML`, inserir a revogação **entre** o `init` e o `track`:

```
                  fbq('init', '${META_PIXEL_ID}');
                  fbq('consent', 'revoke');
                  fbq('track', 'PageView');
```

Com `consent revoke` antes do `PageView`, o Pixel enfileira o evento em vez de enviá-lo, e o despacha quando o `grant` chega — o que o `ConsentProvider` faz ao aceitar.

- [ ] **Step 4: Envolver o conteúdo com o Provider e montar o banner**

Trocar:

```tsx
        {children}

        <CognizyWidget />
```

por:

```tsx
        <ConsentProvider>
          {children}
          <CookieBanner />
        </ConsentProvider>

        <CognizyWidget />
```

O `CognizyWidget` fica **fora** do Provider, deliberadamente: é chat de atendimento, classificado como funcional, e não é bloqueado pelo consentimento.

- [ ] **Step 5: Type-check, lint e build**

Run: `npx tsc --noEmit && yarn lint && yarn build`
Expected: os três sem erro.

- [ ] **Step 6: Verificar a ordem de carregamento**

Run: `yarn dev`

Abrir `http://localhost:3000` numa janela anônima e, no console, **antes de clicar em nada**:

```js
window.dataLayer.map((e, i) => `${i}: ${e[0] ?? e.event ?? JSON.stringify(e).slice(0,40)}`)
```

Expected: o primeiro item relacionado a consentimento (`"consent"`) aparece **antes** do `gtm.js`. Se o `gtm.js` vier primeiro, o `beforeInteractive` não surtiu efeito e o Consent Mode está inerte — investigar antes de prosseguir.

- [ ] **Step 7: Verificar o fluxo do banner**

Em janela anônima, em `http://localhost:3000`:

1. O banner aparece na base, sem cobrir o botão do chat.
2. Clicar em "Preferências" → aparecem os três blocos; "Necessários" desabilitado e marcado.
3. Marcar só "Analíticos", salvar → o banner desaparece.
4. No console: `document.cookie.match(/mylar-consent=[^;]*/)` → `v1.10.<timestamp>`.
5. Recarregar → o banner **não** volta.
6. No console, verificar o `update`:
   ```js
   window.dataLayer.filter(e => e[0] === 'consent')
   ```
   Expected: dois itens — o `default` (tudo `denied`) e o `update` com `analytics_storage: 'granted'` e `ad_storage: 'denied'`.

- [ ] **Step 8: Verificar que recusar bloqueia o Pixel**

Limpar cookies, recarregar, clicar em "Recusar". Com o **Meta Pixel Helper** ativo, clicar num link da `/links`.

Expected: nenhum evento no Pixel Helper. Aceitando e repetindo, o evento aparece.

- [ ] **Step 9: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: declare consent default before GTM loads

Consent Mode has no effect unless the default state is declared before
GTM, which is the most common way this implementation fails. The Pixel
gets consent revoke right after init so PageView queues instead of
firing.

The Cognizy chat stays outside the provider: it is support tooling the
visitor invokes, not advertising, so declining marketing must not remove
it."
```

---

## Verificação final do lote

```bash
npx tsc --noEmit && yarn lint && yarn build
```

| O que | Como | Esperado |
|---|---|---|
| `consent default` antes do GTM | console, primeira carga | `consent` antes de `gtm.js` no `dataLayer` |
| Banner aparece | janela anônima | banner na base, chat visível |
| Preferências granulares | marcar só analíticos | cookie `v1.10` |
| Escolha persiste | recarregar | banner não volta |
| `consent update` aplicado | `dataLayer.filter(e => e[0]==='consent')` | default + update |
| Recusar bloqueia o Pixel | Pixel Helper após recusar | nenhum evento |
| **Recusar bloqueia o servidor** | `curl /go/demo` com cookie `v1.00` | `307` normal, **nenhum** evento no Events Manager |
| Recusar não quebra navegação | navegar pelo site após recusar | tudo funciona, chat inclusive |

## Pendências para produção

1. **Seção de cookies na política de privacidade** — não existe hoje. Trabalho jurídico. **Bloqueia o deploy do banner.**
2. **Validar a classificação do chat Cognizy** como funcional em vez de marketing.
3. **Reabrir preferências depois de decidir** — hoje, quem já decidiu não tem como mudar de ideia pela interface (só limpando cookies). O caminho usual é um link "Preferências de cookies" no rodapé. Não implementado neste plano; vale como próxima task pequena.

## Fora do escopo

- **Google Ads Enhanced Conversions.**
- **Consent Mode no catálogo** (`mylar-pro-catalog`) e nos outros projetos do monorepo — este plano cobre apenas o `mylar-pro-site`.
- Bloqueio de scripts de terceiros que ainda não existem no site.
