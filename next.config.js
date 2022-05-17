/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['movieplus.s3.amazonaws.com']
  }
}

module.exports = nextConfig
