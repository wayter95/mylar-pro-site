const WAITLIST_URL = "https://lista.mylarpro.com.br";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo-white.svg"
              alt="Mylar Pro"
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <a
              href="/#funcionalidades"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Funcionalidades
            </a>
            <a
              href="/#personas"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Para quem
            </a>
            <a
              href="/contato"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Contato
            </a>
          </nav>
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#37B6D6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2ea5c4]"
          >
            Solicitar acesso
          </a>
        </div>
        <div className="mt-6 border-t border-slate-800 pt-6 text-center text-xs text-slate-500 sm:mt-8 sm:pt-8 sm:text-sm">
          <p>
            © {new Date().getFullYear()} Mylar Pro. Todos os direitos reservados.
          </p>
          <p className="mt-1">
            Plataforma de Gestão Imobiliária — Imobiliárias, Construtoras e
            Incorporadoras
          </p>
          <p className="mt-1">CNPJ: 54.865.990/0001-50</p>
        </div>
      </div>
    </footer>
  );
}
