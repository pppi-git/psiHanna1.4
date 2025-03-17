-- Parte 2: Criar a tabela de inscrições no programa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar a tabela de inscrições no programa se não existir
CREATE TABLE IF NOT EXISTS public.program_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  modality TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar comentários à tabela
COMMENT ON TABLE public.program_signups IS 'Tabela para armazenar inscrições no programa de 8 semanas';

-- Configurar RLS (Row Level Security)
ALTER TABLE public.program_signups ENABLE ROW LEVEL SECURITY;

-- Verificar se a política já existe antes de criar
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'program_signups' 
        AND policyname = 'Permitir inserções anônimas'
    ) THEN
        -- Criar política para permitir inserções anônimas
        EXECUTE 'CREATE POLICY "Permitir inserções anônimas" ON public.program_signups
                FOR INSERT WITH CHECK (true)';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'program_signups' 
        AND policyname = 'Permitir leitura para usuários autenticados'
    ) THEN
        -- Criar política para permitir leitura apenas para usuários autenticados
        EXECUTE 'CREATE POLICY "Permitir leitura para usuários autenticados" ON public.program_signups
                FOR SELECT USING (auth.role() = ''authenticated'')';
    END IF;
END
$$; 