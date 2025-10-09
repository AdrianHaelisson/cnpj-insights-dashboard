import { useState, useRef, useCallback } from 'react';
import apiService from '../utils/apiService';
import { CHECKPOINT_CONFIG } from '../constants/config';
import { MESSAGES } from '../constants/messages';
import { ProcessResult, Progresso, TipoLog, UseProcessamentoReturn, DadosCheckpoint } from '../types';

/**
 * Hook para gerenciar o processamento de CNPJs
 */
export const useProcessamento = (
  cnpjsCarregados: string[],
  resultados: ProcessResult[] | null,
  adicionarLog: (tipo: TipoLog, cnpj: string | null, mensagem: string) => void,
  salvarCheckpoint: (dados: DadosCheckpoint) => void
): UseProcessamentoReturn => {
  const [processando, setProcessando] = useState<boolean>(false);
  const [cancelando, setCancelando] = useState<boolean>(false);
  const [progresso, setProgresso] = useState<Progresso>({ 
    atual: 0, 
    total: 0, 
    percentual: 0,
    sucesso: 0,
    erro: 0
  });
  const processamentoRef = useRef<{ cancelado: boolean }>({ cancelado: false });

  const processar = useCallback(async (
    setResultados: React.Dispatch<React.SetStateAction<ProcessResult[] | null>>
  ): Promise<void> => {
    if (cnpjsCarregados.length === 0) {
      throw new Error(MESSAGES.NO_CNPJ);
    }

    setProcessando(true);
    setCancelando(false);
    processamentoRef.current.cancelado = false;
    
    const inicioIndex = resultados ? resultados.length : 0;
    const results: ProcessResult[] = resultados ? [...resultados] : [];
    
    if (inicioIndex === 0) {
      setResultados(null);
      setProgresso({ 
        atual: 0, 
        total: cnpjsCarregados.length, 
        percentual: 0,
        sucesso: 0,
        erro: 0
      });
    }
    
    adicionarLog('info', null, inicioIndex > 0 
      ? MESSAGES.LOGS.RESUMING(inicioIndex + 1, cnpjsCarregados.length)
      : MESSAGES.LOGS.STARTING(cnpjsCarregados.length)
    );
    
    const tempoEstimado = Math.ceil(((cnpjsCarregados.length - inicioIndex) / 3));
    adicionarLog('info', null, MESSAGES.LOGS.ESTIMATED_TIME(tempoEstimado));

    try {
      for (let i = inicioIndex; i < cnpjsCarregados.length; i++) {
        if (processamentoRef.current.cancelado) {
          const sucessos = results.filter(r => r.sucesso).length;
          const erros = results.filter(r => !r.sucesso).length;
          
          adicionarLog('info', null, MESSAGES.LOGS.PAUSED(i, cnpjsCarregados.length));
          setResultados(results);
          salvarCheckpoint({
            cnpjsCarregados,
            resultados: results,
            timestamp: Date.now()
          });
          break;
        }
        
        const cnpj = cnpjsCarregados[i];
        adicionarLog('info', cnpj, MESSAGES.LOGS.CONSULTING(cnpj));
        
        try {
          const dados = await apiService.consultarCNPJ(cnpj, (waitTime: number) => {
            const segundos = Math.ceil(waitTime / 1000);
            adicionarLog('info', cnpj, MESSAGES.LOGS.RATE_LIMIT(segundos));
          });
          
          const nomeEmpresa = dados.nome || 'Nome não disponível';
          
          results.push({ cnpj, sucesso: true, dados });
          
          adicionarLog('sucesso', cnpj, nomeEmpresa);
          adicionarLog('info', cnpj, MESSAGES.LOGS.DATA_ADDED);
          
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          results.push({ cnpj, sucesso: false, erro: errorMessage });
          adicionarLog('erro', cnpj, errorMessage);
          
          if (errorMessage.includes('conexão') || errorMessage.includes('fetch')) {
            adicionarLog('info', null, MESSAGES.LOGS.CHECK_API);
          }
        }
        
        const sucessos = results.filter(r => r.sucesso).length;
        const erros = results.filter(r => !r.sucesso).length;
        
        const novoProgresso: Progresso = {
          atual: i + 1,
          total: cnpjsCarregados.length,
          percentual: ((i + 1) / cnpjsCarregados.length) * 100,
          sucesso: sucessos,
          erro: erros
        };
        setProgresso(novoProgresso);
        setResultados([...results]);
        
        if ((i + 1) % CHECKPOINT_CONFIG.SAVE_INTERVAL === 0 || i + 1 === cnpjsCarregados.length) {
          salvarCheckpoint({
            cnpjsCarregados,
            resultados: results,
            timestamp: Date.now()
          });
          adicionarLog('info', null, MESSAGES.LOGS.CHECKPOINT_SAVED(i + 1, cnpjsCarregados.length));
        }
      }

      if (!processamentoRef.current.cancelado) {
        const sucessos = results.filter(r => r.sucesso).length;
        const erros = results.filter(r => !r.sucesso).length;
        adicionarLog('info', null, MESSAGES.LOGS.COMPLETED(sucessos, erros));
        localStorage.removeItem(CHECKPOINT_CONFIG.STORAGE_KEY);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      adicionarLog('erro', null, MESSAGES.LOGS.FATAL_ERROR(errorMessage));
      salvarCheckpoint({
        cnpjsCarregados,
        resultados: results,
        timestamp: Date.now()
      });
      throw error;
    } finally {
      setProcessando(false);
      setCancelando(false);
    }
  }, [cnpjsCarregados, resultados, adicionarLog, salvarCheckpoint]);

  const parar = useCallback((): void => {
    setCancelando(true);
    processamentoRef.current.cancelado = true;
    adicionarLog('info', null, MESSAGES.LOGS.PAUSING);
  }, [adicionarLog]);

  return {
    processando,
    cancelando,
    progresso,
    processar,
    parar
  };
};
