"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AnimateIn } from "./AnimateIn";

const images = [
  { src: "/images/DASHBOARD_WHITE.png", alt: "Dashboard Mylar Pro" },
  { src: "/images/DASHBOARD_DARK.png", alt: "Dashboard Mylar Pro" },
];

const INTERVAL_MS = 4500;

export function DashboardPreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 sm:gap-12 lg:gap-16">
          <AnimateIn className="max-w-2xl text-center">
            <span className="inline-block rounded-full bg-[#37B6D6]/10 px-4 py-1.5 text-sm font-medium text-[#37B6D6]">
              Controle e interface
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Tudo em um painel que você controla
            </h2>
            <p className="mt-6 text-lg text-slate-600">
              Interface limpa e objetiva. Veja vendas, locações e financeiro em
              tempo real — sem perder nada de vista e sem depender de planilhas.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.15} className="w-full max-w-4xl">
            <div className="relative aspect-video w-full overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeIndex].src}
                    alt={images[activeIndex].alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
