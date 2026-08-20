"use client";

import Link from "next/link";
import { useState } from "react";

import { useConsent } from "@/components/consent/ConsentProvider";

const primaryButton =
  "rounded-xl bg-[#2facde] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2599bb]";
const secondaryButton =
  "rounded-xl border border-slate-700 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-white/10";
const linkButton =
  "text-sm font-medium text-slate-400 underline underline-offset-4 transition hover:text-white";

export function CookieBanner() {
  const { decided, save } = useConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saving, setSaving] = useState(false);

  if (decided) {
    return null;
  }

  async function handleSave(nextAnalytics: boolean, nextMarketing: boolean) {
    setSaving(true);

    try {
      await save(nextAnalytics, nextMarketing);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      className="fixed inset-x-0 bottom-0 z-[9998] border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {showPreferences ? (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Preferências de cookies
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Escolha o que podemos usar. Os cookies necessários mantêm o site
                funcionando e não podem ser desativados.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked
                  disabled
                  aria-label="Cookies necessários, sempre ativos"
                  className="mt-0.5 size-4 accent-[#2facde]"
                />
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Necessários
                  </p>
                  <p className="text-xs text-slate-500">
                    Sempre ativos. Guardam apenas a sua escolha aqui.
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  className="mt-0.5 size-4 accent-[#2facde]"
                />
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Analíticos
                  </p>
                  <p className="text-xs text-slate-500">
                    Ajudam a entender quais páginas são mais úteis.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                  className="mt-0.5 size-4 accent-[#2facde]"
                />
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Marketing
                  </p>
                  <p className="text-xs text-slate-500">
                    Permitem medir a eficácia dos nossos anúncios.
                  </p>
                </div>
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave(analytics, marketing)}
                className={primaryButton}
              >
                Salvar preferências
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => setShowPreferences(false)}
                className={linkButton}
              >
                Voltar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs leading-relaxed text-slate-400">
              Usamos cookies para entender como o site é usado e medir nossos
              anúncios. Você escolhe o que permitir.{" "}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-4 transition hover:text-white"
              >
                Política de privacidade
              </Link>
              .
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave(true, true)}
                className={primaryButton}
              >
                Aceitar tudo
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave(false, false)}
                className={secondaryButton}
              >
                Recusar
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => setShowPreferences(true)}
                className={linkButton}
              >
                Preferências
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
