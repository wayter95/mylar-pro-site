import crypto from "crypto";

const META_API_VERSION = "v21.0";
const META_GRAPH_BASE = "https://graph.facebook.com";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

/** Normaliza e aplica SHA-256 conforme documentação Meta (Customer Information Parameters) */
function sha256(value: string): string {
  const normalized = value.toLowerCase().trim().replace(/\s/g, "");
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

/** Hash para telefone: apenas dígitos */
function sha256Phone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits.length) return "";
  return crypto.createHash("sha256").update(digits).digest("hex");
}

export type LeadEventPayload = {
  email: string;
  nome?: string;
  telefone?: string;
  /** URL da página onde o evento ocorreu (recomendado para action_source website) */
  eventSourceUrl?: string;
  /** User-Agent do request (melhora matching) */
  userAgent?: string | null;
  /** IP do cliente (melhora matching) */
  clientIp?: string | null;
};

export type ConversionEventPayload = {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  userAgent?: string | null;
  clientIp?: string | null;
  fbc?: string;
  fbp?: string;
  userData?: Record<string, string>;
  customData?: Record<string, string>;
};

export async function sendConversionEvent(
  payload: ConversionEventPayload,
): Promise<void> {
  if (!pixelId || !accessToken) {
    return;
  }

  const userData: Record<string, string> = { ...payload.userData };

  if (payload.clientIp && payload.clientIp !== "unknown") {
    userData.client_ip_address = payload.clientIp;
  }
  if (payload.userAgent) {
    userData.client_user_agent = payload.userAgent;
  }
  if (payload.fbc) {
    userData.fbc = payload.fbc;
  }
  if (payload.fbp) {
    userData.fbp = payload.fbp;
  }

  const body = {
    data: [
      {
        event_name: payload.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId,
        action_source: "website",
        user_data: userData,
        ...(payload.customData && { custom_data: payload.customData }),
        ...(payload.eventSourceUrl && {
          event_source_url: payload.eventSourceUrl,
        }),
      },
    ],
    access_token: accessToken,
  };

  try {
    const url = `${META_GRAPH_BASE}/${META_API_VERSION}/${pixelId}/events`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("[Meta Conversions API] Erro:", res.status, data);
    }
  } catch (err) {
    console.error(
      `[Meta Conversions API] Falha ao enviar evento ${payload.eventName}:`,
      err,
    );
  }
}

/**
 * Envia evento Lead para a Meta Conversions API (server-side).
 * Não lança erro; falhas são apenas logadas para não afetar o fluxo principal.
 */
export async function sendLeadEvent(payload: LeadEventPayload): Promise<void> {
  const userData: Record<string, string> = {
    em: sha256(payload.email),
  };

  if (payload.telefone?.trim()) {
    const ph = sha256Phone(payload.telefone.trim());
    if (ph) userData.ph = ph;
  }

  await sendConversionEvent({
    eventName: "Lead",
    eventId: crypto.randomUUID(),
    eventSourceUrl: payload.eventSourceUrl,
    userAgent: payload.userAgent,
    clientIp: payload.clientIp,
    userData,
    ...(payload.nome && { customData: { nome: payload.nome } }),
  });
}
