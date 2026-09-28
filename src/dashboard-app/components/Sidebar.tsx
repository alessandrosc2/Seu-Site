import React from 'react';
import { 
  Home, 
  Layers, 
  Briefcase, 
  Award, 
  HelpCircle, 
  RotateCcw, 
  Globe, 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Search,
  LogOut
} from 'lucide-react';
import { MODULES } from '../data/curriculum';
import { useProject } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

export const Sidebar: React.FC<{
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onOpenSearch?: () => void;
}> = ({ isOpenMobile = false, onCloseMobile, onOpenSearch }) => {
  const { 
    project, 
    activeModule, 
    goToModule, 
    goToDashboard, 
    activeView, 
    setActiveView, 
    calculateProgress, 
    getModuleProgress,
    setShowProjectDrawer,
    setIsResetModalOpen
  } = useProject();

  const { percentage, completedCount, totalCount } = calculateProgress();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNav = (action: () => void) => {
    action();
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#080D20] border-r border-[#203252] flex flex-col transition-transform duration-300 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-5 border-b border-[#203252] space-y-3">
          <div 
            onClick={() => handleNav(goToDashboard)}
            className="cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4E8] to-[#1769FF] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#00D4E8]/20 group-hover:scale-105 transition-transform">
                M
              </div>
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-[#00D4E8] block">
                  MANUAL GUIADO
                </span>
                <span className="text-base font-extrabold text-[#F5F7FF] tracking-tight">
                  MEU NEGÓCIO ONLINE
                </span>
              </div>
            </div>
            <p className="text-sm text-[#71809B] pl-10">
              Manual e prompts para criar seu site com IA
            </p>
          </div>

          {/* Quick Search Spotlight Button */}
          {onOpenSearch && (
            <button
              onClick={() => handleNav(onOpenSearch)}
              className="w-full py-2 px-3 rounded-lg bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-sm text-[#AAB6CC] flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="text-[#00D4E8]">🔍</span>
                <span>Buscar no manual...</span>
              </span>
              <kbd className="text-xs font-mono px-1.5 py-0.5 rounded bg-[#080D20] text-[#71809B] border border-[#203252]">
                Ctrl+K
              </kbd>
            </button>
          )}
        </div>

        {/* Navigation Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main sections */}
          <div className="space-y-1">
            <div className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-[#71809B]">
              NAVEGAÇÃO
            </div>

            <button
              onClick={() => handleNav(goToDashboard)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeView === 'dashboard'
                  ? 'bg-[#152342] text-[#00D4E8] border border-[#00D4E8]/30 shadow-sm'
                  : 'text-[#AAB6CC] hover:bg-[#111B36] hover:text-[#F5F7FF]'
              }`}
            >
              <Home className="w-5 h-5 text-[#00D4E8]" />
              <span>Painel Geral & Jornada</span>
            </button>

            <button
              onClick={() => handleNav(() => setActiveView('prompts_hub'))}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeView === 'prompts_hub'
                  ? 'bg-[#152342] text-[#00D4E8] border border-[#00D4E8]/30 shadow-sm'
                  : 'text-[#AAB6CC] hover:bg-[#111B36] hover:text-[#F5F7FF]'
              }`}
            >
              <Sparkles className="w-5 h-5 text-[#00D4E8]" />
              <div className="flex items-center justify-between flex-1">
                <span>Central de Prompts</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#00D4E8]/10 text-[#00D4E8] font-bold">
                  IA
                </span>
              </div>
            </button>

            <button
              onClick={() => handleNav(() => setShowProjectDrawer(true))}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#AAB6CC] hover:bg-[#111B36] hover:text-[#F5F7FF] transition-all cursor-pointer"
            >
              <Briefcase className="w-5 h-5 text-[#1769FF]" />
              <div className="flex items-center justify-between flex-1">
                <span>Meu Projeto</span>
                <span className="text-xs text-[#71809B] font-mono truncate max-w-[90px]">
                  {project.name || 'Em branco'}
                </span>
              </div>
            </button>

            <button
              onClick={() => handleNav(() => setActiveView('briefing'))}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeView === 'briefing'
                  ? 'bg-[#152342] text-[#00D4E8] border border-[#00D4E8]/30 shadow-sm'
                  : 'text-[#AAB6CC] hover:bg-[#111B36] hover:text-[#F5F7FF]'
              }`}
            >
              <Award className="w-5 h-5 text-[#F59E0B]" />
              <span>Briefing Mestre</span>
            </button>
          </div>

          {/* Modules List (00 to 10) */}
          <div className="space-y-1">
            <div className="px-3 mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#71809B]">
              <span>MÓDULOS DE EXECUÇÃO</span>
              <span className="text-mono">00–10</span>
            </div>

            <div className="space-y-1">
              {MODULES.map((mod) => {
                const isActive = (activeView === 'module' || activeView === 'step') && activeModule.id === mod.id;
                const progress = getModuleProgress(mod.id);
                const isComplete = progress.percentage === 100;

                return (
                  <button
                    key={mod.id}
                    onClick={() => handleNav(() => goToModule(mod.id))}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#111B36] text-[#F5F7FF] font-semibold border-l-2 border-[#00D4E8]'
                        : 'text-[#AAB6CC] hover:bg-[#111B36]/60 hover:text-[#F5F7FF]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate min-w-0">
                      <span className="font-mono text-sm text-[#71809B] font-bold">
                        {mod.number}
                      </span>
                      <span className="truncate">{mod.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {isComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
                      ) : (
                        <span className="text-xs font-mono text-[#71809B]">
                          {progress.completed}/{progress.total}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plano Completo section */}
          <div className="pt-2 border-t border-[#203252]/60 space-y-2">
            <div className="px-3 mb-1 text-xs font-bold uppercase tracking-wider text-[#71809B]">
              EXPANSÃO & METODOLOGIA
            </div>

            {/* Novo Módulo: Registro e Hospedagem */}
            <button
              onClick={() => handleNav(() => setActiveView('registro_hospedagem'))}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                activeView === 'registro_hospedagem'
                  ? 'bg-gradient-to-r from-[#00D4E8]/20 to-[#1769FF]/20 border-[#00D4E8] text-[#F5F7FF]'
                  : 'bg-[#111B36] border-[#203252] text-[#AAB6CC] hover:text-[#F5F7FF] hover:border-[#00D4E8]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-[#00E599] flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>REGISTRO & HOSPEDAGEM</span>
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#00E599]/15 text-[#00E599] font-bold">
                  Novo
                </span>
              </div>
              <p className="text-sm text-[#AAB6CC] leading-snug">
                Domínio próprio, Vercel, Netlify e Hostinger para leigos.
              </p>
            </button>

            {/* Novo: Fase 3: Ser Encontrado */}
            <button
              onClick={() => handleNav(() => setActiveView('fase3_seo'))}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                activeView === 'fase3_seo'
                  ? 'bg-gradient-to-r from-[#00D4E8]/20 to-[#1769FF]/20 border-[#00D4E8] text-[#F5F7FF]'
                  : 'bg-[#111B36] border-[#203252] text-[#AAB6CC] hover:text-[#F5F7FF] hover:border-[#00D4E8]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-[#00D4E8] flex items-center gap-1.5">
                  <Search className="w-4 h-4" />
                  <span>FASE 3: SER ENCONTRADO</span>
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#00D4E8]/15 text-[#00D4E8] font-bold">
                  SEO & LGPD
                </span>
              </div>
              <p className="text-sm text-[#AAB6CC] leading-snug">
                Google Maps, Search Console e aviso de cookies.
              </p>
            </button>

            <button
              onClick={() => handleNav(() => setActiveView('plano_completo'))}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                activeView === 'plano_completo'
                  ? 'bg-gradient-to-r from-[#00D4E8]/20 to-[#1769FF]/20 border-[#00D4E8] text-[#F5F7FF]'
                  : 'bg-[#111B36] border-[#203252] text-[#AAB6CC] hover:text-[#F5F7FF] hover:border-[#00D4E8]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-[#00D4E8] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>PLANO COMPLETO</span>
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#152342] text-[#AAB6CC]">
                  21 Módulos
                </span>
              </div>
              <p className="text-sm text-[#AAB6CC] leading-snug">
                Como transformar essa habilidade em serviço para clientes.
              </p>
            </button>
          </div>
        </div>

        {/* Footer Progress & Reset */}
        <div className="p-4 border-t border-[#203252] bg-[#0B1535]">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[#AAB6CC] font-semibold">Progresso Geral</span>
            <span className="font-mono font-bold text-[#00D4E8]">{percentage}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#111B36] border border-[#203252] overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-[#00D4E8] to-[#1769FF] transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-[#71809B] mb-2">
            <span>{completedCount} de {totalCount} etapas</span>
            <span>{Math.max(0, totalCount - completedCount)} restantes</span>
          </div>

          {/* Reset button */}
          <div className="pt-2 border-t border-[#203252]/60 space-y-2">
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              title="Reiniciar etapas do projeto"
              className="w-full py-1.5 px-2 rounded text-sm font-semibold bg-[#111B36] hover:bg-[#152342] text-[#71809B] hover:text-[#00D4E8] border border-[#203252] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Projeto (Limpar Dados)</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-1.5 px-2 rounded text-sm font-semibold bg-[#111B36] hover:bg-red-500/10 text-red-400 hover:text-red-300 border border-[#203252] hover:border-red-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
