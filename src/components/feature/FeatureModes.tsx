"use client";

import { motion } from "framer-motion";
import type { FeatureMode } from "@/lib/features/types";

type Props = {
  modes: FeatureMode[];
  accent: string;
};

export function FeatureModes({ modes, accent }: Props) {
  return (
    <section className="border-t border-slate-200 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <span
            className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: accent }}
          >
            Dois jeitos de publicar
          </span>
        </div>
        <h2 className="mt-5 max-w-3xl text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2rem]">
          Comece no subdomínio Mylar.{" "}
          <span className="text-slate-400">
            Quando quiser, conecte o seu próprio domínio.
          </span>
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 lg:grid-cols-2">
          {modes.map((mode, i) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.08 * i }}
              className="flex flex-col bg-white p-7 lg:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-slate-300" />
                <span
                  className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: accent }}
                >
                  Modo {i + 1}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-extrabold tracking-tight text-slate-900 lg:text-[1.35rem]">
                {mode.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                {mode.body}
              </p>

              <div
                className="mt-5 inline-flex items-center gap-2 self-start rounded-md border px-3 py-2 font-mono text-[12px]"
                style={{
                  borderColor: `${accent}33`,
                  backgroundColor: `${accent}0a`,
                  color: accent,
                }}
              >
                <span
                  aria-hidden
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                {mode.example}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
