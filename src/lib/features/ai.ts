import type { FeatureContent } from "./types";

export const ai: FeatureContent = {
  slug: "ai",
  label: "Mila e ferramentas de IA",
  shortLabel: "Mila e IA",
  href: "/features/ai",
  accent: "#7C3AED",
  eyebrow: "Recurso · inteligência artificial",
  hero: {
    title: "A Mila trabalha ao lado do corretor, ",
    titleHighlight: "não no lugar dele",
    subtitle:
      "Um copiloto que conhece a carteira: sugere o próximo passo da negociação, escreve a resposta ao lead, resume a conversa e encontra o imóvel certo para o cliente certo.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Lê a sua carteira, não a internet",
      "Sugere, quem envia é você",
      "Dentro do CRM e do inbox",
    ],
  },
  keyPoints: [
    {
      title: "Conhece a sua carteira",
      body: "A Mila lê os imóveis, os clientes, as negociações e o histórico de conversa da sua organização. A resposta vem com o número do contrato e o nome do imóvel, não com uma frase genérica sobre mercado imobiliário.",
    },
    {
      title: "Próximo passo de cada negociação",
      body: "Ela olha o funil e aponta o que está travando: falta o comprovante de renda, a visita não foi marcada, a contraproposta ficou sem resposta há cinco dias. E propõe a ação.",
    },
    {
      title: "Resposta ao lead escrita antes de você digitar",
      body: "A IA de atendimento responde o lead dentro do inbox e, quando o assunto sai do que ela pode resolver, transfere para o corretor com o motivo registrado.",
    },
    {
      title: "Resumo de conversa longa em poucas linhas",
      body: "Quem assume um atendimento no meio não precisa rolar duzentas mensagens. O resumo diz o que o cliente quer, o que já foi combinado e o que ficou pendente.",
    },
    {
      title: "Cliente certo para o imóvel certo",
      body: "A Mila cruza as preferências do cliente com a carteira e explica o encaixe critério por critério. E faz o caminho inverso: para um imóvel novo, quem da base já demonstrou interesse compatível.",
    },
    {
      title: "Analisa o template de contrato e sugere as variáveis",
      body: "Você importa o modelo em DOCX que a imobiliária já usa e a Mila lê o texto, identifica os trechos que mudam a cada contrato e sugere as variáveis correspondentes. O template entra pronto para preencher sozinho.",
    },
  ],
  keyPointsHeadline: {
    title: "IA que fecha negócio é IA que conhece o imóvel do lado.",
    subtitle:
      "Um assistente genérico escreve texto bonito e erra o preço. A Mila responde a partir dos seus dados — carteira, funil, contratos e conversas.",
  },
  modules: [
    {
      title: "Copiloto no CRM",
      body: "Pergunta sobre a negociação, resposta com o que falta e a ação sugerida.",
    },
    {
      title: "Sugestão de resposta",
      body: "Texto pronto no inbox, a partir do histórico real da conversa.",
    },
    {
      title: "Resumo de atendimento",
      body: "Conversa longa condensada no que importa, para quem assume depois.",
    },
    {
      title: "Matching explicado",
      body: "Quais critérios do cliente o imóvel atende, e quais não atende.",
    },
    {
      title: "Templates de contrato",
      body: "Importa o DOCX, identifica os trechos variáveis e sugere as variáveis.",
    },
    {
      title: "Descrição de anúncio",
      body: "Texto do imóvel gerado a partir do cadastro e salvo de volta nele.",
    },
    {
      title: "Foto do imóvel",
      body: "Mobiliar ambiente vazio e corrigir iluminação ruim.",
    },
    {
      title: "Legenda para social",
      body: "Post do imóvel escrito com o tom que você escolher.",
    },
  ],
  modulesHeadline: {
    title: "A IA aparece onde o trabalho acontece.",
    subtitle:
      "Não é um chat separado que você abre de vez em quando — é uma sugestão dentro da tela em que você já estava.",
  },
  benefits: [
    "Sabe o que fazer em cada negociação sem reler o histórico inteiro",
    "Primeira resposta ao lead em segundos, a qualquer hora do dia",
    "Atendimento assumido no meio sem pedir para o cliente repetir",
    "Imóvel sugerido com o motivo do encaixe, critério por critério",
    "Template de contrato pronto para preencher sem mapear variável à mão",
  ],
  benefitsHeadline: {
    title: "O que muda no dia do corretor.",
    subtitle:
      "O tempo que ia para reler conversa, escrever texto e procurar imóvel na base volta para a negociação.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description:
        "Um copiloto que faz o trabalho de escritório: escreve a resposta, redige a descrição do anúncio e lembra o que ficou pendente.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "Padrão de atendimento parecido entre corretores diferentes, porque todos partem da mesma sugestão em vez do improviso de cada um.",
    },
    {
      label: "Administradora de locação",
      description:
        "Template de contrato analisado na importação e resumo de chamado longo para quem atende o inquilino.",
    },
  ],
  audienceHeadline: {
    title: "Serve para quem está sozinho e para quem coordena um time.",
    subtitle:
      "A Mila sempre trabalha com os dados da organização em que você está — o que ela vê depende da sua permissão.",
  },
  connectsWith: [
    {
      label: "CRM e negociações",
      description: "O próximo passo sugerido dentro da negociação.",
      href: "/features/crm",
    },
    {
      label: "Canais de atendimento",
      description: "Resposta sugerida e resumo no próprio inbox.",
      href: "/features/channels",
    },
    {
      label: "IA no atendimento",
      description: "Primeira resposta e qualificação antes do corretor entrar.",
      href: "/features/ai-attendance",
    },
    {
      label: "Ferramentas de IA para mídia",
      description: "Foto mobiliada, iluminação corrigida e descrição do anúncio.",
      href: "/features/ai-media",
    },
    {
      label: "MyLar Score",
      description: "Consulta de crédito registrada no cadastro do cliente.",
      href: "/features/mylar-score",
    },
    {
      label: "Assinatura de contratos",
      description: "Template importado com as variáveis já sugeridas.",
      href: "/features/digital-signature",
    },
  ],
  connectsWithHeadline: {
    title: "A Mila não vive em uma aba separada.",
    subtitle:
      "Ela lê e escreve nos mesmos registros do CRM, do inbox e dos contratos — por isso a sugestão vem com dado concreto.",
  },
  faq: [
    {
      q: "A Mila responde o cliente sozinha?",
      a: "No copiloto, não. Ela escreve a sugestão e você decide se envia, edita ou descarta. Se você quiser que ela atenda automaticamente a primeira mensagem, isso é configurado na IA no atendimento.",
    },
    {
      q: "De onde vêm as informações que ela usa?",
      a: "Dos dados da sua organização: imóveis, clientes, negociações, contratos e histórico de conversa. Ela não inventa imóvel que não está na carteira nem cliente que não está na base.",
    },
    {
      q: "A Mila enxerga dados de outra imobiliária?",
      a: "Não. Cada organização é isolada, e dentro dela a Mila respeita a permissão do usuário. Um corretor restrito à própria carteira recebe respostas limitadas à própria carteira.",
    },
    {
      q: "Como funciona a análise do template de contrato?",
      a: "Você importa o modelo em DOCX que já usa. A Mila lê o texto, identifica os trechos que mudam de contrato para contrato — nome, valor, prazo, endereço — e sugere as variáveis. Você confirma ou ajusta antes de salvar o template.",
    },
    {
      q: "O corretor precisa aprender a escrever prompt?",
      a: "Não. As ações principais são botões dentro da tela: sugerir resposta, resumir conversa, gerar descrição, analisar negociação. Quem quiser pode conversar em texto livre, mas não é obrigatório.",
    },
    {
      q: "A Mila funciona no aplicativo do corretor?",
      a: "As ações do copiloto ficam disponíveis nos mesmos registros que o app acessa, então o corretor consegue usar sugestão de resposta e consulta à carteira durante a visita.",
    },
  ],
  hubCard: {
    description:
      "Copiloto de IA que conhece a carteira: sugere o próximo passo da negociação, escreve a resposta ao lead, resume conversas e analisa templates de contrato.",
    highlights: [
      "Próximo passo de cada negociação",
      "Resposta e resumo dentro do inbox",
      "Template de contrato com variáveis sugeridas",
    ],
  },
};
