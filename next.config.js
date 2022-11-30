/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "webservices.jumpingcrab.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
