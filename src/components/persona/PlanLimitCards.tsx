type LimitItem = { v: string; l: string };

type Props = {
  limits: LimitItem[];
  accent: string;
};

type LimitKind = "properties" | "user" | "team";

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function resolveLimitKind(label: string): LimitKind {
  const text = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (text.includes("imovel")) return "properties";
  if (text.includes("usuario")) return "user";
  return "team";
}

function PropertiesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        {...iconStroke}
        d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
      />
      <path {...iconStroke} d="M6 12h12" />
      <path {...iconStroke} d="M10 6h4" />
      <path {...iconStroke} d="M10 10h4" />
      <path {...iconStroke} d="M10 14h4" />
      <path {...iconStroke} d="M10 18h4" />
    </svg>
  );
}

function SingleUserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        {...iconStroke}
        d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      />
      <circle {...iconStroke} cx="12" cy="7" r="4" />
    </svg>
  );
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        {...iconStroke}
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      />
      <circle {...iconStroke} cx="9" cy="7" r="4" />
      <path
        {...iconStroke}
        d="M22 21v-2a4 4 0 0 0-3-3.87"
      />
      <path
        {...iconStroke}
        d="M16 3.13a4 4 0 0 1 0 7.75"
      />
    </svg>
  );
}

function LimitVisual({ kind, accent }: { kind: LimitKind; accent: string }) {
  const iconClass = "size-6 shrink-0";

  if (kind === "properties") {
    return (
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: accent }}
      >
        <PropertiesIcon className={iconClass} />
      </div>
    );
  }

  if (kind === "user") {
    return (
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-600">
        <SingleUserIcon className={iconClass} />
      </div>
    );
  }

  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50 text-slate-600">
      <TeamIcon className={iconClass} />
    </div>
  );
}

export function PlanLimitCards({ limits, accent }: Props) {
  return (
    <div className="mt-6 flex border-y border-slate-100 py-4">
      {limits.map((limit, index) => {
        const kind = resolveLimitKind(limit.l);
        const unlimited = limit.v === "∞";

        return (
          <div
            key={limit.l}
            className={`flex min-w-0 flex-1 items-center gap-3 ${
              index > 0 ? "border-l border-slate-100 pl-4 sm:pl-5" : "pr-4 sm:pr-5"
            }`}
          >
            <LimitVisual kind={kind} accent={accent} />
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-slate-500">
                {unlimited ? "Ilimitado" : "Até"}
              </p>
              <p className="text-2xl font-extrabold leading-none tracking-tight text-slate-900 tabular-nums">
                {limit.v}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-600">{limit.l}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
