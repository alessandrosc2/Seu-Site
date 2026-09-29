/**
 * V2 — Blocos narrativos: o problema e por que "pedir um site para a IA" não resolve.
 */
import React from 'react';
import { AlertTriangle, Archive, ArrowDown, Check, Instagram, MessageCircle, Search, X } from 'lucide-react';
import { ChapterNumber, CtaButton, Eyebrow, Reveal } from './primitives';

/* ------------------------------------------------------------------ */
/* 01 — O negócio existe. A presença digital ainda não representa.     */
/* ------------------------------------------------------------------ */
const FOUND_CHANNELS = [
  {
    icon: <Instagram className="h-[15px] w-[15px] text-pink-300" aria-hidden="true" />,
    name: 'Perfil no Instagram',
    result: 'Fotos recentes, bio curta e um link na bio.',
  },
  {
    icon: <MessageCircle className="h-[15px] w-[15px] text-emerald-300" aria-hidden="true" />,
    name: 'Número de WhatsApp',
    result: 'A conversa começa sem nenhuma informação prévia.',
  },
  {
    icon: <Search className="h-[15px] w-[15px] text-slate-400" aria-hidden="true" />,
    name: 'Cadastro no Google',
    result: 'Endereço e telefone — quando alguém atualizou.',
  },
  {
    icon: <Archive className="h-[15px] w-[15px] text-slate-400" aria-hidden="true" />,
    name: 'Página antiga',
    result: 'Feita há anos, com serviços e preços desatualizados.',
  },
];

export function ProblemSection() {
  return (
    <section id="problema" className="relative border-y border-white/[0.07] bg-[#070c1c] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <Reveal>
              <ChapterNumber value="01 — O PONTO DE PARTIDA" />
              <h2 className="v2-display mt-4 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
                O negócio existe.
                <br />
                <span className="text-slate-400">A presença digital ainda não representa isso.</span>
              </h2>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-slate-300">
                Você pode ter um ótimo serviço, bons clientes e anos de experiência. Mas quando alguém
                procura sua empresa na internet, o que aparece não mostra nada disso.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-8 space-y-3">
                {FOUND_CHANNELS.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-start gap-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#0b1535]">
                      {c.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-white">{c.name}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-slate-400">{c.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* O que o cliente conclui */}
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(165deg,#0c1730,#070c1c)] p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl"
                aria-hidden="true"
              />
              <Eyebrow tone="slate">O que passa pela cabeça de quem procura</Eyebrow>

              <div className="relative mt-6 space-y-3.5">
                {[
                  '“Não achei o site. Será que é confiável?”',
                  '“Os preços e serviços não estão em lugar nenhum.”',
                  '“O concorrente tem uma página bem melhor organizada.”',
                  '“Vou mandar mensagem para ele e ver se responde.”',
                ].map((quote) => (
                  <div
                    key={quote}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-[#060b18]/70 px-4 py-3.5"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400/80" aria-hidden="true" />
                    <p className="text-[14px] leading-relaxed text-slate-200">{quote}</p>
                  </div>
                ))}
              </div>

              <div className="relative mt-7 border-t border-white/10 pt-6">
                <p className="text-[15px] leading-relaxed text-slate-300">
                  Nenhum desses canais é ruim. O problema é que{' '}
                  <strong className="font-bold text-white">
                    nenhum deles apresenta o negócio por completo
                  </strong>{' '}
                  — com posicionamento, serviços, diferenciais, prova de estrutura e um caminho claro
                  para o contato.
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-slate-400">
                  É isso que um site próprio resolve. E é isso que o método organiza.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — Por que "IA, crie um site" não resolve                         */
/* ------------------------------------------------------------------ */
const DECISIONS = [
  'Posicionamento',
  'Conteúdo',
  'Estrutura de páginas',
  'Textos',
  'Imagens',
  'Identidade visual',
  'Cores',
  'Tipografia',
  'Experiência e navegação',
  'Chamadas para ação',
  'Informações de contato',
  'Publicação',
  'Domínio',
  'Presença no Google',
];

export function PromptGapSection() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <ChapterNumber value="02 — O MAL-ENTENDIDO" />
            <h2 className="v2-display mt-4 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
              O problema não é falta de ferramenta.
              <br />
              <span className="text-slate-400">É não saber o que pedir.</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-[15.5px] leading-relaxed text-slate-300">
              Digitar “IA, crie um site para minha empresa” gera uma página. Não gera a{' '}
              <strong className="font-bold text-white">sua</strong> página — com o seu posicionamento,
              os seus serviços, as suas cores e um caminho claro até o seu WhatsApp.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Pedido genérico */}
          <Reveal delay={60}>
            <div className="h-full rounded-3xl border border-rose-500/20 bg-[#0b1020] p-6 sm:p-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/[0.08] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-rose-300">
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Pedido genérico
              </span>

              <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#060b18] p-4">
                <p className="v2-mono text-[12.5px] leading-relaxed text-slate-300">
                  <span className="text-rose-400/70">você ›</span> “Crie um site para a minha empresa.”
                </p>
                <div className="my-3 h-px bg-white/[0.07]" />
                <p className="v2-mono text-[12.5px] leading-relaxed text-slate-400">
                  <span className="text-slate-500">ia ›</span> modelo pronto, texto de exemplo, cores
                  aleatórias, imagens genéricas.
                </p>
              </div>

              <ul className="mt-5 space-y-2.5">
                {[
                  'Textos que não descrevem o seu serviço',
                  'Cores que não têm relação com a sua marca',
                  'Imagens que poderiam ser de qualquer empresa',
                  'Sem ideia de o que revisar, ajustar ou publicar depois',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-400">
                    <X className="mt-1 h-3.5 w-3.5 shrink-0 text-rose-400/70" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Pedido com método */}
          <Reveal delay={130}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-cyan-400/25 bg-[linear-gradient(165deg,#0b1a33,#070c1c)] p-6 sm:p-7">
              <div
                className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
                aria-hidden="true"
              />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/[0.08] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Pedido com método
              </span>

              <div className="relative mt-5 rounded-2xl border border-white/[0.08] bg-[#060b18] p-4">
                <p className="v2-mono text-[12.5px] leading-relaxed text-slate-300">
                  <span className="text-cyan-400/80">você ›</span> briefing do negócio + conteúdo
                  revisado + paleta definida + imagens + instruções de estrutura e CTA.
                </p>
                <div className="my-3 h-px bg-white/[0.07]" />
                <p className="v2-mono text-[12.5px] leading-relaxed text-slate-400">
                  <span className="text-slate-500">ia ›</span> site com a sua cara, pronto para
                  revisar, publicar e indexar.
                </p>
              </div>

              <p className="relative mt-6 text-[13px] font-bold uppercase tracking-[0.12em] text-slate-400">
                As decisões que vêm antes do prompt
              </p>
              <ul className="relative mt-3 flex flex-wrap gap-2">
                {DECISIONS.map((d) => (
                  <li
                    key={d}
                    className="rounded-lg border border-white/[0.09] bg-white/[0.03] px-2.5 py-1.5 text-[12px] font-semibold text-slate-200"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.02] px-6 py-8 text-center sm:px-10">
            <p className="v2-display max-w-3xl text-[20px] font-bold leading-snug text-white sm:text-[26px]">
              A IA consegue criar. O problema é saber{' '}
              <span className="v2-gradient-text">o que pedir, em qual ordem e como avaliar o resultado.</span>
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <CtaButton source="prompt_gap">
                Quero o método completo
              </CtaButton>
              <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-400">
                <ArrowDown className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                veja como ele organiza cada etapa
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
