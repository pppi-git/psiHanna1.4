#!/bin/bash

# Script para executar testes de integração do Hanara Psychology

# Cores para saída
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para exibir mensagens
print_message() {
  echo -e "${YELLOW}==>${NC} $1"
}

# Função para exibir sucesso
print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

# Função para exibir erro
print_error() {
  echo -e "${RED}✗ $1${NC}"
}

# Verificar se o Playwright está instalado
if ! command -v npx playwright &> /dev/null; then
  print_error "Playwright não encontrado. Instalando..."
  npm install -D @playwright/test --legacy-peer-deps
  npx playwright install --with-deps chromium
else
  print_success "Playwright já está instalado"
fi

# Função para executar testes
run_test() {
  print_message "Executando testes: $1"
  npx playwright test $2
  
  if [ $? -eq 0 ]; then
    print_success "Testes concluídos com sucesso: $1"
  else
    print_error "Falha nos testes: $1"
  fi
}

# Menu de opções
echo -e "${YELLOW}=== Testes de Integração - Hanara Psychology ===${NC}"
echo "1. Executar todos os testes"
echo "2. Testar formulário de contato"
echo "3. Testar formulário de inscrição no programa"
echo "4. Testar integração com Supabase"
echo "5. Testar tratamento de erros"
echo "6. Executar testes com interface gráfica"
echo "7. Sair"

read -p "Escolha uma opção: " option

case $option in
  1)
    run_test "Todos os testes" ""
    ;;
  2)
    run_test "Formulário de contato" "contact-form.spec.ts"
    ;;
  3)
    run_test "Formulário de inscrição no programa" "program-signup.spec.ts"
    ;;
  4)
    run_test "Integração com Supabase" "supabase-integration.spec.ts"
    ;;
  5)
    run_test "Tratamento de erros" "error-handling.spec.ts"
    ;;
  6)
    print_message "Executando testes com interface gráfica"
    npx playwright test --ui
    ;;
  7)
    print_message "Saindo..."
    exit 0
    ;;
  *)
    print_error "Opção inválida"
    exit 1
    ;;
esac

print_message "Relatório de testes disponível em: playwright-report/index.html" 