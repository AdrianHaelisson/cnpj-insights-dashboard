import { LABELS } from '../constants/messages';
import { ActionButtonsProps } from '../types';

const ActionButtons: React.FC<ActionButtonsProps> = ({
  cnpjsCarregados,
  resultados,
  processando,
  cancelando,
  statusAPI,
  testandoAPI,
  onTestarAPI,
  onProcessar,
  onParar
}) => {
  if (cnpjsCarregados.length === 0 || resultados?.length === cnpjsCarregados.length) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex gap-3">
        <button
          onClick={onTestarAPI}
          disabled={processando || testandoAPI}
          className={`flex-none flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
            statusAPI === 'online' 
              ? 'bg-green-50 text-green-700 border-green-300' 
              : statusAPI === 'offline' || statusAPI === 'erro'
              ? 'bg-red-50 text-red-700 border-red-300'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } ${(processando || testandoAPI) ? 'cursor-not-allowed opacity-50' : ''} transition-colors`}
          title="Testar conexão com a API"
        >
          {testandoAPI ? (
            <>
              <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Testando...
            </>
          ) : statusAPI === 'online' ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              {LABELS.API_ONLINE}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              {LABELS.TEST_API}
            </>
          )}
        </button>
        {!processando ? (
          <button
            onClick={onProcessar}
            className="flex-1 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {resultados && resultados.length > 0 
              ? LABELS.CONTINUE(resultados.length, cnpjsCarregados.length)
              : LABELS.PROCESS(cnpjsCarregados.length)
            }
          </button>
        ) : (
          <button
            onClick={onParar}
            disabled={cancelando}
            className={`flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              cancelando
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            } transition-colors`}
          >
            {cancelando ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {LABELS.STOPPING}
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd"/>
                </svg>
                {LABELS.STOP_PROCESSING}
              </>
            )}
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-center text-gray-500">
        {LABELS.RATE_LIMIT_INFO}
      </p>
    </div>
  );
};

export default ActionButtons;
