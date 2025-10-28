import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "comet-roof.my.id",
      },
    ],
  },
};

export default nextConfig;
