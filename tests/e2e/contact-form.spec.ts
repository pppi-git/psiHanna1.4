import { test, expect } from '@playwright/test';

test.describe('Formulário de Contato', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a página de contato
    await page.goto('/contacto');
    // Esperar que o formulário seja carregado
    await page.waitForSelector('form');
  });

  test('deve exibir todos os campos do formulário', async ({ page }) => {
    // Verificar se todos os campos estão presentes
    await expect(page.getByLabel('Nome')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Telefone (opcional)')).toBeVisible();
    await expect(page.getByLabel('Assunto')).toBeVisible();
    await expect(page.getByLabel('Mensagem')).toBeVisible();
    await expect(page.getByLabel('Forma de contacto preferida')).toBeVisible();
    
    // Verificar opções de assunto
    await expect(page.getByLabel('Agendar Consulta')).toBeVisible();
    await expect(page.getByLabel('Inscrição no Programa de 8 Semanas')).toBeVisible();
    await expect(page.getByLabel('Dúvida')).toBeVisible();
    await expect(page.getByLabel('Outro')).toBeVisible();
    
    // Verificar opções de contato preferido
    await expect(page.getByLabel('Email', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Telefone', { exact: true })).toBeVisible();
    await expect(page.getByLabel('WhatsApp')).toBeVisible();
    
    // Verificar botão de envio
    await expect(page.getByRole('button', { name: 'Enviar Mensagem' })).toBeVisible();
  });

  test('deve mostrar erros de validação quando o formulário for enviado vazio', async ({ page }) => {
    // Clicar no botão de enviar sem preencher os campos
    await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
    
    // Verificar mensagens de erro
    await expect(page.getByText('O nome deve ter pelo menos 2 caracteres')).toBeVisible();
    await expect(page.getByText('Email inválido')).toBeVisible();
    await expect(page.getByText('A mensagem deve ter pelo menos 10 caracteres')).toBeVisible();
  });

  test('deve preencher e enviar o formulário com sucesso', async ({ page }) => {
    // Preencher o formulário
    await page.getByLabel('Nome').fill('Usuário Teste');
    await page.getByLabel('Email').fill('teste@exemplo.com');
    await page.getByLabel('Telefone (opcional)').fill('912345678');
    await page.getByLabel('Dúvida').check();
    await page.getByLabel('Mensagem').fill('Esta é uma mensagem de teste para verificar o funcionamento do formulário de contato.');
    await page.getByLabel('WhatsApp').check();
    
    // Interceptar a requisição de envio do formulário
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Mensagem enviada com sucesso!' }),
      });
    });
    
    // Enviar o formulário
    await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
    
    // Verificar se a mensagem de sucesso aparece
    await expect(page.getByText('Mensagem enviada com sucesso!')).toBeVisible({ timeout: 5000 });
  });

  test('deve mostrar erro quando o envio falhar', async ({ page }) => {
    // Preencher o formulário
    await page.getByLabel('Nome').fill('Usuário Teste');
    await page.getByLabel('Email').fill('teste@exemplo.com');
    await page.getByLabel('Telefone (opcional)').fill('912345678');
    await page.getByLabel('Dúvida').check();
    await page.getByLabel('Mensagem').fill('Esta é uma mensagem de teste para verificar o funcionamento do formulário de contato.');
    await page.getByLabel('Email', { exact: true }).check();
    
    // Interceptar a requisição de envio do formulário e simular erro
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: false, 
          message: 'Ocorreu um erro ao enviar sua mensagem.', 
          error: 'permission denied' 
        }),
      });
    });
    
    // Enviar o formulário
    await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
    
    // Verificar se a mensagem de erro aparece
    await expect(page.getByText('Você não tem permissão para enviar mensagens. Verifique sua conexão.')).toBeVisible({ timeout: 5000 });
  });
}); 