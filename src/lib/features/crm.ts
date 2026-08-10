import type { FeatureContent } from "./types";

export const crm: FeatureContent = {
  slug: "crm",
  label: "CRM e negociações",
  shortLabel: "CRM",
  href: "/features/crm",
  accent: "#2facde",
  eyebrow: "Recurso · o coração da plataforma",
  hero: {
    title: "O funil inteiro em uma tela — e ",
    titleHighlight: "nenhum lead esquecido nela",
    subtitle:
      "Do primeiro clique no anúncio até a comissão paga. Leads em kanban, distribuição automática por corretor, negociação com proposta e contraoferta, e cada etapa registrada no histórico.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Estágios personalizáveis",
      "Venda e locação",
      "Web e app do corretor",
    ],
  },
  keyPoints: [
    {
      title: "Distribuição automática, com prazo",
      body: "O lead entra e já cai para um corretor disponível. Se ele não responder dentro do prazo, o sistema redistribui e escala. A regra é sua: rodízio, disponibilidade ou origem da campanha.",
    },
    {
      title: "Estágios que refletem o seu processo",
      body: "Você desenha os estágios do funil de leads e os da negociação separadamente. Locação não é venda, e lançamento não é usado — cada operação tem o próprio caminho.",
    },
    {
      title: "Matching entre cliente e imóvel",
      body: "As preferências do cliente (região, tipologia, faixa de preço, atributos) alimentam a sugestão automática de imóveis — e o caminho inverso: para cada imóvel, quem já demonstrou interesse compatível.",
    },
    {
      title: "Comissão decidida antes do fechamento",
      body: "Cada negociação define o fluxo de comissão — centralizado na imobiliária ou direto ao corretor — e os participantes: cliente, proprietário, agente responsável e garantidor. Sem discussão depois da assinatura.",
    },
    {
      title: "Importação da carteira que você já tem",
      body: "Clientes, corretores e imóveis entram por CSV ou XLSX, com mapeamento de colunas, prévia validada e progresso salvo caso você precise parar no meio.",
    },
    {
      title: "Permissão por função",
      body: "Você define quais módulos e ações cada papel enxerga. O corretor pode ficar restrito à própria carteira, e o gestor vê o funil inteiro.",
    },
  ],
  keyPointsHeadline: {
    title: "Lead que ninguém respondeu é dinheiro que foi para o concorrente.",
    subtitle:
      "O tempo até a primeira resposta decide a maior parte das negociações — e é a única variável que dá para automatizar por completo.",
  },
  modules: [
    {
      title: "Propostas",
      body: "Histórico completo de oferta e contraoferta, com quem propôs o quê e quando.",
    },
    {
      title: "Participantes",
      body: "Cliente, proprietário, agentes envolvidos e garantidor, cada um com o seu papel.",
    },
    {
      title: "Estágios",
      body: "Pendente, concluído ou pulado — dá para ver o que travou sem perguntar a ninguém.",
    },
    {
      title: "Documentos",
      body: "Comprovante de renda, certidões e anexos ficam presos à negociação.",
    },
    {
      title: "Histórico",
      body: "Cronograma de tudo que aconteceu, com autor e data. Auditável.",
    },
    {
      title: "Comissões",
      body: "Percentual por participante e o lançamento que vai para o financeiro.",
    },
    {
      title: "Contrato",
      body: "Ganhou? O contrato sai do template já preenchido com os dados da negociação.",
    },
    {
      title: "Campos próprios",
      body: "Campos customizados por organização, para o que só a sua operação usa.",
    },
  ],
  modulesHeadline: {
    title: "Oito abas que substituem uma pasta compartilhada.",
    subtitle:
      "Tudo que a negociação precisa fica dentro dela — não espalhado entre e-mail, drive e o WhatsApp de alguém.",
  },
  benefits: [
    "Primeira resposta em minutos, com redistribuição quando o prazo estoura",
    "Funil separado para venda e para locação, cada um com as suas etapas",
    "Proposta e contraoferta registradas, sem versão paralela por e-mail",
    "Comissão acordada antes da assinatura, não discutida depois",
    "Mesmo funil no navegador e no aplicativo do corretor",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "Menos tempo organizando o funil, mais tempo dentro das negociações que estão vivas.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description:
        "Um funil só, no celular. Notificação quando o lead chega e resposta pelo WhatsApp sem trocar de app.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "Distribuição por rodízio, metas por corretor, permissões por função e visão do gestor sobre o funil inteiro.",
    },
    {
      label: "Lançamentos e incorporadoras",
      description:
        "Funil por campanha e por empreendimento, espelho de vendas por unidade e comissão do parceiro externo.",
    },
  ],
  audienceHeadline: {
    title: "Muda de forma conforme o time.",
    subtitle:
      "O mesmo CRM atende quem trabalha sozinho e quem coordena uma equipe de vendas.",
  },
  connectsWith: [
    {
      label: "Canais de atendimento",
      description: "A conversa do WhatsApp vive dentro do lead.",
      href: "/features/channels",
    },
    {
      label: "Campanhas e anúncios Meta",
      description: "O anúncio cria o lead já classificado pela origem.",
      href: "/features/meta-ads",
    },
    {
      label: "Assinatura de contratos",
      description: "Negociação ganha vira contrato preenchido.",
      href: "/features/digital-signature",
    },
    {
      label: "Financeiro",
      description: "A comissão do fechamento cai no DRE do mês.",
      href: "/features/financial",
    },
    {
      label: "Mila e MyLar Score",
      description: "Próximo passo sugerido e risco do cliente na hora.",
      href: "/features/ai",
    },
    {
      label: "MyLar Pro Brokers",
      description: "O mesmo pipeline no celular, funcionando offline.",
      href: "/features/broker-app",
    },
  ],
  connectsWithHeadline: {
    title: "Não é um CRM isolado.",
    subtitle:
      "O lead, o imóvel e o contrato são os mesmos registros em todos os módulos — o que muda em um aparece no outro na hora.",
  },
  faq: [
    {
      q: "Dá para usar o mesmo funil para venda e para locação?",
      a: "Dá, mas normalmente não é o que você quer. Os estágios do funil de leads e os da negociação são configurados separadamente, então você pode manter um caminho para venda e outro para locação, cada um com as etapas que fazem sentido.",
    },
    {
      q: "Como funciona a distribuição automática de leads?",
      a: "Em Automação de leads você define a regra de atribuição, o prazo de resposta, a redistribuição quando o prazo estoura e a escalação para o gestor. O corretor pode se marcar como indisponível e sair do rodízio por um período.",
    },
    {
      q: "Consigo importar os leads e clientes que já tenho?",
      a: "Sim. Clientes, corretores e imóveis têm assistente de importação por CSV ou XLSX, com mapeamento de colunas, prévia com validação e barra de progresso. O estado do assistente fica salvo caso você precise parar no meio.",
    },
    {
      q: "O corretor consegue trabalhar o funil pelo celular?",
      a: "Sim, pelo MyLar Pro Brokers, o app nativo de iOS e Android. Pipeline, carteira, agenda e captação funcionam offline durante a visita e sincronizam quando a conexão volta.",
    },
    {
      q: "Quem vê o quê dentro do CRM?",
      a: "As permissões são por função. Você define quais módulos e quais ações cada papel enxerga, e o corretor pode ficar restrito à própria carteira.",
    },
    {
      q: "O histórico da negociação serve como prova em uma disputa?",
      a: "O histórico registra cada mudança com autor e data, incluindo propostas, contraofertas e documentos anexados. É um registro auditável da negociação inteira.",
    },
  ],
  hubCard: {
    description:
      "Funil de leads em kanban com distribuição automática, negociação com proposta e contraoferta, e comissão definida antes do fechamento.",
    highlights: [
      "Estágios próprios para venda e locação",
      "Distribuição com prazo e escalação",
      "Matching entre cliente e imóvel",
    ],
  },
};
