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

## Licença

Todos os direitos reservados. 