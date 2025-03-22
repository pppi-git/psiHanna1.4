/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Otimizações para produção
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configuração para melhorar o desempenho
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'INP', 'TTFB'],
  },
  // Otimização de fontes
  optimizeFonts: true,
  // Otimizar carregamento de scripts
  poweredByHeader: false,
  // Compressão de imagens
  compress: true,
  // Otimização de build
  productionBrowserSourceMaps: false,
};

export default nextConfig;

