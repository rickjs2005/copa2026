"use client";

import { useEffect, useRef, useState } from "react";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Botão de compartilhar reto: usa a Web Share API quando disponível e
 *  cai para copiar o link na área de transferência. */
export function ShareButton({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleClick() {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // usuário cancelou o share nativo — silencioso
      if (err instanceof DOMException && err.name === "AbortError") return;
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 border border-border bg-card px-4 text-sm font-semibold transition-colors hover:border-gold/60",
        className
      )}
    >
      <Share2 aria-hidden className="h-4 w-4" />
      {copied ? "Link copiado ✓" : "Compartilhar"}
    </button>
  );
}
