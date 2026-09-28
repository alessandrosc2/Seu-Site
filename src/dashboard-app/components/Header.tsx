import React from 'react';
import { 
  Menu, 
  Briefcase, 
  Search,
  Sparkles
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';

export const Header: React.FC<{
  onOpenMobileMenu: () => void;
  onOpenSearch?: () => void;
}> = ({ onOpenMobileMenu, onOpenSearch }) => {
  const { 
    project, 
    activeModule, 
    activeStep, 
    activeView, 
    setActiveView,
    goToDashboard,
    setShowProjectDrawer,
    calculateProgress
  } = useProject();

  const { percentage } = calculateProgress();

  return (
    <header className="sticky top-0 z-30 bg-[#080D20]/90 backdrop-blur-md border-b border-[#203252] h-16 px-4 md:px-8 flex items-center justify-between gap-3">
      {/* Left side: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg bg-[#111B36] text-[#AAB6CC] hover:text-[#00D4E8] border border-[#203252] lg:hidden cursor-pointer shrink-0"
          aria-label="Abrir menu de navegação"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Current Location Breadcrumb */}
        <div className="flex items-center gap-2 text-xs truncate">
          <button
            onClick={goToDashboard}
            className="text-[#71809B] hover:text-[#00D4E8] transition-colors font-medium cursor-pointer shrink-0"
          >
            Início
          </button>
          <span className="text-[#71809B]">/</span>

          {activeView === 'dashboard' ? (
            <span className="text-[#F5F7FF] font-semibold">Painel Principal</span>
          ) : activeView === 'prompts_hub' ? (
            <span className="text-[#00D4E8] font-semibold">Central de Prompts IA</span>
          ) : activeView === 'briefing' ? (
            <span className="text-[#00D4E8] font-semibold">Briefing Mestre</span>
          ) : activeView === 'plano_completo' ? (
            <span className="text-[#00D4E8] font-semibold">Plano Completo</span>
          ) : activeView === 'registro_hospedagem' ? (
            <span className="text-[#00D4E8] font-semibold">Registro & Hospedagem</span>
          ) : activeView === 'fase3_seo' ? (
            <span className="text-[#00D4E8] font-semibold">Fase 3: Ser Encontrado</span>
          ) : (
            <>
              <span className="text-[#AAB6CC] hidden sm:inline shrink-0">
                Módulo {activeModule.number}
              </span>
              <span className="text-[#71809B] hidden sm:inline">/</span>
              <span className="text-[#00D4E8] font-semibold truncate max-w-[120px] sm:max-w-[200px]">
                {activeStep.title}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right side tools */}
      <div className="flex items-center gap-2 md:gap-2.5 shrink-0">
        {/* Quick Search Button */}
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-xs text-[#AAB6CC] hover:text-[#F5F7FF] transition-colors cursor-pointer"
            title="Buscar no Manual (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#00D4E8]" />
            <span className="hidden md:inline">Buscar</span>
            <kbd className="hidden md:inline font-mono text-[10px] text-[#71809B] bg-[#080D20] px-1 py-0.2 rounded border border-[#203252]">
              Ctrl+K
            </kbd>
          </button>
        )}

        {/* Central de Prompts Quick Link */}
        <button
          onClick={() => setActiveView('prompts_hub')}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-xs text-[#AAB6CC] hover:text-[#00D4E8] transition-colors cursor-pointer"
          title="Abrir Central de Prompts"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00D4E8]" />
          <span className="hidden lg:inline">Prompts IA</span>
        </button>

        {/* Project Badge */}
        <button
          onClick={() => setShowProjectDrawer(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-xs transition-colors cursor-pointer"
          title="Abrir Meu Projeto (Briefing)"
        >
          <Briefcase className="w-3.5 h-3.5 text-[#00D4E8]" />
          <span className="text-[#AAB6CC] hidden sm:inline">Meu Projeto:</span>
          <span className="text-[#F5F7FF] font-semibold truncate max-w-[100px] lg:max-w-[130px]">
            {project.name || 'Em branco'}
          </span>
        </button>

        {/* Global Progress Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111B36] border border-[#203252] text-xs">
          <div className="w-2 h-2 rounded-full bg-[#00D4E8] animate-pulse" />
          <span className="font-mono font-bold text-[#F5F7FF]">{percentage}%</span>
        </div>
      </div>
    </header>
  );
};
