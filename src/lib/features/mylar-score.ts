import type { FeatureContent } from "./types";

export const mylarScore: FeatureContent = {
  slug: "mylar-score",
  label: "MyLar Score",
  shortLabel: "MyLar Score",
  href: "/features/mylar-score",
  accent: "#0EA5E9",
  eyebrow: "Recurso · análise de risco",
  hero: {
    title: "Aprovar a locação deixa de depender de ",
    titleHighlight: "quem leu o relatório",
    subtitle:
      "Consulta ao Serasa, lida por IA e resumida em um score único de risco para aquele cliente — com o motivo de cada ponto tirado ou somado.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Consulta dentro da plataforma",
      "Score com justificativa",
      "Ligado à negociação",
    ],
  },
  keyPoints: [
    {
      title: "Consulta sem sair do sistema",
      body: "Você pede a análise de dentro da negociação ou do cadastro do cliente. A consulta ao Serasa e às outras bases acontece ali, sem abrir portal de terceiro nem colar CPF em outra ferramenta.",
    },
    {
      title: "Um número, não vinte páginas",
      body: "O relatório bruto é lido pela IA e vira um score único de risco. Quem decide olha um número e a faixa em que ele cai, em vez de interpretar tabela de apontamento.",
    },
    {
      title: "O motivo aparece junto do número",
      body: "O score vem com o que pesou: restrição em aberto, histórico recente, tempo de relacionamento, compatibilidade entre renda declarada e valor do aluguel. Dá para explicar a decisão ao proprietário.",
    },
    {
      title: "Critério igual para todo mundo",
      body: "Duas pessoas lendo o mesmo relatório chegam a decisões diferentes. O score aplica o mesmo critério em todos os candidatos, então a aprovação não depende de quem estava de plantão.",
    },
    {
      title: "Preso ao cliente",
      body: "A análise fica registrada no cadastro do cliente, com data e autor. Seis meses depois, dá para mostrar em que base a locação foi aprovada.",
    },
    {
      title: "Entra na conversa da Mila",
      body: "Quando você pergunta à Mila se um cliente serve para um imóvel, o score entra na resposta junto do matching de preferências. Risco e encaixe na mesma frase.",
    },
  ],
  keyPointsHeadline: {
    title: "Inadimplência aprovada é prejuízo que dura o contrato inteiro.",
    subtitle:
      "A decisão de alugar costuma sair de uma leitura rápida de PDF, feita sob pressão. Um score com justificativa troca a impressão pelo critério.",
  },
  benefits: [
    "Análise de crédito pedida de dentro da negociação, sem outro portal",
    "Relatório longo resumido em um score com faixa de risco",
    "Decisão explicável ao proprietário, com o motivo de cada ponto",
    "Mesmo critério aplicado a todos os candidatos, independente de quem analisa",
    "Histórico da análise guardado junto do cliente e do imóvel",
  ],
  benefitsHeadline: {
    title: "O que muda na aprovação.",
    subtitle:
      "Menos tempo lendo relatório, menos discussão sobre critério e um registro do porquê da decisão.",
  },
  audience: [
    {
      label: "Administradora de locação",
      description:
        "Triagem de candidato em minutos, com critério uniforme e justificativa pronta para levar ao proprietário.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "O corretor pede a análise, o gestor decide com base no score e a permissão define quem enxerga o detalhe da consulta.",
    },
    {
      label: "Corretor autônomo",
      description:
        "Análise de risco sem contrato com bureau nem assinatura separada de ferramenta de crédito.",
    },
  ],
  audienceHeadline: {
    title: "Serve para quem assume o risco do aluguel.",
    subtitle:
      "Quem responde ao proprietário pela escolha do inquilino precisa de um critério que dê para defender.",
  },
  connectsWith: [
    {
      label: "CRM e negociações",
      description: "O score aparece dentro da negociação de locação.",
      href: "/features/crm",
    },
    {
      label: "Mila e ferramentas de IA",
      description: "Risco e matching do cliente na mesma resposta.",
      href: "/features/ai",
    },
    {
      label: "Assinatura de contratos",
      description: "Aprovado, o contrato sai do template já preenchido.",
      href: "/features/digital-signature",
    },
    {
      label: "Cobranças e repasses",
      description: "O histórico de pagamento realimenta a leitura de risco.",
      href: "/features/billing",
    },
    {
      label: "Vistorias",
      description: "Entrada aprovada segue para a vistoria com laudo em PDF.",
      href: "/features/inspections",
    },
  ],
  connectsWithHeadline: {
    title: "A análise não é um anexo solto.",
    subtitle:
      "O score fica ligado ao cliente, e acompanha o caminho até o contrato assinado.",
  },
  faq: [
    {
      q: "Quais bases são consultadas?",
      a: "A consulta integra o Serasa e outras fontes de dados de crédito e cadastro. O retorno bruto de todas elas é o que alimenta a leitura da IA e o score final.",
    },
    {
      q: "O score decide sozinho se a locação é aprovada?",
      a: "Não. Ele organiza a informação e recomenda uma faixa de risco. A aprovação continua sendo uma decisão da imobiliária, agora com o critério explícito em vez da impressão de quem leu o relatório.",
    },
    {
      q: "Consigo ver o relatório completo, e não só o score?",
      a: "Sim. O score é a camada de cima; o detalhe da consulta fica disponível para quem tem permissão, com o registro de quem pediu a análise e quando.",
    },
    {
      q: "Serve para análise de comprador, não só de inquilino?",
      a: "Serve. A leitura de risco é do cliente, então dá para usar tanto na triagem de candidato à locação quanto na avaliação de um comprador que vai depender de financiamento.",
    },
    {
      q: "Preciso de contrato próprio com o bureau de crédito?",
      a: "Não. A consulta é feita pela plataforma, dentro do fluxo da negociação, sem você manter integração ou assinatura separada com o bureau.",
    },
    {
      q: "A análise fica guardada por quanto tempo?",
      a: "Ela fica registrada no cadastro do cliente, com data e autor, para consulta posterior. É o que permite mostrar depois em que base a decisão foi tomada.",
    },
  ],
  hubCard: {
    description:
      "Consulta ao Serasa, lida por IA e resumida em um score único de risco, com a justificativa de cada ponto.",
    highlights: [
      "Consulta de dentro da negociação",
      "Score com motivo, não só número",
      "Mesmo critério para todo candidato",
    ],
  },
};
