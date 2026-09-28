import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Briefcase, 
  ExternalLink, 
  Layers, 
  TrendingUp,
  Compass,
  Building2,
  LayoutGrid,
  FileSpreadsheet,
  Palette,
  Code2,
  CheckSquare,
  UploadCloud,
  Globe,
  Award,
  RotateCcw,
  Search
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { MODULES } from '../data/curriculum';

export const Dashboard: React.FC = () => {
  const { 
    project, 
    activeModule, 
    activeStep, 
    goToStep, 
    goToModule, 
    calculateProgress, 
    getModuleProgress, 
    setShowProjectDrawer,
    setActiveView,
    setIsResetModalOpen
  } = useProject();

  const { percentage, completedCount, totalCount } = calculateProgress();

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5 text-[#00D4E8]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#00D4E8]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-[#00D4E8]" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-[#00D4E8]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#00D4E8]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#00D4E8]" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-[#00D4E8]" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5 text-[#22C55E]" />;
      case 'UploadCloud': return <UploadCloud className="w-5 h-5 text-[#00D4E8]" />;
      case 'Globe': return <Globe className="w-5 h-5 text-[#00D4E8]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#22C55E]" />;
      default: return <Sparkles className="w-5 h-5 text-[#00D4E8]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* 1. Saudação Header Hero */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-6 md:p-8 relative overflow-hidden glow-cyan-subtle">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#152342] text-[#00D4E8] border border-[#203252]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MANUAL INTERATIVO & GUIADO</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-[#F5F7FF] tracking-tight">
            Vamos colocar seu negócio na internet.
          </h1>

          <p className="text-sm md:text-base text-[#AAB6CC] max-w-2xl leading-relaxed">
            Seu site será construído em poucos passos com ferramentas de IA. Você não precisa saber programar. Siga o fluxo: <strong className="text-[#F5F7FF]">INFORMAR → PREPARAR → GERAR → REVISAR → PUBLICAR</strong>.
          </p>
        </div>
      </div>

      {/* 2. PROGRESSO GERAL BAR */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-2xl p-6 md:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
              PROGRESSO GERAL
            </span>
            <div className="text-2xl md:text-3xl font-extrabold text-[#F5F7FF] tracking-tight mt-0.5">
              {percentage}% concluído
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="text-xs text-[#AAB6CC] font-medium bg-[#111B36] px-3.5 py-1.5 rounded-lg border border-[#203252]">
              {completedCount} de {totalCount} etapas concluídas
            </div>
            {completedCount > 0 && (
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                title="Reiniciar etapas da jornada"
                className="text-xs text-[#71809B] hover:text-[#00D4E8] bg-[#111B36] hover:bg-[#152342] px-2.5 py-1.5 rounded-lg border border-[#203252] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Recomeçar Etapas</span>
              </button>
            )}
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="w-full h-3.5 rounded-full bg-[#111B36] border border-[#203252] overflow-hidden p-0.5">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-[#00D4E8] to-[#1769FF] transition-all duration-700 shadow-md shadow-[#00D4E8]/20"
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[#71809B] mt-3">
          <span>Início do Projeto</span>
          <span>Site Publicado & Indexado no Google (100%)</span>
        </div>
      </div>

      {/* 2.1 ATALHOS RÁPIDOS & CENTRAIS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveView('prompts_hub')}
          className="p-4 rounded-xl bg-[#0B1535] border border-[#203252] hover:border-[#00D4E8]/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-[#111B36] text-[#00D4E8] group-hover:bg-[#00D4E8] group-hover:text-black transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-[#00D4E8] font-bold">13 Prompts</span>
          </div>
          <h4 className="text-xs font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors">
            Central de Prompts
          </h4>
          <p className="text-[11px] text-[#71809B] mt-0.5">Comandos calibrados com seus dados para colar na IA externa</p>
        </div>

        <div
          onClick={() => setShowProjectDrawer(true)}
          className="p-4 rounded-xl bg-[#0B1535] border border-[#203252] hover:border-[#00D4E8]/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-[#111B36] text-[#1769FF] group-hover:bg-[#1769FF] group-hover:text-white transition-colors">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-[#AAB6CC] font-mono">Briefing</span>
          </div>
          <h4 className="text-xs font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors">
            Meu Projeto
          </h4>
          <p className="text-[11px] text-[#71809B] mt-0.5">Informações do seu negócio que alimentam os prompts</p>
        </div>

        <div
          onClick={() => setActiveView('briefing')}
          className="p-4 rounded-xl bg-[#0B1535] border border-[#203252] hover:border-[#00D4E8]/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-[#111B36] text-[#F59E0B] group-hover:bg-[#F59E0B] group-hover:text-black transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-[#22C55E] font-bold">
              {project.briefingApproved ? 'Aprovado' : 'Consolidado'}
            </span>
          </div>
          <h4 className="text-xs font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors">
            Briefing Mestre
          </h4>
          <p className="text-[11px] text-[#71809B] mt-0.5">Visão unificada de todos os dados e textos estruturados</p>
        </div>

        <div
          onClick={() => setActiveView('registro_hospedagem')}
          className="p-4 rounded-xl bg-[#0B1535] border border-[#00E599]/40 hover:border-[#00E599] cursor-pointer transition-all group shadow-sm shadow-[#00E599]/10"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-[#111B36] text-[#00E599] group-hover:bg-[#00E599] group-hover:text-black transition-colors">
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-[#00E599] font-bold bg-[#00E599]/10 px-1.5 py-0.5 rounded">
              Novo Módulo
            </span>
          </div>
          <h4 className="text-xs font-bold text-[#F5F7FF] group-hover:text-[#00E599] transition-colors">
            Registro & Hospedagem
          </h4>
          <p className="text-[11px] text-[#71809B] mt-0.5">Guia para colocar o site no ar (Vercel, Netlify e Hostinger)</p>
        </div>
      </div>

      {/* 3. Próximo Passo Prioritário */}
      <div className="bg-gradient-to-r from-[#0B1535] to-[#152342] border border-[#00D4E8]/40 rounded-2xl p-6 md:p-7 shadow-lg shadow-[#00D4E8]/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D4E8] bg-[#00D4E8]/10 px-2.5 py-0.5 rounded-full border border-[#00D4E8]/20">
                Ação Recomendada Agora
              </span>
              <span className="text-xs text-[#71809B]">
                Módulo {activeModule.number} • Etapa {activeStep.numberStr}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-[#F5F7FF]">
              {activeStep.title}
            </h2>

            <p className="text-xs md:text-sm text-[#AAB6CC] leading-relaxed">
              {activeStep.shortDesc}
            </p>
          </div>

          <button
            onClick={() => goToStep(activeStep.id)}
            className="btn-cta px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[#00D4E8]/20 hover:scale-[1.02] transition-transform"
          >
            <span>Executar Esta Etapa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Grade de Módulos da Jornada */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#F5F7FF] tracking-tight">
              A Jornada Simplificada ({MODULES.length} Grandes Etapas)
            </h3>
            <p className="text-xs text-[#71809B]">
              Do cadastro inicial ao site profissional no ar sem complicações.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {MODULES.map((mod) => {
            const prog = getModuleProgress(mod.id);
            const isCompleted = prog.percentage === 100;
            const isCurrent = activeModule.id === mod.id;

            return (
              <div
                key={mod.id}
                onClick={() => goToModule(mod.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isCurrent
                    ? 'bg-[#111B36] border-[#00D4E8] shadow-md shadow-[#00D4E8]/10'
                    : isCompleted
                      ? 'bg-[#0B1535] border-[#203252] hover:border-[#22C55E]/60'
                      : 'bg-[#0B1535] border-[#203252] hover:border-[#00D4E8]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isCompleted ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-[#111B36] text-[#00D4E8]'
                      }`}>
                        {getModuleIcon(mod.iconName)}
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-[#00D4E8]">
                          MÓDULO {mod.number}
                        </span>
                        <h4 className="text-sm font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors leading-snug">
                          {mod.name}
                        </h4>
                      </div>
                    </div>

                    {isCompleted ? (
                      <span className="text-xs font-bold text-[#22C55E] flex items-center gap-1 bg-[#22C55E]/10 px-2.5 py-1 rounded-full border border-[#22C55E]/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Concluído</span>
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-[#71809B] bg-[#111B36] px-2 py-0.5 rounded border border-[#203252]">
                        {prog.completed}/{prog.total}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#AAB6CC] leading-relaxed mb-4">
                    {mod.shortDesc}
                  </p>
                </div>

                {/* Progress bar per module */}
                <div className="pt-3 border-t border-[#203252]/60 flex items-center justify-between text-xs">
                  <div className="w-32 sm:w-44 h-2 rounded-full bg-[#111B36] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCompleted ? 'bg-[#22C55E]' : 'bg-gradient-to-r from-[#00D4E8] to-[#1769FF]'
                      }`}
                      style={{ width: `${prog.percentage}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-[#71809B] font-semibold">
                    {prog.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Painel Resumo do Negócio & Próximas Metas */}
      <div className="grid md:grid-cols-3 gap-5">
        {/* Card Meu Projeto Resumo */}
        <div className="md:col-span-2 bg-[#0B1535] border border-[#203252] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#00D4E8]" />
              <h3 className="font-bold text-sm text-[#F5F7FF]">Dados do Seu Negócio</h3>
            </div>
            <button
              onClick={() => setShowProjectDrawer(true)}
              className="text-xs font-semibold text-[#00D4E8] hover:underline cursor-pointer"
            >
              Editar no Meu Projeto →
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#111B36] border border-[#203252]">
              <span className="text-[#71809B] block mb-0.5">Empresa / Profissional</span>
              <span className="font-semibold text-[#F5F7FF] truncate block">
                {project.name || <em className="text-[#71809B]">Não preenchido</em>}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#111B36] border border-[#203252]">
              <span className="text-[#71809B] block mb-0.5">Segmento de Atuação</span>
              <span className="font-semibold text-[#F5F7FF] truncate block">
                {project.segment || <em className="text-[#71809B]">Não preenchido</em>}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#111B36] border border-[#203252]">
              <span className="text-[#71809B] block mb-0.5">Cidade & Região</span>
              <span className="font-semibold text-[#F5F7FF] truncate block">
                {project.city ? `${project.city} ${project.region ? `(${project.region})` : ''}` : <em className="text-[#71809B]">Não preenchido</em>}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#111B36] border border-[#203252]">
              <span className="text-[#71809B] block mb-0.5">WhatsApp de Atendimento</span>
              <span className="font-semibold text-[#F5F7FF] truncate block">
                {project.whatsapp || <em className="text-[#71809B]">Não preenchido</em>}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111B36]/60 border border-[#203252] flex items-center justify-between text-xs">
            <span className="text-[#AAB6CC]">
              {project.services.length > 0 ? (
                <span><strong>{project.services.length}</strong> serviços cadastrados para o site</span>
              ) : (
                <span className="text-[#71809B]">Nenhum serviço cadastrado ainda</span>
              )}
            </span>
            <button
              onClick={() => goToStep('01-03')}
              className="text-[#00D4E8] font-semibold hover:underline"
            >
              Definir no Módulo 01 →
            </button>
          </div>
        </div>

        {/* Card Status dos Fundamentos */}
        <div className="space-y-4">
          <div className="bg-[#0B1535] border border-[#203252] rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#AAB6CC]">
              Checklist dos Fundamentos
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#111B36]">
                <span className="flex items-center gap-2 text-[#AAB6CC]">
                  {project.name && project.city ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-[#71809B]" />
                  )}
                  <span>Identidade do Negócio</span>
                </span>
                <span className={project.name ? 'text-[#22C55E] font-medium' : 'text-[#71809B]'}>
                  {project.name ? 'Pronto' : 'Pendente'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#111B36]">
                <span className="flex items-center gap-2 text-[#AAB6CC]">
                  {project.services.length > 0 ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-[#71809B]" />
                  )}
                  <span>Serviços & Oferta</span>
                </span>
                <span className={project.services.length > 0 ? 'text-[#22C55E] font-medium' : 'text-[#71809B]'}>
                  {project.services.length > 0 ? 'Pronto' : 'Pendente'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#111B36]">
                <span className="flex items-center gap-2 text-[#AAB6CC]">
                  {project.briefingApproved ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-[#71809B]" />
                  )}
                  <span>Briefing Consolidado</span>
                </span>
                <span className={project.briefingApproved ? 'text-[#22C55E] font-medium' : 'text-[#71809B]'}>
                  {project.briefingApproved ? 'Aprovado' : 'Em revisão'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#111B36]">
                <span className="flex items-center gap-2 text-[#AAB6CC]">
                  {project.publishedUrl ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-[#71809B]" />
                  )}
                  <span>Publicação Externa</span>
                </span>
                <span className={project.publishedUrl ? 'text-[#22C55E] font-medium' : 'text-[#71809B]'}>
                  {project.publishedUrl ? 'Registrada' : 'Pendente'}
                </span>
              </div>
            </div>
          </div>

          {/* Fase 3 Teaser Card */}
          <div 
            onClick={() => setActiveView('fase3_seo')}
            className="bg-gradient-to-br from-[#0B1535] to-[#111B36] border border-[#00D4E8]/40 hover:border-[#00D4E8] rounded-2xl p-5 space-y-3 cursor-pointer transition-all group shadow-sm shadow-[#00D4E8]/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#00E599] flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                <span>FASE 3: SER ENCONTRADO</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00E599]/15 text-[#00E599] font-bold">
                SEO & Maps
              </span>
            </div>

            <h4 className="text-sm font-bold text-[#F5F7FF] group-hover:text-[#00E599] transition-colors">
              Coloque seu site no Google Maps e no Buscador
            </h4>

            <p className="text-xs text-[#AAB6CC] leading-relaxed">
              Google Meu Negócio para receber clientes na sua cidade, Google Search Console para indexar suas páginas e LGPD.
            </p>

            <span className="text-xs font-bold text-[#00E599] flex items-center gap-1">
              Acessar Guia de SEO & LGPD →
            </span>
          </div>

          {/* Plano Completo Teaser Card */}
          <div 
            onClick={() => setActiveView('plano_completo')}
            className="bg-gradient-to-br from-[#0B1535] to-[#111B36] border border-[#203252] hover:border-[#00D4E8]/50 rounded-2xl p-5 space-y-3 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#00D4E8] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>PLANO COMPLETO</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#152342] text-[#AAB6CC]">
                Expansão
              </span>
            </div>

            <h4 className="text-sm font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors">
              Quer transformar essa habilidade em serviço?
            </h4>

            <p className="text-xs text-[#AAB6CC] leading-relaxed">
              Aprenda como oferecer sites institucionais para outros profissionais e negócios da sua cidade.
            </p>

            <span className="text-xs font-bold text-[#00D4E8] flex items-center gap-1">
              Conhecer o Plano Completo →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
