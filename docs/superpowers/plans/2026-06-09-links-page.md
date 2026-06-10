# Página de Links (Link-in-bio) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma página de links estilo Linktree em `mylarpro.com.br/links`, standalone, reusando a identidade visual do `mylar-pro-site`.

**Architecture:** Rota estática do App Router (`src/app/links/page.tsx`) que lê uma config hardcoded e tipada (`src/lib/links.ts`) e renderiza botões reutilizáveis (`LinkButton`) e ícones sociais (`SocialRow`). Sem header/footer do site, sem backend.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion (`AnimateInStagger`/`AnimateInItem` já existentes), ícones via `@/lib/icons` (react-icons).

**Observação sobre testes:** O `mylar-pro-site` não possui setup de testes (sem Jest/Vitest no `package.json`). A verificação de cada tarefa é feita via `npx tsc --noEmit`, `yarn lint` e inspeção visual com `yarn dev`. Os passos abaixo seguem essa realidade do projeto em vez de TDD com test runner.

---

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `src/lib/icons.ts` (modificar) | Adicionar ícones `linkedin` e `facebook` (react-icons/si). |
| `src/lib/links.ts` (criar) | Fonte única dos dados: perfil (tagline), lista de botões, lista de sociais. Tipado. |
| `src/components/links/LinkButton.tsx` (criar) | Botão reutilizável com variantes `primary`/`secondary`, ícone à esquerda. Client component (animação por item). |
| `src/components/links/SocialRow.tsx` (criar) | Linha de ícones sociais circulares. |
| `src/app/links/page.tsx` (criar) | Rota `/links`: metadata, layout centralizado, fundo/glow, cabeçalho, map dos botões e sociais. |

---

## Dados confirmados (usar exatamente estes valores)

- Agendar demonstração: `https://cognizy.ai/book/comercial-mylar-pro-erp`
- Criar conta grátis: `https://app.mylarpro.com.br/register`
- Acessar plataforma: `https://app.mylarpro.com.br`
- App corretor (App Store): `https://apps.apple.com/us/app/mylar-pro-brokers/id6762925131`
- App corretor (Google Play): `https://play.google.com/store/apps/details?id=com.mylarprobrokers.app`
- Funcionalidades (interno): `/features`
- Para quem é (interno): `/personas`
- WhatsApp: `https://wa.me/5561981896419`
- E-mail: `mailto:contato@mylarapp.com`
- Telefone: `tel:+5561981896419`
- Instagram: `https://www.instagram.com/mylar.app/`
- LinkedIn: `https://www.linkedin.com/company/mylar-pro`
- Facebook: `https://www.facebook.com/mylarapp`

---

### Task 1: Adicionar ícones LinkedIn e Facebook ao sistema de ícones

**Files:**
- Modify: `src/lib/icons.ts`

- [ ] **Step 1: Adicionar imports do react-icons/si**

No bloco `import { ... } from "react-icons/si";` (atualmente linhas 69-75), incluir `SiLinkedin` e `SiFacebook` em ordem alfabética. O bloco deve ficar:

```ts
import {
  SiApple,
  SiFacebook,
  SiGoogleplay,
  SiInstagram,
  SiLinkedin,
  SiMeta,
  SiWhatsapp,
} from "react-icons/si";
```

- [ ] **Step 2: Mapear os novos nomes semânticos**

No objeto `Icons`, na seção `// Marca (logos)` (atualmente termina em `instagram: SiInstagram,`), adicionar as duas entradas:

```ts
  // Marca (logos)
  apple: SiApple,
  googlePlay: SiGoogleplay,
  whatsapp: SiWhatsapp,
  meta: SiMeta,
  instagram: SiInstagram,
  linkedin: SiLinkedin,
  facebook: SiFacebook,
} as const;
```

- [ ] **Step 3: Verificar tipos**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: sem erros (o tipo `IconName` agora inclui `"linkedin"` e `"facebook"`).

- [ ] **Step 4: Commit**

```bash
cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site
git add src/lib/icons.ts
git commit -m "feat(icons): add linkedin and facebook brand icons"
```

---

### Task 2: Criar a config de links (`links.ts`)

**Files:**
- Create: `src/lib/links.ts`

- [ ] **Step 1: Escrever o arquivo de config completo**

```ts
import type { IconName } from "@/lib/icons";

type LinkVariant = "primary" | "secondary";

export type LinkItem = {
  label: string;
  href: string;
  icon: IconName;
  variant: LinkVariant;
};

export type SocialItem = {
  label: string;
  href: string;
  icon: IconName;
};

export const profile = {
  tagline: "Gestão imobiliária completa, num só lugar.",
};

export const linkItems: LinkItem[] = [
  {
    label: "Agendar demonstração",
    href: "https://cognizy.ai/book/comercial-mylar-pro-erp",
    icon: "calendar",
    variant: "primary",
  },
  {
    label: "Criar conta grátis",
    href: "https://app.mylarpro.com.br/register",
    icon: "rocket",
    variant: "secondary",
  },
  {
    label: "Acessar plataforma",
    href: "https://app.mylarpro.com.br",
    icon: "dashboard",
    variant: "secondary",
  },
  {
    label: "App do corretor (iPhone)",
    href: "https://apps.apple.com/us/app/mylar-pro-brokers/id6762925131",
    icon: "apple",
    variant: "secondary",
  },
  {
    label: "App do corretor (Android)",
    href: "https://play.google.com/store/apps/details?id=com.mylarprobrokers.app",
    icon: "googlePlay",
    variant: "secondary",
  },
  {
    label: "Funcionalidades",
    href: "/features",
    icon: "sparkles",
    variant: "secondary",
  },
  {
    label: "Para quem é",
    href: "/personas",
    icon: "users",
    variant: "secondary",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5561981896419",
    icon: "whatsapp",
    variant: "secondary",
  },
  {
    label: "E-mail",
    href: "mailto:contato@mylarapp.com",
    icon: "mail",
    variant: "secondary",
  },
  {
    label: "Telefone",
    href: "tel:+5561981896419",
    icon: "phone",
    variant: "secondary",
  },
];

export const socialItems: SocialItem[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mylar.app/",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mylar-pro",
    icon: "linkedin",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mylarapp",
    icon: "facebook",
  },
];

export const isExternalHref = (href: string): boolean =>
  href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
```

- [ ] **Step 2: Verificar tipos**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: sem erros (todos os `icon` são `IconName` válidos, incluindo os adicionados na Task 1).

- [ ] **Step 3: Commit**

```bash
cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site
git add src/lib/links.ts
git commit -m "feat(links): add link-in-bio config data"
```

---

### Task 3: Criar o componente `LinkButton`

**Files:**
- Create: `src/components/links/LinkButton.tsx`

- [ ] **Step 1: Escrever o componente**

Usa `AnimateInItem` (já existe em `@/components/landing/AnimateIn`) para a animação em cascata, `Icons` para o ícone, e `isExternalHref` para decidir `target`/`rel` e `next/link` vs `<a>`.

```tsx
"use client";

import Link from "next/link";
import { Icons } from "@/lib/icons";
import { isExternalHref, type LinkItem } from "@/lib/links";
import { AnimateInItem } from "@/components/landing/AnimateIn";

const baseClasses =
  "group flex w-full items-center gap-3 rounded-xl px-5 py-4 text-base font-semibold transition";

const variantClasses = {
  primary:
    "bg-[#2facde] text-white shadow-[0_14px_28px_-12px_rgba(47,172,222,0.4)] hover:-translate-y-0.5 hover:bg-[#2599bb] hover:shadow-[0_20px_36px_-12px_rgba(47,172,222,0.5)]",
  secondary:
    "border border-slate-700 bg-white/5 text-slate-200 backdrop-blur-sm hover:-translate-y-0.5 hover:border-slate-500 hover:bg-white/10",
} as const;

export function LinkButton({ label, href, icon, variant }: LinkItem) {
  const Icon = Icons[icon];
  const external = isExternalHref(href);
  const className = `${baseClasses} ${variantClasses[variant]}`;

  const content = (
    <>
      <Icon className="size-5 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      <Icons.arrowRight className="size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5" />
    </>
  );

  return (
    <AnimateInItem>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={className}>
          {content}
        </Link>
      )}
    </AnimateInItem>
  );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site
git add src/components/links/LinkButton.tsx
git commit -m "feat(links): add LinkButton component"
```

---

### Task 4: Criar o componente `SocialRow`

**Files:**
- Create: `src/components/links/SocialRow.tsx`

- [ ] **Step 1: Escrever o componente**

```tsx
import { Icons } from "@/lib/icons";
import { socialItems } from "@/lib/links";

export function SocialRow() {
  return (
    <div className="flex items-center justify-center gap-4">
      {socialItems.map((social) => {
        const Icon = Icons[social.icon];
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

- [ ] **Step 2: Verificar tipos**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site
git add src/components/links/SocialRow.tsx
git commit -m "feat(links): add SocialRow component"
```

---

### Task 5: Criar a página `/links`

**Files:**
- Create: `src/app/links/page.tsx`

- [ ] **Step 1: Escrever a página**

Server component. Metadata própria (indexável). Fundo `slate-950` + mesh/glow `#2facde` (padrão do `Hero.tsx`). Logo branca + tagline. Botões via `AnimateInStagger` (cascata). `SocialRow` e rodapé curto. Usa `next/image` para a logo (como o `Footer.tsx`).

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { linkItems, profile } from "@/lib/links";
import { LinkButton } from "@/components/links/LinkButton";
import { SocialRow } from "@/components/links/SocialRow";
import { AnimateIn, AnimateInStagger } from "@/components/landing/AnimateIn";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Todos os links do Mylar Pro num só lugar: agende uma demonstração, crie sua conta, baixe o app do corretor e fale com a gente.",
  openGraph: {
    title: "Links | Mylar Pro",
    description:
      "Todos os links do Mylar Pro num só lugar: demonstração, conta grátis, app do corretor e contato.",
  },
};

export default function LinksPage() {
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
            {profile.tagline}
          </p>
        </AnimateIn>

        <AnimateInStagger className="mt-10 flex flex-col gap-3">
          {linkItems.map((item) => (
            <LinkButton key={item.label} {...item} />
          ))}
        </AnimateInStagger>

        <div className="mt-10">
          <SocialRow />
        </div>

        <p className="mt-10 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Mylar Pro. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && npx tsc --noEmit && yarn lint`
Expected: sem erros.

- [ ] **Step 3: Verificação visual no dev server**

Run: `cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site && yarn dev`
Abrir `http://localhost:3000/links`. Confirmar:
- Logo branca + tagline aparecem centralizadas.
- Botão "Agendar demonstração" em azul `#2facde`, demais com borda/glassmorphism.
- Botões aparecem em cascata (animação).
- Ícones sociais (Instagram, LinkedIn, Facebook) na linha inferior.
- Cada link abre o destino correto (externos em nova aba; `/features` e `/personas` internos).
- Sem header/footer do site.

Parar o servidor após verificar (Ctrl+C).

- [ ] **Step 4: Commit**

```bash
cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site
git add src/app/links/page.tsx
git commit -m "feat(links): add standalone /links link-in-bio page"
```

---

## Self-Review

**Spec coverage:**
- Rota `/links` standalone → Task 5 ✅
- Config hardcoded `links.ts` → Task 2 ✅
- Identidade visual (slate-950, glow #2facde, Jakarta, AnimateIn) → Tasks 3 e 5 ✅
- Botão destaque agendamento → Task 2 (primary) + Task 3 ✅
- App/Login (register, plataforma, app iOS+Android) → Task 2 ✅
- Site (features, personas) → Task 2 ✅
- Contato (WhatsApp, e-mail, telefone) → Task 2 ✅
- Sociais (Instagram, LinkedIn, Facebook) → Tasks 1, 2, 4 ✅
- Ícones LinkedIn/Facebook adicionados → Task 1 ✅
- Metadata/SEO indexável → Task 5 ✅
- Sem alterar Header/Footer global → respeitado (nenhuma task os toca) ✅

**Placeholder scan:** Todos os dados são valores reais confirmados; nenhum TODO restante no código.

**Type consistency:** `LinkItem`/`SocialItem`/`isExternalHref` definidos na Task 2 e consumidos nas Tasks 3, 4, 5 com os mesmos nomes. `IconName` estendido na Task 1 cobre `linkedin`/`facebook` usados na Task 2. `AnimateIn`/`AnimateInStagger`/`AnimateInItem` existem em `AnimateIn.tsx`.
