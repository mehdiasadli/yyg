import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'loremflickr.com',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default nextConfig;
