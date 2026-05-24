"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppWindow } from "@/components/landing/AppWindow";

type Props = {
  accent: string;
  className?: string;
};

const properties = [
  {
    code: "MV-218",
    title: "Apt 3q · Vila Mariana",
    price: "R$ 4.200/mês",
    badge: "Aluguel",
    badgeColor: "sky",
    specs: "98m² · 2 vagas · 3 dorm",
    img: 1,
  },
  {
    code: "PI-104",
    title: "Studio · Pinheiros",
    price: "R$ 2.450/mês",
    badge: "Aluguel",
    badgeColor: "sky",
    specs: "32m² · 1 vaga · 1 dorm",
    img: 2,
  },
  {
    code: "IT-072",
    title: "Cobertura · Itaim Bibi",
    price: "R$ 1.9M",
    badge: "Venda",
    badgeColor: "violet",
    specs: "180m² · 3 vagas · 4 dorm",
    featured: true,
    img: 3,
  },
  {
    code: "BR-512",
    title: "Apt 2q · Brooklin",
    price: "R$ 680k",
    badge: "Venda",
    badgeColor: "violet",
    specs: "65m² · 1 vaga · 2 dorm",
    img: 4,
  },
];

const badgeStyle: Record<string, string> = {
  sky: "bg-sky-50 text-sky-700",
  violet: "bg-violet-50 text-violet-700",
};

function PropertyImage({ index, accent }: { index: number; accent: string }) {
  const tints = [
    `linear-gradient(135deg, ${accent}30 0%, ${accent}10 60%, white 100%)`,
    `linear-gradient(135deg, #fde68a40 0%, #fed7aa30 60%, white 100%)`,
    `linear-gradient(135deg, ${accent}40 0%, #6366f120 60%, white 100%)`,
    `linear-gradient(135deg, #d1fae540 0%, #a7f3d020 60%, white 100%)`,
  ];
  return (
    <div
      className="relative h-20 w-full overflow-hidden"
      style={{ background: tints[index - 1] }}
    >
      {/* Building silhouettes */}
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="xMidYEnd meet"
        className="absolute inset-x-0 bottom-0 h-full w-full opacity-50"
      >
        <rect x="10" y="14" width="14" height="26" fill="#94a3b8" opacity="0.4" />
        <rect x="26" y="6" width="18" height="34" fill="#64748b" opacity="0.5" />
        <rect x="46" y="18" width="12" height="22" fill="#94a3b8" opacity="0.4" />
        <rect x="60" y="10" width="16" height="30" fill="#64748b" opacity="0.5" />
        <rect x="78" y="20" width="14" height="20" fill="#94a3b8" opacity="0.4" />
        {Array.from({ length: 30 }).map((_, i) => (
          <rect
            key={i}
            x={12 + (i % 10) * 8}
            y={20 + Math.floor(i / 10) * 4}
            width="1.5"
            height="1.5"
            fill="white"
            opacity={0.6}
          />
        ))}
      </svg>
    </div>
  );
}

export function BrokerCatalogMockup({ accent, className = "" }: Props) {
  const reduce = useReducedMotion();

  return (
    <AppWindow dark={false} title="catalogo.seusite.com.br" className={className}>
      <div className="bg-white">
        {/* Domain bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div
              className="flex size-6 items-center justify-center rounded-md text-[10px] font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              MR
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-900">Marina Rocha Imóveis</p>
              <p className="text-[9px] text-slate-500">CRECI-SP 28.443 · Atualizado agora</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            {["Imóveis", "Aluguel", "Venda", "Contato"].map((label, i) => (
              <span
                key={label}
                className={`text-[10px] font-semibold ${
                  i === 0 ? "" : "text-slate-500"
                }`}
                style={i === 0 ? { color: accent } : undefined}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/60 px-4 py-2">
          <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-slate-700 ring-1 ring-slate-200">
            Bairro: Vila Mariana ×
          </span>
          <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-slate-700 ring-1 ring-slate-200">
            2-3 dorm ×
          </span>
          <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-slate-700 ring-1 ring-slate-200">
            R$ 2-5k ×
          </span>
          <span className="ml-auto text-[9px] text-slate-500">
            48 imóveis encontrados
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 p-3">
          {properties.map((p, i) => (
            <motion.div
              key={p.code}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
              className={`overflow-hidden rounded-lg border bg-white ${
                p.featured ? "ring-2" : "border-slate-200"
              }`}
              style={p.featured ? ({ "--tw-ring-color": `${accent}66` } as React.CSSProperties) : undefined}
            >
              <PropertyImage index={p.img} accent={accent} />
              <div className="p-2.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[8px] font-bold uppercase ${badgeStyle[p.badgeColor]}`}
                  >
                    {p.badge}
                  </span>
                  <span className="font-mono text-[8px] text-slate-400">{p.code}</span>
                </div>
                <p className="mt-1 truncate text-[10px] font-bold text-slate-900">{p.title}</p>
                <p className="truncate text-[9px] text-slate-500">{p.specs}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <p className="text-[11px] font-bold" style={{ color: accent }}>
                    {p.price}
                  </p>
                  <span
                    className="flex size-6 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${accent}14` }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill={accent}
                      className="size-3"
                      aria-label="WhatsApp"
                    >
                      <path d="M8 1.6a6.4 6.4 0 00-5.5 9.7L1.6 14.4l3.2-.9A6.4 6.4 0 108 1.6zm3.7 9.1c-.2.4-.9.8-1.2.9-.3.1-.7.1-1.1 0-.3-.1-.7-.2-1.2-.4-2-.9-3.4-2.9-3.5-3-.1-.1-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.8.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.6 1.5c.1.1.1.3 0 .4l-.2.4-.2.2c-.1.1-.2.2-.1.4.1.2.5.8 1.1 1.3.7.6 1.3.8 1.5.9.2.1.3.1.4-.1l.5-.6c.1-.2.3-.1.4-.1.2.1 1.2.6 1.4.7.2.1.3.1.4.2.1.2.1.5-.1.9z" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}
