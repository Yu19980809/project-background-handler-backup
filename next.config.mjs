/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'd1uzvjowrxhw13.cloudfront.net'
      }
    ]
  }
};

export default nextConfig;
