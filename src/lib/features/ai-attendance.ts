import type { FeatureContent } from "./types";

export const aiAttendance: FeatureContent = {
  slug: "ai-attendance",
  label: "IA no atendimento",
  shortLabel: "IA no atendimento",
  href: "/features/ai-attendance",
  accent: "#8B5CF6",
  eyebrow: "Recurso · primeira resposta",
  hero: {
    title: "O lead escreveu às 23h40. ",
    titleHighlight: "Alguém respondeu às 23h40",
    subtitle:
      "Primeira resposta em segundos, qualificação antes de chegar ao corretor, resumo da conversa e sugestão de resposta dentro do inbox. Sem lead esfriando de madrugada ou no domingo.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Atendimento 24 horas",
      "Qualificação antes do corretor",
      "Passa para humano quando precisa",
    ],
  },
  keyPoints: [
    {
      title: "Primeira resposta em segundos",
      body: "A mensagem chega e a IA responde na hora, com o dado real do imóvel que o cliente citou. O lead que mandou mensagem para três imobiliárias fala primeiro com a sua.",
    },
    {
      title: "Qualificação antes de ocupar o corretor",
      body: "A IA pergunta o que precisa saber — se é compra ou locação, região, faixa de valor, prazo, forma de pagamento — e entrega a conversa já organizada. O corretor entra com o contexto pronto.",
    },
    {
      title: "Atendimento de madrugada e de fim de semana",
      body: "A maior parte da busca por imóvel acontece fora do horário comercial. O lead que escreve no sábado à noite não espera até segunda para saber se o imóvel está disponível.",
    },
    {
      title: "Resumo da conversa para quem assume",
      body: "Quando o corretor pega o atendimento, recebe em poucas linhas o que o cliente quer, o que já foi respondido e o que ficou pendente. Ninguém pede para o cliente repetir.",
    },
    {
      title: "Sugestão de resposta dentro do inbox",
      body: "Mesmo depois de passar para humano, a IA continua ali: sugere o texto a partir do fio da conversa e o corretor envia com um clique ou ajusta antes.",
    },
    {
      title: "Passa a bola quando o assunto sai do roteiro",
      body: "Negociação de valor, condição especial, reclamação. Quando o assunto passa do que a IA deve tratar, ela transfere para o corretor responsável e avisa.",
    },
  ],
  keyPointsHeadline: {
    title: "Lead imobiliário tem prazo de validade de minutos.",
    subtitle:
      "Quem responde primeiro conduz a conversa. Fora do horário comercial, responder primeiro só é possível com atendimento automático.",
  },
  benefits: [
    "Nenhum lead sem resposta, em qualquer hora e qualquer dia",
    "Corretor recebe o lead já qualificado, não a mensagem crua",
    "Conversa entregue com resumo, sem pedir para o cliente repetir",
    "Resposta sugerida no inbox depois que o humano assume",
    "Transferência automática quando o assunto sai do roteiro",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "O tempo até a primeira resposta deixa de depender de alguém estar acordado e olhando o celular.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description:
        "Cobre o horário em que você não pode responder — visita, reunião, madrugada — sem perder o lead para quem respondeu antes.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "Triagem antes da distribuição: o corretor só recebe o lead que já disse o que quer, e o gestor vê o tempo real de primeira resposta.",
    },
    {
      label: "Administradora de locação",
      description:
        "Dúvida repetida de inquilino — segunda via, valor da fatura, como abrir chamado — resolvida sem ocupar a equipe.",
    },
  ],
  audienceHeadline: {
    title: "Cobre o horário e o volume que a equipe não cobre.",
    subtitle:
      "A IA não substitui o atendimento humano — ela garante que ninguém fique sem resposta esperando por ele.",
  },
  connectsWith: [
    {
      label: "Canais de atendimento",
      description: "A IA atende dentro do mesmo inbox de WhatsApp e e-mail.",
      href: "/features/channels",
    },
    {
      label: "CRM e negociações",
      description: "O lead qualificado entra no funil e vai para um corretor.",
      href: "/features/crm",
    },
    {
      label: "Mila e ferramentas de IA",
      description: "O mesmo copiloto que sugere o próximo passo da negociação.",
      href: "/features/ai",
    },
    {
      label: "Campanhas e anúncios Meta",
      description: "O lead do anúncio recebe resposta no minuto em que chega.",
      href: "/features/meta-ads",
    },
    {
      label: "Imóveis e empreendimentos",
      description: "A resposta usa preço, foto e disponibilidade do cadastro.",
      href: "/features/properties",
    },
    {
      label: "Agenda e tarefas",
      description: "A visita combinada na conversa entra no calendário.",
      href: "/features/schedule",
    },
  ],
  connectsWithHeadline: {
    title: "Atender é só o começo do fluxo.",
    subtitle:
      "A conversa vira lead, o lead vira negociação e a visita vira compromisso na agenda — sem ninguém copiar dado de uma tela para outra.",
  },
  faq: [
    {
      q: "O cliente sabe que está falando com uma IA?",
      a: "A identificação é configurável e recomendamos manter. Na prática, o cliente percebe que a resposta veio rápida e completa, e a transferência para o corretor acontece assim que o assunto pede alguém do time.",
    },
    {
      q: "A IA pode dar informação errada sobre o imóvel?",
      a: "Ela responde a partir do cadastro do imóvel na sua base — preço, características e disponibilidade. Quando a informação não existe no cadastro, ela não inventa: registra a dúvida e passa para o corretor.",
    },
    {
      q: "Quando o atendimento passa para uma pessoa?",
      a: "Quando o assunto sai do roteiro de qualificação: negociação de valor, condição especial, reclamação ou pedido explícito do cliente para falar com alguém. A conversa é transferida com o resumo do que já aconteceu.",
    },
    {
      q: "Dá para usar só fora do horário comercial?",
      a: "Dá. Você define em quais janelas a IA atende sozinha e em quais ela só sugere resposta para o corretor. Muita gente começa cobrindo noite e fim de semana.",
    },
    {
      q: "Qual a diferença entre isso e a Mila copiloto?",
      a: "É a mesma inteligência em dois papéis. Na IA no atendimento ela fala com o cliente e qualifica o lead. No copiloto ela fala com o corretor, sugerindo o próximo passo e escrevendo o texto para ele enviar.",
    },
    {
      q: "O que acontece com o lead depois da qualificação?",
      a: "Ele entra no funil do CRM com as respostas registradas e segue a regra de distribuição da sua operação — rodízio, disponibilidade ou origem da campanha — com prazo de resposta e escalação.",
    },
  ],
  hubCard: {
    description:
      "Primeira resposta em segundos, qualificação do lead antes de chegar ao corretor, resumo da conversa e sugestão de resposta dentro do inbox.",
    highlights: [
      "Atendimento 24 horas, todos os dias",
      "Lead qualificado antes da distribuição",
      "Transferência para humano com resumo",
    ],
  },
};
