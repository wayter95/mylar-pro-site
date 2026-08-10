import type { FeatureContent } from "./types";

export const metaAds: FeatureContent = {
  slug: "meta-ads",
  label: "Campanhas e anúncios Meta",
  shortLabel: "Meta Ads",
  href: "/features/meta-ads",
  accent: "#0866FF",
  eyebrow: "Recurso · campanhas e anúncios Meta",
  hero: {
    title: "O anúncio no Facebook e no Instagram ",
    titleHighlight: "cria o lead direto no funil",
    subtitle:
      "Campanha criada de dentro da plataforma, com segmentação geográfica, público por interesse e formulário de cadastro que cai no CRM. O lead entra classificado pela origem, no funil daquela campanha, com o custo por lead visível.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Facebook e Instagram",
      "Lead ads direto no CRM",
      "ROI por campanha",
    ],
  },
  keyPoints: [
    {
      title: "Campanha criada sem sair da plataforma",
      body: "Você conecta a conta de anúncios e a Página, define objetivo, público e segmentação e publica. Não existe a ida ao Gerenciador de Anúncios para configurar e a volta para conferir o resultado.",
    },
    {
      title: "O lead cai no CRM já classificado",
      body: "O formulário de cadastro do Meta entrega o lead direto no funil, com a campanha e o anúncio de origem gravados. Ninguém baixa planilha do Gerenciador nem copia contato à mão.",
    },
    {
      title: "Funil próprio para a campanha",
      body: "Cada campanha pode ter o seu funil, com as etapas que fazem sentido para aquele público. Lead de lançamento não segue o mesmo caminho do lead de locação.",
    },
    {
      title: "Segmentação por região e por interesse",
      body: "Você escolhe cidades e raio de alcance e cruza com públicos por interesse. Anunciar um imóvel para quem está a três bairros dele é diferente de anunciar para a cidade inteira.",
    },
    {
      title: "Anúncio gerado a partir do cadastro do imóvel",
      body: "O imóvel já tem fotos, endereço, tipologia e descrição. O anúncio nasce desse cadastro, em vez de ser montado de novo em outra ferramenta.",
    },
    {
      title: "Retorno por campanha, incluindo locação",
      body: "A plataforma mostra o custo por lead e liga o investimento aos fechamentos que vieram daquela campanha. Locação também entra na conta, não só venda.",
    },
  ],
  keyPointsHeadline: {
    title:
      "Investir em anúncio sem ligar o lead ao fechamento é decidir no escuro.",
    subtitle:
      "Sem a origem gravada no funil, ninguém sabe qual campanha trouxe cliente e qual só trouxe volume — e a verba do mês seguinte é chute.",
  },
  benefits: [
    "Lead do anúncio no funil em tempo real, com a origem gravada",
    "Campanha publicada sem alternar entre plataforma e Gerenciador de Anúncios",
    "Funil separado por campanha, com as etapas daquele público",
    "Custo por lead visível ao lado dos leads que a campanha gerou",
    "Retorno medido por campanha, com locação na mesma conta que venda",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "A verba passa a ser distribuída pelo que fechou, não pela campanha que pareceu ter ido bem.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description:
        "Anuncia o imóvel da carteira em poucos passos e recebe o lead no funil, sem intermediário e sem depender de agência.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "Campanha por região ou por tipo de imóvel, lead distribuído automaticamente ao corretor e retorno comparado entre campanhas.",
    },
    {
      label: "Lançamentos e incorporadoras",
      description:
        "Funil próprio por empreendimento, público segmentado por região do projeto e custo por lead acompanhado durante toda a campanha.",
    },
  ],
  audienceHeadline: {
    title: "Serve para quem anuncia um imóvel e para quem anuncia cem.",
    subtitle:
      "A diferença está no volume de campanhas, não na complexidade de configurar cada uma.",
  },
  connectsWith: [
    {
      label: "CRM e negociações",
      description: "O lead do anúncio entra no funil com a origem gravada.",
      href: "/features/crm",
    },
    {
      label: "Imóveis e empreendimentos",
      description: "O anúncio sai das fotos e dos dados do cadastro do imóvel.",
      href: "/features/properties",
    },
    {
      label: "Canais de atendimento",
      description: "A primeira resposta ao lead sai pelo WhatsApp do inbox.",
      href: "/features/channels",
    },
    {
      label: "IA no atendimento",
      description: "A IA responde e qualifica o lead do anúncio na hora.",
      href: "/features/ai-attendance",
    },
    {
      label: "Ferramentas de IA para imagem",
      description: "A foto do anúncio pode ser tratada antes de subir.",
      href: "/features/ai-media",
    },
    {
      label: "Catálogo público",
      description: "O anúncio leva para a página do imóvel no seu domínio.",
      href: "/features/property-catalog",
    },
  ],
  connectsWithHeadline: {
    title: "A campanha não termina no clique.",
    subtitle:
      "Anúncio, lead, atendimento e fechamento são o mesmo fluxo — por isso dá para saber o que cada campanha rendeu.",
  },
  faq: [
    {
      q: "Preciso ter conta de anúncios e Página no Meta?",
      a: "Sim. Você conecta a conta de anúncios e a Página do Facebook vinculada ao Instagram, e a plataforma passa a criar as campanhas nessa conta. A verba continua sendo cobrada pelo Meta, na sua própria conta.",
    },
    {
      q: "O lead do formulário chega em quanto tempo?",
      a: "O lead entra no funil assim que é enviado, sem exportação manual. A campanha e o anúncio de origem ficam gravados no registro, então a distribuição automática do CRM já pode usar essa informação como regra.",
    },
    {
      q: "Consigo anunciar para uma região específica?",
      a: "Sim. A segmentação geográfica permite escolher cidades e o raio de alcance, e você combina isso com públicos por interesse. É o que separa anunciar para o bairro do imóvel de anunciar para o estado.",
    },
    {
      q: "Dá para medir o retorno de campanha de locação?",
      a: "Dá. O acompanhamento de retorno considera tanto venda quanto locação, então uma campanha de aluguel não fica sem número só porque o fechamento tem outra natureza.",
    },
    {
      q: "O anúncio precisa ser criado do zero?",
      a: "Não. Como o imóvel já está cadastrado com fotos, endereço, tipologia e descrição, o anúncio parte desse conteúdo. Você ajusta o que quiser antes de publicar.",
    },
    {
      q: "Consigo separar os leads de cada campanha?",
      a: "Sim. Cada campanha pode ter o seu próprio funil, com as etapas apropriadas para aquele público, e o lead entra no funil correspondente já classificado pela origem.",
    },
  ],
  hubCard: {
    description:
      "Campanha do Facebook e Instagram criada de dentro da plataforma, com formulário de cadastro que entrega o lead direto no funil e retorno medido por campanha.",
    highlights: [
      "Lead classificado pela origem, sem planilha",
      "Segmentação geográfica e por interesse",
      "ROI por campanha, incluindo locação",
    ],
  },
};
