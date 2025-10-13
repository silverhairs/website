import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Add fallbacks for Node.js modules that don't exist in the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      'fs/promises': false,
      path: false,
      module: false,
    };

    return config;
  },
  // Turbopack experimental configuration
  experimental: {
    turbo: {
      resolveAlias: {
        'fs/promises': './empty.js',
        'module': './empty.js',
      },
    },
  },
};

export default nextConfig;
