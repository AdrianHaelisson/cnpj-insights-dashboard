/**
 * Mensagens e textos constantes da aplicação
 */

export const MESSAGES = {
  CHECKPOINT_CONFIRM: (count: number): string => 
    `Encontrei um processamento anterior com ${count} CNPJ(s) processado(s).\n\nDeseja continuar de onde parou?`,
  
  RESET_CONFIRM: 
    'Há um processamento em andamento. Deseja realmente cancelar e limpar tudo?',
  
  NO_CNPJ: 'Nenhum CNPJ para processar',
  
  API_TEST: {
    TESTING: '🔍 Testando conexão com a API ReceitaWS...', 
    SUCCESS: '✅ API ReceitaWS está online e funcionando!',
    ERROR: '❌ API retornou erro. Tente novamente mais tarde.',
    OFFLINE: '❌ Não foi possível conectar à API ReceitaWS',
    TIMEOUT: '❌ Timeout: API não respondeu em 10 segundos',
    CAUSES: '💡 Possíveis causas: CORS, firewall, API fora do ar, ou sem internet'
  },
  
  LOGS: {
    FILE_LOADED: (count: number): string => `📄 Arquivo carregado: ${count} CNPJ(s) encontrado(s)`,
    CHECKPOINT_RESTORED: (count: number): string => `🔄 Checkpoint restaurado! ${count} CNPJ(s) já processados`,
    STARTING: (count: number): string => `🚀 Iniciando processamento de ${count} CNPJ(s)`,
    RESUMING: (current: number, total: number): string => `🔄 Retomando processamento do CNPJ ${current} de ${total}`,
    ESTIMATED_TIME: (minutes: number): string => `⏱️ Tempo estimado: ~${minutes} minuto(s)`,
    PAUSING: '⏸️ Parando processamento...', 
    PAUSED: (current: number, total: number): string => `⏸️ Processamento pausado. ${current} de ${total} processados`,
    CONSULTING: (cnpj: string): string => `🔍 Consultando CNPJ: ${cnpj}`,
    RATE_LIMIT: (seconds: number): string => `⏳ Aguardando ${seconds}s (limite de 3 req/min)`,
    DATA_ADDED: '📋 Dados adicionados à planilha',
    CHECKPOINT_SAVED: (current: number, total: number): string => `💾 Checkpoint salvo (${current}/${total})`,
    COMPLETED: (success: number, errors: number): string => `🎉 Processamento concluído! ${success} sucesso(s), ${errors} erro(s)`,
    FATAL_ERROR: (message: string): string => `💥 Erro fatal: ${message}`,
    CHECK_API: '💡 Dica: Verifique se a API ReceitaWS está acessível',
    DOWNLOAD: (count: number): string => `📥 Download realizado: ${count} CNPJ(s)`,
    RESET: '🔄 Aplicação resetada. Checkpoint removido.'
  }
} as const;

export const LABELS = {
  TITLE: 'Consulta de CNPJs',
  SUBTITLE: 'Consulte atividades e CNAEs de múltiplas empresas',
  FILE_LABEL: 'Selecione a planilha com os CNPJs',
  FILE_PLACEHOLDER: 'ou arraste aqui',
  FILE_HINT: 'XLSX, XLS ou CSV (primeira coluna deve conter os CNPJs)',
  DOWNLOAD_EXAMPLE: '📥 Baixar planilha de exemplo (.xlsx)',
  FILE_LOADED: 'Arquivo carregado:',
  CNPJS_FOUND: (count: number): string => `${count} CNPJ(s) válido(s) encontrado(s)`,
  ESTIMATED_TIME_LABEL: (minutes: number): string => `Tempo estimado: ~${minutes} minuto(s)`,
  REMOVE: 'Remover',
  TEST_API: 'Testar API',
  API_ONLINE: 'API Online',
  PROCESS: (count: number): string => `Processar ${count} CNPJ(s)`,
  CONTINUE: (current: number, total: number): string => `Continuar (${current}/${total})`,
  STOP_PROCESSING: 'Parar Processamento',
  STOPPING: 'Parando...', 
  RATE_LIMIT_INFO: 'Limite: 3 consultas por minuto (API ReceitaWS)',
  PROGRESS: 'Progresso',
  PROCESSED: 'Processados',
  SUCCESS: 'Sucessos',
  ERRORS: 'Erros',
  CONSULTING: 'Consultando CNPJs...', 
  LOGS_TITLE: 'Log de Atividades em Tempo Real',
  CLEAR: 'Limpar',
  PARTIAL_RESULTS: '📊 Resultados Parciais Disponíveis',
  PARTIAL_DOWNLOAD: 'Download Parcial',
  PROCESSING: '⏳ Processamento em Andamento',
  COMPLETED_TITLE: '✅ Processamento Concluído!',
  TOTAL_PROCESSED: (current: number, total: number): string => `Total processado: ${current} / ${total} CNPJ(s)`,
  CHECKPOINT_SAVED_AUTO: '💾 Checkpoint salvo automaticamente',
  DOWNLOAD_COMPLETE: 'Baixar Planilha Completa',
  NEW_QUERY: 'Nova Consulta',
  HOW_TO_USE: 'Como usar'
} as const;
