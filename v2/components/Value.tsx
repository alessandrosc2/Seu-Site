/**
 * V2 — Dados de comportamento digital, benefícios e a transformação (antes → depois).
 *
 * Regra de dados: número grande → afirmação curta → fonte discreta.
 * Apenas estatísticas validadas em fonte oficial/pública:
 *  · 84%  — Verisign (pesquisa com consumidores dos EUA)
 *  · 79%  — PwC, Global Consumer Insights Survey (Brasil)
 *  · 46,1% — Stanford Web Credibility Project (Fogg et al.)
 */
import React from 'react';
import {
  ArrowRight,
  Brush,
  CheckCircle2,
  FileText,
  Globe2,
  ImageIcon,
  Megaphone,
  Route,
  Search,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { ChapterNumber, CtaButton, Eyebrow, Reveal, useCountUp, useInView } from './primitives';

/* ------------------------------------------------------------------ */
/* Dados                                                               */
/* ------------------------------------------------------------------ */
interface Stat {
  value: number;
  decimals: number;
  label: string;
  source: string;
  href: string;
  accent: string;
}

const STATS: Stat[] = [
  {
    value: 84,
    decimals: 0,
    label:
      'Consideram uma empresa com site mais confiável do que uma empresa presente apenas nas redes sociais.',
    source: 'Verisign',
    href: 'https://blog.verisign.com/getting-online/verisign-2015-online-survey-97-percent-of-smbs-would-recommend-having-a-website-to-other-smbs/',
    accent: 'text-cyan-300',
  },
  {
    value: 79,
    decimals: 0,
    label: 'Dos brasileiros pesquisam informações online antes de decidir uma compra.',
    source: 'PwC — Global Consumer Insights Survey',
    href: 'https://www.pwc.com/gx/en/industries/retail-consumer/global-consumer-insights-survey.html',
    accent: 'text-sky-300',
  },
  {
    value: 46.1,
    decimals: 1,
    label:
      'Avaliaram a credibilidade de um site a partir do design: layout, tipografia e esquema de cores.',
    source: 'Stanford Web Credibility Project',
    href: 'https://credibility.stanford.edu/',
    accent: 'text-emerald-300',
  },
];

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const value = useCountUp(stat.value, inView, 1200 + index * 180);
  const formatted = value.toLocaleString('pt-BR', {
    minimumFractionDigits: stat.decimals,
    maximumFractionDigits: stat.decimals,
  });

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[linear-gradient(170deg,#0c1730,#070c1c)] p-6 transition-colors duration-300 hover:border-cyan-400/30 sm:p-7"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[radial-gradient(closest-side,rgba(0,212,232,0.14),transparent)] blur-xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <p className={`v2-display relative text-[52px] font-bold leading-none tracking-tight sm:text-[64px] ${stat.accent}`}>
        {formatted}
        <span className="text-[0.5em]">%</span>
      </p>
      <p className="relative mt-4 text-[14.5px] leading-relaxed text-slate-200">{stat.label}</p>
      <p className="relative mt-5 border-t border-white/[0.08] pt-4 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-slate-400">
        Fonte:{' '}
        <a
          href={stat.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-slate-400 underline decoration-dotted underline-offset-4 transition-colors hover:text-cyan-300"
        >
          {stat.source}
        </a>
      </p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section id="dados" className="relative border-y border-white/[0.07] bg-[#060a16] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <ChapterNumber value="05 — COMO O CLIENTE DECIDE" />
            <h2 className="v2-display mt-4 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
              A decisão começa antes do contato.
              <br />
              <span className="text-slate-400">Começa na pesquisa.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-300">
              Três números resumem o que acontece enquanto você não tem um endereço próprio para
              apresentar o seu negócio.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.source} delay={i * 90}>
              <StatCard stat={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Benefícios                                                          */
/* ------------------------------------------------------------------ */
const BENEFITS = [
  {
    icon: Megaphone,
    title: 'Pare de depender apenas das redes sociais',
    text: 'Tenha um endereço próprio para apresentar o negócio — sem depender do alcance de terceiros.',
  },
  {
    icon: Sparkles,
    title: 'Saiba exatamente o que pedir para a IA',
    text: 'Cada etapa tem um prompt estruturado, com objetivo, quando usar e a ferramenta recomendada.',
  },
  {
    icon: FileText,
    title: 'Organize o conteúdo do seu negócio',
    text: 'Transforme informações soltas em Hero, Sobre, Serviços, FAQ e SEO local revisados.',
  },
  {
    icon: Brush,
    title: 'Crie uma identidade visual coerente',
    text: 'Defina cores, tipografia e direção visual a partir do seu nicho e das cores da sua marca.',
  },
  {
    icon: ImageIcon,
    title: 'Prepare imagens com direção de arte',
    text: 'Saiba quais fotos o seu site pede e como gerá-las ou melhorá-las com IA.',
  },
  {
    icon: Terminal,
    title: 'Crie o site sem aprender programação',
    text: 'O Prompt Mestre Final de 25 seções leva as suas decisões para a ferramenta de IA criar o site.',
  },
  {
    icon: Globe2,
    title: 'Saiba como publicar',
    text: 'Guias de Netlify, Vercel, Hostinger e apontamento de domínio próprio (.com.br).',
  },
  {
    icon: Search,
    title: 'Estruture sua presença digital',
    text: 'Site, Google Meu Negócio, Search Console, LGPD e Analytics trabalhando juntos.',
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <ChapterNumber value="06 — O QUE MUDA NA PRÁTICA" />
              <h2 className="v2-display mt-4 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
                Oito coisas que você passa a conseguir fazer sozinho.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <p className="max-w-sm text-[14px] leading-relaxed text-slate-400">
              Nada aqui depende de contratar alguém ou de aprender uma linguagem de programação.
              Depende de seguir a ordem certa.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 4) * 70}>
              <article className="group h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300 transition-colors group-hover:bg-cyan-400 group-hover:text-[#04101f]">
                  <b.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[14.5px] font-bold leading-snug text-white">{b.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{b.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Transformação: antes → processo → depois                            */
/* ------------------------------------------------------------------ */
const BEFORE = ['“Preciso de um site.”', 'Fotos no celular', 'Textos soltos no WhatsApp', 'Ideia de cores', 'Dúvida sobre onde publicar'];
const PROCESS = [
  'Informações organizadas no Briefing Mestre',
  'Posicionamento e tom de voz definidos',
  'Conteúdo revisado seção por seção',
  'Identidade visual e sistema de cores',
  'Imagens com direção de arte',
  'Prompt Mestre Final de 25 seções',
  'Publicação, domínio e presença no Google',
];

export function TransformationSection() {
  return (
    <section id="transformacao" className="relative border-y border-white/[0.07] bg-[#070c1c] py-20 sm:py-24">
      <div className="v2-grid-bg-soft pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <ChapterNumber value="07 — A TRANSFORMAÇÃO" />
            <h2 className="v2-display mt-4 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
              Você começa com uma frase.
              <br />
              <span className="v2-gradient-text">Termina com um site profissional no ar.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,0.35fr)_minmax(0,1fr)]">
          {/* ANTES */}
          <Reveal>
            <div className="h-full rounded-3xl border border-white/[0.08] bg-[#0a0f1e] p-6 sm:p-7">
              <Eyebrow tone="slate">Você começa com</Eyebrow>
              <p className="v2-display mt-5 text-[22px] font-bold leading-snug text-slate-200 sm:text-[26px]">
                “Preciso de um site.”
              </p>
              <ul className="mt-6 space-y-2.5">
                {BEFORE.slice(1).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-400">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/[0.07] pt-5 text-[13px] leading-relaxed text-slate-400">
                Informação dispersa, nenhuma ordem definida e a sensação de que falta algo técnico
                que você não domina.
              </p>
            </div>
          </Reveal>

          {/* Conector */}
          <Reveal delay={70}>
            <div className="flex h-full min-h-[80px] items-center justify-center lg:flex-col">
              <div className="flex items-center gap-2 lg:flex-col lg:gap-3">
                <span className="hidden h-16 w-px bg-[linear-gradient(180deg,transparent,#00d4e8)] lg:block" aria-hidden="true" />
                <span className="flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.14em] text-cyan-200">
                  <Route className="h-3.5 w-3.5" aria-hidden="true" />
                  o método
                </span>
                <ArrowRight className="h-4 w-4 text-cyan-400 lg:rotate-90" aria-hidden="true" />
                <span className="hidden h-16 w-px bg-[linear-gradient(180deg,#00d4e8,transparent)] lg:block" aria-hidden="true" />
              </div>
            </div>
          </Reveal>

          {/* DEPOIS */}
          <Reveal delay={130}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-cyan-400/25 bg-[linear-gradient(160deg,#0b1a33,#070c1c)] p-6 sm:p-7">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(0,212,232,0.2),transparent)] blur-2xl"
                aria-hidden="true"
              />
              <Eyebrow>Você termina com</Eyebrow>
              <p className="v2-display relative mt-5 text-[22px] font-bold leading-snug text-white sm:text-[26px]">
                Um site profissional para apresentar o seu negócio na internet.
              </p>

              <ul className="relative mt-6 grid gap-2.5 sm:grid-cols-2">
                {PROCESS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5 text-[13px] leading-snug text-slate-200"
                  >
                    <CheckCircle2 className="mt-[1px] h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="relative mt-7 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                <CtaButton source="transformacao">
                  Quero esse resultado
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </CtaButton>
                <span className="text-[12.5px] font-semibold text-slate-400">
                  R$ 47,90 · pagamento único
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
