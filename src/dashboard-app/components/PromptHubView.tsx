import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Search, 
  Filter, 
  ExternalLink, 
  ArrowRight, 
  BookOpen, 
  Code2, 
  TrendingUp, 
  Layers, 
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { ALL_HUB_PROMPTS, PROMPT_CATEGORIES } from '../data/promptLibrary';
import { HubPrompt } from '../types/project';

export const PromptHubView: React.FC = () => {
  const { project, goToStep, goToDashboard } = useProject();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (prompt: HubPrompt) => {
    const text = prompt.generatePrompt(project);
    navigator.clipboard.writeText(text);
    setCopiedId(prompt.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const filteredPrompts = ALL_HUB_PROMPTS.filter(p => {
    const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header Banner */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-6 md:p-8 relative overflow-hidden glow-cyan-subtle">
        <div className="absolute -right-10 -top-10 w-72 h-72 bg-gradient-to-br from-[#00D4E8]/10 via-[#1769FF]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-bold bg-[#152342] text-[#00D4E8] border border-[#203252] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>CENTRAL DE PROMPTS GUIADOS</span>
            </span>
            <span className="text-sm text-[#71809B]">•</span>
            <span className="text-sm font-medium text-[#AAB6CC]">
              Valores do seu projeto ({project.name || 'Seu Negócio'}) injetados automaticamente
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-[#F5F7FF] tracking-tight">
            Biblioteca de Prompts Prontos para IA
          </h1>

          <p className="text-base md:text-base text-[#AAB6CC] max-w-2xl leading-relaxed">
            Aqui você encontra todos os comandos pré-estruturados para alimentar o ChatGPT, Claude, Gemini ou Lovable. Basta clicar em <strong className="text-[#00D4E8]">Copiar Prompt</strong> e colar na IA.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-2xl p-4 md:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#71809B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar por título, objetivo ou palavra-chave..."
              className="w-full bg-[#080D20] border border-[#203252] rounded-xl pl-10 pr-4 py-2.5 text-sm md:text-sm text-[#F5F7FF] placeholder-[#71809B] focus:border-[#00D4E8] focus:outline-none transition-colors"
            />
          </div>

          {/* Quick Counter */}
          <div className="text-sm text-[#AAB6CC] font-semibold bg-[#111B36] px-3.5 py-2.5 rounded-xl border border-[#203252] text-center shrink-0">
            {filteredPrompts.length} {filteredPrompts.length === 1 ? 'prompt encontrado' : 'prompts encontrados'}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm">
          {PROMPT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00D4E8] text-black shadow-md shadow-[#00D4E8]/20'
                    : 'bg-[#111B36] text-[#AAB6CC] hover:text-[#F5F7FF] hover:bg-[#152342] border border-[#203252]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="space-y-6">
        {filteredPrompts.map((prompt) => {
          const generatedText = prompt.generatePrompt(project);
          const isCopied = copiedId === prompt.id;

          return (
            <div 
              key={prompt.id}
              className="bg-[#0B1535] border border-[#203252] hover:border-[#00D4E8]/40 rounded-2xl p-5 md:p-6 space-y-4 transition-all"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#111B36] text-[#00D4E8] border border-[#203252]">
                      {prompt.categoryLabel}
                    </span>
                    <span className="text-sm text-[#71809B]">•</span>
                    <span className="text-sm text-[#AAB6CC] font-mono">
                      Recomendado: {prompt.recommendedAi}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-lg font-bold text-[#F5F7FF]">
                    {prompt.title}
                  </h3>

                  <p className="text-sm md:text-sm text-[#AAB6CC]">
                    {prompt.objective}
                  </p>
                </div>

                {/* Primary Copy Button */}
                <button
                  type="button"
                  onClick={() => handleCopy(prompt)}
                  className={`btn-cta px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md transition-all ${
                    isCopied ? 'bg-[#22C55E] text-white' : ''
                  }`}
                >
                  {isCopied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5" />}
                  <span>{isCopied ? 'Copiado para Transferência!' : 'Copiar Prompt'}</span>
                </button>
              </div>

              {/* Injected Prompt Box */}
              <div className="relative">
                <div className="bg-[#080D20] border border-[#203252] rounded-xl p-4 font-mono text-sm text-[#AAB6CC] max-h-52 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                  {generatedText}
                </div>
              </div>

              {/* Card Footer: Instructions & Link to Step */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-sm border-t border-[#203252]/60">
                <div className="flex items-center gap-2 text-[#71809B]">
                  <span>Quando usar:</span>
                  <span className="text-[#AAB6CC] font-medium">{prompt.whenToUse}</span>
                </div>

                {prompt.linkedStepId && (
                  <button
                    type="button"
                    onClick={() => goToStep(prompt.linkedStepId!)}
                    className="inline-flex items-center gap-1.5 text-[#00D4E8] hover:underline font-semibold cursor-pointer self-start sm:self-auto"
                  >
                    <span>Ir para a etapa correspondente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filteredPrompts.length === 0 && (
          <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-12 text-center space-y-3">
            <Search className="w-8 h-8 text-[#71809B] mx-auto" />
            <h3 className="text-lg font-bold text-[#F5F7FF]">Nenhum prompt encontrado</h3>
            <p className="text-sm text-[#AAB6CC]">
              Tente buscar por outro termo ou selecione "Todos os Prompts".
            </p>
            <button
              onClick={() => { setSelectedCategory('todos'); setSearchTerm(''); }}
              className="px-4 py-2 rounded-lg bg-[#152342] text-sm font-semibold text-[#00D4E8] cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Back to dashboard footer */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={goToDashboard}
          className="px-6 py-2.5 rounded-xl bg-[#111B36] hover:bg-[#152342] border border-[#203252] text-sm font-semibold text-[#AAB6CC] hover:text-[#00D4E8] transition-colors cursor-pointer"
        >
          ← Voltar para o Painel Geral
        </button>
      </div>
    </div>
  );
};

