import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './lib/firebase';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!auth) { /* MODO DEMO: simula login sucesso */ await new Promise(r => setTimeout(r, 1000)); } else { await signInWithEmailAndPassword(auth, email, password); }
      toast.success('Login efetuado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error('E-mail ou senha incorretos.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] text-white flex items-center justify-center p-4 selection:bg-cyan-500 selection:text-slate-950">
      <div className="w-full max-w-md">
        
        {/* Logo / Branding */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-[#0a1128] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_40px_-10px_rgba(34,211,238,0.15)] mb-6">
            <Lock className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-2">
            Acesso Exclusivo
          </h1>
          <p className="text-slate-400 text-sm">
            Entre com seus dados para acessar o Seu Site Único.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0a1128]/80 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                E-mail
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Senha
                </label>
                <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 font-bold text-sm px-6 py-4 rounded-xl shadow-[0_0_30px_-10px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>
                  Entrar no Sistema
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
          <span>Área segura e criptografada</span>
        </div>
      </div>
    </div>
  );
}

