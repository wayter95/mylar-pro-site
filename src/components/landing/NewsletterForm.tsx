"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLES = new Set(["de", "da", "do", "das", "dos", "e", "del", "van", "von", "di", "le", "la", "el"]);

function splitName(fullName: string): { nome: string; sobrenome: string } {
  const parts = fullName.trim().split(/\s+/);
  const nome = parts[0] || "";
  const sobrenome = parts.slice(1).join(" ") || "";
  return { nome, sobrenome };
}

/** Conta palavras significativas (ignora particulas) pra validar se tem nome + sobrenome real */
function hasFullName(fullName: string): boolean {
  const parts = fullName.trim().split(/\s+/);
  const significant = parts.filter((p) => !PARTICLES.has(p.toLowerCase()));
  return significant.length >= 2 && significant[1].length >= 2;
}

type FieldErrors = { name?: string; email?: string };

function validate(
  fullName: string,
  email: string,
): { ok: true } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};

  if (!fullName) {
    errors.name = "Informe seu nome.";
  } else if (!hasFullName(fullName)) {
    errors.name = "Informe nome e sobrenome.";
  }

  if (!email) {
    errors.email = "Informe seu e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "E-mail invalido.";
  }

  return Object.keys(errors).length === 0
    ? { ok: true }
    : { ok: false, errors };
}

export function NewsletterForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const loadTime = useRef(Date.now());

  function handleBlur(field: "name" | "email") {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate on blur to clear errors as user fixes
    const fd = new FormData(formRef.current!);
    const fullName = fd.get("fullName")?.toString().trim() || "";
    const email = fd.get("Email")?.toString().trim() || "";
    const result = validate(fullName, email);

    if (result.ok) {
      setFieldErrors({});
    } else {
      // Only show error for the field that was blurred
      setFieldErrors((prev) => ({
        ...prev,
        [field]: result.errors[field],
      }));
    }

    setFocused(null);
  }

  function handleFocus(field: string) {
    setFocused(field);
    // Clear the error for this field when user focuses back
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const fullName = fd.get("fullName")?.toString().trim() || "";
    const email = fd.get("Email")?.toString().trim() || "";
    const honeypot = fd.get("_hp")?.toString() || "";

    // Mark all as touched
    setTouched({ name: true, email: true });

    const result = validate(fullName, email);
    if (!result.ok) {
      setFieldErrors(result.errors);
      setStatus("idle");
      return;
    }

    setStatus("sending");
    const { nome, sobrenome } = splitName(fullName);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          Nome: nome,
          Sobrenome: sobrenome,
          _honeypot: honeypot,
          _t: loadTime.current,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setServerError(data?.error || "Erro ao enviar. Tente novamente.");
        setStatus("error");
      }
    } catch {
      setServerError("Erro ao enviar. Tente novamente.");
      setStatus("error");
    }
  }

  const nameErr = touched.name ? fieldErrors.name : undefined;
  const emailErr = touched.email ? fieldErrors.email : undefined;

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center gap-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/50 px-6 py-5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
                delay: 0.15,
              }}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/25"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-5 text-white"
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                />
              </svg>
            </motion.div>
            <div>
              <p className="font-bold text-slate-900">Tudo certo!</p>
              <p className="text-sm text-slate-500">
                Você receberá novidades e conteúdos exclusivos no seu e-mail.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="nl-hp">Website</label>
              <input
                type="text"
                id="nl-hp"
                name="_hp"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Inputs row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              {/* Nome completo */}
              <div className="relative flex-1">
                <div className="group relative">
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[11px]"
                    animate={{
                      boxShadow:
                        focused === "name"
                          ? "0 0 0 3px rgba(47,172,222,0.15), 0 4px 16px -4px rgba(47,172,222,0.1)"
                          : nameErr
                            ? "0 0 0 3px rgba(239,68,68,0.1), 0 4px 16px -4px rgba(239,68,68,0.06)"
                            : "0 0 0 0px rgba(47,172,222,0), 0 0px 0px 0px rgba(47,172,222,0)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <div
                    className={[
                      "relative flex items-center overflow-hidden rounded-xl border bg-white transition-colors",
                      nameErr
                        ? "border-red-300"
                        : "border-slate-200 group-focus-within:border-[#2facde]/40",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex shrink-0 items-center justify-center pl-3.5 transition-colors",
                        nameErr
                          ? "text-red-400"
                          : "text-slate-300 group-focus-within:text-[#2facde]",
                      ].join(" ")}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-[18px]"
                      >
                        <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      maxLength={120}
                      autoComplete="name"
                      placeholder="Seu nome completo"
                      onFocus={() => handleFocus("name")}
                      onBlur={() => handleBlur("name")}
                      className="w-full bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {nameErr && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-3.5 shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 15A7 7 0 108 1a7 7 0 000 14zm-.25-3a.75.75 0 101.5 0 .75.75 0 00-1.5 0zM8 4.5a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018 4.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {nameErr}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div className="relative flex-1">
                <div className="group relative">
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[11px]"
                    animate={{
                      boxShadow:
                        focused === "email"
                          ? "0 0 0 3px rgba(47,172,222,0.15), 0 4px 16px -4px rgba(47,172,222,0.1)"
                          : emailErr
                            ? "0 0 0 3px rgba(239,68,68,0.1), 0 4px 16px -4px rgba(239,68,68,0.06)"
                            : "0 0 0 0px rgba(47,172,222,0), 0 0px 0px 0px rgba(47,172,222,0)",
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <div
                    className={[
                      "relative flex items-center overflow-hidden rounded-xl border bg-white transition-colors",
                      emailErr
                        ? "border-red-300"
                        : "border-slate-200 group-focus-within:border-[#2facde]/40",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex shrink-0 items-center justify-center pl-3.5 transition-colors",
                        emailErr
                          ? "text-red-400"
                          : "text-slate-300 group-focus-within:text-[#2facde]",
                      ].join(" ")}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-[18px]"
                      >
                        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="Email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      className="w-full bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {emailErr && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      transition={{ duration: 0.15 }}
                      className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-3.5 shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 15A7 7 0 108 1a7 7 0 000 14zm-.25-3a.75.75 0 101.5 0 .75.75 0 00-1.5 0zM8 4.5a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018 4.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {emailErr}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="group relative shrink-0 overflow-hidden rounded-xl bg-[#2facde] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(47,172,222,0.4)] transition-all hover:shadow-[0_12px_28px_-6px_rgba(47,172,222,0.5)] disabled:opacity-60"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative flex items-center justify-center gap-2">
                  {status === "sending" ? (
                    <>
                      <svg
                        className="size-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-25"
                        />
                        <path
                          d="M4 12a8 8 0 018-8"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="opacity-75"
                        />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Inscrever-se
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </div>

            {/* Server error */}
            <AnimatePresence>
              {status === "error" && serverError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600"
                >
                  {serverError}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-[11px] text-slate-400">
              Sem spam. Cancelamento a qualquer momento.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
