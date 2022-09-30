/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['movieplus-mn.s3.amazonaws.com', 'media.graphassets.com', 'www.themoviedb.org']
  }
}

module.exports = nextConfig
