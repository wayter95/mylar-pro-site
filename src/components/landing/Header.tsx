"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WAITLIST_URL = "https://lista.mylarpro.com.br";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/#funcionalidades", label: "Funcionalidades" },
  { href: "/#personas", label: "Para quem" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 min-h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/images/logo-blue.svg"
            alt="Mylar Pro"
            className="h-7 w-auto sm:h-8 md:h-10"
          />
        </a>
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-[#37B6D6]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center sm:flex">
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#37B6D6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2ea5c4]"
          >
            Solicitar acesso
          </a>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#37B6D6]"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 border-t border-slate-200 pt-4">
                <a
                  href={WAITLIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-lg bg-[#37B6D6] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#2ea5c4]"
                >
                  Solicitar acesso
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
