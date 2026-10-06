/**
 * V2 — O método (6 módulos reais do manual) e a demonstração do produto.
 */
import React, { useState } from 'react';
import { ArrowRight, Check, Layers, MousePointerClick } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChapterNumber, CtaButton, Eyebrow, Reveal, scrollToSection } from './primitives';
import { AppMockup, LaunchMockup, SCREENS, type ScreenId } from './Mockups';

/* ------------------------------------------------------------------ */
/* Dados extraídos de src/dashboard-app/data/curriculum.ts             */
/* ------------------------------------------------------------------ */
interface ModuleInfo {
  id: string;
  number: string;
  name: string;
  claim: string;
  description: string;
  tasks: string[];
  outcome: string;
}

const METHOD_MODULES: ModuleInfo[] = [
  {
    id: 'm01',
    number: '01',
    name: 'Meu Projeto',
    claim: 'Entenda e informe o seu negócio',
    description:
      'Você cadastra a fonte de verdade do projeto: nome, segmento, cidade e região, WhatsApp, Instagram, endereço, horário, serviços, público-alvo, diferenciais, objetivo do site e tom de voz.',
    tasks: [
      'Formulário guiado com as informações do negócio',
      'Prompt de estruturação do negócio com IA',
      'Dados salvos e reutilizados em todas as etapas seguintes',
    ],
    outcome: 'Briefing estruturado, sem informações soltas em conversas de chat.',
  },
  {
    id: 'm02',
    number: '02',
    name: 'Prepare o Conteúdo',
    claim: 'Defina o que o site vai dizer',
    description:
      'Um estúdio único de copy para revisar e salvar os textos do site: Hero, Sobre Nós, Serviços (puxados de Meu Projeto), FAQ em accordion e a otimização de SEO local, com prévia de como o site aparece no Google.',
    tasks: [
      'Prompt de copywriting preenchido com os seus dados',
      'Textos de Hero, Sobre, Serviços e FAQ',
      'SEO local: título e descrição com prévia no Google',
    ],
    outcome: 'Conteúdo pronto e salvo antes de gerar qualquer linha de site.',
  },
  {
    id: 'm03',
    number: '03',
    name: 'Defina o Visual',
    claim: 'Crie a identidade visual e o sistema de cores',
    description:
      'Fluxo de quatro passos: confirme seu nicho, copie o prompt do Diretor de Arte, cole no ChatGPT e registre a resposta no projeto. O resultado vira paleta (primary, secondary, accent, fundo, texto e CTA) e direção visual.',
    tasks: [
      'Prompt do Diretor de Arte para sistema de cores profissional',
      'Paleta compatível com as cores da sua marca',
      'Posicionamento visual e personalidade registrados',
    ],
    outcome: 'Um site com critério visual — e não com cores escolhidas no impulso.',
  },
  {
    id: 'm04',
    number: '04',
    name: 'Prepare as Imagens',
    claim: 'Descubra quais fotos o site precisa',
    description:
      'Direção de arte fotográfica: quais imagens cada seção pede, o que fotografar no seu negócio, como gerar ou melhorar imagens com IA e como usá-las no Prompt Mestre. Com exemplos práticos por nicho.',
    tasks: [
      'Guia de direção de arte fotográfica',
      'Lista de imagens por tipo de negócio',
      'Onde criar: Google Flow, Leonardo.ai, Ideogram, Midjourney',
    ],
    outcome: 'Imagens coerentes com o posicionamento definido na etapa anterior.',
  },
  {
    id: 'm05',
    number: '05',
    name: 'Gere Seu Site com IA',
    claim: 'Transforme tudo isso em um site real',
    description:
      'O manual consolida dados, textos, paleta, tipografia e regras de contraste (WCAG AA) no Prompt Mestre Final de 25 seções. Você copia, anexa as imagens e cola na ferramenta de IA escolhida — Claude, Arena.ai, Manus, Lovable ou Google AI Studio.',
    tasks: [
      'Prompt Mestre Final de 25 seções consolidado',
      'Lista das melhores IAs para criação de sites',
      'Comandos de refinamento para ajustar o resultado',
    ],
    outcome: 'Um site gerado a partir das suas decisões, não de um modelo qualquer.',
  },
  {
    id: 'm06',
    number: '06',
    name: 'Revise e Publique',
    claim: 'Coloque no ar e seja encontrado',
    description:
      'Checklist obrigatório antes de publicar (conteúdo, design, conversão e mobile), guia de registro de domínio e hospedagem e a Fase 3 de presença no Google: Perfil da Empresa, Search Console, LGPD e Analytics.',
    tasks: [
      'Checklist pré-lançamento com 17 pontos de revisão',
      'Netlify, Vercel, Hostinger e apontamento de domínio próprio',
      'Google Meu Negócio, Search Console, LGPD e GA4',
    ],
    outcome: 'Site no ar, com endereço próprio e indexado no Google.',
  },
];

const FLOW = ['Informar', 'Preparar', 'Gerar', 'Revisar', 'Publicar'];

export function MethodSection() {
  const [activeId, setActiveId] = useState(METHOD_MODULES[0].id);
  const active = METHOD_MODULES.find((m) => m.id === activeId) ?? METHOD_MODULES[0];

  return (
    <section id="metodo" className="relative border-t border-white/[0.07] bg-[#070c1c] py-20 sm:py-24">
      <div className="v2-grid-bg-soft pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <ChapterNumber value="03 — A SOLUÇÃO" />
            <h2 className="v2-display mt-4 text-[27px] font-bold leading-[1.14] text-white sm:text-[36px]">
              Você não precisa aprender programação.
              <br />
              <span className="v2-gradient-text">Precisa saber o que fazer.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-slate-300">
              O Seu Site Único é um manual interativo que organiza o processo inteiro em seis etapas
              consecutivas. Cada etapa diz o que fazer, por que aquilo importa e o que você deve ter
              em mãos antes de avançar.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <ol className="mt-7 flex flex-wrap items-center gap-2" aria-label="Fluxo do método">
              {FLOW.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-3.5 py-1.5 text-[12px] font-bold text-cyan-200">
                    {step}
                  </span>
                  {i < FLOW.length - 1 ? (
                    <ArrowRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* Navegador de módulos */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <Reveal delay={60}>
            <div
              role="tablist"
              aria-label="Módulos do método"
              aria-orientation="vertical"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {METHOD_MODULES.map((m) => {
                const isActive = m.id === activeId;
                return (
                  <button
                    key={m.id}
                    role="tab"
                    type="button"
                    id={`tab-${m.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${m.id}`}
                    onClick={() => setActiveId(m.id)}
                    className={cn(
                      'group flex min-w-[210px] items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer lg:min-w-0',
                      isActive
                        ? 'border-cyan-400/45 bg-[linear-gradient(120deg,rgba(0,212,232,0.12),rgba(23,105,255,0.06))] shadow-[0_0_40px_-16px_rgba(0,212,232,0.7)]'
                        : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
                    )}
                  >
                    <span
                      className={cn(
                        'v2-mono mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold transition-colors',
                        isActive ? 'bg-cyan-400 text-[#04101f]' : 'bg-[#111b36] text-slate-400',
                      )}
                    >
                      {m.number}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          'block text-[14.5px] font-bold leading-tight',
                          isActive ? 'text-white' : 'text-slate-200',
                        )}
                      >
                        {m.name}
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-slate-400">
                        {m.claim}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(160deg,#0c1730,#070c1c)] p-6 sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(0,212,232,0.18),transparent)] blur-2xl"
                aria-hidden="true"
              />
              <div className="relative flex flex-wrap items-center gap-3">
                <Eyebrow>
                  <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                  Módulo {active.number}
                </Eyebrow>
                <span className="v2-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  {active.name}
                </span>
              </div>

              <h3 className="v2-display relative mt-5 text-[22px] font-bold leading-tight text-white sm:text-[27px]">
                {active.claim}
              </h3>
              <p className="relative mt-4 text-[14.5px] leading-relaxed text-slate-300">
                {active.description}
              </p>

              <ul className="relative mt-6 space-y-2.5">
                {active.tasks.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[14px] leading-relaxed text-slate-200">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-cyan-400/30 bg-cyan-400/10">
                      <Check className="h-3 w-3 text-cyan-300" aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="relative mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                  Você termina esta etapa com
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-100">{active.outcome}</p>
              </div>

              <div className="relative mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('produto')}
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-cyan-300 transition-colors hover:text-cyan-200 cursor-pointer"
                >
                  <MousePointerClick className="h-4 w-4" aria-hidden="true" />
                  Ver esta área por dentro
                </button>
                <span className="h-4 w-px bg-white/10" aria-hidden="true" />
                <span className="text-[12.5px] text-slate-400">
                  Selecione um módulo para ver o que acontece em cada etapa.
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-10">
            <LaunchMockup />
          </div>
        </Reveal>

        <Reveal delay={60}>
          <p className="mt-6 text-center text-[13.5px] leading-relaxed text-slate-400">
            Da primeira informação cadastrada até o site indexado no Google, o caminho é o mesmo —
            e ele está inteiro dentro da área de membros.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 flex justify-center">
            <CtaButton source="metodo">
              Quero seguir esse caminho
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Demonstração do produto                                             */
/* ------------------------------------------------------------------ */
export function ProductDemoSection() {
  const [screen, setScreen] = useState<ScreenId>('painel');
  const current = SCREENS.find((s) => s.id === screen) ?? SCREENS[0];

  return (
    <section id="produto" className="relative py-20 sm:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(23,105,255,0.14),transparent)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div>
            <Reveal>
              <ChapterNumber value="04 — POR DENTRO DO PRODUTO" />
              <h2 className="v2-display mt-4 text-[27px] font-bold leading-[1.14] text-white sm:text-[36px]">
                Isto não é uma promessa abstrata.
                <br />
                <span className="text-slate-400">É a área que você abre depois da compra.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={90}>
            <p className="text-[14.5px] leading-relaxed text-slate-400">
              Um manual interativo com painel de jornada, projeto do seu negócio, briefing
              consolidado, central de prompts e guias de publicação — tudo no mesmo lugar, com o
              progresso salvo na sua conta.
            </p>
          </Reveal>
        </div>

        {/* Abas */}
        <Reveal delay={60}>
          <div
            role="tablist"
            aria-label="Telas do produto"
            className="mt-10 flex gap-2 overflow-x-auto pb-2"
          >
            {SCREENS.map((s) => {
              const isActive = s.id === screen;
              return (
                <button
                  key={s.id}
                  role="tab"
                  type="button"
                  id={`demo-tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls="demo-panel"
                  onClick={() => setScreen(s.id)}
                  className={cn(
                    'shrink-0 rounded-xl border px-4 py-2.5 text-[12.5px] font-bold transition-all duration-200 cursor-pointer',
                    isActive
                      ? 'border-cyan-400/50 bg-cyan-400/[0.1] text-white'
                      : 'border-white/[0.09] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200',
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Mockup */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start">
          <Reveal delay={40}>
            <div
              role="tabpanel"
              id="demo-panel"
              aria-labelledby={`demo-tab-${current.id}`}
              className="lg:sticky lg:top-24"
            >
              <AppMockup screen={screen} />
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="rounded-3xl border border-white/10 bg-[#0b1535]/70 p-6 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                {current.label}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-200">{current.caption}</p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                {[
                  ['Progresso salvo', 'Você retoma de onde parou, em qualquer dispositivo.'],
                  ['Dados reaproveitados', 'O que você informa uma vez alimenta todos os prompts.'],
                  ['Comando de busca', 'Encontre qualquer etapa ou prompt do manual em segundos.'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    <p className="text-[13.5px] leading-relaxed text-slate-300">
                      <strong className="font-bold text-white">{title}.</strong> {desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[12px] leading-relaxed text-slate-500">
                As imagens acima reconstroem a interface real da área de membros, com dados de
                exemplo para ilustração.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

