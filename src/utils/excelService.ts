import * as XLSX from 'xlsx';
import { formatCNPJ, isValidCNPJ } from './cnpjFormatter';
import { ProcessResult } from '../types';

interface FormattedResult {
  'CNPJ': string;
  'Nome da Empresa': string;
  'Atividade Principal': string;
  'CNAE da Atividade Principal': string;
  'Atividades Secundárias': string;
  'CNAE das Atividades Secundárias': string;
}

/**
 * Lê planilha e extrai CNPJs
 * @param file - Arquivo da planilha
 * @returns Lista de CNPJs formatados
 */
export const lerPlanilhaCNPJs = async (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        if (!e.target?.result) {
          reject(new Error('Erro ao ler arquivo'));
          return;
        }

        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Pega a primeira aba
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Converte para JSON
        const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Extrai CNPJs (assume que está na primeira coluna)
        const cnpjs: string[] = [];
        
        for (let i = 0; i < jsonData.length; i++) {
          const row = jsonData[i];
          if (row && row[0]) {
            const cnpj = formatCNPJ(row[0] as string | number);
            if (isValidCNPJ(cnpj)) {
              cnpjs.push(cnpj);
            }
          }
        }
        
        if (cnpjs.length === 0) {
          reject(new Error('Nenhum CNPJ válido encontrado na planilha'));
        } else {
          resolve(cnpjs);
        }
      } catch (error) {
        reject(new Error('Erro ao ler planilha: ' + (error instanceof Error ? error.message : 'Erro desconhecido')));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Processa resultados da API e formata para planilha
 * @param resultados - Resultados das consultas
 * @returns Dados formatados para planilha
 */
export const formatarResultadosParaPlanilha = (resultados: ProcessResult[]): FormattedResult[] => {
  const dadosFormatados: FormattedResult[] = [];
  
  for (const resultado of resultados) {
    if (!resultado.sucesso) {
      // Adiciona linha com erro
      dadosFormatados.push({
        'CNPJ': resultado.cnpj,
        'Nome da Empresa': 'ERRO',
        'Atividade Principal': resultado.erro || 'Erro na consulta',
        'CNAE da Atividade Principal': '',
        'Atividades Secundárias': '',
        'CNAE das Atividades Secundárias': ''
      });
      continue;
    }
    
    const { dados } = resultado;
    
    if (!dados) continue;
    
    // Extrai atividade principal
    const atividadePrincipal = dados.atividade_principal && dados.atividade_principal[0] 
      ? dados.atividade_principal[0].text 
      : '';
    const cnaePrincipal = dados.atividade_principal && dados.atividade_principal[0]
      ? dados.atividade_principal[0].code
      : '';
    
    // Extrai atividades secundárias
    const atividadesSecundarias = dados.atividades_secundarias
      ? dados.atividades_secundarias.map(a => a.text).join(' | ')
      : '';
    const cnaesSecundarios = dados.atividades_secundarias
      ? dados.atividades_secundarias.map(a => a.code).join(' | ')
      : '';
    
    dadosFormatados.push({
      'CNPJ': dados.cnpj || resultado.cnpj,
      'Nome da Empresa': dados.nome || '',
      'Atividade Principal': atividadePrincipal,
      'CNAE da Atividade Principal': cnaePrincipal,
      'Atividades Secundárias': atividadesSecundarias,
      'CNAE das Atividades Secundárias': cnaesSecundarios
    });
  }
  
  return dadosFormatados;
};

/**
 * Gera e faz download da planilha com resultados
 * @param resultados - Resultados das consultas
 * @param nomeArquivo - Nome do arquivo para download
 */
export const gerarPlanilhaResultados = (
  resultados: ProcessResult[], 
  nomeArquivo: string = 'resultados_cnpj.xlsx'
): void => {
  const dadosFormatados = formatarResultadosParaPlanilha(resultados);
  
  // Cria worksheet
  const worksheet = XLSX.utils.json_to_sheet(dadosFormatados);
  
  // Ajusta largura das colunas
  const colWidths = [
    { wch: 20 }, // CNPJ
    { wch: 50 }, // Nome da Empresa
    { wch: 60 }, // Atividade Principal
    { wch: 15 }, // CNAE Principal
    { wch: 80 }, // Atividades Secundárias
    { wch: 30 }  // CNAEs Secundários
  ];
  worksheet['!cols'] = colWidths;
  
  // Cria workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Resultados');
  
  // Gera arquivo e faz download
  XLSX.writeFile(workbook, nomeArquivo);
};
