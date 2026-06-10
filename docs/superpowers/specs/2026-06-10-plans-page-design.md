# Página `/plans` dedicada — Design

**Data:** 2026-06-10
**Projeto:** mylar-pro-site
**Status:** Aprovado, pronto para implementação

## Objetivo

Criar uma página `/plans` dedicada no padrão de pricing tipo Bling (todos os planos numa página única, com toggle de período e seções de apoio), espelhando a estratégia de planos da `mylar-pro-web`. A página reaproveita as três personas já existentes no site (`broker`, `real-estate`, `development`) e os preços reais vindos do backend.

## Contexto existente

- 3 personas em `src/lib/personas/` (`broker`, `real-estate`, `development`), cada uma com `PersonaContent` (label, accent, comparison, faq, plans opcional).
- Landings de persona em `/personas/[slug]` já têm uma seção `#planos` via `PersonaPricing` que puxa planos reais de `fetchPersonaPlans()`.
- Endpoint backend: `GET /subscription-plans/by-persona/marketing?persona={BROKER|AGENCY|DEVELOPER}`.
- O backend só tem planos `MONTHLY` no banco. O preço anual é **calculado** no endpoint:
  - `price` = mensal real do banco
  - `priceAnnual` = `(price × 10) / 12` (paga 10 meses, leva 12)
  - `priceYearlyTotal` = `price × 10`
  - `annualDiscountPercent` = `17` (constante)
- Hoje o `plans-api.ts` do site **descarta** `priceYearlyTotal` e `annualDiscountPercent`.
- Header em `src/components/landing/Header.tsx` tem dropdown de personas, mas **nenhum** item "Planos" no nível superior.

## Estratégia de preço (toggle global)

Toggle único Mensal ⇄ Anual no topo da página, controlando os 3 cards de uma vez:

| Estado | Card mostra |
|---|---|
| **Mensal** | `price` /mês · "cobrado mensalmente" |
| **Anual** | `priceAnnual` /mês · "cobrado R$ `priceYearlyTotal`/ano · economize {annualDiscountPercent}%" |

O selo de economia ao lado do toggle (`-{annualDiscountPercent}% · 2 meses grátis`) vem do dado real `annualDiscountPercent`, não é hardcoded. Toggle inicia em **Mensal**.

## Arquitetura

```
src/app/plans/page.tsx              # server: busca 3 personas + plans, metadata
src/components/plans/PlansPage.tsx  # client: estado (persona ativa + período), orquestra seções
```

### Fluxo de dados

1. `page.tsx` (server) chama `fetchPersonaPlans()` para `broker`, `real-estate`, `development` em paralelo → monta `Record<PersonaSlug, PersonaPlan[]>`.
2. Passa esse record + os `PersonaContent` (de `@/lib/personas`) para `PlansPage`.
3. `PlansPage` (client) mantém dois estados:
   - `activePersona: PersonaSlug` (default `"broker"`)
   - `billingPeriod: "monthly" | "annual"` (default `"monthly"`)

## Seções (na ordem)

1. **Hero** — eyebrow + título + subtítulo. Abaixo: **tabs de persona** (Corretor · Imobiliária · Lançamentos) e **toggle global Mensal/Anual** com selo de economia.
2. **Cards de plano** — 3 colunas da persona ativa. Reusa a lógica visual de `PlanColumn` (`PersonaPricing`), mas o bloco de preço reage ao `billingPeriod`. Accent acompanha a persona ativa.
3. **Faixa de garantia/trial** — banner: 30 dias grátis · sem cartão · sem multa de fidelidade · migração de dados inclusa.
4. **Tabela comparativa** — reusa `persona.comparison` (`PersonaComparison`), troca conforme persona ativa.
5. **FAQ** — reusa `persona.faq`.
6. **CTA final + vendas** — "precisa de algo sob medida?" → link para `/contact`.

## Mudanças de suporte

### `src/lib/personas/types.ts`
Adicionar ao `PersonaPlan`:
```ts
priceYearlyTotal?: number;
annualDiscountPercent?: number;
```

### `src/lib/personas/plans-api.ts`
- Adicionar `priceYearlyTotal?: number` e `annualDiscountPercent?: number` ao tipo `ApiPlan`.
- Mapear ambos em `toPersonaPlan()`.

### `src/components/landing/Header.tsx`
Adicionar `{ href: "/plans", label: "Planos" }` ao array `navLinks` (aparece em desktop e mobile automaticamente).

## Comportamento de fallback

- Se uma persona não retorna plans (env `CORE_API_URL` ausente ou API offline), a seção de cards daquela persona renderiza um estado vazio suave com link para `/personas` e CTA de contato. A página continua funcional (hero, garantia, FAQ, CTA seguem renderizando com dados estáticos da persona).
- Tabs de persona sempre aparecem (dados estáticos garantem label/accent).

## Princípios

- **Reuso máximo**: nenhum dado de persona é duplicado — `PlansPage` importa de `@/lib/personas` e recebe os plans reais via props.
- **Um único toggle global**, sem toggle por card.
- **Sem comentários no código** (regra do projeto).
- **Texto user-facing em pt-BR** (site não usa i18n).
- Padrões visuais (cores, fontes, animações framer-motion) seguem os componentes existentes em `src/components/persona/`.

## Critérios de sucesso

- `/plans` renderiza com tabs de persona e toggle funcional.
- Trocar persona troca cards, tabela comparativa e FAQ.
- Trocar período (Mensal/Anual) recalcula os preços nos 3 cards com base nos dados reais.
- Item "Planos" visível no Header (desktop + mobile).
- `npx tsc --noEmit`, `yarn lint` e `yarn build` passam.
