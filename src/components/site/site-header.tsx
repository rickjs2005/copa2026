"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/jogos", label: "Jogos" },
  { href: "/tabela", label: "Tabela" },
  { href: "/mata-mata", label: "Mata-mata" },
  { href: "/estatisticas", label: "Estatísticas" },
  { href: "/selecoes", label: "Seleções" },
  { href: "/estadios", label: "Estádios" },
  { href: "/historia", label: "História" },
  { href: "/noticias", label: "Notícias" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight"
          aria-label="Copa 2026 — página inicial"
        >
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-black text-black"
          >
            26
          </span>
          <span className="text-lg">
            copa<span className="text-emerald-400">2026</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-white/5 lg:hidden"
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Principal (móvel)"
          className="border-t border-white/8 bg-background/95 px-4 pb-4 pt-2 backdrop-blur-xl lg:hidden"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              className={cn(
                "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-white/10 text-foreground"
                  : "text-muted-foreground hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
