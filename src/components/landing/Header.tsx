"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Icons } from "@/lib/icons";

const APP_URL = "https://app.mylarpro.com.br";
const REGISTER_URL = "https://app.mylarpro.com.br/register";

type NavChild = {
  href: string;
  label: string;
  description: string;
  accent: string;
};

type NavLink = {
  href: string;
  label: string;
  exact?: boolean;
  children?: NavChild[];
};

const navLinks: NavLink[] = [
  { href: "/", label: "Início", exact: true },
  {
    href: "/features",
    label: "Recursos",
    children: [
      {
        href: "/features/broker-app",
        label: "App do Corretor",
        description: "App nativo iOS e Android para o corretor em campo.",
        accent: "#1FB3D6",
      },
      {
        href: "/features/property-catalog",
        label: "Catálogo Público",
        description: "Site de imóveis com SEO e domínio próprio.",
        accent: "#2D6BE0",
      },
      {
        href: "/features/client-portal",
        label: "Portal do Cliente",
        description: "Inquilino paga, proprietário acompanha repasses.",
        accent: "#7C3AED",
      },
      {
        href: "/features/digital-signature",
        label: "Assinatura Digital",
        description: "Contrato assinado em minutos, com validade jurídica.",
        accent: "#0E2849",
      },
    ],
  },
  {
    href: "/personas",
    label: "Para quem",
    children: [
      {
        href: "/personas/broker",
        label: "Corretor autônomo",
        description: "CRM, catálogo no seu domínio e WhatsApp num só lugar.",
        accent: "#1FB3D6",
      },
      {
        href: "/personas/real-estate",
        label: "Imobiliária",
        description: "Locação, vendas, cobrança e financeiro com equipe.",
        accent: "#2D6BE0",
      },
      {
        href: "/personas/development",
        label: "Lançamentos & Empreendimentos",
        description:
          "Incorporadoras, construtoras e loteadoras — espelho de vendas, Meta Ads e BI executivo.",
        accent: "#0E2849",
      },
    ],
  },
  { href: "/contact", label: "Contato" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Track hash for active section highlighting
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const sections = ["funcionalidades", "personas"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  function isActive(link: { href: string; exact?: boolean }) {
    if (link.exact) {
      return pathname === "/" && !activeHash;
    }
    if (link.href.startsWith("/#")) {
      return pathname === "/" && activeHash === link.href.slice(1);
    }
    return pathname === link.href;
  }

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        className="border-b backdrop-blur-xl transition-colors duration-300"
        animate={{
          backgroundColor: scrolled
            ? "rgba(2, 6, 23, 0.92)"
            : "rgba(2, 6, 23, 0.6)",
          borderColor: scrolled
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.03)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2facde]/30 to-transparent" />

        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:h-16 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo-white.svg"
              alt="Mylar Pro"
              width={120}
              height={32}
              className="h-7 w-auto sm:h-8"
              priority
            />
          </a>

          {/* Separator */}
          <div className="hidden h-5 w-px bg-white/10 md:block" />

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link);
              const hasChildren = link.children && link.children.length > 0;

              if (hasChildren) {
                return (
                  <NavItemWithChildren
                    key={link.href}
                    link={link}
                    active={active}
                  />
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={[
                    "relative whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                  ].join(" ")}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              Entrar
            </a>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg bg-[#2facde] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_-4px_rgba(47,172,222,0.3)] transition hover:shadow-[0_0_24px_-2px_rgba(47,172,222,0.4)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-1.5">
                Criar conta
                <Icons.arrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex"
                >
                  <Icons.close className="size-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex"
                >
                  <Icons.menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden border-b border-white/5 bg-slate-950/98 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 pt-2 pb-4">
              {navLinks.map((link, i) => {
                const active = isActive(link);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition",
                        active
                          ? "bg-white/[0.06] text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white",
                      ].join(" ")}
                    >
                      {active && (
                        <span className="size-1.5 rounded-full bg-[#2facde]" />
                      )}
                      {link.label}
                    </a>

                    {link.children && link.children.length > 0 && (
                      <div className="ml-4 mt-1 mb-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                        {link.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                          >
                            <span
                              className="size-1 rounded-full"
                              style={{ backgroundColor: child.accent }}
                            />
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                className="mt-3 flex flex-col gap-2.5 border-t border-white/5 pt-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.25 }}
              >
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10"
                >
                  Entrar na plataforma
                </a>
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#2facde] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2599bb]"
                >
                  Criar conta grátis
                  <Icons.arrowRight className="size-3.5" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavItemWithChildren({
  link,
  active,
}: {
  link: NavLink;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(true);
  }

  function handleLeave() {
    closeTimeoutRef.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <a
        href={link.href}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          "relative flex items-center gap-1 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
          active
            ? "text-white"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
        ].join(" ")}
      >
        {link.label}
        <Icons.chevronDown
          aria-hidden
          className={`size-3 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {active && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-0 -z-10 rounded-lg bg-white/[0.08]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </a>

      <AnimatePresence>
        {open && link.children && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute left-1/2 top-full z-50 mt-2 w-[320px] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-slate-950/98 p-2 shadow-2xl backdrop-blur-xl"
          >
            {link.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                role="menuitem"
                className="group flex gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/[0.06]"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: child.accent }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-white">
                    {child.label}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-slate-400">
                    {child.description}
                  </span>
                </span>
                <Icons.arrowRight
                  aria-hidden
                  className="mt-1.5 size-3 shrink-0 text-slate-500 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </a>
            ))}

            <div className="mt-1 border-t border-white/5 pt-1">
              <a
                href={link.href}
                role="menuitem"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-[12px] font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                <span>
                  {link.href === "/personas"
                    ? "Comparar as três versões"
                    : "Ver todos os recursos"}
                </span>
                <span className="text-slate-500">→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
