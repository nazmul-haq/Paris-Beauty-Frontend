/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // onDemandEntries: {
  //   maxInactiveAge: 25 * 1000,
  //   pagesBufferLength: 2,
  // },
  // experimental: {

  //   largePageDataBytes: 128 * 100000,
  // },

  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig
