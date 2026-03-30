import Image from "next/image";

const REGISTER_URL = "https://app.mylarpro.com.br/register";

const navGroups = [
  {
    title: "Plataforma",
    links: [
      { label: "Funcionalidades", href: "/#funcionalidades" },
      { label: "Para quem", href: "/#personas" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Contato", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <Image
              src="/images/logo-white.svg"
              alt="Mylar Pro"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Plataforma completa de gestao imobiliaria para imobiliarias,
              construtoras e incorporadoras.
            </p>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold tracking-[0.15em] text-slate-500 uppercase">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div className="flex flex-col items-start gap-4">
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#2facde] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2599bb]"
            >
              Criar conta gratis
            </a>
            <a
              href="https://app.mylarpro.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Acessar plataforma
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 py-6 text-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Mylar Pro. Todos os direitos
            reservados. CNPJ: 54.865.990/0001-50
          </p>
        </div>
      </div>
    </footer>
  );
}
