/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  eslint: {
    // Bật kiểm tra ESLint khi build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Không cho phép build thành công nếu có lỗi TypeScript
    ignoreBuildErrors: false,
  },
  webpack: (config) => {
    // Lấy rule xử lý file SVG hiện có
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Áp dụng lại rule hiện có, nhưng chỉ cho các file SVG có query ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Chuyển các file SVG khác thành React component
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // loại trừ nếu *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    // Điều chỉnh rule file loader để bỏ qua *.svg vì đã được xử lý riêng
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default nextConfig
