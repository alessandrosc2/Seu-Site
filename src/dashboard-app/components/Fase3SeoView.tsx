import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Square, 
  CheckSquare, 
  Play, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw,
  Check,
  TrendingUp,
  Copy,
  Users,
  Eye,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FASE3_DATA, Fase3Track } from '../data/fase3SeoData';
import { useProject } from '../context/ProjectContext';

export const Fase3SeoView: React.FC = () => {
  const { project, updateProject, goToDashboard } = useProject();

  // Selected Track: null = overview of tracks, or id of track
  const [selectedTrackId, setSelectedTrackId] = useState<'google_meu_negocio' | 'search_console' | 'lgpd_privacidade' | 'analytics' | null>(null);

  // Copy state for code snippets
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Checklist state persisted in localStorage
  const storageKey = `seu_site_unico_fase3_checklist_${project.name || 'default'}`;
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      gmb_created: false,
      gmb_site_linked: false,
      gmb_hours_contacts: false,
      gmb_photos_added: false,
      gmb_verified: false,
      gsc_property_created: project.googleSearchConsoleConfigured || false,
      gsc_verified: false,
      gsc_sitemap_submitted: project.sitemapSubmitted || false,
      gsc_indexed_requested: false,
      lgpd_cookie_banner: false,
      lgpd_policy_text: false,
      lgpd_footer_link: false,
      lgpd_contact_channel: false,
      ga4_account_created: false,
      ga4_stream_web: false,
      ga4_tag_installed: false,
      ga4_realtime_tested: false
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checklist));
    } catch (e) {}
  }, [checklist, storageKey]);

  // Calculate total progress
  const allChecklistKeys = FASE3_DATA.tracks.flatMap(t => t.checklistItems.map(i => i.key));
  const totalItems = allChecklistKeys.length;
  const completedItems = allChecklistKeys.filter(k => !!checklist[k]).length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  const toggleChecklistItem = (key: string) => {
    setChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      // Sync with project state if relevant
      if (key === 'gsc_property_created' || key === 'gsc_verified') {
        updateProject({ googleSearchConsoleConfigured: updated[key] });
      }
      if (key === 'gsc_sitemap_submitted') {
        updateProject({ sitemapSubmitted: updated[key] });
      }
      return updated;
    });

    if (!checklist[key] && completedItems + 1 === totalItems) {
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.55 }
        });
      } catch (e) {}
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const selectedTrack = FASE3_DATA.tracks.find(t => t.id === selectedTrackId);

  const getTagClasses = (type: string) => {
    switch (type) {
      case 'green':
        return 'bg-[#00E599]/15 text-[#00E599] border-[#00E599]/30';
      case 'cyan':
        return 'bg-[#00D4E8]/15 text-[#00D4E8] border-[#00D4E8]/30';
      case 'purple':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'amber':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      default:
        return 'bg-[#152342] text-[#AAB6CC] border-[#203252]';
    }
  };

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-[#00E599]" />;
      case 'Search':
        return <Search className="w-6 h-6 text-[#00D4E8]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-purple-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-amber-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#00D4E8]" />;
    }
  };

  const getTrackCompletedCount = (track: Fase3Track) => {
    return track.checklistItems.filter(item => !!checklist[item.key]).length;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-fadeIn">
      {/* 1. BANNER INTRODUTÓRIO */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-6 md:p-8 relative overflow-hidden glow-cyan-subtle">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#152342] text-[#00D4E8] border border-[#203252]">
              <Search className="w-3.5 h-3.5" />
              <span>{FASE3_DATA.banner.badge}</span>
            </div>

            <button
              onClick={goToDashboard}
              className="text-xs text-[#71809B] hover:text-[#00D4E8] transition-colors flex items-center gap-1.5 cursor-pointer bg-[#080D20] px-3 py-1.5 rounded-lg border border-[#203252]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Voltar ao Painel Geral</span>
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-extrabold text-[#F5F7FF] tracking-tight">
              {FASE3_DATA.banner.title}
            </h1>
            <p className="text-sm md:text-base text-[#AAB6CC] leading-relaxed max-w-3xl">
              "{FASE3_DATA.banner.metaphor}"
            </p>
          </div>

          {/* 4 Pilares Resumo (Incluindo Bônus Analytics) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {FASE3_DATA.banner.pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-xl bg-[#080D20]/80 border border-[#203252] space-y-1"
              >
                <div className="text-xs font-bold text-[#F5F7FF] flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${idx === 3 ? 'bg-amber-400' : 'bg-[#00D4E8]'}`} />
                  <span>{pillar.title}</span>
                </div>
                <p className="text-[11px] text-[#AAB6CC] leading-snug">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Barra de Progresso Geral da Fase 3 */}
          <div className="pt-3 border-t border-[#203252]/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#AAB6CC] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00E599]" />
                <span>Progresso da Fase 3: {completedItems} de {totalItems} verificações concluídas</span>
              </span>
              <span className="font-mono font-bold text-[#00E599]">
                {progressPercentage}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#080D20] overflow-hidden border border-[#203252]">
              <div 
                className="h-full bg-gradient-to-r from-[#00D4E8] to-[#00E599] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CARDS DE ESCOLHA DAS TRILHAS (VISÃO GERAL OU DETALHES) */}
      {/* ========================================================= */}
      {!selectedTrackId ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm md:text-base font-bold text-[#F5F7FF] uppercase tracking-wide flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#00D4E8]/10 text-[#00D4E8] font-bold text-xs flex items-center justify-center border border-[#00D4E8]/20">
                  3
                </span>
                <span>Escolha uma Trilha para Começar</span>
              </h2>
              <p className="text-xs text-[#AAB6CC] mt-0.5">
                Siga na ordem recomendada ou acesse diretamente o bônus de contador de visitas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FASE3_DATA.tracks.map((track, idx) => {
              const completedCount = getTrackCompletedCount(track);
              const isAllTrackDone = completedCount === track.checklistItems.length;
              const isBonus = !!track.isBonus;

              return (
                <div
                  key={track.id}
                  onClick={() => {
                    setSelectedTrackId(track.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-5 md:p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-sm ${
                    isBonus 
                      ? 'bg-gradient-to-b from-[#1E1710] to-[#080D20] border-amber-500/50 hover:border-amber-400 hover:shadow-amber-500/10'
                      : 'bg-[#080D20] border-[#203252] hover:border-[#00D4E8]/50 hover:bg-[#111B36]/60'
                  }`}
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border ${isBonus ? 'bg-amber-500/10 border-amber-500/30' : 'bg-[#111B36] border-[#203252]'}`}>
                        {getTrackIcon(track.icon)}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getTagClasses(track.tagType)}`}>
                        {track.isBonus ? 'BÔNUS' : track.tag}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <div className={`text-[11px] font-mono uppercase font-bold ${isBonus ? 'text-amber-400' : 'text-[#71809B]'}`}>
                        {isBonus ? '★ Bônus Exclusivo' : `Trilha 0${idx + 1}`}
                      </div>
                      <h3 className={`text-base font-bold transition-colors mt-0.5 leading-snug ${isBonus ? 'text-[#F5F7FF] group-hover:text-amber-300' : 'text-[#F5F7FF] group-hover:text-[#00D4E8]'}`}>
                        {track.shortTitle}
                      </h3>
                      <p className="text-xs text-[#AAB6CC] mt-1.5 leading-relaxed line-clamp-3">
                        {track.subtitle}
                      </p>
                    </div>

                    {/* Checklist Mini Status */}
                    <div className="pt-2 border-t border-[#203252]/60 flex items-center justify-between text-xs">
                      <span className="text-[#71809B]">Status do Checklist:</span>
                      <span className={`font-semibold flex items-center gap-1 ${isAllTrackDone ? 'text-[#00E599]' : isBonus ? 'text-amber-400' : 'text-[#00D4E8]'}`}>
                        {isAllTrackDone ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Concluído</span>
                          </>
                        ) : (
                          <span>{completedCount}/{track.checklistItems.length} itens</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className={`pt-3 border-t border-[#203252]/40 flex items-center justify-between text-xs font-bold ${isBonus ? 'text-amber-400' : 'text-[#00D4E8]'}`}>
                    <span>{isBonus ? 'Explorar Bônus GA4' : 'Acessar Passo a Passo'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* 3. VISÃO DETALHADA DA TRILHA SELECIONADA                  */
        /* ========================================================= */
        <div className="space-y-6 pt-2 animate-fadeIn">
          {/* Top Bar de Navegação entre Trilhas */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#203252] gap-3">
            <button
              onClick={() => {
                setSelectedTrackId(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111B36] hover:bg-[#152342] text-xs font-bold text-[#00D4E8] border border-[#203252] transition-colors cursor-pointer w-fit shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar à visão geral das trilhas</span>
            </button>

            {/* Abas Rápidas para trocar de trilha */}
            <div className="flex flex-wrap items-center gap-2">
              {FASE3_DATA.tracks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrackId(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedTrackId === t.id
                      ? t.isBonus
                        ? 'bg-amber-400 text-[#080D20] shadow-md shadow-amber-400/20 font-extrabold'
                        : 'bg-[#00D4E8] text-[#080D20] shadow-md shadow-[#00D4E8]/20 font-extrabold'
                      : 'bg-[#111B36] text-[#AAB6CC] hover:text-[#F5F7FF] border border-[#203252]'
                  }`}
                >
                  {t.shortTitle}
                </button>
              ))}
            </div>
          </div>

          {selectedTrack && (
            <div className="space-y-6">
              {/* Header do Card da Trilha */}
              <div className={`p-5 md:p-6 rounded-2xl border space-y-3 ${
                selectedTrack.isBonus 
                  ? 'bg-gradient-to-br from-[#1E1710] to-[#080D20] border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-[#080D20] border border-[#203252]'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-xl border shrink-0 mt-0.5 ${
                      selectedTrack.isBonus ? 'bg-amber-500/10 border-amber-500/30' : 'bg-[#111B36] border-[#203252]'
                    }`}>
                      {getTrackIcon(selectedTrack.icon)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getTagClasses(selectedTrack.tagType)}`}>
                          {selectedTrack.tag}
                        </span>
                        {selectedTrack.isBonus && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            ★ RECURSO EXCLUSIVO
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-[#F5F7FF]">
                        {selectedTrack.title}
                      </h2>
                      <p className="text-xs text-[#AAB6CC] leading-relaxed">
                        {selectedTrack.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#111B36]/80 rounded-xl border border-[#203252] text-xs text-[#AAB6CC] flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#00E599] shrink-0" />
                  <span><strong>Por que isso importa:</strong> {selectedTrack.whyImportant}</span>
                </div>
              </div>

              {/* CARD DE 'COMO LER O PAINEL SEM SE PERDER' (SE FOR ANALYTICS) */}
              {selectedTrack.howToReadDashboard && (
                <div className="bg-gradient-to-br from-[#1E1710] to-[#0B1535] border-2 border-amber-500/40 rounded-2xl p-5 md:p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>{selectedTrack.howToReadDashboard.title}</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      Didática para Iniciantes
                    </span>
                  </div>

                  <p className="text-xs text-[#AAB6CC] leading-relaxed">
                    {selectedTrack.howToReadDashboard.goldTip}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-4 rounded-xl bg-[#080D20] border border-[#203252] space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#00E599]">
                        <Activity className="w-4 h-4 text-[#00E599]" />
                        <span>Aba "Tempo Real"</span>
                      </div>
                      <p className="text-xs text-[#AAB6CC] leading-relaxed">
                        {selectedTrack.howToReadDashboard.realtimeDesc}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#080D20] border border-[#203252] space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#00D4E8]">
                        <Users className="w-4 h-4 text-[#00D4E8]" />
                        <span>Aba "Aquisição de Tráfego"</span>
                      </div>
                      <p className="text-xs text-[#AAB6CC] leading-relaxed">
                        {selectedTrack.howToReadDashboard.trafficDesc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* VÍDEO TUTORIAL SE HOUVER */}
              {selectedTrack.youtubeVideoId && (
                <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
                      <Play className="w-4 h-4 text-[#00E599]" />
                      <span>Vídeo Explicativo Passo a Passo</span>
                    </div>
                    {selectedTrack.youtubeUrl && (
                      <a
                        href={selectedTrack.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#AAB6CC] hover:text-[#00D4E8] flex items-center gap-1 transition-colors"
                      >
                        <span>Pesquisar Vídeos no YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#203252] bg-black shadow-2xl">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedTrack.youtubeVideoId}?rel=0`}
                      title={selectedTrack.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>

                  {selectedTrack.youtubeSearchTerms && (
                    <div className="pt-2 text-xs text-[#71809B] space-y-1">
                      <span className="font-semibold text-[#AAB6CC]">Termos recomendados para buscar vídeos rápidos:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedTrack.youtubeSearchTerms.map((term, tIdx) => (
                          <a
                            key={tIdx}
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(term)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-md bg-[#111B36] hover:bg-[#152342] text-[11px] text-[#00D4E8] border border-[#203252] flex items-center gap-1"
                          >
                            <span>"{term}"</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TUTORIAL ESCRITO PASSO A PASSO */}
              <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#203252]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
                    <span>Passo a Passo Guiado</span>
                  </h3>
                  <span className="text-[11px] text-[#71809B]">
                    {selectedTrack.steps.length} passos didáticos
                  </span>
                </div>

                <div className="space-y-4">
                  {selectedTrack.steps.map((step) => (
                    <div
                      key={step.number}
                      className="p-4 md:p-5 rounded-xl bg-[#111B36] border border-[#203252] space-y-2.5 transition-colors hover:border-[#00D4E8]/30"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                          selectedTrack.isBonus ? 'bg-amber-500/20 text-amber-300' : 'bg-[#00D4E8]/15 text-[#00D4E8]'
                        }`}>
                          {step.number}
                        </span>
                        <h4 className="text-xs md:text-sm font-bold text-[#F5F7FF]">
                          {step.title}
                        </h4>
                      </div>

                      <p className="text-xs text-[#AAB6CC] leading-relaxed pl-8 whitespace-pre-line">
                        {step.description}
                      </p>

                      {/* Code Snippet Box (com botão Copiar) */}
                      {step.codeSnippet && (
                        <div className="ml-8 mt-2 p-3.5 rounded-xl bg-[#080D20] border border-[#203252] space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-[#71809B] font-mono">Código da Tag Google (gtag.js)</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(step.codeSnippet || '', `snippet-${step.number}`)}
                              className="px-2.5 py-1 rounded bg-[#111B36] hover:bg-[#152342] text-[11px] font-bold text-[#00D4E8] border border-[#203252] flex items-center gap-1.5 cursor-pointer"
                            >
                              {copiedKey === `snippet-${step.number}` ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-[#00E599]" />
                                  <span>Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copiar Código</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-xs font-mono text-[#00E599] overflow-x-auto p-2 bg-[#050914] rounded-lg">
                            {step.codeSnippet}
                          </pre>
                        </div>
                      )}

                      {step.tip && (
                        <div className="ml-8 p-3 rounded-lg bg-[#0B1535] border border-[#00D4E8]/20 flex items-start gap-2 text-xs text-[#AAB6CC]">
                          <Sparkles className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" />
                          <span className="leading-relaxed"><strong className="text-[#00D4E8]">Dica de Ouro:</strong> {step.tip}</span>
                        </div>
                      )}

                      {step.warning && (
                        <div className="ml-8 p-3 rounded-lg bg-[#1E1610] border border-amber-500/30 flex items-start gap-2 text-xs text-amber-200">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{step.warning}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* BOTÕES DE AÇÃO EXTERNA (CTAS) */}
                <div className="pt-4 border-t border-[#203252] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs text-[#71809B]">
                    Acesse as ferramentas oficiais em uma nova aba:
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {selectedTrack.secondaryCta && (
                      <a
                        href={selectedTrack.secondaryCta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#111B36] hover:bg-[#152342] text-xs font-bold text-[#AAB6CC] hover:text-[#F5F7FF] border border-[#203252] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>{selectedTrack.secondaryCta.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={selectedTrack.primaryCta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-cta px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg ${
                        selectedTrack.isBonus ? 'shadow-amber-500/20' : 'shadow-[#00D4E8]/20'
                      }`}
                    >
                      <span>{selectedTrack.primaryCta.label}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* CHECKLIST INTERATIVO DA TRILHA */}
              <div className={`p-5 md:p-6 rounded-2xl border-2 space-y-4 shadow-lg ${
                selectedTrack.isBonus 
                  ? 'bg-[#080D20] border-amber-500/30 shadow-amber-500/5'
                  : 'bg-[#080D20] border-[#00E599]/30 shadow-[#00E599]/5'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-[#203252]">
                  <div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                      selectedTrack.isBonus ? 'text-amber-400' : 'text-[#00E599]'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Checklist de Conclusão: {selectedTrack.shortTitle}</span>
                    </h3>
                    <p className="text-[11px] text-[#AAB6CC] mt-0.5">
                      Marque cada ação que você já concluiu nesta trilha para atualizar seu progresso:
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                    selectedTrack.isBonus 
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'bg-[#00E599]/15 text-[#00E599] border-[#00E599]/30'
                  }`}>
                    {getTrackCompletedCount(selectedTrack)} de {selectedTrack.checklistItems.length} feitos
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {selectedTrack.checklistItems.map((item) => {
                    const isChecked = !!checklist[item.key];

                    return (
                      <div
                        key={item.key}
                        onClick={() => toggleChecklistItem(item.key)}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? selectedTrack.isBonus 
                              ? 'bg-[#1E1710] border-amber-500/50 text-[#F5F7FF]'
                              : 'bg-[#111B36] border-[#00E599]/50 text-[#F5F7FF]'
                            : 'bg-[#0B1535] border-[#203252] text-[#AAB6CC] hover:border-[#00D4E8]/40'
                        }`}
                      >
                        <div className={`mt-0.5 shrink-0 ${selectedTrack.isBonus ? 'text-amber-400' : 'text-[#00E599]'}`}>
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4" />
                          ) : (
                            <Square className="w-4 h-4 text-[#71809B]" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <div className={`text-xs font-bold ${isChecked ? 'text-[#F5F7FF]' : 'text-[#AAB6CC]'}`}>
                            {item.label}
                          </div>
                          <p className="text-[11px] text-[#71809B] leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
