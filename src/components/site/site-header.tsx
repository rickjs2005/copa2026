"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/estadios", label: "Estádios em 3D" },
  { href: "/figurinhas", label: "Figurinhas" },
  { href: "/historia", label: "História" },
  { href: "/curiosidades", label: "Curiosidades" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // acessibilidade do menu móvel: foco no primeiro link ao abrir,
  // Escape fecha e devolve o foco ao botão hamburger
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display flex items-center gap-2 text-xl tracking-wide"
          aria-label="As Copas do Mundo — página inicial"
        >
          As<span className="text-gold">★</span>Copas
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
                  "font-display px-4 py-2 text-sm tracking-[0.14em] transition-colors",
                  active
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          ref={triggerRef}
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
          className="border-t border-border bg-background/95 px-4 pb-4 pt-2 backdrop-blur-xl lg:hidden"
        >
          {LINKS.map((link, i) => (
            <Link
              key={link.href}
              ref={i === 0 ? firstLinkRef : undefined}
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
