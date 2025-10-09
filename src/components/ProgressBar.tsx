import { LABELS } from '../constants/messages';
import { ProgressBarProps } from '../types';

const ProgressBar: React.FC<ProgressBarProps> = ({ progresso, logs, processando }) => {
  if (!processando) return null;

  const sucessos = logs.filter(l => l.tipo === 'sucesso').length;
  const erros = logs.filter(l => l.tipo === 'erro').length;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {LABELS.PROGRESS}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {progresso.atual} / {progresso.total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-indigo-600 h-4 rounded-full transition-all duration-300 ease-out flex items-center justify-center"
          style={{ width: `${progresso.percentual}%` }}
        >
          <span className="text-xs font-medium text-white">
            {Math.round(progresso.percentual)}%
          </span>
        </div>
      </div>
      
      {/* Estatísticas em tempo real */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">{progresso.atual}</div>
          <div className="text-xs text-blue-700">{LABELS.PROCESSED}</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{sucessos}</div>
          <div className="text-xs text-green-700">{LABELS.SUCCESS}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-600">{erros}</div>
          <div className="text-xs text-red-700">{LABELS.ERRORS}</div>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <div className="inline-flex items-center text-sm text-gray-600">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {LABELS.CONSULTING}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
