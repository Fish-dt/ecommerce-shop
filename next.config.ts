import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.dummyjson.com'], // allow this domain
  },
  reactStrictMode: true,
};

export default nextConfig;
