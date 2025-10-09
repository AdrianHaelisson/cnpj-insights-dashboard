import { useEffect, useRef } from 'react';
import { CHECKPOINT_CONFIG } from '../constants/config';
import { MESSAGES } from '../constants/messages';
import { DadosCheckpoint, UseCheckpointReturn } from '../types';

/**
 * Hook para gerenciar checkpoints do processamento
 */
export const useCheckpoint = (onRestore?: (data: DadosCheckpoint) => void): UseCheckpointReturn => {
  const checkpointChecked = useRef(false);
  const onRestoreRef = useRef(onRestore);
  
  // Atualiza a referência de onRestore
  useEffect(() => {
    onRestoreRef.current = onRestore;
  }, [onRestore]);
  
  // Recupera checkpoint ao carregar (apenas uma vez)
  useEffect(() => {
    // Garante que só executa uma vez
    if (checkpointChecked.current) return;
    checkpointChecked.current = true;
    
    const checkpoint = localStorage.getItem(CHECKPOINT_CONFIG.STORAGE_KEY);
    if (checkpoint) {
      try {
        const data = JSON.parse(checkpoint) as DadosCheckpoint;
        const tempoDecorrido = Date.now() - data.timestamp;
        
        // Só restaura se checkpoint for recente e tiver dados
        if (tempoDecorrido < CHECKPOINT_CONFIG.EXPIRY_TIME_MS && 
            data.resultados && 
            data.resultados.length > 0) {
          const confirmar = window.confirm(MESSAGES.CHECKPOINT_CONFIRM(data.resultados.length));
          
          if (confirmar && onRestoreRef.current) {
            onRestoreRef.current(data);
          } else {
            localStorage.removeItem(CHECKPOINT_CONFIG.STORAGE_KEY);
          }
        } else {
          localStorage.removeItem(CHECKPOINT_CONFIG.STORAGE_KEY);
        }
      } catch (error) {
        console.error('Erro ao restaurar checkpoint:', error);
        localStorage.removeItem(CHECKPOINT_CONFIG.STORAGE_KEY);
      }
    }
  }, []);

  // Salva checkpoint
  const salvarCheckpoint = (dados: DadosCheckpoint): void => {
    localStorage.setItem(CHECKPOINT_CONFIG.STORAGE_KEY, JSON.stringify(dados));
  };

  // Limpa checkpoint
  const limparCheckpoint = (): void => {
    localStorage.removeItem(CHECKPOINT_CONFIG.STORAGE_KEY);
  };

  return { salvarCheckpoint, limparCheckpoint };
};
