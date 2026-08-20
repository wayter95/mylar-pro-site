import { NextResponse, type NextRequest } from "next/server";

import { serializeConsent } from "@/lib/consent/cookie";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_SECONDS,
  CONSENT_VERSION,
} from "@/lib/consent/types";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Corpo da requisição inválido." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { message: "Corpo da requisição inválido." },
      { status: 400 },
    );
  }

  const { analytics, marketing } = body as {
    analytics?: unknown;
    marketing?: unknown;
  };

  if (typeof analytics !== "boolean" || typeof marketing !== "boolean") {
    return NextResponse.json(
      { message: "Informe analytics e marketing como booleanos." },
      { status: 400 },
    );
  }

  const value = serializeConsent({
    version: CONSENT_VERSION,
    analytics,
    marketing,
    timestamp: new Date().toISOString(),
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: CONSENT_COOKIE_NAME,
    value,
    maxAge: CONSENT_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
