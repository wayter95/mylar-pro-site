import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["sanity", "@sanity/types"],
};

export default nextConfig;
