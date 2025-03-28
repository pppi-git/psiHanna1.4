# Hanara Psicologia

Aplicação web para serviços de psicologia com foco em Terapia Cognitivo-Comportamental, Mindfulness e programa de 8 semanas para controlo de stress e ansiedade.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- Shadcn UI (componentes baseados em Radix UI)
- Azure OpenAI (para o chatbot)
- Supabase (banco de dados e autenticação)

## Funcionalidades

- Site institucional com informações sobre serviços de psicologia
- Blog com artigos sobre saúde mental
- Ferramentas interativas de saúde mental:
  - Respiração Consciente
  - Registro de Pensamentos
  - Diário de Gratidão
  - Plano de Ação
  - Meditações Guiadas
- Chatbot de assistência psicológica
- Formulários de contato e inscrição (integrados com Supabase)
- Persistência de dados das ferramentas (local e no Supabase quando autenticado)

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
   ```
   # Configurações da API Azure OpenAI
   AZURE_OPENAI_ENDPOINT=sua-url-do-azure-openai
   AZURE_OPENAI_API_KEY=sua-chave-api-do-azure
   
   # Configurações do Supabase
   NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-do-supabase
   ```
4. Configure o banco de dados Supabase:
   - Execute o script SQL em `supabase/setup.sql` no console SQL do Supabase
   - Ou acesse a rota `/api/setup-db` após iniciar o servidor
5. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto

- `/app`: Páginas e rotas da aplicação (Next.js App Router)
- `/components`: Componentes reutilizáveis
- `/public`: Arquivos estáticos
- `/styles`: Estilos globais
- `/lib`: Utilitários e funções auxiliares
  - `/lib/supabase`: Clientes Supabase para navegador e servidor
- `/hooks`: React Hooks personalizados
- `/constants`: Constantes e dados estáticos
- `/supabase`: Scripts SQL para configuração do Supabase

## Deployment

Para fazer o build de produção:

```bash
npm run build
```

Para iniciar o servidor de produção:

```bash
npm start
```

## Funcionalidades do Supabase

- **Formulários**: Os formulários de contato e inscrição no programa salvam dados no Supabase
- **Ferramentas Interativas**: Os dados das ferramentas são salvos localmente (localStorage) e, quando o usuário está autenticado, também são sincronizados com o Supabase
- **Autenticação**: Preparado para autenticação de usuários (desativada por padrão, pode ser ativada no middleware)

## Configuração do Supabase

Para configurar o banco de dados no Supabase, siga estas etapas:

1. Acesse o painel do Supabase (https://app.supabase.com)
2. Selecione seu projeto
3. Navegue até "SQL Editor" no menu lateral
4. Crie uma nova consulta
5. Execute os scripts SQL na seguinte ordem:

   a. Primeiro, execute o script para criar as tabelas:
   ```sql
   -- Copie o conteúdo do arquivo supabase/setup_simple.sql
   ```

   b. Em seguida, execute o script para criar as políticas:
   ```sql
   -- Copie o conteúdo do arquivo supabase/setup_policies.sql
   ```

   c. Se você não estiver usando autenticação e quiser permitir acesso anônimo aos dados das ferramentas:
   ```sql
   -- Copie o conteúdo do arquivo supabase/setup_anon_policy.sql
   ```

Nota: Se encontrar erros com a sintaxe `IF NOT EXISTS` para políticas, use os scripts separados que criamos.

## Licença

Todos os direitos reservados. 

## Testes

O projeto inclui testes de integração usando Playwright para verificar o funcionamento dos formulários de contato e inscrição, bem como a integração com o Supabase.

### Pré-requisitos para Testes

- Node.js instalado
- Projeto configurado com as dependências instaladas

### Executando os Testes

Para instalar o Playwright e suas dependências:

```bash
npm install -D @playwright/test --legacy-peer-deps
npx playwright install --with-deps chromium
```

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

Alternativamente, você pode usar o script de execução de testes:

```bash
./tests/run-tests.sh
```

### Integração Contínua

O projeto está configurado com GitHub Actions para executar os testes automaticamente em cada push para a branch main e em pull requests. Os resultados dos testes são disponibilizados como artefatos no GitHub Actions. 