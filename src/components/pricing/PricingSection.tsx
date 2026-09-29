import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, ChevronDown, MessageCircle, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Suspense, lazy } from 'react';
const CheckoutModal = lazy(() => import('./CheckoutModal').then(module => ({ default: module.CheckoutModal })));

export function PricingSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCheckout, setActiveCheckout] = useState<{ planKey: string } | null>(null);

  const faqs = [
    {
      q: "Preciso saber programar ou ter experiência técnica?",
      a: "Não! O manual foi desenhado passo a passo com prompts prontos. Você apenas preenche o Briefing Mestre e cola as instruções nas ferramentas de IA indicadas."
    },
    {
      q: "Domínio e hospedagem já estão inclusos no valor?",
      a: "O manual ensina como registrar o domínio oficial (.com.br por cerca de R$ 40/ano no Registro.br) e usar opções de publicação gratuitas ou de baixíssimo custo. O valor do manual cobre todo o método e prompts."
    },
    {
      q: "Funciona para qualquer tipo de negócio ou serviço?",
      a: "Sim! O Briefing Mestre é flexível para prestadores de serviços, lojas locais, autônomos, consultórios, advogados, restaurantes e profissionais liberais."
    },
    {
      q: "E se eu já tiver Instagram e WhatsApp ativos?",
      a: "Excelente! O site não substitui suas redes, ele se conecta a elas para direcionar o tráfego do Google direto para o seu WhatsApp de atendimento."
    }
  ];

  const handleCheckout = (planKey: string) => {
    setActiveCheckout({ planKey });
  };

  return (
    <section id="pricing" className="relative bg-[#070d1e] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-cyan-300 border border-blue-500/20 mb-4 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Acesso Imediato
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Garanta sua Presença Digital
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Acesso vitalício ao manual online interativo, prompts atualizados e suporte.
          </p>
        </div>

        {/* Pricing Single Card */}
        <div className="flex justify-center max-w-lg mx-auto mb-16">
          {/* Plano Completo (Único) */}
          <div className="relative w-full flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-blue-950/80 to-slate-900/95 border-2 border-cyan-400 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.2)]">
            <div>
              <span className="text-xs font-semibold uppercase text-cyan-300 tracking-wider">Experiência Completa</span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-2">Plano Completo</h3>
              <p className="text-slate-300 text-sm mb-6">Para quem quer criar o site, dominar o SEO local, mensurar resultados e evoluir continuamente.</p>
              
              <div className="mb-6">
                <span className="text-xs text-cyan-300">Por apenas</span>
                <div className="text-4xl font-bold text-cyan-400 tracking-tight">
                  R$ 47<span className="text-xl font-medium text-cyan-200">,90</span>
                </div>
                <span className="text-[11px] text-slate-300">pagamento único vitalício</span>
              </div>

              <div className="space-y-3 text-sm text-slate-200 border-t border-cyan-500/20 pt-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Fase 1:</strong> Construir (Briefing Mestre & Prompts)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Fase 2:</strong> Publicar (Domínio, HTTPS e WhatsApp)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Fase 3:</strong> Ser Encontrado (SEO Local, Search Console, LGPD)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Bônus 01:</strong> Google Analytics (Monitore acessos, visitantes e conversões)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span><strong>Bônus 02:</strong> Extensão de Vendas no Checkout (Order Bump)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCheckout("completo")}
              className="w-full py-3.5 sm:py-4 px-6 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              <span>Garantir o Plano Completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Alternative Route - Done For You (WhatsApp) */}
        <div className="max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-900/40 border border-emerald-500/30 backdrop-blur-xl text-center mb-20 shadow-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <MessageCircle className="w-4 h-4" /> Saída Alternativa
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Não quer aprender sozinho? Eu faço o seu site pra você.
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Sites simples, rápidos e profissionais a partir de <strong className="text-emerald-300">R$ 200,00</strong> - o valor varia de acordo com o tamanho do seu projeto.
          </p>
          
          <div className="flex flex-col items-center justify-center max-w-md mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-300 mb-3 text-center">
              <span>Converse diretamente com o desenvolvedor</span>
              <ArrowDown className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
            </div>

            <a
              href="https://wa.me/5583993595124?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20voc%C3%AA%20criar%20o%20site%20do%20meu%20neg%C3%B3cio."
              target="_blank"
              rel="noopener noreferrer"
                onClick={() => { (window as any).dataLayer = (window as any).dataLayer || []; (window as any).dataLayer.push({ event: 'whatsapp_click', location: 'pricing_section' }); }}
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.98] group cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="whitespace-nowrap">Pedir Orçamento no WhatsApp</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-2">Tire suas dúvidas</span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Perguntas Frequentes
            </h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg",
                    isOpen 
                      ? "bg-slate-900 border-cyan-500/50 shadow-cyan-950/30" 
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                  )}
                >
                  <button onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`faq-content-${index}`} id={`faq-header-${index}`} className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span className="leading-snug">{faq.q}</span>
                    <ChevronDown className={cn("w-5 h-5 text-cyan-400 transition-transform duration-300 shrink-0", isOpen && "rotate-180 text-cyan-300")} />
                  </button>
                  {isOpen && (
                    <div id={`faq-content-${index}`} role="region" aria-labelledby={`faq-header-${index}`} className="px-6 pb-6 text-slate-100 text-sm sm:text-base leading-relaxed border-t border-slate-800/80 pt-4 bg-slate-950/70 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Interactive Checkout Modal */}
      {activeCheckout && (
        <CheckoutModal
          isOpen={!!activeCheckout}
          onClose={() => setActiveCheckout(null)}
          planKey={activeCheckout.planKey}
          
        />
      )}
    </section>
  );
}
