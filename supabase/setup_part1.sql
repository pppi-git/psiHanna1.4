-- Parte 1: Criar a tabela de contatos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar a tabela de contatos se não existir
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_contact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar comentários à tabela
COMMENT ON TABLE public.contacts IS 'Tabela para armazenar mensagens de contato do site';

-- Configurar RLS (Row Level Security)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Verificar se a política já existe antes de criar
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'contacts' 
        AND policyname = 'Permitir inserções anônimas'
    ) THEN
        -- Criar política para permitir inserções anônimas
        EXECUTE 'CREATE POLICY "Permitir inserções anônimas" ON public.contacts
                FOR INSERT WITH CHECK (true)';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'contacts' 
        AND policyname = 'Permitir leitura para usuários autenticados'
    ) THEN
        -- Criar política para permitir leitura apenas para usuários autenticados
        EXECUTE 'CREATE POLICY "Permitir leitura para usuários autenticados" ON public.contacts
                FOR SELECT USING (auth.role() = ''authenticated'')';
    END IF;
END
$$; 