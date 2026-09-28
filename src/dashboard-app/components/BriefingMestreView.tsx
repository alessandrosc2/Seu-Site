import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Copy, 
  Check, 
  Edit3, 
  ArrowRight, 
  Sparkles,
  Layers,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Code2,
  Palette
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { 
  generateMasterPrompt, 
  generateVisualIdentity,
  sanitizeSingleHeadline,
  sanitizeSingleSubheadline,
  sanitizeAddress,
  sanitizeDifferential
} from '../utils/visualIdentityGenerator';

export const BriefingMestreView: React.FC = () => {
  const { project, updateProject, goToModule, setShowProjectDrawer, setActiveView } = useProject();
  const [copied, setCopied] = useState(false);
  const [copiedMegaPrompt, setCopiedMegaPrompt] = useState(false);

  const vi = project.visualIdentity || generateVisualIdentity(project);

  const getStructuredBriefingText = () => {
    const cleanAddr = sanitizeAddress(project.address);
    const cleanHeadline = sanitizeSingleHeadline(project.heroHeadline, project.name, project.segment);
    const cleanSubheadline = sanitizeSingleSubheadline(project.heroSubheadline, project.city);

    return `BRIEFING MESTRE DO NEGÓCIO
Atualizado em: ${new Date().toLocaleDateString('pt-BR')}

1. DADOS FUNDAMENTAIS
- Nome do Negócio: ${project.name || 'Não informado'}
- Segmento: ${project.segment || 'Não informado'}
- Localização: ${project.city || 'Não informado'} ${project.region ? `(${project.region})` : ''}
- WhatsApp Comercial: ${project.whatsapp || 'Não informado'}
- Instagram: ${project.instagram || 'Não informado'}
- Endereço Físico: ${cleanAddr || 'Não informado (atendimento com agendamento prévio)'}

2. PÚBLICO & POSICIONAMENTO
- Público-Alvo: ${project.targetAudience || 'Não informado'}
- Tom de Voz: ${project.communicationTone || 'Profissional e transparente'}
- Objetivo do Site: ${project.siteGoal || 'Apresentação profissional e captação de clientes via WhatsApp'}

3. CATÁLOGO DE SERVIÇOS
${project.services.length > 0 
  ? project.services.map((s, i) => `${i + 1}. **${s.title}**: ${s.description}`).join('\n')
  : 'Nenhum serviço cadastrado ainda.'}

4. DIFERENCIAIS COMPETITIVOS
${project.differentials.length > 0
  ? project.differentials.map(d => `- ${sanitizeDifferential(d)}`).join('\n')
  : 'Nenhum diferencial cadastrado ainda.'}

5. IDENTIDADE VISUAL ESTRUTURADA (FONTE DE VERDADE)
- Posicionamento Visual: ${vi.visualPositioning}
- Personalidade Visual: ${vi.visualPersonality}
- Origem da Paleta: ${vi.paletteSource === 'brand_logo' ? 'Marca/Logo informada pelo usuário' : 'Direção personalizada para o negócio'}${project.desiredColors?.trim() ? `\n- Cores Específicas Desejadas (Preferência): "${project.desiredColors.trim()}"` : ''}
- Paleta Principal: Primary ${vi.primary} | Secondary ${vi.secondary} | Accent ${vi.accent} | Fundo ${vi.background} | Cards ${vi.backgroundSecondary}
- Texto & Bordas: Text Primary ${vi.textPrimary} | Text Secondary ${vi.textSecondary} | Border ${vi.border}
- CTA WhatsApp: ${vi.ctaPrimary} (hover: ${vi.ctaPrimaryHover})

6. TEXTOS BASE ESTRUTURADOS (OPÇÕES FINAIS APROVADAS)
- Headline Principal (H1 Único): "${cleanHeadline}"
- Subtítulo: "${cleanSubheadline}"
- Chamada do Botão (CTA): "${project.ctaLabel || 'Falar no WhatsApp'}"
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getStructuredBriefingText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApproveAndProceed = () => {
    updateProject({ briefingApproved: true });
    goToModule('05');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 glow-cyan-subtle">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#152342] text-[#00D4E8] border border-[#203252] shrink-0">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
                Documento Central de Dados
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Consolidado
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#F5F7FF] tracking-tight">
              Briefing Mestre do Seu Negócio
            </h1>
            <p className="text-xs md:text-sm text-[#AAB6CC] leading-relaxed max-w-xl">
              Este é o documento de referência que alimenta automaticamente os prompts de criação de conteúdo, design e código do seu site em ferramentas externas de IA.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => {
              const promptText = generateMasterPrompt(project);
              navigator.clipboard.writeText(promptText);
              setCopiedMegaPrompt(true);
              setTimeout(() => setCopiedMegaPrompt(false), 2500);
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4E8]/20 to-[#1769FF]/20 border border-[#00D4E8] text-xs font-bold text-[#00D4E8] hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            {copiedMegaPrompt ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Code2 className="w-4 h-4" />}
            <span>{copiedMegaPrompt ? 'Mega-Prompt Copiado!' : 'Copiar Mega-Prompt para IA'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#152342] hover:bg-[#203252] border border-[#203252] text-xs font-bold text-[#AAB6CC] hover:text-[#F5F7FF] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Briefing Copiado!' : 'Copiar Briefing'}</span>
          </button>

          <button
            onClick={() => setShowProjectDrawer(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-xs font-bold text-[#AAB6CC] hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Editar Dados</span>
          </button>
        </div>
      </div>

      {/* Main Briefing Sheet Paper Card */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-2xl overflow-hidden shadow-2xl">
        {/* Document Header Band */}
        <div className="bg-[#111B36] px-6 py-4 border-b border-[#203252] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D4E8]"></span>
            <span className="text-xs font-mono font-bold text-[#F5F7FF] uppercase tracking-wider">
              {project.name || 'BRIEFING DO SEU NEGÓCIO'}
            </span>
          </div>
          <span className="text-[11px] text-[#71809B] font-mono">
            {project.city ? `LOCAL: ${project.city.toUpperCase()}` : 'STATUS: PRONTO'}
          </span>
        </div>

        {/* Content sections */}
        <div className="p-6 md:p-8 space-y-8 text-xs">
          {/* Section 1: Business Identity */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] pb-1 border-b border-[#203252]">
              1. Identidade e Localização
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#111B36]/60 p-4 rounded-xl">
              <div>
                <span className="text-[#71809B] block font-semibold mb-1">Nome Comercial</span>
                <p className="text-[#F5F7FF] font-bold text-sm">{project.name || <em className="text-[#71809B] font-normal">Não informado</em>}</p>
              </div>
              <div>
                <span className="text-[#71809B] block font-semibold mb-1">Segmento</span>
                <p className="text-[#F5F7FF] font-medium">{project.segment || <em className="text-[#71809B] font-normal">Não informado</em>}</p>
              </div>
              <div>
                <span className="text-[#71809B] block font-semibold mb-1">Cidade & Região</span>
                <p className="text-[#F5F7FF] font-medium">{project.city ? `${project.city} ${project.region ? `(${project.region})` : ''}` : <em className="text-[#71809B] font-normal">Não informado</em>}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Conversion Channels */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] pb-1 border-b border-[#203252]">
              2. Canais de Conversão e Contato
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#111B36]/60 p-4 rounded-xl">
              <div>
                <span className="text-[#71809B] block font-semibold mb-1">WhatsApp de Vendas</span>
                <p className="text-[#22C55E] font-bold">{project.whatsapp || <em className="text-[#71809B] font-normal">Não informado</em>}</p>
              </div>
              <div>
                <span className="text-[#71809B] block font-semibold mb-1">Instagram</span>
                <p className="text-[#F5F7FF] font-medium">{project.instagram || <em className="text-[#71809B] font-normal">Não informado</em>}</p>
              </div>
              <div>
                <span className="text-[#71809B] block font-semibold mb-1">Endereço Físico</span>
                <p className="text-[#F5F7FF] font-medium truncate">{project.address || <em className="text-[#71809B] font-normal">Não informado</em>}</p>
              </div>
            </div>
          </div>

          {/* Section 3: Audience & Tone */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] pb-1 border-b border-[#203252]">
              3. Posicionamento, Público e Tom de Voz
            </h3>
            <div className="space-y-3 bg-[#111B36]/60 p-4 rounded-xl">
              <div>
                <span className="text-[#71809B] block font-semibold mb-1">Público-Alvo e Dores</span>
                <p className="text-[#F5F7FF] leading-relaxed">{project.targetAudience || <em className="text-[#71809B] font-normal">Definido no Módulo 01</em>}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#203252]/50">
                <div>
                  <span className="text-[#71809B] block font-semibold mb-1">Tom de Voz</span>
                  <p className="text-[#00D4E8] font-medium">{project.communicationTone || <em className="text-[#71809B] font-normal">Definido no Módulo 01</em>}</p>
                </div>
                <div>
                  <span className="text-[#71809B] block font-semibold mb-1">Objetivo Central do Site</span>
                  <p className="text-[#22C55E] font-medium">{project.siteGoal || <em className="text-[#71809B] font-normal">Definido no Módulo 01</em>}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] pb-1 border-b border-[#203252]">
              4. Catálogo de Serviços Estruturados ({project.services.length})
            </h3>
            {project.services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.services.map((srv, idx) => (
                  <div key={srv.id || idx} className="bg-[#111B36] border border-[#203252] p-4 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-mono text-[#00D4E8] font-bold">SERVIÇO 0{idx + 1}</span>
                    <h4 className="text-xs font-bold text-[#F5F7FF]">{srv.title}</h4>
                    <p className="text-[11px] text-[#AAB6CC] leading-relaxed">{srv.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-[#111B36]/40 border border-[#203252] rounded-xl text-center text-[#71809B]">
                Nenhum serviço cadastrado ainda. Preencha no Módulo 01 ou no Meu Projeto.
              </div>
            )}
          </div>

          {/* Section 5: Differentials */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] pb-1 border-b border-[#203252]">
              5. Diferenciais Competitivos
            </h3>
            {project.differentials.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.differentials.map((diff, idx) => (
                  <div key={idx} className="bg-[#111B36]/60 border border-[#203252] p-3 rounded-lg flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span className="text-xs text-[#F5F7FF] font-medium">{diff}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-[#111B36]/40 border border-[#203252] rounded-xl text-center text-[#71809B]">
                Nenhum diferencial cadastrado ainda. Preencha no Módulo 01 ou no Meu Projeto.
              </div>
            )}
          </div>

          {/* Section 6: Structured Visual Identity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#203252]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
                <Palette className="w-3.5 h-3.5" /> 6. Identidade Visual Estruturada (Fonte de Verdade)
              </h3>
              <span className="text-[10px] text-[#AAB6CC] font-mono">
                {vi.paletteSource === 'brand_logo' ? 'CORES DA LOGO' : 'PALETA PERSONALIZADA'}
              </span>
            </div>

            <div className="bg-[#111B36]/60 border border-[#203252] p-4 rounded-xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[#71809B] block font-semibold mb-1">Posicionamento Visual</span>
                  <p className="text-[#F5F7FF] font-bold">{vi.visualPositioning}</p>
                </div>
                <div>
                  <span className="text-[#71809B] block font-semibold mb-1">Personalidade</span>
                  <p className="text-[#F5F7FF] font-medium">{vi.visualPersonality}</p>
                </div>
                <div>
                  <span className="text-[#71809B] block font-semibold mb-1">Origem da Identidade</span>
                  <p className="text-[#00D4E8] font-medium">
                    {vi.paletteSource === 'brand_logo' ? 'Cores da Marca Informadas' : 'Direção Personalizada IA'}
                  </p>
                </div>
              </div>

              {/* Swatches */}
              <div>
                <span className="text-[#71809B] block font-semibold mb-2">Paleta de Cores e Interface</span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  <div className="bg-[#0B1535] p-2 rounded border border-[#203252] text-center">
                    <div className="w-full h-5 rounded mb-1 border border-[#203252]" style={{ backgroundColor: vi.primary }} />
                    <span className="text-[9px] text-[#AAB6CC] block font-bold">Primary</span>
                    <span className="text-[9px] text-[#F5F7FF] font-mono">{vi.primary}</span>
                  </div>
                  <div className="bg-[#0B1535] p-2 rounded border border-[#203252] text-center">
                    <div className="w-full h-5 rounded mb-1 border border-[#203252]" style={{ backgroundColor: vi.secondary }} />
                    <span className="text-[9px] text-[#AAB6CC] block font-bold">Secondary</span>
                    <span className="text-[9px] text-[#F5F7FF] font-mono">{vi.secondary}</span>
                  </div>
                  <div className="bg-[#0B1535] p-2 rounded border border-[#203252] text-center">
                    <div className="w-full h-5 rounded mb-1 border border-[#203252]" style={{ backgroundColor: vi.accent }} />
                    <span className="text-[9px] text-[#AAB6CC] block font-bold">Accent</span>
                    <span className="text-[9px] text-[#F5F7FF] font-mono">{vi.accent}</span>
                  </div>
                  <div className="bg-[#0B1535] p-2 rounded border border-[#203252] text-center">
                    <div className="w-full h-5 rounded mb-1 border border-[#203252]" style={{ backgroundColor: vi.background }} />
                    <span className="text-[9px] text-[#AAB6CC] block font-bold">Fundo</span>
                    <span className="text-[9px] text-[#F5F7FF] font-mono">{vi.background}</span>
                  </div>
                  <div className="bg-[#0B1535] p-2 rounded border border-[#203252] text-center">
                    <div className="w-full h-5 rounded mb-1 border border-[#203252]" style={{ backgroundColor: vi.textPrimary }} />
                    <span className="text-[9px] text-[#AAB6CC] block font-bold">Texto</span>
                    <span className="text-[9px] text-[#F5F7FF] font-mono">{vi.textPrimary}</span>
                  </div>
                  <div className="bg-[#0B1535] p-2 rounded border border-[#203252] text-center">
                    <div className="w-full h-5 rounded mb-1 border border-[#203252]" style={{ backgroundColor: vi.ctaPrimary }} />
                    <span className="text-[9px] text-[#AAB6CC] block font-bold">CTA Ação</span>
                    <span className="text-[9px] text-[#F5F7FF] font-mono">{vi.ctaPrimary}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA Band */}
        <div className="bg-[#111B36] p-6 border-t border-[#203252] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#AAB6CC]">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>Dados consolidados e prontos para alimentar a geração com IA.</span>
          </div>

          <button
            onClick={handleApproveAndProceed}
            className="btn-cta w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>USAR ESTE BRIEFING NAS PRÓXIMAS ETAPAS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
