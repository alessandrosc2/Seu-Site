import React, { useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function WordRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const headline = "Mais de 50% das empresas brasileiras não têm site próprio. A maioria fica invisível no Google, deixando dinheiro na mesa.";
  const words = headline.split(" ");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!headlineRef.current) return;
          const rect = headlineRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          const start = windowHeight * 0.85;
          const end = windowHeight * 0.35;

          const progress = (start - rect.top) / (start - end);
          const clamped = Math.min(Math.max(progress, 0), 1);
          
          spanRefs.current.forEach((span, i) => {
            if (!span) return;
            const wordThreshold = i / (words.length * 0.95);
            const isLit = clamped >= wordThreshold;
            if (isLit) {
              span.classList.remove("text-slate-600", "opacity-30");
              span.classList.add("text-white", "opacity-100");
            } else {
              span.classList.remove("text-white", "opacity-100");
              span.classList.add("text-slate-600", "opacity-30");
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length]);

  return (
    <section ref={containerRef} className="relative bg-[#070d1e] text-white py-24 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-b border-white/10">
      <div className="max-w-5xl mx-auto text-center mb-16 sm:mb-20">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-cyan-300 border border-blue-500/20 mb-8 uppercase tracking-widest">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          O Dilema da Presença Digital
        </span>

        {/* Scroll-scrubbed kinetic text */}
        <h2 ref={headlineRef} className="text-3xl sm:text-5xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.3] max-w-4xl mx-auto mb-6 text-slate-100">
          {words.map((word, i) => {
            return (
              <span
                key={i}
                ref={(el) => { spanRefs.current[i] = el; }}
                className={cn(
                  "inline-block mr-2 sm:mr-3 transition-colors duration-200",
                  "text-slate-600 opacity-30"
                )}
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
