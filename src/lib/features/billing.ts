import type { FeatureContent } from "./types";

export const billing: FeatureContent = {
  slug: "billing",
  label: "Cobranças e repasses",
  shortLabel: "Cobranças",
  href: "/features/billing",
  accent: "#059669",
  eyebrow: "Recurso · cobranças e repasses",
  hero: {
    title: "O aluguel cobrado, recebido e repassado ",
    titleHighlight: "sem ninguém lembrando à mão",
    subtitle:
      "Boleto e PIX emitidos via Asaas, multa e juros calculados no vencimento, régua de disparos por e-mail e WhatsApp, reajuste aplicado em lote e demonstrativo de repasse em PDF para o proprietário.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Boleto e PIX via Asaas",
      "Régua de 15 disparos",
      "Reajuste por IGP-M, IPCA ou INPC",
    ],
  },
  keyPoints: [
    {
      title: "A fatura sai do contrato, não de uma planilha",
      body: "Vigência, valor, encargos, taxa de administração e dia de vencimento vêm do contrato assinado. A fatura do mês é gerada a partir dele, com boleto e PIX emitidos via Asaas.",
    },
    {
      title: "Multa e juros no vencimento, sem discussão",
      body: "A regra de multa e juros de mora é configurada uma vez e aplicada automaticamente quando o vencimento passa. O inquilino vê o valor atualizado e o motivo do acréscimo.",
    },
    {
      title: "Pagamento parcial e comprovante aprovado",
      body: "O inquilino pode pagar em parte e enviar comprovante pelo portal. A imobiliária aprova ou recusa, e só a aprovação move o saldo da fatura. Nada entra no financeiro por confiança.",
    },
    {
      title: "Régua de cobrança em dois canais",
      body: "Até quinze disparos programados por fatura, antes e depois do vencimento, por e-mail e WhatsApp. Quem paga sai da régua na hora, sem receber lembrete de dívida quitada.",
    },
    {
      title: "Reajuste em lote, com aprovação antes de valer",
      body: "Selecione os contratos que vencem o aniversário, escolha IGP-M, IPCA, INPC ou percentual fixo e veja o novo valor de cada um. Nada é aplicado até você aprovar a lista.",
    },
    {
      title: "Acordo de dívida parcelado",
      body: "O débito acumulado vira um acordo com parcelas próprias e boletos gerados. As faturas originais ficam vinculadas ao acordo, então o histórico não se perde.",
    },
  ],
  keyPointsHeadline: {
    title:
      "O reajuste que o inquilino não consegue pagar não é receita: é aviso de saída com doze meses de antecedência.",
    subtitle:
      "Por isso o reajuste passa por revisão antes de valer, e a inadimplência tem caminho de acordo em vez de só carta de cobrança.",
  },
  benefits: [
    "Fatura gerada do contrato, com boleto e PIX no mesmo documento",
    "Multa e juros aplicados no vencimento, sem cálculo manual",
    "Régua automática por e-mail e WhatsApp, com saída imediata de quem pagou",
    "Reajuste anual em lote por índice ou valor fixo, revisado antes de valer",
    "Repasse ao proprietário com demonstrativo em PDF e comprovante anexado",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "A cobrança deixa de depender de quem lembrou de mandar mensagem, e o proprietário para de ligar para perguntar do repasse.",
  },
  audience: [
    {
      label: "Imobiliária de locação",
      description:
        "Centenas de faturas por mês com régua, acordo, reajuste anual e repasse saindo da mesma base.",
    },
    {
      label: "Administradora de carteira",
      description:
        "Prestação de contas ao proprietário com demonstrativo detalhado e comprovante de cada repasse.",
    },
    {
      label: "Corretor com poucos contratos",
      description:
        "Boleto e PIX sem contrato de cobrança próprio no banco, e lembrete automático em vez de mensagem no WhatsApp.",
    },
  ],
  audienceHeadline: {
    title: "Serve para dez contratos e para mil.",
    subtitle:
      "A diferença está no volume; a régua, o acordo e o repasse funcionam do mesmo jeito nos dois casos.",
  },
  connectsWith: [
    {
      label: "Financeiro",
      description: "Fatura paga vira receita; repasse vira despesa.",
      href: "/features/financial",
    },
    {
      label: "Assinatura de contratos",
      description: "Vigência, encargos e reajuste saem do contrato assinado.",
      href: "/features/digital-signature",
    },
    {
      label: "Portal do cliente",
      description: "O inquilino paga e envia comprovante; o dono vê o repasse.",
      href: "/features/client-portal",
    },
    {
      label: "Canais de atendimento",
      description: "O lembrete e a resposta acontecem no WhatsApp do inquilino.",
      href: "/features/channels",
    },
    {
      label: "MyLar Score",
      description: "Risco de inadimplência avaliado antes de aprovar a locação.",
      href: "/features/mylar-score",
    },
  ],
  connectsWithHeadline: {
    title: "A cobrança é o meio, não o começo.",
    subtitle:
      "Ela nasce do contrato, conversa pelos canais que o inquilino já usa e termina no resultado do mês.",
  },
  faq: [
    {
      q: "Preciso de contrato de cobrança próprio no banco?",
      a: "Não. A emissão de boleto e PIX é feita via Asaas a partir da plataforma, então você não precisa negociar carteira de cobrança com o seu banco para começar a cobrar.",
    },
    {
      q: "Como o reajuste anual é aplicado?",
      a: "Você filtra os contratos que atingiram o aniversário, escolhe IGP-M, IPCA, INPC ou um percentual fixo e a plataforma calcula o novo valor de cada contrato. A lista fica em revisão e nada passa a valer antes da sua aprovação.",
    },
    {
      q: "O inquilino consegue pagar só parte da fatura?",
      a: "Sim. O pagamento parcial é registrado e a fatura fica com saldo em aberto, seguindo na régua pelo valor restante. Comprovante enviado pelo portal precisa de aprovação da imobiliária para abater o saldo.",
    },
    {
      q: "O que a régua de cobrança dispara e quando?",
      a: "São até quinze disparos por fatura, distribuídos antes e depois do vencimento, por e-mail e por WhatsApp. Você define os intervalos e o texto de cada etapa, e o pagamento interrompe a sequência imediatamente.",
    },
    {
      q: "Como funciona o acordo para quem está inadimplente?",
      a: "As faturas em atraso são reunidas em um acordo com número de parcelas e vencimentos próprios, e os boletos das parcelas são gerados. As faturas originais continuam vinculadas ao acordo, preservando o histórico da dívida.",
    },
    {
      q: "O proprietário recebe algum documento do repasse?",
      a: "Recebe o demonstrativo em PDF, com o valor recebido do inquilino, os descontos aplicados e o líquido repassado. O comprovante da transferência fica anexado ao repasse, e o proprietário consulta tudo pelo portal.",
    },
  ],
  hubCard: {
    description:
      "Boleto e PIX via Asaas, multa e juros automáticos, régua de cobrança em dois canais, reajuste em lote por índice e repasse com demonstrativo em PDF.",
    highlights: [
      "Régua de 15 disparos por e-mail e WhatsApp",
      "Reajuste por IGP-M, IPCA, INPC ou fixo",
      "Acordo de dívida parcelado",
    ],
  },
};
