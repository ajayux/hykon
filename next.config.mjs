/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "beta.hykon.dev14.intersmarthosting.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "beta.hykon.dev14.intersmarthosting.in",
        pathname: "/**",
      },
    ],
    qualities: [100],
    formats: ["image/avif", "image/webp"],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // minimumCacheTTL: 60,
  },
  // Compress responses
  // compress: true,
  // Enable React strict mode
  // reactStrictMode: true,
  // Power optimization
  // poweredByHeader: false,
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-slot"],
  },
  async redirects() {
    return [
      {
        source: "/annual-report",
        destination: "/investor-relations",
        permanent: true,
      },
      {
        source: "/csr-policy",
        destination: "/investor-relations",
        permanent: true,
      },
      {
        source: "/bogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/product",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
