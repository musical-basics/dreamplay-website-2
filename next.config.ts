import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dreamplaypianos.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/shipping',
        destination: '/information-and-policies/shipping',
        permanent: true,
      },
      {
        source: '/special-offer',
        destination: '/intro-offer',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/buy-product',
        destination: '/checkout-pages/buy-product',
      },
      {
        source: '/buy-product2',
        destination: '/checkout-pages/buy-product2',
      },
      {
        source: '/buy-product3',
        destination: '/checkout-pages/buy-product3',
      },
    ];
  },
};

export default nextConfig;
