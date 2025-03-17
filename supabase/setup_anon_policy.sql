-- Script para adicionar políticas anônimas para a tabela tools_data
-- Use este script se quiser permitir acesso anônimo aos dados das ferramentas

-- Remover políticas existentes
DROP POLICY IF EXISTS "Permitir inserções anônimas" ON public.tools_data;
DROP POLICY IF EXISTS "Permitir leitura anônima" ON public.tools_data;

-- Criar políticas para acesso anônimo
CREATE POLICY "Permitir inserções anônimas" ON public.tools_data
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura anônima" ON public.tools_data
  FOR SELECT USING (true);

-- Nota: Estas políticas permitem acesso total sem autenticação.
-- Use apenas para desenvolvimento ou se não precisar de autenticação. 