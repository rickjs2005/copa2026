import Image from "next/image";
import { Play } from "lucide-react";
import type { MediaVideo } from "@/data/media";

/** Card de vídeo leve: thumbnail estática + link externo — zero iframes
 *  no carregamento (performance) e título real validado via oEmbed. */
export function VideoCard({ video }: { video: MediaVideo }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border bg-card transition-colors hover:border-gold/60"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-black transition-transform group-hover:scale-110 motion-reduce:transform-none"
        >
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        </span>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-sm font-semibold leading-snug">{video.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {video.label} · YouTube ↗
        </p>
      </div>
    </a>
  );
}
