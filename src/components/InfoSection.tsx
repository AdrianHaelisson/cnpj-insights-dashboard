import { LABELS } from '../constants/messages';

const InfoSection: React.FC = () => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {LABELS.HOW_TO_USE}
      </h2>
      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
        <li>Prepare uma planilha <strong>Excel (.xlsx, .xls)</strong> ou <strong>CSV</strong> com os CNPJs na primeira coluna</li>
        <li>Os CNPJs podem estar formatados (12.345.678/0001-99) ou sem formatação (12345678000199)</li>
        <li>Faça o upload da planilha ou clique em "Baixar planilha de exemplo" para ver o formato</li>
        <li>Clique em "Processar" e aguarde a consulta (3 requisições por minuto)</li>
        <li>Após o processamento, baixe a planilha com os resultados</li>
      </ol>
      
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>✅ Formatos suportados:</strong>
        </p>
        <ul className="mt-2 text-xs text-green-700 space-y-1">
          <li>📊 <strong>XLSX</strong> - Excel 2007 ou superior (recomendado)</li>
          <li>📊 <strong>XLS</strong> - Excel 97-2003</li>
          <li>📄 <strong>CSV</strong> - Valores separados por vírgula</li>
        </ul>
      </div>
      
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Importante:</strong> A API ReceitaWS possui limite de 3 consultas por minuto. 
          O processamento pode levar alguns minutos dependendo da quantidade de CNPJs.
        </p>
      </div>
      
      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800 font-semibold mb-2">
          ⚠️ Problemas de CORS?
        </p>
        <p className="text-xs text-amber-700 mb-2">
          Se você receber erro "Failed to fetch", pode ser bloqueio de CORS do navegador.
        </p>
        <details className="text-xs text-amber-700">
          <summary className="cursor-pointer font-medium hover:text-amber-900">
            Clique para ver soluções
          </summary>
          <div className="mt-2 pl-4 space-y-2">
            <p><strong>Opção 1:</strong> Use uma extensão de CORS no navegador (para desenvolvimento)</p>
            <p><strong>Opção 2:</strong> Acesse via servidor local com proxy</p>
            <p><strong>Opção 3:</strong> A API ReceitaWS pode estar temporariamente fora do ar</p>
            <p className="mt-2 pt-2 border-t border-amber-300">
              💡 <strong>Dica:</strong> Clique em "Testar API" antes de processar para verificar a conectividade
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default InfoSection;
