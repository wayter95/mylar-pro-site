const CATEGORY_ACCENTS: Record<string, string> = {
  produto: "#7c3aed",
  mercado: "#2facde",
};

export function categoryAccent(title: string): string {
  return CATEGORY_ACCENTS[title.trim().toLowerCase()] ?? "#2facde";
}

function toDate(value: string): Date {
  return new Date(value.includes("T") ? value : `${value}T00:00:00Z`);
}

export function formatPostDate(value: string): string {
  return toDate(value).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatPostDateShort(value: string): string {
  return toDate(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min de leitura`;
}
