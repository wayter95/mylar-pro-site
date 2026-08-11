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
      "WhatsApp, Instagram e Messenger no mesmo inbox, com o histórico mesclado por cliente e sincronizado em tempo real. As contas são da imobiliária, não do aparelho de quem atendeu.",
    ctaPrimary: "Testar 30 dias grátis",
    ctaSecondary: "Falar com especialista",
    trust: [
      "Instagram e Messenger oficiais",
      "Histórico que fica na empresa",
      "Tempo real por WebSocket",
    ],
  },
  keyPoints: [
    {
      title: "Um inbox, três canais",
      body: "WhatsApp, Instagram e Messenger aparecem no mesmo fio de conversa, na ordem em que aconteceram. O cliente que mandou DM no Instagram e depois chamou no WhatsApp é a mesma pessoa, com um histórico só.",
    },
    {
      title: "Instagram e Messenger oficiais da Meta",
      body: "As DMs do Instagram e do Messenger entram pela Graph API oficial, com a conta conectada por autorização da própria Meta. No WhatsApp você escolhe: conexão rápida por QR Code para começar hoje, ou a API oficial do WhatsApp Business quando quiser template aprovado e estabilidade de sessão.",
    },
    {
      title: "A conversa é da imobiliária",
      body: "As contas são conectadas à organização, não ao celular do corretor. Se alguém sai do time, o histórico continua ligado ao lead, ao contrato e ao imóvel.",
    },
    {
      title: "Templates para o que se repete",
      body: "Mensagens padrão para os momentos previsíveis: confirmação de visita, envio de ficha, cobrança de documento. Sempre com o mesmo texto aprovado.",
    },
    {
      title: "Broadcast para a carteira inteira",
      body: "Envio em massa pelos templates cadastrados, para avisar de um lançamento, de um reajuste ou de uma mudança de política sem mandar mensagem uma por uma.",
    },
    {
      title: "Chamados categorizados e priorizados",
      body: "Manutenção, faturamento, contrato ou reclamação. O inquilino abre pelo portal, o chamado entra com categoria e prioridade, e as mensagens ficam no mesmo lugar do status.",
    },
    {
      title: "Régua de cobrança de 15 disparos",
      body: "Avisos automáticos de 7 dias antes do vencimento até 60 dias depois. Você liga e desliga cada disparo por canal, e ninguém precisa lembrar de nenhum.",
    },
  ],
  keyPointsHeadline: {
    title: "Histórico no celular de uma pessoa é histórico que a empresa não tem.",
    subtitle:
      "O que foi combinado com o cliente precisa sobreviver a férias, troca de corretor e desligamento — sem depender de alguém repassar print.",
  },
  benefits: [
    "WhatsApp, Instagram e Messenger no mesmo histórico, sem trocar de tela",
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
        "O gestor vê quem está atendendo cada conversa e o histórico completo de qualquer cliente, sem pedir print para ninguém.",
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
      "O mesmo inbox serve para quem atende sozinho e para quem precisa enxergar o atendimento de um time inteiro.",
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
      description: "A IA responde no inbox e resume a conversa antes do handoff.",
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
      q: "O Instagram e o Messenger também entram no inbox?",
      a: "Entram. Você conecta a conta do Instagram e a página do Facebook da imobiliária, e as DMs passam a chegar no mesmo inbox do WhatsApp. A conexão do Instagram e do Messenger usa a Graph API oficial da Meta, por autorização da conta — sem aparelho ligado nem leitura de QR Code.",
    },
    {
      q: "O cliente que fala em dois canais vira dois cadastros?",
      a: "Não. O histórico é mesclado por cliente: quem mandou DM no Instagram e depois chamou no WhatsApp aparece como uma pessoa só, com a conversa em ordem cronológica.",
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
      a: "Dá, pelo módulo de broadcast, usando os templates de mensagem cadastrados. É o caminho para avisar de reajuste, lançamento ou mudança de política.",
    },
    {
      q: "Como os chamados do inquilino entram no inbox?",
      a: "O inquilino abre o chamado pelo portal escolhendo a categoria — manutenção, faturamento, contrato ou reclamação. Ele entra priorizado, com status próprio, e a troca de mensagens acontece no mesmo lugar da conversa.",
    },
    {
      q: "A régua de cobrança é obrigatória do jeito que vem?",
      a: "Não. São 15 disparos possíveis, de 7 dias antes do vencimento até 60 dias depois, e você liga ou desliga cada um por canal. Dá para usar só o aviso de vencimento, ou a régua completa.",
    },
  ],
  hubCard: {
    description:
      "Inbox único com WhatsApp, Instagram e Messenger no mesmo histórico, em tempo real. Templates, broadcast, chamados do inquilino e a régua de cobrança falando pelos mesmos canais.",
    highlights: [
      "Histórico que fica na empresa, não no aparelho",
      "Templates e envio em massa",
      "Régua de cobrança de 15 disparos",
    ],
  },
};
