import { LABELS } from '../constants/messages';
import { LogConsoleProps, Log } from '../types';

interface LogStyle {
  corClasse: string;
  bgClasse: string;
  icone: string;
}

const LogConsole: React.FC<LogConsoleProps> = ({ logs, logsEndRef, processando, onLimpar }) => {
  if (logs.length === 0) return null;

  const getLogStyle = (log: Log): LogStyle => {
    let corClasse = 'text-gray-300';
    let bgClasse = '';
    let icone = '';
    
    const isRateLimit = log.mensagem.includes('Aguardando');
    
    if (log.tipo === 'sucesso') {
      corClasse = 'text-green-400';
      bgClasse = 'bg-green-900 bg-opacity-20 border-l-2 border-green-500';
      icone = '✅';
    } else if (log.tipo === 'erro') {
      corClasse = 'text-red-400';
      bgClasse = 'bg-red-900 bg-opacity-20 border-l-2 border-red-500';
      icone = '❌';
    } else if (log.tipo === 'aviso') {
      corClasse = 'text-yellow-400';
      bgClasse = 'bg-yellow-900 bg-opacity-20 border-l-2 border-yellow-500';
      icone = '⚠️';
    } else if (log.tipo === 'info') {
      if (isRateLimit) {
        corClasse = 'text-orange-400';
        bgClasse = 'bg-orange-900 bg-opacity-30 border-l-4 border-orange-500';
        icone = '⏳';
      } else {
        corClasse = 'text-blue-400';
        bgClasse = 'bg-blue-900 bg-opacity-20 border-l-2 border-blue-500';
        icone = log.mensagem.includes('Dados adicionados') ? '📋' : 'ℹ️';
      }
    }
    
    return { corClasse, bgClasse, icone };
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-700">
          {LABELS.LOGS_TITLE}
        </h3>
        <div className="flex gap-2 items-center">
          <div className="text-xs text-gray-500 hidden sm:flex gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Consultando
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Sucesso
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Aguardando
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Erro
            </span>
          </div>
          <button
            onClick={onLimpar}
            className="text-xs text-gray-500 hover:text-gray-700 ml-3"
            disabled={processando}
          >
            {LABELS.CLEAR}
          </button>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 h-80 overflow-y-auto font-mono text-xs" style={{ scrollBehavior: 'smooth' }}>
        {logs.map((log) => {
          const { corClasse, bgClasse, icone } = getLogStyle(log);
          const timestamp = log.timestamp instanceof Date 
            ? log.timestamp.toLocaleTimeString('pt-BR')
            : log.timestamp;
          
          return (
            <div
              key={log.id}
              className={`mb-2 p-3 rounded ${bgClasse} ${corClasse} transition-all duration-300`}
              style={{ animation: 'slideIn 0.3s ease-out' }}
            >
              <div className="flex items-start">
                <span className="text-gray-500 mr-2 text-xs">[{timestamp}]</span>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="mr-2">{icone}</span>
                    <span>{log.mensagem}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
};

export default LogConsole;
