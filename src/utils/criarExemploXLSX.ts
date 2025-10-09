import * as XLSX from 'xlsx';

/**
 * Cria um arquivo XLSX de exemplo com CNPJs para teste
 */
export const criarPlanilhaExemplo = (): void => {
  const dadosExemplo: string[][] = [
    ['CNPJ'],
    ['22.793.294/0001-99'],
    ['00.000.000/0001-91'],
    ['11.222.333/0001-81'],
    ['33.000.167/0001-01']
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(dadosExemplo);
  
  // Ajusta largura da coluna
  worksheet['!cols'] = [{ wch: 20 }];
  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'CNPJs');
  
  XLSX.writeFile(workbook, 'exemplo_cnpjs.xlsx');
};
