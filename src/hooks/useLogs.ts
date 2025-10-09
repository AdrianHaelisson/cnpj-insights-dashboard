import { useState, useCallback, useRef, useEffect } from 'react';
import { Log, TipoLog, UseLogsReturn } from '../types';

/**
 * Hook para gerenciar logs da aplicação
 */
export const useLogs = (): UseLogsReturn => {
  const [logs, setLogs] = useState<Log[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático para o final dos logs (apenas dentro do container)
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [logs]);

  // Adiciona um novo log
  const adicionarLog = useCallback((tipo: TipoLog, cnpj: string | null, mensagem: string): void => {
    const novoLog: Log = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      tipo,
      cnpj,
      mensagem
    };
    setLogs(prev => [...prev, novoLog]);
  }, []);

  // Limpa todos os logs
  const limparLogs = useCallback((): void => {
    setLogs([]);
  }, []);

  return { logs, adicionarLog, limparLogs, logsEndRef };
};
