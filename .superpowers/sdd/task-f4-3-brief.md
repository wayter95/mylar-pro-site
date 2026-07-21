### Task 3: Site consome as features canônicas do endpoint

**Files:**
- Modify: `mylar-pro-site/src/lib/personas/plans-api.ts`
- Verificar: `mylar-pro-site/src/components/plans/PlanCard.tsx` (provavelmente sem mudança)

**Interfaces:**
- Consumes: o campo `features: string[]` do endpoint `/marketing` (agora com os `name` canônicos, Task 1).
- Produces: o site renderiza os recursos reais. Como o campo continua se chamando `features` e sendo `string[]`, idealmente ZERO mudança no site — mas confirmar.

**Contexto:** a Task 1 manteve o campo `features` como `string[]` (só trocou a fonte de marketing → canônico). Se o site já lê `plan.features` como `string[]` e renderiza no PlanCard, **nada muda no site** — a troca é transparente. Esta task é de verificação + criar a branch do site para registro/deploy.

- [ ] **Step 1: Criar a branch do site**

```bash
cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site
git checkout main && git checkout -b feat/plan-features-restructure
```

- [ ] **Step 2: Confirmar que o shape não quebrou**

Ler `src/lib/personas/plans-api.ts` — o tipo `ApiPlan` espera `features: string[]` e `toPersonaPlan` copia `features`. Como a Task 1 manteve `features: string[]`, o `isValidPlan` e o `toPersonaPlan` continuam válidos. Ler `PlanCard.tsx` para confirmar que renderiza `plan.features.map(...)` como strings.

Se tudo compatível: NENHUMA edição de código no site é necessária — a troca é server-side. Documentar isso no relatório.

- [ ] **Step 3: Type-check / build do site (se aplicável)**

Run: `cd mylar-pro-site && npx tsc --noEmit` (e `yarn build` se o projeto suportar build local sem env de produção; se exigir CORE_API_URL e falhar no fetch SSR, o build pode degradar para "planos sob consulta" — isso é o fallback existente, aceitável; documentar).
Expected: tsc sem erros.

- [ ] **Step 4: Commit (só se houve mudança)**

Se o Step 2 exigiu ajuste (ex.: o site lia algum campo que sumiu), commitar:

```bash
cd /Users/wayter/Documents/www/mylar-pro/mylar-pro-site
git add -A
git commit -m "feat: render real plan features from marketing endpoint"
```

Se nenhuma mudança foi necessária, NÃO commitar; registrar no relatório "site já compatível — troca transparente server-side; branch criada para deploy".

---

