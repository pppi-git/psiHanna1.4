import { test, expect } from '@playwright/test';

test.describe('Integração com Supabase', () => {
  test('deve verificar se o endpoint de configuração do banco de dados está funcionando', async ({ request }) => {
    // Fazer uma requisição para o endpoint de configuração do banco de dados
    const response = await request.get('/api/setup-db');
    
    // Verificar se a resposta foi bem-sucedida
    expect(response.ok()).toBeTruthy();
    
    // Verificar o conteúdo da resposta
    const responseBody = await response.json();
    expect(responseBody.success).toBeTruthy();
    expect(responseBody.message).toContain('Tabelas criadas com sucesso');
  });

  test('deve verificar se o cliente Supabase está configurado corretamente', async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('/');
    
    // Executar um script para verificar se o cliente Supabase está disponível
    const supabaseAvailable = await page.evaluate(() => {
      // @ts-ignore - Verificar se a variável global do Supabase existe
      return !!window.supabase;
    });
    
    // Verificar se o cliente Supabase está disponível
    expect(supabaseAvailable).toBeTruthy();
  });

  test('deve verificar se as variáveis de ambiente do Supabase estão configuradas', async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('/');
    
    // Executar um script para verificar se as variáveis de ambiente estão configuradas
    const envVarsConfigured = await page.evaluate(() => {
      // @ts-ignore - Verificar se as variáveis de ambiente estão definidas
      return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    });
    
    // Verificar se as variáveis de ambiente estão configuradas
    expect(envVarsConfigured).toBeTruthy();
  });
}); 