import { isStudioConfigured } from "../../../../sanity.config";
import { Studio } from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isStudioConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-white">
            Studio não configurado
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Defina <code className="text-slate-200">NEXT_PUBLIC_SANITY_PROJECT_ID</code>{" "}
            e <code className="text-slate-200">NEXT_PUBLIC_SANITY_DATASET</code>{" "}
            no ambiente de build e publique novamente.
          </p>
        </div>
      </main>
    );
  }

  return <Studio />;
}
