import { broker } from "./broker";
import {
  PERSONA_HERO_IMAGES,
  PERSONA_HUB_CARDS,
  PERSONA_ORDER,
  REGISTER_URL,
} from "./constants";
import { development } from "./development";
import { realEstate } from "./real-estate";
import type { PersonaContent, PersonaSlug } from "./types";

export { PERSONA_HERO_IMAGES, PERSONA_HUB_CARDS, PERSONA_ORDER, REGISTER_URL };

export const personasRecord: Record<PersonaSlug, PersonaContent> = {
  broker,
  "real-estate": realEstate,
  development,
};

export const allPersonaSlugs: PersonaSlug[] = [...PERSONA_ORDER];

export function getPersona(slug: string): PersonaContent | undefined {
  if (isPersonaSlug(slug)) {
    return personasRecord[slug];
  }
  return undefined;
}

export function isPersonaSlug(slug: string): slug is PersonaSlug {
  return (PERSONA_ORDER as readonly string[]).includes(slug);
}
