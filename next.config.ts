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
      {
        hostname: "mellow-gnat-788.convex.cloud",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
