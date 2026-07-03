import type { Metadata } from "next";
import { SectionHeading } from "@/components/site/section-heading";
import { StickerCard } from "@/components/site/sticker-card";
import { STICKERS } from "@/data/stickers";
import { breadcrumbLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Figurinhas da Copa 2026 — jogadores e os áudios que viralizaram",
  description:
    "O álbum de figurinhas desta Copa: Messi, Cucurella, Vini Jr, Mbappé e cia — cada figurinha com o áudio/meme brasileiro que viralizou, do 'We Arredi' ao hino do Cucurella.",
  alternates: { canonical: "/figurinhas" },
};

export default function FigurinhasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        eyebrow="Cole no álbum · edição 2026"
        title="Figurinhas da Copa"
        description="Os craques desta Copa com os áudios que dominaram o TikTok brasileiro — toque no som de cada figurinha para ouvir. As lendárias brilham. ✨"
      />

      {/* sem <Reveal> aqui: fotos eager fora de wrapper animado (padrão do site) */}
      <div className="grid grid-cols-1 gap-4 min-[440px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {STICKERS.map((sticker) => (
          <StickerCard key={sticker.slug} sticker={sticker} />
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        Figurinhas ilustrativas e não-oficiais, criadas para este tributo. Fotos
        dos jogadores: Wikimedia Commons, sob licenças livres, com crédito em
        cada figurinha. Os áudios e músicas pertencem aos seus criadores — aqui
        eles são apenas linkados para o YouTube, nada é hospedado neste site.
      </p>

      <JsonLd
        data={breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Figurinhas", path: "/figurinhas" },
        ])}
      />
    </div>
  );
}
