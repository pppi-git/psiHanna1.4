import { NextResponse } from 'next/server';

export async function GET() {
  // URL base do site
  const baseUrl = 'https://hanarapsi.vercel.app';

  // Lista de rotas do site
  const routes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/blog',
    '/blog/tcc-ansiedade',
    '/blog/mindfulness-dia-a-dia',
    '/tools',
    '/tools/anxiety',
    '/tools/breathing',
    '/tools/pomodoro',
  ];

  // Gerar sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

  // Retornar o XML com o header adequado
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 