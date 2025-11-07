import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/app'
};

module.exports = {
  allowedDevOrigins: ["https://dev.ningun.eu"],
}

export default nextConfig;