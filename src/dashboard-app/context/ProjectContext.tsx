import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { BusinessProject, ModuleDef, StepDef, ModuleStatus, ActiveView } from '../types/project';
import { MODULES, INITIAL_EMPTY_PROJECT } from '../data/curriculum';

interface ProjectContextType {
  project: BusinessProject;
  updateProject: (data: Partial<BusinessProject>) => void;
  completeStep: (stepId: string, autoAdvance?: boolean) => void;
  uncompleteStep: (stepId: string) => void;
  goToStep: (stepId: string) => void;
  goToModule: (moduleId: string) => void;
  goToDashboard: () => void;
  resetJourney: (keepBusinessData?: boolean) => void;
  resetToBlank: () => void;
  isStepCompleted: (stepId: string) => boolean;
  getModuleStatus: (moduleId: string) => ModuleStatus;
  getModuleProgress: (moduleId: string) => { completed: number; total: number; percentage: number };
  calculateProgress: () => { percentage: number; completedCount: number; totalCount: number };
  activeModule: ModuleDef;
  activeStep: StepDef;
  getNextStep: (currentStepId?: string) => { step: StepDef; module: ModuleDef } | null;
  getPrevStep: (currentStepId?: string) => { step: StepDef; module: ModuleDef } | null;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  showProjectDrawer: boolean;
  setShowProjectDrawer: (show: boolean) => void;
  isResetModalOpen: boolean;
  setIsResetModalOpen: (open: boolean) => void;
  feedbackToast: string | null;
  setFeedbackToast: (toast: string | null) => void;
  totalStepsCount: number;
}

const STORAGE_KEY = 'meu_negocio_online_project_clean_v4';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<BusinessProject>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const validStepIds = new Set(MODULES.flatMap(m => m.steps.map(s => s.id)));
          const rawCompleted = Array.isArray(parsed.completedStepIds) ? parsed.completedStepIds : [];
          // Filter out legacy or invalid step IDs and eliminate duplicates
          const sanitizedCompleted = Array.from(new Set(rawCompleted.filter((id: string) => validStepIds.has(id))));

          return { 
            ...INITIAL_EMPTY_PROJECT, 
            ...parsed,
            completedStepIds: sanitizedCompleted
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load project from localStorage:', e);
    }
    // Clean initial project state by default: 0% progress, empty answers
    return INITIAL_EMPTY_PROJECT;
  });

  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [showProjectDrawer, setShowProjectDrawer] = useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Auto-dismiss feedback toast after 4.5 seconds
  useEffect(() => {
    if (feedbackToast) {
      const timer = setTimeout(() => {
        setFeedbackToast(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [feedbackToast]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    } catch (e) {
      console.warn('Failed to save project to localStorage:', e);
    }
  }, [project]);

  const updateProject = useCallback((data: Partial<BusinessProject>) => {
    setProject(prev => ({
      ...prev,
      ...data,
      lastUpdated: new Date().toISOString()
    }));
  }, []);

  const totalStepsCount = useMemo(() => {
    return MODULES.reduce((acc, m) => acc + m.steps.length, 0);
  }, []);

  const isStepCompleted = useCallback((stepId: string) => {
    return project.completedStepIds.includes(stepId);
  }, [project.completedStepIds]);

  // Find step & module
  const allStepsWithModules = useMemo(() => {
    const list: { step: StepDef; module: ModuleDef }[] = [];
    MODULES.forEach(m => {
      m.steps.forEach(s => {
        list.push({ step: s, module: m });
      });
    });
    return list;
  }, []);

  const activeModule = useMemo(() => {
    return MODULES.find(m => m.id === project.currentModuleId) || MODULES[0];
  }, [project.currentModuleId]);

  const activeStep = useMemo(() => {
    return activeModule.steps.find(s => s.id === project.currentStepId) || activeModule.steps[0] || MODULES[0].steps[0];
  }, [activeModule, project.currentStepId]);

  const getNextStep = useCallback((currentStepId?: string) => {
    const targetId = currentStepId || project.currentStepId;
    const currentIndex = allStepsWithModules.findIndex(item => item.step.id === targetId);
    if (currentIndex >= 0 && currentIndex < allStepsWithModules.length - 1) {
      return allStepsWithModules[currentIndex + 1];
    }
    return null;
  }, [allStepsWithModules, project.currentStepId]);

  const getPrevStep = useCallback((currentStepId?: string) => {
    const targetId = currentStepId || project.currentStepId;
    const currentIndex = allStepsWithModules.findIndex(item => item.step.id === targetId);
    if (currentIndex > 0) {
      return allStepsWithModules[currentIndex - 1];
    }
    return null;
  }, [allStepsWithModules, project.currentStepId]);

  const goToStep = useCallback((stepId: string) => {
    const found = allStepsWithModules.find(item => item.step.id === stepId);
    if (found) {
      setProject(prev => ({
        ...prev,
        currentModuleId: found.module.id,
        currentStepId: found.step.id
      }));
      setActiveView('step');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [allStepsWithModules]);

  const goToModule = useCallback((moduleId: string) => {
    const mod = MODULES.find(m => m.id === moduleId);
    if (mod) {
      setProject(prev => ({
        ...prev,
        currentModuleId: mod.id,
        currentStepId: mod.steps[0]?.id || prev.currentStepId
      }));
      setActiveView('module');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const goToDashboard = useCallback(() => {
    setActiveView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const completeStep = useCallback((stepId: string, autoAdvance = false) => {
    const validStepIds = new Set(MODULES.flatMap(m => m.steps.map(s => s.id)));
    if (!validStepIds.has(stepId)) {
      console.warn(`[ProjectContext] Ignorando stepId inválido: "${stepId}"`);
      return;
    }

    setProject(prev => {
      const alreadyCompleted = prev.completedStepIds.includes(stepId);
      const filtered = prev.completedStepIds.filter(id => validStepIds.has(id));
      const newCompleted = alreadyCompleted ? filtered : [...filtered, stepId];
      return {
        ...prev,
        completedStepIds: newCompleted,
        lastUpdated: new Date().toISOString()
      };
    });

    if (autoAdvance) {
      const next = getNextStep(stepId);
      if (next) {
        goToStep(next.step.id);
      }
    }
  }, [getNextStep, goToStep]);

  const uncompleteStep = useCallback((stepId: string) => {
    setProject(prev => ({
      ...prev,
      completedStepIds: prev.completedStepIds.filter(id => id !== stepId),
      lastUpdated: new Date().toISOString()
    }));
  }, []);

  const getModuleProgress = useCallback((moduleId: string) => {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod || mod.steps.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const validStepIds = new Set(MODULES.flatMap(m => m.steps.map(s => s.id)));
    const completed = mod.steps.filter(s => validStepIds.has(s.id) && project.completedStepIds.includes(s.id)).length;
    const cappedCompleted = Math.min(completed, mod.steps.length);
    return {
      completed: cappedCompleted,
      total: mod.steps.length,
      percentage: Math.min(100, Math.max(0, Math.round((cappedCompleted / mod.steps.length) * 100)))
    };
  }, [project.completedStepIds]);

  const getModuleStatus = useCallback((moduleId: string): ModuleStatus => {
    const modIndex = MODULES.findIndex(m => m.id === moduleId);
    if (modIndex === -1) return 'locked';
    if (modIndex === 0) {
      const prog = getModuleProgress(moduleId);
      if (prog.percentage === 100) return 'completed';
      if (prog.percentage > 0) return 'in_progress';
      return 'available';
    }
    const currentProg = getModuleProgress(moduleId);
    if (currentProg.percentage === 100) return 'completed';
    if (currentProg.percentage > 0) return 'in_progress';
    return 'available'; // Avoid excessive blocks so user can view full journey
  }, [getModuleProgress]);

  const calculateProgress = useCallback(() => {
    const validStepIds = new Set(MODULES.flatMap(m => m.steps.map(s => s.id)));
    const validCompleted = Array.from(
      new Set(project.completedStepIds.filter(id => validStepIds.has(id)))
    );
    const completedCount = Math.min(validCompleted.length, totalStepsCount);
    const percentage = totalStepsCount > 0 
      ? Math.min(100, Math.max(0, Math.round((completedCount / totalStepsCount) * 100))) 
      : 0;

    return {
      percentage,
      completedCount,
      totalCount: totalStepsCount
    };
  }, [project.completedStepIds, totalStepsCount]);

  const resetJourney = useCallback((keepBusinessData: boolean = true) => {
    setProject(prev => {
      let updated: BusinessProject;
      if (keepBusinessData) {
        updated = {
          ...INITIAL_EMPTY_PROJECT,
          // Preservar Meu Projeto e Briefing Estruturado
          name: prev.name,
          segment: prev.segment,
          city: prev.city,
          region: prev.region,
          whatsapp: prev.whatsapp,
          instagram: prev.instagram,
          email: prev.email,
          address: prev.address,
          services: prev.services,
          targetAudience: prev.targetAudience,
          differentials: prev.differentials,
          siteGoal: prev.siteGoal,
          communicationTone: prev.communicationTone,
          pages: prev.pages,
          ctaType: prev.ctaType,
          ctaLabel: prev.ctaLabel,
          targetCheckoutUrl: prev.targetCheckoutUrl,
          visualStyle: prev.visualStyle,
          primaryColor: prev.primaryColor,
          secondaryColor: prev.secondaryColor,
          accentColor: prev.accentColor,
          typography: prev.typography,
          imageStyle: prev.imageStyle,
          visualPositioning: prev.visualPositioning,
          visualPersonality: prev.visualPersonality,
          paletteSource: prev.paletteSource,
          brandLogoColors: prev.brandLogoColors,
          referenceUrl: prev.referenceUrl,
          visualIdentity: prev.visualIdentity,
          gptPaletteResponse: prev.gptPaletteResponse,

          // Zerar todas as etapas da jornada
          completedStepIds: [],
          currentModuleId: '00',
          currentStepId: '00-01',
          briefingApproved: false,
          reviewChecklist: { ...INITIAL_EMPTY_PROJECT.reviewChecklist },
          deploymentMethod: 'pending',
          publishedUrl: '',
          customDomain: '',
          domainRegistered: false,
          googleSearchConsoleConfigured: false,
          sitemapSubmitted: false,
          heroHeadline: '',
          heroSubheadline: '',
          aboutText: '',
          differentialsHeadline: '',
          servicesHeadline: '',
          faqItems: [],
          seoTitle: '',
          seoDescription: '',
          stepOutputs: {},
          lastUpdated: new Date().toISOString()
        };
      } else {
        updated = {
          ...INITIAL_EMPTY_PROJECT,
          lastUpdated: new Date().toISOString()
        };
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed saving reset project to localStorage:', e);
      }
      return updated;
    });

    setActiveView('dashboard');
    setIsResetModalOpen(false);
    setFeedbackToast(keepBusinessData
      ? 'Jornada reiniciada com sucesso! As etapas foram zeradas (0%) mantendo os dados cadastrados em Meu Projeto.'
      : 'Projeto e etapas zerados completamente do zero com sucesso.'
    );
  }, []);

  const resetToBlank = useCallback(() => {
    resetJourney(true);
  }, [resetJourney]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        updateProject,
        completeStep,
        uncompleteStep,
        goToStep,
        goToModule,
        goToDashboard,
        resetJourney,
        resetToBlank,
        isStepCompleted,
        getModuleStatus,
        getModuleProgress,
        calculateProgress,
        activeModule,
        activeStep,
        getNextStep,
        getPrevStep,
        activeView,
        setActiveView,
        showProjectDrawer,
        setShowProjectDrawer,
        isResetModalOpen,
        setIsResetModalOpen,
        feedbackToast,
        setFeedbackToast,
        totalStepsCount
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
