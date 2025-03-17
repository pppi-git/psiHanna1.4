# Hanara Psicologia

Aplicação web para serviços de psicologia com foco em Terapia Cognitivo-Comportamental, Mindfulness e programa de 8 semanas para controlo de stress e ansiedade.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- Shadcn UI (componentes baseados em Radix UI)
- Azure OpenAI (para o chatbot)

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
- Formulários de contato e inscrição

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
   ```
   AZURE_OPENAI_ENDPOINT=sua-url-do-azure-openai
   AZURE_OPENAI_API_KEY=sua-chave-api-do-azure
   ```
4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto

- `/app`: Páginas e rotas da aplicação (Next.js App Router)
- `/components`: Componentes reutilizáveis
- `/public`: Arquivos estáticos
- `/styles`: Estilos globais
- `/lib`: Utilitários e funções auxiliares
- `/hooks`: React Hooks personalizados
- `/constants`: Constantes e dados estáticos

## Deployment

Para fazer o build de produção:

```bash
npm run build
```

Para iniciar o servidor de produção:

```bash
npm start
```

## Licença

Todos os direitos reservados. 