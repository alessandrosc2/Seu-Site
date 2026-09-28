import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Save, 
  Check, 
  Sparkles, 
  Copy, 
  Layers, 
  Plus, 
  Trash2, 
  DollarSign, 
  Globe, 
  ShieldCheck,
  Award,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { 
  LessonHeader, 
  InfoCard, 
  TipCard, 
  WarningCard, 
  ExampleCard, 
  TaskCard, 
  PromptBlock, 
  OrientationBar,
  NextStepCard
} from './ui/Cards';
import { ServiceItem, BusinessProject } from '../types/project';
import { VisualIdentityBuilder } from './VisualIdentityBuilder';
import { ImageGuideStep } from './ImageGuideStep';
import { ArtDirectionStep } from './ArtDirectionStep';
import { ProjectFormView } from './ProjectFormView';
import { ContentPrepStep } from './ContentPrepStep';
import { MasterPromptStep } from './MasterPromptStep';
import { LaunchPadStep } from './LaunchPadStep';

export const StepView: React.FC = () => {
  const { 
    project, 
    updateProject, 
    activeModule, 
    activeStep, 
    completeStep, 
    uncompleteStep, 
    isStepCompleted, 
    getNextStep, 
    goToModule, 
    goToDashboard
  } = useProject();

  const isCompleted = isStepCompleted(activeStep.id);
  const nextStepInfo = getNextStep(activeStep.id);

  // Local state for interactive tasks
  const [singleText, setSingleText] = useState('');
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  // Initialize field based on step
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFeedbackSaved(false);

    // Bind relevant data to local inputs cleanly (fallback to empty string so no state leaks)
    if (activeStep.id === '01-01') setSingleText(project.name || '');
    else if (activeStep.id === '01-02') setSingleText(project.segment || '');
    else if (activeStep.id === '01-03') setSingleText(project.city || '');
    else if (activeStep.id === '01-06') setSingleText(project.targetAudience || '');
    else if (activeStep.id === '01-08') setSingleText(project.siteGoal || '');
    else if (activeStep.id === '01-09') setSingleText(project.communicationTone || '');
    else if (activeStep.id === '02-04') setSingleText(project.ctaLabel || '');
    else if (activeStep.id === '04-01') setSingleText(project.heroHeadline || '');
    else if (activeStep.id === '04-02') setSingleText(project.heroSubheadline || '');
    else if (activeStep.id === '04-04') setSingleText(project.aboutText || '');
    else if (activeStep.id === '04-09') setSingleText(project.seoTitle || '');
    else if (activeStep.id === '08-03') setSingleText(project.publishedUrl || '');
    else if (activeStep.id === '09-01') setSingleText(project.customDomain || '');
    else setSingleText((project.stepOutputs && project.stepOutputs[activeStep.id]) || '');
  }, [activeStep.id]);

  const handleSaveAndComplete = () => {
    // Save relevant single fields if taskType is text_input
    if (activeStep.taskType === 'text_input') {
      if (activeStep.id === '01-01') updateProject({ name: singleText });
      else if (activeStep.id === '01-02') updateProject({ segment: singleText });
      else if (activeStep.id === '01-03') updateProject({ city: singleText });
      else if (activeStep.id === '01-06') updateProject({ targetAudience: singleText });
      else if (activeStep.id === '01-08') updateProject({ siteGoal: singleText });
      else if (activeStep.id === '01-09') updateProject({ communicationTone: singleText });
      else if (activeStep.id === '02-04') updateProject({ ctaLabel: singleText });
      else {
        updateProject({
          stepOutputs: {
            ...(project.stepOutputs || {}),
            [activeStep.id]: singleText
          }
        });
      }
    }

    completeStep(activeStep.id, true);

    if (activeStep.id === '10-02' || activeStep.id === '10-01') {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  // Domain calculator state
  const [domainExt, setDomainExt] = useState<'.com.br' | '.com' | '.online'>('.com.br');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => goToModule(activeModule.id)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#AAB6CC] hover:text-[#00D4E8] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Módulo {activeModule.number}: {activeModule.name}</span>
        </button>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <button
              onClick={() => uncompleteStep(activeStep.id)}
              className="text-xs text-[#71809B] hover:text-[#EF4444] transition-colors cursor-pointer"
            >
              Desmarcar conclusão
            </button>
          ) : (
            <span className="text-xs text-[#71809B]">Etapa em andamento</span>
          )}
        </div>
      </div>

      {/* 1. LESSON HEADER */}
      <LessonHeader
        moduleNumber={activeModule.number}
        moduleName={activeModule.name}
        stepNumber={activeStep.numberStr}
        stepTitle={activeStep.title}
        shortDesc={activeStep.shortDesc}
        isCompleted={isCompleted}
      />

      {activeStep.taskType === 'project_form' ? (
        <ProjectFormView isStepView={true} onComplete={handleSaveAndComplete} />
      ) : activeStep.taskType === 'content_studio' ? (
        <ContentPrepStep onComplete={handleSaveAndComplete} />
      ) : activeStep.taskType === 'master_prompt_step' ? (
        <MasterPromptStep onComplete={handleSaveAndComplete} />
      ) : activeStep.taskType === 'launch_pad' ? (
        <LaunchPadStep onComplete={handleSaveAndComplete} />
      ) : activeStep.taskType === 'image_guide' ? (
        <ImageGuideStep onComplete={handleSaveAndComplete} />
      ) : activeStep.taskType === 'art_direction_guide' ? (
        <ArtDirectionStep onComplete={handleSaveAndComplete} />
      ) : (
        <>
          {/* 2. BÚSSOLA DE ORIENTAÇÃO (As 5 perguntas obrigatórias) */}
      <OrientationBar
        whereAmI={`Módulo ${activeModule.number}: ${activeModule.name} • Etapa ${activeStep.numberStr}`}
        whatToDo={activeStep.shortDesc}
        howToDo={activeStep.whyImportant}
        whatIsProduced={activeStep.expectedOutcome}
        whatComesNext={activeStep.nextStepTeaser}
      />

      {/* 3. POR QUE É IMPORTANTE */}
      <InfoCard title="Por que esta etapa é fundamental">
        {activeStep.whyImportant}
      </InfoCard>

      {/* 4. DICAS E ALERTAS */}
      {activeStep.tip && <TipCard>{activeStep.tip}</TipCard>}
      {activeStep.warning && <WarningCard>{activeStep.warning}</WarningCard>}

      {/* 5. EXEMPLO REAL (BOM VS RUIM) */}
      {activeStep.exampleGood && (
        <ExampleCard
          good={activeStep.exampleGood}
          bad={activeStep.exampleBad}
        />
      )}

      {/* 6. SUA TAREFA INTERATIVA (Onde o usuário FAZ) */}
      <TaskCard key={activeStep.id} title={activeStep.taskTitle}>
        {/* Task Type: PROMPT TOOL */}
        {activeStep.taskType === 'prompt_tool' && activeStep.prompt && (
          <PromptBlock
            key={activeStep.id}
            title={activeStep.prompt.title}
            objective={activeStep.prompt.objective}
            whenToUse={activeStep.prompt.whenToUse}
            promptText={activeStep.prompt.generatePrompt(project)}
            instructions={activeStep.prompt.instructions}
            savedOutput={
              activeStep.prompt.outputField
                ? ((project[activeStep.prompt.outputField as keyof typeof project] as string) || '')
                : ((project.stepOutputs && project.stepOutputs[activeStep.id]) || '')
            }
            onSaveOutput={(text) => {
              const updates: Partial<BusinessProject> = {
                stepOutputs: {
                  ...(project.stepOutputs || {}),
                  [activeStep.id]: text
                }
              };
              if (activeStep.prompt?.outputField) {
                (updates as any)[activeStep.prompt.outputField] = text;
              }
              updateProject(updates);
            }}
          />
        )}

        {/* Task Type: SINGLE TEXT INPUT */}
        {activeStep.taskType === 'text_input' && (
          <div className="space-y-4">
            <label className="block text-xs font-semibold text-[#F5F7FF]">
              Digite aqui a informação para o seu projeto:
            </label>
            <textarea
              rows={3}
              value={singleText}
              onChange={(e) => setSingleText(e.target.value)}
              placeholder="Digite aqui as informações solicitadas nesta etapa..."
              className="w-full bg-[#080D20] border border-[#203252] rounded-xl p-3.5 text-xs text-[#F5F7FF] placeholder-[#71809B] focus:border-[#00D4E8] focus:outline-none transition-colors"
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#71809B]">
                Esta informação será guardada no painel "Meu Projeto" e reutilizada na IA.
              </span>
              <button
                type="button"
                onClick={() => {
                  handleSaveAndComplete();
                  setFeedbackSaved(true);
                }}
                className="btn-cta px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Informação</span>
              </button>
            </div>
          </div>
        )}

        {/* Task Type: MULTI FIELD (Contatos / Diferenciais) */}
        {activeStep.taskType === 'multi_field' && (
          <div className="space-y-4">
            {activeStep.id === '01-04' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#AAB6CC] mb-1">WhatsApp Comercial</label>
                  <input
                    type="text"
                    value={project.whatsapp}
                    onChange={(e) => updateProject({ whatsapp: e.target.value })}
                    placeholder="(83) 99876-5432"
                    className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#AAB6CC] mb-1">Instagram (@)</label>
                  <input
                    type="text"
                    value={project.instagram}
                    onChange={(e) => updateProject({ instagram: e.target.value })}
                    placeholder="@seunegocio"
                    className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#AAB6CC] mb-1">Endereço Completo ou "Atendimento 100% Online"</label>
                  <input
                    type="text"
                    value={project.address}
                    onChange={(e) => updateProject({ address: e.target.value })}
                    placeholder="Av. Exemplo, 1000 - Bairro, Cidade - UF"
                    className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#AAB6CC] mb-1">Seus Principais Diferenciais:</label>
                {project.differentials.map((diff, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#00D4E8] font-bold shrink-0">{idx + 1}.</span>
                    <input
                      type="text"
                      value={diff}
                      onChange={(e) => {
                        const updated = [...project.differentials];
                        updated[idx] = e.target.value;
                        updateProject({ differentials: updated });
                      }}
                      className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Task Type: SERVICES EDITOR */}
        {activeStep.taskType === 'services_editor' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#AAB6CC]">
                Cadastre seus serviços mais lucrativos e frequentes:
              </span>
              <button
                type="button"
                onClick={() => {
                  const newService: ServiceItem = {
                    id: `srv-${Date.now()}`,
                    title: 'Novo Atendimento',
                    description: 'Descreva o benefício prático que o cliente recebe com este atendimento.'
                  };
                  updateProject({ services: [...project.services, newService] });
                }}
                className="text-xs text-[#00D4E8] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Outro Serviço
              </button>
            </div>

            <div className="space-y-3">
              {project.services.map((srv, idx) => (
                <div key={srv.id} className="bg-[#080D20] border border-[#203252] rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-5 h-5 rounded bg-[#111B36] text-[#00D4E8] text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) => {
                          const updated = [...project.services];
                          updated[idx].title = e.target.value;
                          updateProject({ services: updated });
                        }}
                        className="w-full bg-[#111B36] border border-[#203252] rounded-lg p-1.5 text-xs font-bold text-[#F5F7FF]"
                        placeholder="Nome do Serviço"
                      />
                    </div>
                    {project.services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          updateProject({ services: project.services.filter(s => s.id !== srv.id) });
                        }}
                        className="p-1 text-[#71809B] hover:text-[#EF4444]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    value={srv.description}
                    onChange={(e) => {
                      const updated = [...project.services];
                      updated[idx].description = e.target.value;
                      updateProject({ services: updated });
                    }}
                    className="w-full bg-[#111B36] border border-[#203252] rounded-lg p-2 text-xs text-[#AAB6CC]"
                    placeholder="Descrição do serviço..."
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task Type: PAGES PICKER */}
        {activeStep.taskType === 'pages_picker' && (
          <div className="space-y-3">
            <span className="text-xs text-[#AAB6CC] block mb-2">
              Selecione as seções que comporão a estrutura do seu site:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Home (Apresentação Principal)', desc: 'Página inicial com frase de impacto e chamada de WhatsApp' },
                { name: 'Serviços & Especialidades', desc: 'Apresentação clara do que sua empresa resolve' },
                { name: 'Sobre Nós / O Profissional', desc: 'História, formação e autoridade de mercado' },
                { name: 'Diferenciais Competitivos', desc: 'Motivos concretos para contratar você' },
                { name: 'Dúvidas Frequentes (FAQ)', desc: 'Quebra de objeções antes do contato' },
                { name: 'Localização & Contato', desc: 'Endereço, mapa e links de WhatsApp e Instagram' }
              ].map((p, i) => {
                const isSelected = project.pages.includes(p.name);
                return (
                  <div
                    key={i}
                    onClick={() => {
                      const updated = isSelected
                        ? project.pages.filter(x => x !== p.name)
                        : [...project.pages, p.name];
                      updateProject({ pages: updated });
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#152342] border-[#00D4E8] text-[#F5F7FF]'
                        : 'bg-[#080D20] border-[#203252] text-[#71809B]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#F5F7FF]">{p.name}</span>
                      <div className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                        isSelected ? 'bg-[#00D4E8] text-black font-bold' : 'border border-[#203252]'
                      }`}>
                        {isSelected && '✓'}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#AAB6CC]">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Task Type: VISUAL IDENTITY */}
        {activeStep.taskType === 'visual_identity' && (
          <VisualIdentityBuilder />
        )}

        {/* Task Type: VISUAL PICKER */}
        {activeStep.taskType === 'visual_picker' && (
          <div className="space-y-4">
            <span className="text-xs text-[#AAB6CC] block">
              Escolha a direção de estilo visual que melhor reflete seu negócio:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'moderno', title: 'Moderno & Tecnológico', desc: 'Dark Navy (#080D20) com detalhes em Ciano e Azul. Passa inovação, IA e autoridade premium.', bg: '#080D20', accent: '#00D4E8' },
                { id: 'minimalista', title: 'Minimalista & Limpo', desc: 'Foco total no conteúdo, tipografia precisa e espaçamentos elegantes.', bg: '#0e1726', accent: '#38bdf8' },
                { id: 'elegante', title: 'Elegante & Sofisticado', desc: 'Tons sóbrios de azul escuro e grafite. Ideal para advocacia, consultoria e alto padrão.', bg: '#090f1d', accent: '#60a5fa' },
                { id: 'acolhedor', title: 'Acolhedor & Humano', desc: 'Clima convidativo para clínicas, studios de bem-estar, psicologia e estética.', bg: '#0b162c', accent: '#34d399' }
              ].map((style) => (
                <div
                  key={style.id}
                  onClick={() => updateProject({ visualStyle: style.id as any })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    project.visualStyle === style.id
                      ? 'bg-[#152342] border-[#00D4E8] shadow-md shadow-[#00D4E8]/10'
                      : 'bg-[#080D20] border-[#203252] hover:border-[#203252]/90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#F5F7FF]">{style.title}</span>
                    <div 
                      className="w-4 h-4 rounded-full border border-[#203252]"
                      style={{ backgroundColor: style.accent }}
                    />
                  </div>
                  <p className="text-[11px] text-[#AAB6CC] leading-relaxed">{style.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task Type: BRIEFING APPROVAL */}
        {activeStep.taskType === 'briefing_approval' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00D4E8]">BRIEFING MESTRE CONSOLIDADO</span>
                <span className="text-[10px] text-[#22C55E] font-semibold">Pronto para uso</span>
              </div>
              <p className="text-xs text-[#AAB6CC]">
                Empresa: <strong>{project.name}</strong> • Segmento: <strong>{project.segment}</strong> • Local: <strong>{project.city}</strong>
              </p>
              <p className="text-xs text-[#71809B]">
                {project.services.length} serviços cadastrados • {project.differentials.length} diferenciais estruturados
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#71809B]">
                Clique no botão abaixo para aprovar formalmente o Briefing Mestre.
              </span>
              <button
                type="button"
                onClick={() => {
                  updateProject({ briefingApproved: true });
                  handleSaveAndComplete();
                }}
                className="btn-cta px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>APROVAR BRIEFING MESTRE</span>
              </button>
            </div>
          </div>
        )}

        {/* Task Type: REVIEW CHECKLIST */}
        {activeStep.taskType === 'review_checklist' && (
          <div className="space-y-3">
            <span className="text-xs text-[#AAB6CC] block mb-2">
              Marque cada verificação realizada para garantir a qualidade do site:
            </span>
            <div className="space-y-2">
              {[
                { key: 'contentInfoCorrect', label: 'Informações do negócio e ortografia conferidas' },
                { key: 'contentPhonesCorrect', label: 'Número de WhatsApp testado e abrindo na conversa' },
                { key: 'contentLinksWorking', label: 'Todos os links e botões funcionam perfeitamente' },
                { key: 'mobileResponsive', label: 'Site testado na visualização mobile (celular)' }
              ].map((item) => {
                const isChecked = !!(project.reviewChecklist as any)[item.key];
                return (
                  <label
                    key={item.key}
                    className="flex items-center gap-3 p-3 bg-[#080D20] border border-[#203252] rounded-lg cursor-pointer hover:border-[#00D4E8]/40 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        updateProject({
                          reviewChecklist: {
                            ...project.reviewChecklist,
                            [item.key]: e.target.checked
                          }
                        });
                      }}
                      className="w-4 h-4 rounded text-[#00D4E8] bg-[#111B36] border-[#203252] focus:ring-0"
                    />
                    <span className={`text-xs ${isChecked ? 'text-[#F5F7FF] font-medium' : 'text-[#AAB6CC]'}`}>
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Task Type: DOMAIN CALCULATOR */}
        {activeStep.taskType === 'domain_calculator' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl space-y-4">
              <span className="text-xs font-bold text-[#F5F7FF] block">
                Comparativo de Custo Real: 1º Ano vs Renovação Anual
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { ext: '.com.br', firstYear: 'R$ 40,00', renewal: 'R$ 40,00', trusted: true, place: 'Registro.br' },
                  { ext: '.com', firstYear: 'R$ 55,00', renewal: 'R$ 95,00', trusted: true, place: 'Registradores' },
                  { ext: '.online / .site', firstYear: 'R$ 9,90 (Pegadinha)', renewal: 'R$ 189,00/ano!', trusted: false, place: 'Hospedagens' }
                ].map((d, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg border ${d.trusted ? 'bg-[#111B36] border-[#22C55E]/30' : 'bg-[#111B36] border-[#EF4444]/30'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-[#F5F7FF]">{d.ext}</span>
                      <span className={`text-[10px] font-bold ${d.trusted ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                        {d.trusted ? 'Seguro' : 'Atenção!'}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#AAB6CC] space-y-0.5">
                      <div>1º Ano: <strong>{d.firstYear}</strong></div>
                      <div>Renovação: <strong className={!d.trusted ? 'text-[#EF4444]' : ''}>{d.renewal}</strong></div>
                      <div className="text-[10px] text-[#71809B] pt-1">Onde: {d.place}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Task Type: FINAL CELEBRATION */}
        {activeStep.taskType === 'final_celebration' && (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00D4E8] to-[#1769FF] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#00D4E8]/20">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#F5F7FF]">
                Você concluiu o método!
              </h3>
              <p className="text-xs md:text-sm text-[#AAB6CC] leading-relaxed">
                Você percorreu todas as etapas: desde a definição da proposta única até a geração de conteúdo, identidade visual, estrutura de código e publicação externa na internet.
              </p>
            </div>

            {/* Verificação externa */}
            <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 max-w-lg mx-auto text-left space-y-3">
              <span className="text-xs font-bold text-[#00D4E8] uppercase tracking-wider block">
                Verificação Final do Site Publicado
              </span>
              <p className="text-xs text-[#AAB6CC] leading-relaxed">
                Abra o endereço publicado do seu site na ferramenta externa que você utilizou (Vercel, Netlify, Manus, Bolt etc.) e faça a verificação final no seu celular e no computador.
              </p>

              {project.publishedUrl ? (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs font-mono text-[#00E599] truncate max-w-full">
                    {project.publishedUrl}
                  </div>
                  <a
                    href={project.publishedUrl.startsWith('http') ? project.publishedUrl : `https://${project.publishedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0"
                  >
                    <span>Abrir Site Publicado</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={singleText}
                    onChange={e => setSingleText(e.target.value)}
                    placeholder="https://seu-site.vercel.app"
                    className="w-full sm:flex-1 bg-[#111B36] border border-[#203252] rounded-lg px-3 py-2 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (singleText.trim()) {
                        updateProject({ publishedUrl: singleText.trim() });
                        setFeedbackSaved(true);
                        setTimeout(() => setFeedbackSaved(false), 2000);
                      }
                    }}
                    className="btn-cta w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold cursor-pointer shrink-0"
                  >
                    {feedbackSaved ? 'Salvo!' : 'Registrar URL'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={goToDashboard}
                className="btn-cta px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <span>VOLTAR AO PAINEL GERAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  try {
                    confetti({ particleCount: 150, spread: 80 });
                  } catch (e) {}
                }}
                className="px-5 py-3 rounded-xl bg-[#152342] hover:bg-[#203252] border border-[#203252] text-xs font-bold text-[#00D4E8] cursor-pointer"
              >
                🎉 Comemorar Conclusão
              </button>
            </div>
          </div>
        )}

        {/* Generic Checklist Task */}
        {activeStep.taskType === 'checklist' && (
          <div className="space-y-4">
            {activeStep.id === '00-07' && (
              <div className="p-4 bg-[#0B1535] border border-[#203252] rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-[#00D4E8] font-bold text-xs">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Fluxo do Método a Partir de Agora:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 bg-[#111B36] border border-[#203252] rounded-lg space-y-1">
                    <span className="text-[#00D4E8] font-bold text-xs block">1. Cadastro Estruturado</span>
                    <p className="text-[11px] text-[#AAB6CC] leading-relaxed">
                      A partir do Módulo 01, você informará nome, segmento, WhatsApp, serviços e diferenciais em etapas guiadas.
                    </p>
                  </div>
                  <div className="p-3 bg-[#111B36] border border-[#203252] rounded-lg space-y-1">
                    <span className="text-[#00D4E8] font-bold text-xs block">2. Repositório Central</span>
                    <p className="text-[11px] text-[#AAB6CC] leading-relaxed">
                      Tudo fica salvo em "Meu Projeto" e no Briefing Mestre, permitindo edição a qualquer momento sem perder nada.
                    </p>
                  </div>
                  <div className="p-3 bg-[#111B36] border border-[#203252] rounded-lg space-y-1">
                    <span className="text-[#00D4E8] font-bold text-xs block">3. Injeção nos Prompts</span>
                    <p className="text-[11px] text-[#AAB6CC] leading-relaxed">
                      Os prompts de IA usarão esses dados automaticamente para gerar seu site completo sem digitação redundante.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <span className="text-xs text-[#AAB6CC] block">
              Confirme a leitura e aplicação do conceito para avançar:
            </span>
            <label className="flex items-center gap-3 p-3.5 bg-[#080D20] border border-[#203252] hover:border-[#00D4E8]/50 rounded-xl cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={handleSaveAndComplete}
                className="w-4 h-4 rounded text-[#00D4E8] bg-[#111B36] border-[#203252] focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-[#F5F7FF] font-medium leading-relaxed">
                {activeStep.id === '00-07'
                  ? 'Compreendi como o Meu Projeto funciona e estou pronto para avançar para o Módulo 01 para cadastrar os dados oficiais da minha empresa.'
                  : 'Entendi perfeitamente o passo e estou pronto para avançar para a próxima etapa.'}
              </span>
            </label>
          </div>
        )}
      </TaskCard>
        </>
      )}

      {/* 7. BOTÃO DE AÇÃO PRINCIPAL E PRÓXIMO PASSO */}
      <div className="pt-4">
        {nextStepInfo ? (
          <NextStepCard
            title={`${nextStepInfo.module.number} — ${nextStepInfo.step.title}`}
            desc={nextStepInfo.step.shortDesc}
            onAdvance={handleSaveAndComplete}
            isCompleted={isCompleted}
          />
        ) : (
          <div className="bg-[#111B36] border border-[#203252] rounded-xl p-6 text-center space-y-3">
            <h3 className="text-lg font-bold text-[#22C55E]">✓ Todas as etapas foram concluídas!</h3>
            <p className="text-xs text-[#AAB6CC]">Seu projeto atingiu 100% de conclusão.</p>
            <button
              onClick={goToDashboard}
              className="btn-cta px-6 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Voltar para o Painel Geral</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
