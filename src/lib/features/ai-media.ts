import type { FeatureContent } from "./types";

export const aiMedia: FeatureContent = {
  slug: "ai-media",
  label: "Ferramentas de IA para imagem",
  shortLabel: "IA para imagem",
  href: "/features/ai-media",
  accent: "#A855F7",
  eyebrow: "Recurso · ferramentas de IA para imagem",
  hero: {
    title: "O imóvel entra no ar apresentável ",
    titleHighlight: "sem sessão de fotos profissional",
    subtitle:
      "Mobiliar digitalmente um ambiente vazio, corrigir a iluminação de uma foto ruim, gerar a descrição do anúncio e a legenda para as redes sociais. A imagem gerada pode ser salva de volta no cadastro do imóvel.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Mobiliar ambiente vazio",
      "Uma foto por vez, em segundos",
      "Salva no cadastro do imóvel",
    ],
  },
  keyPoints: [
    {
      title: "Ambiente vazio mobiliado digitalmente",
      body: "A sala sem móvel não comunica tamanho nem uso. A ferramenta insere mobília no ambiente vazio para que quem vê o anúncio entenda como se mora ali.",
    },
    {
      title: "Foto ruim com iluminação corrigida",
      body: "Foto tirada contra a janela, quarto escuro, cozinha sem luz natural. A correção de iluminação recupera a imagem que já existe em vez de exigir uma nova visita ao imóvel.",
    },
    {
      title: "Descrição do anúncio gerada a partir do imóvel",
      body: "O texto sai das características já cadastradas: tipologia, área, atributos e localização. Você revisa e ajusta, em vez de encarar o campo em branco.",
    },
    {
      title: "Legenda para as redes sociais",
      body: "A mesma base gera a legenda para publicar no Instagram e no Facebook, com o tom de post e não de ficha técnica.",
    },
    {
      title: "Lote de imagens de uma vez",
      body: "Você escolhe a foto, o resultado volta em segundos e você aprova antes de salvar no imóvel. Nada é publicado sem a sua conferência.",
    },
    {
      title: "Resultado salvo de volta no imóvel",
      body: "A imagem gerada e o texto podem ser gravados no cadastro do imóvel. Não fica um arquivo baixado na pasta de downloads de alguém para ser reenviado depois.",
    },
  ],
  keyPointsHeadline: {
    title:
      "A primeira foto decide se o anúncio é clicado — e ela raramente é profissional.",
    subtitle:
      "Contratar fotógrafo para cada captação não escala. O imóvel acaba no ar com a foto do celular, tirada correndo, contra a luz.",
  },
  benefits: [
    "Imóvel anunciado no dia da captação, sem esperar por fotógrafo",
    "Ambiente vazio que passa a comunicar tamanho e uso",
    "Foto ruim de imóvel tratada em segundos, sem editor nem fotógrafo",
    "Descrição e legenda prontas para revisar em vez de escrever do zero",
    "Imagem e texto gravados no cadastro do imóvel, prontos para o catálogo",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "O tempo entre captar o imóvel e ele estar publicado com aparência decente encurta para o mesmo dia.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description:
        "Tira as fotos com o celular na visita, trata na plataforma e publica no mesmo dia, sem custo de produção.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "Padrão visual parecido em toda a carteira, sem depender de agenda de fotógrafo para cada captação.",
    },
    {
      label: "Lançamentos e incorporadoras",
      description:
        "Unidade na planta ou entregue vazia apresentada mobiliada, com descrição e legenda por tipologia.",
    },
  ],
  audienceHeadline: {
    title: "Serve para quem não tem estúdio.",
    subtitle:
      "Quem já contrata produção usa para os imóveis que não justificam o custo — e são a maioria da carteira.",
  },
  connectsWith: [
    {
      label: "Imóveis e empreendimentos",
      description: "A imagem gerada volta para o cadastro do imóvel.",
      href: "/features/properties",
    },
    {
      label: "Catálogo público",
      description: "A foto tratada é a que aparece na página do imóvel.",
      href: "/features/property-catalog",
    },
    {
      label: "Campanhas e anúncios Meta",
      description: "A imagem e a legenda alimentam o anúncio da campanha.",
      href: "/features/meta-ads",
    },
    {
      label: "Mila",
      description: "A mesma IA que ajuda no funil trata o material do imóvel.",
      href: "/features/ai",
    },
    {
      label: "MyLar Pro Brokers",
      description: "Foto tirada na captação, tratada em seguida.",
      href: "/features/broker-app",
    },
  ],
  connectsWithHeadline: {
    title: "A imagem tratada não termina em um download.",
    subtitle:
      "Ela volta ao cadastro do imóvel e segue para o catálogo e para o anúncio, sem passar por pasta compartilhada.",
  },
  faq: [
    {
      q: "O que a mobília digital faz exatamente?",
      a: "Insere móveis em um ambiente fotografado vazio, para que o anúncio comunique proporção e uso do espaço. É recurso de apresentação e não substitui a informação real sobre o que o imóvel entrega.",
    },
    {
      q: "Preciso de foto boa para começar?",
      a: "Não. A correção de iluminação existe justamente para as fotos tiradas no celular, contra a luz ou em ambiente escuro. O ponto de partida costuma ser a foto que o corretor já tem.",
    },
    {
      q: "Consigo tratar todas as fotos do imóvel de uma vez?",
      a: "Quantas você quiser, uma por vez. Cada execução consome saldo da carteira de IA, então você trata só as fotos que realmente precisam.",
    },
    {
      q: "A imagem gerada fica salva no sistema?",
      a: "Pode ser salva de volta no cadastro do imóvel, junto das outras mídias. Isso a torna disponível para o catálogo e para o anúncio sem reenvio manual.",
    },
    {
      q: "A descrição gerada sai pronta para publicar?",
      a: "Ela sai como ponto de partida, construída a partir das características cadastradas do imóvel. A revisão é sua, e é onde entra o que só quem visitou o imóvel sabe.",
    },
    {
      q: "A legenda de rede social é diferente da descrição do anúncio?",
      a: "Sim. A descrição serve à página do imóvel, com informação estruturada. A legenda é escrita para o feed, mais curta e com tom de publicação, a partir da mesma base de dados do imóvel.",
    },
  ],
  hubCard: {
    description:
      "Mobiliar digitalmente um ambiente vazio, corrigir a iluminação da foto e gerar a descrição do anúncio, com legenda para redes sociais.",
    highlights: [
      "Ambiente vazio mobiliado digitalmente",
      "Foto tratada e salva de volta no imóvel",
      "Imagem salva de volta no imóvel",
    ],
  },
};
