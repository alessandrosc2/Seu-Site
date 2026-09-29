/**
 * Primitivas compartilhadas da Landing V2.
 * Isoladas em /v2 — não tocam em nenhum componente da landing original.
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Preferência de movimento reduzido                                   */
/* ------------------------------------------------------------------ */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/* ------------------------------------------------------------------ */
/* Observador de visibilidade (scroll animations leves)                */
/* ------------------------------------------------------------------ */
export function useInView<T extends HTMLElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean },
) {
  const { threshold = 0.16, rootMargin = '0px 0px -8% 0px', once = true } = options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}

export function Reveal({ children, delay = 0, className, as }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-visible={inView ? 'true' : 'false'}
      className={cn('v2-reveal', className)}
      style={{ ['--v2-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Contador animado (usado apenas na seção de dados)                   */
/* ------------------------------------------------------------------ */
export function useCountUp(target: number, active: boolean, duration = 1300) {
  const reduced = usePrefersReducedMotion();
  // Começa no valor final: se a animação não rodar (JS bloqueado, SSR,
  // reduced motion), o número correto continua visível.
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    setValue(0);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);

  return value;
}

/* ------------------------------------------------------------------ */
/* Navegação suave até uma seção                                       */
/* ------------------------------------------------------------------ */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}

/* ------------------------------------------------------------------ */
/* Camada de tracking (mesmo dataLayer/GTM/Meta Pixel já existentes)   */
/* ------------------------------------------------------------------ */
export function track(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[]; fbq?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...payload });
  if (typeof w.fbq === 'function') {
    try {
      w.fbq('trackCustom', event, payload);
    } catch {
      /* pixel ainda carregando — ignora silenciosamente */
    }
  }
}

/* ------------------------------------------------------------------ */
/* Contexto de checkout da V2 (reaproveita o CheckoutModal existente)  */
/* ------------------------------------------------------------------ */
interface V2ContextValue {
  openCheckout: (source: string) => void;
}

const V2Context = createContext<V2ContextValue>({ openCheckout: () => {} });

export const V2Provider = V2Context.Provider;

export function useV2() {
  return useContext(V2Context);
}

/* ------------------------------------------------------------------ */
/* Botões                                                              */
/* ------------------------------------------------------------------ */
interface CtaButtonProps {
  children: ReactNode;
  onClick?: () => void;
  source: string;
  size?: 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
}

export function CtaButton({
  children,
  onClick,
  source,
  size = 'lg',
  className,
  ariaLabel,
}: CtaButtonProps) {
  const { openCheckout } = useV2();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        openCheckout(source);
        onClick?.();
      }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2.5 rounded-xl font-extrabold',
        'bg-[linear-gradient(100deg,#22d3ee_0%,#38bdf8_45%,#60a5fa_100%)] text-[#04101f]',
        'shadow-[0_16px_44px_-14px_rgba(0,212,232,0.65)] transition-all duration-200',
        'hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] cursor-pointer',
        size === 'lg' ? 'px-7 py-4 text-[15px] sm:text-base' : 'px-5 py-3 text-sm',
        className,
      )}
    >
      {children}
    </button>
  );
}

interface GhostButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export function GhostButton({ children, onClick, className, href }: GhostButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03]',
    'px-6 py-3.5 text-sm font-bold text-slate-100 backdrop-blur-sm transition-all duration-200',
    'hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-white cursor-pointer',
    className,
  );

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Rótulo de seção (eyebrow)                                           */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  tone = 'cyan',
  className,
}: {
  children: ReactNode;
  tone?: 'cyan' | 'green' | 'amber' | 'slate';
  className?: string;
}) {
  const tones: Record<string, string> = {
    cyan: 'border-cyan-400/25 bg-cyan-400/[0.07] text-cyan-300',
    green: 'border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-300',
    amber: 'border-amber-400/25 bg-amber-400/[0.07] text-amber-300',
    slate: 'border-white/12 bg-white/[0.04] text-slate-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5',
        'text-[11px] font-bold uppercase tracking-[0.16em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Número de capítulo narrativo                                        */
/* ------------------------------------------------------------------ */
export function ChapterNumber({ value }: { value: string }) {
  return (
    <span className="v2-mono text-[11px] font-bold tracking-[0.2em] text-cyan-400/70">
      {value}
    </span>
  );
}
