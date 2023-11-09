/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["queries"],
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  output: "standalone",
}

module.exports = nextConfig
