import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Increase timeout for image optimization to handle slow CDN responses
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
};

export default nextConfig;
