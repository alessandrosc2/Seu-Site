/**
 * V2 — Header, Hero e a composição visual do método.
 */
import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Check, Compass, Menu as MenuIcon, ShieldCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CtaButton, Eyebrow, GhostButton, Reveal, scrollToSection, usePrefersReducedMotion } from './primitives';

/* ------------------------------------------------------------------ */
/* Navegação da V2                                                     */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { id: 'metodo', label: 'O método' },
  { id: 'produto', label: 'Por dentro' },
  { id: 'incluido', label: 'O que você recebe' },
  { id: 'duvidas', label: 'Dúvidas' },
  { id: 'oferta', label: 'Acesso' },
];

export function V2Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(height > 0 ? Math.min(scrollTop / height, 1) : 0);
        setScrolled(scrollTop > 24);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled ? 'border-b border-white/10 bg-[#060b18]/92 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label="Seu Site Único — voltar ao topo"
        >
          <img src="/logo-site.webp" width="36" height="36" alt="" className="h-9 w-9 object-contain" />
          <span className="text-left leading-none">
            <span className="block text-[15px] font-extrabold tracking-tight text-white">
              Seu Site <span className="text-cyan-400">Único</span>
            </span>
            <span className="v2-mono mt-0.5 block text-[9px] uppercase tracking-[0.18em] text-slate-500">
              método guiado
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Seções da página">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => go(l.id)}
              className="text-[13px] font-semibold text-slate-300 transition-colors hover:text-cyan-300 cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="/login"
            className="hidden rounded-full border border-cyan-400/25 px-4 py-2 text-[13px] font-bold text-cyan-300 transition-colors hover:border-cyan-400/60 hover:bg-cyan-400/10 sm:inline-flex"
          >
            Já sou aluno
          </a>
          <CtaButton source="header" size="md" className="hidden sm:inline-flex">
            Quero criar meu site
          </CtaButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="rounded-lg border border-white/10 p-2 text-slate-200 transition-colors hover:bg-white/5 lg:hidden cursor-pointer"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open ? (
        <div className="border-t border-white/10 bg-[#060b18]/98 px-4 py-4 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Seções da página (mobile)">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className="rounded-lg px-3 py-2.5 text-left text-[15px] font-semibold text-slate-200 transition-colors hover:bg-white/5 hover:text-cyan-300 cursor-pointer"
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <CtaButton source="header_mobile" size="md" className="w-full">
              Quero criar meu site
            </CtaButton>
            <a
              href="/login"
              className="rounded-xl border border-white/12 px-4 py-3 text-center text-sm font-bold text-slate-200"
            >
              Já sou aluno — entrar
            </a>
          </div>
        </div>
      ) : null}

      {/* Barra de progresso de leitura */}
      <div className="h-[2px] w-full bg-transparent" aria-hidden="true">
        <div
          className="h-full origin-left bg-[linear-gradient(90deg,#00d4e8,#1769ff)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Composição visual do hero: o método em movimento                    */
/* ------------------------------------------------------------------ */
const PIPELINE = [
  { n: '01', label: 'Meu Projeto', hint: 'dados do negócio' },
  { n: '02', label: 'Conteúdo', hint: 'textos do site' },
  { n: '03', label: 'Visual', hint: 'cores e tipografia' },
  { n: '04', label: 'Imagens', hint: 'direção de arte' },
  { n: '05', label: 'Gerar site', hint: 'prompt mestre' },
  { n: '06', label: 'Publicar', hint: 'domínio e Google' },
];

const PROMPT_LINES = [
  'Negócio: Studio Barba & Navalha · Barbearia · João Pessoa/PB',
  'Posicionamento: atendimento premium com hora marcada',
  'Paleta: #0E1420 · #C9A227 · #00D4E8 · tipografia Space Grotesk',
  'Seções: Hero, Serviços, Diferenciais, Sobre, FAQ, Contato',
  'CTA principal: agendar no WhatsApp — visível em mobile',
];

function HeroPipeline() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setActive((v) => (v + 1) % PIPELINE.length), 2400);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div className="relative">
      {/* Halo */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[radial-gradient(60%_60%_at_60%_30%,rgba(0,212,232,0.16),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(160deg,#0b1535_0%,#070d1e_70%)] p-4 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] sm:p-5">
        {/* Cabeçalho do painel */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00d4e8]/12 text-cyan-300">
              <Compass className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="leading-none">
              <p className="text-[12.5px] font-extrabold text-white">Manual interativo & guiado</p>
              <p className="v2-mono mt-1 text-[9px] uppercase tracking-[0.14em] text-slate-500">
                informar → preparar → gerar → revisar → publicar
              </p>
            </div>
          </div>
          <span className="hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider text-emerald-300 sm:inline-flex">
            Etapa 04 de 06
          </span>
        </div>

        {/* Pipeline */}
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-6" aria-label="Etapas do método">
          {PIPELINE.map((step, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <li key={step.n}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'w-full rounded-xl border p-2 text-left transition-all duration-300 cursor-pointer',
                    isActive
                      ? 'border-cyan-400/60 bg-cyan-400/[0.09] shadow-[0_0_28px_-8px_rgba(0,212,232,0.7)]'
                      : isDone
                        ? 'border-emerald-400/25 bg-emerald-400/[0.05]'
                        : 'border-white/[0.08] bg-white/[0.02]',
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span
                      className={cn(
                        'v2-mono text-[9.5px] font-bold',
                        isActive ? 'text-cyan-300' : isDone ? 'text-emerald-400/80' : 'text-slate-500',
                      )}
                    >
                      {step.n}
                    </span>
                    {isDone ? (
                      <Check className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          isActive ? 'bg-cyan-400 v2-pulse' : 'bg-slate-600',
                        )}
                      />
                    )}
                  </span>
                  <span
                    className={cn(
                      'mt-1.5 block text-[11px] font-bold leading-tight',
                      isActive ? 'text-white' : 'text-slate-300',
                    )}
                  >
                    {step.label}
                  </span>
                  <span className="mt-0.5 block text-[9px] leading-tight text-slate-500">
                    {step.hint}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Prompt sendo montado */}
        <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#050a16] p-3.5">
          <div className="flex items-center justify-between">
            <span className="v2-mono text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-400/80">
              Briefing consolidado → prompt
            </span>
            <span className="rounded-md bg-emerald-400 px-2 py-[3px] text-[9px] font-extrabold text-[#04101f]">
              Copiar
            </span>
          </div>
          <div className="v2-mono mt-2.5 space-y-1.5 text-[10.5px] leading-relaxed">
            {PROMPT_LINES.map((line, i) => (
              <p
                key={line}
                className={cn(
                  'transition-opacity duration-700',
                  i <= active ? 'text-slate-300 opacity-100' : 'text-slate-600 opacity-40',
                )}
              >
                <span className="mr-1.5 text-cyan-500/60">›</span>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Rodapé do prompt: sistema de cores + consolidação */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            {['#0E1420', '#C9A227', '#00D4E8', '#F5F7FF'].map((c) => (
              <span
                key={c}
                className="h-4 w-4 rounded-full border border-white/15"
                style={{ background: c }}
                aria-hidden="true"
              />
            ))}
            <span className="v2-mono ml-1 text-[9.5px] uppercase tracking-[0.12em] text-slate-500">
              sistema de cores do nicho
            </span>
          </div>
          <span className="v2-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-cyan-300/90">
            Prompt Mestre Final · 25 seções
          </span>
        </div>

        {/* Rodapé do painel */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-[9.5px] text-slate-500">
              <span>Início do projeto</span>
              <span className="text-slate-400">Site publicado & indexado no Google</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full border border-white/[0.08] bg-[#0b1535]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#00d4e8,#1769ff)] transition-[width] duration-700 ease-out"
                style={{ width: `${((active + 1) / PIPELINE.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selo flutuante no canto (profundidade sem cobrir conteúdo) */}
      <div
        className={cn(
          'absolute -right-3 -top-4 hidden items-center gap-2 rounded-full border border-cyan-400/35 bg-[#0b1535]/95 px-3.5 py-2 backdrop-blur-md shadow-[0_18px_44px_-18px_rgba(0,212,232,0.6)] sm:flex',
          !reduced && 'v2-float',
        )}
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 v2-pulse" />
        <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-cyan-200">
          método em 6 etapas
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HERO    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HERO                                                                */
/* ------------------------------------------------------------------ */
export function V2Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <div className="v2-grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(23,105,255,0.22),transparent)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-14 lg:px-8">
        {/* Coluna de texto */}
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
              Manual interativo + método guiado com IA
            </Eyebrow>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="v2-display mt-6 text-[30px] font-bold leading-[1.12] text-white sm:text-[40px] lg:text-[46px]">
              Seu negócio merece uma presença digital{' '}
              <span className="v2-gradient-text">tão profissional quanto o serviço que você oferece.</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 text-[16px] leading-relaxed text-slate-300 sm:text-[18px]">
              Crie seu próprio site profissional usando IA — mesmo que você não saiba programar.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaButton source="hero">
                Quero criar meu site
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
              <GhostButton onClick={() => scrollToSection('metodo')}>
                Conhecer o método
                <ArrowDown className="h-4 w-4" />
              </GhostButton>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[12.5px] font-semibold text-slate-400">
              {[
                { icon: <Check className="h-3.5 w-3.5 text-cyan-400" />, text: 'Sem programar' },
                { icon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />, text: 'Garantia de 7 dias' },
                { icon: <ArrowRight className="h-3.5 w-3.5 text-cyan-400" />, text: 'Acesso imediato' },
              ].map((i) => (
                <li key={i.text} className="flex items-center gap-1.5">
                  {i.icon}
                  {i.text}
                </li>
              ))}
              <li className="v2-mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-slate-300">
                R$ 47,90 · pagamento único
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Coluna visual */}
        <Reveal delay={160} className="lg:pl-2">
          <HeroPipeline />
        </Reveal>
      </div>

      <div className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal delay={120}>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-relaxed text-slate-400">
              <strong className="font-bold text-slate-200">Para quem é:</strong> pequenos negócios,
              prestadores de serviço e profissionais liberais que dependem de Instagram e WhatsApp — e
              querem um endereço próprio, organizado, do jeito que o negócio realmente é.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('problema')}
              className="shrink-0 text-[12.5px] font-bold text-cyan-300 transition-colors hover:text-cyan-200 cursor-pointer"
            >
              Ver o problema que isso resolve →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA fixo no mobile                                                  */
/* ------------------------------------------------------------------ */
export function StickyCtaBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setOpen(window.pageYOffset > window.innerHeight * 0.9);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="v2-sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#060b18]/95 px-4 py-3 backdrop-blur-xl md:hidden"
      data-open={open ? 'true' : 'false'}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[11px] font-semibold text-slate-400">Acesso completo</p>
          <p className="text-[15px] font-extrabold text-white">
            R$ 47,90 <span className="text-[11px] font-semibold text-slate-400">· único</span>
          </p>
        </div>
        <CtaButton source="sticky_mobile" size="md" className="shrink-0">
          Quero criar meu site
        </CtaButton>
      </div>
    </div>
  );
}
