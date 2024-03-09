/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'digital-world-2.myshopify.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
