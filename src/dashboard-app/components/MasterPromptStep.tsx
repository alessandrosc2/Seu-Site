import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight, 
  Code2, 
  Layers, 
  FileText, 
  Lightbulb, 
  CheckCircle2, 
  Zap,
  Info
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { generateMasterPrompt } from '../utils/visualIdentityGenerator';

interface MasterPromptStepProps {
  onComplete?: () => void;
}

export const MasterPromptStep: React.FC<MasterPromptStepProps> = ({ onComplete }) => {
  const { project, completeStep, isStepCompleted } = useProject();
  const isCompleted = isStepCompleted('05-01');

  const [copied, setCopied] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);

  const masterPromptText = generateMasterPrompt(project);

  const handleCopy = () => {
    navigator.clipboard.writeText(masterPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCompleteAndAdvance = () => {
    completeStep('05-01', true);
    if (onComplete) onComplete();
  };

      const recommendedTools = [
    {
      name: 'Google Antigravity',
      model: 'Advanced Agentic Coding',
      url: 'https://github.com/google/antigravity',
      badge: 'Orquestrador Absoluto',
      desc: 'Agente de IA do Google operando nativamente para construir o código do zero (o mesmo que construiu este painel).'
    },
    {
      name: 'Google AI Studio',
      model: 'Gemini 1.5 Pro / Flash',
      url: 'https://aistudio.google.com',
      badge: '100% Gratuito',
      desc: 'Janela de contexto gigante (2M tokens), permite prototipar a página completa sem bater limites de uso.'
    },
    {
      name: 'Arena.ai',
      model: 'Multi-Modelos IA',
      url: 'https://arena.ai/',
      badge: 'Gratuito / Testes',
      desc: 'Plataforma comprovada para testar e comparar os melhores modelos de IA gerando código com rapidez e sem custos.'
    },
    {
      name: 'Lovable',
      model: 'Construtor IA Premium',
      url: 'https://lovable.dev/',
      badge: 'Exige Plano Pago',
      desc: 'Um dos melhores construtores visuais de IA do mercado atualmente. Possui excelente design, mas exige plano pago.'
    },
    {
      name: 'ChatGPT',
      model: 'GPT-4o / o1',
      url: 'https://chatgpt.com/',
      badge: 'Exige Plano Pago',
      desc: 'O mais popular e acessível. Excelente para código, mas gerar um site inteiro sem travar pelo limite exige a assinatura Plus.'
    },
    {
      name: 'Claude Artifacts',
      model: 'Claude 3.5 Sonnet',
      url: 'https://claude.ai',
      badge: 'Exige Plano Pago',
      desc: 'Gera código React + Tailwind incrível no painel visual (Artifacts). O limite gratuito é baixo para sites inteiros.'
    },
    {
      name: 'Manus',
      model: 'Agente Autônomo',
      url: 'https://manus.im/app',
      badge: 'Exige Plano Pago',
      desc: 'Agente autônomo inovador capaz de programar e estruturar projetos complexos. O uso intenso requer plano pago.',
      tip: 'Cada indicação te dá +500 tokens. Dá para criar o site grátis usando os 1800 tokens de cadastro + indicações falsas ou reais (gmail, hotmail). 5 indicações = 2500 tokens!'
    }
  ];

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* 1. HERO BANNER DA ETAPA CENTRAL */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-6 md:p-8 relative overflow-hidden glow-cyan-subtle">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold bg-[#152342] text-[#00D4E8] border border-[#203252]">
            <Sparkles className="w-4 h-4" />
            <span>ETAPA CENTRAL — CONSTRUÇÃO DO SITE</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-[#F5F7FF] tracking-tight">
            Gere Seu Site Profissional com IA
          </h1>

          <p className="text-base text-[#AAB6CC] max-w-3xl leading-relaxed">
            O <strong>Meu Negócio Online</strong> consolidou automaticamente todas as suas decisões (dados do negócio, catálogo de serviços, diferenciais, textos persuasivos, paleta cromática, tipografia e regras WCAG AA) no <strong>Prompt Mestre Final de 25 seções</strong>.
          </p>

          {/* 3-Step Formula Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00D4E8]/10 text-[#00D4E8] flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <div className="text-sm">
                <span className="font-bold text-[#F5F7FF] block">Copiar Prompt</span>
                <span className="text-[#AAB6CC]">Clique no botão verde abaixo</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00D4E8]/10 text-[#00D4E8] flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <div className="text-sm">
                <span className="font-bold text-[#F5F7FF] block">Anexar Imagens</span>
                <span className="text-[#AAB6CC]">Fotos preparadas na Etapa 04</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080D20] border border-[#203252] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00E599]/10 text-[#00E599] flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div className="text-sm">
                <span className="font-bold text-[#00E599] block">Colar na IA = Site Pronto</span>
                <span className="text-[#AAB6CC]">No Claude, Arena.ai, Manus ou AI Studio</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CARD DO PROMPT MESTRE COM BOTÃO EM DESTAQUE */}
      <div className="bg-[#080D20] border-2 border-[#00D4E8]/40 rounded-2xl p-5 md:p-7 space-y-5 shadow-xl shadow-[#00D4E8]/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#203252]">
          <div className="space-y-1">
            <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              <span>Prompt Mestre Final de 25 Seções (Consolidado)</span>
            </span>
            <p className="text-sm text-[#AAB6CC]">
              Especificação técnica completa com regras anti-invenção, WCAG AA, H1 único e SEO local.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="btn-cta px-6 py-3 rounded-xl font-bold text-sm md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#00D4E8]/30 shrink-0 transform active:scale-95 transition-transform"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-[#00E599]" />
                <span className="text-[#00E599]">PROMPT COPIADO COM SUCESSO!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>COPIAR PROMPT MESTRE FINAL</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt Preview Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-[#71809B]">
            <span>Prévia do briefing de execução técnica:</span>
            <button
              type="button"
              onClick={() => setShowFullCode(!showFullCode)}
              className="text-[#00D4E8] hover:underline font-semibold cursor-pointer"
            >
              {showFullCode ? 'Recolher visualização' : 'Expandir prompt completo (25 seções)'}
            </button>
          </div>

          <div className={`bg-[#050914] border border-[#203252] rounded-xl p-4 font-mono text-sm text-[#F5F7FF] leading-relaxed whitespace-pre-wrap overflow-y-auto ${
            showFullCode ? 'max-h-[600px]' : 'max-h-56'
          }`}>
            {masterPromptText}
          </div>
        </div>

        <div className="p-3.5 bg-[#111B36] border border-[#203252] rounded-xl text-sm text-[#AAB6CC] flex items-center gap-2.5">
          <Info className="w-5 h-5 text-[#00D4E8] shrink-0" />
          <span>
            <strong>Lembrete importante:</strong> Caso tenha fotos reais ou imagens geradas na Etapa 04, anexe-as no chat da IA junto com o prompt. O prompt já instrui a IA a tratá-las como referências visuais oficiais.
          </span>
        </div>
      </div>

      {/* 3. FERRAMENTAS DE IA RECOMENDADAS */}
      <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span>Onde colar o Prompt Mestre: Melhores IAs de Criação de Sites</span>
          </h4>
          <p className="text-sm text-[#AAB6CC] mt-1">
            Escolha uma das plataformas abaixo, cole o Prompt Mestre e assista o site ser programado em segundos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {recommendedTools.map((tool, idx) => (
            <a
              key={idx}
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-[#111B36] border border-[#203252] hover:border-[#00D4E8]/60 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#F5F7FF] group-hover:text-[#00D4E8] transition-colors flex items-center gap-1.5">
                    {tool.name}
                    <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#00D4E8]/10 text-[#00D4E8] font-bold">
                    {tool.badge}
                  </span>
                </div>
                <span className="text-sm font-mono text-[#00E599] block">{tool.model}</span>
                <p className="text-sm text-[#AAB6CC] leading-relaxed">{tool.desc}</p>
                  {(tool as any).tip && (
                    <div className="mt-3 p-3 rounded-lg bg-[#00E599]/10 border border-[#00E599]/20">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#AAB6CC] leading-relaxed">
                          <strong className="text-[#00E599]">Dica de Ouro:</strong> {(tool as any).tip}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

              <div className="mt-3 pt-2 border-t border-[#203252]/60 text-sm text-[#00D4E8] font-semibold flex items-center gap-1">
                <span>Abrir {tool.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 4. DICAS PARA AJUSTES RÁPIDOS NA IA */}
      <div className="bg-[#0B1535] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
          <Lightbulb className="w-5 h-5 text-[#F59E0B]" />
          <span>Como refinar o resultado na IA externa (se necessário)</span>
        </div>
        <p className="text-sm text-[#AAB6CC] leading-relaxed">
          Se a ferramenta gerar o site mas você quiser algum pequeno ajuste, basta enviar comandos simples no mesmo chat:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-sm text-[#F5F7FF]">
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Ajustar espaçamento:</span>
            <span className="text-[#AAB6CC]">"Aumente o espaçamento vertical entre a seção de Serviços e Diferenciais."</span>
          </div>
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Ajustar botão:</span>
            <span className="text-[#AAB6CC]">"Garanta que o botão flutuante de WhatsApp não cubra textos no celular."</span>
          </div>
          <div className="p-3 bg-[#080D20] border border-[#203252] rounded-lg">
            <span className="text-[#00D4E8] font-bold block mb-1">Trocar ícone:</span>
            <span className="text-[#AAB6CC]">"No card de corte de cabelo, utilize o ícone Scissors da Lucide."</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 bg-[#0B1535] border border-[#203252] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-[#71809B]">
          <ShieldCheck className="w-5 h-5 text-[#00E599]" />
          <span>{isCompleted ? '✓ Prompt gerado e marcado como concluído.' : 'Copie o prompt, gere na sua IA e avance para a Revisão & Publicação.'}</span>
        </div>

        <button
          type="button"
          onClick={handleCompleteAndAdvance}
          className="btn-cta px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shrink-0 shadow-lg shadow-[#00D4E8]/20"
        >
          <span>Avançar para Revisão & Publicação</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};




