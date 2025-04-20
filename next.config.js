/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Disable webpack cache to prevent ENOENT errors
    config.cache = false;
    
    // Add additional cache-related configurations
    config.watchOptions = {
      ignored: ['**/node_modules/**', '**/.next/**'],
      aggregateTimeout: 300,
      poll: 1000,
    };
    
    return config;
  },
};

module.exports = nextConfig;