import type { ComponentPropsWithoutRef } from "react";
import { Icons, type IconName } from "@/lib/icons";

const sizeMap = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
  "2xl": "size-7",
  "3xl": "size-8",
} as const;

type IconSize = keyof typeof sizeMap;

type Props = Omit<ComponentPropsWithoutRef<"svg">, "ref"> & {
  name: IconName;
  size?: IconSize;
  className?: string;
};

/**
 * Componente wrapper opcional para padronizar tamanho via prop `size`.
 *
 * Você também pode importar `Icons` diretamente do `@/lib/icons` se
 * preferir controlar via className puro.
 *
 * Exemplos:
 *   <Icon name="check" size="md" className="text-emerald-500" />
 *   <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-0.5" />
 */
export function Icon({ name, size, className = "", ...props }: Props) {
  const IconComponent = Icons[name];
  const sizeClass = size ? sizeMap[size] : "";
  const finalClassName = [sizeClass, className].filter(Boolean).join(" ");

  return <IconComponent className={finalClassName} {...props} />;
}
