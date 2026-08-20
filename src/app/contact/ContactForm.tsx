"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/lib/icons";
import { MOTIVOS_CONTATO } from "@/lib/contact";

const inputBase =
  "block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-[#2facde]/40 focus:outline-none focus:ring-3 focus:ring-[#2facde]/10";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formLoadTime = useRef<number>(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: fd.get("nome")?.toString().trim(),
          email: fd.get("email")?.toString().trim(),
          motivo: fd.get("motivo")?.toString().trim(),
          empresa: fd.get("empresa")?.toString().trim() || undefined,
          telefone: fd.get("telefone")?.toString().trim() || undefined,
          mensagem: fd.get("mensagem")?.toString().trim() || undefined,
          _honeypot: fd.get("_honeypot")?.toString() || undefined,
          _formLoadTime: formLoadTime.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setErrorMsg(
          typeof data?.error === "string"
            ? data.error
            : "Erro ao enviar. Tente novamente.",
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erro ao enviar. Tente novamente.");
      setStatus("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200/60 bg-emerald-50/50 px-8 py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 }}
              className="flex size-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/25"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-7 text-white">
                <motion.path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                />
              </svg>
            </motion.div>
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Mensagem enviada!
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Recebemos sua mensagem e retornaremos em até 24 horas
              úteis. Fique de olho no seu e-mail.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm font-semibold text-[#2facde] transition hover:text-[#2599bb]"
            >
              Enviar outra mensagem
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="ct-url">URL</label>
                <input type="text" id="ct-url" name="_honeypot" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="ct-nome" className="block text-sm font-medium text-slate-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="ct-nome"
                  name="nome"
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  className={`mt-1.5 ${inputBase}`}
                />
              </div>

              <div>
                <label htmlFor="ct-email" className="block text-sm font-medium text-slate-700">
                  E-mail
                </label>
                <input
                  type="email"
                  id="ct-email"
                  name="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  className={`mt-1.5 ${inputBase}`}
                />
              </div>

              <div>
                <label htmlFor="ct-motivo" className="block text-sm font-medium text-slate-700">
                  Como podemos ajudar?
                </label>
                <select
                  id="ct-motivo"
                  name="motivo"
                  className={`mt-1.5 ${inputBase}`}
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
                  <label htmlFor="ct-empresa" className="block text-sm font-medium text-slate-700">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="ct-empresa"
                    name="empresa"
                    placeholder="Nome da imobiliária"
                    className={`mt-1.5 ${inputBase}`}
                  />
                </div>
                <div>
                  <label htmlFor="ct-telefone" className="block text-sm font-medium text-slate-700">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="ct-telefone"
                    name="telefone"
                    placeholder="(11) 99999-9999"
                    className={`mt-1.5 ${inputBase}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ct-mensagem" className="block text-sm font-medium text-slate-700">
                  Mensagem
                </label>
                <textarea
                  id="ct-mensagem"
                  name="mensagem"
                  rows={4}
                  maxLength={2000}
                  autoComplete="off"
                  placeholder="Conte como podemos ajudar..."
                  className={`mt-1.5 resize-none ${inputBase}`}
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Max. 2.000 caracteres. Não inclua links.
                </p>
              </div>

              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="text-xs leading-relaxed text-slate-500">
                Ao enviar, você concorda que a MyLar Pro use seus dados para
                responder a este contato, conforme a nossa{" "}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-2 transition hover:text-slate-700"
                >
                  Política de Privacidade
                </Link>
                . Você pode solicitar acesso ou exclusão dos seus dados a
                qualquer momento.
              </p>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="group relative w-full overflow-hidden rounded-xl bg-[#2facde] px-6 py-3.5 font-semibold text-white shadow-[0_8px_20px_-6px_rgba(47,172,222,0.4)] transition-all hover:shadow-[0_12px_28px_-6px_rgba(47,172,222,0.5)] disabled:opacity-60"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative flex items-center justify-center gap-2">
                  {status === "sending" ? (
                    <>
                      <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensagem
                      <Icons.send className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
