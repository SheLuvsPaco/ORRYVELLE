/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets parallel local previews use separate build folders (e.g. NEXT_DIST_DIR=.next-hero).
  distDir: process.env.NEXT_DIST_DIR || '.next',

  // Optimize images. WebP only: AVIF took 1.6–6.7s to encode each tall screenshot on first
  // request (and again per width), for files only ~15% smaller. Images never change in place,
  // so optimized copies are cached for a year.
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for security
  async headers() {
    return [
      // Project imagery is replaced rarely, so browsers keep it for a day and revalidate quietly.
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
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
};

module.exports = nextConfig;