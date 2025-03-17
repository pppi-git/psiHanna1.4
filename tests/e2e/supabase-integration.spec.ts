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
    expect(responseBody.message).toContain('Para configurar o banco de dados');
  });

  test('deve verificar se as variáveis de ambiente do Supabase estão configuradas', async ({ page }) => {
    // Navegar para a página inicial
    await page.goto('/');
    
    // Verificar se a página carrega sem erros relacionados ao Supabase
    await expect(page.locator('body')).toBeVisible();
    
    // Verificar se não há erros visíveis na página
    const errorText = await page.locator('body').textContent();
    expect(errorText).not.toContain('Error loading Supabase');
    expect(errorText).not.toContain('Invalid API key');
  });
}); 