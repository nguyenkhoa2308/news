import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vnecdn.net',
      },
      {
        protocol: 'https',
        hostname: 'vcdn1-vnexpress.vnecdn.net',
      },
      {
        protocol: 'https',
        hostname: 'i1-vnexpress.vnecdn.net',
      },
      {
        protocol: 'https',
        hostname: 'i2-vnexpress.vnecdn.net',
      },
      {
        protocol: 'https',
        hostname: 'vnexpress.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
