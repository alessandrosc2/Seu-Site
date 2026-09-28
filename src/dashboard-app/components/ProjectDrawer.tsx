import React from 'react';
import { 
  X, 
  Briefcase, 
  Layers
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { ProjectFormView } from './ProjectFormView';

export const ProjectDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { setActiveView } = useProject();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-2xl bg-[#080D20] border-l border-[#203252] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 md:p-6 bg-[#0B1535] border-b border-[#203252] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#111B36] text-[#00D4E8] border border-[#203252]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg md:text-lg font-bold text-[#F5F7FF]">Meu Projeto</h2>
                <p className="text-sm text-[#AAB6CC]">
                  Fonte de verdade que alimenta os textos, cores e o Prompt Mestre
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-[#71809B] hover:text-[#F5F7FF] hover:bg-[#111B36] transition-colors cursor-pointer"
                title="Fechar painel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="px-6 py-2.5 bg-[#111B36]/60 border-b border-[#203252] flex items-center justify-between text-sm">
            <span className="text-[#AAB6CC]">
              Todas as alterações são salvas automaticamente.
            </span>
            <button
              onClick={() => {
                onClose();
                setActiveView('briefing');
              }}
              className="text-[#00D4E8] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Ver Briefing Consolidado</span>
            </button>
          </div>

          {/* Drawer Form Body */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6">
            <ProjectFormView 
              isStepView={false} 
              onCloseDrawer={onClose} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
