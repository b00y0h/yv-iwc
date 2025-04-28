import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@ux_bob/yv-iwc'],
  webpack: (config) => {
    config.resolve.symlinks = false
    return config
  },
}

export default nextConfig
