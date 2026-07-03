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
    default: "Copa do Mundo 2026 — jogos, tabela e estatísticas",
    template: "%s · Copa 2026",
  },
  description:
    "Guia completo da Copa do Mundo FIFA 2026: jogos de hoje, resultados, tabela dos grupos, mata-mata, artilheiros, seleções, estádios e a contagem regressiva para a final.",
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
    "Copa do Mundo 2026",
    "jogos de hoje",
    "tabela da copa",
    "mata-mata",
    "artilheiros",
    "seleções",
    "resultados",
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
