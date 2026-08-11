import type { FeatureContent } from "./types";

export const properties: FeatureContent = {
  slug: "properties",
  label: "Imóveis e empreendimentos",
  shortLabel: "Imóveis",
  href: "/features/properties",
  accent: "#2D6BE0",
  eyebrow: "Recurso · imóveis e empreendimentos",
  hero: {
    title: "O cadastro do imóvel é a base ",
    titleHighlight: "de tudo que vem depois",
    subtitle:
      "Mídia, documentos e histórico de preço no mesmo registro. Loteamentos e condomínios com torres, lotes, tipologias e tabela de preço, com espelho de vendas por unidade. E captação pelo app, com a foto tirada na hora.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Histórico de preço",
      "Espelho de vendas por unidade",
      "Importação por planilha",
    ],
  },
  keyPoints: [
    {
      title: "Um cadastro que não obriga a completar tudo de uma vez",
      body: "Fotos, plantas, documentos, características e valores ficam no mesmo registro. O imóvel entra com o que você tem na mão e amadurece conforme a captação avança.",
    },
    {
      title: "Histórico de preço, não só o preço atual",
      body: "Cada alteração de valor fica registrada com data. Quando o proprietário pergunta por que o imóvel não vendeu, a conversa começa pelo que já foi testado.",
    },
    {
      title: "Empreendimento com torres, lotes e tipologias",
      body: "Loteamento e condomínio são cadastrados na estrutura real: torres, blocos, lotes e as tipologias que se repetem, cada uma com a sua tabela de preço.",
    },
    {
      title: "Espelho de vendas por unidade",
      body: "O espelho mostra a situação de cada unidade do empreendimento em uma tela. Duas pessoas deixam de vender a mesma unidade porque a planilha estava desatualizada.",
    },
    {
      title: "Importação por planilha, endereço opcional",
      body: "Planilha de imóveis importada com sugestão automática de mapeamento das colunas e relatório do que entrou, linha por linha, no fim do processo.",
    },
    {
      title: "Captação pelo app, dentro do imóvel",
      body: "O corretor cadastra o imóvel durante a visita, com a foto tirada na hora pelo celular. Funciona sem sinal no prédio e sincroniza quando a conexão volta.",
    },
  ],
  keyPointsHeadline: {
    title:
      "Imóvel mal cadastrado contamina o anúncio, o matching e o contrato.",
    subtitle:
      "É o registro que alimenta o catálogo, a sugestão para o cliente e as cláusulas do contrato — errar aqui reaparece em todos eles.",
  },
  modules: [
    {
      title: "Mídia",
      body: "Fotos, plantas e material do imóvel, na ordem em que devem aparecer no anúncio.",
    },
    {
      title: "Documentos",
      body: "Matrícula, IPTU, certidões e autorização de venda presos ao imóvel.",
    },
    {
      title: "Histórico de preço",
      body: "Cada mudança de valor com data, para embasar a conversa com o proprietário.",
    },
    {
      title: "Características",
      body: "Tipologia, área, vagas, atributos e diferenciais que alimentam a busca.",
    },
    {
      title: "Proprietários",
      body: "Um ou vários donos, com o papel de cada um.",
    },
    {
      title: "Espelho de vendas",
      body: "Situação de cada unidade do empreendimento em uma única tela.",
    },
  ],
  modulesHeadline: {
    title: "Tudo sobre o imóvel dentro do imóvel.",
    subtitle:
      "Matrícula, foto, histórico de preço e dono não ficam em três pastas diferentes de um drive compartilhado.",
  },
  benefits: [
    "Imóvel cadastrado uma vez, usado no catálogo, no anúncio e no contrato",
    "Histórico de preço para sustentar a conversa de reposicionamento",
    "Empreendimento estruturado por torre, lote e tipologia, com tabela própria",
    "Espelho de vendas atualizado, sem duas pessoas vendendo a mesma unidade",
    "Carteira antiga importada por planilha, sem digitação item por item",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "Menos retrabalho de cadastro e menos erro que só aparece na hora de fechar.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description:
        "Capta o imóvel na visita, pelo celular, com foto tirada na hora e o cadastro pronto para anunciar no mesmo dia.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "Carteira compartilhada, documentos do imóvel arquivados no registro e importação da base que já existia em planilha.",
    },
    {
      label: "Lançamentos e incorporadoras",
      description:
        "Loteamento e condomínio com torres, lotes e tipologias, tabela de preço por tipologia e espelho de vendas por unidade.",
    },
  ],
  audienceHeadline: {
    title: "Serve para uma casa e para um loteamento inteiro.",
    subtitle:
      "O cadastro simples e a estrutura de empreendimento convivem na mesma carteira.",
  },
  connectsWith: [
    {
      label: "Catálogo público",
      description: "O cadastro alimenta a página do imóvel no seu domínio.",
      href: "/features/property-catalog",
    },
    {
      label: "CRM e negociações",
      description: "As características do imóvel alimentam o matching.",
      href: "/features/crm",
    },
    {
      label: "Campanhas e anúncios Meta",
      description: "O anúncio nasce das fotos e dos dados do cadastro.",
      href: "/features/meta-ads",
    },
    {
      label: "Ferramentas de IA para imagem",
      description: "A foto tratada volta para o cadastro do imóvel.",
      href: "/features/ai-media",
    },
    {
      label: "Vistorias",
      description: "O histórico de vistorias fica no registro do imóvel.",
      href: "/features/inspections",
    },
    {
      label: "MyLar Pro Brokers",
      description: "Captação no celular, com foto na hora e sem sinal.",
      href: "/features/broker-app",
    },
  ],
  connectsWithHeadline: {
    title: "O imóvel é o mesmo registro em todos os módulos.",
    subtitle:
      "Cadastrar uma vez é ter no catálogo, no anúncio, na negociação, na vistoria e no contrato.",
  },
  faq: [
    {
      q: "Consigo importar os imóveis que já tenho em planilha?",
      a: "Sim. A importação aceita CSV e XLSX, com sugestão automática de mapeamento das colunas antes de gravar. O endereço é opcional, então imóvel com cadastro incompleto na planilha antiga não trava o processo.",
    },
    {
      q: "Como funciona o cadastro de loteamento ou condomínio?",
      a: "O empreendimento é cadastrado na estrutura real: torres, blocos, lotes e as tipologias que se repetem, cada tipologia com a sua tabela de preço. As unidades herdam essa configuração em vez de serem cadastradas uma a uma do zero.",
    },
    {
      q: "O que é o espelho de vendas?",
      a: "É a visão da situação de cada unidade do empreendimento em uma única tela. Serve para a equipe saber o que está disponível, reservado ou vendido sem consultar uma planilha paralela.",
    },
    {
      q: "O corretor consegue cadastrar imóvel pelo celular?",
      a: "Sim, pelo MyLar Pro Brokers. A captação acontece dentro do imóvel, com a foto tirada na hora, funciona sem sinal durante a visita e sincroniza quando a conexão volta.",
    },
    {
      q: "Imóvel com mais de um proprietário é suportado?",
      a: "Sim. O imóvel aceita vários donos, com cada vínculo registrado separadamente. No contrato, quem assina em nome dos demais entra com o papel de procurador.",
    },
    {
      q: "O histórico de preço serve para quê?",
      a: "Para sustentar a conversa de reposicionamento. Como cada alteração de valor fica registrada com data, dá para mostrar ao proprietário por quanto tempo o imóvel ficou em cada faixa antes de sugerir uma mudança.",
    },
  ],
  hubCard: {
    description:
      "Cadastro completo com mídia, documentos e histórico de preço, empreendimentos com torres, lotes e tipologias, e espelho de vendas por unidade.",
    highlights: [
      "Histórico de preço com data",
      "Espelho de vendas por unidade",
      "Captação no celular, foto na hora",
    ],
  },
};
