# Testes de Integração - Hanara Psychology

Este diretório contém testes de integração para o site Hanara Psychology, focando principalmente nas funcionalidades de formulários de contato e inscrição no programa.

## Estrutura de Testes

Os testes estão organizados da seguinte forma:

- `e2e/contact-form.spec.ts`: Testes para o formulário de contato
- `e2e/program-signup.spec.ts`: Testes para o formulário de inscrição no programa
- `e2e/supabase-integration.spec.ts`: Testes para verificar a integração com o Supabase
- `e2e/error-handling.spec.ts`: Testes para verificar o tratamento de erros e logs

## Como Executar os Testes

### Pré-requisitos

- Node.js instalado
- Projeto configurado com as dependências instaladas

### Comandos

Para executar todos os testes:

```bash
npm test
```

Para executar testes específicos:

```bash
# Testes do formulário de contato
npm run test:contact

# Testes do formulário de inscrição no programa
npm run test:program

# Testes de integração com Supabase
npm run test:integration

# Testes de tratamento de erros
npm run test:errors
```

Para executar os testes com interface gráfica:

```bash
npm run test:ui
```

Para executar os testes em modo de depuração:

```bash
npm run test:debug
```

## Cobertura de Testes

Os testes cobrem os seguintes cenários:

### Formulário de Contato
- Verificação da presença de todos os campos
- Validação de campos obrigatórios
- Envio bem-sucedido do formulário
- Tratamento de erros durante o envio

### Formulário de Inscrição no Programa
- Verificação da presença de todos os campos
- Validação de campos obrigatórios
- Envio bem-sucedido do formulário
- Tratamento de erros durante o envio

### Integração com Supabase
- Verificação do endpoint de configuração do banco de dados
- Verificação da disponibilidade do cliente Supabase
- Verificação das variáveis de ambiente

### Tratamento de Erros
- Erros de permissão do Supabase
- Erros de tabela não encontrada
- Erros genéricos
- Erros de rede

## Manutenção dos Testes

Ao fazer alterações nos formulários ou na integração com o Supabase, certifique-se de atualizar os testes correspondentes para garantir que eles continuem funcionando corretamente.

## Relatórios de Testes

Os relatórios de testes são gerados automaticamente e podem ser encontrados no diretório `playwright-report` após a execução dos testes. 