import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd, SITE_NAME, SITE_URL, websiteLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "As Copas do Mundo — história, campeões e estádios icônicos em 3D",
    template: "%s · Copas do Mundo",
  },
  description:
    "Um tributo interativo às Copas do Mundo: a linha do tempo de todos os campeões desde 1930, curiosidades e os estádios que viraram lendas — Maracanã, Azteca, Wembley e mais — explorados em 3D.",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "pt_BR",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  keywords: [
    "Copa do Mundo",
    "história das Copas",
    "campeões da Copa do Mundo",
    "Maracanã",
    "estádios em 3D",
    "final da Copa 2026",
    "curiosidades da Copa",
  ],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-emerald-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-black"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  );
}
