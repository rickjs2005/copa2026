import Image from "next/image";
import { Music4 } from "lucide-react";
import type { Sticker } from "@/data/stickers";
import { ShareButton } from "./share-button";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

const RARITY = {
  lendaria: {
    label: "★ Lendária",
    frame: "border-gold",
    band: "text-gold",
    holo: true,
  },
  ouro: {
    label: "Ouro",
    frame: "border-gold/50",
    band: "text-gold/90",
    holo: true,
  },
  prata: {
    label: "Prata",
    frame: "border-foreground/30",
    band: "text-foreground/80",
    holo: false,
  },
} as const;

/** Figurinha de álbum: moldura por raridade, brilho holográfico,
 *  foto real (Commons, com crédito) ou versão ilustrada, e o áudio
 *  viral LINKADO ao YouTube (nada de mídia hospedada aqui). */
export function StickerCard({ sticker }: { sticker: Sticker }) {
  const rarity = RARITY[sticker.rarity];

  return (
    <article
      id={sticker.slug}
      className={cn(
        "flex h-full scroll-mt-24 flex-col border-2 bg-card",
        rarity.frame,
        rarity.holo && "holo relative"
      )}
    >
      {/* a estampa */}
      <div className="relative m-2 border border-border">
        <div className="relative aspect-[4/5] overflow-hidden">
          {sticker.photo ? (
            <Image
              src={sticker.photo.src}
              alt={`Figurinha de ${sticker.name}`}
              fill
              loading="eager"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover object-top"
            />
          ) : (
            // figurinha "ilustrada" — sem foto livre disponível
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-grass/20 to-background">
              <span aria-hidden className="text-7xl">
                {sticker.flag}
              </span>
              <span aria-hidden className="font-display text-6xl text-foreground/15">
                ?
              </span>
            </div>
          )}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#0b0d09]/85 via-transparent to-[#0b0d09]/30"
          />
          {/* número da camisa */}
          <span
            aria-hidden
            className="font-display absolute right-2 top-1 text-3xl text-foreground/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] sm:right-3 sm:text-5xl"
          >
            {sticker.shirt}
          </span>
          {/* raridade */}
          <span
            className={cn(
              "font-display absolute left-2 top-2 text-[10px] tracking-[0.18em] [text-shadow:0_1px_6px_rgba(0,0,0,0.8)] sm:left-3 sm:text-xs",
              rarity.band
            )}
          >
            {rarity.label}
          </span>
          {/* nome */}
          <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
            <p className="font-display break-words text-lg leading-none [text-shadow:0_1px_8px_rgba(0,0,0,0.8)] sm:text-2xl">
              {sticker.name}
            </p>
            <p className="mt-1 text-[11px] text-foreground/85 sm:text-xs">
              <span aria-hidden>{sticker.flag}</span> {sticker.country} ·{" "}
              {sticker.position}
            </p>
          </div>
        </div>
      </div>

      {/* verso da figurinha */}
      <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
        <p className="border-l-2 border-gold pl-2.5 text-xs font-semibold italic leading-snug sm:pl-3 sm:text-sm">
          “{sticker.memePhrase}”
        </p>
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {sticker.funFact}
        </p>

        {sticker.audio && (
          <a
            href={`https://www.youtube.com/watch?v=${sticker.audio.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 border border-border bg-background/60 p-2.5 transition-colors hover:border-gold/60 sm:gap-3 sm:p-3"
          >
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center bg-gold text-black transition-transform group-hover:scale-105 motion-reduce:transform-none sm:h-9 sm:w-9"
            >
              <Music4 className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold leading-tight sm:text-sm">
                {sticker.audio.label}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">
                {sticker.audio.videoTitle} · YouTube ↗
              </span>
            </span>
          </a>
        )}

        <div className="flex flex-wrap items-end justify-between gap-2 border-t border-border pt-3">
          <ShareButton
            url={`${SITE_URL}/figurinhas#${sticker.slug}`}
            title={`Figurinha ${sticker.name} — As🏆Copas`}
            className="min-h-9 px-3 text-xs"
          />
          {sticker.photo && (
            <p className="min-w-0 flex-1 text-right text-[10px] leading-tight text-muted-foreground">
              {sticker.photo.credit}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
