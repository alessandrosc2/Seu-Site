import React from 'react';
import { Star } from 'lucide-react';

export function SocialProofSection() {
  return (
    <section className="py-16 border-y border-white/5 bg-[#0a1128]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold tracking-widest text-slate-500 uppercase mb-8">
          Mtodo testado e validado por dezenas de profissionais
        </p>
        <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex flex-col items-center gap-2">
            <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <span className="text-slate-300 font-bold text-lg">"Dobrou meus oramentos"</span>
            <span className="text-xs text-slate-500">Dr. Marcos - Advogado</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <span className="text-slate-300 font-bold text-lg">"Site no ar em 2 horas"</span>
            <span className="text-xs text-slate-500">Ana - Arquiteta</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex text-yellow-500"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
            <span className="text-slate-300 font-bold text-lg">"Parei de depender do Instagram"</span>
            <span className="text-xs text-slate-500">Clnica Sorriso</span>
          </div>
        </div>
      </div>
    </section>
  );
}
