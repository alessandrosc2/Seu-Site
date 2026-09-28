import React, { useEffect } from 'react';
import { 
  RotateCcw, 
  Sparkles, 
  AlertTriangle, 
  X, 
  ShieldCheck, 
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export const ResetConfirmModal: React.FC = () => {
  const { 
    isResetModalOpen, 
    setIsResetModalOpen, 
    resetJourney, 
    calculateProgress,
    project 
  } = useProject();

  const { percentage, completedCount } = calculateProgress();

  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isResetModalOpen) {
        setIsResetModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResetModalOpen, setIsResetModalOpen]);

  if (!isResetModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080D20]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[#0B1535] border border-[#203252] rounded-2xl shadow-2xl overflow-hidden glow-cyan-subtle"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#203252] flex items-center justify-between bg-[#111B36]/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00D4E8]/10 text-[#00D4E8] border border-[#00D4E8]/30">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F7FF] tracking-tight">
                Reiniciar Projeto & Etapas
              </h3>
              <p className="text-sm text-[#AAB6CC]">
                Progresso atual: {percentage}% ({completedCount} etapas concluídas)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsResetModalOpen(false)}
            className="p-1.5 rounded-lg text-[#71809B] hover:text-[#F5F7FF] hover:bg-[#152342] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Options */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-[#AAB6CC] leading-relaxed">
            Como você deseja recomeçar no <strong>Meu Negócio Online</strong>? Escolha uma das opções abaixo:
          </p>

          {/* Option 1: RECOMMENDED - Keep Business Data, Reset Journey Steps */}
          <div 
            onClick={() => resetJourney(true)}
            className="group p-4 rounded-xl border border-[#00D4E8]/40 hover:border-[#00D4E8] bg-[#111B36] hover:bg-[#152342] transition-all cursor-pointer shadow-md space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00D4E8]" />
                <span className="text-sm font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors">
                  Reiniciar Etapas (Manter Meu Projeto)
                </span>
              </div>
              <span className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#00D4E8]/20 text-[#00D4E8] border border-[#00D4E8]/30">
                Recomendado
              </span>
            </div>

            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Zera todas as etapas da jornada (volta para 0% de progresso), <strong>preservando intactos</strong> os dados da sua empresa ({project.name || 'Meu Negócio'}), catálogo de serviços, contatos e a <strong>Identidade Visual</strong> estruturada que alimenta os prompts de IA.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[#22C55E] font-medium pt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Dados do Meu Projeto e Briefing continuam salvos</span>
            </div>
          </div>

          {/* Option 2: Reset Everything (Complete Blank) */}
          <div 
            onClick={() => resetJourney(false)}
            className="group p-4 rounded-xl border border-[#203252] hover:border-[#EF4444]/60 bg-[#080D20] hover:bg-[#141224] transition-all cursor-pointer space-y-2"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-[#71809B] group-hover:text-[#EF4444] transition-colors" />
              <span className="text-sm font-bold text-[#AAB6CC] group-hover:text-[#EF4444] transition-colors">
                Zerar Tudo do Zero (Limpar Tudo)
              </span>
            </div>

            <p className="text-sm text-[#71809B] leading-relaxed">
              Apaga completamente todas as informações de Meu Projeto e zera todas as etapas, restaurando a aplicação para o estado inicial em branco.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#111B36]/60 border-t border-[#203252] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsResetModalOpen(false)}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-[#AAB6CC] hover:text-[#F5F7FF] bg-[#111B36] hover:bg-[#152342] border border-[#203252] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
