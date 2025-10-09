import { LABELS } from '../constants/messages';
import { ResultsSectionProps } from '../types';

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  resultados, 
  cnpjsCarregados, 
  processando, 
  onDownload, 
  onDownloadParcial,
  onReset 
}) => {
  if (!resultados || resultados.length === 0) return null;

  const sucessos = resultados.filter(r => r.sucesso).length;
  const erros = resultados.filter(r => !r.sucesso).length;

  return (
    <>
      {/* Download Parcial Durante Processamento */}
      {processando && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">
                {LABELS.PARTIAL_RESULTS}
              </h4>
              <p className="text-xs text-purple-700">
                {resultados.length} de {cnpjsCarregados.length} CNPJs já processados
              </p>
            </div>
            <button
              onClick={onDownloadParcial}
              className="ml-4 flex items-center py-2 px-4 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
              {LABELS.PARTIAL_DOWNLOAD}
            </button>
          </div>
        </div>
      )}

      {/* Card de Status */}
      <div className="space-y-4">
        <div className={`p-4 border rounded-lg ${
          processando 
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${
            processando ? 'text-yellow-900' : 'text-blue-900'
          }`}>
            {processando ? LABELS.PROCESSING : LABELS.COMPLETED_TITLE}
          </h3>
          <div className={`text-sm ${
            processando ? 'text-yellow-800' : 'text-blue-800'
          }`}>
            <p>{LABELS.TOTAL_PROCESSED(resultados.length, cnpjsCarregados.length)}</p>
            <p>Sucessos: {sucessos}</p>
            <p>Erros: {erros}</p>
            {processando && (
              <p className="mt-2 text-xs">
                {LABELS.CHECKPOINT_SAVED_AUTO}
              </p>
            )}
          </div>
        </div>

        {!processando && (
          <div className="flex gap-3">
            <button
              onClick={onDownload}
              className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {LABELS.DOWNLOAD_COMPLETE}
            </button>
            <button
              onClick={onReset}
              className="flex-1 flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {LABELS.NEW_QUERY}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultsSection;
