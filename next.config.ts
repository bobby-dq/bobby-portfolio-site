import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["images.prismic.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
        pathname: "/bobby-quilacio-portfolio/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
