import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Briefcase, 
  MapPin, 
  Phone, 
  Instagram, 
  Mail, 
  Target, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  Layers, 
  Palette, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { ServiceItem, BusinessProject } from '../types/project';

interface ProjectFormViewProps {
  isStepView?: boolean;
  onComplete?: () => void;
  onCloseDrawer?: () => void;
}

export const ProjectFormView: React.FC<ProjectFormViewProps> = ({
  isStepView = false,
  onComplete,
  onCloseDrawer
}) => {
  const { project, updateProject, setActiveView, completeStep, goToStep } = useProject();
  const [formData, setFormData] = useState<BusinessProject>(project);
  const [isSaved, setIsSaved] = useState(false);

  // Sync state if external project changes
  useEffect(() => {
    setFormData(project);
  }, [project]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateProject(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleSaveAndAdvance = () => {
    updateProject(formData);
    completeStep('01-01', true);
    if (onComplete) onComplete();
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: 'Novo Serviço',
      description: 'Breve descrição do benefício deste serviço para seu cliente.'
    };
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const handleRemoveService = (id: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const handleAddDifferential = () => {
    setFormData(prev => ({
      ...prev,
      differentials: [...prev.differentials, 'Novo diferencial exclusivo']
    }));
  };

  const handleRemoveDifferential = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      differentials: prev.differentials.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner when inside Step 1 */}
      {isStepView && (
        <div className="bg-[#111B36] border border-[#203252] rounded-2xl p-5 md:p-6 shadow-lg shadow-black/20">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4E8] to-[#1769FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#00D4E8]/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
                  Ponto de Partida Oficial
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#00E599]/10 text-[#00E599] font-bold">
                  Fonte Única de Verdade
                </span>
              </div>
              <h3 className="text-lg md:text-lg font-bold text-[#F5F7FF]">
                Informações Fundamentais do Seu Negócio
              </h3>
              <p className="text-sm text-[#AAB6CC] leading-relaxed">
                Preencha os dados reais do seu negócio uma única vez. Estas informações alimentarão automaticamente todo o conteúdo, a paleta visual e o Prompt Mestre Final. Você nunca precisará preencher essas informações novamente nas etapas seguintes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Card */}
      <form onSubmit={handleSave} className="bg-[#080D20] border border-[#203252] rounded-2xl p-5 md:p-7 space-y-7">
        {/* 1. Identificação */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>1. Identificação do Seu Negócio</span>
            </h4>
            <span className="text-sm text-[#71809B]">* Dados essenciais</span>
          </div>

          <div>
            <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
              Nome Comercial da Empresa / Profissional *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Barbearia Real, Dra. Juliana Mendes, Studio Zen..."
              className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-3 text-sm md:text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
                Segmento / Especialidade *
              </label>
              <input
                type="text"
                value={formData.segment}
                onChange={e => setFormData({ ...formData, segment: e.target.value })}
                placeholder="Ex: Barbearia, Fisioterapia, Advocacia..."
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
                Cidade & Estado (UF) *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ex: Recife - PE, São Paulo - SP..."
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
                Bairro ou Região de Atendimento
              </label>
              <input
                type="text"
                value={formData.neighborhood || formData.region || ''}
                onChange={e => setFormData({ ...formData, neighborhood: e.target.value, region: e.target.value })}
                placeholder="Ex: Boa Viagem, Centro, Zona Sul..."
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Contatos & Localização */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>2. Canais de Contato & Localização</span>
            </h4>
            <span className="text-sm text-[#71809B]">Canais para os botões do site</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
                WhatsApp Comercial (com DDD) *
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="(81) 99992-5040"
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
                Instagram Oficial
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="@barbeariareal"
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
                E-mail Comercial (Opcional)
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="contato@empresa.com.br"
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
                Endereço Físico Completo (se houver atendimento presencial)
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="Avenida Conselheiro Aguiar, 2756, Loja 1, Boa Viagem, Recife"
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
              <span className="text-xs text-[#71809B] mt-1 block">
                Deixe em branco caso seu atendimento seja 100% online ou a domicílio.
              </span>
            </div>

            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#00D4E8]" />
                <span>Horário de Funcionamento / Atendimento</span>
              </label>
              <input
                type="text"
                value={formData.operatingHours || ''}
                onChange={e => setFormData({ ...formData, operatingHours: e.target.value })}
                placeholder="Ex: Terça a Sábado das 09h às 19h (ou com agendamento prévio)"
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
              <span className="text-xs text-[#71809B] mt-1 block">
                Se não informado, o site indicará atendimento mediante agendamento via WhatsApp.
              </span>
            </div>
          </div>
        </div>

        {/* 3. Serviços Principais */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
                3. Serviços Principais ({formData.services.length})
              </h4>
              <p className="text-sm text-[#AAB6CC] mt-0.5">
                Quais serviços ou especialidades devem aparecer com destaque no site?
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddService}
              className="text-sm text-[#00D4E8] hover:underline flex items-center gap-1.5 font-bold cursor-pointer bg-[#00D4E8]/10 px-3 py-1.5 rounded-lg border border-[#00D4E8]/30"
            >
              <Plus className="w-4 h-4" /> Adicionar Serviço
            </button>
          </div>

          <div className="space-y-3">
            {formData.services.length === 0 ? (
              <div className="p-4 bg-[#111B36]/40 border border-[#203252] rounded-xl text-center text-[#71809B] space-y-2">
                <p>Nenhum serviço cadastrado ainda.</p>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="btn-cta px-4 py-2 rounded-lg text-sm font-bold inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Cadastrar Primeiro Serviço
                </button>
              </div>
            ) : (
              formData.services.map((srv, idx) => (
                <div key={srv.id} className="p-3.5 bg-[#111B36] border border-[#203252] rounded-xl space-y-2 transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const updated = [...formData.services];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, services: updated });
                      }}
                      className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-sm font-bold text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                      placeholder="Ex: Corte de Cabelo Masculino, Barboterapia, etc."
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveService(srv.id)}
                      className="p-2 text-[#71809B] hover:text-[#EF4444] rounded-lg hover:bg-[#080D20] transition-colors cursor-pointer"
                      title="Excluir este serviço"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={srv.description}
                    onChange={(e) => {
                      const updated = [...formData.services];
                      updated[idx].description = e.target.value;
                      setFormData({ ...formData, services: updated });
                    }}
                    className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-sm text-[#AAB6CC] focus:border-[#00D4E8] focus:outline-none"
                    placeholder="Descrição clara do benefício ou como o serviço é realizado para o cliente..."
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* 4. Diferenciais Competitivos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8]">
                4. Diferenciais Competitivos ({formData.differentials.length})
              </h4>
              <p className="text-sm text-[#AAB6CC] mt-0.5">
                Por que o cliente deve escolher você e não o concorrente?
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddDifferential}
              className="text-sm text-[#00D4E8] hover:underline flex items-center gap-1.5 font-bold cursor-pointer bg-[#00D4E8]/10 px-3 py-1.5 rounded-lg border border-[#00D4E8]/30"
            >
              <Plus className="w-4 h-4" /> Adicionar Diferencial
            </button>
          </div>

          <div className="space-y-2.5">
            {formData.differentials.length === 0 ? (
              <div className="p-4 bg-[#111B36]/40 border border-[#203252] rounded-xl text-center text-[#71809B]">
                Nenhum diferencial adicionado ainda. Adicione pelo menos 2 a 3 diferenciais fortes.
              </div>
            ) : (
              formData.differentials.map((diff, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#00E599]/10 text-[#00E599] flex items-center justify-center shrink-0 text-sm font-bold">
                    ✓
                  </div>
                  <input
                    type="text"
                    value={diff}
                    onChange={(e) => {
                      const updated = [...formData.differentials];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, differentials: updated });
                    }}
                    className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                    placeholder="Ex: Cortes perfeitos e barba simétrica, Atendimento pontual com hora marcada..."
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDifferential(idx)}
                    className="p-2 text-[#71809B] hover:text-[#EF4444] rounded-lg hover:bg-[#111B36] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 5. Posicionamento, Público & Tom */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>5. Posicionamento, Público & Tom de Voz</span>
            </h4>
            <span className="text-sm text-[#71809B]">Define o estilo da copy</span>
          </div>

          <div>
            <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
              Público-Alvo e Perfil dos Clientes
            </label>
            <textarea
              rows={2}
              value={formData.targetAudience}
              onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="Ex: Pessoas exigentes que buscam cortar cabelo ou fazer a barba com profissionais experientes..."
              className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
                Tom de Comunicação da Marca
              </label>
              <input
                type="text"
                value={formData.communicationTone}
                onChange={e => setFormData({ ...formData, communicationTone: e.target.value })}
                placeholder="Ex: Profissional, extremamente criterioso e perfeccionista..."
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
                Objetivo Principal do Site
              </label>
              <input
                type="text"
                value={formData.siteGoal}
                onChange={e => setFormData({ ...formData, siteGoal: e.target.value })}
                placeholder="Ex: Captar clientes, informar sobre o negócio e posicionar no Google..."
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
              Chamada do Botão Principal (CTA)
            </label>
            <input
              type="text"
              value={formData.ctaLabel || 'Falar no WhatsApp Agora'}
              onChange={e => setFormData({ ...formData, ctaLabel: e.target.value })}
              placeholder="Ex: Agendar Horário no WhatsApp, Falar com Especialista..."
              className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
          </div>
        </div>

        {/* 6. Preferência Visual Inicial */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#203252]">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#00D4E8] flex items-center gap-2">
              <Palette className="w-5 h-5" />
              <span>6. Preferência Visual & Cores Iniciais</span>
            </h4>
            <span className="text-sm text-[#71809B]">Você poderá detalhar no Módulo 03</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">Posicionamento Visual</label>
              <input
                type="text"
                value={formData.visualPositioning || ''}
                onChange={e => setFormData({ ...formData, visualPositioning: e.target.value })}
                placeholder="Ex: Barbearia clássica refinada, Sofisticado e moderno..."
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">Personalidade Visual</label>
              <input
                type="text"
                value={formData.visualPersonality || ''}
                onChange={e => setFormData({ ...formData, visualPersonality: e.target.value })}
                placeholder="Ex: Elegante, acolhedora, precisa e tradicional..."
                className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">Como deseja definir as cores:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paletteSource: 'custom' })}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  formData.paletteSource !== 'brand_logo'
                    ? 'bg-[#00D4E8]/10 border-[#00D4E8] text-[#F5F7FF]'
                    : 'bg-[#111B36] border-[#203252] text-[#AAB6CC]'
                }`}
              >
                <span className="font-bold block text-sm">Paleta Harmoniosa por IA</span>
                <span className="text-xs text-[#71809B]">Gerada sob medida para seu nicho</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paletteSource: 'brand_logo' })}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  formData.paletteSource === 'brand_logo'
                    ? 'bg-[#00D4E8]/10 border-[#00D4E8] text-[#F5F7FF]'
                    : 'bg-[#111B36] border-[#203252] text-[#AAB6CC]'
                }`}
              >
                <span className="font-bold block text-sm">Cores da Minha Marca / Logo</span>
                <span className="text-xs text-[#71809B]">Usar os códigos HEX da sua logo</span>
              </button>
            </div>
          </div>

          {formData.paletteSource === 'brand_logo' && (
            <div className="p-4 md:p-5 bg-[#0B1535] border border-[#203252] rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#203252]">
                <span className="text-sm font-bold text-[#00D4E8] uppercase tracking-wider">
                  Tabela de Cores da Marca (6 Opções de Cores)
                </span>
                <a
                  href="https://color.adobe.com/br/create/image"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00D4E8] hover:text-[#38BDF8] bg-[#00D4E8]/10 hover:bg-[#00D4E8]/20 border border-[#00D4E8]/30 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Capturar Cores no Adobe Color</span>
                </a>
              </div>

              {/* Instruções claras */}
              <div className="p-3.5 bg-[#111B36] border border-[#203252] rounded-lg space-y-2 text-sm text-[#AAB6CC] leading-relaxed">
                <p>
                  🎨 <strong>Como capturar as cores da sua logo:</strong> Acesse a ferramenta gratuita da Adobe (<a href="https://color.adobe.com/br/create/image" target="_blank" rel="noreferrer" className="text-[#00D4E8] underline font-semibold hover:text-[#38BDF8]">Adobe Color — Extrair Imagem</a>), envie o arquivo da sua logo, copie os códigos HEX gerados <strong>um por um</strong> e cole aqui.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1 text-sm text-[#71809B] border-t border-[#203252]/60">
                  <span>• <strong>Sua marca tem apenas 2 cores?</strong> Preencha apenas a Cor 1 e a Cor 2 (as outras são opcionais).</span>
                  <span>• <strong>Não tem logo ainda?</strong> Marque a Opção 1 acima (<em>"Paleta Harmoniosa por IA"</em>) e deixe a IA escolher quando for criar o site.</span>
                </div>
              </div>

              {/* Tabela de 6 Cores: 3 em cima e 3 em baixo */}
              <div className="bg-[#080D20] border border-[#203252] rounded-xl p-3.5 space-y-3.5">
                {/* Linha Superior (3 cores) */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#71809B] mb-2 px-1 flex items-center justify-between">
                    <span>Linha 1 — Cores Principais e de Ação</span>
                    <span className="text-[#00D4E8]">3 cores</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Cor 1: Principal */}
                    <div className="space-y-1 bg-[#111B36]/60 p-2.5 rounded-lg border border-[#203252]/70">
                      <label className="block text-sm font-semibold text-[#F5F7FF]">
                        1. Cor Principal (HEX) *
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={formData.brandLogoColors?.primary?.startsWith('#') && formData.brandLogoColors.primary.length === 7 ? formData.brandLogoColors.primary : '#0D2F2E'}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              ...formData.brandLogoColors,
                              primary: e.target.value
                            }
                          })}
                          className="w-8 h-8 rounded-lg border border-[#203252] bg-transparent cursor-pointer shrink-0"
                          title="Selecionar visualmente"
                        />
                        <input
                          type="text"
                          value={formData.brandLogoColors?.primary || ''}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              ...formData.brandLogoColors,
                              primary: e.target.value
                            }
                          })}
                          placeholder="#0D2F2E"
                          className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-sm font-mono uppercase text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                        />
                      </div>
                      <span className="text-xs text-[#71809B] block">Botões e destaques de ação</span>
                    </div>

                    {/* Cor 2: Secundária */}
                    <div className="space-y-1 bg-[#111B36]/60 p-2.5 rounded-lg border border-[#203252]/70">
                      <label className="block text-sm font-semibold text-[#F5F7FF]">
                        2. Cor Secundária (HEX)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={formData.brandLogoColors?.secondary?.startsWith('#') && formData.brandLogoColors.secondary.length === 7 ? formData.brandLogoColors.secondary : '#A0CAB8'}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              secondary: e.target.value
                            }
                          })}
                          className="w-8 h-8 rounded-lg border border-[#203252] bg-transparent cursor-pointer shrink-0"
                          title="Selecionar visualmente"
                        />
                        <input
                          type="text"
                          value={formData.brandLogoColors?.secondary || ''}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              secondary: e.target.value
                            }
                          })}
                          placeholder="#A0CAB8"
                          className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-sm font-mono uppercase text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                        />
                      </div>
                      <span className="text-xs text-[#71809B] block">Subtítulos e contrastes</span>
                    </div>

                    {/* Cor 3: Destaque / Realce */}
                    <div className="space-y-1 bg-[#111B36]/60 p-2.5 rounded-lg border border-[#203252]/70">
                      <label className="block text-sm font-semibold text-[#F5F7FF]">
                        3. Cor de Destaque/Realce (HEX)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={(formData.brandLogoColors?.accent || formData.brandLogoColors?.complementary)?.startsWith('#') && (formData.brandLogoColors?.accent || formData.brandLogoColors?.complementary)?.length === 7 ? (formData.brandLogoColors?.accent || formData.brandLogoColors?.complementary) : '#38BDF8'}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              accent: e.target.value,
                              complementary: e.target.value
                            }
                          })}
                          className="w-8 h-8 rounded-lg border border-[#203252] bg-transparent cursor-pointer shrink-0"
                          title="Selecionar visualmente"
                        />
                        <input
                          type="text"
                          value={formData.brandLogoColors?.accent || formData.brandLogoColors?.complementary || ''}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              accent: e.target.value,
                              complementary: e.target.value
                            }
                          })}
                          placeholder="#38BDF8"
                          className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-sm font-mono uppercase text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                        />
                      </div>
                      <span className="text-xs text-[#71809B] block">Ícones, acentos e realces de destaque</span>
                    </div>
                  </div>
                </div>

                {/* Linha Inferior (3 cores) */}
                <div className="pt-2 border-t border-[#203252]/70">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#71809B] mb-2 px-1 flex items-center justify-between">
                    <span>Linha 2 — Fundo/Superfície, Texto e Borda</span>
                    <span className="text-[#00D4E8]">3 cores</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Cor 4: Fundo / Superfície */}
                    <div className="space-y-1 bg-[#111B36]/60 p-2.5 rounded-lg border border-[#203252]/70">
                      <label className="block text-sm font-semibold text-[#F5F7FF]">
                        4. Fundo/Superfície (HEX)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={(formData.brandLogoColors?.background || formData.brandLogoColors?.neutral)?.startsWith('#') && (formData.brandLogoColors?.background || formData.brandLogoColors?.neutral)?.length === 7 ? (formData.brandLogoColors?.background || formData.brandLogoColors?.neutral) : '#111B36'}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              neutral: e.target.value,
                              background: e.target.value
                            }
                          })}
                          className="w-8 h-8 rounded-lg border border-[#203252] bg-transparent cursor-pointer shrink-0"
                          title="Selecionar visualmente"
                        />
                        <input
                          type="text"
                          value={formData.brandLogoColors?.background || formData.brandLogoColors?.neutral || ''}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              neutral: e.target.value,
                              background: e.target.value
                            }
                          })}
                          placeholder="#111B36"
                          className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-sm font-mono uppercase text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                        />
                      </div>
                      <span className="text-xs text-[#71809B] block">Superfícies de cards e fundo</span>
                    </div>

                    {/* Cor 5: Texto */}
                    <div className="space-y-1 bg-[#111B36]/60 p-2.5 rounded-lg border border-[#203252]/70">
                      <label className="block text-sm font-semibold text-[#F5F7FF]">
                        5. Texto (HEX)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={formData.brandLogoColors?.text?.startsWith('#') && formData.brandLogoColors.text.length === 7 ? formData.brandLogoColors.text : '#F5F7FF'}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              text: e.target.value
                            }
                          })}
                          className="w-8 h-8 rounded-lg border border-[#203252] bg-transparent cursor-pointer shrink-0"
                          title="Selecionar visualmente"
                        />
                        <input
                          type="text"
                          value={formData.brandLogoColors?.text || ''}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              text: e.target.value
                            }
                          })}
                          placeholder="#F5F7FF"
                          className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-sm font-mono uppercase text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                        />
                      </div>
                      <span className="text-xs text-[#71809B] block">Tipografia e leitura legível</span>
                    </div>

                    {/* Cor 6: Borda */}
                    <div className="space-y-1 bg-[#111B36]/60 p-2.5 rounded-lg border border-[#203252]/70">
                      <label className="block text-sm font-semibold text-[#F5F7FF]">
                        6. Borda (HEX)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={formData.brandLogoColors?.border?.startsWith('#') && formData.brandLogoColors.border.length === 7 ? formData.brandLogoColors.border : '#203252'}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              border: e.target.value
                            }
                          })}
                          className="w-8 h-8 rounded-lg border border-[#203252] bg-transparent cursor-pointer shrink-0"
                          title="Selecionar visualmente"
                        />
                        <input
                          type="text"
                          value={formData.brandLogoColors?.border || ''}
                          onChange={e => setFormData({
                            ...formData,
                            brandLogoColors: {
                              primary: formData.brandLogoColors?.primary || '#0D2F2E',
                              ...formData.brandLogoColors,
                              border: e.target.value
                            }
                          })}
                          placeholder="#203252"
                          className="w-full bg-[#080D20] border border-[#203252] rounded-lg p-2 text-sm font-mono uppercase text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
                        />
                      </div>
                      <span className="text-xs text-[#71809B] block">Bordas estruturais e divisores</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
              Cores Específicas Desejadas (Opcional)
            </label>
            <input
              type="text"
              value={formData.desiredColors || ''}
              onChange={e => setFormData({ ...formData, desiredColors: e.target.value })}
              placeholder="Ex.: azul petróleo, verde oliva e bege; ou #123456, #F2E8D5"
              className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
            <p className="text-xs text-[#71809B] mt-1">
              Preferência analisada pelo Diretor de Arte junto com a marca e o segmento.
            </p>
          </div>

          <div>
            <label className="block text-sm text-[#AAB6CC] mb-1 font-semibold">
              Site de Referência Estética (Opcional)
            </label>
            <input
              type="url"
              value={formData.referenceUrl || ''}
              onChange={e => setFormData({ ...formData, referenceUrl: e.target.value })}
              placeholder="https://exemplo.com.br (apenas como inspiração de espaçamento e atmosfera)"
              className="w-full bg-[#111B36] border border-[#203252] rounded-xl p-2.5 text-sm text-[#F5F7FF] focus:border-[#00D4E8] focus:outline-none"
            />
          </div>

          {formData.gptPaletteResponse && (
            <div className="p-3 bg-[#080D20] border border-[#22C55E]/40 rounded-xl flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 text-[#22C55E]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-semibold">Sistema de Cores do Diretor de Arte (GPT) salvo no projeto</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onCloseDrawer) onCloseDrawer();
                  goToStep('03-01');
                }}
                className="text-sm text-[#00D4E8] hover:underline font-bold shrink-0 cursor-pointer"
              >
                Ver no Módulo 03 →
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#203252] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-[#71809B]">
            <ShieldCheck className="w-5 h-5 text-[#00E599]" />
            <span>Dados salvos localmente e protegidos no seu navegador.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2.5 rounded-xl border border-[#203252] hover:bg-[#111B36] text-sm font-bold text-[#F5F7FF] transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
            >
              {isSaved ? (
                <>
                  <Check className="w-5 h-5 text-[#00E599]" />
                  <span className="text-[#00E599]">Salvo!</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Salvar Dados</span>
                </>
              )}
            </button>

            {isStepView && (
              <button
                type="button"
                onClick={handleSaveAndAdvance}
                className="btn-cta px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shrink-0 shadow-lg shadow-[#00D4E8]/20"
              >
                <span>Salvar e Avançar para Conteúdo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {onCloseDrawer && (
              <button
                type="button"
                onClick={onCloseDrawer}
                className="px-4 py-2.5 rounded-xl bg-[#111B36] hover:bg-[#152342] text-sm font-bold text-[#AAB6CC] cursor-pointer"
              >
                Fechar
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
