"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PERSONA_HERO_IMAGES } from "@/lib/personas/constants";
import type { PersonaSlug } from "@/lib/personas/types";

type Props = {
  slug: PersonaSlug;
  accent: string;
  className?: string;
};

const floatEase = [0.45, 0, 0.55, 1] as const;

export function PersonaHeroVisual({ slug, accent, className = "" }: Props) {
  const image = PERSONA_HERO_IMAGES[slug];
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute -inset-6 rounded-3xl blur-3xl sm:-inset-8"
        style={{ backgroundColor: `${accent}18` }}
      />

      <motion.div
        className="relative"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -12, 0],
                scale: [1, 1.015, 1],
              }
        }
        transition={{
          y: { duration: 6.5, repeat: Infinity, ease: floatEase },
          scale: { duration: 9, repeat: Infinity, ease: floatEase },
        }}
      >
        <motion.div
          className="relative"
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="relative h-auto w-full drop-shadow-[0_28px_50px_rgba(0,0,0,0.45)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
