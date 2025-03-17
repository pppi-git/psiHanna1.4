-- Script SQL simplificado para configuração do banco de dados
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de contatos
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

COMMENT ON TABLE public.contacts IS 'Tabela para armazenar mensagens de contato do site';
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Tabela de inscrições no programa
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

COMMENT ON TABLE public.program_signups IS 'Tabela para armazenar inscrições no programa de 8 semanas';
ALTER TABLE public.program_signups ENABLE ROW LEVEL SECURITY;

-- Tabela de dados das ferramentas
CREATE TABLE IF NOT EXISTS public.tools_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  tool_type TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS tools_data_user_id_idx ON public.tools_data (user_id);
CREATE INDEX IF NOT EXISTS tools_data_tool_type_idx ON public.tools_data (tool_type);
COMMENT ON TABLE public.tools_data IS 'Tabela para armazenar dados das ferramentas interativas';
ALTER TABLE public.tools_data ENABLE ROW LEVEL SECURITY; 