import React, { useState, useEffect, useRef } from "react";
import { Lock, X, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planKey: string;
}

const PLANS: Record<string, { title: string; price: number }> = {
  completo: { title: 'Plano Completo', price: 47.90 },
};

export function CheckoutModal({
  isOpen,
  onClose,
  planKey,
}: CheckoutModalProps) {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  const plan = PLANS[planKey];
  if (!plan) return null; // Invalid plan

  const totalPrice = plan.price;

  const handleFinishPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Por favor, preencha nome e e-mail");
      return;
    }

    setIsLoading(true);
    
    try {
      // 1. Salvar os dados (Lead) no Firebase para Remarketing / Checkout Abandonado
      try {
        await addDoc(collection(db, "leads"), {
          name,
          email,
          phone,
          planKey,
          status: 'checkout_initiated', // status inicial
          createdAt: serverTimestamp(),
        });
      } catch (dbError) {
        console.error("Erro ao salvar lead no Firebase (ignorando para não travar a venda):", dbError);
      }

      // 2. Chamar a API do Mercado Pago
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          planKey
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar preferência de pagamento');
      }

      // Redirecionar para o Checkout Pro do Mercado Pago
      window.location.href = data.init_point;
      
    } catch (error) {
      console.error(error);
      toast.error("Erro ao processar pagamento. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#050814]/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div role="dialog" aria-modal="true" aria-labelledby="checkout-title" ref={modalRef} tabIndex={-1} className="relative w-full max-w-xl focus:outline-none bg-[#0a1128] border border-cyan-900/50 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-slate-900/80 px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="/logo-site.webp" 
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

        <form onSubmit={handleFinishPurchase} className="p-6 sm:p-8 space-y-6">
          {/* Plan Summary Card */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                Plano Selecionado
              </span>
              <h4 id="checkout-title" className="text-lg font-bold text-white">{plan.title}</h4>
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
                <label htmlFor="checkout-name" className="text-xs text-slate-400 mb-1 block">Nome Completo</label>
                <input id="checkout-name" name="name" autoComplete="name" type="text" required value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label htmlFor="checkout-email" className="text-xs text-slate-400 mb-1 block">E-mail (onde receberá o acesso)</label>
                <input id="checkout-email" name="email" autoComplete="email" type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label htmlFor="checkout-phone" className="text-xs text-slate-400 mb-1 block">WhatsApp (para suporte VIP)</label>
                <input id="checkout-phone" name="phone" autoComplete="tel" type="tel" value={phone}
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
      </div>
    </div>
  );
}
