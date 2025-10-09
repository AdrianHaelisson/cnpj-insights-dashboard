import { criarPlanilhaExemplo } from '../utils/criarExemploXLSX';
import { LABELS } from '../constants/messages';
import { FileUploadProps } from '../types';

const FileUpload: React.FC<FileUploadProps> = ({ 
  arquivo, 
  cnpjsCarregados, 
  processando, 
  resultados,
  tempoEstimado,
  onFileChange,
  onReset 
}) => {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {LABELS.FILE_LABEL}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Escolher arquivo</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".xlsx,.xls,.csv"
                onChange={onFileChange}
                disabled={processando}
              />
            </label>
            <p className="pl-1">{LABELS.FILE_PLACEHOLDER}</p>
          </div>
          <p className="text-xs text-gray-500">
            {LABELS.FILE_HINT}
          </p>
          <button
            type="button"
            onClick={() => criarPlanilhaExemplo()}
            className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 underline"
            disabled={processando}
          >
            {LABELS.DOWNLOAD_EXAMPLE}
          </button>
        </div>
      </div>
      
      {arquivo && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">
                {LABELS.FILE_LOADED} {arquivo.name}
              </p>
              <p className="text-sm text-green-600">
                {LABELS.CNPJS_FOUND(cnpjsCarregados.length)}
              </p>
              {cnpjsCarregados.length > 0 && (
                <p className="text-xs text-green-600 mt-1">
                  {LABELS.ESTIMATED_TIME_LABEL(tempoEstimado())}
                </p>
              )}
            </div>
            {!processando && !resultados && (
              <button
                onClick={onReset}
                className="text-sm text-red-600 hover:text-red-800"
              >
                {LABELS.REMOVE}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
