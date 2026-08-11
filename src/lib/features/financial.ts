import type { FeatureContent } from "./types";

export const financial: FeatureContent = {
  slug: "financial",
  label: "Financeiro",
  shortLabel: "Financeiro",
  href: "/features/financial",
  accent: "#10B981",
  eyebrow: "Recurso · financeiro",
  hero: {
    title: "O fechamento do mês pronto ",
    titleHighlight: "no dia 1º",
    subtitle:
      "Comissão, aluguel, repasse e despesa entram sozinhos, vindos de onde já aconteceram. Você concilia com o extrato do banco e vê receita, custo e margem real — sem reconstruir nada no Excel.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Conciliação por OFX e CSV",
      "Informe de rendimentos por proprietário",
      "Centros de custo",
    ],
  },
  keyPoints: [
    {
      title: "Lançamento nasce da operação",
      body: "A comissão vem da negociação fechada, o aluguel vem da fatura paga e o repasse vem do demonstrativo do proprietário. O que você digita à mão é a exceção, não a regra.",
    },
    {
      title: "Conciliação com o extrato de verdade",
      body: "Suba o OFX ou o CSV do banco. O sistema casa valor e data automaticamente, com tolerância, e deixa para você só o que precisa de decisão humana: confirmar, vincular ou ignorar.",
    },
    {
      title: "Margem por onde você quiser olhar",
      body: "Centros de custo, categorias e tags cruzam a mesma movimentação por departamento, por projeto e por natureza. Dá para responder quanto custou a operação de locação sem abrir planilha.",
    },
    {
      title: "O informe do proprietário sem corrida em fevereiro",
      body: "O informe de rendimentos anual por proprietário sai com o detalhamento mês a mês e o PDF pronto para enviar. Os dados já estavam lá o ano inteiro.",
    },
    {
      title: "Meta acompanhada durante o mês",
      body: "Meta orçamentária por categoria, com o realizado do mês contra o alvo. Você descobre que estourou a despesa no dia 12, não no fechamento.",
    },
    {
      title: "Contas separadas, saldo real",
      body: "Conta corrente, poupança, investimento, carteira e conta de pagamento, cada uma com saldo e extrato filtrável. O caixa da operação não fica misturado com o da empresa.",
    },
  ],
  keyPointsHeadline: {
    title: "A imobiliária sabe quanto faturou. Quase nunca sabe quanto sobrou.",
    subtitle:
      "Faturamento é o número fácil. Margem exige que cada lançamento tenha origem, classificação e par no extrato — e isso não se reconstrói no fim do mês.",
  },
  modules: [
    {
      title: "Relatório geral",
      body: "Receita, despesa, lucro e margem, com origem separada entre comissão, aluguel e lançamento manual.",
    },
    {
      title: "Conciliação bancária",
      body: "Importa OFX e CSV, casa automaticamente por valor e data e deixa cada transação como pendente, conciliada, confirmada ou ignorada.",
    },
    {
      title: "Repasses",
      body: "Valor do proprietário, comprovante anexado e demonstrativo em PDF gerado pela plataforma.",
    },
    {
      title: "Comissões",
      body: "Histórico por corretor, do fechamento ao pagamento, com ranking de performance.",
    },
    {
      title: "Contas e movimentações",
      body: "Conta corrente, poupança, investimento e carteira, com saldo e extrato filtrável.",
    },
    {
      title: "Centros de custo e categorias",
      body: "Categorias de sistema já criadas para comissão, repasse e cobrança, mais as suas, e centros de custo por departamento ou projeto.",
    },
    {
      title: "Metas",
      body: "Meta orçamentária por categoria e acompanhamento do mês contra o alvo.",
    },
    {
      title: "Informe de rendimentos",
      body: "Relatório anual por proprietário, com detalhamento mês a mês e PDF pronto para enviar — a base que o contador usa para a DIMOB.",
    },
    {
      title: "Analytics",
      body: "Evolução no tempo e comparação entre períodos, com filtro por categoria, agente e cliente.",
    },
  ],
  modulesHeadline: {
    title: "Nove telas para não precisar de um sistema contábil paralelo.",
    subtitle:
      "O módulo por dentro: da movimentação bruta até o informe anual, tudo apoiado na mesma base de lançamentos.",
  },
  benefits: [
    "Fechamento sem remontar planilha, porque o lançamento já nasceu classificado",
    "Extrato do banco conciliado com matching automático por valor e data",
    "Margem real por centro de custo, categoria e tag, não só por mês",
    "Repasse ao proprietário com demonstrativo em PDF e comprovante anexado",
    "Informe de rendimentos do proprietário pronto no começo do ano",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "Menos tempo digitando e conferindo, mais tempo decidindo com número que fecha.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description:
        "Saber quanto entrou de comissão, quanto saiu de custo e o que sobra por mês, sem contratar um financeiro.",
    },
    {
      label: "Imobiliária de locação",
      description:
        "Repasse ao proprietário, taxa de administração e informe de rendimentos, tudo saindo da mesma base de faturas pagas.",
    },
    {
      label: "Incorporadora e loteadora",
      description:
        "Centros de custo por empreendimento e margem real por projeto, não só o resultado consolidado do mês.",
    },
  ],
  audienceHeadline: {
    title: "Depende do tamanho da operação.",
    subtitle:
      "O mesmo módulo serve para quem controla o próprio caixa e para quem presta contas a dezenas de proprietários.",
  },
  connectsWith: [
    {
      label: "Cobranças e repasses",
      description: "Fatura paga vira receita; repasse vira despesa.",
      href: "/features/billing",
    },
    {
      label: "CRM e negociações",
      description: "A comissão combinada na negociação já vem definida.",
      href: "/features/crm",
    },
    {
      label: "Assinatura de contratos",
      description: "Taxa de administração e vigência saem do contrato.",
      href: "/features/digital-signature",
    },
    {
      label: "Portal do cliente",
      description: "O proprietário consulta o repasse sem ligar.",
      href: "/features/client-portal",
    },
    {
      label: "Mila e inteligência artificial",
      description: "Pergunte pelo resultado do mês e receba a resposta na hora.",
      href: "/features/ai",
    },
  ],
  connectsWithHeadline: {
    title: "De onde vêm os números.",
    subtitle:
      "Nada aqui é digitado duas vezes: o financeiro é o destino natural do que a operação já registrou.",
  },
  faq: [
    {
      q: "Substitui o meu sistema contábil?",
      a: "Não substitui a contabilidade, mas resolve a gestão financeira da operação: DRE gerencial, conciliação, centros de custo, repasses, comissões e o informe de rendimentos por proprietário. O contador recebe os dados organizados para a DIMOB em vez de planilha remontada.",
    },
    {
      q: "Quais bancos são aceitos na conciliação?",
      a: "Qualquer banco que exporte extrato em OFX ou CSV. O matching automático casa por valor com tolerância de um centavo e data com tolerância de três dias, e deixa para você só o que precisa de decisão.",
    },
    {
      q: "Como funciona o repasse ao proprietário?",
      a: "A partir da fatura paga, a plataforma calcula o valor líquido do proprietário descontando taxa de administração, comissões e encargos, gera o demonstrativo em PDF e registra o repasse no financeiro com o comprovante anexado.",
    },
    {
      q: "Consigo separar o resultado por empreendimento?",
      a: "Sim, com centros de custo. Cada movimentação pode ser classificada por centro de custo, categoria e tags ao mesmo tempo, então dá para olhar o resultado por projeto, por departamento e por natureza da despesa.",
    },
    {
      q: "O que acontece com uma transação do extrato que não tem par?",
      a: "Ela fica pendente na conciliação, esperando decisão. Você vincula a um lançamento existente, cria o lançamento na hora ou marca como ignorada. Tarifa bancária e estorno normalmente caem nesse caminho.",
    },
    {
      q: "Consigo comparar meses e ver a evolução?",
      a: "Sim. O Analytics mostra a evolução no tempo e a comparação entre períodos, com filtro por categoria, agente e cliente. O relatório geral separa a receita por origem, entre comissão, aluguel e lançamento manual.",
    },
  ],
  hubCard: {
    description:
      "DRE gerencial com lançamento que nasce da operação, conciliação bancária por OFX e CSV, repasses, comissões e Informe de rendimentos por proprietário.",
    highlights: [
      "Conciliação com matching automático",
      "Margem por centro de custo e categoria",
      "Informe anual do proprietário com PDF pronto",
    ],
  },
};
