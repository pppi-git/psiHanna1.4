-- Script para criar políticas de acesso
-- Execute este script após criar as tabelas

-- Políticas para a tabela contacts
DROP POLICY IF EXISTS "Permitir inserções anônimas" ON public.contacts;
CREATE POLICY "Permitir inserções anônimas" ON public.contacts
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura para usuários autenticados" ON public.contacts;
CREATE POLICY "Permitir leitura para usuários autenticados" ON public.contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas para a tabela program_signups
DROP POLICY IF EXISTS "Permitir inserções anônimas" ON public.program_signups;
CREATE POLICY "Permitir inserções anônimas" ON public.program_signups
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura para usuários autenticados" ON public.program_signups;
CREATE POLICY "Permitir leitura para usuários autenticados" ON public.program_signups
  FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas para a tabela tools_data
DROP POLICY IF EXISTS "Permitir inserções de usuários autenticados" ON public.tools_data;
CREATE POLICY "Permitir inserções de usuários autenticados" ON public.tools_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Permitir leitura de usuários autenticados" ON public.tools_data;
CREATE POLICY "Permitir leitura de usuários autenticados" ON public.tools_data
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Permitir atualização de usuários autenticados" ON public.tools_data;
CREATE POLICY "Permitir atualização de usuários autenticados" ON public.tools_data
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Permitir exclusão de usuários autenticados" ON public.tools_data;
CREATE POLICY "Permitir exclusão de usuários autenticados" ON public.tools_data
  FOR DELETE USING (auth.uid() = user_id); 