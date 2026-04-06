const securityHeaders = [
  // ✅ Prevents MIME type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // ✅ Prevents clickjacking
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // ✅ Controls referrer info sent with requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // ✅ Forces HTTPS (only enable on production with HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // ✅ Disables browser features you don't need
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // ✅ Enables XSS filter in older browsers
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // ✅ Content Security Policy — most important header
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // tighten in prod
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",       // blocks iframe embedding
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {

    async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  
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
