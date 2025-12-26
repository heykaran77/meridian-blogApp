import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "4kwallpapers.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
