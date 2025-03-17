-- Script SQL para configuração direta do banco de dados Supabase
-- Este script cria as tabelas e políticas necessárias para o funcionamento da aplicação

-- Tabela de contatos
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  preferred_contact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Políticas para a tabela de contatos
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Permitir inserções anônimas
CREATE POLICY IF NOT EXISTS "Permitir inserções anônimas" 
  ON public.contacts FOR INSERT 
  WITH CHECK (true);

-- Permitir leitura apenas para usuários autenticados
CREATE POLICY IF NOT EXISTS "Permitir leitura para usuários autenticados" 
  ON public.contacts FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Tabela de inscrições no programa
CREATE TABLE IF NOT EXISTS public.program_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  modality TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Políticas para a tabela de inscrições no programa
ALTER TABLE public.program_signups ENABLE ROW LEVEL SECURITY;

-- Permitir inserções anônimas
CREATE POLICY IF NOT EXISTS "Permitir inserções anônimas" 
  ON public.program_signups FOR INSERT 
  WITH CHECK (true);

-- Permitir leitura apenas para usuários autenticados
CREATE POLICY IF NOT EXISTS "Permitir leitura para usuários autenticados" 
  ON public.program_signups FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Tabela de inscrições beta
CREATE TABLE IF NOT EXISTS public.beta_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Políticas para a tabela de inscrições beta
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

-- Permitir inserções anônimas
CREATE POLICY IF NOT EXISTS "Permitir inserções anônimas" 
  ON public.beta_signups FOR INSERT 
  WITH CHECK (true);

-- Permitir leitura apenas para usuários autenticados
CREATE POLICY IF NOT EXISTS "Permitir leitura para usuários autenticados" 
  ON public.beta_signups FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Função para verificar e criar a tabela beta_signups se não existir
CREATE OR REPLACE FUNCTION check_and_create_beta_signups_table()
RETURNS BOOLEAN AS $$
BEGIN
  -- Verificar se a tabela já existe
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'beta_signups') THEN
    -- Criar a tabela de inscrições beta
    CREATE TABLE public.beta_signups (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Configurar RLS (Row Level Security)
    ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

    -- Criar política para permitir inserções anônimas
    CREATE POLICY "Permitir inserções anônimas" ON public.beta_signups
      FOR INSERT WITH CHECK (true);

    -- Criar política para permitir leitura apenas para usuários autenticados
    CREATE POLICY "Permitir leitura para usuários autenticados" ON public.beta_signups
      FOR SELECT USING (auth.role() = 'authenticated');
      
    RETURN TRUE;
  ELSE
    RETURN TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Tabela de dados das ferramentas
CREATE TABLE IF NOT EXISTS public.tools_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  tool_type TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Políticas para a tabela de dados das ferramentas
ALTER TABLE public.tools_data ENABLE ROW LEVEL SECURITY;

-- Permitir inserções para usuários autenticados
CREATE POLICY IF NOT EXISTS "Permitir inserções para usuários autenticados" 
  ON public.tools_data FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Permitir leitura para usuários autenticados
CREATE POLICY IF NOT EXISTS "Permitir leitura para usuários autenticados" 
  ON public.tools_data FOR SELECT 
  USING (auth.uid() = user_id);

-- Permitir atualização para usuários autenticados
CREATE POLICY IF NOT EXISTS "Permitir atualização para usuários autenticados" 
  ON public.tools_data FOR UPDATE 
  USING (auth.uid() = user_id);

-- Permitir exclusão para usuários autenticados
CREATE POLICY IF NOT EXISTS "Permitir exclusão para usuários autenticados" 
  ON public.tools_data FOR DELETE 
  USING (auth.uid() = user_id);

-- Política para permitir acesso anônimo aos dados das ferramentas (opcional)
-- Descomente se quiser permitir acesso anônimo
-- CREATE POLICY IF NOT EXISTS "Permitir acesso anônimo" 
--   ON public.tools_data FOR ALL 
--   USING (true); 