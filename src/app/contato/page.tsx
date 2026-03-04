"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQ } from "@/components/landing/FAQ";
import { MOTIVOS_CONTATO } from "@/lib/contact";

export default function ContatoPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formLoadTime = useRef<number>(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.get("nome")?.toString().trim(),
          email: formData.get("email")?.toString().trim(),
          motivo: formData.get("motivo")?.toString().trim(),
          empresa: formData.get("empresa")?.toString().trim() || undefined,
          telefone: formData.get("telefone")?.toString().trim() || undefined,
          mensagem: formData.get("mensagem")?.toString().trim() || undefined,
          _honeypot: formData.get("_honeypot")?.toString() || undefined,
          _formLoadTime: formLoadTime.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setErrorMsg(typeof data?.error === "string" ? data.error : "Erro ao enviar. Tente novamente.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erro ao enviar. Tente novamente.");
      setStatus("error");
    }
  }

  return (
    <main>
      <Header />
      <div className="pt-20 sm:pt-24">
        <section className="border-t border-slate-200 bg-white py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Contato
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Tire suas dúvidas ou entre em contato com nossa equipe.
                Retornamos em até 24 horas.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-5xl gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                  Envie sua mensagem
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Tem alguma dúvida ou precisa de ajuda? Preencha o formulário
                  e nossa equipe retornará em até 24 horas.
                </p>
                <div className="mt-10">
                  <Link
                    href="https://management.mylarpro.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-[#37B6D6] hover:text-[#2ea5c4]"
                  >
                    Já tem conta? Acessar plataforma
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot — invisível, bots preenchem */}
                  <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                    <label htmlFor="url">URL</label>
                    <input
                      type="text"
                      id="url"
                      name="_honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:outline-none focus:ring-2 focus:ring-[#37B6D6] focus:ring-offset-0"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:outline-none focus:ring-2 focus:ring-[#37B6D6] focus:ring-offset-0"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="motivo"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Motivo do contato *
                    </label>
                    <select
                      id="motivo"
                      name="motivo"
                      required
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:outline-none focus:ring-2 focus:ring-[#37B6D6] focus:ring-offset-0"
                    >
                      <option value="">Selecione o motivo</option>
                      {MOTIVOS_CONTATO.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="empresa"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:outline-none focus:ring-2 focus:ring-[#37B6D6] focus:ring-offset-0"
                        placeholder="Sua imobiliária"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="telefone"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Telefone
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:outline-none focus:ring-2 focus:ring-[#37B6D6] focus:ring-offset-0"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="mensagem"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Mensagem *
                    </label>
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      rows={4}
                      required
                      minLength={10}
                      maxLength={2000}
                      autoComplete="off"
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:outline-none focus:ring-2 focus:ring-[#37B6D6] focus:ring-offset-0"
                      placeholder="Descreva como podemos ajudar (mín. 10 caracteres)"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Máximo 2.000 caracteres. Não inclua links (URLs).
                    </p>
                  </div>
                  {status === "success" && (
                    <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                      Mensagem enviada com sucesso! Retornaremos em breve.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
                      {errorMsg}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-xl bg-[#37B6D6] px-6 py-3.5 font-semibold text-white transition hover:bg-[#2ea5c4] disabled:opacity-70"
                  >
                    {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Perguntas frequentes
              </h2>
              <div className="mt-8">
                <FAQ />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
