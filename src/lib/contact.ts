/** Motivos de contato — usado no formulário e validação da API */
export const MOTIVOS_CONTATO = [
  { value: "duvida", label: "Dúvida sobre a plataforma" },
  { value: "demonstracao", label: "Solicitar demonstração" },
  { value: "suporte", label: "Suporte técnico" },
  { value: "parceria", label: "Parceria ou integração" },
  { value: "orcamento", label: "Orçamento ou planos" },
  { value: "outros", label: "Outros" },
] as const;

export type MotivoContato = (typeof MOTIVOS_CONTATO)[number]["value"];

export const MOTIVOS_VALIDOS = MOTIVOS_CONTATO.map((m) => m.value);

export function getMotivoLabel(value: string): string {
  return MOTIVOS_CONTATO.find((m) => m.value === value)?.label ?? value;
}
