"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQ } from "@/components/landing/FAQ";
import { MOTIVOS_CONTATO } from "@/lib/contact";

const REGISTER_URL = "https://app.mylarpro.com.br/register";

const contactInfo = [
  {
    label: "E-mail",
    value: "contato@mylarapp.com",
    href: "mailto:contato@mylarapp.com",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
      </svg>
    ),
  },
  {
    label: "Resposta",
    value: "Ate 24 horas uteis",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "Localizacao",
    value: "Brasil — 100% remoto",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433a19.695 19.695 0 002.605-1.899C15.723 14.893 18 12.006 18 8.5 18 4.358 14.86 1 10 1S2 4.358 2 8.5c0 3.506 2.277 6.393 4.023 7.95a19.695 19.695 0 002.605 1.9c.311.192.571.336.757.432.093.048.173.085.236.11l.047.022.015.006.006.003zM10 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const inputBase =
  "block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-[#2facde]/40 focus:outline-none focus:ring-3 focus:ring-[#2facde]/10";

export default function ContatoPage() {
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
    <main>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute -top-1/4 right-1/4 h-[500px] w-[600px] rounded-full bg-[#2facde]/8 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/60 uppercase backdrop-blur-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-[#2facde]" />
              Fale conosco
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Como podemos
              <br />
              <span className="bg-gradient-to-r from-[#2facde] to-[#37d6c0] bg-clip-text text-transparent">
                ajudar voce?
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              Tire duvidas, solicite uma demonstracao ou fale sobre parcerias.
              Nossa equipe responde em ate 24 horas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-slate-900">
                Vamos conversar
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                Seja para conhecer a plataforma, tirar duvidas tecnicas ou
                discutir uma parceria — estamos aqui para ajudar sua
                imobiliaria a dar o proximo passo.
              </p>

              {/* Contact details */}
              <div className="mt-8 space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2facde]/10 text-[#2facde]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-slate-900 transition hover:text-[#2facde]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-slate-900">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick CTA */}
              <div className="mt-10 rounded-2xl border border-[#2facde]/15 bg-gradient-to-br from-[#2facde]/5 to-white p-5">
                <p className="text-sm font-bold text-slate-900">
                  Quer conhecer a plataforma agora?
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Crie sua conta gratuita e explore todos os modulos sem
                  compromisso.
                </p>
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2facde] transition hover:gap-3"
                >
                  Criar conta gratis
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right — form */}
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
                      Recebemos sua mensagem e retornaremos em ate 24 horas
                      uteis. Fique de olho no seu e-mail.
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
                            placeholder="Nome da imobiliaria"
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
                          Max. 2.000 caracteres. Nao inclua links.
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
                              <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 transition-transform group-hover:translate-x-0.5">
                                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25H10a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.897 28.897 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                              </svg>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center"
            >
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Perguntas frequentes
              </h2>
              <p className="mt-3 text-slate-600">
                Respostas rapidas para as duvidas mais comuns.
              </p>
            </motion.div>
            <FAQ />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
