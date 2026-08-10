"use client";

import Image from "next/image";

type OrbitChip = {
  label: string;
  left: number;
  top: number;
  color: string;
  float: "a" | "b" | "c";
  duration: number;
  delay: number;
  line: { x2: number; y2: number };
};

const floatClasses: Record<OrbitChip["float"], string> = {
  a: "motion-safe:animate-[mp-float-a_var(--mp-dur)_ease-in-out_infinite]",
  b: "motion-safe:animate-[mp-float-b_var(--mp-dur)_ease-in-out_infinite]",
  c: "motion-safe:animate-[mp-float-c_var(--mp-dur)_ease-in-out_infinite]",
};

const chips: OrbitChip[] = [
  {
    label: "CRM",
    left: 34.64,
    top: 11.99,
    color: "#2facde",
    float: "a",
    duration: 7,
    delay: 0,
    line: { x2: 45.32, y2: 38.41 },
  },
  {
    label: "Contratos",
    left: 69,
    top: 17.09,
    color: "#f59e0b",
    float: "c",
    duration: 7.5,
    delay: 1.1,
    line: { x2: 56.25, y2: 39.17 },
  },
  {
    label: "Financeiro",
    left: 89.9,
    top: 47.21,
    color: "#10b981",
    float: "b",
    duration: 8.1,
    delay: 0.5,
    line: { x2: 62.47, y2: 49.13 },
  },
  {
    label: "Cobranças",
    left: 74.43,
    top: 79.11,
    color: "#059669",
    float: "a",
    duration: 8.7,
    delay: 1.6,
    line: { x2: 58.03, y2: 59.58 },
  },
  {
    label: "Atendimento",
    left: 51.47,
    top: 91.97,
    color: "#2facde",
    float: "c",
    duration: 9.2,
    delay: 0.8,
    line: { x2: 50.44, y2: 62.49 },
  },
  {
    label: "Mila IA",
    left: 27.22,
    top: 79.16,
    color: "#7c3aed",
    float: "b",
    duration: 9.8,
    delay: 2,
    line: { x2: 42.3, y2: 59.85 },
  },
  {
    label: "Catálogo",
    left: 9.02,
    top: 51.43,
    color: "#38bdf8",
    float: "a",
    duration: 10.3,
    delay: 1.3,
    line: { x2: 37.51, y2: 50.44 },
  },
  {
    label: "Meta Ads",
    left: 24.3,
    top: 23.38,
    color: "#f43f5e",
    float: "c",
    duration: 10.9,
    delay: 0.3,
    line: { x2: 41.32, y2: 41.01 },
  },
];

export function ModuleOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(47,172,222,0.14) 0%, transparent 60%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-[9%] rounded-full border border-dashed border-white/[0.07]"
      />

      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="absolute inset-0 size-full overflow-visible"
      >
        {chips.map((chip) => (
          <g key={chip.label}>
            <line
              x1={chip.left}
              y1={chip.top}
              x2={chip.line.x2}
              y2={chip.line.y2}
              stroke="rgba(255,255,255,0.13)"
              strokeWidth={0.35}
            />
            <line
              x1={chip.left}
              y1={chip.top}
              x2={chip.line.x2}
              y2={chip.line.y2}
              stroke={chip.color}
              strokeWidth={0.9}
              strokeLinecap="round"
              strokeDasharray="3.5 40.5"
              className="motion-safe:animate-[mp-dash_3.4s_linear_infinite]"
              style={{ animationDelay: `${chip.delay}s` }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute inset-0">
        {chips.map((chip) => (
          <div
            key={chip.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${chip.left}%`, top: `${chip.top}%` }}
          >
            <span
              className={`inline-flex items-center gap-2 rounded-full border bg-slate-950/95 px-3 py-2 text-[12px] font-bold whitespace-nowrap text-white shadow-[0_10px_26px_-12px_rgba(0,0,0,0.9)] sm:px-4 sm:text-[13px] ${floatClasses[chip.float]}`}
              style={
                {
                  borderColor: `${chip.color}66`,
                  "--mp-dur": `${chip.duration}s`,
                  animationDelay: `${chip.delay}s`,
                } as React.CSSProperties
              }
            >
              <span
                aria-hidden
                className="size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: chip.color }}
              />
              {chip.label}
            </span>
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[132px] -translate-x-1/2 -translate-y-1/2 rounded-full motion-safe:animate-[mp-halo_5s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, rgba(47,172,222,0.30), transparent 70%)",
        }}
      />

      <div
        className="absolute top-1/2 left-1/2 flex size-[106px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28px] border"
        style={{
          borderColor: "rgba(47,172,222,0.4)",
          background:
            "linear-gradient(160deg, rgba(47,172,222,0.2), rgba(2,6,23,0.97))",
          boxShadow: "0 0 80px -12px rgba(47,172,222,0.6)",
        }}
      >
        <Image
          src="/images/Icon-Logo.svg"
          alt="MyLar Pro"
          width={52}
          height={52}
          className="h-auto w-[52px]"
          priority
        />
      </div>
    </div>
  );
}
