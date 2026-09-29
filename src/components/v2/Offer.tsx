/**
 * V2 — Adaptação a diferentes negócios, ecossistema de canais,
 * quebra da objeção "não sei programar", o que está incluído e renda extra.
 */
import React, { useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  Camera,
  Check,
  ClipboardList,
  Compass,
  Dumbbell,
  Globe,
  GraduationCap,
  Hammer,
  HeartPulse,
  Home,
  Instagram,
  Landmark,
  MessageCircle,
  Paintbrush,
  Palette,
  Ruler,
  Scissors,
  Search,
  Sparkles,
  Stethoscope,
  Terminal,
  TrendingUp,
  UtensilsCrossed,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChapterNumber, CtaButton, Eyebrow, Reveal } from './primitives';
import { NicheSiteCard, type NichePreviewData } from './Mockups';

/* ------------------------------------------------------------------ */
/* 08 — Diferentes tipos de negócio                                    */
/* ------------------------------------------------------------------ */
interface Niche extends NichePreviewData {
  icon: React.ComponentType<{ className?: string }>;
}

const NICHES: Niche[] = [
  {
    id: 'barbearia',
    domain: 'barbaenavalha.com.br',
    name: 'Barbearia',
    group: 'Estética & imagem',
    icon: Scissors,
    headline: 'Corte e barba com hora marcada no Tambaú.',
    services: ['Corte + barba', 'Pigmentação', 'Dia do noivo'],
    cta: 'Agendar no WhatsApp',
    colors: ['#12100e', '#c9a227', '#f6f1e7'],
    tone: 'Posicionamento premium e masculino',
  },
  {
    id: 'clinica',
    domain: 'clinicavidaepb.com.br',
    name: 'Clínica',
    group: 'Saúde',
    icon: Stethoscope,
    headline: 'Atendimento humanizado, do primeiro contato à consulta.',
    services: ['Consultas', 'Exames', 'Retorno online'],
    cta: 'Marcar avaliação',
    colors: ['#071a1c', '#12b8a6', '#f2fbfa'],
    tone: 'Confiança, clareza e acolhimento',
  },
  {
    id: 'advocacia',
    domain: 'mouraadvocacia.com.br',
    name: 'Advocacia',
    group: 'Serviços especializados',
    icon: Landmark,
    headline: 'Atuação consultiva e contenciosa com atendimento reservado.',
    services: ['Direito civil', 'Trabalhista', 'Contratos'],
    cta: 'Falar com o escritório',
    colors: ['#0b0f1a', '#8f9bb3', '#f4f6fb'],
    tone: 'Autoridade e sobriedade',
  },
  {
    id: 'restaurante',
    domain: 'casadoprato.com.br',
    name: 'Restaurante',
    group: 'Alimentação',
    icon: UtensilsCrossed,
    headline: 'Cozinha autoral no centro histórico, aberta de terça a domingo.',
    services: ['Menu do dia', 'Reservas', 'Eventos privados'],
    cta: 'Reservar mesa',
    colors: ['#170d09', '#e07a3f', '#fdf3ea'],
    tone: 'Apetite, ambiente e horário claros',
  },
  {
    id: 'imobiliaria',
    domain: 'imobiliaralitoral.com.br',
    name: 'Imobiliária',
    group: 'Imóveis',
    icon: Home,
    headline: 'Compra, venda e locação com acompanhamento jurídico.',
    services: ['Lançamentos', 'Usados', 'Administração de aluguel'],
    cta: 'Falar com um corretor',
    colors: ['#08131f', '#2f80ed', '#eef5ff'],
    tone: 'Credibilidade e volume de opções',
  },
  {
    id: 'fisioterapia',
    domain: 'fisiomovimentopb.com.br',
    name: 'Fisioterapia',
    group: 'Saúde & reabilitação',
    icon: HeartPulse,
    headline: 'Reabilitação e prevenção com plano de tratamento individual.',
    services: ['RPG', 'Pilates clínico', 'Pós-operatório'],
    cta: 'Agendar avaliação',
    colors: ['#0a1526', '#4cc9f0', '#eef8ff'],
    tone: 'Evolução, cuidado e método',
  },
  {
    id: 'salao',
    domain: 'salaoespacobella.com.br',
    name: 'Salão de beleza',
    group: 'Estética & imagem',
    icon: Sparkles,
    headline: 'Coloração, corte e tratamentos com agenda organizada.',
    services: ['Coloração', 'Mechas', 'Tratamentos'],
    cta: 'Reservar horário',
    colors: ['#170d16', '#e07ab0', '#fdeef6'],
    tone: 'Estética, portfólio e agenda',
  },
  {
    id: 'consultorio',
    domain: 'consultoriodrasaude.com.br',
    name: 'Consultório',
    group: 'Saúde',
    icon: HeartPulse,
    headline: 'Consultas particulares com prontidão para tirar dúvidas.',
    services: ['Consulta', 'Acompanhamento', 'Orientação online'],
    cta: 'Agendar consulta',
    colors: ['#08161a', '#2bb3a3', '#effaf8'],
    tone: 'Discrição e informação clara',
  },
  {
    id: 'fotografo',
    domain: 'lucasfotografia.com.br',
    name: 'Fotógrafo',
    group: 'Criativos',
    icon: Camera,
    headline: 'Ensaios e cobertura de eventos com entrega em alta resolução.',
    services: ['Ensaio externo', 'Casamentos', 'Corporativo'],
    cta: 'Pedir orçamento',
    colors: ['#0b0b0d', '#f2f2f2', '#ffffff'],
    tone: 'Portfólio em destaque, texto mínimo',
  },
  {
    id: 'eletricista',
    domain: 'eletricista24hjp.com.br',
    name: 'Eletricista',
    group: 'Serviços técnicos',
    icon: Zap,
    headline: 'Atendimento residencial e comercial com resposta no mesmo dia.',
    services: ['Instalações', 'Quadros', 'Emergências'],
    cta: 'Chamar agora',
    colors: ['#0d1017', '#f5a623', '#fff8ea'],
    tone: 'Urgência, área de atendimento e confiança',
  },
  {
    id: 'arquiteto',
    domain: 'estudiodearquitetura.com.br',
    name: 'Arquiteto',
    group: 'Projetos',
    icon: Ruler,
    headline: 'Projetos residenciais e comerciais do estudo à obra.',
    services: ['Estudo preliminar', 'Projeto executivo', 'Acompanhamento'],
    cta: 'Solicitar proposta',
    colors: ['#0e1116', '#9aa5b1', '#f7f9fb'],
    tone: 'Portfólio, processo e prazos',
  },
  {
    id: 'personal',
    domain: 'personalribeiro.com.br',
    name: 'Personal trainer',
    group: 'Esporte & treino',
    icon: Dumbbell,
    headline: 'Treinos presenciais e online com acompanhamento semanal.',
    services: ['Presencial', 'Online', 'Avaliação física'],
    cta: 'Começar agora',
    colors: ['#0b1409', '#8bc34a', '#f4fbe9'],
    tone: 'Energia, resultado e rotina',
  },
  {
    id: 'servicos',
    domain: 'grupotecservicos.com.br',
    name: 'Empresa de serviços',
    group: 'B2B & local',
    icon: Briefcase,
    headline: 'Soluções para empresas com contrato e SLA definidos.',
    services: ['Manutenção', 'Consultoria', 'Suporte contínuo'],
    cta: 'Solicitar orçamento',
    colors: ['#080f1e', '#3b82f6', '#eef4ff'],
    tone: 'Escopo, processo e responsabilidade',
  },
  {
    id: 'autonomo',
    domain: 'marianaautonoma.com.br',
    name: 'Profissional autônomo',
    group: 'Autônomos',
    icon: Compass,
    headline: 'Atendimento direto, sem intermediário, com agenda própria.',
    services: ['Serviço principal', 'Pacotes', 'Atendimento remoto'],
    cta: 'Enviar mensagem',
    colors: ['#0d0f1c', '#8b7cf6', '#f3f1ff'],
    tone: 'Página única, foco em contato',
  },
];

export function NichesSection() {
  const [activeId, setActiveId] = useState<string>(NICHES[0].id);
  const active = NICHES.find((n) => n.id === activeId) ?? NICHES[0];

  return (
    <section id="nichos" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <Reveal>
              <ChapterNumber value="08 — SERVE PARA O SEU NEGÓCIO?" />
              <h2 className="v2-display mt-4 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
                O método se adapta ao negócio.
                <br />
                <span className="text-slate-400">O site não é o mesmo para todo mundo.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <p className="text-[14.5px] leading-relaxed text-slate-400">
              O que muda de um negócio para o outro é o posicionamento, o conteúdo, a paleta, as
              imagens e a chamada para ação. Escolha um segmento ao lado e veja como essas decisões
              se traduzem em uma página diferente.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <Reveal delay={40}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Tipos de negócio">
              {NICHES.map((n) => {
                const isActive = n.id === activeId;
                const Icon = n.icon;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setActiveId(n.id)}
                    aria-pressed={isActive}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[12.5px] font-bold transition-all duration-200 cursor-pointer',
                      isActive
                        ? 'border-cyan-400/50 bg-cyan-400/[0.1] text-white shadow-[0_0_28px_-12px_rgba(0,212,232,0.9)]'
                        : 'border-white/[0.09] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200',
                    )}
                  >
                    <Icon className={cn('h-4 w-4', isActive ? 'text-cyan-300' : 'text-slate-500')} aria-hidden="true" />
                    {n.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                {active.group}
              </p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-slate-300">
                <strong className="font-bold text-white">{active.name}</strong> — {active.tone}. O
                briefing coleta os serviços, diferenciais, público e canais de contato específicos
                desse tipo de negócio — e é isso que diferencia o resultado final.
              </p>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="lg:sticky lg:top-24">
              <NicheSiteCard niche={active} />
              <p className="mt-4 text-center text-[12px] leading-relaxed text-slate-400">
                Prévia ilustrativa: cada negócio recebe textos, cores, imagens e chamadas próprios.
                Nenhum site é copiado de um modelo pronto.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 09 — Instagram + WhatsApp + Google + Site                           */
/* ------------------------------------------------------------------ */
const CHANNELS = [
  {
    icon: Instagram,
    name: 'Instagram',
    role: 'Atrai',
    text: 'Mostra movimento, gera desejo e traz a primeira atenção para o seu negócio.',
    color: 'text-pink-300',
    border: 'border-pink-400/25',
    bg: 'bg-pink-400/[0.07]',
  },
  {
    icon: MessageCircle,
    name: 'WhatsApp',
    role: 'Conversa',
    text: 'É onde a dúvida vira atendimento, orçamento e agendamento.',
    color: 'text-emerald-300',
    border: 'border-emerald-400/25',
    bg: 'bg-emerald-400/[0.07]',
  },
  {
    icon: Search,
    name: 'Google',
    role: 'Ajuda a encontrar',
    text: 'Perfil da Empresa, Maps e busca orgânica colocam você na frente de quem procura na sua região.',
    color: 'text-sky-300',
    border: 'border-sky-400/25',
    bg: 'bg-sky-400/[0.07]',
  },
  {
    icon: Globe,
    name: 'Site',
    role: 'Apresenta o negócio',
    text: 'Endereço próprio com posicionamento, serviços, diferenciais, estrutura e contato — aberto 24h.',
    color: 'text-cyan-300',
    border: 'border-cyan-400/30',
    bg: 'bg-cyan-400/[0.08]',
    highlight: true,
  },
];

export function ChannelsSection() {
  return (
    <section id="canais" className="relative border-y border-white/[0.07] bg-[#070c1c] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <ChapterNumber value="09 — O SITE NÃO SUBSTITUI NADA" />
            <h2 className="v2-display mt-4 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
              Ele entra no lugar que hoje está vazio.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-300">
              Você continua no Instagram e no WhatsApp. A diferença é que agora existe um lugar que
              apresenta o negócio por completo — e que pode ser encontrado no Google, enviado por
              mensagem e linkado na bio.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.name} delay={i * 80}>
                <article
                  className={cn(
                    'relative h-full rounded-2xl border p-5 transition-transform duration-300 hover:-translate-y-1',
                    c.border,
                    c.bg,
                  )}
                >
                  <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl border bg-[#060b18]/60', c.border, c.color)}>
                    <c.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-[15px] font-extrabold text-white">{c.name}</p>
                  <p className={cn('v2-mono mt-1 text-[10.5px] font-bold uppercase tracking-[0.14em]', c.color)}>
                    {c.role}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-slate-300">{c.text}</p>
                  {c.highlight ? (
                    <span className="absolute right-4 top-4 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2 py-[3px] text-[9px] font-bold uppercase tracking-wider text-cyan-200">
                      é o que falta
                    </span>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>

          {/* Conexão visual */}
          <Reveal delay={120}>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060b18] p-5 sm:p-6">
              <svg
                viewBox="0 0 900 90"
                className="hidden h-[90px] w-full sm:block"
                role="img"
                aria-label="Instagram atrai, Google ajuda a encontrar, o site apresenta o negócio e o WhatsApp fecha o contato."
              >
                <defs>
                  <linearGradient id="v2line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="35%" stopColor="#38bdf8" />
                    <stop offset="68%" stopColor="#00d4e8" />
                    <stop offset="100%" stopColor="#00e599" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 45 H 880"
                  stroke="url(#v2line)"
                  strokeWidth="2"
                  fill="none"
                  className="v2-flowline"
                  opacity="0.85"
                />
                {[
                  { x: 110, label: 'Instagram atrai' },
                  { x: 340, label: 'Google ajuda a encontrar' },
                  { x: 580, label: 'O site apresenta o negócio' },
                  { x: 800, label: 'WhatsApp fecha o contato' },
                ].map((p) => (
                  <g key={p.label}>
                    <circle cx={p.x} cy="45" r="6" fill="#0b1535" stroke="#00d4e8" strokeWidth="2" />
                    <text
                      x={p.x}
                      y="20"
                      textAnchor="middle"
                      fill="#aab6cc"
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      {p.label}
                    </text>
                  </g>
                ))}
              </svg>

              <ol className="grid gap-3 sm:hidden">
                {['Instagram atrai', 'Google ajuda a encontrar', 'O site apresenta o negócio', 'WhatsApp fecha o contato'].map(
                  (label, i) => (
                    <li key={label} className="flex items-center gap-3 text-[13.5px] font-semibold text-slate-200">
                      <span className="v2-mono flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[10px] font-bold text-cyan-300">
                        {i + 1}
                      </span>
                      {label}
                    </li>
                  ),
                )}
              </ol>

              <p className="mt-5 border-t border-white/[0.07] pt-5 text-[14px] leading-relaxed text-slate-300">
                O método conecta esses canais no próprio site: botão de WhatsApp, link do Instagram,
                endereço e horário para o Maps, e conteúdo pensado para a busca local.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 10 — "Mas eu não sei programar"                                     */
/* ------------------------------------------------------------------ */
const WITHOUT_METHOD = [
  'Programação',
  'HTML',
  'CSS',
  'JavaScript',
  'Hospedagem',
  'Domínio',
  'SEO',
  'Design',
  'Copywriting',
];

const WITH_METHOD = [
  ['Briefing', 'Você informa o negócio uma vez, em formulário guiado.'],
  ['Conteúdo', 'Você revisa e salva os textos que a IA escreveu com os seus dados.'],
  ['Identidade', 'Você escolhe a paleta e a direção visual do seu nicho.'],
  ['Prompts', 'Você copia comandos já estruturados para cada etapa.'],
  ['IA', 'A ferramenta de IA gera o site a partir dessas instruções.'],
  ['Publicação', 'Você segue o guia de hospedagem, domínio e Google.'],
];

export function NoCodeSection() {
  return (
    <section id="sem-programar" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="amber">A objeção mais comum</Eyebrow>
            <h2 className="v2-display mt-5 text-[27px] font-bold leading-[1.13] text-white sm:text-[36px]">
              “Mas eu não sei programar.”
            </h2>
            <p className="v2-display mt-4 text-[19px] font-bold leading-snug text-slate-300 sm:text-[24px]">
              Você não precisa virar programador para criar um site profissional.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-400">
              O método mostra o que fazer em cada etapa e usa ferramentas de IA para executar a parte
              técnica. O seu trabalho é decidir e informar — não escrever código.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal delay={40}>
            <div className="h-full rounded-3xl border border-white/[0.08] bg-[#0a0f1e] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#111b36] text-slate-400">
                  <Terminal className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    O caminho tradicional exigiria
                  </p>
                  <p className="text-[15px] font-bold text-slate-300">Dominar tudo isto</p>
                </div>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {WITHOUT_METHOD.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-[13px] font-semibold text-slate-400 line-through decoration-slate-500/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-white/[0.07] pt-5 text-[13.5px] leading-relaxed text-slate-400">
                Meses de estudo, ou um orçamento de agência para cada ajuste simples de texto.
              </p>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-cyan-400/25 bg-[linear-gradient(160deg,#0b1a33,#070c1c)] p-6 sm:p-7">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(0,212,232,0.18),transparent)] blur-2xl"
                aria-hidden="true"
              />
              <div className="relative flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  <Check className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                    Com o método você faz
                  </p>
                  <p className="text-[15px] font-bold text-white">Seis movimentos</p>
                </div>
              </div>

              <ol className="relative mt-6 space-y-3">
                {WITH_METHOD.map(([title, desc], i) => (
                  <li key={title} className="flex items-start gap-3.5">
                    <span className="v2-mono mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-cyan-400/30 bg-cyan-400/10 text-[10.5px] font-bold text-cyan-200">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[14.5px] font-bold text-white">{title}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-slate-400">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <Reveal delay={60}>
          <p className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 text-[13px] leading-relaxed text-slate-400">
            <strong className="font-bold text-slate-200">Expectativa honesta:</strong> nenhuma
            programação é exigida, mas registrar um domínio e publicar um site envolvem etapas
            técnicas com cliques, contas e configurações. O manual acompanha cada uma delas com
            passo a passo — e, se algo específico do seu caso fugir do previsto, você pode precisar de
            apoio pontual.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 11 — O que você recebe                                              */
/* ------------------------------------------------------------------ */
const INCLUDED = [
  {
    icon: GraduationCap,
    title: 'Método passo a passo em 6 módulos',
    text: 'De Meu Projeto a Revise e Publique, com o que fazer e por que cada etapa existe.',
  },
  {
    icon: ClipboardList,
    title: 'Área Meu Projeto',
    text: 'Formulário guiado que salva os dados do seu negócio e alimenta todos os prompts.',
  },
  {
    icon: FileTitleIcon,
    title: 'Briefing Mestre',
    text: 'Visão unificada de dados, textos, paleta e checklist em um só documento vivo.',
  },
  {
    icon: Sparkles,
    title: 'Central de Prompts',
    text: 'Comandos organizados por categoria, com objetivo, quando usar e IA recomendada.',
  },
  {
    icon: Palette,
    title: 'Identidade visual e sistema de cores',
    text: 'Prompt do Diretor de Arte que devolve paleta, contraste e direção de interface.',
  },
  {
    icon: Camera,
    title: 'Direção de arte para imagens',
    text: 'Quais fotos o seu site pede e como gerá-las ou melhorá-las com IA.',
  },
  {
    icon: Terminal,
    title: 'Prompt Mestre Final de 25 seções',
    text: 'O briefing consolidado que vira site dentro da ferramenta de IA que você escolher.',
  },
  {
    icon: Globe,
    title: 'Publicação, domínio e hospedagem',
    text: 'Guias de Netlify, Vercel, Hostinger e apontamento de domínio próprio.',
  },
  {
    icon: Search,
    title: 'Fase 3: presença no Google',
    text: 'Perfil da Empresa, Search Console e sitemap, LGPD e Google Analytics 4.',
  },
  {
    icon: Check,
    title: 'Checklist pré-lançamento',
    text: 'Revisão de conteúdo, design, conversão e mobile antes de colocar o site no ar.',
  },
  {
    icon: TrendingUp,
    title: 'Acompanhamento de progresso',
    text: 'Barra de jornada do início do projeto até o site publicado e indexado.',
  },
  {
    icon: Paintbrush,
    title: 'Direção de conteúdo',
    text: 'Hero, Sobre, Serviços, FAQ e SEO local revisados em um estúdio de copy.',
  },
];

/* Ícone local simples para evitar dependência de nome inexistente na lucide */
function FileTitleIcon({ className }: { className?: string }) {
  return <Briefcase className={className} aria-hidden="true" />;
}

export function IncludedSection() {
  return (
    <section id="incluido" className="relative border-y border-white/[0.07] bg-[#060a16] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
          <div>
            <Reveal>
              <ChapterNumber value="10 — O QUE VOCÊ RECEBE" />
              <h2 className="v2-display mt-4 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
                Um sistema completo — não um pacote de prompts.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <p className="text-[14.5px] leading-relaxed text-slate-400">
              Os prompts fazem parte do método. Mas o que você compra é o caminho organizado:
              contexto do negócio, sequência de decisões, orientação em cada etapa e as ferramentas
              para revisar, publicar e ser encontrado.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 70}>
              <article className="group flex h-full gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300 transition-colors group-hover:bg-cyan-400 group-hover:text-[#04101f]">
                  <item.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[14.5px] font-bold leading-snug text-white">{item.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={60}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-white/[0.08] bg-[linear-gradient(120deg,rgba(0,212,232,0.06),rgba(23,105,255,0.04))] px-6 py-8 text-center sm:px-10">
            <p className="v2-display max-w-3xl text-[19px] font-bold leading-snug text-white sm:text-[24px]">
              Em vez de descobrir sozinho o que fazer, você segue um processo estruturado do briefing
              à publicação.
            </p>
            <CtaButton source="incluido">
              Quero criar meu site
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 12 — Possibilidade de renda extra (nunca a promessa principal)      */
/* ------------------------------------------------------------------ */
const EXTRA_MODULES = [
  'A oportunidade de mercado: sites de R$ 1.500 a R$ 3.500',
  'Portfólio inicial sem clientes anteriores',
  'Precificação estratégica e formas de parcelamento',
  'Contrato de prestação de serviços e escopo definido',
  'Prospecção no Google Maps sem abordagem invasiva',
  'Reunião de fechamento de 15 minutos',
  'Coleta de informações do cliente em um único formulário',
  'Montagem com o Prompt Mestre em menos de 48 horas',
  'Entrega oficial, pagamento final e registro de domínio',
  'Manutenção mensal e recorrência',
];

export function ExtraIncomeSection() {
  return (
    <section id="renda-extra" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0a0f1e] p-6 sm:p-9">
            <div
              className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(0,229,153,0.12),transparent)] blur-2xl"
              aria-hidden="true"
            />
            <Eyebrow tone="green">E existe outra possibilidade</Eyebrow>
            <h2 className="v2-display relative mt-5 text-[23px] font-bold leading-[1.18] text-white sm:text-[30px]">
              O mesmo processo pode ser aplicado ao negócio de outra pessoa.
            </h2>
            <p className="relative mt-4 max-w-2xl text-[14.5px] leading-relaxed text-slate-300">
              O motivo principal para comprar o Seu Site Único é criar o site do{' '}
              <strong className="font-bold text-white">seu</strong> negócio. Mas quem percorre o
              processo inteiro entende como ele funciona — e pode usar esse conhecimento para criar
              sites para outros negócios da sua cidade.
            </p>

            <div className="relative mt-7 grid gap-2.5 sm:grid-cols-2">
              {EXTRA_MODULES.map((m, i) => (
                <div
                  key={m}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                >
                  <span className="v2-mono mt-[1px] text-[10.5px] font-bold text-emerald-400/80">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[13px] leading-snug text-slate-300">{m}</p>
                </div>
              ))}
            </div>

            <p className="relative mt-7 border-t border-white/[0.08] pt-6 text-[13px] leading-relaxed text-slate-400">
              Isso está incluído no acesso como uma trilha adicional (Plano Completo), com módulos e
              scripts comerciais.{' '}
              <strong className="font-bold text-slate-200">
                Não é uma promessa de ganhos: nenhum resultado financeiro é garantido
              </strong>{' '}
              — depende de como você aplica o processo, do seu mercado e da sua execução.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
