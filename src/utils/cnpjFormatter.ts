/**
 * Remove caracteres especiais do CNPJ (., /, -)
 * @param cnpj - CNPJ formatado
 * @returns CNPJ apenas com números
 */
export const formatCNPJ = (cnpj: string | number): string => {
  if (!cnpj) return '';
  return cnpj.toString().replace(/[.\-\/]/g, '');
};

/**
 * Valida se o CNPJ tem 14 dígitos
 * @param cnpj - CNPJ para validar
 * @returns boolean indicando se é válido
 */
export const isValidCNPJ = (cnpj: string | number): boolean => {
  const formatted = formatCNPJ(cnpj);
  return formatted.length === 14 && /^\d+$/.test(formatted);
};
