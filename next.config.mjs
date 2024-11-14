/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '45.158.14.136',
            pathname: '/**', // Tüm yolları kabul eder
          }
        ],
      },
};

export default nextConfig;
