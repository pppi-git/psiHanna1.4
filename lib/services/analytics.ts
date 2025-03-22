/**
 * Módulo de serviços de analytics para rastreamento de eventos do usuário
 * Implementação simples que pode ser substituída por serviços como Google Analytics, Plausible, Fathom, etc.
 */

type EventType = 'page_view' | 'tool_start' | 'tool_complete' | 'button_click' | 'form_submit' | 'error'

interface EventProperties {
  [key: string]: string | number | boolean | null
}

interface AnalyticsEvent {
  type: EventType
  timestamp: number
  properties: EventProperties
}

/**
 * Armazena eventos temporariamente até que possam ser enviados
 */
const eventQueue: AnalyticsEvent[] = []

/**
 * Configurações do serviço de analytics
 */
let config = {
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
  endpointUrl: '/api/analytics', // URL para envio de eventos
  batchSize: 10, // Número de eventos para acumular antes de enviar
  flushInterval: 30000, // Intervalo para envio automático (30 segundos)
}

/**
 * ID da sessão do usuário atual (gerado no navegador)
 */
let sessionId: string | null = null

/**
 * Inicializa o serviço de analytics
 * @param options - Opções de configuração
 */
export function initAnalytics(options?: Partial<typeof config>) {
  if (typeof window === 'undefined') return

  // Mesclar opções com configuração padrão
  config = { ...config, ...options }

  // Gerar ID de sessão único
  sessionId = localStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem('analytics_session_id', sessionId)
  }

  // Configurar envio periódico de eventos
  if (config.enabled) {
    setInterval(flushEvents, config.flushInterval)
    
    // Enviar eventos quando o usuário sair da página
    window.addEventListener('beforeunload', flushEvents)
  }

  // Rastrear visualização de página inicial automaticamente
  trackEvent('page_view', {
    path: window.location.pathname,
    referrer: document.referrer || null,
  })

  if (config.debug) {
    console.log('Analytics inicializado:', { sessionId, config })
  }
}

/**
 * Rastreia um evento do usuário
 * @param type - Tipo do evento
 * @param properties - Propriedades do evento
 */
export function trackEvent(type: EventType, properties: EventProperties = {}) {
  if (!config.enabled) return

  // Criar evento com timestamp
  const event: AnalyticsEvent = {
    type,
    timestamp: Date.now(),
    properties: {
      ...properties,
      sessionId: sessionId || 'unknown',
      url: window.location.href,
    },
  }

  // Adicionar à fila
  eventQueue.push(event)

  if (config.debug) {
    console.log('Evento rastreado:', event)
  }

  // Enviar eventos em lote
  if (eventQueue.length >= config.batchSize) {
    flushEvents()
  }
}

/**
 * Rastreia visualização de página
 * @param path - Caminho da página
 */
export function trackPageView(path: string) {
  trackEvent('page_view', { path })
}

/**
 * Rastreia início do uso de uma ferramenta
 * @param toolName - Nome da ferramenta
 */
export function trackToolStart(toolName: string) {
  trackEvent('tool_start', { toolName })
}

/**
 * Rastreia conclusão do uso de uma ferramenta
 * @param toolName - Nome da ferramenta
 * @param duration - Duração em segundos
 */
export function trackToolComplete(toolName: string, duration: number) {
  trackEvent('tool_complete', { toolName, duration })
}

/**
 * Envia eventos armazenados para o servidor
 */
async function flushEvents() {
  if (!config.enabled || eventQueue.length === 0) return

  // Copiar eventos atuais
  const events = [...eventQueue]
  
  // Limpar fila
  eventQueue.length = 0

  try {
    // Enviar eventos para o servidor
    const response = await fetch(config.endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ events }),
    })

    if (!response.ok) {
      throw new Error(`Falha ao enviar eventos: ${response.status}`)
    }

    if (config.debug) {
      console.log(`${events.length} eventos enviados com sucesso`)
    }
  } catch (error) {
    // Em caso de erro, colocar eventos de volta na fila
    eventQueue.push(...events)
    
    if (config.debug) {
      console.error('Erro ao enviar eventos de analytics:', error)
    }
  }
}

/**
 * API pública do serviço de analytics
 */
export const analytics = {
  init: initAnalytics,
  trackEvent,
  trackPageView,
  trackToolStart,
  trackToolComplete,
} 