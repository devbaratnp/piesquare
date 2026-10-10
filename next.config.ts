import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd()),
    };
    return config;
  },
};

export default nextConfig;
