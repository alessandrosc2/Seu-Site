import React, { useState } from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  MessageSquare, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Layers, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Search,
  Copy,
  Check
} from 'lucide-react';
import { PLANO_COMPLETO_MODULES } from '../data/curriculum';
import { useProject } from '../context/ProjectContext';
import { ALL_HUB_PROMPTS } from '../data/promptLibrary';

export const PlanoCompletoView: React.FC = () => {
  const { project, goToDashboard } = useProject();
  const [expandedId, setExpandedId] = useState<string | null>(PLANO_COMPLETO_MODULES[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const handleCopyScript = (promptId: string) => {
    const promptDef = ALL_HUB_PROMPTS.find(p => p.id === promptId);
    if (promptDef) {
      navigator.clipboard.writeText(promptDef.generatePrompt(project));
      setCopiedPromptId(promptId);
      setTimeout(() => setCopiedPromptId(null), 2500);
    }
  };

  const filtered = PLANO_COMPLETO_MODULES.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-6 md:p-8 relative overflow-hidden glow-cyan-subtle">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#00D4E8]/10 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#152342] text-[#00D4E8] border border-[#203252] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>EXPANSÃO DE HABILIDADE</span>
            </span>
            <span className="text-sm text-[#71809B]">|</span>
            <span className="text-sm font-medium text-[#AAB6CC]">21 Módulos Práticos</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-[#F5F7FF] tracking-tight">
            Plano Completo: Como Criar Sites para Clientes
          </h1>

          <p className="text-base text-[#AAB6CC] max-w-2xl leading-relaxed">
            Você aprendeu a colocar o seu próprio site no ar. Agora, descubra a metodologia prática para oferecer essa mesma solução como serviço profissional para profissionais liberais e negócios da sua região.
          </p>

          <div className="bg-[#0B1535] border border-[#203252] p-3 rounded-xl flex items-start gap-2.5 max-w-xl text-sm text-[#AAB6CC]">
            <ShieldAlert className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
            <span>
              <strong>Importante:</strong> Esta é uma expansão profissional da habilidade técnica. Não prometemos ganhos garantidos; seu resultado dependerá exclusivamente da sua dedicação, prospecção e execução de projetos.
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center justify-between gap-4 bg-[#0B1535] border border-[#203252] p-3 rounded-xl">
        <div className="flex items-center gap-2 text-sm text-[#AAB6CC] flex-1">
          <Search className="w-5 h-5 text-[#00D4E8]" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por módulo, prospecção, contrato ou entrega..."
            className="w-full bg-transparent text-sm text-[#F5F7FF] placeholder-[#71809B] focus:outline-none"
          />
        </div>
        <span className="text-sm font-mono text-[#71809B] shrink-0">
          {filtered.length} de {PLANO_COMPLETO_MODULES.length} módulos
        </span>
      </div>

      {/* Accordion List of Modules */}
      <div className="space-y-3">
        {filtered.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`border rounded-2xl transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-[#0B1535] border-[#00D4E8]/50 shadow-lg shadow-[#00D4E8]/5'
                  : 'bg-[#0B1535]/60 border-[#203252] hover:border-[#203252]'
              }`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-lg bg-[#111B36] border border-[#203252] flex items-center justify-center font-mono text-sm font-bold text-[#00D4E8] shrink-0 mt-0.5">
                    {item.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1769FF] bg-[#1769FF]/10 px-2 py-0.5 rounded border border-[#1769FF]/20">
                        Venda de Sites
                      </span>
                      <span className="text-sm text-[#71809B] font-mono">Módulo {item.number}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#F5F7FF]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-1 rounded-lg text-[#71809B] shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-[#00D4E8]" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-[#203252]/60 space-y-4 text-sm">
                  <p className="text-[#F5F7FF] leading-relaxed bg-[#111B36]/60 p-4 rounded-xl border border-[#203252]">
                    {item.desc}
                  </p>

                  {/* Module 05: WhatsApp Script Button */}
                  {item.id === 'pc-05' && (
                    <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#22C55E]/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#22C55E] flex items-center gap-1.5">
                          <MessageSquare className="w-5 h-5" /> Script Pronto de Abordagem no WhatsApp
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyScript('hp-11')}
                          className="btn-cta px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedPromptId === 'hp-11' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedPromptId === 'hp-11' ? 'Script Copiado!' : 'Copiar Script'}</span>
                        </button>
                      </div>
                      <p className="text-sm text-[#AAB6CC]">
                        Mensagem profissional e sem invasão para abordar negócios locais que possuem Instagram ou Google Meu Negócio sem site.
                      </p>
                    </div>
                  )}

                  {/* Module 07: Proposal Model */}
                  {item.id === 'pc-07' && (
                    <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#00D4E8]/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#00D4E8] flex items-center gap-1.5">
                          <FileText className="w-5 h-5" /> Modelo de Proposta Comercial em 1 Página
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyScript('hp-12')}
                          className="btn-cta px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedPromptId === 'hp-12' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedPromptId === 'hp-12' ? 'Proposta Copiada!' : 'Copiar Modelo'}</span>
                        </button>
                      </div>
                      <p className="text-sm text-[#AAB6CC]">
                        Proposta pronta com escopo fechado, prazos de entrega e condições de pagamento 50/50.
                      </p>
                    </div>
                  )}

                  {/* Module 10: Contract button */}
                  {item.id === 'pc-10' && (
                    <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#F59E0B]/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#F59E0B] flex items-center gap-1.5">
                          <ShieldAlert className="w-5 h-5" /> Minuta de Contrato com Cláusulas de Proteção
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyScript('hp-13')}
                          className="btn-cta px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedPromptId === 'hp-13' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedPromptId === 'hp-13' ? 'Contrato Copiado!' : 'Copiar Cláusulas'}</span>
                        </button>
                      </div>
                      <p className="text-sm text-[#AAB6CC]">
                        Contrato com cláusula anti-retrabalho infinito, limites de revisões e aprovação formal de etapas.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
