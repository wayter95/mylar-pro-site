# Página de Links (Link-in-bio / "Linktree" do Mylar Pro)

**Data:** 2026-06-09
**Projeto:** `mylar-pro-site` (Next.js 16, App Router, Tailwind v4, Framer Motion)

## Objetivo

Criar uma página de links no estilo Linktree para o Mylar Pro, hospedada no
próprio `mylar-pro-site` (não um projeto novo), acessível em `mylarpro.com.br/links`.
Página standalone (sem o header/footer de navegação do site), focada em concentrar
os principais destinos da marca num único lugar para uso em bio de redes sociais.

## Decisão de arquitetura

Implementar como uma rota dentro do `mylar-pro-site`, e **não** como projeto separado:

- Zero setup novo — reusa stack, build e deploy existentes.
- URL no domínio principal (`mylarpro.com.br/links`) reforça a marca.
- Manutenção centralizada, mesmos componentes e identidade visual.
- Uma página de links é uma rota estática com lista de botões; projeto novo seria overkill (YAGNI).

Links gerenciados **hardcoded** em arquivo de config (`src/lib/links.ts`). Para alterar
um link, edita o arquivo e faz deploy. Sem CMS/backend (não justificado para página de marca).

## Arquivos

| Arquivo | Papel |
|---|---|
| `src/app/links/page.tsx` | Rota `/links` — server component, layout centralizado, faz o map da config. Metadata própria. |
| `src/lib/links.ts` | Fonte única dos links (config tipada: label, href, ícone, variante, externo). |
| `src/components/links/LinkButton.tsx` | Botão reutilizável, variantes `primary` / `secondary`, ícone à esquerda. |
| `src/components/links/SocialRow.tsx` | Linha de ícones sociais circulares. |
| `src/lib/icons.ts` | (editar) Adicionar ícones `linkedin` e `facebook` via `react-icons/si`, seguindo o padrão existente. |

## Identidade visual (reuso do existente)

Extraído de `Hero.tsx` e `Footer.tsx`:

- **Cor primária:** `#2facde` (hover `#2599bb`).
- **Fundo:** `bg-slate-950` + mesh gradient (`bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`) + glows `bg-[#2facde]/8 blur-[120px]`.
- **Botão primário:** `bg-[#2facde]` + `shadow-[0_14px_28px_-12px_rgba(47,172,222,0.4)]` + hover `-translate-y-0.5`.
- **Botão secundário:** `border-slate-600 bg-white/5 backdrop-blur-sm` + hover `border-slate-500 bg-white/10`.
- **Fonte:** `Plus_Jakarta_Sans` (global via layout).
- **Logo:** `/images/logo-white.svg`.
- **Animação:** componente `AnimateIn` existente (entrada em cascata).

## Layout (de cima pra baixo)

Container `max-w-md mx-auto`, centralizado verticalmente, padding responsivo.

1. **Cabeçalho:** logo branca centralizada + tagline curta ("Gestão imobiliária completa, num só lugar").
2. **Botão destaque (primary):** Agendar demonstração → `https://cognizy.ai/book/comercial-mylar-pro-erp`.
3. **Botões secundários (na ordem):**
   - Criar conta grátis → `https://app.mylarpro.com.br/register`
   - Acessar plataforma → `https://app.mylarpro.com.br`
   - App do corretor → (loja de apps — TODO confirmar URL Google Play / App Store)
   - Funcionalidades → `/features` (interno)
   - Para quem é → `/personas` (interno)
   - WhatsApp → `https://wa.me/<TODO_NUMERO>`
   - E-mail → `mailto:contato@mylarapp.com`
   - Telefone → `tel:<TODO_TELEFONE>`
4. **Sociais (linha de ícones circulares):**
   - Instagram → `https://www.instagram.com/mylar.app/`
   - LinkedIn → `https://www.linkedin.com/company/mylar-pro`
   - Facebook → `https://www.facebook.com/mylarapp`
5. **Rodapé curto:** `© <ano> Mylar Pro`.

Links externos com `target="_blank"` + `rel="noopener noreferrer"`. Links internos via `next/link`.

## Modelo de dados (`links.ts`)

```ts
type LinkVariant = "primary" | "secondary";

type LinkItem = {
  label: string;
  href: string;
  icon: IconName;       // de @/lib/icons
  variant: LinkVariant;
  external?: boolean;   // controla target/rel; default infere por href
};

type SocialItem = { label: string; href: string; icon: IconName };

export const linkItems: LinkItem[];
export const socialItems: SocialItem[];
export const profile = { tagline: string };
```

## SEO

- `export const metadata`: title "Links | Mylar Pro", description curta.
- Indexável (página de marca legítima).

## Pendências de dados (placeholders no `links.ts`)

- Número do WhatsApp (formato `wa.me`, ex. `5511999999999`).
- Telefone (`tel:`).
- URL do App do corretor (Google Play / App Store) — confirmar se aponta para loja ou página interna.

## Fora de escopo

- Sem alterações no Header/Footer global.
- Sem CMS / edição via painel.
- Sem analytics de clique por link (pode ser adicionado depois se necessário).
