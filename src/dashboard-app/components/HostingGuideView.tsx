import React, { useState } from 'react';
import { 
  Globe, 
  Server, 
  ShieldCheck, 
  GitBranch, 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Upload, 
  FolderArchive,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';
import { 
  HOSTING_CONCEPTS, 
  JARGON_BUSTER, 
  HOSTING_OPTIONS, 
  HostingPathOption, 
  HostingSubMethod 
} from '../data/hostingGuide';
import { useProject } from '../context/ProjectContext';

export const HostingGuideView: React.FC = () => {
  const { project, updateProject, goToDashboard } = useProject();

  // Selected Option (A: Netlify, B: Hostinger, C: Vercel GitHub, D: Domínio Existente)
  const [selectedOptionId, setSelectedOptionId] = useState<'netlify_gratis' | 'hostinger_tudo' | 'vercel_github' | 'dominio_existente' | null>(null);
  
  // Selected Sub-method inside the option
  const [activeMethodId, setActiveMethodId] = useState<string>('');

  // Jargon accordion open/close
  const [showJargonBuster, setShowJargonBuster] = useState(false);

  // Copy state for DNS snippets
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Saved domain/URL inside this view
  const [siteUrlInput, setSiteUrlInput] = useState(project.publishedUrl || '');
  const [urlSavedFeedback, setUrlSavedFeedback] = useState(false);

  const selectedOption = HOSTING_OPTIONS.find(opt => opt.id === selectedOptionId);
  const activeMethod = selectedOption?.methods.find(m => m.id === activeMethodId) || selectedOption?.methods[0];

  const handleSelectOption = (optionId: 'netlify_gratis' | 'hostinger_tudo' | 'vercel_github' | 'dominio_existente') => {
    setSelectedOptionId(optionId);
    const opt = HOSTING_OPTIONS.find(o => o.id === optionId);
    if (opt && opt.methods.length > 0) {
      setActiveMethodId(opt.methods[0].id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOptions = () => {
    setSelectedOptionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSavePublishedUrl = () => {
    if (!siteUrlInput.trim()) return;
    updateProject({
      publishedUrl: siteUrlInput.trim(),
      customDomain: siteUrlInput.includes('.com') ? siteUrlInput.trim() : project.customDomain
    });
    setUrlSavedFeedback(true);
    setTimeout(() => setUrlSavedFeedback(false), 2500);
  };

  const getBadgeClasses = (type: string) => {
    switch (type) {
      case 'green':
        return 'bg-[#00E599]/15 text-[#00E599] border-[#00E599]/30';
      case 'cyan':
        return 'bg-[#00D4E8]/15 text-[#00D4E8] border-[#00D4E8]/30';
      case 'blue':
        return 'bg-[#1769FF]/15 text-[#60A5FA] border-[#1769FF]/30';
      case 'purple':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-[#152342] text-[#AAB6CC] border-[#203252]';
    }
  };

  const getOptionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Upload':
        return <Upload className="w-6 h-6 text-[#00E599]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#00D4E8]" />;
      case 'GitBranch':
        return <GitBranch className="w-6 h-6 text-[#60A5FA]" />;
      case 'Server':
        return <Server className="w-6 h-6 text-purple-400" />;
      default:
        return <Globe className="w-6 h-6 text-[#00D4E8]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fadeIn">
      {/* HEADER HERO */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-6 md:p-8 relative overflow-hidden glow-cyan-subtle">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#152342] text-[#00D4E8] border border-[#203252]">
              <Globe className="w-3.5 h-3.5" />
              <span>MÓDULO DE EXPANSÃO — REGISTRO & HOSPEDAGEM</span>
            </div>

            <button
              onClick={goToDashboard}
              className="text-xs text-[#71809B] hover:text-[#00D4E8] transition-colors flex items-center gap-1.5 cursor-pointer bg-[#080D20] px-3 py-1.5 rounded-lg border border-[#203252]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Voltar ao Painel Geral</span>
            </button>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-[#F5F7FF] tracking-tight">
            Como Colocar Seu Site na Internet
          </h1>

          <p className="text-sm md:text-base text-[#AAB6CC] max-w-2xl leading-relaxed">
            Guia 100% descomplicado para leigos. Escolha o melhor caminho para o seu momento: arrastar a pasta na Netlify sem código, contratar domínio e e-mail na Hostinger ou conectar via GitHub na Vercel.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ETAPA 1: VISÃO GERAL DOS CONCEITOS (DIDÁTICA PARA LEIGOS) */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#00D4E8]/10 text-[#00D4E8] font-bold text-xs flex items-center justify-center border border-[#00D4E8]/20">
            1
          </span>
          <h2 className="text-sm md:text-base font-bold text-[#F5F7FF] uppercase tracking-wide">
            Entenda os Conceitos Básicos (A Metáfora da Casa)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Domínio */}
          <div className="p-5 md:p-6 rounded-2xl bg-[#080D20] border border-[#203252] hover:border-[#00D4E8]/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#00D4E8]/10 text-[#00D4E8] flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#111B36] text-[#00D4E8] border border-[#203252]">
                {HOSTING_CONCEPTS.domain.example}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#F5F7FF]">
                {HOSTING_CONCEPTS.domain.title}
              </h3>
              <p className="text-xs font-semibold text-[#00D4E8] mt-0.5">
                "{HOSTING_CONCEPTS.domain.metaphor}"
              </p>
            </div>

            <p className="text-xs text-[#AAB6CC] leading-relaxed">
              {HOSTING_CONCEPTS.domain.explanation}
            </p>
          </div>

          {/* Card Hospedagem */}
          <div className="p-5 md:p-6 rounded-2xl bg-[#080D20] border border-[#203252] hover:border-[#00E599]/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 text-[#00E599] flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#111B36] text-[#00E599] border border-[#203252]">
                {HOSTING_CONCEPTS.hosting.example}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#F5F7FF]">
                {HOSTING_CONCEPTS.hosting.title}
              </h3>
              <p className="text-xs font-semibold text-[#00E599] mt-0.5">
                "{HOSTING_CONCEPTS.hosting.metaphor}"
              </p>
            </div>

            <p className="text-xs text-[#AAB6CC] leading-relaxed">
              {HOSTING_CONCEPTS.hosting.explanation}
            </p>
          </div>
        </div>

        {/* Aviso Amigável */}
        <div className="p-4 bg-[#111B36]/80 border border-[#203252] rounded-xl flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#00D4E8]/20 text-[#00D4E8] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
            💡
          </div>
          <p className="text-xs text-[#AAB6CC] leading-relaxed">
            <strong className="text-[#F5F7FF]">Regra simples: </strong>
            {HOSTING_CONCEPTS.analogyNotice}
          </p>
        </div>

        {/* Dicionário sem Jargões (Accordion) */}
        <div className="bg-[#0B1535] border border-[#203252] rounded-xl overflow-hidden">
          <button
            onClick={() => setShowJargonBuster(!showJargonBuster)}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-[#AAB6CC] hover:text-[#F5F7FF] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#00D4E8]" />
              <span>Dicionário Sem Complicação: O que significam DNS, Propagação, SSL e Nameservers?</span>
            </span>
            {showJargonBuster ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showJargonBuster && (
            <div className="p-4 pt-0 border-t border-[#203252]/60 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {JARGON_BUSTER.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#080D20] rounded-lg border border-[#203252]/80 space-y-1">
                  <div className="font-bold text-[#00D4E8]">{item.term}</div>
                  <div className="text-[11px] font-semibold text-[#00E599]">"{item.simple}"</div>
                  <p className="text-[11px] text-[#AAB6CC] leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* ETAPA 2: DIAGNÓSTICO SIMPLES (ESCOLHA O SEU CAMINHO)     */}
      {/* ========================================================= */}
      {!selectedOptionId ? (
        <div className="space-y-4 pt-4 border-t border-[#203252]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#00E599]/10 text-[#00E599] font-bold text-xs flex items-center justify-center border border-[#00E599]/20">
                2
              </span>
              <h2 className="text-sm md:text-base font-bold text-[#F5F7FF] uppercase tracking-wide">
                Diagnóstico Rápido: Qual é o Seu Momento?
              </h2>
            </div>
            <span className="text-[11px] text-[#AAB6CC]">
              Clique no caminho desejado para ver o tutorial com passos e links
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOSTING_OPTIONS.map((opt) => {
              const isRecommended = opt.id === 'hostinger_tudo';
              const isEasyNoCode = opt.id === 'netlify_gratis';

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`relative p-5 md:p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    isRecommended
                      ? 'bg-gradient-to-b from-[#111B36] to-[#0B1535] border-[#00D4E8]/60 shadow-lg shadow-[#00D4E8]/10 hover:border-[#00D4E8]'
                      : isEasyNoCode
                      ? 'bg-gradient-to-b from-[#111B36] to-[#080D20] border-[#00E599]/50 shadow-md shadow-[#00E599]/5 hover:border-[#00E599]'
                      : 'bg-[#080D20] border-[#203252] hover:border-[#00D4E8]/50 hover:bg-[#111B36]/60'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Letter + Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-[#111B36] text-[#00D4E8] font-mono font-extrabold text-sm flex items-center justify-center border border-[#203252]">
                          {opt.letter}
                        </span>
                        <div className="p-2 rounded-lg bg-[#111B36] border border-[#203252]">
                          {getOptionIcon(opt.icon)}
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${getBadgeClasses(opt.badgeType)}`}>
                        {opt.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-base font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors leading-snug">
                        {opt.title}
                      </h3>
                      <p className="text-xs text-[#AAB6CC] mt-1.5 leading-relaxed">
                        {opt.subtitle}
                      </p>
                    </div>

                    {/* Details: Cost & Time */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#203252]/60 text-[11px]">
                      <div>
                        <span className="text-[#71809B] block">Investimento:</span>
                        <span className="font-semibold text-[#F5F7FF]">{opt.cost}</span>
                      </div>
                      <div>
                        <span className="text-[#71809B] block">Tempo para colocar no ar:</span>
                        <span className="font-semibold text-[#00E599]">{opt.timeToLaunch}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-5 mt-4 border-t border-[#203252]/40 flex items-center justify-between text-xs font-bold text-[#00D4E8]">
                    <span>Ver Tutorial Passo a Passo</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* ETAPA 3: TELAS DE DETALHAMENTO E TUTORIAIS APÓS SELEÇÃO  */
        /* ========================================================= */
        <div className="space-y-6 pt-4 border-t border-[#203252] animate-fadeIn">
          {/* Subheader com Botão Voltar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#203252] gap-3">
            <button
              onClick={handleBackToOptions}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111B36] hover:bg-[#152342] text-xs font-bold text-[#00D4E8] border border-[#203252] transition-colors cursor-pointer w-fit shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar às opções</span>
            </button>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-md border ${getBadgeClasses(selectedOption?.badgeType || '')}`}>
                Opção {selectedOption?.letter}: {selectedOption?.badge}
              </span>
            </div>
          </div>

          {/* Option Summary Card */}
          <div className="p-5 md:p-6 rounded-2xl bg-[#080D20] border border-[#203252] space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#111B36] border border-[#203252] shrink-0 mt-0.5">
                {getOptionIcon(selectedOption?.icon || '')}
              </div>
              <div className="space-y-1">
                <h2 className="text-lg md:text-xl font-bold text-[#F5F7FF]">
                  {selectedOption?.title}
                </h2>
                <p className="text-xs text-[#AAB6CC] leading-relaxed">
                  {selectedOption?.overview}
                </p>
              </div>
            </div>

            {/* Methods Tabs (if option has multiple methods) */}
            {selectedOption && selectedOption.methods.length > 1 && (
              <div className="pt-3 border-t border-[#203252]/60 flex flex-wrap gap-2">
                {selectedOption.methods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setActiveMethodId(method.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeMethod?.id === method.id
                        ? 'bg-[#00D4E8] text-[#080D20] shadow-md shadow-[#00D4E8]/20 font-extrabold'
                        : 'bg-[#111B36] text-[#AAB6CC] hover:text-[#F5F7FF] border border-[#203252]'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Method Section */}
          {activeMethod && (
            <div className="space-y-6">
              {/* VIDEO EMBED AREA (IF AVAILABLE) */}
              {activeMethod.youtubeVideoId ? (
                <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
                      <Play className="w-4 h-4 text-[#00E599]" />
                      <span>Vídeo Tutorial: Demonstração Passo a Passo</span>
                    </div>
                    {activeMethod.youtubeUrl && (
                      <a
                        href={activeMethod.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#AAB6CC] hover:text-[#00D4E8] flex items-center gap-1 transition-colors"
                      >
                        <span>Abrir no YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-[#AAB6CC]">
                    Assista à demonstração em vídeo para acompanhar exatamente onde clicar e como publicar:
                  </p>

                  {/* YouTube Embed Container */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#203252] bg-black shadow-2xl">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeMethod.youtubeVideoId}?rel=0`}
                      title="Tutorial de Publicação e Hospedagem"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              ) : null}

              {/* EXCLUSIVE DRAG & DROP VISUAL SIMULATOR FOR NETLIFY */}
              {activeMethod.id === 'netlify-drop' && (
                <div className="bg-gradient-to-br from-[#0B1535] to-[#080D20] border-2 border-[#00E599]/40 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00E599]">
                      <Upload className="w-4 h-4 text-[#00E599]" />
                      <span>Área de Drag & Drop da Netlify (Arrastar e Soltar)</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#00E599] bg-[#00E599]/10 px-2 py-0.5 rounded border border-[#00E599]/30">
                      100% Visual & Sem Código
                    </span>
                  </div>

                  <p className="text-xs text-[#AAB6CC] leading-relaxed">
                    A Netlify mantém um recurso nativo em que você não precisa instalar nada nem saber programação. Basta acessar <strong className="text-[#F5F7FF]">app.netlify.com/drop</strong> e arrastar a pasta descompactada do seu site diretamente para a tela do navegador.
                  </p>

                  {/* Visual Drop Simulator */}
                  <div className="border-2 border-dashed border-[#00E599]/40 rounded-xl p-6 bg-[#111B36]/50 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#00E599]/10 text-[#00E599] flex items-center justify-center shadow-lg shadow-[#00E599]/10">
                      <FolderArchive className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#F5F7FF]">
                        Pasta do Seu Site: meu-site-completo/
                      </div>
                      <div className="text-[11px] text-[#AAB6CC] mt-0.5">
                        Contendo: <span className="text-[#00E599] font-mono">index.html</span>, imagens e arquivos de estilo
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080D20] border border-[#203252] text-xs font-bold text-[#00E599]">
                      <span>↓ Solte no círculo de upload da Netlify</span>
                    </div>
                  </div>
                </div>
              )}

              {/* VERCEL GITHUB INTEGRATION OVERVIEW & VISUAL FLOW */}
              {activeMethod.id === 'vercel-git-deploy' && (
                <div className="bg-gradient-to-br from-[#0B1535] to-[#111B36] border-2 border-[#1769FF]/40 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#203252] gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
                      <GitBranch className="w-4 h-4 text-[#60A5FA]" />
                      <span>Fluxo Completo: Do Zero ao Site no Ar com GitHub + Vercel</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#60A5FA] bg-[#1769FF]/15 px-2.5 py-0.5 rounded border border-[#1769FF]/30 w-fit">
                      Deploy Contínuo Automático
                    </span>
                  </div>

                  <p className="text-xs text-[#AAB6CC] leading-relaxed">
                    A combinação de <strong>GitHub + Vercel</strong> é o padrão profissional da internet moderna. O GitHub guarda seus arquivos com segurança e a Vercel publica e atualiza o site automaticamente em servidores globais ultrarrápidos.
                  </p>

                  {/* 4-Step Visual Flow Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#60A5FA] bg-[#1769FF]/20 px-2 py-0.5 rounded">
                          Passo 1
                        </span>
                        <Globe className="w-3.5 h-3.5 text-[#71809B]" />
                      </div>
                      <div className="text-xs font-bold text-[#F5F7FF]">Criar Conta GitHub</div>
                      <p className="text-[11px] text-[#AAB6CC] leading-snug">
                        Cadastre-se grátis em github.com com seu e-mail e senha.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#00E599] bg-[#00E599]/20 px-2 py-0.5 rounded">
                          Passo 2
                        </span>
                        <Upload className="w-3.5 h-3.5 text-[#00E599]" />
                      </div>
                      <div className="text-xs font-bold text-[#F5F7FF]">Subir pela IA ou Web</div>
                      <p className="text-[11px] text-[#AAB6CC] leading-snug">
                        Use o botão "Push to GitHub" da IA ou crie o repositório e arraste os arquivos.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#00D4E8] bg-[#00D4E8]/20 px-2 py-0.5 rounded">
                          Passo 3
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-[#00D4E8]" />
                      </div>
                      <div className="text-xs font-bold text-[#F5F7FF]">Login c/ GitHub</div>
                      <p className="text-[11px] text-[#AAB6CC] leading-snug">
                        Na Vercel, clique em "Continue with GitHub" para vincular em 1 clique.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#22C55E] bg-[#22C55E]/20 px-2 py-0.5 rounded">
                          Passo 4
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                      </div>
                      <div className="text-xs font-bold text-[#F5F7FF]">Importar & Deploy</div>
                      <p className="text-[11px] text-[#AAB6CC] leading-snug">
                        Selecione seu repositório, clique em "Deploy" e receba seu link seguro (.vercel.app).
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TUTORIAL ESCRITO PASSO A PASSO */}
              <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#203252]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
                    <span>Tutorial Escrito Passo a Passo</span>
                  </h3>
                  <span className="text-[11px] text-[#71809B]">
                    {activeMethod.steps.length} passos simples
                  </span>
                </div>

                <div className="space-y-4">
                  {activeMethod.steps.map((step) => (
                    <div
                      key={step.number}
                      className="p-4 md:p-5 rounded-xl bg-[#111B36] border border-[#203252] space-y-2.5 transition-colors hover:border-[#00D4E8]/30"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#00D4E8]/15 text-[#00D4E8] text-xs font-bold flex items-center justify-center shrink-0">
                          {step.number}
                        </span>
                        <h4 className="text-xs md:text-sm font-bold text-[#F5F7FF]">
                          {step.title}
                        </h4>
                      </div>

                      <p className="text-xs text-[#AAB6CC] leading-relaxed pl-8">
                        {step.description}
                      </p>

                      {/* Code Snippet to Copy */}
                      {step.codeSnippet && (
                        <div className="ml-8 mt-2 p-3 rounded-lg bg-[#080D20] border border-[#203252] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <code className="text-xs font-mono text-[#00E599] whitespace-pre-wrap break-all">
                            {step.codeSnippet}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopyText(step.codeSnippet || '', `step-${step.number}`)}
                            className="px-3 py-1.5 rounded bg-[#111B36] hover:bg-[#152342] text-[11px] font-bold text-[#00D4E8] border border-[#203252] flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
                          >
                            {copiedIndex === `step-${step.number}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#00E599]" />
                                <span>Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar Dados</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Pro Tip */}
                      {step.tip && (
                        <div className="ml-8 p-3 rounded-lg bg-[#0B1535] border border-[#00D4E8]/20 flex items-start gap-2 text-xs text-[#AAB6CC]">
                          <span className="text-[#00D4E8] font-bold shrink-0">Dica:</span>
                          <span className="leading-relaxed">{step.tip}</span>
                        </div>
                      )}

                      {/* Warning */}
                      {step.warning && (
                        <div className="ml-8 p-3 rounded-lg bg-[#1E1610] border border-amber-500/30 flex items-start gap-2 text-xs text-amber-200">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{step.warning}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* BOTÕES DE AÇÃO DIRETA (CTAS) */}
                <div className="pt-4 border-t border-[#203252] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs text-[#71809B]">
                    Abra as ferramentas em uma nova aba para executar os passos:
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {activeMethod.secondaryCta && (
                      <a
                        href={activeMethod.secondaryCta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#111B36] hover:bg-[#152342] text-xs font-bold text-[#AAB6CC] hover:text-[#F5F7FF] border border-[#203252] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>{activeMethod.secondaryCta.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={activeMethod.primaryCta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cta px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#00D4E8]/20"
                    >
                      <span>{activeMethod.primaryCta.label}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* SALVAR LINK DO SITE PUBLICADO NO PROJETO */}
              <div className="p-5 md:p-6 rounded-2xl bg-[#0B1535] border border-[#203252] space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00E599]">
                  <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
                  <span>Concluiu a Publicação? Guarde o Link Oficial</span>
                </div>
                <p className="text-xs text-[#AAB6CC] leading-relaxed">
                  Depois que o site estiver ativo (na Netlify, Hostinger ou Vercel), salve o link aqui para manter o registro integrado no seu projeto:
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <input
                    type="url"
                    value={siteUrlInput}
                    onChange={(e) => setSiteUrlInput(e.target.value)}
                    placeholder="Ex: https://meusite.netlify.app ou https://minhaempresa.com.br"
                    className="flex-1 bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleSavePublishedUrl}
                    className="px-5 py-2.5 rounded-xl bg-[#111B36] hover:bg-[#152342] text-xs font-bold text-[#00D4E8] border border-[#203252] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {urlSavedFeedback ? (
                      <>
                        <Check className="w-4 h-4 text-[#00E599]" />
                        <span>Link Salvo!</span>
                      </>
                    ) : (
                      <span>Salvar Link no Projeto</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
