/**
 * Reconstruções visuais das telas REAIS do produto (dashboard-app).
 * Nada aqui inventa funcionalidade: cada rótulo, módulo, atalho e checklist
 * foi extraído de src/dashboard-app (Dashboard, Sidebar, ProjectDrawer,
 * BriefingMestreView, PromptHubView, VisualIdentityBuilder, MasterPromptStep,
 * LaunchPadStep, HostingGuideView, Fase3SeoView, data/curriculum.ts,
 * data/promptLibrary.ts, data/hostingGuide.ts, data/fase3SeoData.ts).
 */
import React from 'react';
import { Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ScreenId = 'painel' | 'projeto' | 'prompts' | 'identidade' | 'mestre';

export const SCREENS: { id: ScreenId; label: string; caption: string }[] = [
  {
    id: 'painel',
    label: 'Painel Geral & Jornada',
    caption:
      'O painel mostra a jornada completa (INFORMAR → PREPARAR → GERAR → REVISAR → PUBLICAR), a barra de progresso e o próximo passo recomendado. Você nunca precisa adivinhar o que fazer agora.',
  },
  {
    id: 'projeto',
    label: 'Meu Projeto & Briefing Mestre',
    caption:
      'Você cadastra as informações do seu negócio uma única vez. Esses dados alimentam automaticamente todos os prompts — sem redigitar nada e sem briefing solto em conversa de chat.',
  },
  {
    id: 'prompts',
    label: 'Central de Prompts',
    caption:
      'Os comandos ficam organizados por categoria (Fundação, Copywriting, Identidade & Fotos, Construção com IA e Comercial), com objetivo, quando usar e a IA recomendada para cada etapa.',
  },
  {
    id: 'identidade',
    label: 'Identidade Visual & Cores',
    caption:
      'Um fluxo de 4 passos gera o sistema de cores do seu nicho: confirmar o nicho, copiar o prompt do Diretor de Arte, colar no ChatGPT e registrar a resposta no seu projeto.',
  },
  {
    id: 'mestre',
    label: 'Prompt Mestre Final',
    caption:
      'Tudo que você decidiu é consolidado em um único briefing de 25 seções, pronto para colar na ferramenta de IA que cria o site — com instruções de refinamento depois do primeiro resultado.',
  },
];

/* ------------------------------------------------------------------ */
/* Peças base                                                          */
/* ------------------------------------------------------------------ */
function WinDots() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
    </div>
  );
}

function SideItem({
  children,
  active,
  badge,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  badge?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 rounded-lg px-2.5 py-[7px] text-[10.5px] font-semibold leading-tight',
        active
          ? 'bg-[#00d4e8]/12 text-[#7df3ff] ring-1 ring-inset ring-[#00d4e8]/35'
          : 'text-[#aab6cc]',
        className,
      )}
    >
      <span className="truncate">{children}</span>
      {badge ? <span className="v2-mono shrink-0 text-[9px] text-[#71809b]">{badge}</span> : null}
    </div>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1.5 mt-4 flex items-center justify-between px-1 first:mt-0">
      <span className="v2-mono text-[8.5px] font-bold uppercase tracking-[0.16em] text-[#71809b]">
        {children}
      </span>
    </div>
  );
}

function Card({
  children,
  className,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[#203252] bg-[#0b1535] p-3',
        glow && 'border-[#00d4e8]/40 shadow-[0_0_28px_-8px_rgba(0,212,232,0.45)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Tag({
  children,
  tone = 'cyan',
}: {
  children: React.ReactNode;
  tone?: 'cyan' | 'green' | 'amber' | 'slate';
}) {
  const tones = {
    cyan: 'border-[#00d4e8]/30 bg-[#00d4e8]/10 text-[#7df3ff]',
    green: 'border-[#00e599]/30 bg-[#00e599]/10 text-[#00e599]',
    amber: 'border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#fbbf24]',
    slate: 'border-[#203252] bg-[#111b36] text-[#aab6cc]',
  } as const;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-[3px] text-[9px] font-bold uppercase tracking-wider',
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Módulos reais do manual (curriculum.ts)                             */
/* ------------------------------------------------------------------ */
const MODULES = [
  { n: '01', name: 'Meu Projeto', done: true },
  { n: '02', name: 'Prepare o Conteúdo', done: true },
  { n: '03', name: 'Defina o Visual', done: true },
  { n: '04', name: 'Prepare as Imagens', done: false },
  { n: '05', name: 'Gere Seu Site com IA', done: false },
  { n: '06', name: 'Revise e Publique', done: false },
];

const CHECKLIST_GROUPS = [
  { label: 'Conteúdo', items: 4 },
  { label: 'Design', items: 5 },
  { label: 'Conversão', items: 4 },
  { label: 'Mobile', items: 4 },
];

/* ------------------------------------------------------------------ */
/* Telas                                                               */
/* ------------------------------------------------------------------ */
function ScreenPainel() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-[#203252] bg-[linear-gradient(120deg,#0b1535,#152342)] p-3.5">
        <Tag>Manual interativo & guiado</Tag>
        <p className="mt-2 text-[13px] font-extrabold leading-snug text-[#f5f7ff]">
          Seu site será construído em poucos passos com ferramentas de IA.
        </p>
        <p className="mt-1 text-[10.5px] leading-relaxed text-[#71809b]">
          Você não precisa saber programar. Siga o fluxo:{' '}
          <strong className="text-[#aab6cc]">INFORMAR → PREPARAR → GERAR → REVISAR → PUBLICAR</strong>
        </p>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full border border-[#203252] bg-[#111b36] p-[2px]">
          <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,#00d4e8,#1769ff)]" />
        </div>
        <div className="mt-1.5 flex justify-between text-[9px] text-[#71809b]">
          <span>Início do Projeto</span>
          <span>Site Publicado & Indexado no Google (100%)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { t: 'Central de Prompts', d: 'Comandos calibrados com seus dados', b: '13 Prompts', c: 'text-[#00d4e8]' },
          { t: 'Meu Projeto', d: 'Informações que alimentam os prompts', b: 'Briefing', c: 'text-[#1769ff]' },
          { t: 'Briefing Mestre', d: 'Visão unificada de dados e textos', b: 'Aprovado', c: 'text-[#00e599]' },
          { t: 'Registro & Hospedagem', d: 'Vercel, Netlify e Hostinger', b: 'Novo Módulo', c: 'text-[#00e599]' },
        ].map((item) => (
          <Card key={item.t} className="p-2.5">
            <span className={cn('v2-mono text-[9px] font-bold', item.c)}>{item.b}</span>
            <p className="mt-1 text-[11px] font-bold leading-tight text-[#f5f7ff]">{item.t}</p>
            <p className="mt-0.5 text-[9.5px] leading-snug text-[#71809b]">{item.d}</p>
          </Card>
        ))}
      </div>

      <Card glow className="p-3">
        <div className="flex items-center justify-between gap-2">
          <Tag>Ação recomendada agora</Tag>
          <span className="v2-mono text-[9px] text-[#71809b]">Etapa 04</span>
        </div>
        <p className="mt-2 text-[11.5px] font-bold text-[#f5f7ff]">Prepare as Imagens</p>
        <p className="mt-0.5 text-[9.5px] leading-snug text-[#71809b]">
          Descubra quais fotos seu site precisa e como gerá-las ou melhorá-las com IA.
        </p>
        <div className="mt-2.5 inline-flex items-center rounded-lg bg-[#00d4e8] px-3 py-1.5 text-[10px] font-extrabold text-[#04101f]">
          Executar Esta Etapa
        </div>
      </Card>

      <Card className="p-3">
        <p className="text-[10.5px] font-bold text-[#f5f7ff]">Dados do Seu Negócio</p>
        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-[9.5px]">
          {[
            ['Empresa / Profissional', 'Studio Barba & Navalha'],
            ['Segmento de Atuação', 'Barbearia'],
            ['Cidade & Região', 'João Pessoa (PB)'],
            ['WhatsApp de Atendimento', '(83) 99999-0000'],
          ].map(([k, v]) => (
            <div key={k}>
              <span className="block text-[#71809b]">{k}</span>
              <span className="font-semibold text-[#aab6cc]">{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[9.5px] text-[#00e599]">3 serviços cadastrados para o site</p>
      </Card>
    </div>
  );
}

function ScreenProjeto() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-extrabold text-[#f5f7ff]">Briefing Mestre</p>
          <p className="text-[9.5px] text-[#71809b]">
            Dados consolidados e prontos para alimentar a geração com IA.
          </p>
        </div>
        <span className="rounded-lg border border-[#203252] bg-[#111b36] px-2.5 py-1 text-[9.5px] font-semibold text-[#aab6cc]">
          Editar Dados
        </span>
      </div>

      <Card className="p-3">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-[9.5px]">
          {[
            ['Nome Comercial', 'Studio Barba & Navalha'],
            ['Segmento', 'Barbearia premium'],
            ['Cidade & Região', 'João Pessoa (PB)'],
            ['WhatsApp de Vendas', '(83) 99999-0000'],
            ['Instagram', '@barbaenavalha'],
            ['Endereço Físico', 'Av. Epitácio Pessoa, 1200'],
            ['Tom de Voz', 'Direto e confiante'],
            ['Objetivo Central do Site', 'Agendamentos no WhatsApp'],
          ].map(([k, v]) => (
            <div key={k}>
              <span className="block font-semibold text-[#71809b]">{k}</span>
              <span className="font-medium text-[#f5f7ff]">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-[#203252] pt-2.5">
          <span className="block text-[9px] font-semibold text-[#71809b]">Público-Alvo e Dores</span>
          <p className="mt-0.5 text-[9.5px] leading-relaxed text-[#aab6cc]">
            Homens de 25 a 45 anos que valorizam atendimento com hora marcada e ambiente organizado.
          </p>
        </div>
      </Card>

      <Card className="p-3">
        <p className="text-[10.5px] font-bold text-[#f5f7ff]">Paleta de Cores e Interface</p>
        <div className="mt-2 grid grid-cols-6 gap-1.5">
          {[
            ['Primary', '#00D4E8'],
            ['Secondary', '#1769FF'],
            ['Accent', '#00E599'],
            ['Fundo', '#080D20'],
            ['Texto', '#F5F7FF'],
            ['CTA Ação', '#00D4E8'],
          ].map(([label, hex]) => (
            <div key={label} className="text-center">
              <div
                className="h-8 w-full rounded-md border border-white/10"
                style={{ background: hex }}
              />
              <span className="mt-1 block text-[8px] font-bold text-[#aab6cc]">{label}</span>
              <span className="v2-mono block text-[7.5px] text-[#71809b]">{hex}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        {CHECKLIST_GROUPS.slice(0, 3).map((g) => (
          <Card key={g.label} className="p-2.5">
            <p className="text-[9.5px] font-bold text-[#f5f7ff]">{g.label}</p>
            <div className="mt-1.5 space-y-1">
              {Array.from({ length: g.items }).map((_, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'h-2.5 w-2.5 shrink-0 rounded-[3px] border',
                      i < 2 ? 'border-[#00e599] bg-[#00e599]/70' : 'border-[#203252] bg-[#111b36]',
                    )}
                  />
                  <span className="h-[3px] flex-1 rounded-full bg-[#152342]" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ScreenPrompts() {
  const filters = [
    'Todos os Prompts',
    'Fundação & Planejamento',
    'Copywriting & Textos',
    'Identidade & Fotos',
    'Construção & Código com IA',
    'Comercial',
  ];
  const prompts = [
    {
      t: 'PROMPT — ESTRUTURAÇÃO DO NEGÓCIO COM IA',
      step: 'Etapa 01 · Meu Projeto',
      ai: 'ChatGPT / Claude / Gemini',
      cat: 'Fundação & Planejamento',
    },
    {
      t: 'PROMPT — ESTÚDIO DE COPYWRITING & TEXTOS',
      step: 'Etapa 02 · Prepare o Conteúdo',
      ai: 'ChatGPT / Claude / Gemini',
      cat: 'Copywriting & Textos',
    },
    {
      t: 'PROMPT DO DIRETOR DE ARTE — SISTEMA DE CORES',
      step: 'Etapa 03 · Defina o Visual',
      ai: 'ChatGPT',
      cat: 'Fundação & Planejamento',
    },
    {
      t: 'PROMPT 21 — GUIA DE DIREÇÃO DE ARTE FOTOGRÁFICA',
      step: 'Etapa 04 · Prepare as Imagens',
      ai: 'Google Flow / Leonardo.ai / Ideogram / Midjourney',
      cat: 'Identidade & Fotos',
    },
  ];

  return (
    <div className="space-y-3">
      <div>
        <Tag>Central de prompts guiados</Tag>
        <p className="mt-2 text-[10.5px] leading-relaxed text-[#71809b]">
          Comandos pré-estruturados para alimentar o ChatGPT, Claude, Gemini ou Lovable. Clique em{' '}
          <strong className="text-[#00d4e8]">Copiar Prompt</strong> e cole na IA.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {filters.map((f, i) => (
          <span
            key={f}
            className={cn(
              'rounded-full border px-2.5 py-1 text-[9px] font-semibold',
              i === 0
                ? 'border-[#00d4e8]/50 bg-[#00d4e8]/12 text-[#7df3ff]'
                : 'border-[#203252] bg-[#0e1938] text-[#71809b]',
            )}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        {prompts.map((p) => (
          <Card key={p.t} className="p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[10.5px] font-bold text-[#f5f7ff]">{p.t}</p>
                <p className="mt-0.5 text-[9px] text-[#71809b]">{p.step}</p>
              </div>
              <span className="shrink-0 rounded-md bg-[#00e599] px-2 py-1 text-[9px] font-extrabold text-[#04101f]">
                Copiar
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <Tag tone="slate">{p.cat}</Tag>
              <span className="v2-mono text-[8.5px] text-[#00d4e8]">IA: {p.ai}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ScreenIdentidade() {
  const steps = ['Confirme seu Nicho', 'Copie o Prompt', 'Cole no ChatGPT', 'Cole a Resposta Aqui'];
  return (
    <div className="space-y-3">
      <div>
        <Tag tone="amber">Etapa 03 · Defina o Visual</Tag>
        <p className="mt-2 text-[10.5px] leading-relaxed text-[#71809b]">
          Seu negócio: <strong className="text-[#f5f7ff]">Studio Barba & Navalha</strong> · Nicho:{' '}
          <strong className="text-[#00d4e8]">Barbearia</strong> em{' '}
          <strong className="text-[#f5f7ff]">João Pessoa</strong>. Copie o prompt do Diretor de Arte
          para o GPT criar o sistema de cores da sua marca.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        {steps.map((s, i) => (
          <div
            key={s}
            className={cn(
              'rounded-lg border p-2 text-center',
              i === 1
                ? 'border-[#00d4e8]/50 bg-[#00d4e8]/10'
                : 'border-[#203252] bg-[#0b1535]',
            )}
          >
            <span
              className={cn(
                'v2-mono mx-auto flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold',
                i <= 1 ? 'bg-[#00d4e8] text-[#04101f]' : 'bg-[#152342] text-[#71809b]',
              )}
            >
              {i + 1}
            </span>
            <p className="mt-1 text-[8.5px] font-semibold leading-tight text-[#aab6cc]">{s}</p>
          </div>
        ))}
      </div>

      <Card className="p-3">
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-semibold text-[#aab6cc]">
            Texto do Prompt Formatado:
          </span>
          <span className="v2-mono text-[9px] text-[#00d4e8]">Pronto para envio</span>
        </div>
        <div className="v2-mono mt-2 space-y-1 rounded-lg border border-[#203252] bg-[#060b18] p-2.5 text-[8.5px] leading-relaxed text-[#71809b]">
          <p className="text-[#7df3ff]">PROMPT DO DIRETOR DE ARTE</p>
          <p>SISTEMA DE CORES PROFISSIONAL PARA WEBSITE</p>
          <p>
            Nicho: Barbearia · Personalidade: premium, masculina, precisa...
          </p>
          <p className="text-[#203252]">------------------------------------------</p>
          <p>Devolva: primary, secondary, accent, background, text, cta...</p>
        </div>
        <div className="mt-2.5 flex gap-2">
          <span className="rounded-lg bg-[#00d4e8] px-3 py-1.5 text-[9.5px] font-extrabold text-[#04101f]">
            Copiar Prompt
          </span>
          <span className="rounded-lg border border-[#203252] bg-[#111b36] px-3 py-1.5 text-[9.5px] font-bold text-[#aab6cc]">
            Abrir ChatGPT
          </span>
        </div>
      </Card>

      <Card className="p-3">
        <p className="text-[10px] font-bold text-[#f5f7ff]">Resposta registrada no projeto</p>
        <div className="mt-2 flex gap-1.5">
          {['#0E1420', '#C9A227', '#00D4E8', '#F5F7FF', '#1B2430'].map((hex) => (
            <div
              key={hex}
              className="h-9 flex-1 rounded-md border border-white/10"
              style={{ background: hex }}
            />
          ))}
        </div>
        <span className="mt-2 inline-flex rounded-lg bg-[#00e599] px-3 py-1.5 text-[9.5px] font-extrabold text-[#04101f]">
          Salvar e Registrar Resposta do GPT
        </span>
      </Card>
    </div>
  );
}

function ScreenMestre() {
  return (
    <div className="space-y-3">
      <div>
        <Tag tone="green">Etapa central — construção do site</Tag>
        <p className="mt-2 text-[10.5px] leading-relaxed text-[#71809b]">
          O manual consolidou automaticamente todas as suas decisões (dados do negócio, serviços,
          diferenciais, textos, paleta cromática, tipografia e regras WCAG AA) no{' '}
          <strong className="text-[#f5f7ff]">Prompt Mestre Final de 25 seções</strong>.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { t: 'Copiar Prompt', d: 'Clique no botão verde abaixo', c: 'text-[#f5f7ff]' },
          { t: 'Anexar Imagens', d: 'Fotos preparadas na Etapa 04', c: 'text-[#f5f7ff]' },
          { t: 'Colar na IA = Site Pronto', d: 'Claude, Arena.ai, Manus ou AI Studio', c: 'text-[#00e599]' },
        ].map((s, i) => (
          <Card key={s.t} className="p-2.5">
            <span className="v2-mono text-[9px] font-bold text-[#00d4e8]">0{i + 1}</span>
            <p className={cn('mt-1 text-[10px] font-bold leading-tight', s.c)}>{s.t}</p>
            <p className="mt-0.5 text-[8.5px] leading-snug text-[#71809b]">{s.d}</p>
          </Card>
        ))}
      </div>

      <Card glow className="p-3">
        <p className="text-[10px] font-bold text-[#f5f7ff]">
          Prompt Mestre Final de 25 Seções (Consolidado)
        </p>
        <div className="v2-mono mt-2 space-y-1 rounded-lg border border-[#203252] bg-[#060b18] p-2.5 text-[8.5px] leading-relaxed text-[#71809b]">
          <p className="text-[#7df3ff]">CONTEXTO DO NEGÓCIO</p>
          <p>Nome: Studio Barba & Navalha · Nicho: Barbearia</p>
          <p className="text-[#203252]">------------------------------------------</p>
          <p className="text-[#7df3ff]">IDENTIDADE VISUAL</p>
          <p>primary #0E1420 · accent #C9A227 · cta #00D4E8</p>
          <p className="text-[#203252]">------------------------------------------</p>
          <p className="text-[#7df3ff]">SEÇÕES 01–25</p>
          <p>Hero · Serviços · Diferenciais · Sobre · FAQ · Contato...</p>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-[#00e599] px-3 py-1.5 text-[9.5px] font-extrabold text-[#04101f]">
            COPIAR PROMPT MESTRE FINAL
          </span>
          <span className="v2-mono text-[9px] text-[#71809b]">Expandir prompt completo (25 seções)</span>
        </div>
      </Card>

      <Card className="p-3">
        <p className="text-[10px] font-bold text-[#f5f7ff]">
          Como refinar o resultado na IA externa (se necessário)
        </p>
        <div className="mt-2 space-y-1.5 text-[9px] leading-snug">
          {[
            ['Ajustar espaçamento:', '“Aumente o espaçamento vertical da seção de serviços.”'],
            ['Ajustar botão:', '“Deixe o botão do WhatsApp fixo no rodapé em mobile.”'],
            ['Trocar ícone:', '“No card de corte de cabelo, utilize o ícone Scissors da Lucide.”'],
          ].map(([k, v]) => (
            <p key={k}>
              <strong className="text-[#00d4e8]">{k}</strong>{' '}
              <span className="text-[#71809b]">{v}</span>
            </p>
          ))}
        </div>
      </Card>
    </div>
  );
}

const SCREEN_MAP: Record<ScreenId, () => React.ReactElement> = {
  painel: ScreenPainel,
  projeto: ScreenProjeto,
  prompts: ScreenPrompts,
  identidade: ScreenIdentidade,
  mestre: ScreenMestre,
};

/* ------------------------------------------------------------------ */
/* Moldura do produto (sidebar + header reais)                         */
/* ------------------------------------------------------------------ */
export function AppMockup({ screen }: { screen: ScreenId }) {
  const Screen = SCREEN_MAP[screen];
  const activeGroup = screen === 'prompts' ? 'prompts' : screen === 'mestre' ? 'modulos' : 'painel';

  return (
    <div className="v2-app-frame overflow-hidden rounded-2xl">
      {/* Barra de título */}
      <div className="flex items-center gap-3 border-b border-[#203252] bg-[#0a1128] px-3.5 py-2.5">
        <WinDots />
        <div className="v2-mono ml-1 truncate rounded-md border border-[#203252] bg-[#060b18] px-2.5 py-1 text-[9px] text-[#71809b]">
          seusiteunico.com.br/dashboard
        </div>
        <span className="ml-auto hidden text-[9px] font-semibold text-[#71809b] sm:block">
          Área de membros (manual interativo)
        </span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-[168px] shrink-0 border-r border-[#203252] bg-[#080d20] p-2.5 sm:block">
          <div className="mb-3 flex items-center gap-1.5 rounded-lg border border-[#203252] bg-[#0e1938] px-2 py-1.5">
            <Search className="h-3 w-3 shrink-0 text-[#71809b]" aria-hidden="true" />
            <span className="text-[9px] text-[#71809b]">Buscar no manual...</span>
          </div>
          <SideItem active={activeGroup === 'painel'}>Painel Geral & Jornada</SideItem>
          <SideItem active={activeGroup === 'prompts'}>Central de Prompts</SideItem>
          <SideItem active={screen === 'projeto'}>Meu Projeto</SideItem>
          <SideItem active={screen === 'projeto'}>Briefing Mestre</SideItem>

          <GroupLabel>Módulos de Execução</GroupLabel>
          {MODULES.map((m) => (
            <SideItem
              key={m.n}
              badge={m.n}
              active={screen === 'mestre' && m.n === '05'}
              className={cn(screen === 'identidade' && m.n === '03' && 'bg-[#00d4e8]/12 text-[#7df3ff]')}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full border',
                    m.done ? 'border-[#00e599] bg-[#00e599]/70' : 'border-[#203252] bg-[#111b36]',
                  )}
                />
                {m.name}
              </span>
            </SideItem>
          ))}

          <GroupLabel>Publicação & Presença</GroupLabel>
          <SideItem>Registro & Hospedagem</SideItem>
          <SideItem>Fase 3: Ser Encontrado</SideItem>
          <SideItem>Plano Completo</SideItem>

          <div className="mt-4 rounded-lg border border-[#203252] bg-[#0b1535] p-2">
            <p className="text-[9px] font-semibold text-[#aab6cc]">Progresso Geral</p>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#152342]">
              <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,#00d4e8,#1769ff)]" />
            </div>
          </div>
        </aside>

        {/* Conteúdo */}
        <div className="min-w-0 flex-1 bg-[#080d20] p-3 sm:p-3.5">
          <div className="mb-3 flex items-center gap-2 border-b border-[#203252] pb-2.5 sm:hidden">
            <span className="rounded-md border border-[#203252] bg-[#111b36] px-1.5 py-1 text-[#aab6cc]">
              <Menu className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className="text-[10px] font-bold text-[#f5f7ff]">
              {SCREENS.find((s) => s.id === screen)?.label}
            </span>
          </div>
          <Screen />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Publicação: checklist + hospedagem + Fase 3                         */
/* ------------------------------------------------------------------ */
export function LaunchMockup() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Card className="p-3.5">
        <Tag tone="green">Etapa 06 · Revisão</Tag>
        <p className="mt-2 text-[12px] font-bold text-[#f5f7ff]">
          Checklist Obrigatório Antes de Publicar
        </p>
        <div className="mt-2.5 space-y-2">
          {CHECKLIST_GROUPS.map((g) => (
            <div key={g.label}>
              <div className="flex items-center justify-between text-[9.5px]">
                <span className="font-semibold text-[#aab6cc]">{g.label}</span>
                <span className="v2-mono text-[#71809b]">{g.items} itens</span>
              </div>
              <div className="mt-1 flex gap-1">
                {Array.from({ length: g.items }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full',
                      i < g.items - 1 ? 'bg-[#00e599]/70' : 'bg-[#152342]',
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-3.5">
        <Tag>Registro & Hospedagem</Tag>
        <p className="mt-2 text-[12px] font-bold text-[#f5f7ff]">Coloque o site no ar</p>
        <div className="mt-2.5 space-y-2 text-[9.5px] leading-snug">
          {[
            ['Netlify', 'Arrastar e soltar a pasta — link gratuito (.netlify.app)'],
            ['Vercel', 'Conectar via GitHub com deploy automático (.vercel.app)'],
            ['Hostinger', 'Domínio próprio (.com.br) + hospedagem + e-mail'],
            ['Já tenho domínio', 'Apontar DNS (Registro.br, GoDaddy ou similar)'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-[#203252] bg-[#0e1938] p-2">
              <p className="font-bold text-[#f5f7ff]">{t}</p>
              <p className="text-[#71809b]">{d}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-3.5">
        <Tag tone="amber">Fase 3 · Ser Encontrado</Tag>
        <p className="mt-2 text-[12px] font-bold text-[#f5f7ff]">Presença no Google</p>
        <div className="mt-2.5 space-y-2 text-[9.5px] leading-snug">
          {[
            ['1. SEO Local', 'Google Meu Negócio (Maps e buscas locais)'],
            ['2. Indexação Oficial', 'Google Search Console + envio do sitemap.xml'],
            ['3. Confiança Jurídica', 'LGPD, aviso de cookies e política de privacidade'],
            ['4. Bônus: Visitas', 'Google Analytics 4 (GA4) para medir acessos'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg border border-[#203252] bg-[#0e1938] p-2">
              <p className="font-bold text-[#f5f7ff]">{t}</p>
              <p className="text-[#71809b]">{d}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Prévia de site por nicho (demonstra adaptação do método)            */
/* ------------------------------------------------------------------ */
export interface NichePreviewData {
  id: string;
  name: string;
  domain: string;
  group: string;
  headline: string;
  services: string[];
  cta: string;
  colors: [string, string, string];
  tone: string;
}

export function NicheSiteCard({ niche }: { niche: NichePreviewData }) {
  const [bg, accent, text] = niche.colors;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1535] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-[#203252] bg-[#0a1128] px-3 py-2">
        <WinDots />
        <span className="v2-mono ml-1 truncate text-[9px] text-[#71809b]">
          {niche.domain}
        </span>
        <span className="ml-auto text-[8.5px] font-semibold uppercase tracking-wider text-[#71809b]">
          Prévia gerada pelo método
        </span>
      </div>

      <div className="relative p-5 sm:p-6" style={{ background: `linear-gradient(140deg, ${bg} 0%, #0a1020 100%)` }}>
        <div
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl"
          style={{ background: accent }}
          aria-hidden="true"
        />
        <span
          className="inline-flex rounded-full px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em]"
          style={{ background: `${accent}22`, color: accent }}
        >
          {niche.group}
        </span>
        <p className="mt-3 max-w-sm text-[17px] font-extrabold leading-tight sm:text-xl" style={{ color: text }}>
          {niche.headline}
        </p>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {niche.services.map((s) => (
            <span
              key={s}
              className="rounded-lg border px-2.5 py-1 text-[10px] font-semibold"
              style={{ borderColor: `${accent}44`, color: text, background: 'rgba(255,255,255,0.04)' }}
            >
              {s}
            </span>
          ))}
        </div>
        <span
          className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[11.5px] font-extrabold"
          style={{ background: accent, color: '#061018' }}
        >
          {niche.cta}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#203252] px-4 py-3">
        <div className="flex items-center gap-1.5">
          {niche.colors.map((c) => (
            <span
              key={c}
              className="h-4 w-4 rounded-full border border-white/15"
              style={{ background: c }}
            />
          ))}
          <span className="v2-mono ml-1 text-[9px] text-[#71809b]">sistema de cores do nicho</span>
        </div>
        <span className="hidden text-[9.5px] text-[#71809b] sm:block">{niche.tone}</span>
      </div>
    </div>
  );
}

