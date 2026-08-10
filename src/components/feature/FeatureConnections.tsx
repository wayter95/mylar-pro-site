"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icons } from "@/lib/icons";
import type { FeatureConnection } from "@/lib/features/types";

type Props = {
  connections: FeatureConnection[];
  headline: { title: string; subtitle: string };
  accent: string;
};

export function FeatureConnections({ connections, headline, accent }: Props) {
  return (
    <section className="border-t border-slate-200 bg-[#F8F9FB] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />
              <span
                className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: accent }}
              >
                Conecta com
              </span>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.05] font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem]">
              {headline.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-slate-600 lg:text-lg">
            {headline.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {connections.map((connection, i) => (
            <motion.div
              key={connection.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
            >
              <Link
                href={connection.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
              >
                <h3 className="text-[15px] font-bold text-slate-900">
                  {connection.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {connection.description}
                </p>
                <span
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold transition-transform group-hover:translate-x-0.5"
                  style={{ color: accent }}
                >
                  Ver o módulo
                  <Icons.arrowRight aria-hidden className="size-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
