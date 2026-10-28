import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";
import { buildSecurityHeaders } from "./lib/securityHeaders";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // Two root layouts (fr, en): a single 404 page for unmatched URLs.
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: buildSecurityHeaders(process.env.NODE_ENV === "development") }];
  },
};

// withBotId proxies the BotID challenge through this domain (no third-party script origin).
export default withBotId(nextConfig);
