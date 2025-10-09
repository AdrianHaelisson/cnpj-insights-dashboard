import { useState } from 'react';
import { lerPlanilhaCNPJs, gerarPlanilhaResultados } from './utils/excelService';
import { useCheckpoint } from './hooks/useCheckpoint';
import { useLogs } from './hooks/useLogs';
import { useProcessamento } from './hooks/useProcessamento';
import { API_CONFIG } from './constants/config';
import { MESSAGES } from './constants/messages';
import { ProcessResult, StatusAPI } from './types';
import apiService from './utils/apiService';

// Componentes
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ActionButtons from './components/ActionButtons';
import ProgressBar from './components/ProgressBar';
import LogConsole from './components/LogConsole';
import ResultsSection from './components/ResultsSection';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';

function App() {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [resultados, setResultados] = useState<ProcessResult[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [cnpjsCarregados, setCnpjsCarregados] = useState<string[]>([]);
  const [testandoAPI, setTestandoAPI] = useState<boolean>(false);
  const [statusAPI, setStatusAPI] = useState<StatusAPI>(null);

  // Hooks customizados
  const { logs, adicionarLog, limparLogs, logsEndRef } = useLogs();
  const { salvarCheckpoint, limparCheckpoint } = useCheckpoint((data) => {
    setCnpjsCarregados(data.cnpjsCarregados || []);
    setResultados(data.resultados || []);
    adicionarLog('info', null, MESSAGES.LOGS.CHECKPOINT_RESTORED(data.resultados.length));
  });
  
  const { processando, cancelando, progresso, processar, parar } = useProcessamento(
    cnpjsCarregados,
    resultados,
    adicionarLog,
    salvarCheckpoint
  );

  // Upload de arquivo
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setErro(null);
    setArquivo(file);
    setResultados(null);
    limparLogs();
    
    try {
      const cnpjs = await lerPlanilhaCNPJs(file);
      setCnpjsCarregados(cnpjs);
      setErro(null);
      adicionarLog('info', null, MESSAGES.LOGS.FILE_LOADED(cnpjs.length));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setErro(errorMessage);
      setArquivo(null);
      setCnpjsCarregados([]);
    }
  };

  // Processar CNPJs
  const handleProcessar = async () => {
    try {
      setErro(null);
      await processar(setResultados);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setErro('Erro ao processar CNPJs: ' + errorMessage);
    }
  };

  // Parar processamento
  const handleParar = () => {
    parar();
  };

  // Download de resultados
  const handleDownload = (parcial: boolean = false) => {
    if (resultados && resultados.length > 0) {
      const dataHora = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const nomeArquivo = parcial 
        ? `cnpj_parcial_${resultados.length}_de_${cnpjsCarregados.length}_${dataHora}.xlsx`
        : `cnpj_resultados_${dataHora}.xlsx`;
      gerarPlanilhaResultados(resultados, nomeArquivo);
      adicionarLog('info', null, MESSAGES.LOGS.DOWNLOAD(resultados.length));
    }
  };

  // Resetar aplicação
  const resetar = () => {
    if (processando) {
      const confirmar = window.confirm(MESSAGES.RESET_CONFIRM);
      if (!confirmar) return;
      handleParar();
    }
    
    setArquivo(null);
    setResultados(null);
    setErro(null);
    setCnpjsCarregados([]);
    limparLogs();
    limparCheckpoint();
    adicionarLog('info', null, MESSAGES.LOGS.RESET);
  };

  // Calcular tempo estimado
  const tempoEstimado = (): number => {
    if (cnpjsCarregados.length === 0) return 0;
    const tempoTotal = (cnpjsCarregados.length / 3) * 60;
    return Math.ceil(tempoTotal / 60);
  };

  // Testar API
  const testarAPI = async () => {
    setTestandoAPI(true);
    setStatusAPI(null);
    adicionarLog('info', null, MESSAGES.API_TEST.TESTING);
    
    try {
      // Usa o apiService para respeitar o rate limiting
      const dados = await apiService.consultarCNPJ(API_CONFIG.TEST_CNPJ, (waitTime) => {
        const segundos = Math.ceil(waitTime / 1000);
        adicionarLog('info', null, `⏳ Aguardando ${segundos}s (requisição anterior em andamento)`);
      });
      
      // Se chegou aqui, a API respondeu com sucesso
      if (dados && dados.nome) {
        setStatusAPI('online');
        adicionarLog('sucesso', null, MESSAGES.API_TEST.SUCCESS);
      } else {
        setStatusAPI('erro');
        adicionarLog('erro', null, MESSAGES.API_TEST.ERROR);
      }
    } catch (error) {
      setStatusAPI('offline');
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      if (errorMessage.includes('Timeout')) {
        adicionarLog('erro', null, MESSAGES.API_TEST.TIMEOUT);
      } else if (errorMessage.includes('conexão') || errorMessage.includes('fetch')) {
        adicionarLog('erro', null, MESSAGES.API_TEST.OFFLINE);
      } else {
        adicionarLog('erro', null, `❌ ${errorMessage}`);
      }
      adicionarLog('info', null, MESSAGES.API_TEST.CAUSES);
    } finally {
      setTestandoAPI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        <div className="bg-white rounded-lg shadow-xl p-8">
          <FileUpload
            arquivo={arquivo}
            cnpjsCarregados={cnpjsCarregados}
            processando={processando}
            resultados={resultados}
            tempoEstimado={tempoEstimado}
            onFileChange={handleFileUpload}
            onReset={resetar}
          />

          {erro && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{erro}</p>
            </div>
          )}

          <ActionButtons
            cnpjsCarregados={cnpjsCarregados}
            resultados={resultados}
            processando={processando}
            cancelando={cancelando}
            statusAPI={statusAPI}
            testandoAPI={testandoAPI}
            onTestarAPI={testarAPI}
            onProcessar={handleProcessar}
            onParar={handleParar}
          />

          <ProgressBar 
            progresso={progresso} 
            logs={logs} 
            processando={processando} 
          />

          <LogConsole
            logs={logs}
            logsEndRef={logsEndRef}
            processando={processando}
            onLimpar={limparLogs}
          />

          <ResultsSection
            resultados={resultados}
            cnpjsCarregados={cnpjsCarregados}
            processando={processando}
            onDownload={() => handleDownload(false)}
            onDownloadParcial={() => handleDownload(true)}
            onReset={resetar}
          />
        </div>

        <InfoSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
