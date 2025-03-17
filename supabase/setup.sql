-- Função para criar a tabela de contatos
CREATE OR REPLACE FUNCTION create_contact_table()
RETURNS void AS $$
BEGIN
  -- Verificar se a tabela já existe
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contacts') THEN
    -- Criar a tabela de contatos
    CREATE TABLE public.contacts (
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

    -- Criar política para permitir inserções anônimas
    CREATE POLICY "Permitir inserções anônimas" ON public.contacts
      FOR INSERT WITH CHECK (true);

    -- Criar política para permitir leitura apenas para usuários autenticados
    CREATE POLICY "Permitir leitura para usuários autenticados" ON public.contacts
      FOR SELECT USING (auth.role() = 'authenticated');
  ELSE
    RAISE NOTICE 'Tabela contacts já existe';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Função para criar a tabela de inscrições no programa
CREATE OR REPLACE FUNCTION create_program_signup_table()
RETURNS void AS $$
BEGIN
  -- Verificar se a tabela já existe
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'program_signups') THEN
    -- Criar a tabela de inscrições no programa
    CREATE TABLE public.program_signups (
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

    -- Criar política para permitir inserções anônimas
    CREATE POLICY "Permitir inserções anônimas" ON public.program_signups
      FOR INSERT WITH CHECK (true);

    -- Criar política para permitir leitura apenas para usuários autenticados
    CREATE POLICY "Permitir leitura para usuários autenticados" ON public.program_signups
      FOR SELECT USING (auth.role() = 'authenticated');
  ELSE
    RAISE NOTICE 'Tabela program_signups já existe';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Função para criar a tabela de dados das ferramentas
CREATE OR REPLACE FUNCTION create_tools_data_table()
RETURNS void AS $$
BEGIN
  -- Verificar se a tabela já existe
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'tools_data') THEN
    -- Criar a tabela de dados das ferramentas
    CREATE TABLE public.tools_data (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES auth.users(id),
      tool_type TEXT NOT NULL,
      data JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Adicionar índice para melhorar a performance de consultas por user_id
    CREATE INDEX tools_data_user_id_idx ON public.tools_data (user_id);
    
    -- Adicionar índice para melhorar a performance de consultas por tool_type
    CREATE INDEX tools_data_tool_type_idx ON public.tools_data (tool_type);

    -- Adicionar comentários à tabela
    COMMENT ON TABLE public.tools_data IS 'Tabela para armazenar dados das ferramentas interativas';

    -- Configurar RLS (Row Level Security)
    ALTER TABLE public.tools_data ENABLE ROW LEVEL SECURITY;

    -- Criar política para permitir inserções de usuários autenticados apenas para seus próprios dados
    CREATE POLICY "Permitir inserções de usuários autenticados" ON public.tools_data
      FOR INSERT WITH CHECK (auth.uid() = user_id);

    -- Criar política para permitir leitura de usuários autenticados apenas para seus próprios dados
    CREATE POLICY "Permitir leitura de usuários autenticados" ON public.tools_data
      FOR SELECT USING (auth.uid() = user_id);

    -- Criar política para permitir atualização de usuários autenticados apenas para seus próprios dados
    CREATE POLICY "Permitir atualização de usuários autenticados" ON public.tools_data
      FOR UPDATE USING (auth.uid() = user_id);

    -- Criar política para permitir exclusão de usuários autenticados apenas para seus próprios dados
    CREATE POLICY "Permitir exclusão de usuários autenticados" ON public.tools_data
      FOR DELETE USING (auth.uid() = user_id);
  ELSE
    RAISE NOTICE 'Tabela tools_data já existe';
  END IF;
END;
$$ LANGUAGE plpgsql; 