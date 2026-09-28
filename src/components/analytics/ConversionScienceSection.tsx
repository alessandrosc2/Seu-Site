import React, { useState, useId } from "react";
import { 
  TrendingDown, 
  TrendingUp, 
  ShieldAlert, 
  Search, 
  Bot, 
  Share2, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  AlertTriangle,
  Scale
} from "lucide-react";

interface MetricSource {
  title: string;
  source: string;
  detail: string;
}

export function ConversionScienceSection() {
  const [activeTab, setActiveTab] = useState<"leakage" | "social" | "ai">("leakage");
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [faturamentoSimulado, setFaturamentoSimulado] = useState<number>(15000);
  const sliderId = useId();

  // Mathematical impact calculations based on +39% revenue (Deloitte/SCORE)
  const ganhoPotencialMes = Math.round(faturamentoSimulado * 0.39);
  const perdaAnualEstimada = ganhoPotencialMes * 12;

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="dados-conversao" 
      className="relative bg-[#060a17] text-slate-100 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-b border-white/10 overflow-hidden"
      aria-labelledby="analytics-heading"
    >
      {/* Background Atmospheric Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-950/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[450px] h-[350px] bg-rose-950/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        
        {/* 1. Header da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 mb-5 tracking-wider uppercase">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            Diagnóstico de Mercado & Conversão
          </div>

          <h2 id="analytics-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.2]">
            Você não está apenas perdendo cliques. <br className="hidden sm:inline" />
            Está entregando <span className="text-cyan-400 font-bold">+39% mais receita</span> para a concorrência.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            O custo invisível de não ter um site estruturado é medido em orçamentos perdidos, descarte instantâneo e desconfiança do cliente. Veja o que os maiores estudos globais de comportamento revelam:
          </p>
        </div>

        {/* 2. Bento Grid Central (Cards de Dados e Gráficos) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          
          {/* CARD 1: KPI de Perda - Destaque Crítico (Gauge & Descarte) */}
          <div className="md:col-span-12 lg:col-span-5 bg-gradient-to-b from-rose-950/20 via-slate-900/60 to-slate-900/80 border border-rose-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(244,63,94,0.08)]">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <TrendingDown className="w-32 h-32 text-rose-400" />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Barreira de Desconfiança Imediata
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === "card1" ? null : "card1")}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label="Ver fonte da pesquisa"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Tooltip Content */}
              {activeTooltip === "card1" && (
                <div className="mb-4 p-3 bg-slate-950/90 border border-white/10 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-rose-300">Fonte:</strong> Estudo Blue Corona & BrightLocal Consumer Trust Index.
                </div>
              )}

              {/* Indicador Numérico com Medidor */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-6xl sm:text-7xl font-bold tracking-tight text-white">56%</span>
                <span className="text-rose-400 font-semibold text-sm uppercase tracking-wide">dos consumidores</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Afirmam categoricamente que <strong className="text-rose-200">não confiam</strong> em empresas e profissionais que não possuem site próprio oficial.
              </p>

              {/* Gauge Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Rejeição por ausência de site</span>
                  <span className="font-semibold text-rose-400">56% de desconfiança</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full w-[56%]" />
                </div>
              </div>
            </div>

            {/* Sub-alerta de Descarte Imediato */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/20 text-xs text-slate-300 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0 mt-0.5 text-rose-400 font-bold">
                30%
              </div>
              <div>
                <p className="font-semibold text-white mb-0.5">Descarte Instantâneo de Compra</p>
                <p className="text-slate-300 leading-relaxed">
                  30% dos clientes descartam a empresa e nem sequer entram em contato se não acharem o site nas buscas <span className="text-slate-400">(Fonte: Visual Objects / Blue Corona)</span>.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: Gráfico Comparativo & Simulador de Faturamento */}
          <div className="md:col-span-12 lg:col-span-7 bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Alavancagem Financeira Comprovada
                </span>
                <span className="text-xs text-slate-400">Fonte: Deloitte / SCORE Research</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Metric 1 */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/25">
                  <span className="text-xs text-slate-400 block mb-1">Diferença de Faturamento</span>
                  <div className="text-3xl font-bold text-emerald-400 tracking-tight mb-1">+39%</div>
                  <p className="text-xs text-slate-300">Receita média adicional gerada por pequenas empresas com site estruturado.</p>
                </div>
                {/* Metric 2 */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/25">
                  <span className="text-xs text-slate-400 block mb-1">Geração de Oportunidades</span>
                  <div className="text-3xl font-bold text-cyan-400 tracking-tight mb-1">+40%</div>
                  <p className="text-xs text-slate-300">Aumento no volume de orçamentos e leads qualificados <span className="text-slate-400">(SteadyWeb Study)</span>.</p>
                </div>
              </div>

              {/* Simulador Interativo de Custo de Inação */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#070e20] border border-cyan-500/20 mb-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                  <label htmlFor={sliderId} className="text-xs font-semibold text-slate-200">
                    Simule seu Faturamento Mensal Atual:
                  </label>
                  <span className="text-sm font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-500/30">
                    R$ {faturamentoSimulado.toLocaleString("pt-BR")} / mês
                  </span>
                </div>

                <input 
                  id={sliderId}
                  type="range" 
                  min="3000" 
                  max="100000" 
                  step="1000"
                  value={faturamentoSimulado}
                  onChange={(e) => setFaturamentoSimulado(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mb-4"
                  aria-label="Ajustar faturamento mensal simulado"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/5">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Receita Deixada na Mesa / Mês</span>
                    <span className="text-lg font-bold text-amber-300">
                      + R$ {ganhoPotencialMes.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-rose-400 uppercase tracking-wider block font-semibold">Vazamento Anual Estimado</span>
                    <span className="text-lg font-bold text-rose-400">
                      - R$ {perdaAnualEstimada.toLocaleString("pt-BR")} / ano
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic text-center sm:text-left">
              *Projeção baseada na correlação histórica média de 39% a mais de vendas em PMEs digitais com domínio próprio.
            </p>
          </div>

          {/* CARD 3: A Batalha da Autoridade (Site vs. Redes Sociais) */}
          <div className="md:col-span-6 bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  Site vs. Redes Sociais
                </span>
                <span className="text-xs text-slate-400">Fonte: Verisign</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                84% dos consumidores preferem site
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Afirmam que uma empresa com site próprio transmite <strong className="text-white">muito mais credibilidade e solidez</strong> do que apenas uma página ou perfil no Instagram/WhatsApp.
              </p>

              {/* Visual Split */}
              <div className="space-y-3 mb-6">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-cyan-300 font-semibold">Site Oficial Próprio</span>
                    <span className="text-cyan-400 font-bold">84%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-[84%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Apenas Perfil em Rede Social</span>
                    <span className="text-slate-400 font-semibold">16%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-slate-700 rounded-full w-[16%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stanford University Credibility Index */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                75% — Índice de Credibilidade de Stanford
              </div>
              <p className="text-slate-300 leading-relaxed">
                Estudos da Universidade de Stanford revelam que 75% dos usuários julgam a idoneidade, seriedade e tamanho real da empresa exclusivamente pela estética e consistência do seu site.
              </p>
            </div>
          </div>

          {/* CARD 4: Radar de Comportamento do Consumidor (PwC & BrightLocal) */}
          <div className="md:col-span-6 bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-purple-400" />
                  Jornada de Busca do Consumidor
                </span>
                <span className="text-xs text-slate-400">PwC & BrightLocal</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-3xl sm:text-4xl font-bold text-white block mb-1 tracking-tight">79%</span>
                  <span className="text-xs font-semibold text-purple-300 block mb-1">No Brasil (PwC)</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Pesquisam no Google antes de realizar qualquer compra local ou contratar serviço.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/10">
                  <span className="text-3xl sm:text-4xl font-bold text-white block mb-1 tracking-tight">98%</span>
                  <span className="text-xs font-semibold text-cyan-300 block mb-1">Busca Local (BrightLocal)</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Pesquisam online antes de visitar a loja física, ligar ou pedir orçamento por WhatsApp.
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Quando essa audiência pesquisa a sua área de atuação no bairro ou cidade e não encontra o seu site, o fluxo migra de bandeja para a empresa concorrente que tem domínio configurado.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                Tráfego orgânico com intenção de compra
              </span>
              <span className="font-semibold text-emerald-400">Custo por clique = R$ 0,00</span>
            </div>
          </div>

        </div>

        {/* 3. Painel dos 3 Gargalos Estruturais (Pilares Narrativos) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-2">
              Análise Crítica de Infraestrutura
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Os 3 Pilares do Desgaste Comercial
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pilar 1: O Vazamento Invisível */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-rose-500/40 transition-colors backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-5">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-tight">
                  1. O Vazamento Invisível de Vendas
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  O cliente ouve falar do seu negócio por indicação ou anúncio, abre o Google para ver quem você é e… <strong>não acha o site oficial</strong>.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ele não avisa que não encontrou você. Ele simplesmente clica no próximo resultado da lista e fecha negócio com quem tem endereço digital seguro e tabela clara.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                Perda silenciosa e impossível de rastrear
              </div>
            </div>

            {/* Pilar 2: A Armadilha do Apenas Instagram */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-colors backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                  <Share2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-tight">
                  2. A Armadilha do "Apenas Redes Sociais"
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Construir negócio unicamente no Instagram ou TikTok é <strong>construir casa de luxo em terreno alugado</strong>.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O algoritmo entrega posts para menos de 5% da sua audiência, não permite instalar Google Analytics nem Pixel profundo para remarketing e pode banir sua conta sem aviso prévio.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                Dependência total de algoritmos instáveis
              </div>
            </div>

            {/* Pilar 3: A Era das IAs e Buscas Semânticas */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-colors backdrop-blur-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                  <Bot className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-tight">
                  3. Invisibilidade na Era das IAs (LLMs)
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Mecanismos como <strong>ChatGPT, Google Gemini e Perplexity</strong> já respondem milhões de pesquisas de recomendação de serviços.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Essas inteligências leem dados estruturados (Schema.org e sitemaps indexados). Quem não tem site próprio não existe no cérebro das novas ferramentas de busca.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                SEO Semântico e indexação por IA
              </div>
            </div>

          </div>
        </div>

        {/* 4. Call to Action (CTA) Final de Conversão */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border border-cyan-500/40 p-8 sm:p-12 text-center backdrop-blur-md overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20 inline-block">
              Decisão Estratégica
            </span>

            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              O custo de um site é pago em poucos dias. <br />
              O custo de <span className="text-rose-400">não ter um site</span> continua sangrando todos os meses.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Com o método <strong>Seu Site Único</strong>, você implementa seu domínio corporativo profissional guiado por IA em minutos, sem depender de programadores caros ou meses de espera.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToPricing}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm sm:text-base hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/25 hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Estancar Vazamento de Vendas: Criar Meu Site Profissional</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Acesso imediato ao manual prático interativo · Garantia incondicional de 7 dias · Pagamento único
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
