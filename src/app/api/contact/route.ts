import { MOTIVOS_VALIDOS, getMotivoLabel } from "@/lib/contact";
import {
  getContactEmailHtml,
  getContactEmailText,
} from "@/lib/email-templates/contact";
import { sendLeadEvent } from "@/lib/meta-conversions";
import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

const CONVERSA_CONTACT_FORM_URL =
  "https://api.cognizy.ai/api/public/forms/mylar-pro-site-contact-form/submit";

// Tempo mínimo para preenchimento (anti-bot)
const MIN_FORM_TIME_MS = 3000;

// Rate limit: 3 envios por IP a cada 15 min
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  if (realIP) return realIP;
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error("SENDGRID_API_KEY não configurada");
      return NextResponse.json(
        { error: "Serviço de e-mail não configurado" },
        { status: 500 },
      );
    }

    sgMail.setApiKey(apiKey);

    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Muitos envios. Tente novamente em alguns minutos." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const {
      nome,
      email,
      motivo,
      empresa,
      telefone,
      mensagem,
      _honeypot,
      _formLoadTime,
    } = body;

    // Honeypot: campo preenchido = bot
    if (_honeypot) {
      return NextResponse.json({ success: true });
    }

    // Tempo mínimo: envio muito rápido = provável bot
    if (
      typeof _formLoadTime === "number" &&
      Date.now() - _formLoadTime < MIN_FORM_TIME_MS
    ) {
      return NextResponse.json(
        { error: "Por favor, aguarde alguns segundos antes de enviar." },
        { status: 400 },
      );
    }

    // Origin/Referer: request deve vir do próprio site (skip em dev)
    const siteUrl = process.env.SITE_URL;
    const isDev = process.env.NODE_ENV === "development";
    if (siteUrl && !isDev) {
      const origin =
        request.headers.get("origin") || request.headers.get("referer");
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

    if (!nome || typeof nome !== "string" || nome.trim().length < 2) {
      return NextResponse.json(
        { error: "Nome é obrigatório (mín. 2 caracteres)" },
        { status: 400 },
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "E-mail é obrigatório" },
        { status: 400 },
      );
    }

    if (
      !motivo ||
      typeof motivo !== "string" ||
      !(MOTIVOS_VALIDOS as readonly string[]).includes(motivo)
    ) {
      return NextResponse.json(
        { error: "Selecione um motivo de contato válido" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    if (!mensagem || typeof mensagem !== "string") {
      return NextResponse.json(
        { error: "Mensagem é obrigatória" },
        { status: 400 },
      );
    }
    const mensagemTrimmed = mensagem.trim();
    if (mensagemTrimmed.length < 10) {
      return NextResponse.json(
        { error: "Mensagem deve ter no mínimo 10 caracteres" },
        { status: 400 },
      );
    }
    if (mensagemTrimmed.length > 2000) {
      return NextResponse.json(
        { error: "Mensagem muito longa (máx. 2000 caracteres)" },
        { status: 400 },
      );
    }
    if (/https?:\/\//i.test(mensagemTrimmed)) {
      return NextResponse.json(
        { error: "Não é permitido incluir links na mensagem." },
        { status: 400 },
      );
    }

    const toEmail = process.env.CONTACT_EMAIL;
    if (!toEmail) {
      console.error("CONTACT_EMAIL não configurado");
      return NextResponse.json(
        { error: "E-mail de destino não configurado" },
        { status: 500 },
      );
    }

    const fromEmail = process.env.NO_REPLY_EMAIL;
    if (!fromEmail) {
      console.error("NO_REPLY_EMAIL não configurado");
      return NextResponse.json(
        { error: "Remetente não configurado" },
        { status: 500 },
      );
    }

    const contactData = {
      nome: nome.trim(),
      email: email.trim(),
      motivo: motivo.trim(),
      empresa: empresa?.trim() || undefined,
      telefone: telefone?.trim() || undefined,
      mensagem: mensagemTrimmed,
    };

    const motivoLabel = getMotivoLabel(motivo);
    const nameParts = contactData.nome.split(/\s+/).filter(Boolean);
    const nomeConversa = nameParts[0] ?? "";
    const sobrenomeConversa = nameParts.slice(1).join(" ") || "";

    const conversaRes = await fetch(CONVERSA_CONTACT_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: contactData.email,
        nome: nomeConversa,
        sobrenome: sobrenomeConversa,
        motivo: motivoLabel,
        empresa: contactData.empresa ?? "",
        mensagem: contactData.mensagem,
        telefone: contactData.telefone ?? "",
        _hp: _honeypot ?? "",
      }),
    });

    if (!conversaRes.ok) {
      const text = await conversaRes.text().catch(() => "");
      console.error("[contact] conversa upstream error:", conversaRes.status, text);
      return NextResponse.json(
        { error: "Erro ao registrar. Tente novamente." },
        { status: 502 },
      );
    }

    const msgToYou = {
      to: toEmail,
      from: { email: fromEmail, name: "Site Mylar Pro" },
      replyTo: email.trim(),
      subject: `[Contato] [${motivoLabel}] ${nome.trim()} — Mylar Pro`,
      text: getContactEmailText(contactData),
      html: getContactEmailHtml(contactData),
    };

    await sgMail.send(msgToYou);

    // Meta Conversions API (server-side) — não bloqueia a resposta
    const userAgent = request.headers.get("user-agent") ?? undefined;
    const eventSourceUrl = request.headers.get("referer") ?? undefined;
    sendLeadEvent({
      email: contactData.email,
      nome: contactData.nome,
      telefone: contactData.telefone,
      eventSourceUrl,
      userAgent,
      clientIp: ip,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro ao enviar contato:", err);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 },
    );
  }
}
