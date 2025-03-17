-- Parte 3: Criar a tabela de dados das ferramentas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar a tabela de dados das ferramentas se não existir
CREATE TABLE IF NOT EXISTS public.tools_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  tool_type TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar índice para melhorar a performance de consultas por user_id
CREATE INDEX IF NOT EXISTS tools_data_user_id_idx ON public.tools_data (user_id);

-- Adicionar índice para melhorar a performance de consultas por tool_type
CREATE INDEX IF NOT EXISTS tools_data_tool_type_idx ON public.tools_data (tool_type);

-- Adicionar comentários à tabela
COMMENT ON TABLE public.tools_data IS 'Tabela para armazenar dados das ferramentas interativas';

-- Configurar RLS (Row Level Security)
ALTER TABLE public.tools_data ENABLE ROW LEVEL SECURITY;

-- Verificar se as políticas já existem antes de criar
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'tools_data' 
        AND policyname = 'Permitir inserções de usuários autenticados'
    ) THEN
        -- Criar política para permitir inserções de usuários autenticados apenas para seus próprios dados
        EXECUTE 'CREATE POLICY "Permitir inserções de usuários autenticados" ON public.tools_data
                FOR INSERT WITH CHECK (auth.uid() = user_id)';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'tools_data' 
        AND policyname = 'Permitir leitura de usuários autenticados'
    ) THEN
        -- Criar política para permitir leitura de usuários autenticados apenas para seus próprios dados
        EXECUTE 'CREATE POLICY "Permitir leitura de usuários autenticados" ON public.tools_data
                FOR SELECT USING (auth.uid() = user_id)';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'tools_data' 
        AND policyname = 'Permitir atualização de usuários autenticados'
    ) THEN
        -- Criar política para permitir atualização de usuários autenticados apenas para seus próprios dados
        EXECUTE 'CREATE POLICY "Permitir atualização de usuários autenticados" ON public.tools_data
                FOR UPDATE USING (auth.uid() = user_id)';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'tools_data' 
        AND policyname = 'Permitir exclusão de usuários autenticados'
    ) THEN
        -- Criar política para permitir exclusão de usuários autenticados apenas para seus próprios dados
        EXECUTE 'CREATE POLICY "Permitir exclusão de usuários autenticados" ON public.tools_data
                FOR DELETE USING (auth.uid() = user_id)';
    END IF;
END
$$; 