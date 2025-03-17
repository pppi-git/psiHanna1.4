import { test, expect } from '@playwright/test';

test.describe('Formulário de Inscrição no Programa', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar para a página do programa
    await page.goto('/programa');
    // Esperar que o formulário seja carregado
    await page.waitForSelector('form');
  });

  test('deve exibir todos os campos do formulário de inscrição', async ({ page }) => {
    // Verificar se todos os campos estão presentes
    await expect(page.getByLabel('Nome')).toBeVisible();
    await expect(page.getByLabel('Sobrenome')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Telefone')).toBeVisible();
    await expect(page.getByLabel('Modalidade')).toBeVisible();
    await expect(page.getByLabel('Mensagem (opcional)')).toBeVisible();
    
    // Verificar opções de modalidade
    await expect(page.getByLabel('Presencial')).toBeVisible();
    await expect(page.getByLabel('Online')).toBeVisible();
    
    // Verificar botão de envio
    await expect(page.getByRole('button', { name: 'Inscrever-se' })).toBeVisible();
  });

  test('deve mostrar erros de validação quando o formulário for enviado vazio', async ({ page }) => {
    // Clicar no botão de enviar sem preencher os campos
    await page.getByRole('button', { name: 'Inscrever-se' }).click();
    
    // Verificar mensagens de erro
    await expect(page.getByText('O nome deve ter pelo menos 2 caracteres')).toBeVisible();
    await expect(page.getByText('O sobrenome deve ter pelo menos 2 caracteres')).toBeVisible();
    await expect(page.getByText('Email inválido')).toBeVisible();
    await expect(page.getByText('Por favor, forneça um número de telefone válido')).toBeVisible();
    await expect(page.getByText('Por favor, selecione uma modalidade')).toBeVisible();
  });

  test('deve preencher e enviar o formulário de inscrição com sucesso', async ({ page }) => {
    // Preencher o formulário
    await page.getByLabel('Nome').fill('João');
    await page.getByLabel('Sobrenome').fill('Silva');
    await page.getByLabel('Email').fill('joao.silva@exemplo.com');
    await page.getByLabel('Telefone').fill('912345678');
    await page.getByLabel('Presencial').check();
    await page.getByLabel('Mensagem (opcional)').fill('Gostaria de mais informações sobre horários.');
    
    // Interceptar a requisição de envio do formulário
    await page.route('**/api/program-signup', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Inscrição enviada com sucesso!' }),
      });
    });
    
    // Enviar o formulário
    await page.getByRole('button', { name: 'Inscrever-se' }).click();
    
    // Verificar se a mensagem de sucesso aparece
    await expect(page.getByText('Inscrição enviada com sucesso!')).toBeVisible({ timeout: 5000 });
  });

  test('deve mostrar erro quando o envio da inscrição falhar', async ({ page }) => {
    // Preencher o formulário
    await page.getByLabel('Nome').fill('João');
    await page.getByLabel('Sobrenome').fill('Silva');
    await page.getByLabel('Email').fill('joao.silva@exemplo.com');
    await page.getByLabel('Telefone').fill('912345678');
    await page.getByLabel('Online').check();
    
    // Interceptar a requisição de envio do formulário e simular erro
    await page.route('**/api/program-signup', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: false, 
          message: 'Ocorreu um erro ao processar sua inscrição.', 
          error: 'permission denied' 
        }),
      });
    });
    
    // Enviar o formulário
    await page.getByRole('button', { name: 'Inscrever-se' }).click();
    
    // Verificar se a mensagem de erro aparece
    await expect(page.getByText('Você não tem permissão para se inscrever no programa')).toBeVisible({ timeout: 5000 });
  });
}); 