"use client";

import dynamic from "next/dynamic";

const StudioClient = dynamic(() => import("./StudioClient"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <p className="text-sm text-slate-400">Carregando o Studio…</p>
    </div>
  ),
});

export function Studio() {
  return <StudioClient />;
}
