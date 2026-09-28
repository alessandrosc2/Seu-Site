/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ModuleView } from './components/ModuleView';
import { StepView } from './components/StepView';
import { BriefingMestreView } from './components/BriefingMestreView';
import { PlanoCompletoView } from './components/PlanoCompletoView';
import { PromptHubView } from './components/PromptHubView';
import { HostingGuideView } from './components/HostingGuideView';
import { Fase3SeoView } from './components/Fase3SeoView';
import { ProjectDrawer } from './components/ProjectDrawer';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { CheckCircle2, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    activeView, 
    showProjectDrawer,
    setShowProjectDrawer,
    feedbackToast,
    setFeedbackToast
  } = useProject();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#080D20] text-[#F5F7FF] flex flex-col antialiased">
      {/* Sidebar (Desktop fixed & Mobile drawer) */}
      <Sidebar 
        isOpenMobile={isMobileMenuOpen} 
        onCloseMobile={() => setIsMobileMenuOpen(false)} 
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area (offset by sidebar on lg screens) */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0">
        {/* Sticky Header */}
        <Header 
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)} 
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Dynamic Viewport Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'module' && <ModuleView />}
          {activeView === 'step' && <StepView />}
          {activeView === 'briefing' && <BriefingMestreView />}
          {activeView === 'plano_completo' && <PlanoCompletoView />}
          {activeView === 'prompts_hub' && <PromptHubView />}
          {activeView === 'registro_hospedagem' && <HostingGuideView />}
          {activeView === 'fase3_seo' && <Fase3SeoView />}
        </main>
      </div>

      {/* "Meu Projeto" Drawer (Briefing Estruturado do Usuário) */}
      <ProjectDrawer
        isOpen={showProjectDrawer}
        onClose={() => setShowProjectDrawer(false)}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Modal de Confirmação de Reinício */}
      <ResetConfirmModal />

      {/* Floating Feedback Toast Notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111B36] border border-[#00D4E8] text-[#F5F7FF] px-4 py-3 rounded-xl shadow-2xl animate-fade-in max-w-md">
          <CheckCircle2 className="w-5 h-5 text-[#00D4E8] shrink-0" />
          <span className="text-xs font-semibold leading-relaxed">{feedbackToast}</span>
          <button 
            type="button"
            onClick={() => setFeedbackToast(null)}
            className="text-[#AAB6CC] hover:text-[#F5F7FF] ml-2 text-xs p-1 rounded hover:bg-[#152342] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}
