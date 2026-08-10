import type { FeatureContent } from "./types";

export const keys: FeatureContent = {
  slug: "keys",
  label: "Controle de chaves",
  shortLabel: "Chaves",
  href: "/features/keys",
  accent: "#64748B",
  eyebrow: "Recurso · controle de chaves",
  hero: {
    title: "Quem pegou a chave, de qual imóvel ",
    titleHighlight: "e quando devolveu",
    subtitle:
      "Retirada e devolução registradas, com histórico por chave. Um módulo pequeno que resolve a pergunta que trava a visita da tarde.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Retirada e devolução",
      "Histórico por chave",
      "Chave ligada ao imóvel",
    ],
  },
  keyPoints: [
    {
      title: "A chave pertence ao imóvel",
      body: "Cada chave fica vinculada ao imóvel que abre. Procurar pelo imóvel é ver a chave dele, sem depender de etiqueta escrita à mão no quadro.",
    },
    {
      title: "Retirada registrada com responsável",
      body: "Na saída, fica gravado quem levou a chave e quando. A responsabilidade tem nome e data em vez de virar uma conversa sobre quem foi o último a mexer.",
    },
    {
      title: "Devolução fecha o ciclo",
      body: "A chave só sai da situação de emprestada quando a devolução é registrada. O que está fora aparece como fora, e não some da vista.",
    },
    {
      title: "Histórico por chave",
      body: "Toda a movimentação daquela chave fica acumulada: cada retirada, cada devolução e quem esteve com ela. Quando uma chave desaparece, existe um rastro.",
    },
    {
      title: "Chave em uso é chave que não pode ser prometida",
      body: "Antes de marcar a visita, dá para saber se a chave está no escritório. Menos cliente esperando na porta de um imóvel que ninguém consegue abrir.",
    },
  ],
  keyPointsHeadline: {
    title:
      "Chave perdida custa chaveiro, custa a visita e custa a confiança do proprietário.",
    subtitle:
      "O controle no quadro da parede funciona até a primeira pessoa que sai com a chave no bolso e esquece de avisar.",
  },
  benefits: [
    "Responsável identificado em cada retirada, com data",
    "Chave emprestada visível antes de marcar a próxima visita",
    "Devolução registrada, sem chave que fica em aberto para sempre",
    "Histórico de movimentação por chave, com rastro em caso de perda",
    "Chave vinculada ao imóvel, encontrada pelo cadastro dele",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "Menos visita cancelada na porta do imóvel e menos cópia de chave feita às pressas.",
  },
  audience: [
    {
      label: "Imobiliária de locação",
      description:
        "Chaves de vários imóveis circulando entre corretores, com a situação de cada uma visível no escritório.",
    },
    {
      label: "Administradora de carteira",
      description:
        "Prestação de contas ao proprietário sobre quem teve acesso ao imóvel dele e quando.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "Retirada registrada com responsável, evitando a conversa sobre quem levou a chave e não devolveu.",
    },
  ],
  audienceHeadline: {
    title: "Quem guarda a chave de imóvel de outra pessoa precisa de registro.",
    subtitle:
      "É um módulo simples porque o problema é simples — e caro quando ninguém controla.",
  },
  connectsWith: [
    {
      label: "Imóveis e empreendimentos",
      description: "A chave fica vinculada ao cadastro do imóvel.",
      href: "/features/properties",
    },
    {
      label: "Vistorias",
      description: "A vistoria de entrada precede a entrega da chave.",
      href: "/features/inspections",
    },
    {
      label: "Agenda e tarefas",
      description: "Conferir a chave antes de confirmar a visita agendada.",
      href: "/features/schedule",
    },
    {
      label: "CRM e negociações",
      description: "A visita da negociação depende da chave disponível.",
      href: "/features/crm",
    },
  ],
  connectsWithHeadline: {
    title: "A chave aparece no meio do ciclo da locação.",
    subtitle:
      "Ela liga o imóvel, a vistoria e a visita — e é onde o processo trava quando ninguém sabe onde ela está.",
  },
  faq: [
    {
      q: "O que exatamente fica registrado?",
      a: "A retirada, com o responsável e a data, e a devolução quando ela acontece. Cada chave acumula esse histórico de movimentação, vinculada ao imóvel que abre.",
    },
    {
      q: "Consigo saber se a chave está no escritório agora?",
      a: "Sim. A chave que foi retirada e não devolvida aparece como emprestada, com quem está. É a consulta que evita marcar visita para um imóvel cuja chave está na rua.",
    },
    {
      q: "A chave fica ligada ao imóvel?",
      a: "Fica. O vínculo é com o cadastro do imóvel, então você chega à chave pelo imóvel e vê o histórico dela junto do resto do registro.",
    },
    {
      q: "Serve para imóvel com mais de uma chave?",
      a: "Sim. O controle é por chave, e cada uma tem a sua própria movimentação registrada, mesmo quando pertencem ao mesmo imóvel.",
    },
    {
      q: "Ajuda se uma chave desaparecer?",
      a: "Ajuda porque existe um rastro: o histórico mostra a sequência de retiradas e devoluções e quem foi o último responsável registrado. Não impede a perda, mas encerra a discussão sobre onde ela começou.",
    },
  ],
  hubCard: {
    description:
      "Retirada e devolução de chaves registradas com responsável e data, vinculadas ao imóvel, com histórico de movimentação por chave.",
    highlights: [
      "Responsável e data em cada retirada",
      "Chave emprestada visível na hora",
      "Histórico completo por chave",
    ],
  },
};
