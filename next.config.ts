import type { NextConfig } from "next";

// For GitHub Pages *project* sites, assets must be served from /<repo>.
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH to the correct value.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
