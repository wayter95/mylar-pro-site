import { clientIpFromHeaders } from "@/lib/client-ip";
import { hasMarketingConsentFromHeaders } from "@/lib/consent/server";
import { sendLeadEvent } from "@/lib/meta-conversions";
import { buildCognizyPayload, validateSubmission } from "@/lib/raio-x/submission";
import { NextResponse } from "next/server";

const COGNIZY_RAIO_X_FORM_URL = "https://api.cognizy.ai/api/public/forms/raio-x-mylar/submit";

const MIN_FORM_TIME_MS = 15000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function isFromOwnSite(request: Request): boolean {
  const siteUrl = process.env.SITE_URL;
  if (!siteUrl || process.env.NODE_ENV === "development") return true;

  const origin = request.headers.get("origin") || request.headers.get("referer");
  if (!origin) return false;

  try {
    const requestHost = new URL(origin).hostname.replace(/^www\./, "");
    const allowedHost = new URL(siteUrl).hostname.replace(/^www\./, "");
    return requestHost === allowedHost;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const ip = clientIpFromHeaders(request.headers) ?? "unknown";
    const body = await request.json();

    if (body?._honeypot) {
      return NextResponse.json({ success: true });
    }

    if (
      typeof body?._formLoadTime !== "number" ||
      Date.now() - body._formLoadTime < MIN_FORM_TIME_MS
    ) {
      return NextResponse.json(
        { error: "Envio rápido demais. Aguarde alguns segundos e tente de novo." },
        { status: 400 },
      );
    }

    if (!isFromOwnSite(request)) {
      return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
    }

    const { data, error } = validateSubmission(body);
    if (!data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Muitos envios. Tente novamente em alguns minutos." },
        { status: 429 },
      );
    }

    const cognizyResponse = await fetch(COGNIZY_RAIO_X_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...buildCognizyPayload(data, new Date()), _hp: "" }),
    });

    if (!cognizyResponse.ok) {
      const text = await cognizyResponse.text().catch(() => "");
      console.error("[raio-x] cognizy upstream error:", cognizyResponse.status, text);
      return NextResponse.json(
        { error: "Não foi possível registrar suas respostas. Tente novamente." },
        { status: 502 },
      );
    }

    if (hasMarketingConsentFromHeaders(request.headers)) {
      sendLeadEvent({
        email: data.contact.email,
        nome: data.contact.name,
        telefone: data.contact.phone,
        eventSourceUrl: request.headers.get("referer") ?? undefined,
        userAgent: request.headers.get("user-agent") ?? undefined,
        clientIp: ip,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[raio-x] erro ao enviar:", err);
    return NextResponse.json(
      { error: "Não foi possível registrar suas respostas. Tente novamente." },
      { status: 500 },
    );
  }
}
