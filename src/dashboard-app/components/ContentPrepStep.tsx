import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Search, 
  ArrowRight, 
  Save, 
  CheckCircle2, 
  Layers, 
  ShieldCheck,
  Lightbulb,
  Plus,
  Trash2
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { 
  sanitizeSingleHeadline, 
  sanitizeSingleSubheadline 
} from '../utils/visualIdentityGenerator';
import { FaqItem } from '../types/project';

interface ContentPrepStepProps {
  onComplete?: () => void;
}

export const ContentPrepStep: React.FC<ContentPrepStepProps> = ({ onComplete }) => {
  const { project, updateProject, completeStep, isStepCompleted } = useProject();
  const isCompleted = isStepCompleted('02-01');

  // Business info fallback
  const businessName = project.name ? project.name.trim() : 'Minha Empresa';
  const businessSegment = project.segment ? project.segment.trim() : 'Serviços Profissionais';
  const businessCity = project.city ? project.city.trim() : 'Brasil';

  // Local state for copy fields
  const [headline, setHeadline] = useState(
    project.heroHeadline || sanitizeSingleHeadline('', businessName, businessSegment)
  );
  const [subheadline, setSubheadline] = useState(
    project.heroSubheadline || sanitizeSingleSubheadline('', businessCity)
  );
  const [ctaLabel, setCtaLabel] = useState(project.ctaLabel || 'Falar no WhatsApp Agora');
  const [whatsappMsg, setWhatsappMsg] = useState(
    (project.stepOutputs && project.stepOutputs['04-03']) ||
    `Olá! Estive no site da ${businessName} e gostaria de agendar um atendimento.`
  );
  const [aboutText, setAboutText] = useState(
    project.aboutText ||
    `A ${businessName} nasceu com o propósito de oferecer serviços de excelência em ${businessSegment}, unindo técnica apurada, atendimento humanizado e foco em resolver os desafios dos nossos clientes com pontualidade e transparência.`
  );
  const [seoTitle, setSeoTitle] = useState(
    project.seoTitle || `${businessName} | ${businessSegment} em ${businessCity}`
  );
  const [seoDescription, setSeoDescription] = useState(
    project.seoDescription || `${headline}. Atendimento especializado em ${businessCity}. Fale conosco no WhatsApp.`
  );

  // FAQ items state
  const defaultFaqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Como faço para agendar um atendimento ou solicitar orçamento?',
      answer: 'Basta clicar em qualquer botão de WhatsApp na página para falar diretamente conosco em poucos minutos.'
    },
    {
      id: 'faq-2',
      question: 'Onde vocês estão localizados?',
      answer: project.address 
        ? `Nosso endereço físico é ${project.address}. Atendemos com agendamento prévio.`
        : `Atendemos em ${businessCity}. Entre em contato pelo WhatsApp para orientações e agendamento.`
    },
    {
      id: 'faq-3',
      question: 'Como funciona o atendimento?',
      answer: `Nosso atendimento em ${businessSegment} é focado em qualidade, pontualidade e satisfação do cliente. Fale conosco no WhatsApp para esclarecer qualquer dúvida.`
    }
  ];

  const [faqItems, setFaqItems] = useState<FaqItem[]>(
    project.faqItems && project.faqItems.length > 0 ? project.faqItems : defaultFaqs
  );

  const [isSaved, setIsSaved] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Prompt to refine copy with external AI
  const copyRefinementPrompt = `Você é um copywriter sênior especialista em websites institucionais de alta conversão.

Analise as informações do meu negócio:
Nome Comercial: ${businessName}
Segmento: ${businessSegment}
Cidade/Localização: ${businessCity}
Público-Alvo: ${project.targetAudience || 'Clientes locais exigentes'}
Tom de Comunicação: ${project.communicationTone || 'Profissional e acolhedor'}
Diferenciais: ${project.differentials && project.differentials.length > 0 ? project.differentials.join(', ') : 'Excelência e pontualidade'}
Serviços: ${project.services && project.services.length > 0 ? project.services.map(s => s.title).join(', ') : 'Serviços especializados'}

Escreva o pacote completo de copy para o site em versão única e definitiva:
1. Headline do Hero (título H1 magnético, claro e sem jargões - forneça apenas A MELHOR OPÇÃO)
2. Subheadline de apoio (2 a 3 linhas persuasivas que quebram hesitações e convidam para o WhatsApp)
3. Chamada do Botão CTA (ex: "Falar no WhatsApp Agora")
4. Texto da seção Sobre Nós (2 parágrafos humanizados valorizando a trajetória e o compromisso)
5. 3 Perguntas Frequentes (FAQ) essenciais para eliminar objeções do cliente antes do contato
6. SEO Local: Title tag (máx 60 caracteres) e Meta Description (máx 150 caracteres)

Entregue apenas os textos finais prontos para uso, sem opções alternativas e sem inventar dados que não foram fornecidos.`;

  const handleSave = () => {
    updateProject({
      heroHeadline: headline,
      heroSubheadline: subheadline,
      ctaLabel: ctaLabel,
      aboutText: aboutText,
      seoTitle: seoTitle,
      seoDescription: seoDescription,
      faqItems: faqItems,
      stepOutputs: {
        ...(project.stepOutputs || {}),
        '04-03': whatsappMsg
      }
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleSaveAndAdvance = () => {
    handleSave();
    completeStep('02-01', true);
    if (onComplete) onComplete();
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(copyRefinementPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleAddFaq = () => {
    const newItem: FaqItem = {
      id: `faq-${Date.now()}`,
      question: 'Nova pergunta frequente...',
      answer: 'Resposta objetiva e clara para o cliente...'
    };
    setFaqItems([...faqItems, newItem]);
  };

  const handleRemoveFaq = (id: string) => {
    setFaqItems(faqItems.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 shadow-lg shadow-black/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4E8] to-[#1769FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#00D4E8]/20">
              <FileText className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00D4E8]">
                  Estúdio Unificado de Conteúdo
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00E599]/10 text-[#00E599] font-bold">
                  Gerado a Partir do Seu Projeto
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-[#F5F7FF]">
                Revise os Textos Oficiais do Seu Site
              </h3>
              <p className="text-xs text-[#AAB6CC] leading-relaxed max-w-2xl">
                Os textos abaixo foram gerados automaticamente com base nas informações de <strong>{businessName}</strong>. Você não precisa passar por 10 etapas separadas: revise tudo em um só lugar ou personalize como desejar.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyPrompt}
            className="px-4 py-2.5 rounded-xl bg-[#080D20] hover:bg-[#152342] border border-[#203252] hover:border-[#00D4E8]/50 text-xs font-bold text-[#00D4E8] flex items-center justify-center gap-2 shrink-0 cursor-pointer transition-all"
            title="Copiar prompt para o ChatGPT ou Claude refinar"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-4 h-4 text-[#00E599]" />
                <span className="text-[#00E599]">Prompt Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Prompt para IA de Copywriting</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. SEÇÃO HERO COPY (H1 Único, Subheadline & CTA) */}
      <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#203252]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>1. Seção Hero (Apresentação Principal do Topo)</span>
          </h4>
          <span className="text-[10px] text-[#00E599] font-bold bg-[#00E599]/10 px-2 py-0.5 rounded">
            Regra: H1 Único
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#AAB6CC] mb-1 font-semibold">
              Headline Principal (Hero H1) — A frase mais lida do site *
            </label>
            <input
              type="text"
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              placeholder="Ex: Barbearia Clássica e Barboterapia de Alto Padrão em Boa Viagem"
              className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-3 text-xs md:text-sm font-bold text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
            <span className="text-[10px] text-[#71809B] mt-1 block">
              Mantenha apenas uma frase de impacto direta (máximo 12 a 15 palavras). Não cole listas de alternativas.
            </span>
          </div>

          <div>
            <label className="block text-xs text-[#AAB6CC] mb-1 font-semibold">
              Subheadline de Sustentação — Parágrafo de 2 a 3 linhas logo abaixo do título
            </label>
            <textarea
              rows={2}
              value={subheadline}
              onChange={e => setSubheadline(e.target.value)}
              placeholder="Ex: Atendimento com horário marcado, ambiente climatizado e profissionais que valorizam cada detalhe..."
              className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-3 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#AAB6CC] mb-1 font-semibold">
                Chamada do Botão CTA Principal
              </label>
              <input
                type="text"
                value={ctaLabel}
                onChange={e => setCtaLabel(e.target.value)}
                placeholder="Ex: Agendar Horário no WhatsApp"
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#AAB6CC] mb-1 font-semibold">
                Mensagem Inicial Pré-Formatada do WhatsApp
              </label>
              <input
                type="text"
                value={whatsappMsg}
                onChange={e => setWhatsappMsg(e.target.value)}
                placeholder="Ex: Olá! Estive no site da Barbearia Real e gostaria de agendar um horário."
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEÇÃO SOBRE NÓS */}
      <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#203252]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>2. Seção Sobre Nós & Trajetória Institucional</span>
          </h4>
          <span className="text-[11px] text-[#71809B]">Humaniza a marca e gera conexão</span>
        </div>

        <div>
          <label className="block text-xs text-[#AAB6CC] mb-1 font-semibold">
            Texto de Apresentação (História, Valores e Compromisso)
          </label>
          <textarea
            rows={4}
            value={aboutText}
            onChange={e => setAboutText(e.target.value)}
            placeholder="Conte resumidamente como a empresa começou, a dedicação ao cliente e o compromisso diário..."
            className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-3 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none leading-relaxed"
          />
        </div>
      </div>

      {/* 3. CATÁLOGO DE SERVIÇOS E DIFERENCIAIS (VISUALIZAÇÃO CONSOLIDADA) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Serviços */}
        <div className="p-5 bg-[#080D20] border border-[#203252] rounded-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
              Serviços Cadastrados ({project.services.length})
            </span>
            <span className="text-[10px] text-[#71809B]">Vindo de Meu Projeto</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {project.services.length === 0 ? (
              <p className="text-xs text-[#71809B] italic">Nenhum serviço cadastrado em Meu Projeto.</p>
            ) : (
              project.services.map((s, i) => (
                <div key={s.id || i} className="p-2.5 rounded-lg bg-[#111B36] border border-[#203252]/60">
                  <span className="text-xs font-bold text-[#F5F7FF] block">{i + 1}. {s.title}</span>
                  <p className="text-[11px] text-[#AAB6CC] mt-0.5">{s.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Diferenciais */}
        <div className="p-5 bg-[#080D20] border border-[#203252] rounded-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00D4E8]">
              Diferenciais ({project.differentials.length})
            </span>
            <span className="text-[10px] text-[#71809B]">Vindo de Meu Projeto</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {project.differentials.length === 0 ? (
              <p className="text-xs text-[#71809B] italic">Nenhum diferencial cadastrado em Meu Projeto.</p>
            ) : (
              project.differentials.map((d, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#111B36] border border-[#203252]/60 flex items-center gap-2">
                  <span className="text-[#00E599] font-bold text-xs">✓</span>
                  <span className="text-xs text-[#F5F7FF]">{d}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 4. PERGUNTAS FREQUENTES (FAQ) */}
      <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#203252]">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>3. Perguntas Frequentes (FAQ em Accordion)</span>
            </h4>
            <p className="text-[11px] text-[#AAB6CC] mt-0.5">
              Eliminam as dúvidas e quebram objeções antes de o visitante chamar no WhatsApp.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddFaq}
            className="text-xs text-[#00D4E8] hover:underline flex items-center gap-1.5 font-bold cursor-pointer bg-[#00D4E8]/10 px-3 py-1.5 rounded-lg border border-[#00D4E8]/30"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Pergunta
          </button>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <div key={item.id} className="p-3.5 bg-[#111B36] border border-[#203252] rounded-xl space-y-2">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => {
                    const updated = [...faqItems];
                    updated[idx].question = e.target.value;
                    setFaqItems(updated);
                  }}
                  className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-xs font-bold text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                  placeholder="Pergunta do cliente..."
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(item.id)}
                  className="p-1.5 text-[#71809B] hover:text-[#EF4444] rounded-lg hover:bg-[#080D20] transition-colors cursor-pointer"
                  title="Remover pergunta"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={2}
                value={item.answer}
                onChange={(e) => {
                  const updated = [...faqItems];
                  updated[idx].answer = e.target.value;
                  setFaqItems(updated);
                }}
                className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-xs text-[#AAB6CC] focus:border-[#00D4E8] focus:outline-none leading-relaxed"
                placeholder="Resposta clara e objetiva..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* 5. SEO LOCAL (Title & Meta Description) */}
      <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#203252]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>4. Otimização SEO Local (Google)</span>
          </h4>
          <span className="text-[11px] text-[#71809B]">Como seu site aparecerá no Google</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[#AAB6CC] mb-1 font-semibold">
              Título da Página (Title Tag — máx 60 caracteres)
            </label>
            <input
              type="text"
              value={seoTitle}
              onChange={e => setSeoTitle(e.target.value)}
              placeholder="Ex: Barbearia Real | Barbearia em Boa Viagem Recife"
              className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-[#AAB6CC] mb-1 font-semibold">
              Descrição para o Google (Meta Description — máx 150 caracteres)
            </label>
            <input
              type="text"
              value={seoDescription}
              onChange={e => setSeoDescription(e.target.value)}
              placeholder="Ex: Conheça a Barbearia Real em Boa Viagem. Cortes de cabelo clássicos e barba simétrica com toalha quente..."
              className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-xs text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
          </div>
        </div>

        {/* Google Snippet Preview */}
        <div className="p-3.5 bg-[#111B36]/60 border border-[#203252] rounded-xl space-y-1">
          <span className="text-[10px] text-[#71809B] font-mono block">Prévia no Google:</span>
          <span className="text-xs font-bold text-[#38BDF8] block hover:underline cursor-pointer">
            {seoTitle || 'Título do Site'}
          </span>
          <span className="text-[10px] text-[#22C55E] block font-mono">
            {project.publishedUrl || 'https://seusite.vercel.app'}
          </span>
          <p className="text-[11px] text-[#AAB6CC] leading-relaxed line-clamp-2">
            {seoDescription || 'Descrição otimizada do seu negócio para busca local...'}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 bg-[#0B1535] border border-[#203252] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#71809B]">
          <ShieldCheck className="w-4 h-4 text-[#00E599]" />
          <span>{isCompleted ? '✓ Conteúdo aprovado no seu progresso.' : 'Revise os textos e avance para a Identidade Visual.'}</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl border border-[#203252] hover:bg-[#111B36] text-xs font-bold text-[#F5F7FF] transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-[#00E599]" />
                <span className="text-[#00E599]">Salvo!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Salvar Textos</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSaveAndAdvance}
            className="btn-cta px-6 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shrink-0 shadow-lg shadow-[#00D4E8]/20"
          >
            <span>Salvar e Avançar para o Visual</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
