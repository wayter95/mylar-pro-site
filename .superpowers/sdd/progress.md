F4-T3: complete (sem commit; site ja compativel — features:string[] mantido pela T1, troca transparente server-side; branch feat/plan-features-restructure criada de main p/ deploy; tsc ok)
P1-T1: complete (commit 8653625, review clean; MINOR pendente: telPattern aceita 'tel:......' sem digito)
P1-T2: complete (commit cd9d7db, review clean)
P1-T3: complete (commit 0455a6e, review clean; MINOR cosmetico: spread [...iconNames] desnecessario)
P1-T4: complete (commit e1502f2, review clean)
NOTA: yarn lint falha com 62 erros PRE-EXISTENTES (pastas de rascunho + arquivos antigos), baseline confirmada em add54a0. Gate valido = npx tsc --noEmit.
P1-T5: complete (commit 0963595, review clean; PENDENTE p/ Wayter: verificacao visual do Studio pos-login — sidebar, singleton sem create/delete)
P1-T6: complete (commits 2b0ce96..4781bfd, review clean apos fix de validacao granular de links do rodape)
P1-T7: complete (commit 9d0af8a, review clean). ESCOPO EXPANDIDO necessario: Footer async + queries.ts tem 'server-only' => contact/page.tsx era "use client" e quebrava o build. Extraido ContactForm.tsx + MotionDiv.tsx. Verificado por mim: 6 campos do form intactos (inclui select motivo c/ 6 options), fetch /api/contact intacto, rota da API nao tocada, classNames byte-identicos, sem metadata antes nem depois (era "use client"), zero erros de runtime.
P1-T8: NAO EXECUTAVEL POR AGENTE — popular conteudo no Studio exige login Sanity (credenciais). Pendente para Wayter.
P2-T1: complete (commit 4a81552, review clean)
P2-T2: complete (commits e3d8021..502e77d, review clean apos 2 fixes: whitespace no scheme + catch trimado)
P2-T3: complete (commit 3277dd6, review clean; sendLeadEvent equivalente byte-a-byte, contact route intacta)
P2-T4: complete (commit 88040a3, review clean; fix do rodape sobreviveu, anotacao de tipo validada com repro)
P2-T5: complete (commits 103061a..75fa335, review clean; after() aplicado p/ nao perder evento no teardown)
P2-T6: complete (commits ec0075b..58e60d7, review clean apos fix CRITICAL: mutacao de DOM era inerte p/ <Link> do Next; href agora vem de state)
P2-T7: complete (commit a3ae123, review clean). PLANO 2 COMPLETO. Propagacao verificada por mim: /links?utm_source=linkedin -> href com linkedin+organic+fbclid; sem UTM -> defaults site/links-page. /links dinamica (esperado), 16 paginas do rodape ainda estaticas.
P3-T1: complete (commit 334d2ec, review clean; 7/7 casos, digitos nao trocados, parsing nao permissivo)
P3-T2: complete (commit facf69c; 5/5 casos; revisado por inspecao direta minha — arquivo de 16 linhas, '?.marketing === true' garante opt-in sem falso-positivo)
P3-T3: complete (commit 9d53e95; verificado por mim: strings truthy e 1 rejeitados com 400, ordem de digitos correta v1.10 p/ analytics-only)
P3-T4: complete (commits 41ffaf1..96c70f6 + fix de ordem; review clean apos 2 fixes: (1) falha no POST nao marca decided nem esconde banner, response.ok checado; (2) applyToTools movido p/ DEPOIS da persistencia — nao libera rastreio sem registro)
P3-T5: complete (commit 3cf8b6d, review clean; botoes Aceitar/Recusar com peso visual igual, sem overlay, z-9998 abaixo do chat, ordem dos args analytics/marketing correta)
P3-T7: complete; ordem consent-default antes do GTM confirmada em runtime (dataLayer[0]=consent, [1]=gtm.js) e estruturalmente no HTML servido; build mantem so /api/*, /go/[slug], /links dinamicas; CognizyWidget fora do ConsentProvider confirmado por leitura do JSX + DOM
P3-T6: complete (commit 23b1481; gate cliente+servidor; verificado por mim: redirect 307 preservado com recusa/sem cookie/com aceite)
P3-T7: complete (commits 5bac39f + remocao dos noscript; VERIFICADO POR MIM no browser: dataLayer[0]=consent denied, [1]=gtm.js; recusa grava v1.00 e mantem chat; analytics-only grava v1.10 com analytics_storage=granted e 3 sinais ad=denied; banner z-9998, sem overlay; noscript de rastreio removidos por decisao do Wayter)
REVIEW FINAL: 2 bugs de dinheiro corrigidos (500 no /go com caminho interno; rodape sobrescrevia atribuicao paga com utm_source=site) + /go ganhou medium proprio short-link. Branch aprovada p/ merge.
