import { useState, useEffect, useCallback } from 'react'
import { z } from 'zod'

// Definir schema para validação de dados
const ToolDataSchema = z.record(z.any())

// Definir tipos para os dados da ferramenta
interface ToolData {
  [key: string]: unknown
}

interface UseToolDataProps {
  toolType: string
  initialData?: ToolData
}

interface UseToolDataReturn {
  data: ToolData | null
  setData: (data: ToolData) => void
  saveData: (newData: ToolData) => Promise<{ success: boolean; error?: unknown }>
  isLoading: boolean
  isSaving: boolean
  error: string | null
  isLocal: boolean
}

/**
 * Hook para gerenciar dados de ferramentas interativas
 * Suporta armazenamento local e sincronização com o servidor quando disponível
 */
export function useToolData({ toolType, initialData }: UseToolDataProps): UseToolDataReturn {
  const [data, setData] = useState<ToolData | null>(initialData || null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isLocal, setIsLocal] = useState<boolean>(true)

  // Carregar dados do localStorage
  const loadLocalData = useCallback(() => {
    try {
      const localStorageKey = `tool_${toolType}`
      const localData = localStorage.getItem(localStorageKey)
      
      if (localData) {
        const parsedData = JSON.parse(localData)
        setData(parsedData)
        return parsedData
      }
      return null
    } catch (err) {
      console.error('Erro ao carregar dados locais:', err)
      return null
    }
  }, [toolType])

  // Buscar dados do servidor
  const fetchServerData = useCallback(async () => {
    try {
      const response = await fetch(`/api/tools?toolType=${encodeURIComponent(toolType)}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erro ao buscar dados do servidor')
      }
      
      const result = await response.json()
      
      if (result.data && result.data.length > 0) {
        const serverData = result.data[0].data
        setData(serverData)
        localStorage.setItem(`tool_${toolType}`, JSON.stringify(serverData))
        setIsLocal(false)
        return serverData
      }
      return null
    } catch (err) {
      console.error('Erro ao buscar dados do servidor:', err)
      throw err
    }
  }, [toolType])

  // Carregar dados ao inicializar
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Primeiro, carregar dados locais
        const localData = loadLocalData()
        
        // Depois, tentar buscar do servidor
        try {
          await fetchServerData()
        } catch (err) {
          // Não definir erro para o usuário se temos dados locais
          if (!localData) {
            setError('Não foi possível carregar seus dados. Usando modo offline.')
          }
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toolType, loadLocalData, fetchServerData])

  // Função para salvar dados
  const saveData = useCallback(async (newData: ToolData) => {
    setIsSaving(true)
    setError(null)
    
    try {
      // Validar dados antes de salvar
      ToolDataSchema.parse(newData)
      
      // Sempre salvar localmente primeiro
      const localStorageKey = `tool_${toolType}`
      localStorage.setItem(localStorageKey, JSON.stringify(newData))
      setData(newData)
      
      // Tentar salvar no servidor
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolType,
          data: newData,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Erro ao salvar dados no servidor')
      }
      
      const result = await response.json()
      setIsLocal(result.local)
      
      return { success: true }
    } catch (err) {
      console.error('Erro ao salvar dados:', err)
      setError('Dados salvos localmente, mas não foi possível sincronizar com o servidor.')
      return { success: false, error: err }
    } finally {
      setIsSaving(false)
    }
  }, [toolType])

  // Função para atualizar dados
  const updateData = useCallback((newData: ToolData) => {
    setData(newData)
  }, [])

  return {
    data,
    setData: updateData,
    saveData,
    isLoading,
    isSaving,
    error,
    isLocal,
  }
} 