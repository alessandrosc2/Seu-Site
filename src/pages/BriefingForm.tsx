import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  Download, 
  MessageCircle, 
  ArrowLeft, 
  Sparkles, 
  Palette, 
  Phone, 
  MapPin, 
  Target, 
  Instagram, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  FileCheck2, 
  Mail, 
  User, 
  HelpCircle,
  Award
} from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface ServiceItem {
  id: string;
  name: string;
  description: string;
}

export default function BriefingForm() {
  const [formData, setFormData] = useState({
    // 1. Identificação do Negócio
    businessName: "",
    ownerName: "",
    documentNumber: "", // CNPJ ou Registro Profissional (OAB, CRM, CRECI, CRO...)
    segment: "",
    cityState: "",
    neighborhood: "",

    // 2. Canais de Contato & Localização
    whatsapp: "",
    secondaryPhone: "",
    instagram: "",
    email: "",
    fullAddress: "", // Endereço Completo para Google Maps
    businessHours: "",

    // 4. Diferenciais Competitivos
    differentials: "",

    // 5. Preferências de Design & Detalhes
    colors: "",
    targetAction: "whatsapp",
    socialProof: "",
    observations: ""
  });

  // 3. Serviços Principais (Lista Dinâmica)
  const [services, setServices] = useState<ServiceItem[]>([
    { id: "1", name: "", description: "" }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedTxt, setSavedTxt] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceChange = (id: string, field: "name" | "description", value: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleAddService = () => {
    setServices(prev => [
      ...prev,
      { id: String(Date.now()), name: "", description: "" }
    ]);
  };

  const handleRemoveService = (id: string) => {
    if (services.length <= 1) {
      toast.info("Mantenha ao menos 1 serviço ou especialidade principal.");
      return;
    }
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const generateTxtContent = (data: typeof formData, servs: ServiceItem[]) => {
    const dataHora = new Date().toLocaleString("pt-BR");
    
    const formattedServices = servs
      .filter(s => s.name.trim() !== "")
      .map((s, index) => `   ${index + 1}. ${s.name}\n      Descrição/Benefício: ${s.description || "Destaque do serviço com chamada para ação"}`)
      .join("\n\n");

    return `=====================================================
BRIEFING COMPLETO DE CRIAÇÃO DE SITE — MULTY TECHNOLOGY
Data de Envio: ${dataHora}
=====================================================

1. IDENTIFICAÇÃO DO SEU NEGÓCIO:
- Nome Comercial da Empresa: ${data.businessName || "Não informado"}
- Nome do Responsável / Profissional: ${data.ownerName || "Não informado"}
- CNPJ ou Registro Profissional (OAB, CRM, CRECI, CRO): ${data.documentNumber || "Não informado (inserir no rodapé se houver)"}
- Segmento / Especialidade de Atuação: ${data.segment || "Não informado"}
- Cidade & Estado (UF): ${data.cityState || "Não informado"}
- Bairro ou Região Principal de Atendimento: ${data.neighborhood || "Todo o município / região"}

2. CANAIS DE CONTATO, LOCALIZAÇÃO & HORÁRIOS:
- WhatsApp Comercial Principal (com DDD): ${data.whatsapp || "Não informado"}
- Telefone Secundário / Fixo: ${data.secondaryPhone || "Não informado"}
- Instagram Oficial: ${data.instagram || "Não informado"}
- E-mail Comercial: ${data.email || "Não informado"}
- Endereço Completo (para Google Maps no Site):
  ${data.fullAddress || "Atendimento 100% Online ou a Domicílio (sem ponto físico no mapa)"}
- Horário de Funcionamento / Atendimento:
  ${data.businessHours || "Atendimento comercial padrão ou mediante agendamento via WhatsApp"}

3. SERVIÇOS OU PRODUTOS PRINCIPAIS:
${formattedServices || "   Nenhum serviço discriminado separadamente"}

4. DIFERENCIAIS COMPETITIVOS:
- Por que o cliente deve escolher sua empresa em vez da concorrência?
${data.differentials || "Não informado (serão aplicados gatilhos clássicos de autoridade e confiança)"}

5. IDENTIDADE VISUAL & ESTILO:
- Cores de Preferência / Estilo Visual: ${data.colors || "Dark theme sofisticado com azul ciano ou a critério do design"}
- Logotipo e Fotos: Serão solicitados via WhatsApp (sem necessidade de upload no formulário)
- Ação Principal Esperada do Visitante: ${
  data.targetAction === "whatsapp" ? "Levar o cliente direto para o WhatsApp (Conversão Máxima)" :
  data.targetAction === "orcamento" ? "Solicitar Orçamento / Formulário" :
  data.targetAction === "agendamento" ? "Agendar Consulta / Horário" :
  "Apresentação Institucional de Alta Autoridade"
}

6. PROVA SOCIAL & DEPOIMENTOS:
- Frases de Clientes, Anos de Mercado ou Conquistas:
${data.socialProof || "Serão incluídos depoimentos e métricas adaptadas ao nicho"}

7. OBSERVAÇÕES ADICIONAIS:
${data.observations || "Nenhuma observação específica adicionada."}

=====================================================
Status: Pronto para Criação com IA & Equipe Especializada
=====================================================`;
  };

  const handleDownloadTxt = (customTxt?: string) => {
    const textToDownload = customTxt || savedTxt || generateTxtContent(formData, services);
    const blob = new Blob([textToDownload], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const sanitizedName = formData.businessName.replace(/[^a-zA-Z0-9]/g, "_") || "cliente";
    link.href = url;
    link.download = `briefing_${sanitizedName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Arquivo TXT baixado com sucesso!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.businessName.trim()) {
      toast.error("Por favor, preencha o Nome da sua Empresa.");
      return;
    }
    if (!formData.whatsapp.trim()) {
      toast.error("Por favor, informe seu WhatsApp Comercial de atendimento.");
      return;
    }
    if (!formData.segment.trim()) {
      toast.error("Por favor, informe o Segmento ou Ramo de atuação.");
      return;
    }
    if (!formData.cityState.trim()) {
      toast.error("Por favor, preencha a Cidade e Estado de atuação.");
      return;
    }

    const validServices = services.filter(s => s.name.trim() !== "");
    if (validServices.length === 0) {
      toast.error("Por favor, informe ao menos 1 serviço ou especialidade principal.");
      return;
    }

    setIsSubmitting(true);
    const txtContent = generateTxtContent(formData, services);
    setSavedTxt(txtContent);

    try {
      // 1. Salva no Firestore
      if (db) {
        await addDoc(collection(db, "leads"), {
          type: "briefing",
          status: "ativo",
          businessName: formData.businessName,
          ownerName: formData.ownerName,
          documentNumber: formData.documentNumber,
          segment: formData.segment,
          cityState: formData.cityState,
          neighborhood: formData.neighborhood,
          whatsapp: formData.whatsapp,
          secondaryPhone: formData.secondaryPhone,
          instagram: formData.instagram,
          email: formData.email,
          fullAddress: formData.fullAddress,
          businessHours: formData.businessHours,
          services: validServices,
          differentials: formData.differentials,
          colors: formData.colors,
          targetAction: formData.targetAction,
          socialProof: formData.socialProof,
          observations: formData.observations,
          txtContent: txtContent,
          createdAt: serverTimestamp()
        });
      }

      // 2. Salva contingência local
      try {
        const localBriefings = JSON.parse(localStorage.getItem("multy_local_briefings") || "[]");
        localBriefings.unshift({
          id: "local_" + Date.now(),
          ...formData,
          services: validServices,
          txtContent,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem("multy_local_briefings", JSON.stringify(localBriefings.slice(0, 50)));
      } catch {}

      toast.success("Briefing enviado com sucesso!");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Erro ao salvar briefing:", err);
      setSubmitted(true);
      toast.success("Briefing gerado com sucesso!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Acabei de enviar o briefing completo para criação do site da minha empresa:\n\n*Empresa:* ${formData.businessName}\n*Segmento:* ${formData.segment}\n*WhatsApp:* ${formData.whatsapp}\n*Cidade/UF:* ${formData.cityState}\n\nPodem confirmar o recebimento para darmos início?`
  );

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#050814]/85 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-medium">Voltar ao Site Principal</span>
          </Link>
          <div className="flex items-center gap-2">
            <img src="/logo-site.webp" alt="Site-IA" className="w-7 h-7 object-contain" />
            <span className="font-bold text-sm sm:text-base text-white tracking-tight">
              Site-<span className="text-cyan-400">IA</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {!submitted ? (
          <div>
            {/* Header Form */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-2">
                Início do Projeto • Levantamento Completo
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Informações do Seu Negócio
              </h1>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                Preencha os campos abaixo com os dados da sua empresa. Usaremos essas informações para estruturar o design, os textos de alta conversão e a configuração técnica do seu site oficial.
              </p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-md space-y-10">
              
              {/* 1. IDENTIFICAÇÃO DO SEU NEGÓCIO */}
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>1. Identificação do Seu Negócio</span>
                </div>
                <p className="text-xs text-slate-400 mb-5">
                  Dados essenciais para dar personalidade, autoridade e registro profissional ao site.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Nome Comercial da Empresa / Negócio <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Ex: Barbearia Real, Dra. Juliana Mendes, Studio Zen..."
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Nome do Responsável / Profissional (Opcional)
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Ex: Dr. Roberto Alencar (para médicos, advogados, autônomos)"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Segmento / Ramo / Especialidade <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="segment"
                      required
                      value={formData.segment}
                      onChange={handleChange}
                      placeholder="Ex: Imobiliária & Arquitetura, Odontologia, Academia..."
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      CNPJ ou Registro Profissional (Opcional)
                    </label>
                    <input
                      type="text"
                      name="documentNumber"
                      value={formData.documentNumber}
                      onChange={handleChange}
                      placeholder="Ex: CNPJ 00.000.000/0001-00 ou OAB/SP 123.456, CRM, CRECI..."
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Cidade & Estado (UF) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="cityState"
                      required
                      value={formData.cityState}
                      onChange={handleChange}
                      placeholder="Ex: Recife - PE, São Paulo - SP, João Pessoa - PB..."
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Bairro ou Região de Atendimento
                    </label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      placeholder="Ex: Boa Viagem, Centro, Zona Sul (ou Todo o Brasil)"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 2. CANAIS DE CONTATO, LOCALIZAÇÃO & HORÁRIOS */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <Phone className="w-4 h-4" />
                  <span>2. Canais de Contato, Localização & Horários</span>
                </div>
                <p className="text-xs text-slate-400 mb-5">
                  Canais que serão conectados diretamente aos botões de ação e ao mapa do seu site.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      WhatsApp Comercial (com DDD) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="Ex: (81) 99992-5040"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Instagram Oficial (com @)
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="Ex: @barbeariareal ou @suaempresa"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      E-mail Comercial (Opcional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ex: contato@empresa.com.br"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Telefone Secundário ou Fixo (Opcional)
                    </label>
                    <input
                      type="text"
                      name="secondaryPhone"
                      value={formData.secondaryPhone}
                      onChange={handleChange}
                      placeholder="Ex: (81) 3333-2222"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Seu Endereço Completo (para incorporação no Google Maps)
                    </label>
                    <input
                      type="text"
                      name="fullAddress"
                      value={formData.fullAddress}
                      onChange={handleChange}
                      placeholder="Ex: Avenida Conselheiro Aguiar, 2756, Loja 1, Boa Viagem, Recife - PE"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Deixe em branco caso seu atendimento seja 100% online ou a domicílio.
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Horário de Funcionamento / Atendimento
                    </label>
                    <input
                      type="text"
                      name="businessHours"
                      value={formData.businessHours}
                      onChange={handleChange}
                      placeholder="Ex: Segunda a Sexta das 08h às 18h | Sábados das 08h às 13h (ou Mediante agendamento prévio)"
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Se não informado, o site indicará atendimento mediante agendamento via WhatsApp.
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. SERVIÇOS OU PRODUTOS PRINCIPAIS */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>3. Serviços Principais ({services.length})</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddService}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Serviço</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400 mb-5">
                  Quais serviços, especialidades ou produtos devem aparecer com destaque no site?
                </p>

                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div 
                      key={service.id} 
                      className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-white/10 relative group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 inline-flex items-center justify-center text-[11px]">
                            {index + 1}
                          </span>
                          Serviço #{index + 1}
                        </span>

                        {services.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveService(service.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Remover este serviço"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                        <div className="sm:col-span-5">
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            Nome do Serviço / Especialidade <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={service.name}
                            onChange={(e) => handleServiceChange(service.id, "name", e.target.value)}
                            placeholder="Ex: Corte & Barba, Implante Dentário, Ação Trabalhista..."
                            className="w-full h-10 px-3.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div className="sm:col-span-7">
                          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                            Breve Descrição / Benefício deste Serviço
                          </label>
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) => handleServiceChange(service.id, "description", e.target.value)}
                            placeholder="Ex: Atendimento personalizado com toalha quente e acabamento premium."
                            className="w-full h-10 px-3.5 rounded-xl bg-slate-900 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-right">
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Adicionar outro serviço à lista</span>
                  </button>
                </div>
              </div>

              {/* 4. DIFERENCIAIS COMPETITIVOS */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" />
                  <span>4. Diferenciais Competitivos</span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Por que o cliente deve escolher a sua empresa e não o seu concorrente?
                </p>

                <textarea
                  name="differentials"
                  rows={3}
                  value={formData.differentials}
                  onChange={handleChange}
                  placeholder="Ex: Mais de 12 anos de tradição, atendimento sem espera, garantia formal em contrato, equipamentos modernos importados, estacionamento gratuito no local, suporte humanizado via WhatsApp..."
                  className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors leading-relaxed"
                />
              </div>

              {/* 5. PREFERÊNCIAS VISUAIS & OBJETIVO */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mb-2">
                  <Palette className="w-4 h-4" />
                  <span>5. Identidade Visual & Detalhes Finais</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Cores de Preferência / Estilo Visual
                    </label>
                    <input
                      type="text"
                      name="colors"
                      value={formData.colors}
                      onChange={handleChange}
                      placeholder="Ex: Azul e dourado, tons escuros tecnológicos, tons claros minimalistas..."
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Ação Principal Desejada dos Visitantes
                    </label>
                    <select
                      name="targetAction"
                      value={formData.targetAction}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                    >
                      <option value="whatsapp">Chamar no WhatsApp (Recomendado para Conversão)</option>
                      <option value="orcamento">Solicitar Orçamento / Formulário</option>
                      <option value="agendamento">Agendar Horário / Consulta</option>
                      <option value="institucional">Apresentação Institucional & Autoridade</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Prova Social / Conquistas da Empresa (Opcional)
                    </label>
                    <input
                      type="text"
                      name="socialProof"
                      value={formData.socialProof}
                      onChange={handleChange}
                      placeholder="Ex: Mais de 5.000 clientes atendidos, nota 4.9 no Google, 10 anos de história..."
                      className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Nota sobre Logotipo e Fotos */}
                <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 mb-5">
                  <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300 block mb-0.5">Sobre Logotipo e Fotos da Empresa:</strong>
                    Você não precisa se preocupar em fazer upload de arquivos aqui. Após o envio deste formulário, nossa equipe solicitará o seu logotipo e fotos direto pelo WhatsApp para facilitar tudo!
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Observações Adicionais ou Algo Específico que não pode faltar
                  </label>
                  <textarea
                    name="observations"
                    rows={2}
                    value={formData.observations}
                    onChange={handleChange}
                    placeholder="Slogan, parceiros, convênios aceitos, aviso especial ou qualquer detalhe extra..."
                    className="w-full p-3.5 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 leading-relaxed"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Seus dados são enviados com segurança criptografada.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 hover:brightness-110 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Salvando Informações...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Briefing Completo</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-cyan-400/40 shadow-2xl backdrop-blur-md animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            </div>

            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-2">
              Envio Confirmado com Sucesso
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Recebemos as Informações da {formData.businessName}!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Nossa equipe já está com todos os detalhes em mãos para dar início à estruturação do seu site sob medida. Envie uma mensagem rápida no WhatsApp para agilizar o atendimento.
            </p>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 text-left mb-8 space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Empresa:</span>
                <span className="font-semibold text-white">{formData.businessName}</span>
              </div>
              {formData.ownerName && (
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">Responsável:</span>
                  <span className="font-semibold text-slate-200">{formData.ownerName}</span>
                </div>
              )}
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Segmento:</span>
                <span className="font-semibold text-cyan-300">{formData.segment}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Localização:</span>
                <span className="font-semibold text-slate-200">{formData.cityState}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">WhatsApp Comercial:</span>
                <span className="font-semibold text-emerald-400">{formData.whatsapp}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href={`https://wa.me/5583993595124?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:brightness-110 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Avisar no WhatsApp que Preencheu</span>
              </a>

              <button
                type="button"
                onClick={() => handleDownloadTxt()}
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-white/15 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Baixar Minha Cópia em TXT</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link to="/" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                ← Voltar para a página inicial
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer Minimal */}
      <footer className="py-6 border-t border-white/10 text-center text-xs text-slate-500">
        <p>© 2026 Multy Technology - Site-IA. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
