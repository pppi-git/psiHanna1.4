import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Mescla classes do Tailwind CSS de forma inteligente
 * Combina o clsx para condicionais com o twMerge para resolver conflitos
 * 
 * @param inputs - Classes CSS a serem mescladas
 * @returns String com as classes CSS mescladas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um valor para o formato de moeda brasileira
 * 
 * @param value - Valor a ser formatado
 * @param options - Opções de formatação (locale, currency, etc)
 * @returns String formatada como moeda (ex: "R$ 1.234,56")
 */
export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'BRL',
  }
): string {
  return new Intl.NumberFormat('pt-BR', options).format(value)
}

/**
 * Formata uma data para o formato brasileiro
 * 
 * @param date - Data a ser formatada
 * @param options - Opções de formatação
 * @returns String formatada como data (ex: "01/01/2023")
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
): string {
  const dateObj = date instanceof Date ? date : new Date(date)
  return new Intl.DateTimeFormat('pt-BR', options).format(dateObj)
}

/**
 * Trunca um texto com reticências
 * 
 * @param text - Texto a ser truncado
 * @param length - Comprimento máximo
 * @returns Texto truncado com reticências se necessário
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return `${text.slice(0, length).trim()}...`
}

/**
 * Gera um ID único usando timestamp e número aleatório
 * 
 * @returns String com ID único
 */
export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Capitaliza a primeira letra de cada palavra em uma string
 * 
 * @param text - Texto a ser capitalizado
 * @returns Texto com a primeira letra de cada palavra em maiúsculo
 */
export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Normaliza texto removendo acentos
 * 
 * @param text - Texto a ser normalizado
 * @returns Texto sem acentos
 */
export function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Retorna valor com fallback se for nulo ou indefinido
 * 
 * @param value - Valor a ser verificado
 * @param fallback - Valor de fallback
 * @returns Valor original ou fallback se necessário
 */
export function valueOrFallback<T>(value: T | null | undefined, fallback: T): T {
  return value !== null && value !== undefined ? value : fallback
}

/**
 * Extrai extensão de um nome de arquivo
 * 
 * @param filename - Nome do arquivo
 * @returns Extensão do arquivo
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

/**
 * Verifica se uma string é um email válido
 * 
 * @param email - Email a ser validado
 * @returns True se for um email válido
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

