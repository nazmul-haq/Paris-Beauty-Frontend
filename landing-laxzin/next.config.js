/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Build optimizations
  eslint: { 
    ignoreDuringBuilds: true 
  },
  
  // Performance optimizations
  swcMinify: true,
  compress: true,
  
  // VPS compatibility
  trailingSlash: false,
  assetPrefix: '',
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Image optimization for Next.js 14.2
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  
  // Build optimizations
  productionBrowserSourceMaps: false,
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error']
    } : false,
  },

  // Webpack optimizations for Next.js 14.2
  webpack: (config, { dev, isServer, webpack }) => {
    // Development optimizations
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }

    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxSize: 244000,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: -5,
              reuseExistingChunk: true,
            },
          },
        },
        usedExports: true,
        sideEffects: false,
      };
      
      config.parallelism = 1;
    }

    // Server-side optimizations
    if (isServer) {
      config.externals = [...(config.externals || []), 'axios'];
    }

    // Add webpack plugins for better optimization
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    );

    return config;
  },

  // Experimental features for Next.js 14.2
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

module.exports = nextConfig;