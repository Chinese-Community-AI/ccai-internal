import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/wiki/eng-bootcamp",
        destination: "/wiki/engineering-bootcamp/overview",
        permanent: true,
      },
      {
        source: "/wiki/eng-bootcamp/:path*",
        destination: "/wiki/engineering-bootcamp/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
