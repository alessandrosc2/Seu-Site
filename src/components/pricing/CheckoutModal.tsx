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
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const totalPrice = basePrice;

  const mockPixKey = "00020126580014br.gov.bcb.pix0136seu-site-unico-pagamentos-pix-789a6bc5204000053039865405" + 
    totalPrice.toFixed(2).replace(".", "") + "5802BR5925SEU SITE UNICO TREINAMENTOS6009SAO PAULO62070503***6304E8A1";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(mockPixKey);
    toast.success("Código Copia e Cola Pix copiado para a área de transferência!");
  };

  const handleFinishPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Por favor, preencha seu nome e e-mail para receber o acesso.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#22d3ee", "#38bdf8", "#3b82f6", "#10b981", "#ffffff"],
      });
      toast.success("Pedido aprovado! Acesso liberado.");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl my-8 bg-[#091124] border border-cyan-500/40 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.25)] overflow-hidden text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-500/40 p-0.5 flex items-center justify-center">
              <img src="/logo-site.png" alt="Seu Site Único" className="w-full h-full object-contain" />
            </div>
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

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Forma de Pagamento
              </h5>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className={cn(
                    "p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer",
                    paymentMethod === "pix"
                      ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/40"
                      : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                  )}
                >
                  <QrCode className="w-4 h-4" />
                  Pix (Liberação Imediata)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "p-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-semibold transition-all cursor-pointer",
                    paymentMethod === "card"
                      ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950/40"
                      : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                  )}
                >
                  <CreditCard className="w-4 h-4" />
                  Cartão de Crédito
                </button>
              </div>

              {paymentMethod === "pix" ? (
                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 text-center space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                    <Zap className="w-3 h-3" /> Chave Pix Gerada Instantaneamente
                  </div>
                  <div className="bg-white p-3 rounded-xl inline-block mx-auto shadow-md">
                    {/* Simulated visual QR pattern */}
                    <div className="w-32 h-32 bg-slate-950 flex flex-col items-center justify-center p-2 rounded relative">
                      <QrCode className="w-24 h-24 text-white" />
                      <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-wider mt-1">PIX SEGURO</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-600 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copiar Código Copia e Cola Pix
                    </button>
                    <p className="text-[11px] text-slate-400">
                      Abra o app do seu banco, escolha <strong>Pix Copia e Cola</strong> e efetue o pagamento. O acesso é liberado em menos de 1 minuto.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 p-4 rounded-2xl bg-black/40 border border-slate-800">
                  <input
                    type="text"
                    placeholder="Número do cartão: 0000 0000 0000 0000"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Validade (MM/AA)"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      placeholder="CVV (3 dígitos)"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <select className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400">
                    <option value="1">1x de R$ {totalPrice.toFixed(2).replace(".", ",")} sem juros</option>
                    <option value="2">2x de R$ {(totalPrice / 2).toFixed(2).replace(".", ",")} sem juros</option>
                    <option value="3">3x de R$ {(totalPrice / 3).toFixed(2).replace(".", ",")} sem juros</option>
                  </select>
                </div>
              )}
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
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 text-slate-950 font-extrabold text-base hover:brightness-110 shadow-lg shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    Concluir Inscrição Segura (R$ {totalPrice.toFixed(2).replace(".", ",")})
                  </span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
