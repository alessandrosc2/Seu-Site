import React, { useState, useEffect, useMemo } from 'react';
import { 
  Palette, 
  Sparkles, 
  Check, 
  Copy, 
  Code,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Info,
  Wand2,
  MessageSquare,
  Upload,
  RefreshCw,
  FileText,
  Terminal,
  CheckSquare
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { 
  generateVisualIdentity, 
  formatVisualIdentityPrompt,
  generateGptPalettePrompt,
  parsePaletteFromGptResponse
} from '../utils/visualIdentityGenerator';
import { VisualIdentity, BrandLogoColors, BusinessProject } from '../types/project';

const POPULAR_NICHES = [
  { name: 'Odontologia & Saúde', icon: '🩺', defaultVibe: 'Limpo, acolhedor e altamente confiável' },
  { name: 'Advocacia & Direito', icon: '⚖️', defaultVibe: 'Sóbrio, tradicional e com autoridade' },
  { name: 'Barbearia & Estética Masculina', icon: '💈', defaultVibe: 'Premium, rústico e sofisticado' },
  { name: 'Clínica de Estética & Beleza', icon: '✨', defaultVibe: 'Elegante, acolhedor e refinado' },
  { name: 'Gastronomia & Restaurantes', icon: '🍕', defaultVibe: 'Aconchegante, apetitoso e vibrante' },
  { name: 'Tecnologia, Software & SaaS', icon: '💻', defaultVibe: 'Inovador, ágil e tecnológico' },
  { name: 'Imobiliária & Arquitetura', icon: '🏡', defaultVibe: 'Moderno, espaçoso e sofisticado' },
  { name: 'Oficina Mecânica & Automotivo', icon: '🔧', defaultVibe: 'Prático, robusto e transparente' },
  { name: 'Consultoria & Finanças', icon: '📈', defaultVibe: 'Estratégico, sólido e corporativo' },
  { name: 'Fitness, Academia & Personal', icon: '🏋️', defaultVibe: 'Enérgico, dinâmico e focado em metas' },
  { name: 'Educação, Idiomas & Cursos', icon: '🎓', defaultVibe: 'Inspirador, acessível e didático' }
];

const POSITIONING_EXAMPLES = [
  'Elegante',
  'Moderno',
  'Premium',
  'Minimalista',
  'Sofisticado',
  'Acolhedor',
  'Tecnológico',
  'Tradicional',
  'Acessível',
  'Profissional',
  'Popular',
  'Artesanal'
];

export const VisualIdentityBuilder: React.FC = () => {
  const { project, updateProject, completeStep } = useProject();

  // Local form state initialized from project without unconfirmed hardcoded defaults
  const [segmentInput, setSegmentInput] = useState<string>(project.segment || '');
  const [positioning, setPositioning] = useState<string>(
    project.visualPositioning || (project.visualStyle ? project.visualStyle.charAt(0).toUpperCase() + project.visualStyle.slice(1) : '')
  );
  const [personality, setPersonality] = useState<string>(
    project.visualPersonality || ''
  );
  const [paletteSource, setPaletteSource] = useState<'custom' | 'brand_logo'>(
    project.paletteSource || (project.brandLogoColors?.primary ? 'brand_logo' : 'custom')
  );
  const [brandColors, setBrandColors] = useState<BrandLogoColors>({
    primary: project.brandLogoColors?.primary || '#00D4E8',
    secondary: project.brandLogoColors?.secondary || '#1769FF',
    complementary: project.brandLogoColors?.complementary || '#38BDF8',
    neutral: project.brandLogoColors?.neutral || '#111B36',
    text: project.brandLogoColors?.text || '#F5F7FF',
    accent: project.brandLogoColors?.accent || '#00E599',
    background: project.brandLogoColors?.background,
    backgroundSecondary: project.brandLogoColors?.backgroundSecondary,
    textSecondary: project.brandLogoColors?.textSecondary,
    border: project.brandLogoColors?.border,
    success: project.brandLogoColors?.success,
    warning: project.brandLogoColors?.warning,
    error: project.brandLogoColors?.error,
    info: project.brandLogoColors?.info
  });
  const [referenceUrl, setReferenceUrl] = useState<string>(project.referenceUrl || '');
  const [desiredColorsInput, setDesiredColorsInput] = useState<string>(project.desiredColors || '');

  // Keep local desired colors in sync if project is updated externally
  useEffect(() => {
    if (project.desiredColors !== undefined && project.desiredColors !== desiredColorsInput) {
      setDesiredColorsInput(project.desiredColors);
    }
  }, [project.desiredColors]);

  // GPT Prompt & Response state
  const [attachLogoMode, setAttachLogoMode] = useState(false);
  const [customUserNotes, setCustomUserNotes] = useState('');
  const [gptResponseInput, setGptResponseInput] = useState(project.gptPaletteResponse || '');
  const [savedGptResponse, setSavedGptResponse] = useState<string>(project.gptPaletteResponse || '');
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);

  // Copy feedbacks
  const [copiedGptPrompt, setCopiedGptPrompt] = useState(false);
  const [copiedFullResponse, setCopiedFullResponse] = useState(false);
  const [copiedTokens, setCopiedTokens] = useState(false);
  const [copiedHexes, setCopiedHexes] = useState(false);

  // Compute live visual identity
  const currentVI = useMemo(() => {
    const draftProject = {
      ...project,
      segment: segmentInput || project.segment,
      visualPositioning: positioning || project.visualPositioning,
      visualPersonality: personality || project.visualPersonality,
      desiredColors: desiredColorsInput,
      paletteSource,
      brandLogoColors: brandColors,
      referenceUrl
    };
    return generateVisualIdentity(draftProject);
  }, [project, segmentInput, positioning, personality, desiredColorsInput, paletteSource, brandColors, referenceUrl]);

  // Compute GPT prompt in real time
  const gptPrompt = useMemo(() => {
    return generateGptPalettePrompt(
      {
        ...project,
        segment: segmentInput || project.segment,
        visualPositioning: positioning || project.visualPositioning,
        visualPersonality: personality || project.visualPersonality,
        desiredColors: desiredColorsInput,
        paletteSource,
        brandLogoColors: brandColors
      },
      {
        attachLogoMode,
        userNotes: customUserNotes,
        nicheOverride: segmentInput
      }
    );
  }, [project, segmentInput, positioning, personality, desiredColorsInput, paletteSource, brandColors, attachLogoMode, customUserNotes]);

  // Synchronize base values with project on explicit user changes
  useEffect(() => {
    if (project.brandLogoColors?.primary || project.gptPaletteResponse || project.visualPositioning || project.visualPersonality || project.desiredColors) {
      updateProject({
        segment: segmentInput || project.segment,
        visualPositioning: positioning || project.visualPositioning,
        visualPersonality: personality || project.visualPersonality,
        desiredColors: desiredColorsInput,
        paletteSource,
        brandLogoColors: brandColors,
        referenceUrl,
        visualIdentity: currentVI,
        primaryColor: currentVI.primary,
        secondaryColor: currentVI.secondary,
        accentColor: currentVI.accent
      });
    }
  }, [segmentInput, positioning, personality, desiredColorsInput, paletteSource, brandColors, referenceUrl, currentVI, updateProject]);

  const handleCopyGptPrompt = () => {
    navigator.clipboard.writeText(gptPrompt);
    setCopiedGptPrompt(true);
    setTimeout(() => setCopiedGptPrompt(false), 2500);
  };

  const handleCopyFullResponse = () => {
    const textToCopy = savedGptResponse || gptResponseInput;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedFullResponse(true);
    setTimeout(() => setCopiedFullResponse(false), 2500);
  };

  const handleCopyTokens = () => {
    navigator.clipboard.writeText(currentVI.cssTokens);
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2500);
  };

  const handleCopyHexes = () => {
    const primary = brandColors.primary || currentVI.primary;
    const secondary = brandColors.secondary || currentVI.secondary;
    const accent = brandColors.complementary || currentVI.accent;
    const bg = brandColors.background || currentVI.background;
    const bgSec = brandColors.backgroundSecondary || currentVI.backgroundSecondary;
    const textPrimary = brandColors.text || currentVI.textPrimary;
    const textSec = brandColors.textSecondary || currentVI.textSecondary;
    const border = brandColors.border || currentVI.border;
    const success = brandColors.success || currentVI.success;
    const warning = brandColors.warning || currentVI.warning;
    const error = brandColors.error || currentVI.error;
    const info = brandColors.info || currentVI.info;

    const hexList = `PRIMARY: ${primary}
SECONDARY: ${secondary}
ACCENT: ${accent}
BACKGROUND: ${bg}
BACKGROUND_SECONDARY: ${bgSec}
TEXT_PRIMARY: ${textPrimary}
TEXT_SECONDARY: ${textSec}
BORDER: ${border}
SUCCESS: ${success}
WARNING: ${warning}
ERROR: ${error}
INFO: ${info}`;

    navigator.clipboard.writeText(hexList);
    setCopiedHexes(true);
    setTimeout(() => setCopiedHexes(false), 2500);
  };

  const handleSelectNiche = (nicheName: string, vibe: string) => {
    setSegmentInput(nicheName);
    updateProject({ segment: nicheName });
    if (!personality) {
      setPersonality(vibe);
    }
  };

  const handleParseAndApplyGpt = () => {
    if (!gptResponseInput.trim()) {
      setImportStatusMessage('Por favor, cole a resposta gerada pelo ChatGPT no campo acima.');
      return;
    }

    const parsed = parsePaletteFromGptResponse(gptResponseInput);

    if (parsed.rawFoundHexes.length === 0 && !parsed.primary) {
      setImportStatusMessage('Nenhum código HEX (ex: #00D4E8) foi identificado no texto colado. Verifique se copiou a resposta completa do GPT.');
      return;
    }

    const updatedColors: BrandLogoColors = {
      primary: parsed.primary || brandColors.primary || '#00D4E8',
      secondary: parsed.secondary || brandColors.secondary,
      complementary: parsed.accent || brandColors.complementary,
      neutral: parsed.neutral || parsed.backgroundSecondary || parsed.background || brandColors.neutral,
      text: parsed.text || brandColors.text,
      accent: parsed.accent || brandColors.accent,
      background: parsed.background || brandColors.background,
      backgroundSecondary: parsed.backgroundSecondary || brandColors.backgroundSecondary,
      textSecondary: parsed.textSecondary || brandColors.textSecondary,
      border: parsed.border || brandColors.border,
      success: parsed.success || brandColors.success,
      warning: parsed.warning || brandColors.warning,
      error: parsed.error || brandColors.error,
      info: parsed.info || brandColors.info
    };

    setBrandColors(updatedColors);
    setPaletteSource('brand_logo');
    setSavedGptResponse(gptResponseInput);

    const updatedProject: BusinessProject = {
      ...project,
      segment: segmentInput || project.segment,
      visualPositioning: positioning || project.visualPositioning,
      visualPersonality: personality || project.visualPersonality,
      desiredColors: desiredColorsInput,
      gptPaletteResponse: gptResponseInput,
      brandLogoColors: updatedColors,
      paletteSource: 'brand_logo',
      primaryColor: updatedColors.primary,
      secondaryColor: updatedColors.secondary || updatedColors.primary,
      accentColor: updatedColors.complementary || updatedColors.primary
    };

    const newVI = generateVisualIdentity(updatedProject);
    updatedProject.visualIdentity = newVI;

    updateProject(updatedProject);

    const count = [
      parsed.primary,
      parsed.secondary,
      parsed.accent,
      parsed.background,
      parsed.backgroundSecondary,
      parsed.text,
      parsed.textSecondary,
      parsed.border,
      parsed.success,
      parsed.warning,
      parsed.error,
      parsed.info
    ].filter(Boolean).length;

    setImportStatusMessage(`✅ Resposta do GPT salva com sucesso no seu projeto! ${count} códigos e diretrizes cromáticas oficiais foram extraídos e sincronizados.`);
    completeStep('03-01', false);
  };

  return (
    <div className="space-y-8 text-xs text-[#F5F7FF]">
      {/* 1. Context Banner */}
      <div className="p-4 bg-[#080D20] border border-[#203252] rounded-xl flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#00D4E8]/10 text-[#00D4E8] shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#00D4E8] block uppercase tracking-wider">
            Módulo 03 — Sistema de Cores & Branding Profissional para Website
          </span>
          <p className="text-[11px] text-[#AAB6CC] leading-relaxed">
            Seu negócio: <strong className="text-[#F5F7FF]">{project.name || 'Minha Empresa'}</strong> • Nicho: <strong className="text-[#00D4E8]">{segmentInput || project.segment || 'Não informado'}</strong> em <strong className="text-[#F5F7FF]">{project.city || 'Sua Cidade'}</strong>. Copie o prompt do Diretor de Arte para o GPT criar o sistema de cores da sua marca e cole a resposta abaixo para registrar no seu projeto.
          </p>
        </div>
      </div>

      {/* 2. OS 4 PASSOS VISUAIS DA ETAPA */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#203252]">
          <Wand2 className="w-4 h-4 text-[#00D4E8]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#F5F7FF]">
            Fluxo Guiado com o GPT
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Passo 1 */}
          <div className="bg-[#080D20] p-3.5 rounded-lg border border-[#203252] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#111B36] text-[#00D4E8] font-bold text-[10px] flex items-center justify-center border border-[#00D4E8]/30">
                1
              </span>
              <span className="font-bold text-[11px] text-[#F5F7FF]">Confirme seu Nicho</span>
            </div>
            <p className="text-[10px] text-[#AAB6CC] leading-relaxed">
              O prompt utilizará o nicho exato para definir a psicologia das cores adequada ao setor.
            </p>
          </div>

          {/* Passo 2 */}
          <div className="bg-[#080D20] p-3.5 rounded-lg border border-[#203252] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#111B36] text-[#00D4E8] font-bold text-[10px] flex items-center justify-center border border-[#00D4E8]/30">
                2
              </span>
              <span className="font-bold text-[11px] text-[#F5F7FF]">Copie o Prompt</span>
            </div>
            <p className="text-[10px] text-[#AAB6CC] leading-relaxed">
              O prompt do Diretor de Arte já vem preenchido com todos os dados da sua empresa.
            </p>
          </div>

          {/* Passo 3 */}
          <div className="bg-[#080D20] p-3.5 rounded-lg border border-[#203252] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#111B36] text-[#00D4E8] font-bold text-[10px] flex items-center justify-center border border-[#00D4E8]/30">
                3
              </span>
              <span className="font-bold text-[11px] text-[#F5F7FF]">Cole no ChatGPT</span>
            </div>
            <p className="text-[10px] text-[#AAB6CC] leading-relaxed">
              Anexe a imagem da sua logo (se tiver) e envie o prompt para o GPT gerar o sistema de cores.
            </p>
          </div>

          {/* Passo 4 */}
          <div className="bg-[#080D20] p-3.5 rounded-lg border border-[#203252] space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#111B36] text-[#22C55E] font-bold text-[10px] flex items-center justify-center border border-[#22C55E]/30">
                4
              </span>
              <span className="font-bold text-[11px] text-[#F5F7FF]">Cole a Resposta Aqui</span>
            </div>
            <p className="text-[10px] text-[#AAB6CC] leading-relaxed">
              Copie a resposta do GPT e cole abaixo para manter seu sistema de cores registrado.
            </p>
          </div>
        </div>
      </div>

      {/* 3. SELETOR RÁPIDO DE NICHOS */}
      <div className="bg-[#080D20] border border-[#203252] rounded-xl p-5 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#203252]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#00D4E8]" />
            <h4 className="text-xs font-bold text-[#F5F7FF] uppercase tracking-wider">
              1. Selecione ou Digite seu Nicho de Mercado
            </h4>
          </div>
          <span className="text-[10px] text-[#71809B]">Clique para preencher rápido</span>
        </div>

        {/* Chips de Nichos Populares */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#AAB6CC]">
            Nichos Frequentes:
          </label>
          <div className="flex flex-wrap gap-2">
            {POPULAR_NICHES.map((niche) => {
              const isSelected = (segmentInput || '').toLowerCase().includes(niche.name.toLowerCase().split('&')[0].trim());
              return (
                <button
                  key={niche.name}
                  type="button"
                  onClick={() => handleSelectNiche(niche.name, niche.defaultVibe)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00D4E8] text-[#080D20] font-bold shadow-md shadow-[#00D4E8]/20'
                      : 'bg-[#111B36] text-[#AAB6CC] hover:text-[#F5F7FF] border border-[#203252] hover:border-[#00D4E8]/40'
                  }`}
                >
                  <span>{niche.icon}</span>
                  <span>{niche.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Manual de Nicho */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#F5F7FF]">
              Nicho / Ramo de Atuação do Negócio:
            </label>
            <input
              type="text"
              value={segmentInput}
              onChange={(e) => {
                setSegmentInput(e.target.value);
                updateProject({ segment: e.target.value });
              }}
              placeholder="Ex: Clínica Odontológica, Advocacia Trabalhista, Pizzaria..."
              className="w-full bg-[#111B36] border border-[#203252] rounded-lg p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
            <p className="text-[10px] text-[#71809B]">
              O GPT usará esse segmento para pesquisar as melhores combinações de cores do setor.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#F5F7FF]">
              Personalidade Visual Desejada:
            </label>
            <input
              type="text"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="Ex: Confiável, acolhedora, sofisticada, enérgica..."
              className="w-full bg-[#111B36] border border-[#203252] rounded-lg p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
            <p className="text-[10px] text-[#71809B]">
              Sensação que o cliente deve ter ao entrar no seu site.
            </p>
          </div>
        </div>

        {/* Posicionamento Sugerido */}
        <div className="space-y-2 pt-2 border-t border-[#203252]/50">
          <label className="block text-xs font-semibold text-[#AAB6CC]">
            Posicionamento de Mercado:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {POSITIONING_EXAMPLES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPositioning(item)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  positioning.toLowerCase() === item.toLowerCase()
                    ? 'bg-[#1769FF] text-white font-bold'
                    : 'bg-[#111B36] text-[#AAB6CC] hover:text-[#F5F7FF] border border-[#203252]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Campo Opcional: Cores Específicas Desejadas pelo Cliente */}
      <div className="bg-[#080D20] border border-[#203252] rounded-xl p-5 space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-[#203252]/60">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#00D4E8]" />
            <h4 className="text-xs font-bold text-[#F5F7FF] uppercase tracking-wider">
              Cores específicas que você gostaria de utilizar
            </h4>
          </div>
          <span className="text-[10px] text-[#71809B] font-semibold uppercase tracking-wider bg-[#111B36] px-2 py-0.5 rounded border border-[#203252]">
            Opcional
          </span>
        </div>

        <div className="space-y-1.5">
          <input
            type="text"
            value={desiredColorsInput}
            onChange={(e) => {
              const val = e.target.value;
              setDesiredColorsInput(val);
              updateProject({ desiredColors: val });
            }}
            placeholder="Ex.: azul petróleo, verde oliva e bege; ou #123456, #F2E8D5"
            className="w-full bg-[#111B36] border border-[#203252] rounded-lg p-2.5 text-xs text-[#F5F7FF] placeholder-[#71809B] focus:border-[#00D4E8] focus:outline-none transition-colors"
          />
          <p className="text-[11px] text-[#AAB6CC] leading-relaxed">
            Opcional. Se você já tem preferência por determinadas cores, informe aqui. A IA analisará essas cores junto com sua marca, segmento e posicionamento e decidirá como utilizá-las da melhor forma.
          </p>
        </div>
      </div>

      {/* 4. PROMPT DO DIRETOR DE ARTE PARA O GPT */}
      <div className="bg-[#111B36] border border-[#00D4E8]/40 rounded-xl p-5 md:p-6 space-y-5 glow-cyan-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#203252]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#00D4E8]/20 text-[#00D4E8]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#F5F7FF] tracking-tight">
                2. Prompt do Diretor de Arte para Colar no ChatGPT / Claude
              </h4>
              <span className="text-[11px] text-[#00D4E8] font-medium">
                Alimentado dinamicamente com seu negócio ({project.name || 'Sua Empresa'}), nicho ({segmentInput || 'Serviços'}) e dados de Meu Projeto
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://chatgpt.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080D20] hover:bg-[#152342] border border-[#203252] text-xs font-semibold text-[#AAB6CC] hover:text-[#00D4E8] transition-colors"
              title="Abrir o ChatGPT em uma nova aba"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir ChatGPT</span>
            </a>

            <button
              type="button"
              onClick={handleCopyGptPrompt}
              className="btn-cta px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              {copiedGptPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedGptPrompt ? 'Prompt Copiado!' : 'Copiar Prompt para o GPT'}</span>
            </button>
          </div>
        </div>

        {/* Opção: Vou anexar a imagem da logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#080D20] p-4 rounded-xl border border-[#203252]">
          <div 
            onClick={() => setAttachLogoMode(!attachLogoMode)}
            className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
              attachLogoMode ? 'bg-[#152342] border-[#00D4E8]' : 'bg-[#111B36] border-[#203252]'
            }`}
          >
            <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
              attachLogoMode ? 'bg-[#00D4E8] border-[#00D4E8]' : 'border-[#71809B]'
            }`}>
              {attachLogoMode && <Check className="w-3 h-3 text-[#080D20]" />}
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#F5F7FF] block flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#00D4E8]" />
                Vou anexar a imagem da minha logomarca no chat do GPT
              </span>
              <p className="text-[10px] text-[#AAB6CC] leading-relaxed">
                Ao marcar esta opção, o prompt instrui o GPT a analisar o arquivo de imagem anexado por você e extrair as tonalidades oficiais da logo.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#AAB6CC]">
              Preferência Extra para a IA (Opcional):
            </label>
            <input
              type="text"
              value={customUserNotes}
              onChange={(e) => setCustomUserNotes(e.target.value)}
              placeholder="Ex: 'Quero transmitir luxo', 'Prefiro tons escuros', 'Sem azul'..."
              className="w-full bg-[#111B36] border border-[#203252] rounded-lg p-2 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
            <p className="text-[10px] text-[#71809B]">
              Adiciona suas preferências pessoais diretamente no prompt do GPT.
            </p>
          </div>
        </div>

        {/* Caixa de Texto do Prompt */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#AAB6CC]">
            <span>Texto do Prompt Formatado:</span>
            <span className="font-mono text-[#00D4E8]">Pronto para envio</span>
          </div>
          <div className="bg-[#080D20] border border-[#203252] rounded-xl p-4 font-mono text-[11px] text-[#AAB6CC] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
            {gptPrompt}
          </div>
        </div>
      </div>

      {/* 5. COLAR A RESPOSTA DO GPT */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#00D4E8]" />
            <h4 className="text-xs font-bold text-[#F5F7FF] uppercase tracking-wider">
              3. Colar a Resposta do GPT Aqui
            </h4>
          </div>
          {savedGptResponse && (
            <span className="inline-flex items-center gap-1 text-[10px] text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded border border-[#22C55E]/30 font-medium">
              <Check className="w-3 h-3" /> Resposta salva
            </span>
          )}
        </div>

        <p className="text-[11px] text-[#AAB6CC] leading-relaxed">
          Cole abaixo a resposta completa gerada pelo ChatGPT ou Claude. O sistema irá extrair os códigos da paleta e manter o documento salvo na memória do seu projeto:
        </p>

        <textarea
          rows={6}
          value={gptResponseInput}
          onChange={(e) => {
            setGptResponseInput(e.target.value);
            if (importStatusMessage) setImportStatusMessage(null);
          }}
          placeholder="Cole aqui a resposta completa do ChatGPT (incluindo o bloco :root { --color-primary: #...; }, a tabela e as justificativas)..."
          className="w-full bg-[#080D20] border border-[#203252] rounded-xl p-3.5 text-xs font-mono text-[#F5F7FF] placeholder-[#71809B] focus:border-[#00D4E8] focus:outline-none transition-colors"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] text-[#71809B]">
            Dica: Aceita tokens CSS, tabelas Markdown ou o texto completo devolvido pela IA.
          </span>

          <button
            type="button"
            onClick={handleParseAndApplyGpt}
            className="btn-cta px-4 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md self-end sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Salvar e Registrar Resposta do GPT</span>
          </button>
        </div>

        {importStatusMessage && (
          <div className={`p-3 rounded-lg text-xs leading-relaxed border ${
            importStatusMessage.startsWith('✅') 
              ? 'bg-[#22C55E]/10 border-[#22C55E]/40 text-[#22C55E]' 
              : 'bg-[#EF4444]/10 border-[#EF4444]/40 text-[#EF4444]'
          }`}>
            {importStatusMessage}
          </div>
        )}
      </div>

      {/* 6. EXIBIÇÃO DA RESPOSTA DO GPT SALVA NO PROJETO */}
      {(savedGptResponse || gptResponseInput.trim().length > 30) && (
        <div className="bg-[#080D20] border border-[#203252] rounded-xl p-5 md:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#203252]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00D4E8]" />
                <h4 className="text-xs font-bold text-[#F5F7FF] uppercase tracking-wider">
                  Resposta do Diretor de Arte (GPT) — Sistema de Cores Registrado
                </h4>
              </div>
              <p className="text-[11px] text-[#AAB6CC]">
                Este documento define a paleta e as regras cromáticas que guiarão a geração do seu site com IA.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyTokens}
                className="px-3 py-1.5 rounded-lg bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-xs font-semibold text-[#AAB6CC] hover:text-[#00D4E8] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copiar tokens CSS :root"
              >
                {copiedTokens ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Code className="w-3.5 h-3.5" />}
                <span>{copiedTokens ? 'Tokens Copiados!' : 'Copiar Tokens CSS'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyHexes}
                className="px-3 py-1.5 rounded-lg bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-xs font-semibold text-[#AAB6CC] hover:text-[#00D4E8] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copiar lista de códigos HEX"
              >
                {copiedHexes ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Palette className="w-3.5 h-3.5" />}
                <span>{copiedHexes ? 'HEX Copiados!' : 'Copiar HEX'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyFullResponse}
                className="btn-cta px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
              >
                {copiedFullResponse ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFullResponse ? 'Resposta Copiada!' : 'Copiar Resposta Completa'}</span>
              </button>
            </div>
          </div>

          {/* Amostra rápida das cores extraídas da resposta */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#AAB6CC] block">
              Cores Funcionais Identificadas na Resposta:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {[
                { label: 'Primary', color: brandColors.primary || currentVI.primary },
                { label: 'Secondary', color: brandColors.secondary || currentVI.secondary },
                { label: 'Accent', color: brandColors.complementary || currentVI.accent },
                { label: 'Fundo Princ.', color: brandColors.background || currentVI.background },
                { label: 'Fundo Sec.', color: brandColors.backgroundSecondary || currentVI.backgroundSecondary },
                { label: 'Texto Princ.', color: brandColors.text || currentVI.textPrimary },
                { label: 'Texto Sec.', color: brandColors.textSecondary || currentVI.textSecondary },
                { label: 'Borda', color: brandColors.border || currentVI.border },
                { label: 'Sucesso', color: brandColors.success || currentVI.success },
                { label: 'Aviso', color: brandColors.warning || currentVI.warning },
                { label: 'Erro', color: brandColors.error || currentVI.error },
                { label: 'Info', color: brandColors.info || currentVI.info }
              ].map((swatch) => (
                <div key={swatch.label} className="bg-[#111B36] p-2 rounded-lg border border-[#203252] space-y-1 text-center">
                  <div 
                    className="w-full h-6 rounded border border-[#203252]/60" 
                    style={{ backgroundColor: swatch.color }}
                  />
                  <span className="text-[9px] font-bold text-[#AAB6CC] block truncate" title={swatch.label}>{swatch.label}</span>
                  <span className="text-[9px] font-mono text-[#F5F7FF] block truncate" title={swatch.color}>{swatch.color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visualizador da Resposta Completa */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#71809B] block">
              Conteúdo da Resposta do GPT:
            </span>
            <div className="bg-[#111B36] border border-[#203252] rounded-xl p-4 font-mono text-[11px] text-[#AAB6CC] leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap select-all">
              {savedGptResponse || gptResponseInput}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
