import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["image.tmdb.org"], // 允許 TMDB 的圖片來源
  }
};

export default nextConfig;
