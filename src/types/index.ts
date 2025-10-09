/**
 * Tipos e interfaces globais da aplicação
 */

// Tipos de Log
export type TipoLog = 'info' | 'sucesso' | 'aviso' | 'erro';

export interface Log {
  id: string;
  timestamp: Date;
  tipo: TipoLog;
  cnpj: string | null;
  mensagem: string;
}

// Tipos de API
export type StatusAPI = 'online' | 'offline' | 'erro' | null;

// Resultado da consulta de CNPJ
export interface ResultadoCNPJ {
  cnpj: string;
  nome?: string;
  fantasia?: string;
  abertura?: string;
  situacao?: string;
  tipo?: string;
  porte?: string;
  natureza_juridica?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  email?: string;
  telefone?: string;
  data_situacao?: string;
  motivo_situacao?: string;
  situacao_especial?: string;
  data_situacao_especial?: string;
  atividade_principal?: Array<{
    code: string;
    text: string;
  }>;
  atividades_secundarias?: Array<{
    code: string;
    text: string;
  }>;
  qsa?: Array<{
    nome: string;
    qual: string;
  }>;
  capital_social?: string;
  status?: string;
  message?: string;
}

// Progresso do processamento
export interface Progresso {
  atual: number;
  total: number;
  sucesso: number;
  erro: number;
  percentual: number;
}

// Dados do checkpoint
export interface DadosCheckpoint {
  cnpjsCarregados: string[];
  resultados: ProcessResult[];
  timestamp: number;
}

// Props dos componentes
export interface FileUploadProps {
  arquivo: File | null;
  cnpjsCarregados: string[];
  processando: boolean;
  resultados: ProcessResult[] | null;
  tempoEstimado: () => number;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export interface ActionButtonsProps {
  cnpjsCarregados: string[];
  resultados: ProcessResult[] | null;
  processando: boolean;
  cancelando: boolean;
  statusAPI: StatusAPI;
  testandoAPI: boolean;
  onTestarAPI: () => void;
  onProcessar: () => void;
  onParar: () => void;
}

export interface ProgressBarProps {
  progresso: Progresso;
  logs: Log[];
  processando: boolean;
}

export interface LogConsoleProps {
  logs: Log[];
  logsEndRef: React.RefObject<HTMLDivElement>;
  processando: boolean;
  onLimpar: () => void;
}

export interface ResultsSectionProps {
  resultados: ProcessResult[] | null;
  cnpjsCarregados: string[];
  processando: boolean;
  onDownload: () => void;
  onDownloadParcial: () => void;
  onReset: () => void;
}

// Resultado do processamento
export interface ProcessResult {
  cnpj: string;
  sucesso: boolean;
  dados?: ResultadoCNPJ;
  erro?: string;
}

// Hook retornos
export interface UseLogsReturn {
  logs: Log[];
  adicionarLog: (tipo: TipoLog, cnpj: string | null, mensagem: string) => void;
  limparLogs: () => void;
  logsEndRef: React.RefObject<HTMLDivElement>;
}

export interface UseCheckpointReturn {
  salvarCheckpoint: (dados: DadosCheckpoint) => void;
  limparCheckpoint: () => void;
}

export interface UseProcessamentoReturn {
  processando: boolean;
  cancelando: boolean;
  progresso: Progresso;
  processar: (setResultados: React.Dispatch<React.SetStateAction<ProcessResult[] | null>>) => Promise<void>;
  parar: () => void;
}
