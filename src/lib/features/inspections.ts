import type { FeatureContent } from "./types";

export const inspections: FeatureContent = {
  slug: "inspections",
  label: "Vistorias",
  shortLabel: "Vistorias",
  href: "/features/inspections",
  accent: "#F59E0B",
  eyebrow: "Recurso · vistorias",
  hero: {
    title: "A vistoria de entrada é o contrato ",
    titleHighlight: "que descreve o imóvel",
    subtitle:
      "Entrada, saída e periódica, com checklist por ambiente, fotos, condição de cada item e laudo em PDF assinado pelas partes. Na saída, a comparação é item contra item.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Checklist por ambiente",
      "Fotos por item",
      "Laudo em PDF assinado",
    ],
  },
  keyPoints: [
    {
      title: "Três tipos, um mesmo registro",
      body: "Vistoria de entrada, de saída e periódica seguem o mesmo modelo de checklist. A de saída abre com o estado registrado na entrada ao lado, para comparar item contra item.",
    },
    {
      title: "Checklist por ambiente, não por imóvel",
      body: "Sala, cozinha, cada quarto, banheiro, área externa. Dentro de cada ambiente, os itens que existem ali: pintura, piso, esquadrias, louças, metais, elétrica. Nada fica no genérico.",
    },
    {
      title: "Condição declarada item por item",
      body: "Cada item recebe a condição observada e a observação de quem vistoriou. É a diferença entre desgaste natural do uso e dano que gera cobrança.",
    },
    {
      title: "Foto presa ao item, não solta na pasta",
      body: "As fotos ficam anexadas ao item que documentam, com data. Meses depois, ninguém precisa adivinhar de que parede era aquela imagem.",
    },
    {
      title: "Laudo em PDF assinado pelas partes",
      body: "O laudo consolida ambientes, itens, condições e fotos em um PDF, e vai para assinatura do inquilino e da imobiliária. Assinado, deixa de ser versão de alguém.",
    },
    {
      title: "Feita no celular, dentro do imóvel",
      body: "O corretor preenche o checklist e tira as fotos durante a visita, pelo aplicativo. O laudo não é digitado depois, de memória, no escritório.",
    },
  ],
  keyPointsHeadline: {
    title:
      "Vistoria de entrada bem-feita é o que evita a briga na saída — não a boa vontade das partes.",
    subtitle:
      "Quando não existe registro do estado inicial, a discussão sobre quem pagou a pintura vira palavra contra palavra. E quem administra o imóvel fica no meio.",
  },
  benefits: [
    "Estado do imóvel documentado antes da entrega das chaves",
    "Saída comparada com a entrada, item por item, sem depender da memória",
    "Fotos com data presas ao item que documentam",
    "Laudo em PDF assinado pelas duas partes, com valor probatório",
    "Vistoria periódica que revela o problema antes de virar reforma",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "Menos discussão na devolução das chaves, e retenção de caução com documento em vez de argumento.",
  },
  audience: [
    {
      label: "Imobiliária de locação",
      description:
        "Entrada e saída de cada contrato registradas no mesmo padrão, com laudo assinado arquivado junto ao imóvel.",
    },
    {
      label: "Administradora de carteira",
      description:
        "Vistoria periódica para mostrar ao proprietário o estado real do imóvel sem que ele precise ir até lá.",
    },
    {
      label: "Corretor autônomo",
      description:
        "Checklist no celular durante a visita, laudo gerado na hora e nenhuma prancheta para digitar depois.",
    },
  ],
  audienceHeadline: {
    title: "Quem administra imóvel de outra pessoa precisa de prova.",
    subtitle:
      "A vistoria protege as três pontas: o proprietário, o inquilino e quem intermedeia.",
  },
  connectsWith: [
    {
      label: "Controle de chaves",
      description: "A vistoria de entrada precede a retirada da chave.",
      href: "/features/keys",
    },
    {
      label: "Imóveis",
      description: "O histórico de vistorias fica no cadastro do imóvel.",
      href: "/features/properties",
    },
    {
      label: "Assinatura de contratos",
      description: "O laudo vai para assinatura junto com o contrato.",
      href: "/features/digital-signature",
    },
    {
      label: "Portal do cliente",
      description: "O inquilino consulta o laudo e abre chamado de manutenção.",
      href: "/features/client-portal",
    },
    {
      label: "MyLar Pro Brokers",
      description: "Checklist e fotos preenchidos no imóvel, mesmo sem sinal.",
      href: "/features/broker-app",
    },
  ],
  connectsWithHeadline: {
    title: "A vistoria não vive sozinha.",
    subtitle:
      "Ela abre o ciclo da locação, acompanha o contrato e fecha na devolução da chave.",
  },
  faq: [
    {
      q: "Dá para montar o checklist do jeito da minha operação?",
      a: "Sim. Você define os ambientes e os itens que serão avaliados dentro de cada um, então o checklist de um apartamento de dois quartos não fica igual ao de uma sala comercial.",
    },
    {
      q: "Como a vistoria de saída compara com a de entrada?",
      a: "A vistoria de saída é aberta com a condição registrada na entrada visível ao lado de cada item. O vistoriador informa o estado atual e a diferença fica explícita no laudo, com as fotos das duas datas.",
    },
    {
      q: "O laudo assinado tem valor em uma disputa?",
      a: "O laudo é assinado eletronicamente pelas partes e registra ambientes, itens, condições, observações e fotos com data. É um documento consolidado sobre o estado do imóvel naquele momento, aceito pelas duas pontas por terem assinado.",
    },
    {
      q: "Consigo fazer a vistoria sem internet no imóvel?",
      a: "Sim, pelo MyLar Pro Brokers. O checklist e as fotos são preenchidos offline durante a visita e sincronizam quando a conexão volta, sem risco de perder o trabalho no meio.",
    },
    {
      q: "Para que serve a vistoria periódica?",
      a: "Para acompanhar o imóvel durante a vigência do contrato, em vez de descobrir o problema só na saída. Infiltração e dano estrutural custam menos quando aparecem cedo, e o proprietário recebe o registro sem precisar visitar o imóvel.",
    },
    {
      q: "As fotos ficam guardadas por quanto tempo?",
      a: "As fotos ficam anexadas aos itens da vistoria e o histórico permanece no cadastro do imóvel, disponível para consulta em contratos futuros do mesmo imóvel.",
    },
  ],
  hubCard: {
    description:
      "Vistoria de entrada, saída e periódica com checklist por ambiente, condição de cada item, fotos com data e laudo em PDF assinado pelas partes.",
    highlights: [
      "Saída comparada com a entrada, item por item",
      "Fotos presas ao item que documentam",
      "Preenchida no celular, dentro do imóvel",
    ],
  },
};
