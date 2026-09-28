import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Compass, 
  FileSpreadsheet, 
  Briefcase, 
  Sparkles,
  Layers,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { MODULES, PLANO_COMPLETO_MODULES } from '../data/curriculum';
import { ALL_HUB_PROMPTS } from '../data/promptLibrary';

interface SearchItem {
  id: string;
  type: 'module' | 'step' | 'prompt' | 'action' | 'plano';
  title: string;
  subtitle: string;
  badge: string;
  onSelect: () => void;
}

export const CommandPaletteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { 
    goToStep, 
    goToModule, 
    goToDashboard, 
    setActiveView, 
    setShowProjectDrawer,
    setIsResetModalOpen,
    isStepCompleted
  } = useProject();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build searchable index
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // Quick Actions
    items.push({
      id: 'action-dashboard',
      type: 'action',
      title: 'Início / Painel Geral',
      subtitle: 'Visão geral do progresso e continuação do projeto',
      badge: 'Painel',
      onSelect: () => { goToDashboard(); onClose(); }
    });

    items.push({
      id: 'action-prompts-hub',
      type: 'action',
      title: 'Central de Prompts Prontos para IA',
      subtitle: 'Biblioteca com todos os comandos para ChatGPT, Claude, Gemini e geradores de código',
      badge: 'Biblioteca',
      onSelect: () => { setActiveView('prompts_hub'); onClose(); }
    });

    items.push({
      id: 'action-briefing',
      type: 'action',
      title: 'Briefing Mestre do Projeto',
      subtitle: 'Documento consolidado de dados da empresa',
      badge: 'Documento',
      onSelect: () => { setActiveView('briefing'); onClose(); }
    });

    items.push({
      id: 'action-project-drawer',
      type: 'action',
      title: 'Editar Dados de Meu Projeto',
      subtitle: 'Alterar nome, contatos, diferenciais e serviços',
      badge: 'Configuração',
      onSelect: () => { setShowProjectDrawer(true); onClose(); }
    });

    items.push({
      id: 'action-plano-completo',
      type: 'action',
      title: 'Plano Completo (Metodologia de Venda de Sites)',
      subtitle: 'Como oferecer sites institucionais para clientes e empresas',
      badge: 'Expansão',
      onSelect: () => { setActiveView('plano_completo'); onClose(); }
    });

    items.push({
      id: 'action-reset-journey',
      type: 'action',
      title: 'Reiniciar Projeto / Recomeçar Etapas',
      subtitle: 'Zerar o progresso das etapas mantendo intactos os dados de Meu Projeto',
      badge: 'Reinício',
      onSelect: () => { setIsResetModalOpen(true); onClose(); }
    });

    // Modules
    MODULES.forEach(m => {
      items.push({
        id: `mod-${m.id}`,
        type: 'module',
        title: `Módulo ${m.number}: ${m.name}`,
        subtitle: m.shortDesc,
        badge: 'Módulo',
        onSelect: () => { goToModule(m.id); onClose(); }
      });

      // Steps
      m.steps.forEach(s => {
        items.push({
          id: `step-${s.id}`,
          type: 'step',
          title: `Etapa ${s.numberStr}: ${s.title}`,
          subtitle: s.shortDesc,
          badge: isStepCompleted(s.id) ? 'Concluída' : 'Etapa',
          onSelect: () => { goToStep(s.id); onClose(); }
        });
      });
    });

    // Hub Prompts
    ALL_HUB_PROMPTS.forEach(p => {
      items.push({
        id: `prompt-${p.id}`,
        type: 'prompt',
        title: p.title,
        subtitle: `${p.categoryLabel} • ${p.recommendedAi}`,
        badge: 'Prompt IA',
        onSelect: () => { setActiveView('prompts_hub'); onClose(); }
      });
    });

    // Plano Completo modules
    PLANO_COMPLETO_MODULES.forEach(pc => {
      items.push({
        id: `pc-${pc.id}`,
        type: 'plano',
        title: `Módulo ${pc.number}: ${pc.title}`,
        subtitle: pc.desc,
        badge: 'Plano Completo',
        onSelect: () => { setActiveView('plano_completo'); onClose(); }
      });
    });

    return items;
  }, [goToDashboard, goToModule, goToStep, setActiveView, setShowProjectDrawer, isStepCompleted, onClose]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 15);
    }
    const cleanQ = query.toLowerCase().trim();
    return allItems
      .filter(item => 
        item.title.toLowerCase().includes(cleanQ) || 
        item.subtitle.toLowerCase().includes(cleanQ) ||
        item.badge.toLowerCase().includes(cleanQ)
      )
      .slice(0, 20);
  }, [allItems, query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].onSelect();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-[#030712]/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#0B1535] border border-[#203252] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#203252] flex items-center gap-3 bg-[#070E22]">
          <Search className="w-5 h-5 text-[#00D4E8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Buscar por módulo, etapa, prompt de IA ou ação..."
            className="w-full bg-transparent text-sm text-[#F5F7FF] placeholder-[#71809B] focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-[#71809B] hover:text-[#F5F7FF] px-1.5 py-0.5"
            >
              Limpar
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#71809B] hover:text-[#F5F7FF] hover:bg-[#111B36] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-[#203252]/30">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#71809B]">
              Nenhum resultado encontrado para &quot;<span className="text-[#F5F7FF]">{query}</span>&quot;.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.onSelect}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-[#152342] text-[#F5F7FF]' : 'hover:bg-[#111B36]/60 text-[#AAB6CC]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${
                        item.type === 'prompt' 
                          ? 'bg-[#00D4E8]/15 text-[#00D4E8]'
                          : item.type === 'module'
                            ? 'bg-[#1769FF]/20 text-[#1769FF]'
                            : item.type === 'plano'
                              ? 'bg-[#F59E0B]/15 text-[#F59E0B]'
                              : 'bg-[#111B36] text-[#71809B]'
                      }`}>
                        {item.badge}
                      </span>
                      <h4 className="text-xs font-semibold truncate text-[#F5F7FF]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#71809B] truncate pl-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                    isSelected ? 'text-[#00D4E8] translate-x-0.5' : 'text-[#71809B]'
                  }`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-[#070E22] border-t border-[#203252] flex items-center justify-between text-[11px] text-[#71809B] px-4">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1 py-0.5 rounded bg-[#111B36] text-[#AAB6CC]">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-[#111B36] text-[#AAB6CC]">↓</kbd> para navegar</span>
            <span><kbd className="px-1 py-0.5 rounded bg-[#111B36] text-[#AAB6CC]">Enter</kbd> para abrir</span>
          </div>
          <span><kbd className="px-1 py-0.5 rounded bg-[#111B36] text-[#AAB6CC]">Esc</kbd> para fechar</span>
        </div>
      </div>
    </div>
  );
};
