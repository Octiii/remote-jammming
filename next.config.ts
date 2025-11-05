// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing assetPrefix
  assetPrefix: '/absproxy/3000', 

  // Your existing rewrites function
  async rewrites() {
    return [
      {
        source: '/absproxy/3000/:path*', 
        destination: '/:path*',      
      },
      {
        source: '/absproxy/3000',
        destination: '/',
      },
    ];
  },

  // Add allowedDevOrigins directly here
  allowedDevOrigins: ["https://code.ningun.eu"], 
};

export default nextConfig;