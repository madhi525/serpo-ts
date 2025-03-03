import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['leaflet'],
  images: {
    domains: ['cdnjs.cloudflare.com', 'drive.google.com'],
  },
};

export default nextConfig;
