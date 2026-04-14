import createNextIntlPlugin from "next-intl/plugin"

import withBundleAnalyzer from "@next/bundle-analyzer"

const withNextIntl = createNextIntlPlugin()

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "framer-motion"],
  },
  images: {
    qualities: [60, 65, 68, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://c.clarity.ms https://scripts.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://www.googletagmanager.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://flagcdn.com https://images.unsplash.com https://img.freepik.com https://raw.githubusercontent.com https://www.clarity.ms https://c.clarity.ms https://t.clarity.ms; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://region1.google-analytics.com https://region1.analytics.google.com https://analytics.google.com https://www.googletagmanager.com https://www.clarity.ms https://c.clarity.ms https://t.clarity.ms https://y.clarity.ms; form-action 'self' https://api.web3forms.com; manifest-src 'self'; frame-src 'self'; object-src 'none';",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
}

export default analyzer(withNextIntl(nextConfig))
