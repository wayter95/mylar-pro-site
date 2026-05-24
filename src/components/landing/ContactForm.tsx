"use client";

import { useState } from "react";
import { Icons } from "@/lib/icons";
import { AnimateIn } from "./AnimateIn";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.get("nome"),
          email: formData.get("email"),
          empresa: formData.get("empresa"),
          telefone: formData.get("telefone"),
          mensagem: formData.get("mensagem"),
        }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contato" className="border-t border-slate-200 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateIn>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Dúvidas ou suporte
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Tem alguma dúvida ou precisa de ajuda? Envie sua mensagem e nossa
              equipe retorna em até 24 horas.
            </p>
            <div className="mt-10 space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Por que escolher o Mylar Pro?
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-slate-600">
                  <li>Assinatura eletrônica com validação segura</li>
                  <li>Dados isolados por cliente — nenhum concorrente oferece</li>
                  <li>Repasse automático no módulo financeiro</li>
                  <li>Tecnologia moderna e atualizada</li>
                </ul>
              </div>
              <a
                href="https://lista.mylarpro.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-[#37B6D6] hover:text-[#2ea5c4]"
              >
                Solicitar acesso antecipado
                <Icons.arrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:ring-[#37B6D6]"
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
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:ring-[#37B6D6]"
                  placeholder="seu@email.com"
                />
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
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:ring-[#37B6D6]"
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
                    className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:ring-[#37B6D6]"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-sm font-medium text-slate-700"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 shadow-sm focus:border-[#37B6D6] focus:ring-[#37B6D6]"
                  placeholder="Como podemos ajudar?"
                />
              </div>
              {status === "success" && (
                <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                  Mensagem enviada com sucesso! Retornaremos em breve.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
                  Erro ao enviar. Tente novamente ou entre em contato por
                  e-mail.
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
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
