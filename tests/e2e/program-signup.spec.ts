import { test, expect } from '@playwright/test';

test.describe('Página do Programa', () => {
  test('deve carregar a página do programa corretamente', async ({ page }) => {
    // Navegar para a página do programa
    await page.goto('/programa');
    
    // Verificar se a página carregou corretamente
    await expect(page.locator('h1')).toBeVisible();
    
    // Verificar se o título da página contém "Programa"
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Programa');
  });
});
