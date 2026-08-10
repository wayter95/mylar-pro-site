import type { IconName } from "@/lib/icons";

export type PartnerHero = {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trust: string[];
};

export type PartnerReason = {
  title: string;
  body: string;
  icon: IconName;
};

export type PartnerTier = {
  number: string;
  name: string;
  tagline: string;
  commission: string;
  badge?: string;
  highlights: string[];
};

export type PartnerStep = {
  number: string;
  title: string;
  body: string;
};

export type PartnerBenefit = {
  title: string;
  body: string;
  icon: IconName;
};

export type PartnerAudience = {
  title: string;
  body: string;
  icon: IconName;
};

export type PartnerFaq = {
  q: string;
  a: string;
};

export const partnersHero: PartnerHero = {
  eyebrow: "Programa de parceiros",
  title: "Você já conhece as imobiliárias.",
  titleHighlight: "Nós temos o software.",
  subtitle:
    "Indique, venda ou implante o MyLar Pro e receba comissão recorrente enquanto o cliente continuar com a gente. Sem meta imposta, sem exclusividade, sem investir em estoque nem em desenvolvimento.",
  ctaPrimary: "Quero ser parceiro",
  ctaSecondary: "Ver os modelos",
  trust: [
    "Comissão recorrente",
    "Sem custo de entrada",
    "Time de vendas te apoia na negociação",
  ],
};

export const partnersReasonsHeadline = {
  eyebrow: "Por que vale a pena",
  title: "Software imobiliário é venda de relação, não de anúncio.",
  subtitle:
    "Quem já atende o setor tem o que nenhuma campanha compra: confiança. É por isso que essa venda funciona muito melhor pela indicação de alguém de dentro do que por anúncio frio.",
};

export const partnersReasons: PartnerReason[] = [
  {
    title: "Recorrência, não comissão única",
    body: "Você não recebe uma vez e recomeça do zero. Enquanto o cliente que você trouxe continuar pagando, a comissão entra todo mês. O trabalho de um ano vira renda no ano seguinte.",
    icon: "trending",
  },
  {
    title: "Um produto que sustenta a indicação",
    body: "CRM, atendimento, contrato assinado, cobrança, repasse e financeiro na mesma plataforma. Você indica sabendo que o cliente não vai voltar reclamando de sistema pela metade.",
    icon: "grid",
  },
  {
    title: "Você indica, a gente executa",
    body: "Demonstração, proposta, migração de dados e suporte são nossos. Se quiser participar de tudo, participa; se preferir só apresentar e sair, também funciona.",
    icon: "handshake",
  },
];

export const partnersTiersHeadline = {
  eyebrow: "Modelos de parceria",
  title: "Escolha o quanto você quer entrar na venda.",
  subtitle:
    "Quanto mais você assume do processo, maior a sua participação na receita daquele cliente.",
  footnote:
    "A condição final é definida na conversa com o nosso time comercial. Volume alto ou operação regional fecham condição específica.",
};

export const partnersTiers: PartnerTier[] = [
  {
    number: "01",
    name: "Indicador",
    tagline: "Você apresenta, a gente conduz do primeiro contato ao contrato.",
    commission: "Comissão recorrente por doze meses",
    highlights: [
      "Link de indicação com rastreio próprio",
      "Zero envolvimento na negociação",
      "Ideal para contador, advogado e consultor do setor",
    ],
  },
  {
    number: "02",
    name: "Parceiro comercial",
    badge: "Mais comum",
    tagline: "Você faz a demonstração e conduz a venda; a gente entra no que for técnico.",
    commission: "Comissão recorrente enquanto o cliente ficar",
    highlights: [
      "Treinamento comercial e certificação",
      "Ambiente de demonstração com dados de exemplo",
      "Material de proposta com a sua marca junto",
      "Margem de desconto para negociar",
    ],
  },
  {
    number: "03",
    name: "Implantador",
    tagline: "Você vende, implanta, migra os dados e treina a equipe do cliente.",
    commission: "Comissão recorrente mais o serviço cobrado à parte",
    highlights: [
      "Tudo do Parceiro comercial",
      "Certificação técnica de implantação",
      "Você define e cobra o próprio preço de implantação",
      "Ideal para agência e consultoria de gestão imobiliária",
    ],
  },
];

export const partnersStepsHeadline = {
  eyebrow: "Como funciona",
  title: "Da candidatura à primeira comissão.",
};

export const partnersSteps: PartnerStep[] = [
  {
    number: "01",
    title: "Candidatura",
    body: "Você conta o que faz hoje e com quem já conversa no mercado. Respondemos em até dois dias úteis.",
  },
  {
    number: "02",
    title: "Treinamento",
    body: "Duas sessões: uma sobre o produto, outra sobre como conduzir a conversa com imobiliária. Você sai com ambiente de demonstração pronto.",
  },
  {
    number: "03",
    title: "Primeiras indicações",
    body: "Cada oportunidade registrada no painel fica reservada para você. Nosso time acompanha as primeiras até o fechamento.",
  },
  {
    number: "04",
    title: "Comissão todo mês",
    body: "Pagamento mensal por PIX ou transferência, com extrato de cada cliente ativo na sua carteira.",
  },
];

export const partnersBenefitsHeadline = {
  eyebrow: "O que você recebe",
  title: "Ninguém vende sozinho aqui.",
};

export const partnersBenefits: PartnerBenefit[] = [
  {
    title: "Painel do parceiro",
    body: "Oportunidades registradas, status de cada negociação e extrato de comissão sem precisar perguntar.",
    icon: "dashboard",
  },
  {
    title: "Kit comercial pronto",
    body: "Apresentação, proposta modelo, comparativo com os sistemas concorrentes e roteiro de demonstração.",
    icon: "fileText",
  },
  {
    title: "Especialista na reunião",
    body: "Quando a conversa virar técnica — integração, migração, DIMOB — alguém do nosso time entra com você.",
    icon: "userCheck",
  },
  {
    title: "Selo de parceiro certificado",
    body: "Você aparece na nossa lista pública e recebe as oportunidades da sua região que chegam direto para nós.",
    icon: "shieldCheck",
  },
];

export const partnersAudienceHeadline = {
  eyebrow: "Para quem é",
  title: "Se o mercado imobiliário já te ouve, você se encaixa.",
};

export const partnersAudience: PartnerAudience[] = [
  {
    title: "Consultor de gestão",
    body: "Já organiza processo de imobiliária e precisa de sistema para sustentar a mudança.",
    icon: "briefcase",
  },
  {
    title: "Contador do setor",
    body: "Sofre com o DIMOB e o fechamento dos clientes todo ano.",
    icon: "chart",
  },
  {
    title: "Agência de marketing",
    body: "Gera lead para imobiliária e vê o lead morrer por falta de CRM do outro lado.",
    icon: "zap",
  },
  {
    title: "Ex-gestor de imobiliária",
    body: "Conhece a dor por dentro e fala a língua de quem decide.",
    icon: "building",
  },
  {
    title: "Advogado imobiliário",
    body: "Vive contrato, garantia e cobrança — e sabe onde o processo trava.",
    icon: "fileSign",
  },
  {
    title: "Revenda de software",
    body: "Já vende e implanta sistema e quer somar um vertical imobiliário à carteira.",
    icon: "server",
  },
];

export const partnersFaqHeadline = {
  eyebrow: "Perguntas frequentes",
  title: "O que os parceiros perguntam antes de começar.",
};

export const partnersFaq: PartnerFaq[] = [
  {
    q: "Preciso ter empresa aberta para ser parceiro?",
    a: "Para o modelo de indicação, não: dá para receber como pessoa física. Para parceiro comercial e implantador pedimos CNPJ, porque a comissão é paga contra nota.",
  },
  {
    q: "Existe custo para entrar no programa?",
    a: "Nenhum. Não há taxa de adesão, mensalidade, compra de licença nem meta mínima para se manter parceiro. Você investe o seu tempo, e a gente investe treinamento e suporte.",
  },
  {
    q: "Por quanto tempo eu recebo pela mesma indicação?",
    a: "No modelo de indicação, por doze meses. Nos modelos de parceiro comercial e implantador, a comissão é recorrente enquanto aquele cliente continuar ativo na plataforma.",
  },
  {
    q: "E se a imobiliária que eu indiquei já estava falando com vocês?",
    a: "Toda oportunidade é registrada no painel com data. Se o cliente já estava em negociação aberta com o nosso time, avisamos na hora do registro — antes de você investir tempo nela.",
  },
  {
    q: "Quem faz a implantação e o suporte do cliente?",
    a: "Depende do modelo. Como indicador ou parceiro comercial, implantação, migração e suporte são nossos. Como implantador certificado, você conduz e cobra esse serviço à parte, com o nosso time como retaguarda técnica.",
  },
  {
    q: "Posso vender junto com outros sistemas que já represento?",
    a: "Pode. Não há cláusula de exclusividade. Só pedimos que a demonstração do MyLar Pro seja feita com informação correta sobre o que a plataforma faz hoje.",
  },
];

export const partnersCta = {
  eyebrow: "Quero ser parceiro",
  title: "Conte com quem você já conversa.",
  subtitle:
    "Deixe seus dados e o nosso time comercial retorna em até dois dias úteis para entender o seu contexto e sugerir o modelo mais adequado. Nenhum compromisso na conversa.",
  ctaLabel: "Quero ser parceiro",
  trust: [
    "Sem custo de adesão e sem meta mínima",
    "Contrato de parceria simples, sem exclusividade",
    "Você pode começar indicando e evoluir depois",
  ],
};
