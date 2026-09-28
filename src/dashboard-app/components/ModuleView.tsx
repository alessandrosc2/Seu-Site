import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Sparkles, 
  Clock,
  Layers,
  Check
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { MODULES } from '../data/curriculum';

export const ModuleView: React.FC = () => {
  const { 
    activeModule, 
    goToStep, 
    goToDashboard, 
    getModuleProgress, 
    isStepCompleted,
    goToModule
  } = useProject();

  const progress = getModuleProgress(activeModule.id);

  // Find first uncompleted step or default to step 0
  const firstUncompletedStep = activeModule.steps.find(s => !isStepCompleted(s.id)) || activeModule.steps[0];

  // Find prev and next module
  const currentModIdx = MODULES.findIndex(m => m.id === activeModule.id);
  const prevMod = currentModIdx > 0 ? MODULES[currentModIdx - 1] : null;
  const nextMod = currentModIdx < MODULES.length - 1 ? MODULES[currentModIdx + 1] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back link */}
      <div>
        <button
          onClick={goToDashboard}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#AAB6CC] hover:text-[#00D4E8] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Painel Geral</span>
        </button>
      </div>

      {/* Module Header Card */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-6 md:p-8 relative overflow-hidden glow-cyan-subtle">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#152342] text-[#00D4E8] border border-[#203252]">
              MÓDULO {activeModule.number}
            </span>
            <span className="text-xs text-[#71809B]">/</span>
            <span className="text-xs text-[#AAB6CC]">
              {activeModule.steps.length} etapas no total
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-[#F5F7FF] tracking-tight">
            {activeModule.name}
          </h1>

          <p className="text-sm md:text-base text-[#AAB6CC] max-w-2xl leading-relaxed">
            {activeModule.shortDesc}
          </p>
        </div>
      </div>

      {/* Module Progress Card */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
            PROGRESSO DO MÓDULO
          </span>
          <div className="text-lg font-bold text-[#F5F7FF]">
            {progress.completed} de {progress.total} etapas concluídas ({progress.percentage}%)
          </div>
        </div>

        {/* Action Button to resume */}
        <button
          type="button"
          onClick={() => goToStep(firstUncompletedStep.id)}
          className="btn-cta px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <span>{progress.completed === progress.total ? 'REVISAR ETAPAS' : 'CONTINUAR MÓDULO'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#71809B] px-1">
          <span>LISTA DE ETAPAS</span>
          <span>STATUS</span>
        </div>

        <div className="space-y-2.5">
          {activeModule.steps.map((step, idx) => {
            const completed = isStepCompleted(step.id);
            const isCurrent = step.id === firstUncompletedStep.id;

            return (
              <div
                key={step.id}
                onClick={() => goToStep(step.id)}
                className={`bg-[#0B1535] border rounded-xl p-4 md:p-5 flex items-center justify-between gap-4 transition-all cursor-pointer group ${
                  isCurrent
                    ? 'border-[#00D4E8] bg-[#111B36] shadow-md shadow-[#00D4E8]/5'
                    : 'border-[#203252] hover:border-[#203252]/90 hover:bg-[#111B36]/50'
                }`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="shrink-0 mt-0.5">
                    {completed ? (
                      <div className="w-6 h-6 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-6 h-6 rounded-full border-2 border-[#00D4E8] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#00D4E8]"></div>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-[#71809B]/40 flex items-center justify-center text-[10px] text-[#71809B] font-mono">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#00D4E8] font-bold">
                        Etapa {step.numberStr}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-[#00D4E8]/15 text-[#00D4E8] border border-[#00D4E8]/30">
                          Próximo a Fazer
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors truncate">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#AAB6CC] line-clamp-1">
                      {step.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-[#71809B] group-hover:text-[#F5F7FF] hidden sm:inline">
                    {completed ? 'Revisar' : 'Começar'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#71809B] group-hover:text-[#00D4E8] group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Module Navigation Footer */}
      <div className="pt-6 border-t border-[#203252] flex items-center justify-between">
        {prevMod ? (
          <button
            onClick={() => goToModule(prevMod.id)}
            className="px-4 py-2 rounded-xl bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-xs font-semibold text-[#AAB6CC] hover:text-[#F5F7FF] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Módulo Anterior: {prevMod.name}</span>
          </button>
        ) : <div />}

        {nextMod && (
          <button
            onClick={() => goToModule(nextMod.id)}
            className="px-4 py-2 rounded-xl bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-xs font-semibold text-[#00D4E8] hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Próximo Módulo: {nextMod.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
