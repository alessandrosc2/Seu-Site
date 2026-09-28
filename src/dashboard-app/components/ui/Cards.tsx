import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Lightbulb, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  HelpCircle,
  BookOpen,
  Send
} from 'lucide-react';

export const LessonHeader: React.FC<{
  moduleNumber: string;
  moduleName: string;
  stepNumber: string;
  stepTitle: string;
  shortDesc: string;
  isCompleted?: boolean;
}> = ({ moduleNumber, moduleName, stepNumber, stepTitle, shortDesc, isCompleted }) => {
  return (
    <div className="border-b border-[#203252] pb-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-sm font-semibold rounded-md bg-[#152342] text-[#00D4E8] border border-[#203252]">
            MÓDULO {moduleNumber} — {moduleName.toUpperCase()}
          </span>
          <span className="text-sm text-[#71809B]">/</span>
          <span className="text-sm font-medium text-[#AAB6CC]">
            ETAPA {stepNumber}
          </span>
        </div>
        {isCompleted && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>Etapa Concluída</span>
          </div>
        )}
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#F5F7FF] tracking-tight mb-2">
        {stepTitle}
      </h1>
      <p className="text-lg text-[#AAB6CC] max-w-3xl leading-relaxed">
        {shortDesc}
      </p>
    </div>
  );
};

export const InfoCard: React.FC<{
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, children, icon }) => {
  return (
    <div className="bg-[#111B36] border border-[#203252] rounded-xl p-5 my-4">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-[#152342] text-[#00D4E8] shrink-0 mt-0.5">
          {icon || <BookOpen className="w-5 h-5" />}
        </div>
        <div className="space-y-1">
          {title && <h4 className="text-base font-semibold text-[#F5F7FF]">{title}</h4>}
          <div className="text-base text-[#AAB6CC] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const TipCard: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title = 'Dica Prática', children }) => {
  return (
    <div className="bg-[#111B36]/80 border border-[#00D4E8]/30 rounded-xl p-4 my-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#00D4E8]"></div>
      <div className="flex items-start gap-3 pl-1">
        <div className="p-1.5 rounded-md bg-[#00D4E8]/10 text-[#00D4E8] shrink-0 mt-0.5">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#00D4E8]">{title}</h4>
          <div className="text-base text-[#F5F7FF] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const WarningCard: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title = 'Atenção Importante', children }) => {
  return (
    <div className="bg-[#111B36]/90 border border-[#F59E0B]/40 rounded-xl p-4 my-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#F59E0B]"></div>
      <div className="flex items-start gap-3 pl-1">
        <div className="p-1.5 rounded-md bg-[#F59E0B]/10 text-[#F59E0B] shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#F59E0B]">{title}</h4>
          <div className="text-base text-[#F5F7FF] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const ExampleCard: React.FC<{
  good: string;
  bad?: string;
  explanation?: string;
}> = ({ good, bad, explanation }) => {
  return (
    <div className="bg-[#111B36] border border-[#203252] rounded-xl p-5 my-5">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-5 h-5 text-[#00D4E8]" />
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#AAB6CC]">Exemplo Real de Aplicação</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bad && (
          <div className="bg-[#0B1535] border border-[#EF4444]/30 rounded-lg p-3.5">
            <div className="text-sm font-bold text-[#EF4444] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>✕ O que evitar</span>
            </div>
            <p className="text-base text-[#AAB6CC] whitespace-pre-line italic">
              "{bad}"
            </p>
          </div>
        )}

        <div className={`bg-[#0B1535] border border-[#22C55E]/40 rounded-lg p-3.5 ${!bad ? 'md:col-span-2' : ''}`}>
          <div className="text-sm font-bold text-[#22C55E] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <span>✓ Recomendado</span>
          </div>
          <p className="text-base text-[#F5F7FF] whitespace-pre-line font-medium">
            "{good}"
          </p>
        </div>
      </div>

      {explanation && (
        <p className="text-sm text-[#71809B] mt-3">
          {explanation}
        </p>
      )}
    </div>
  );
};

export const TaskCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div className="bg-[#111B36] border border-[#203252] rounded-xl p-6 my-6 glow-cyan-subtle">
      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#203252]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#00D4E8]"></div>
        <h3 className="text-lg font-bold text-[#F5F7FF] uppercase tracking-wider">
          Sua Tarefa: {title}
        </h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export const PromptBlock: React.FC<{
  title: string;
  objective: string;
  whenToUse: string;
  promptText: string;
  instructions: string[];
  onSaveOutput?: (text: string) => void;
  onChange?: (text: string) => void;
  savedOutput?: string;
  outputPlaceholder?: string;
}> = ({
  title,
  objective,
  whenToUse,
  promptText,
  instructions,
  onSaveOutput,
  onChange,
  savedOutput = '',
  outputPlaceholder = 'Cole aqui a resposta gerada pela IA para guardar no seu projeto...'
}) => {
  const [copied, setCopied] = useState(false);
  const [currentText, setCurrentText] = useState(savedOutput);
  const [isSaved, setIsSaved] = useState(false);

  // Synchronize currentText whenever savedOutput or prompt changes
  useEffect(() => {
    setCurrentText(savedOutput || '');
    setCopied(false);
    setIsSaved(false);
  }, [savedOutput, promptText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    if (onSaveOutput) {
      onSaveOutput(currentText);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="bg-[#0B1535] border border-[#203252] rounded-xl overflow-hidden my-6">
      {/* Header bar */}
      <div className="bg-[#111B36] px-5 py-4 border-b border-[#203252] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-[#00D4E8]/10 text-[#00D4E8]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#00D4E8] block">
              Ferramenta de IA
            </span>
            <h4 className="text-base font-bold text-[#F5F7FF]">{title}</h4>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            copied
              ? 'bg-[#22C55E] text-white'
              : 'bg-[#152342] text-[#00D4E8] hover:bg-[#203252] border border-[#203252]'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copiado com Sucesso!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>COPIAR PROMPT</span>
            </>
          )}
        </button>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-[#0e1736] border-b border-[#203252] text-sm">
        <div>
          <span className="text-[#71809B] block mb-1 font-semibold uppercase tracking-wider">Objetivo</span>
          <p className="text-[#F5F7FF] font-medium">{objective}</p>
        </div>
        <div>
          <span className="text-[#71809B] block mb-1 font-semibold uppercase tracking-wider">Quando Usar</span>
          <p className="text-[#AAB6CC]">{whenToUse}</p>
        </div>
      </div>

      {/* Prompt Body */}
      <div className="p-5">
        <div className="relative">
          <label className="text-sm uppercase tracking-wider font-semibold text-[#71809B] mb-2 block">
            Prompt Customizado com os dados do seu projeto:
          </label>
          <div className="bg-[#080D20] border border-[#203252] rounded-lg p-4 text-sm font-mono text-[#F5F7FF] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
            {promptText}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-5 pt-4 border-t border-[#203252]">
          <h5 className="text-sm font-semibold text-[#00D4E8] uppercase tracking-wider mb-2.5">
            Como Utilizar Passo a Passo:
          </h5>
          <ol className="space-y-1.5 text-sm text-[#AAB6CC]">
            {instructions.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#00D4E8] font-bold shrink-0">{idx + 1}.</span>
                <span>{step.replace(/^\d+\.\s*/, '')}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Result collector */}
        {onSaveOutput && (
          <div className="mt-5 pt-4 border-t border-[#203252]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-[#F5F7FF]">
                Resultado gerado pela IA (Cole aqui para salvar no seu projeto):
              </label>
              {isSaved && (
                <span className="text-sm text-[#22C55E] flex items-center gap-1">
                  <Check className="w-4 h-4" /> Salvo no projeto!
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={currentText}
              onChange={(e) => {
                const val = e.target.value;
                setCurrentText(val);
                if (onChange) onChange(val);
              }}
              placeholder={outputPlaceholder}
              className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-3 text-sm text-[#F5F7FF] placeholder-[#71809B] focus:border-[#00D4E8] focus:outline-none transition-colors"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleSave}
                className="px-3.5 py-1.5 rounded-lg bg-[#152342] text-sm font-semibold text-[#00D4E8] hover:bg-[#203252] border border-[#203252] transition-colors"
              >
                Salvar Resultado no Projeto
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const OrientationBar: React.FC<{
  whereAmI: string;
  whatToDo: string;
  howToDo: string;
  whatIsProduced: string;
  whatComesNext: string;
}> = ({ whereAmI, whatToDo, howToDo, whatIsProduced, whatComesNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#111B36] border border-[#203252] rounded-xl p-4 mb-6">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00D4E8]"></div>
          <span className="text-sm font-bold uppercase tracking-wider text-[#F5F7FF]">
            Bússola da Etapa — 5 Perguntas de Orientação
          </span>
        </div>
        <span className="text-sm text-[#00D4E8] hover:underline font-medium">
          {isOpen ? 'Ocultar Detalhes' : 'Ver Guia Rápido'}
        </span>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4 pt-3 border-t border-[#203252] text-sm">
          <div className="p-2.5 rounded-lg bg-[#0B1535]">
            <span className="text-[#00D4E8] font-bold block mb-1">1. Onde estou?</span>
            <p className="text-[#AAB6CC]">{whereAmI}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0B1535]">
            <span className="text-[#00D4E8] font-bold block mb-1">2. O que fazer?</span>
            <p className="text-[#AAB6CC]">{whatToDo}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0B1535]">
            <span className="text-[#00D4E8] font-bold block mb-1">3. Como faço?</span>
            <p className="text-[#AAB6CC]">{howToDo}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0B1535]">
            <span className="text-[#00D4E8] font-bold block mb-1">4. O que será produzido?</span>
            <p className="text-[#F5F7FF] font-medium">{whatIsProduced}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#0B1535]">
            <span className="text-[#00D4E8] font-bold block mb-1">5. O que vem depois?</span>
            <p className="text-[#AAB6CC]">{whatComesNext}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const NextStepCard: React.FC<{
  title: string;
  desc?: string;
  onAdvance: () => void;
  isCompleted?: boolean;
}> = ({ title, desc, onAdvance, isCompleted }) => {
  return (
    <div className="bg-[#111B36] border border-[#203252] rounded-xl p-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="space-y-1 text-center sm:text-left">
        <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
          {isCompleted ? '✓ Etapa Concluída' : 'Próxima Etapa'}
        </span>
        <h4 className="text-lg font-bold text-[#F5F7FF]">{title}</h4>
        {desc && <p className="text-sm text-[#AAB6CC]">{desc}</p>}
      </div>

      <button
        type="button"
        onClick={onAdvance}
        className="btn-cta px-6 py-3 rounded-xl font-bold text-base flex items-center gap-2.5 shrink-0 cursor-pointer"
      >
        <span>CONTINUAR</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
