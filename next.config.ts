import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Wikimedia Commons (Special:FilePath redireciona p/ upload.wikimedia.org)
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      // thumbnails de vídeos
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
