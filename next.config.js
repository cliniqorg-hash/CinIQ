/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['image.pollinations.ai'],
    unoptimized: true,
  },
}

module.exports = nextConfig 