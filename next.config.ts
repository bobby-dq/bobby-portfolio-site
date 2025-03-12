// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.prismic.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
        pathname: "/bobby-quilacio-portfolio/**",
      },
    ],
  },
};

export default nextConfig;
