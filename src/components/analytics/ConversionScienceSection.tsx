import React, { useState, useId } from "react";
import { 
  TrendingDown, 
  TrendingUp, 
  ShieldAlert, 
  Search, 
  Bot, 
  Share2, 
  ArrowRight, 
  ArrowDown,
  Info, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  AlertTriangle,
  Scale
} from "lucide-react";

export function ConversionScienceSection() {
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
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 mb-6 tracking-wider uppercase shadow-sm">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            Diagnóstico de Mercado & Conversão
          </div>

          <h2 id="analytics-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.2]">
            Você não está apenas perdendo cliques. <br className="hidden sm:inline" />
            Está entregando <span className="text-cyan-400 font-bold">+39% mais receita</span> para a concorrência.
          </h2>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal">
            O custo invisível de não ter um site estruturado é medido em orçamentos perdidos, descarte instantâneo e desconfiança do cliente. Veja o que os maiores estudos globais de comportamento revelam:
          </p>
        </div>

        {/* 2. Bento Grid Central (Cards de Dados e Gráficos) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-20">
          
          {/* CARD 1: KPI de Perda - Destaque Crítico (Gauge & Descarte) */}
          <div className="md:col-span-12 lg:col-span-5 bg-gradient-to-b from-rose-950/25 via-slate-900/70 to-slate-900/90 border border-rose-500/35 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(244,63,94,0.1)]">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <TrendingDown className="w-36 h-36 text-rose-400" />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Barreira de Desconfiança Imediata
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTooltip(activeTooltip === "card1" ? null : "card1")}
                  className="p-1.5 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Ver fonte da pesquisa"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Tooltip Content */}
              {activeTooltip === "card1" && (
                <div className="mb-5 p-3.5 bg-slate-950/95 border border-white/15 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed shadow-lg">
                  <strong className="text-rose-300">Fonte:</strong> Estudo Blue Corona & BrightLocal Consumer Trust Index.
                </div>
              )}

              {/* Indicador Numérico com Medidor */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">56%</span>
                <span className="text-rose-400 font-bold text-sm sm:text-base uppercase tracking-wider">dos consumidores</span>
              </div>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                Afirmam categoricamente que <strong className="text-rose-200 font-bold">não confiam</strong> em empresas e profissionais que não possuem site próprio oficial.
              </p>

              {/* Gauge Progress Bar */}
              <div className="space-y-2.5 mb-8">
                <div className="flex justify-between text-xs sm:text-sm text-slate-300 font-medium">
                  <span>Rejeição por ausência de site</span>
                  <span className="font-bold text-rose-400">56% de desconfiança</span>
                </div>
                <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full w-[56%]" />
                </div>
              </div>
            </div>

            {/* Sub-alerta de Descarte Imediato */}
            <div className="p-5 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0 text-rose-300 font-extrabold text-lg">
                30%
              </div>
              <div>
                <p className="font-bold text-white text-base mb-1">Descarte Instantâneo de Compra</p>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  30% dos clientes descartam a empresa e nem sequer entram em contato se não acharem o site nas buscas <span className="text-slate-400 font-medium">(Fonte: Visual Objects / Blue Corona)</span>.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: Gráfico Comparativo & Simulador de Faturamento */}
          <div className="md:col-span-12 lg:col-span-7 bg-slate-900/70 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Alavancagem Financeira Comprovada
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-300">Fonte: Deloitte / SCORE Research</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                {/* Metric 1 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
                  <span className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Diferença de Faturamento</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight mb-2">+39%</div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    Receita média adicional gerada por pequenas empresas com site estruturado.
                  </p>
                </div>
                {/* Metric 2 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30">
                  <span className="text-xs sm:text-sm font-medium text-slate-300 block mb-1.5">Geração de Oportunidades</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-cyan-400 tracking-tight mb-2">+40%</div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    Aumento no volume de orçamentos e leads qualificados <span className="text-slate-400 font-medium">(SteadyWeb Study)</span>.
                  </p>
                </div>
              </div>

              {/* Simulador Interativo de Custo de Inação */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#070e20] border border-cyan-500/30 mb-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3.5">
                  <label htmlFor={sliderId} className="text-sm sm:text-base font-semibold text-slate-100">
                    Simule seu Faturamento Mensal Atual:
                  </label>
                  <span className="text-base sm:text-lg font-bold text-cyan-300 bg-cyan-950 px-4 py-1.5 rounded-xl border border-cyan-500/40">
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
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 mb-5"
                  aria-label="Ajustar faturamento mensal simulado"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                      Receita Deixada na Mesa / Mês
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-amber-300">
                      + R$ {ganhoPotencialMes.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-rose-300 uppercase tracking-wider block mb-1">
                      Vazamento Anual Estimado
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-rose-400">
                      - R$ {perdaAnualEstimada.toLocaleString("pt-BR")} / ano
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 italic text-center sm:text-left font-normal">
              *Projeção baseada na correlação histórica média de 39% a mais de vendas em pequenas empresas digitais com domínio próprio oficial.
            </p>
          </div>

          {/* CARD 3: A Batalha da Autoridade (Site vs. Redes Sociais) */}
          <div className="md:col-span-6 bg-slate-900/70 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  Site vs. Redes Sociais
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-300">Fonte: Verisign</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                84% dos consumidores preferem site
              </h3>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                Afirmam que uma empresa com site próprio transmite <strong className="text-white font-bold">muito mais credibilidade e solidez</strong> do que apenas uma página ou perfil no Instagram/WhatsApp.
              </p>

              {/* Visual Split */}
              <div className="space-y-4 mb-6">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm sm:text-base font-semibold">
                    <span className="text-cyan-300">Site Oficial Próprio</span>
                    <span className="text-cyan-400 font-extrabold">84%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-[84%]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-slate-300 font-medium">Apenas Perfil em Rede Social</span>
                    <span className="text-slate-300 font-bold">16%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-slate-700 rounded-full w-[16%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stanford University Credibility Index */}
            <div className="p-5 sm:p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
              <div className="flex items-center gap-2.5 text-cyan-300 font-bold text-base sm:text-lg mb-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                O Valor da Credibilidade Visual
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                Pesquisas de experiência do usuário indicam que a grande maioria das pessoas avalia a seriedade e a credibilidade de um negócio com base na estética e profissionalismo do seu site.
              </p>
            </div>
          </div>

          {/* CARD 4: Radar de Comportamento do Consumidor (PwC & BrightLocal) */}
          <div className="md:col-span-6 bg-slate-900/70 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                  <Search className="w-4 h-4 text-purple-400" />
                  Jornada de Busca do Consumidor
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-300">PwC & BrightLocal</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-white/15">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white block mb-2 tracking-tight">79%</span>
                  <span className="text-sm font-bold text-purple-300 block mb-2">No Brasil (PwC)</span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    Pesquisam no Google antes de realizar qualquer compra local ou contratar serviço.
                  </p>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-white/15">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white block mb-2 tracking-tight">98%</span>
                  <span className="text-xs sm:text-sm font-bold text-cyan-300 block mb-2">Busca Local (BrightLocal)</span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                    Pesquisam online antes de visitar a loja física, ligar ou pedir orçamento por WhatsApp.
                  </p>
                </div>
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                Quando essa audiência pesquisa a sua área de atuação no bairro ou cidade e não encontra o seu site, o fluxo migra de bandeja para a empresa concorrente que tem domínio configurado.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm sm:text-base text-slate-200">
              <span className="flex items-center gap-2.5 font-medium">
                <Users className="w-5 h-5 text-cyan-400 shrink-0" />
                Tráfego orgânico com intenção de compra
              </span>
              <span className="font-bold text-emerald-400 text-base">Custo por clique = R$ 0,00</span>
            </div>
          </div>

        </div>

        {/* 3. Painel dos 3 Gargalos Estruturais (Pilares Narrativos) */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-widest block mb-3">
              Análise Crítica de Infraestrutura
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Os 3 Pilares do Desgaste Comercial
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Pilar 1: O Vazamento Invisível */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/15 hover:border-rose-500/40 transition-colors backdrop-blur-sm flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6">
                  <TrendingDown className="w-7 h-7" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                  1. O Vazamento Invisível de Vendas
                </h4>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-4 font-normal">
                  O cliente ouve falar do seu negócio por indicação ou anúncio, abre o Google para ver quem você é e… <strong className="text-white">não acha o site oficial</strong>.
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Ele não avisa que não encontrou você. Ele simplesmente clica no próximo resultado da lista e fecha negócio com quem tem endereço digital seguro e tabela clara.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-2.5 text-sm font-semibold text-rose-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Perda silenciosa e impossível de rastrear
              </div>
            </div>

            {/* Pilar 2: A Armadilha do Apenas Instagram */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/15 hover:border-amber-500/40 transition-colors backdrop-blur-sm flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                  <Share2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                  2. A Armadilha do "Apenas Redes Sociais"
                </h4>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-4 font-normal">
                  Construir negócio unicamente no Instagram ou TikTok é <strong className="text-white">construir casa de luxo em terreno alugado</strong>.
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Redes sociais tendem a limitar a distribuição orgânica, restringem métricas avançadas (como Google Analytics) e mantêm o negócio vulnerável a regras de terceiros.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-2.5 text-sm font-semibold text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Exposição a mudanças de alcance não controladas pelo dono do negócio
              </div>
            </div>

            {/* Pilar 3: A Era das IAs e Buscas Semânticas */}
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/15 hover:border-cyan-500/40 transition-colors backdrop-blur-sm flex flex-col justify-between shadow-lg">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
                  <Bot className="w-7 h-7" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                  3. Invisibilidade na Era das IAs (LLMs)
                </h4>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-4 font-normal">
                  Mecanismos como <strong className="text-white">ChatGPT, Google Gemini e Perplexity</strong> já respondem milhões de pesquisas de recomendação de serviços.
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Essas inteligências leem dados estruturados (Schema.org e sitemaps indexados). Quem não tem site próprio não existe no cérebro das novas ferramentas de busca.
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-2.5 text-sm font-semibold text-cyan-400">
                <Sparkles className="w-4 h-4 shrink-0" />
                SEO Semântico e indexação por IA
              </div>
            </div>

          </div>
        </div>

        {/* 4. Call to Action (CTA) Final de Conversão */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/70 to-slate-900 border border-cyan-500/40 p-8 sm:p-14 text-center backdrop-blur-md overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative max-w-3xl mx-auto space-y-6">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-500/15 px-4 py-2 rounded-full border border-cyan-500/30 inline-block">
              Decisão Estratégica
            </span>

            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              O custo de um site é pago em poucos dias. <br className="hidden sm:inline" />
              O custo de <span className="text-rose-400 font-extrabold">não ter um site</span> continua sangrando todos os meses.
            </h3>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              Com o método <strong className="text-white font-bold">Seu Site Único</strong>, você implementa seu domínio corporativo profissional guiado por IA em minutos, sem depender de programadores caros ou meses de espera.
            </p>

            <div className="pt-4 flex flex-col items-center justify-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-300 mb-3 text-center">
                <span>Estanque o vazamento de vendas e feche mais negócios</span>
                <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              </div>

              <button
                type="button"
                onClick={scrollToPricing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:brightness-110 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] group cursor-pointer"
              >
                <span className="whitespace-nowrap">Criar Meu Site Profissional</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>

            <p className="text-xs sm:text-sm font-medium text-slate-300 pt-2">
              Acesso imediato ao manual prático interativo · Garantia incondicional de 7 dias · Pagamento único
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
