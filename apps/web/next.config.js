/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["queries"],
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
