import type { FeatureContent } from "./types";

export const channels: FeatureContent = {
  slug: "channels",
  label: "Canais de atendimento",
  shortLabel: "Canais",
  href: "/features/channels",
  accent: "#10a892",
  eyebrow: "Recurso · atendimento",
  hero: {
    title: "Quando o corretor sai do time, ",
    titleHighlight: "a conversa não sai com ele",
    subtitle:
      "WhatsApp e e-mail no mesmo inbox, com o histórico mesclado por cliente e sincronizado em tempo real. O número é da imobiliária, não do aparelho de quem atendeu.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "WhatsApp oficial",
      "Histórico que fica na empresa",
      "Tempo real por WebSocket",
    ],
  },
  keyPoints: [
    {
      title: "Um inbox, dois canais",
      body: "WhatsApp e e-mail aparecem no mesmo fio de conversa, na ordem em que aconteceram. Ninguém precisa abrir três telas para entender o que já foi combinado.",
    },
    {
      title: "A conversa é da imobiliária",
      body: "O número é conectado à organização, não ao celular do corretor. Se alguém sai do time, o histórico continua ligado ao lead, ao contrato e ao imóvel.",
    },
    {
      title: "Templates para o que se repete",
      body: "Mensagens padrão de WhatsApp e e-mail para os momentos previsíveis: confirmação de visita, envio de ficha, cobrança de documento. Sempre com o mesmo texto aprovado.",
    },
    {
      title: "Broadcast para a carteira inteira",
      body: "Envio em massa por WhatsApp ou e-mail usando os templates cadastrados. É o caminho para avisar de um lançamento, de um reajuste ou de uma mudança de política sem mandar mensagem uma por uma.",
    },
    {
      title: "Chamados categorizados e priorizados",
      body: "Manutenção, faturamento, contrato ou reclamação. O inquilino abre pelo portal, o chamado entra com categoria e prioridade, e as mensagens ficam no mesmo lugar do status.",
    },
    {
      title: "Régua de cobrança de 15 disparos",
      body: "Avisos automáticos de 30 dias antes do vencimento até 15 dias depois. Você liga e desliga cada disparo por canal, e ninguém precisa lembrar de nenhum.",
    },
  ],
  keyPointsHeadline: {
    title: "Histórico no celular de uma pessoa é histórico que a empresa não tem.",
    subtitle:
      "O que foi combinado com o cliente precisa sobreviver a férias, troca de corretor e desligamento — sem depender de alguém repassar print.",
  },
  benefits: [
    "WhatsApp e e-mail no mesmo histórico, sem trocar de tela para reconstruir o combinado",
    "Conversa presa ao cliente e ao imóvel, não ao aparelho de quem atendeu",
    "Comunicado para uma carteira inteira em um envio, com template aprovado",
    "Chamado do inquilino entra categorizado, com prioridade e status visíveis",
    "Cobrança avisada 15 vezes de forma automática, pelos mesmos canais do atendimento",
  ],
  benefitsHeadline: {
    title: "O que muda na operação.",
    subtitle:
      "Menos mensagem perdida, menos cliente repetindo o que já disse e menos aviso de vencimento mandado à mão.",
  },
  audience: [
    {
      label: "Corretor autônomo",
      description:
        "Separa a conversa de trabalho da pessoal sem carregar dois celulares, e responde pelo app ou pelo painel.",
    },
    {
      label: "Imobiliária com equipe",
      description:
        "O gestor vê o tempo de resposta, quem está atendendo o quê e quais conversas ficaram paradas.",
    },
    {
      label: "Administradora de locação",
      description:
        "Chamado, cobrança e aviso de reajuste saem pelos mesmos canais, sem ninguém abrindo o WhatsApp para disparar manualmente.",
    },
  ],
  audienceHeadline: {
    title: "Cada perfil usa de um jeito.",
    subtitle:
      "O mesmo inbox serve para quem atende sozinho e para quem precisa medir o tempo de resposta de um time.",
  },
  connectsWith: [
    {
      label: "CRM e negociações",
      description: "Cada mensagem fica anexada ao lead certo.",
      href: "/features/crm",
    },
    {
      label: "IA no atendimento",
      description: "Primeira resposta e qualificação antes do corretor.",
      href: "/features/ai-attendance",
    },
    {
      label: "Cobranças e repasses",
      description: "A régua de 15 disparos usa os mesmos canais.",
      href: "/features/billing",
    },
    {
      label: "Portal do cliente",
      description: "O chamado do inquilino nasce no app dele.",
      href: "/features/client-portal",
    },
    {
      label: "Mila e ferramentas de IA",
      description: "Resposta sugerida e resumo da conversa no próprio inbox.",
      href: "/features/ai",
    },
    {
      label: "MyLar Pro Brokers",
      description: "O corretor responde do celular sem sair do sistema.",
      href: "/features/broker-app",
    },
  ],
  connectsWithHeadline: {
    title: "A conversa alimenta o resto.",
    subtitle:
      "Mensagem, lead, contrato e cobrança são o mesmo registro — o que foi dito no WhatsApp aparece dentro da negociação.",
  },
  faq: [
    {
      q: "Preciso trocar o número de WhatsApp da imobiliária?",
      a: "Não. A conexão é feita com o número que você já usa. A partir daí as mensagens passam a ser gravadas na plataforma e ficam ligadas ao cliente, ao imóvel e à negociação.",
    },
    {
      q: "O corretor continua respondendo pelo celular dele?",
      a: "Continua, pelo app MyLar Pro Brokers ou pelo painel web. A diferença é que a conversa não fica só no aparelho: o histórico é da organização e o gestor consegue acompanhar.",
    },
    {
      q: "As mensagens chegam em tempo real?",
      a: "Sim. O inbox usa WebSocket, com indicador de status da conexão do WhatsApp. Se a conexão cair, a plataforma avisa em vez de deixar a mensagem sumir em silêncio.",
    },
    {
      q: "Dá para enviar comunicado para uma lista inteira?",
      a: "Dá, pelo módulo de broadcast, por WhatsApp ou e-mail, usando os templates de mensagem cadastrados. É o caminho para avisar de reajuste, lançamento ou mudança de política.",
    },
    {
      q: "Como os chamados do inquilino entram no inbox?",
      a: "O inquilino abre o chamado pelo portal escolhendo a categoria — manutenção, faturamento, contrato ou reclamação. Ele entra priorizado, com status próprio, e a troca de mensagens acontece no mesmo lugar da conversa.",
    },
    {
      q: "A régua de cobrança é obrigatória do jeito que vem?",
      a: "Não. São 15 disparos possíveis, de 30 dias antes do vencimento até 15 dias depois, e você liga ou desliga cada um por canal. Dá para usar só o aviso de vencimento, ou a régua completa.",
    },
  ],
  hubCard: {
    description:
      "Inbox único com WhatsApp e e-mail no mesmo histórico, em tempo real. Templates, broadcast, chamados do inquilino e a régua de cobrança falando pelos mesmos canais.",
    highlights: [
      "Histórico que fica na empresa, não no aparelho",
      "Templates e envio em massa",
      "Régua de cobrança de 15 disparos",
    ],
  },
};
