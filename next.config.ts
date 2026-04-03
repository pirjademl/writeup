import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            { hostname: 'images.unsplash.com', protocol: 'https' },
        ],
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
