// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'yt3.googleusercontent.com' },
      { protocol: 'http', hostname: 'googleusercontent.com' },
      { protocol: 'https', hostname: 'googleusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Дозволяємо і http, і https для вашого основного домену
      { protocol: 'https', hostname: 'app.booka.top' },
      { protocol: 'http', hostname: 'app.booka.top' }, 
      { protocol: 'https', hostname: 'pub-231bc7be1b7343d6b8e04d0b559c9156.r2.dev' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://app.booka.top/api/:path*',
      },
    ];
  },
};

export default nextConfig;