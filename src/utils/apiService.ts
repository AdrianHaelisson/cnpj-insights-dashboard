/**
 * Serviço para consultar CNPJ na API ReceitaWS
 * Implementa rate limiting de 3 requisições por minuto
 */

import { ResultadoCNPJ } from '../types';

const API_BASE_URL = '/api/cnpj';

const REQUESTS_PER_MINUTE = 3;
const MINUTE_IN_MS = 60000;

type WaitCallback = (waitTime: number) => void;

interface ProgressInfo {
  atual: number;
  total: number;
  percentual: number;
}

interface ProcessResult {
  cnpj: string;
  sucesso: boolean;
  dados?: ResultadoCNPJ;
  erro?: string;
}

class ApiService {
  private requestQueue: Array<unknown> = [];
  private requestTimestamps: number[] = [];

  /**
   * Aguarda até que seja possível fazer uma nova requisição
   */
  async waitForRateLimit(onWait: WaitCallback | null = null): Promise<void> {
    const now = Date.now();

    // Remove timestamps com mais de 1 minuto
    this.requestTimestamps = this.requestTimestamps.filter(
      timestamp => now - timestamp < MINUTE_IN_MS
    );

    // Se atingiu o limite, aguarda
    if (this.requestTimestamps.length >= REQUESTS_PER_MINUTE) {
      const oldestRequest = this.requestTimestamps[0];
      const waitTime = MINUTE_IN_MS - (now - oldestRequest) + 100; // +100ms de margem

      // Notifica que está aguardando
      if (onWait) {
        onWait(waitTime);
      }

      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.waitForRateLimit(onWait); // Verifica novamente
    }
  }

  /**
   * Consulta um CNPJ na API
   * @param cnpj - CNPJ sem formatação (apenas números)
   * @param onWait - Callback quando aguardando rate limit
   * @returns Dados da empresa
   */
  async consultarCNPJ(cnpj: string, onWait: WaitCallback | null = null): Promise<ResultadoCNPJ> {
    await this.waitForRateLimit(onWait);

    try {
      this.requestTimestamps.push(Date.now());

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(`${API_BASE_URL}?cnpj=${cnpj}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Limite de requisições excedido. Aguarde alguns minutos.');
        } else if (response.status === 404) {
          throw new Error('CNPJ não encontrado na base de dados.');
        } else if (response.status === 503) {
          throw new Error('Serviço temporariamente indisponível.');
        } else {
          throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
        }
      }

      const data: ResultadoCNPJ = await response.json();

      // Verifica se houve erro na API
      if (data.status === 'ERROR') {
        throw new Error(data.message || 'Erro ao consultar CNPJ');
      }

      return data;
    } catch (error) {
      console.error(`Erro ao consultar CNPJ ${cnpj}:`, error);

      // Mensagens de erro mais amigáveis
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Timeout: A requisição demorou muito tempo');
        } else if (error.message === 'Failed to fetch') {
          throw new Error('Erro de conexão. Verifique sua internet ou a API pode estar fora do ar.');
        } else {
          throw error;
        }
      }
      throw new Error('Erro desconhecido ao consultar CNPJ');
    }
  }

  /**
   * Processa múltiplos CNPJs com callback de progresso
   * @param cnpjs - Lista de CNPJs
   * @param onProgress - Callback para atualizar progresso
   * @returns Resultados das consultas
   */
  async processarCNPJs(
    cnpjs: string[],
    onProgress?: (progress: ProgressInfo) => void
  ): Promise<ProcessResult[]> {
    const resultados: ProcessResult[] = [];

    for (let i = 0; i < cnpjs.length; i++) {
      const cnpj = cnpjs[i];

      try {
        const dados = await this.consultarCNPJ(cnpj);
        resultados.push({
          cnpj,
          sucesso: true,
          dados
        });
      } catch (error) {
        resultados.push({
          cnpj,
          sucesso: false,
          erro: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }

      // Atualiza progresso
      if (onProgress) {
        onProgress({
          atual: i + 1,
          total: cnpjs.length,
          percentual: ((i + 1) / cnpjs.length) * 100
        });
      }
    }

    return resultados;
  }
}

export default new ApiService();