import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Globe, 
  Server, 
  Award, 
  Square, 
  CheckSquare,
  MapPin,
  Sparkles,
  ShieldCheck,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProject } from '../context/ProjectContext';

interface LaunchPadStepProps {
  onComplete?: () => void;
}

export const LaunchPadStep: React.FC<LaunchPadStepProps> = ({ onComplete }) => {
  const { completeStep, isStepCompleted, setActiveView } = useProject();
  const isCompleted = isStepCompleted('06-01');

  // Pre-launch checklist
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    nameCorrect: true,
    contactsCorrect: true,
    whatsappWorking: false,
    linksWorking: false,
    contentReviewed: true,
    responsiveChecked: false,
    ctaWorking: false,
    noFakeData: true,
    seoImplemented: true
  });

  const toggleItem = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCelebrate = () => {
    if (!isCompleted) {
      completeStep('06-01', false);
      if (onComplete) onComplete();
    }
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.55 }
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* 1. HERO BANNER */}
      <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-6 md:p-8 relative overflow-hidden glow-cyan-subtle">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold bg-[#152342] text-[#00E599] border border-[#203252]">
            <Award className="w-4 h-4" />
            <span>ETAPA 06 — REVISÃO E PRÓXIMOS PASSOS</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-[#F5F7FF] tracking-tight">
            Revisão e Próximos Passos
          </h1>

          <p className="text-base text-[#AAB6CC] max-w-2xl leading-relaxed">
            Seu site foi totalmente especificado e programado com inteligência artificial. Faça a checagem dos itens de qualidade antes de avançar para o registro de domínio e hospedagem.
          </p>
        </div>
      </div>

      {/* 2. CHECKLIST OBRIGATÓRIO PRÉ-PUBLICAÇÃO */}
      <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#203252]">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00E599]" />
              <span>1. Checklist Obrigatório Antes de Publicar</span>
            </h4>
            <p className="text-sm text-[#AAB6CC] mt-0.5">
              Marque cada verificação para garantir que seu site chegue impecável para os clientes:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {[
            { key: 'nameCorrect', label: 'Nome e segmento da empresa conferidos e corretos' },
            { key: 'contactsCorrect', label: 'Telefone e endereço físico conferidos' },
            { key: 'whatsappWorking', label: 'Botões de WhatsApp testados e abrindo a conversa comercial' },
            { key: 'linksWorking', label: 'Navegação por âncoras (#servicos, #sobre, #faq) funcionando' },
            { key: 'contentReviewed', label: 'Textos conferidos sem erros de digitação ou formatação' },
            { key: 'responsiveChecked', label: 'Visualizado em celular sem cortes laterais (Mobile-First)' },
            { key: 'ctaWorking', label: 'Botões principais visíveis e com contraste adequado' },
            { key: 'noFakeData', label: 'Nenhum horário falso, depoimento inventado ou lorem ipsum' },
            { key: 'seoImplemented', label: 'Título e meta descrição configurados para busca no Google' }
          ].map(item => {
            const isChecked = !!checklist[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleItem(item.key)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-[#111B36] border-[#00D4E8]/50 text-[#F5F7FF]'
                    : 'bg-[#080D20] border-[#203252] text-[#AAB6CC] hover:border-[#203252]'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-[#00D4E8]">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-[#00E599]" />
                  ) : (
                    <Square className="w-5 h-5 text-[#71809B]" />
                  )}
                </div>
                <span className="text-sm font-medium leading-relaxed">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ITEM 2: PRÓXIMO PASSO: REGISTRO DE DOMÍNIO E HOSPEDAGEM */}
      <div className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#203252] gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#00D4E8]/10 text-[#00D4E8]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
                2. Próximo Passo: Registro de Domínio e Hospedagem
              </h4>
              <p className="text-sm text-[#AAB6CC]">
                Preparação para colocar seu endereço próprio no ar
              </p>
            </div>
          </div>
          <span className="text-xs text-[#00E599] font-bold bg-[#00E599]/10 px-2.5 py-1 rounded-md border border-[#00E599]/20 self-start sm:self-auto">
            Próxima Fase do Projeto
          </span>
        </div>

        <p className="text-sm text-[#AAB6CC] leading-relaxed">
          Com todas as etapas de criação, copy, identidade visual e prompts de IA concluídas com sucesso, o próximo passo estratégico é registrar o seu domínio próprio oficial (ex: <code className="text-[#00D4E8] bg-[#111B36] px-1.5 py-0.5 rounded font-mono">seunegocio.com.br</code>) e configurar a hospedagem profissional para disponibilizar seu site na internet para clientes do mundo todo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-4 bg-[#111B36] border border-[#203252] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#F5F7FF]">
              <Globe className="w-5 h-5 text-[#00D4E8]" />
              <span>Registro de Domínio Próprio (.com.br)</span>
            </div>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Garante a titularidade oficial da sua marca na web pelo Registro.br, protegendo o nome da sua empresa e transmitindo máxima credibilidade aos visitantes.
            </p>
          </div>

          <div className="p-4 bg-[#111B36] border border-[#203252] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#F5F7FF]">
              <Server className="w-5 h-5 text-[#00E599]" />
              <span>Hospedagem & Conexão Segura (SSL/HTTPS)</span>
            </div>
            <p className="text-sm text-[#AAB6CC] leading-relaxed">
              Servidores de alta performance, certificado de segurança incluso, estabilidade 24 horas por dia e carregamento ultra-rápido em smartphones e computadores.
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#152342]/60 border border-[#00D4E8]/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#00D4E8]/10 text-[#00D4E8] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-sm text-[#AAB6CC] leading-snug">
              O novo módulo completo de <strong className="text-[#F5F7FF]">Registro de Domínio & Hospedagem</strong> já está pronto com tutoriais para Vercel, Netlify e Hostinger.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveView('registro_hospedagem')}
            className="btn-cta px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md shadow-[#00D4E8]/20"
          >
            <span>Acessar Guia de Hospedagem</span>
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. GOOGLE MEU NEGÓCIO & FASE 3 */}
      <div className="p-5 md:p-6 bg-[#0B1535] border border-[#203252] rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
            <MapPin className="w-5 h-5 text-[#00E599]" />
            <span>3. Próximo Passo: Presença no Google (Fase 3)</span>
          </div>
          <span className="text-xs font-bold text-[#00E599] bg-[#00E599]/10 px-2 py-0.5 rounded border border-[#00E599]/20 self-start sm:self-auto">
            SEO Local & Buscador
          </span>
        </div>
        <p className="text-sm text-[#AAB6CC] leading-relaxed">
          Com o site no ar, o passo seguinte é cadastrar sua empresa no <strong>Google Meu Negócio (Google Maps)</strong>, enviar seu sitemap no <strong>Google Search Console</strong> e configurar a <strong>LGPD</strong>. Isso coloca seu negócio na frente dos clientes da sua região.
        </p>
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setActiveView('fase3_seo')}
            className="btn-cta px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-[#00D4E8]/20"
          >
            <span>Acessar Fase 3: Ser Encontrado</span>
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. Action Footer & Final Celebration */}
      <div className="p-6 bg-[#080D20] border-2 border-[#00E599]/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-[#22C55E] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Parabéns! Todas as etapas de criação foram concluídas!</span>
          </h4>
          <p className="text-sm text-[#AAB6CC]">
            Seu negócio agora tem posicionamento profissional, identidade visual calibrada, textos de alta conversão e site estruturado pronto para receber clientes.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleCelebrate}
            className="px-6 py-3 rounded-xl bg-[#111B36] hover:bg-[#152342] border border-[#203252] hover:border-[#00D4E8]/50 text-sm font-bold text-[#00D4E8] hover:text-[#F5F7FF] transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-md shadow-black/20"
          >
            <span>🎉 Comemorar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
