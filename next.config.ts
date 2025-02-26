import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  output: "export",
  basePath: '/TMDB', // 設定 GitHub Pages 的子目錄
  assetPrefix: '/TMDB/', // 確保靜態資源的路徑正確
  images: {
    unoptimized: true,
    domains: ["image.tmdb.org"], // 允許 TMDB 的圖片來源
  }
};

export default nextConfig;
