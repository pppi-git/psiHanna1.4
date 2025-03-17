import { test, expect } from '@playwright/test';

test.describe('Formulário de Contato', () => {
  test('deve exibir o formulário de contato', async ({ page }) => {
    // Navegar para a página de contato
    await page.goto('/contacto');
    
    // Verificar se o formulário está presente
    await expect(page.locator('form')).toBeVisible();
    
    // Verificar se os campos principais estão presentes
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    
    // Verificar botão de envio
    await expect(page.getByRole('button', { name: 'Enviar Mensagem' })).toBeVisible();
  });
}); 