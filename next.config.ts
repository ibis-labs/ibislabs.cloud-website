import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.fourthwall.com',
      },
      {
        protocol: 'https',
        hostname: 'fourthwall.com',
      },
      {
        protocol: 'https',
        hostname: '*.fourthwall.dev',
      },
      {
        protocol: 'https',
        hostname: 'fourthwall.dev',
      },
    ],
  },
};

export default nextConfig;
