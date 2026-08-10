import Image from "next/image";
import Link from "next/link";
import { APP_URL, REGISTER_URL } from "@/lib/navigation";

const navGroups = [
  {
    title: "Produto",
    links: [
      { label: "Todos os recursos", href: "/features" },
      { label: "CRM e negociações", href: "/features/crm" },
      { label: "Canais de atendimento", href: "/features/channels" },
      { label: "Cobranças e repasses", href: "/features/billing" },
      { label: "Financeiro", href: "/features/financial" },
      { label: "Mila e ferramentas de IA", href: "/features/ai" },
    ],
  },
  {
    title: "Para quem",
    links: [
      { label: "Corretor autônomo", href: "/personas/broker" },
      { label: "Imobiliária", href: "/personas/real-estate" },
      { label: "Lançamentos", href: "/personas/development" },
      { label: "Comparar as versões", href: "/personas" },
    ],
  },
  {
    title: "Aplicativos",
    links: [
      { label: "MyLar Pro Brokers", href: "/features/broker-app" },
      { label: "MyLar Pro Home", href: "/features/client-portal" },
      { label: "Catálogo público", href: "/features/property-catalog" },
      { label: "Assinatura de contratos", href: "/features/digital-signature" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Preços", href: "/plans" },
      { label: "Contato", href: "/contact" },
      { label: "Política de privacidade", href: "/brokers/privacy-policy" },
      { label: "Termos de uso", href: "/brokers/terms-of-use" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.6fr_repeat(4,1fr)] lg:gap-8">
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
              A plataforma que reúne CRM, atendimento, contratos, cobrança e
              financeiro do mercado imobiliário em uma operação só.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#2facde] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2599bb]"
              >
                Criar conta grátis
              </a>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Acessar plataforma
              </a>
            </div>
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
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-2 border-t border-slate-800/80 py-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} MyLar Pro. Todos os direitos
            reservados. CNPJ 54.865.990/0001-50
          </p>
          <p className="text-xs text-slate-500">Feito no Brasil</p>
        </div>
      </div>
    </footer>
  );
}
