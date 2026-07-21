# Fix: alinhamento de copy /plans (persona development)

## Status
CONCLUÍDO (7/7 correções aplicadas). 1 concern fora de escopo identificado, não corrigido.

## Commit
`9becbcdd07e72e2e647f0ec60243b1a44352f3ec` — branch `fix/plans-copy-alignment`

## Resumo
tsc limpo (`npx tsc --noEmit` sem output/erros); grep pós-fix ainda encontra 1 ocorrência de "SSO/SAML" fora do escopo pedido (ver Concerns).

## Correções aplicadas
1-4. `src/lib/personas/development.ts` — grupo `comparison` "Enterprise": labels trocados para "Gerente de conta dedicado", "Suporte prioritário (SLA < 2h)", "Integração ERP Sienge", "Relatórios avançados de empreendimentos" (bools mantidos `false,false,true`).
5. FAQ "Tem SSO corporativo?" removida por completo.
6. FAQ do ERP reescrita: pergunta "Vocês integram com o Sienge?", resposta menciona apenas Sienge, sem TOTVS/UAU/Globaltec/APIs e webhooks.
7. `src/lib/personas/constants.ts` — highlight do card development trocado de "SSO/SAML · LGPD certificado" para "Integração Sienge · Gerente de conta dedicado".

## Concerns
- `src/lib/personas/development.ts` linha ~112-113, array `features` (fora das 7 correções pedidas): bloco `{ title: "Compliance & LGPD", body: "SSO/SAML, auditoria granular, retenção configurável. Certificações ISO 27001 e LGPD." }` ainda promete SSO/SAML e certificação ISO 27001, que não existem na matriz real. Não editado por estar fora do escopo explícito da tarefa ("Só edite as 7 correções acima"). Recomenda-se decisão do usuário sobre se deve ser corrigido em follow-up.
- Não tocado: `broker.ts`, `real-estate.ts`, row "Distribuição automática de leads" — conforme instruído.
