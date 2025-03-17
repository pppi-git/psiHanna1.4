import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://hanarapsi.vercel.app';
  
  // Conteúdo do robots.txt com permissão para todos os bots rastrearem o site
  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Impedir rastreamento de páginas administrativas e privadas
Disallow: /admin/
Disallow: /api/

# Localização do sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 