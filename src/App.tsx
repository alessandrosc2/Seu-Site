import { Toaster } from "sonner";
import { ScrollGlobe } from "@/components/ui/landing-page";
import { WordRevealSection } from "@/components/scrollytelling/WordRevealSection";
import { ConversionScienceSection } from "@/components/analytics/ConversionScienceSection";
import { InteractiveSelector } from "@/components/ui/interactive-selector";
import { AudienceSwitcher } from "@/components/scrollytelling/AudienceSwitcher";
import { PricingSection } from "@/components/pricing/PricingSection";
import { ShieldCheck, Heart, Sparkles, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <main className="w-full min-h-screen bg-[#070d1e] text-white selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <Toaster position="top-right" richColors theme="dark" />

      {/* Beat 1: O Método Guiado das 4 Fases com o Globo 3D em Scrollytelling */}
      <ScrollGlobe />

      {/* Beat 2: O Dilema da Presença Digital & Comparativo com Sites Genéricos */}
      <WordRevealSection />

      {/* Beat 3: Showcase de Nichos & Profissionais — Seletor Sanfonado Interativo */}
      <div id="nichos">
        <InteractiveSelector />
      </div>

      {/* Beat 4: A Ciência dos Dados & O Custo Invisível de Não Ter um Site (CRO/Bento Grid) */}
      <ConversionScienceSection />

      {/* Beat 5: Dois Públicos, Um Só Produto & Calculadora Interativa de Renda Extra */}
      <div id="calculadora">
        <AudienceSwitcher />
      </div>

      {/* Beat 6: Tabela de Preços, Order Bump, Saída WhatsApp e FAQ */}
      
      <PricingSection />
      </div>

      {/* Modern Footer */}
      <footer className="py-14 border-t border-white/10 bg-[#050814] text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
            <div>
              <div className="flex items-center gap-3.5 mb-2.5">
                <img 
                  src="/logo-site.webp" 
                  alt="Seu Site Único" 
                  className="w-14 h-14 object-contain" 
                />
                <span className="font-normal text-2xl tracking-tight text-white">
                  Seu Site <span className="text-cyan-400">Único</span>
                </span>
              </div>
              <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                Método guiado com Inteligência Artificial para pequenos negócios e profissionais que desejam presença profissional na internet e faturamento com criação de sites locais.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
              <a href="#metodo" className="hover:text-cyan-400 transition-colors">O Método</a>
              <a href="#nichos" className="hover:text-cyan-400 transition-colors">Nichos</a>
              <a href="#dados-conversao" className="hover:text-cyan-400 transition-colors">Por Que Ter Site</a>
              <a href="#calculadora" className="hover:text-cyan-400 transition-colors">Calculadora</a>
              <a href="#pricing" className="hover:text-cyan-400 transition-colors">Planos</a>
              <a
                href="https://wa.me/5583993595124?text=Ol%C3%A1!%20Tenho%20d%C3%BAvidas%20sobre%20o%20Seu%20Site%20%C3%9Anico."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Suporte no WhatsApp
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
            <div className="flex flex-col gap-3">
              <p>© {new Date().getFullYear()} Seu Site Único. Todos os direitos reservados.</p>
              <div className="flex flex-wrap items-center gap-4 text-slate-400">
                <Link to="/termos-de-uso" className="hover:text-cyan-400 transition-colors underline underline-offset-2">Termos de Uso</Link>
                <Link to="/politica-de-privacidade" className="hover:text-cyan-400 transition-colors underline underline-offset-2">Política de Privacidade (LGPD)</Link>
                <Link to="/politica-de-reembolso" className="hover:text-cyan-400 transition-colors underline underline-offset-2">Reembolso e Garantia</Link>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-4">
              <img src="/pagamentos.webp" alt="Formas de Pagamento Aceitas" className="w-64 sm:w-80 md:w-96 h-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-cyan-500/60" />
                <span>Compra 100% Segura • Acesso Imediato</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
