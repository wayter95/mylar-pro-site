---
name: MyLar Pro Site
description: Site institucional e páginas de campanha do MyLar Pro, plataforma de gestão para imobiliárias e corretores.
colors:
  primary: "#2facde"
  primary-dark: "#2599bb"
  primary-soft: "#e7f8fc"
  support-teal: "#37d6c0"
  night: "#020617"
  night-raised: "#0f172a"
  campaign-ground: "#061219"
  campaign-ink: "#0b1a22"
  on-primary-ink: "#052330"
  text: "#0f172a"
  text-muted: "#64748b"
  text-on-dark-muted: "#94a3b8"
  border: "#e2e8f0"
  surface: "#f8fafc"
  background: "#fafafa"
  paper: "#f7f8f6"
  white: "#ffffff"
  success: "#10b981"
  warning: "#f7c948"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.15em"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  card: "20px"
  full: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  section-sm: "64px"
  section-md: "80px"
  section-lg: "96px"
  container: "80rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.xl}"
    padding: "14px 28px"
  button-primary-campaign:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary-ink}"
    rounded: "{rounded.xl}"
    padding: "14px 28px"
  button-secondary-dark:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "#cbd5e1"
    rounded: "{rounded.xl}"
    padding: "14px 28px"
  button-outline-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    rounded: "{rounded.card}"
    padding: "28px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
  choice-surface:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.white}"
    rounded: "{rounded.2xl}"
    padding: "28px"
  option-row:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.white}"
    rounded: "{rounded.xl}"
    padding: "16px 20px"
---

# Design System: MyLar Pro Site

## Overview

**Creative North Star: "A operação à vista"**

O site trata a imobiliária como algo que se enxerga inteiro de uma vez. As aberturas são escuras e calmas, quase noite, e sobre esse fundo o ciano aparece só onde há algo a fazer ou a notar. Abaixo da abertura, o conteúdo passa para superfícies claras e organizadas, com cartões brancos de borda fina, como telas de trabalho postas lado a lado.

Os componentes são firmes e diretos: cantos arredondados, cor cheia no botão principal, pouca decoração. O tom é de credibilidade com proximidade. Nada que passe imagem de empresa começando, e nada de empresa grande e fria.

**Key Characteristics:**
- Abertura escura em azul quase preto, corpo claro.
- Um único acento, o ciano, reservado para ação e destaque.
- Plus Jakarta Sans em toda a interface, pesada e apertada nos títulos.
- Cartões planos com borda fina; a sombra aparece como resposta a hover e foco.
- Movimento curto de entrada, sem efeitos espalhados.

## Colors

Paleta de noite e papel com um acento frio: azul quase preto, cinzas azulados e ciano.

### Primary
- **Ciano MyLar** (`primary`): botão principal, links, ícones de ação, destaques pontuais em títulos. É a cor que diz "aqui".
- **Ciano Fundo** (`primary-dark`): hover de links e do texto em ciano sobre fundo claro.
- **Ciano Névoa** (`primary-soft`): fundo de selos e áreas de apoio em seções claras.

### Secondary
- **Verde-água de Apoio** (`support-teal`): segundo ponto de gradientes da marca e brilhos de fundo em aberturas escuras. Não é cor de ação.

### Neutral
- **Noite** (`night`) e **Noite Elevada** (`night-raised`): fundo das aberturas e do cabeçalho.
- **Fundo de Campanha** (`campaign-ground`) e **Tinta de Campanha** (`campaign-ink`): fundo e blocos escuros das páginas de campanha, como o Raio X.
- **Tinta** (`text`): títulos e texto principal em superfícies claras.
- **Tinta Suave** (`text-muted`): texto de apoio em superfícies claras.
- **Névoa sobre Escuro** (`text-on-dark-muted`): texto de apoio em superfícies escuras.
- **Linha** (`border`): bordas de cartões, campos e divisores.
- **Superfície** (`surface`), **Fundo** (`background`), **Papel** (`paper`) e **Branco** (`white`): planos claros. O Papel é o fundo dos documentos de resultado.
- **Sucesso** (`success`) e **Aviso** (`warning`): estados de formulário e sinalização.

### Named Rules
**A Regra do Ciano com Função.** O ciano marca ação ou o ponto de atenção da tela. Não entra como cor de fundo de seção nem como decoração.

**A Regra da Tinta sobre Ciano.** Em superfícies novas, o texto sobre o ciano usa a tinta escura (`on-primary-ink`), que dá contraste suficiente. O site institucional ainda usa texto branco no botão principal.

## Typography

**Display Font:** Plus Jakarta Sans (com ui-sans-serif, system-ui)
**Body Font:** Plus Jakarta Sans

**Character:** uma família só, geométrica e amigável. O peso 800 com entrelinha curta dá firmeza aos títulos; o corpo em 400 com entrelinha larga mantém a leitura leve.

### Hierarchy
- **Display** (800, de 2.25rem a 3.5rem, entrelinha 1.05): título da abertura de cada página.
- **Headline** (800, de 1.875rem a 2.75rem, entrelinha 1.1): título de seção.
- **Title** (800, 1.25rem): título de cartão e de bloco.
- **Body** (400, 1.125rem, entrelinha 1.625): parágrafos de abertura e de seção, com largura máxima em torno de 65 a 75 caracteres.
- **Body small** (400, 0.875rem): texto de cartões, formulários e notas.
- **Label** (600, 0.75rem, espaçamento 0.15em, maiúsculas): selos de seção no site institucional.

### Named Rules
**A Regra do Peso.** A hierarquia vem de peso e tamanho. Texto em gradiente existe em títulos antigos do site e não deve entrar em telas novas.

## Layout

Conteúdo em um contêiner central de até 80rem, com margens laterais de 16px, 24px e 32px conforme a largura. Páginas de campanha usam contêiner mais estreito (64rem para perguntas, 48rem para documentos de resultado).

As seções respiram com 64px, 80px ou 96px de espaço vertical. As grades passam de uma coluna no celular para duas ou três a partir de 640px e 1024px. Em páginas de campanha, a ação principal precisa caber na primeira tela do celular.

## Elevation & Depth

O sistema é plano por padrão e usa camadas de tom: cartão branco sobre fundo quase branco, separado por uma borda fina. A sombra aparece em três situações.

### Shadow Vocabulary
- **Brilho do botão principal** (`box-shadow: 0 14px 28px -12px rgba(47, 172, 222, 0.4)`): só no botão principal sobre fundo escuro, e cresce no hover.
- **Sombra de campo** (`box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)`): campos de formulário em superfície clara.
- **Sombra de resposta**: cartões clicáveis ganham sombra e borda de acento no hover e no foco.

### Named Rules
**A Regra do Plano em Repouso.** Superfícies ficam planas em repouso. Borda ou sombra, nunca as duas como decoração no mesmo cartão.

## Shapes

Cantos arredondados em escala curta: 12px em botões e campos, 16px em superfícies de escolha, 20px em cartões de conteúdo. A forma de pílula fica para selos e controles pequenos. Bordas de 1px, em cinza azulado no claro e em branco translúcido no escuro.

## Components

### Buttons
- **Shape:** cantos de 12px, altura confortável para toque (14px por 28px de respiro).
- **Primary:** ciano cheio. No site institucional, texto branco e brilho ciano por baixo; em campanhas, texto em tinta escura e sem brilho.
- **Hover / Focus:** sobe 2px e intensifica o brilho no site; clareia o ciano em campanhas. Foco visível com contorno de 2px.
- **Secondary (escuro):** borda cinza, fundo branco translúcido, texto claro.
- **Outline (claro):** fundo branco, borda cinza, texto em tinta; no hover, borda e texto em ciano.

### Cards / Containers
- **Corner Style:** 20px.
- **Background:** branco sobre fundo quase branco.
- **Shadow Strategy:** plano em repouso; sombra e borda de acento no hover e no foco quando o cartão é clicável.
- **Border:** 1px em cinza azulado.
- **Internal Padding:** 28px.

### Inputs / Fields
- **Style:** fundo branco, borda de 1px, cantos de 12px. Em campanha escura, fundo branco translúcido e borda branca translúcida.
- **Focus:** borda em ciano e anel suave no claro; contorno ciano de 2px no escuro.
- **Error:** mensagem abaixo do campo, dizendo o problema e como corrigir.

### Navigation
- Cabeçalho escuro com a logo branca à esquerda e uma linha fina de acento no topo. Páginas de campanha dispensam o menu e mantêm só a logo.

### Superfície de escolha (campanhas)
Bloco largo e clicável que é a própria ação da tela: título em peso 800, uma linha de apoio e uma seta em ciano. Fundo branco a 4%, borda branca a 15%, cantos de 16px. No hover, borda em ciano e fundo ciano a 10%.

### Linha de opção (campanhas)
Resposta de uma pergunta: linha inteira clicável, com o texto à esquerda e um marcador à direita, redondo para escolha única e quadrado para múltipla. Selecionada, ganha borda em ciano e fundo ciano a 15%.

### Folha de resultado (campanhas)
Documento em papel claro que entra sobre o fundo escuro. Linhas separadas por fios de 1px, passos numerados só quando a ordem importa, e um resumo do que a pessoa informou em pares de rótulo e valor. Sem notas numéricas nem barras proporcionais.

## Do's and Don'ts

### Do:
- **Do** abrir páginas em fundo escuro e passar para superfícies claras no corpo.
- **Do** reservar o ciano para ação e para o ponto de atenção.
- **Do** usar Plus Jakarta Sans em peso 800 nos títulos, com espaçamento entre -0.02em e -0.03em.
- **Do** manter cartões planos com borda fina de 1px e cantos de 20px.
- **Do** usar texto em tinta escura sobre ciano em telas novas.
- **Do** deixar o conteúdo visível mesmo quando a animação de entrada não roda.

### Don't:
- **Don't** escrever travessão em textos de página.
- **Don't** usar texto em gradiente em telas novas.
- **Don't** colocar ilustração ou elemento 3D que não signifique o que o texto diz.
- **Don't** aplicar visual de empresa grande e fria, nem de empresa começando.
- **Don't** mostrar nota numérica ou barra proporcional onde não há medida real.
