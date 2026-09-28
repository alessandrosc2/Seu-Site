import React, { useState } from "react";
import { Check, ShieldCheck, Lock, QrCode, CreditCard, Copy, X, Sparkles, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  basePrice: number;
}

export function CheckoutModal({
  isOpen,
  onClose,
  planName,
  basePrice,
}: CheckoutModalProps) {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const totalPrice = basePrice;

  

  const handleFinishPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Por favor, preencha seu nome e e-mail para receber o acesso.");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          planName,
          price: basePrice,
          orderBumps
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar preferência de pagamento');
      }

      // Redirect to Mercado Pago
      window.location.href = data.init_point;
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao conectar com Mercado Pago. " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl my-8 bg-[#091124] border border-cyan-500/40 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.25)] overflow-hidden text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo-site.png" 
              alt="Seu Site Único" 
              className="w-7 h-7 object-contain" 
            />
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-cyan-300">
                Checkout Seguro 256-Bit SSL
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Parabéns! Pagamento Confirmado
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Seja bem-vindo ao Seu Site Único!
              </h3>
              <p className="text-slate-300 text-sm mt-3 max-w-md mx-auto">
                Enviamos os dados de acesso imediato, login da plataforma e links dos prompts para o e-mail: <strong className="text-white">{email}</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Plano contratado:</span>
                <span className="text-white font-medium">{planName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Valor total pago:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Garantia:</span>
                <span className="text-slate-200">7 Dias Incondicionais</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => {
                  toast.success("Acessando área de membros online...");
                  onClose();
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
              >
                <span>Acessar o Método e Prompts Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white py-2"
              >
                Voltar à página inicial
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFinishPurchase} className="p-6 sm:p-8 space-y-6">
            {/* Plan Summary Card */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  Plano Selecionado
                </span>
                <h4 className="text-lg font-bold text-white">{planName}</h4>
                <p className="text-xs text-slate-400">Acesso vitalício + Suporte</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block">Total</span>
                <span className="text-2xl font-black text-cyan-400">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-3.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Seus Dados de Acesso
              </h5>
              <div className="space-y-2.5">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">E-mail (onde receberá o acesso)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">WhatsApp (para suporte VIP)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(DDD) 99999-9999"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <span>
                <strong>Garantia Blindada de 7 Dias:</strong> Se você não amar o método e os prompts, devolvemos 100% do seu dinheiro sem perguntas.
              </span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 text-slate-950 font-bold text-sm sm:text-base hover:brightness-110 shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">
                    Ir para Pagamento Seguro (R$ {totalPrice.toFixed(2).replace(".", ",")})
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

