import * as XLSX from 'xlsx';

/**
 * Cria um arquivo XLSX de exemplo com CNPJs para teste
 */
export const criarPlanilhaExemplo = (): void => {
  const dadosExemplo: string[][] = [
    ['CNPJ'],
    ['00.000.000/0001-91'], // Banco do Brasil
    ['06.990.590/0001-23'], // Google Brasil
    ['33.000.167/0001-01'], // Petrobras
    ['00.623.904/0001-73']  // Magazine Luiza
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(dadosExemplo);
  
  // Ajusta largura da coluna
  worksheet['!cols'] = [{ wch: 20 }];
  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'CNPJs');
  
  XLSX.writeFile(workbook, 'exemplo_cnpjs.xlsx');
};
