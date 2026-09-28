const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const footerRegex = /<footer[\s\S]*?<\/footer>/;
const newFooter = `<footer className="py-14 border-t border-white/10 bg-[#050814] text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
            <div>
              <div className="flex items-center gap-3.5 mb-2.5">
                <img 
                  src="/logo-site.png" 
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
            <div className="flex items-center gap-2 text-slate-500">
              <ShieldCheck className="w-4 h-4 text-cyan-500/60" />
              <span>Compra 100% Segura • Acesso Imediato</span>
            </div>
          </div>
        </div>
      </footer>`;

content = content.replace(footerRegex, newFooter);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Footer updated successfully.');
