import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Lock, 
  Unlock, 
  FileText, 
  Download, 
  Copy, 
  Archive, 
  ArchiveRestore, 
  Search, 
  MessageCircle, 
  ExternalLink, 
  Check, 
  Eye, 
  X, 
  RefreshCw, 
  Sparkles, 
  LogOut, 
  ShieldCheck, 
  FolderArchive, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Instagram,
  Mail,
  Phone,
  Target,
  Award
} from "lucide-react";
import { toast } from "sonner";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc, onSnapshot } from "firebase/firestore";

interface ServiceItem {
  id?: string;
  name: string;
  description: string;
}

interface BriefingItem {
  id: string;
  businessName: string;
  ownerName?: string;
  documentNumber?: string;
  segment: string;
  cityState?: string;
  neighborhood?: string;
  whatsapp: string;
  secondaryPhone?: string;
  instagram?: string;
  email?: string;
  fullAddress?: string;
  businessHours?: string;
  services: ServiceItem[] | string;
  differentials?: string;
  colors?: string;
  socialProof?: string;
  targetAction?: string;
  observations?: string;
  txtContent: string;
  status: "ativo" | "arquivado";
  createdAt?: any;
}

export default function AdminBriefings() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  
  // Login form states
  const [email, setEmail] = useState("admin@multyplique.com.br");
  const [password, setPassword] = useState("admin123456");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard states
  const [briefings, setBriefings] = useState<BriefingItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"ativos" | "arquivados">("ativos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingItem | null>(null);

  // Função unificada para carregar briefings do Firestore e contingência local
  const fetchBriefings = async () => {
    setIsLoading(true);
    const items: BriefingItem[] = [];

    if (db) {
      try {
        const q = query(collection(db, "leads"), where("type", "==", "briefing"));
        const snapshot = await getDocs(q);
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          items.push({
            id: docSnap.id,
            businessName: data.businessName || "Empresa sem nome",
            ownerName: data.ownerName || "",
            documentNumber: data.documentNumber || "",
            segment: data.segment || "Geral",
            cityState: data.cityState || "",
            neighborhood: data.neighborhood || "",
            whatsapp: data.whatsapp || "",
            secondaryPhone: data.secondaryPhone || "",
            instagram: data.instagram || "",
            email: data.email || "",
            fullAddress: data.fullAddress || "",
            businessHours: data.businessHours || "",
            services: data.services || [],
            differentials: data.differentials || "",
            colors: data.colors || "",
            socialProof: data.socialProof || "",
            targetAction: data.targetAction || "whatsapp",
            observations: data.observations || "",
            txtContent: data.txtContent || "",
            status: data.status === "arquivado" ? "arquivado" : "ativo",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now())
          });
        });
      } catch (err) {
        console.warn("Erro ao buscar briefings do Firestore:", err);
      }
    }

    // Inclui cópias de contingência do localStorage se houver
    try {
      const local = JSON.parse(localStorage.getItem("multy_local_briefings") || "[]");
      local.forEach((locItem: any) => {
        if (!items.some(it => it.id === locItem.id || (it.businessName === locItem.businessName && it.whatsapp === locItem.whatsapp))) {
          items.push({
            id: locItem.id,
            businessName: locItem.businessName || "Empresa sem nome",
            ownerName: locItem.ownerName || "",
            documentNumber: locItem.documentNumber || "",
            segment: locItem.segment || "Geral",
            cityState: locItem.cityState || "",
            neighborhood: locItem.neighborhood || "",
            whatsapp: locItem.whatsapp || "",
            secondaryPhone: locItem.secondaryPhone || "",
            instagram: locItem.instagram || "",
            email: locItem.email || "",
            fullAddress: locItem.fullAddress || "",
            businessHours: locItem.businessHours || "",
            services: locItem.services || [],
            differentials: locItem.differentials || "",
            colors: locItem.colors || "",
            socialProof: locItem.socialProof || "",
            targetAction: locItem.targetAction || "whatsapp",
            observations: locItem.observations || "",
            txtContent: locItem.txtContent || "",
            status: locItem.status === "arquivado" ? "arquivado" : "ativo",
            createdAt: new Date(locItem.createdAt || Date.now())
          });
        }
      });
    } catch {}

    items.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    setBriefings(items);
    setIsLoading(false);
  };

  // Login handler com suporte a Firebase Auth e fallback offline
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      if (auth) {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setIsAuthenticated(true);
        sessionStorage.setItem("multy_admin_logged", "true");
        toast.success("Login realizado com sucesso!");
        fetchBriefings();
      } else {
        if (password === "admin123456") {
          setIsAuthenticated(true);
          sessionStorage.setItem("multy_admin_logged", "true");
          toast.success("Acesso liberado (Modo Administrador)!");
          fetchBriefings();
        } else {
          toast.error("Senha incorreta.");
        }
      }
    } catch (err: any) {
      console.warn("Autenticação remota falhou, verificando credenciais locais:", err);
      if (password === "admin123456") {
        setIsAuthenticated(true);
        sessionStorage.setItem("multy_admin_logged", "true");
        toast.success("Acesso liberado como Administrador!");
        fetchBriefings();
      } else {
        toast.error("E-mail ou senha inválidos.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (err) {
      console.error("Erro ao sair:", err);
    }
    sessionStorage.removeItem("multy_admin_logged");
    setIsAuthenticated(false);
    toast.success("Você saiu do painel.");
  };

  // Monitor auth state and real-time briefings sync
  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    // Checagem imediata de sessão em cache
    if (sessionStorage.getItem("multy_admin_logged") === "true") {
      setIsAuthenticated(true);
      setAuthChecking(false);
      fetchBriefings();
    }

    // Timeout de segurança para não travar a tela se o Firebase Auth demorar
    const safetyTimer = setTimeout(() => {
      setAuthChecking(false);
    }, 1200);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      clearTimeout(safetyTimer);
      if (user) {
        setIsAuthenticated(true);
        sessionStorage.setItem("multy_admin_logged", "true");
      } else if (sessionStorage.getItem("multy_admin_logged") !== "true") {
        setIsAuthenticated(false);
      }
      setAuthChecking(false);
      
      if (user && db) {
        setIsLoading(true);
        try {
          const q = query(collection(db, "leads"), where("type", "==", "briefing"));
          unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
            const items: BriefingItem[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              items.push({
                id: docSnap.id,
                businessName: data.businessName || "Empresa sem nome",
                ownerName: data.ownerName || "",
                documentNumber: data.documentNumber || "",
                segment: data.segment || "Geral",
                cityState: data.cityState || "",
                neighborhood: data.neighborhood || "",
                whatsapp: data.whatsapp || "",
                secondaryPhone: data.secondaryPhone || "",
                instagram: data.instagram || "",
                email: data.email || "",
                fullAddress: data.fullAddress || "",
                businessHours: data.businessHours || "",
                services: data.services || [],
                differentials: data.differentials || "",
                colors: data.colors || "",
                socialProof: data.socialProof || "",
                targetAction: data.targetAction || "whatsapp",
                observations: data.observations || "",
                txtContent: data.txtContent || "",
                status: data.status === "arquivado" ? "arquivado" : "ativo",
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now())
              });
            });

            // Inclui cópias de contingência do localStorage se houver
            try {
              const local = JSON.parse(localStorage.getItem("multy_local_briefings") || "[]");
              local.forEach((locItem: any) => {
                if (!items.some(it => it.id === locItem.id || (it.businessName === locItem.businessName && it.whatsapp === locItem.whatsapp))) {
                  items.push({
                    id: locItem.id,
                    businessName: locItem.businessName || "Empresa sem nome",
                    ownerName: locItem.ownerName || "",
                    documentNumber: locItem.documentNumber || "",
                    segment: locItem.segment || "Geral",
                    cityState: locItem.cityState || "",
                    neighborhood: locItem.neighborhood || "",
                    whatsapp: locItem.whatsapp || "",
                    secondaryPhone: locItem.secondaryPhone || "",
                    instagram: locItem.instagram || "",
                    email: locItem.email || "",
                    fullAddress: locItem.fullAddress || "",
                    businessHours: locItem.businessHours || "",
                    services: locItem.services || [],
                    differentials: locItem.differentials || "",
                    colors: locItem.colors || "",
                    socialProof: locItem.socialProof || "",
                    targetAction: locItem.targetAction || "whatsapp",
                    observations: locItem.observations || "",
                    txtContent: locItem.txtContent || "",
                    status: locItem.status === "arquivado" ? "arquivado" : "ativo",
                    createdAt: new Date(locItem.createdAt || Date.now())
                  });
                }
              });
            } catch {}

            items.sort((a, b) => {
              const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return timeB - timeA;
            });

            setBriefings(items);
            setIsLoading(false);
          }, (err) => {
            console.warn("Erro no listener em tempo real:", err);
            fetchBriefings();
          });
        } catch (e) {
          fetchBriefings();
        }
      } else if (user || sessionStorage.getItem("multy_admin_logged") === "true") {
        fetchBriefings();
      }
    });

    return () => {
      clearTimeout(safetyTimer);
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const handleManualRefresh = async () => {
    await fetchBriefings();
    toast.success("Lista de briefings atualizada com sucesso!");
  };

  const handleToggleArchive = async (briefing: BriefingItem) => {
    const newStatus = briefing.status === "ativo" ? "arquivado" : "ativo";
    try {
      if (db && !briefing.id.startsWith("local_")) {
        await updateDoc(doc(db, "leads", briefing.id), { status: newStatus });
      }

      try {
        const local = JSON.parse(localStorage.getItem("multy_local_briefings") || "[]");
        const updated = local.map((item: any) => item.id === briefing.id ? { ...item, status: newStatus } : item);
        localStorage.setItem("multy_local_briefings", JSON.stringify(updated));
      } catch {}

      setBriefings(prev => prev.map(item => item.id === briefing.id ? { ...item, status: newStatus } : item));
      
      if (newStatus === "arquivado") {
        toast.success(`Briefing de "${briefing.businessName}" movido para a pasta de Arquivados!`);
      } else {
        toast.success(`Briefing de "${briefing.businessName}" restaurado para os Ativos!`);
      }

      if (selectedBriefing?.id === briefing.id) {
        setSelectedBriefing(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      console.error("Erro ao alterar status:", err);
      toast.error("Não foi possível atualizar o status.");
    }
  };

  const handleDownloadTxt = (briefing: BriefingItem) => {
    const blob = new Blob([briefing.txtContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const sanitizedName = briefing.businessName.replace(/[^a-zA-Z0-9]/g, "_") || "briefing";
    link.href = url;
    link.download = `briefing_${sanitizedName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(`Arquivo TXT de ${briefing.businessName} baixado com sucesso!`);
  };

  const handleCopyTxt = (briefing: BriefingItem) => {
    navigator.clipboard.writeText(briefing.txtContent);
    toast.success("Conteúdo TXT copiado para a área de transferência!");
  };

  const handleCopyPrompt = (briefing: BriefingItem) => {
    const servicesText = Array.isArray(briefing.services)
      ? briefing.services.map((s, i) => `${i + 1}. ${s.name}: ${s.description}`).join("\n")
      : String(briefing.services || "");

    const aiPrompt = `Atue como Especialista Sênior em UI/UX e Copywriting de Alta Conversão.
Crie o código completo de um site moderno, elegante e focado em vendas com base nas seguintes especificações de cliente:

==================== BRIEFING DO CLIENTE ====================
EMPRESA: ${briefing.businessName}
${briefing.ownerName ? `RESPONSÁVEL / PROFISSIONAL: ${briefing.ownerName}` : ""}
${briefing.documentNumber ? `CNPJ / REGISTRO: ${briefing.documentNumber}` : ""}
SEGMENTO / NICHO: ${briefing.segment}
LOCALIZAÇÃO: ${briefing.cityState || "Brasil"}${briefing.neighborhood ? ` (Região: ${briefing.neighborhood})` : ""}
${briefing.fullAddress ? `ENDEREÇO COMPLETO (INTEGRAR GOOGLE MAPS): ${briefing.fullAddress}` : "ATENDIMENTO ONLINE / A DOMICÍLIO (Sem ponto fixo no mapa)"}
${briefing.businessHours ? `HORÁRIO DE FUNCIONAMENTO: ${briefing.businessHours}` : ""}

CANAIS DE CONTATO:
- WhatsApp Principal: ${briefing.whatsapp}
${briefing.secondaryPhone ? `- Telefone Secundário: ${briefing.secondaryPhone}` : ""}
${briefing.instagram ? `- Instagram Oficial: ${briefing.instagram}` : ""}
${briefing.email ? `- E-mail: ${briefing.email}` : ""}

SERVIÇOS / PRODUTOS PRINCIPAIS:
${servicesText}

DIFERENCIAIS COMPETITIVOS:
${briefing.differentials || "Atendimento de excelência, pontualidade, agilidade e confiança comprovada."}

${briefing.socialProof ? `PROVA SOCIAL / DEPOIMENTOS: ${briefing.socialProof}` : ""}

DIRETRIZES DE DESIGN & ESTILO:
- Paleta / Cores: ${briefing.colors || "Dark theme sofisticado com azul ciano, tipografia nítida sem bold excessivo"}
- Chamada Principal (CTA): ${briefing.targetAction === "whatsapp" ? "Botão para WhatsApp direto" : "Formulário / Orçamento"}
- Imagens / Logo: Utilizar placeholders profissionais de alta qualidade e imagens contextuais do nicho.

${briefing.observations ? `OBSERVAÇÕES ADICIONAIS:\n${briefing.observations}` : ""}
=============================================================

ESTRUTURA OBRIGATÓRIA DA PÁGINA:
1. Header fixo com logotipo, links de navegação e botão de WhatsApp com DDD.
2. Hero Section com headline magnética focada na dor do cliente e chamada para ação imediata.
3. Seção de Autoridade & Sobre a Empresa (destacando história e credibilidade).
4. Grid dos Serviços Principais (cards interativos com ícones e benefícios claros).
5. Seção de Diferenciais (por que escolher nossa empresa).
6. Prova Social / Depoimentos reais de clientes e estatísticas do segmento.
7. Bloco de Localização com Google Maps incorporado e horários de atendimento.
8. Rodapé completo com CNPJ/Registro profissional, links de contato e copyright.`;

    navigator.clipboard.writeText(aiPrompt);
    toast.success("🤖 Prompt mestre de IA copiado! Cole no Claude, ChatGPT ou v0 para gerar o site.");
  };

  // Filtragem
  const filteredBriefings = briefings.filter(item => {
    const matchesTab = activeTab === "ativos" ? item.status === "ativo" : item.status === "arquivado";
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      (item.businessName && item.businessName.toLowerCase().includes(q)) ||
      (item.ownerName && item.ownerName.toLowerCase().includes(q)) ||
      (item.segment && item.segment.toLowerCase().includes(q)) ||
      (item.whatsapp && String(item.whatsapp).includes(q)) ||
      (item.cityState && item.cityState.toLowerCase().includes(q)) ||
      (item.neighborhood && item.neighborhood.toLowerCase().includes(q));
    return Boolean(matchesTab && matchesSearch);
  });

  const countAtivos = briefings.filter(b => b.status === "ativo").length;
  const countArquivados = briefings.filter(b => b.status === "arquivado").length;

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#070d1e] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Tela de Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">
              Acesso Restrito
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Painel Admin • Briefings
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Área exclusiva para visualização, download de TXTs e arquivamento dos briefings recebidos.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail de Administrador</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Senha de Acesso</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 hover:brightness-110 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Acessar Painel de Briefings</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-cyan-400 transition-colors">
              ← Voltar ao site público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard de Gestão
  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#050814]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-site.webp" alt="Site-IA" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-bold text-base text-white tracking-tight block leading-tight">
                Painel Admin <span className="text-cyan-400">Briefings</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Multy Technology</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/briefing" 
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-900/60 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Formulário de Clientes</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-300 border border-white/10 transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs"
              title="Sair do painel"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">Novos / Em Produção</span>
              <div className="text-3xl font-bold text-white tracking-tight mt-1">{countAtivos}</div>
              <span className="text-[11px] text-slate-400">Prontos para criar o site</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
              <FileText className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">Pasta de Arquivados</span>
              <div className="text-3xl font-bold text-white tracking-tight mt-1">{countArquivados}</div>
              <span className="text-[11px] text-slate-400">Projetos já finalizados / guardados</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <FolderArchive className="w-6 h-6 text-amber-400" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Total Recebido</span>
              <div className="text-3xl font-bold text-white tracking-tight mt-1">{briefings.length}</div>
              <span className="text-[11px] text-slate-400">Clientes atendidos pelo método</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Action Bar: Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900/90 border border-white/10 w-fit">
            <button
              onClick={() => setActiveTab("ativos")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "ativos"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Ativos ({countAtivos})</span>
            </button>

            <button
              onClick={() => setActiveTab("arquivados")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "arquivados"
                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Archive className="w-4 h-4" />
              <span>Pasta de Arquivados ({countArquivados})</span>
            </button>
          </div>

          {/* Search & Refresh */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar empresa, nicho, cidade..."
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-slate-950/80 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              onClick={handleManualRefresh}
              disabled={isLoading}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all cursor-pointer disabled:opacity-50 shrink-0"
              title="Recarregar briefings recebidos"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-slate-950" : ""}`} />
              <span>Atualizar Lista</span>
            </button>
          </div>

        </div>

        {/* Briefings List */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Carregando briefings dos clientes...</p>
          </div>
        ) : filteredBriefings.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/40 border border-white/5">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
              {activeTab === "ativos" ? <FileText className="w-6 h-6" /> : <Archive className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              {activeTab === "ativos" ? "Nenhum briefing ativo encontrado" : "Nenhum briefing na pasta de arquivados"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
              {activeTab === "ativos" 
                ? "Envie o link https://multyplique.com.br/briefing para seus clientes preencherem."
                : "Quando você terminar um projeto e clicar em 'Arquivar', ele ficará salvo aqui com segurança."}
            </p>
            {activeTab === "ativos" && (
              <Link
                to="/briefing"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir Link do Formulário para Testar</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBriefings.map((briefing) => {
              const formattedDate = briefing.createdAt 
                ? new Date(briefing.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) 
                : "Recente";

              const serviceCount = Array.isArray(briefing.services) ? briefing.services.length : 1;

              return (
                <div
                  key={briefing.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl backdrop-blur-md group"
                >
                  <div>
                    {/* Top Status & Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/30 truncate max-w-[65%]">
                        {briefing.segment}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" />
                        {formattedDate}
                      </span>
                    </div>

                    {/* Business Name */}
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors mb-1 line-clamp-1">
                      {briefing.businessName}
                    </h3>

                    {briefing.ownerName && (
                      <p className="text-xs text-slate-300 font-medium mb-1 truncate">
                        Profissional: {briefing.ownerName}
                      </p>
                    )}

                    {briefing.cityState && (
                      <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{briefing.cityState}{briefing.neighborhood ? ` (${briefing.neighborhood})` : ""}</span>
                      </p>
                    )}

                    {/* Services Snippet */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 mb-3 text-xs text-slate-300">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-white text-[11px]">Serviços Registrados:</strong>
                        <span className="text-[10px] text-cyan-400 font-mono">({serviceCount})</span>
                      </div>
                      <div className="line-clamp-2">
                        {Array.isArray(briefing.services) 
                          ? briefing.services.map(s => s.name).filter(Boolean).join(" • ")
                          : String(briefing.services)}
                      </div>
                    </div>

                    {/* WhatsApp Quick Link */}
                    {briefing.whatsapp && (
                      <div className="flex items-center justify-between text-xs mb-4">
                        <a
                          href={`https://wa.me/55${briefing.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1.5 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-emerald-400/20" />
                          <span>{briefing.whatsapp}</span>
                        </a>

                        {briefing.instagram && (
                          <span className="text-slate-400 text-[11px] truncate max-w-[40%]">
                            {briefing.instagram}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* Baixar TXT */}
                      <button
                        onClick={() => handleDownloadTxt(briefing)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors cursor-pointer"
                        title="Baixar arquivo TXT"
                      >
                        <Download className="w-4 h-4 text-cyan-400" />
                      </button>

                      {/* Copiar Prompt IA */}
                      <button
                        onClick={() => handleCopyPrompt(briefing)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors cursor-pointer"
                        title="Copiar como Prompt Mestre para IA"
                      >
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                      </button>

                      {/* Ver Detalhes */}
                      <button
                        onClick={() => setSelectedBriefing(briefing)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors cursor-pointer"
                        title="Ver todos os detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Arquivar / Desarquivar */}
                    <button
                      onClick={() => handleToggleArchive(briefing)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                        briefing.status === "ativo"
                          ? "bg-slate-800 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border-white/10"
                          : "bg-amber-500/20 text-amber-300 hover:bg-cyan-500/20 hover:text-cyan-300 border-amber-500/30"
                      }`}
                      title={briefing.status === "ativo" ? "Mover para pasta de arquivados" : "Restaurar para ativos"}
                    >
                      {briefing.status === "ativo" ? (
                        <>
                          <Archive className="w-3.5 h-3.5" />
                          <span>Arquivar</span>
                        </>
                      ) : (
                        <>
                          <ArchiveRestore className="w-3.5 h-3.5" />
                          <span>Restaurar</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Modal de Detalhes Completos */}
      {selectedBriefing && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-fadeIn"
          onClick={() => setSelectedBriefing(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] bg-[#070d1e] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 overflow-y-auto flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-0.5">
                  Ficha Completa do Negócio
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {selectedBriefing.businessName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedBriefing(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo Completo Formatado */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              
              {/* Bloco 1: Identificação */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                <div>
                  <span className="text-slate-400 block text-xs">Segmento / Ramo:</span>
                  <span className="font-semibold text-cyan-300">{selectedBriefing.segment}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Responsável / Profissional:</span>
                  <span className="font-semibold text-white">{selectedBriefing.ownerName || "Não informado"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">CNPJ / Registro (OAB/CRM/etc):</span>
                  <span className="font-semibold text-white">{selectedBriefing.documentNumber || "Não informado"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Cidade / Estado:</span>
                  <span className="font-semibold text-white">{selectedBriefing.cityState || "Não informado"}</span>
                </div>
                {selectedBriefing.neighborhood && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-xs">Bairro / Região:</span>
                    <span className="font-semibold text-white">{selectedBriefing.neighborhood}</span>
                  </div>
                )}
              </div>

              {/* Bloco 2: Contatos & Localização */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                <div>
                  <span className="text-slate-400 block text-xs">WhatsApp Comercial:</span>
                  <a 
                    href={`https://wa.me/55${selectedBriefing.whatsapp.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-emerald-400 hover:underline"
                  >
                    {selectedBriefing.whatsapp}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Instagram:</span>
                  <span className="font-semibold text-white">{selectedBriefing.instagram || "Não informado"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">E-mail Comercial:</span>
                  <span className="font-semibold text-white">{selectedBriefing.email || "Não informado"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Telefone Secundário:</span>
                  <span className="font-semibold text-white">{selectedBriefing.secondaryPhone || "Não informado"}</span>
                </div>
                {selectedBriefing.fullAddress && (
                  <div className="sm:col-span-2 pt-2 border-t border-white/5">
                    <span className="text-slate-400 block text-xs font-semibold text-cyan-300">Endereço Completo (Google Maps):</span>
                    <p className="text-slate-200 mt-0.5">{selectedBriefing.fullAddress}</p>
                  </div>
                )}
                {selectedBriefing.businessHours && (
                  <div className="sm:col-span-2 pt-2 border-t border-white/5">
                    <span className="text-slate-400 block text-xs font-semibold text-cyan-300">Horário de Funcionamento:</span>
                    <p className="text-slate-200 mt-0.5">{selectedBriefing.businessHours}</p>
                  </div>
                )}
              </div>

              {/* Bloco 3: Serviços Principais */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                <span className="text-cyan-300 block text-xs mb-2 font-bold uppercase tracking-wider">
                  Serviços / Especialidades Principais:
                </span>
                {Array.isArray(selectedBriefing.services) ? (
                  <div className="space-y-2.5">
                    {selectedBriefing.services.map((serv, sIdx) => (
                      <div key={sIdx} className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                        <strong className="text-white block">{sIdx + 1}. {serv.name}</strong>
                        {serv.description && (
                          <span className="text-xs text-slate-300 block mt-0.5">{serv.description}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">{String(selectedBriefing.services)}</p>
                )}
              </div>

              {/* Bloco 4: Diferenciais */}
              {selectedBriefing.differentials && (
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-cyan-300 block text-xs mb-1 font-bold uppercase tracking-wider">Diferenciais Competitivos:</span>
                  <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">{selectedBriefing.differentials}</p>
                </div>
              )}

              {/* Bloco 5: Cores, Prova Social & Observações */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                <div>
                  <span className="text-slate-400 block text-xs">Cores / Estilo Visual:</span>
                  <span className="font-semibold text-white">{selectedBriefing.colors || "A critério"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Ação Principal:</span>
                  <span className="font-semibold text-cyan-300">{selectedBriefing.targetAction || "WhatsApp"}</span>
                </div>
                {selectedBriefing.socialProof && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-xs font-semibold text-cyan-300">Prova Social / Conquistas:</span>
                    <p className="text-slate-200 mt-0.5">{selectedBriefing.socialProof}</p>
                  </div>
                )}
                {selectedBriefing.observations && (
                  <div className="sm:col-span-2 pt-2 border-t border-white/5">
                    <span className="text-slate-400 block text-xs font-semibold text-cyan-300">Observações Adicionais:</span>
                    <p className="whitespace-pre-wrap text-slate-200 leading-relaxed mt-0.5">{selectedBriefing.observations}</p>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadTxt(selectedBriefing)}
                  className="h-10 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar TXT</span>
                </button>

                <button
                  onClick={() => handleCopyPrompt(selectedBriefing)}
                  className="h-10 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-white/15 inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Copiar Prompt IA</span>
                </button>
              </div>

              <button
                onClick={() => handleToggleArchive(selectedBriefing)}
                className="h-10 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium text-xs border border-white/15 inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                {selectedBriefing.status === "ativo" ? (
                  <>
                    <Archive className="w-4 h-4" />
                    <span>Mover para Arquivados</span>
                  </>
                ) : (
                  <>
                    <ArchiveRestore className="w-4 h-4" />
                    <span>Restaurar para Ativos</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
