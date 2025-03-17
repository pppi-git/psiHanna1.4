import { test, expect } from '@playwright/test';

test.describe('Tratamento de Erros e Logs', () => {
  test('deve capturar e exibir erros de permissão do Supabase', async ({ page }) => {
    // Navegar para a página de contato
    await page.goto('/contacto');
    
    // Preencher o formulário
    await page.getByLabel('Nome').fill('Usuário Teste');
    await page.getByLabel('Email').fill('teste@exemplo.com');
    await page.getByLabel('Telefone (opcional)').fill('912345678');
    await page.getByLabel('Dúvida').check();
    await page.getByLabel('Mensagem').fill('Esta é uma mensagem de teste para verificar o tratamento de erros.');
    await page.getByLabel('Email', { exact: true }).check();
    
    // Interceptar a requisição de envio do formulário e simular erro de permissão
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: false, 
          message: 'Ocorreu um erro ao enviar sua mensagem.', 
          error: 'permission denied for table contacts' 
        }),
      });
    });
    
    // Enviar o formulário
    await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
    
    // Verificar se a mensagem de erro específica para permissão negada aparece
    await expect(page.getByText('Você não tem permissão para enviar mensagens. Verifique sua conexão.')).toBeVisible({ timeout: 5000 });
  });

  test('deve capturar e exibir erros de tabela não encontrada', async ({ page }) => {
    // Navegar para a página de contato
    await page.goto('/contacto');
    
    // Preencher o formulário
    await page.getByLabel('Nome').fill('Usuário Teste');
    await page.getByLabel('Email').fill('teste@exemplo.com');
    await page.getByLabel('Telefone (opcional)').fill('912345678');
    await page.getByLabel('Dúvida').check();
    await page.getByLabel('Mensagem').fill('Esta é uma mensagem de teste para verificar o tratamento de erros.');
    await page.getByLabel('Email', { exact: true }).check();
    
    // Interceptar a requisição de envio do formulário e simular erro de tabela não encontrada
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: false, 
          message: 'Ocorreu um erro ao enviar sua mensagem.', 
          error: 'relation "contacts" does not exist' 
        }),
      });
    });
    
    // Enviar o formulário
    await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
    
    // Verificar se a mensagem de erro específica para tabela não encontrada aparece
    await expect(page.getByText('O serviço de mensagens está temporariamente indisponível. Tente novamente mais tarde.')).toBeVisible({ timeout: 5000 });
  });

  test('deve capturar e exibir erros genéricos', async ({ page }) => {
    // Navegar para a página de contato
    await page.goto('/contacto');
    
    // Preencher o formulário
    await page.getByLabel('Nome').fill('Usuário Teste');
    await page.getByLabel('Email').fill('teste@exemplo.com');
    await page.getByLabel('Telefone (opcional)').fill('912345678');
    await page.getByLabel('Dúvida').check();
    await page.getByLabel('Mensagem').fill('Esta é uma mensagem de teste para verificar o tratamento de erros.');
    await page.getByLabel('Email', { exact: true }).check();
    
    // Interceptar a requisição de envio do formulário e simular erro genérico
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ 
          success: false, 
          message: 'Ocorreu um erro ao enviar sua mensagem.', 
          error: 'Erro interno do servidor' 
        }),
      });
    });
    
    // Enviar o formulário
    await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
    
    // Verificar se a mensagem de erro genérica aparece
    await expect(page.getByText('Erro ao enviar mensagem: Erro interno do servidor')).toBeVisible({ timeout: 5000 });
  });

  test('deve capturar e exibir erros de rede', async ({ page }) => {
    // Navegar para a página de contato
    await page.goto('/contacto');
    
    // Preencher o formulário
    await page.getByLabel('Nome').fill('Usuário Teste');
    await page.getByLabel('Email').fill('teste@exemplo.com');
    await page.getByLabel('Telefone (opcional)').fill('912345678');
    await page.getByLabel('Dúvida').check();
    await page.getByLabel('Mensagem').fill('Esta é uma mensagem de teste para verificar o tratamento de erros.');
    await page.getByLabel('Email', { exact: true }).check();
    
    // Interceptar a requisição de envio do formulário e simular erro de rede
    await page.route('**/api/contact', async (route) => {
      await route.abort('failed');
    });
    
    // Enviar o formulário
    await page.getByRole('button', { name: 'Enviar Mensagem' }).click();
    
    // Verificar se a mensagem de erro de rede aparece
    await expect(page.getByText('Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato por outro meio.')).toBeVisible({ timeout: 5000 });
  });
}); 