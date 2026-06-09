import { NextRequest, NextResponse } from "next/server";

const FORM_URL =
  "https://api.cognizy.ai/api/public/forms/newsletter-mylar-pro/submit";

// Rate limit: IP -> { count, resetAt }
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 min

const MIN_SUBMIT_TIME_MS = 2500; // humano leva pelo menos 2.5s para preencher

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde alguns minutos." },
        { status: 429 },
      );
    }

    // Origin check (skip em dev)
    const siteUrl = process.env.SITE_URL;
    const isDev = process.env.NODE_ENV === "development";
    if (siteUrl && !isDev) {
      const origin = req.headers.get("origin") || req.headers.get("referer");
      if (!origin) {
        return NextResponse.json(
          { error: "Requisição inválida." },
          { status: 400 },
        );
      }
      try {
        const reqHost = new URL(origin).hostname.replace(/^www\./, "");
        const allowedHost = new URL(siteUrl).hostname.replace(/^www\./, "");
        if (reqHost !== allowedHost) {
          return NextResponse.json(
            { error: "Requisição inválida." },
            { status: 400 },
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Requisição inválida." },
          { status: 400 },
        );
      }
    }

    const body = await req.json();

    const { Email, Nome, Sobrenome, _honeypot, _t } = body as {
      Email?: string;
      Nome?: string;
      Sobrenome?: string;
      _honeypot?: string;
      _t?: number;
    };

    // Honeypot: bots preenchem o campo oculto
    if (_honeypot) {
      // Retorna sucesso falso para o bot nao tentar de novo
      return NextResponse.json({ ok: true });
    }

    // Tempo minimo: rejeita submissoes muito rapidas
    if (_t && Date.now() - _t < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json({ ok: true }); // sucesso falso
    }

    if (!Email || !Nome || !Sobrenome) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 },
      );
    }

    // Validacao de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    // Rejeita emails descartaveis comuns
    const disposable = [
      "mailinator.com",
      "guerrillamail.com",
      "tempmail.com",
      "throwaway.email",
      "yopmail.com",
      "sharklasers.com",
      "guerrillamailblock.com",
      "grr.la",
      "dispostable.com",
    ];
    const domain = Email.split("@")[1]?.toLowerCase();
    if (domain && disposable.includes(domain)) {
      return NextResponse.json(
        { error: "Use um e-mail válido (não temporário)." },
        { status: 400 },
      );
    }

    // Tamanho maximo
    if (Nome.length > 60 || Sobrenome.length > 60 || Email.length > 120) {
      return NextResponse.json(
        { error: "Campos excedem o tamanho máximo." },
        { status: 400 },
      );
    }

    const res = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: Email,
        nome: Nome,
        sobrenome: Sobrenome,
        _hp: _honeypot ?? "",
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[newsletter] upstream error:", res.status, text);
      return NextResponse.json(
        { error: "Erro ao registrar. Tente novamente." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
