import React, { useEffect } from 'react';
import { CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070d1e] text-white flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full bg-slate-900/60 p-8 sm:p-12 rounded-3xl border border-white/10 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Pagamento Confirmado
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2 mb-4">
            Seja bem-vindo(a) ao Seu Site Único!
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Enviamos o link exclusivo de criação de senha para o <strong>e-mail cadastrado na compra</strong>.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-left text-sm space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-amber-400 font-bold">Aviso Importante (SPAM)</p>
              <p className="text-amber-200/80 text-xs leading-relaxed">
                Como é o seu primeiro acesso, o e-mail com o link de criação de senha <strong>pode ter caído na pasta de SPAM (Lixo Eletrônico) ou Promoções</strong>. Por favor, verifique lá.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <Link
            to="/login"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Já criei minha senha (Ir para Login)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-500">
            Link direto: https://seusite-unico.vercel.app/login
          </p>
        </div>
      </div>
    </div>
  );
}
