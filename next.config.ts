import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, _) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      "fs/promises": false,
      path: false,
      module: false,
    };

    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        "fs/promises": "./empty.js",
        module: "./empty.js",
      },
    },
  },
};

export default nextConfig;
