import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface UseToolDataProps {
  toolType: string
  initialData?: any
}

export function useToolData({ toolType, initialData }: UseToolDataProps) {
  const [data, setData] = useState<any>(initialData || null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isLocal, setIsLocal] = useState<boolean>(true)

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const loadLocalData = () => {
      try {
        const localData = localStorage.getItem(`tool_${toolType}`)
        if (localData) {
          setData(JSON.parse(localData))
        }
      } catch (err) {
        console.error('Erro ao carregar dados locais:', err)
      }
    }

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Primeiro, carregar dados locais
        loadLocalData()
        
        // Depois, tentar buscar do servidor
        const response = await fetch(`/api/tools?toolType=${toolType}`)
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do servidor')
        }
        
        const result = await response.json()
        
        if (result.data && result.data.length > 0) {
          // Se tiver dados no servidor, usar eles e atualizar localStorage
          const serverData = result.data[0].data
          setData(serverData)
          localStorage.setItem(`tool_${toolType}`, JSON.stringify(serverData))
          setIsLocal(false)
        }
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
        // Não definir erro para o usuário se temos dados locais
        if (!data) {
          setError('Não foi possível carregar seus dados. Usando modo offline.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toolType])

  // Função para salvar dados
  const saveData = async (newData: any) => {
    setIsSaving(true)
    setError(null)
    
    try {
      // Sempre salvar localmente primeiro
      localStorage.setItem(`tool_${toolType}`, JSON.stringify(newData))
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
        throw new Error('Erro ao salvar dados no servidor')
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
  }

  return {
    data,
    setData,
    saveData,
    isLoading,
    isSaving,
    error,
    isLocal,
  }
} 