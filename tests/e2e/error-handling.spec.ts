import { test, expect } from '@playwright/test';

test.describe('Tratamento de Erros', () => {
  test('deve exibir mensagens de erro de validação', async ({ page }) => {
    // Navegar para a página de contato
    await page.goto('/contacto');
    
    // Esperar que o formulário seja carregado
    await page.waitForSelector('form');
    
    // Clicar no botão de enviar sem preencher os campos
    await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
    
    // Verificar mensagens de erro
    await expect(page.getByText('O nome deve ter pelo menos 2 caracteres', { exact: false })).toBeVisible();
    await expect(page.getByText('Email inválido', { exact: false })).toBeVisible();
    await expect(page.getByText('A mensagem deve ter pelo menos 10 caracteres', { exact: false })).toBeVisible();
  });
}); 