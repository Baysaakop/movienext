/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['movieplusmn.s3.amazonaws.com', 'media.graphassets.com', 'www.themoviedb.org']
  }
}

module.exports = nextConfig
