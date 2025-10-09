/**
 * Configurações e constantes da aplicação
 */

import { TipoLog, StatusAPI } from '../types';

export const API_CONFIG = {
  REQUESTS_PER_MINUTE: 3,
  TIMEOUT_MS: 30000,
  TEST_TIMEOUT_MS: 10000,
  TEST_CNPJ: '00000000000191' // Banco do Brasil
} as const;

export const CHECKPOINT_CONFIG = {
  STORAGE_KEY: 'cnpj_checkpoint',
  SAVE_INTERVAL: 5, // Salvar a cada 5 CNPJs
  EXPIRY_TIME_MS: 3600000 // 1 hora
} as const;

export const FILE_CONFIG = {
  ACCEPTED_FORMATS: '.xlsx,.xls,.csv',
  MIME_TYPES: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv'
  ]
} as const;

export const LOG_TYPES: Record<string, TipoLog> = {
  INFO: 'info',
  SUCCESS: 'sucesso',
  ERROR: 'erro',
  PROCESSING: 'info'
} as const;

export const API_STATUS: Record<string, StatusAPI> = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  ERROR: 'erro'
} as const;

export const COLORS = {
  PRIMARY: 'indigo',
  SUCCESS: 'green',
  ERROR: 'red',
  WARNING: 'yellow',
  INFO: 'blue',
  PROCESSING: 'purple'
} as const;
