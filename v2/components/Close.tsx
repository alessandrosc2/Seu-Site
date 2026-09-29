/**
 * V2 — Objeções, oferta, garantia, FAQ, CTA final e rodapé.
 */
import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChapterNumber, CtaButton, Eyebrow, Reveal, track, useV2 } from './primitives';

/* ------------------------------------------------------------------ */
/* 13 — Objeções reais                                                 */
/* ------------------------------------------------------------------ */
const OBJECTIONS = [
  {
    q: '“Não entendo nada de programação.”',
    a: 'O método foi desenhado justamente para quem não é programador. Você informa, decide e copia prompts; a ferramenta de IA executa a parte técnica.',
  },
  {
    q: '“Eu já tenho Instagram.”',
    a: 'Ótimo — continue usando. O site complementa a sua presença digital: é o lugar que apresenta o negócio por completo e pode ser encontrado no Google.',
  },
  {
    q: '“A IA já cria sites sozinha.”',
    a: 'Ela cria. O diferencial está em saber o que fornecer, em qual ordem, como orientar a geração e como avaliar o resultado antes de publicar.',
  },
  {
    q: '“Não sei o que colocar no meu site.”',
    a: 'Essa é a primeira etapa do manual: um formulário guiado organiza nome, serviços, diferenciais, público, contatos, horário e objetivo do site.',
  },
  {
    q: '“Preciso contratar alguém?”',
    a: 'O objetivo é que você conduza o processo usando IA e ferramentas acessíveis, inclusive opções gratuitas de publicação. Se surgir algo muito específico do seu caso, aí sim pode ser útil um apoio pontual.',
  },
  {
    q: '“E se eu já tiver um site antigo?”',
    a: 'O método serve para reestruturar: você refaz posicionamento, conteúdo, identidade visual e presença no Google — e gera uma versão nova do site.',
  },
];

export function ObjectionsSection() {
  return (
    <section id="objecoes" className="relative border-y border-white/[0.07] bg-[#070c1c] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <ChapterNumber value="11 — O QUE COSTUMA PASSAR PELA CABEÇA" />
            <h2 className="v2-display mt-4 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
              As dúvidas de quem está decidido a resolver isso.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OBJECTIONS.map((o, i) => (
            <Reveal key={o.q} delay={(i % 3) * 70}>
              <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-cyan-400/25">
                <h3 className="text-[15px] font-extrabold leading-snug text-white">{o.q}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{o.a}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 14 — Oferta + garantia                                              */
/* ------------------------------------------------------------------ */
const OFFER_ITEMS = [
  ['Fase 1 — Construir', 'Briefing Mestre, conteúdo, identidade visual, imagens e Prompt Mestre Final'],
  ['Fase 2 — Publicar', 'Domínio próprio, hospedagem, HTTPS e botão de WhatsApp estratégico'],
  ['Fase 3 — Ser Encontrado', 'SEO local, Perfil da Empresa no Google, Search Console, LGPD'],
  ['Bônus 01 — Google Analytics', 'Instalação e leitura do GA4 para acompanhar acessos e conversões'],
  ['Bônus 02 — Extensão de vendas', 'Recursos complementares de checkout para o seu site'],
  ['Trilha Plano Completo', 'Módulos e scripts comerciais para criar sites para outros negócios'],
  ['Central de Prompts', 'Comandos por categoria, com objetivo, quando usar e IA recomendada'],
  ['Progresso e checklist', 'Jornada salva na sua conta + revisão pré-lançamento'],
  ['Suporte no WhatsApp', 'Canal direto para dúvidas sobre o método'],
];

export function OfferSection() {
  return (
    <section id="oferta" className="relative py-20 sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,212,232,0.14),transparent)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Acesso imediato
            </Eyebrow>
            <h2 className="v2-display mt-5 text-[27px] font-bold leading-[1.14] text-white sm:text-[36px]">
              Tudo isso por um valor único.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
              Sem mensalidade, sem renovação, sem taxa por site criado.
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-[28px] border border-cyan-400/35 bg-[linear-gradient(165deg,#0b1a33_0%,#070c1c_70%)] p-6 shadow-[0_0_80px_-24px_rgba(0,212,232,0.55)] sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                  Seu Site Único
                </p>
                <h3 className="v2-display mt-2 text-[24px] font-bold text-white sm:text-[30px]">
                  Acesso completo ao manual interativo
                </h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#060b18] px-5 py-3 text-right">
                <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">
                  Pagamento único
                </p>
                <p className="v2-display mt-1 text-[34px] font-bold leading-none text-white">
                  R$ 47<span className="text-[20px]">,90</span>
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {OFFER_ITEMS.map(([title, desc]) => (
                <li
                  key={title}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3"
                >
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-[13px] leading-snug text-slate-200">
                    <strong className="font-bold text-white">{title}:</strong> {desc}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-3">
              <CtaButton source="oferta" className="w-full sm:w-auto sm:px-10">
                Quero criar meu site
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CtaButton>
              <p className="text-[13px] font-semibold text-slate-300">
                Acesso por R$ 47,90 — pagamento único.
              </p>
              <p className="flex items-center gap-1.5 text-[12px] text-slate-400">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Checkout seguro via Mercado Pago · liberação imediata do acesso
              </p>
            </div>
          </div>
        </Reveal>

        {/* Garantia real (Política de Reembolso do produto) */}
        <Reveal delay={60}>
          <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.05] p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[17px] font-extrabold text-white">Garantia de 7 dias</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-300">
                  Pelo Artigo 49 do Código de Defesa do Consumidor, você tem 7 dias corridos a partir
                  da liberação do acesso para solicitar a devolução de 100% do valor, sem burocracia.
                  O pedido é feito pelo e-mail de suporte ou pelo WhatsApp oficial e o reembolso é
                  processado pela mesma plataforma do pagamento (Mercado Pago).
                </p>
                <Link
                  to="/politica-de-reembolso"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-emerald-200"
                >
                  Ler a política de reembolso completa
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Saída alternativa real (já praticada no projeto) */}
        <Reveal delay={60}>
          <div className="mx-auto mt-4 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-5 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <p className="text-[14px] font-bold text-white">Prefere que alguém faça por você?</p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
                Existe também o serviço de criação sob demanda, a partir de R$ 200 conforme o tamanho
                do projeto. O foco desta página, porém, é você criar o seu próprio site.
              </p>
            </div>
            <a
              href="https://wa.me/5583993595124?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20voc%C3%AA%20criar%20o%20site%20do%20meu%20neg%C3%B3cio."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('v2_whatsapp_click', { location: 'oferta' })}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-[13px] font-bold text-emerald-200 transition-colors hover:bg-emerald-400/20"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Pedir orçamento
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 15 — FAQ                                                            */
/* ------------------------------------------------------------------ */
export const FAQ_ITEMS = [
  {
    q: 'Preciso saber programação?',
    a: 'Não. O método foi construído para quem não programa: você informa os dados do negócio, revisa conteúdo, define identidade visual e copia os prompts. A ferramenta de IA gera o site.',
  },
  {
    q: 'O método serve para qualquer tipo de negócio?',
    a: 'Sim, para sites institucionais e de apresentação: prestadores de serviço, clínicas, escritórios, barbearias, salões, restaurantes, academias, imobiliárias, autônomos e profissionais liberais. O briefing se adapta ao seu segmento. Não é um método focado em lojas virtuais, carrinho ou checkout de e-commerce.',
  },
  {
    q: 'Posso usar IA para criar meu site?',
    a: 'É exatamente assim que funciona. O manual indica as ferramentas para cada etapa — ChatGPT, Claude, Gemini, Bolt.new, Google AI Studio, Leonardo.ai, Ideogram, Midjourney, entre outras — e mostra o que colar em cada uma.',
  },
  {
    q: 'Preciso contratar um programador?',
    a: 'O objetivo é que você conduza todo o processo sozinho, usando IA e ferramentas acessíveis (há opções gratuitas de publicação). Se aparecer uma necessidade muito específica do seu negócio, um apoio pontual pode ser útil.',
  },
  {
    q: 'Posso usar meu próprio domínio?',
    a: 'Sim. Existe um guia de registro de domínio (.com.br no Registro.br, por exemplo) e de apontamento para Netlify, Vercel ou Hostinger. O valor do domínio e da hospedagem não está incluído no acesso.',
  },
  {
    q: 'O método serve para quem já tem um site?',
    a: 'Serve. Você pode usá-lo para reestruturar posicionamento, conteúdo, identidade visual, imagens e presença no Google — e gerar uma versão nova e profissional do seu site.',
  },
  {
    q: 'É um curso?',
    a: 'Não é um curso tradicional em vídeo. É um manual interativo: você abre a área de membros, preenche o seu projeto, segue as etapas e usa os prompts. O progresso fica salvo na sua conta.',
  },
  {
    q: 'É um gerador automático de sites?',
    a: 'Não. A geração acontece em ferramentas de IA externas, seguindo as instruções do método. O produto organiza as decisões, o conteúdo, a identidade visual e a sequência de execução até a publicação.',
  },
  {
    q: 'Posso criar sites para clientes?',
    a: 'Pode. O acesso inclui uma trilha adicional (Plano Completo) com módulos e scripts comerciais para quem quiser oferecer criação de sites a outros negócios. Não há qualquer promessa de ganhos: o resultado depende da sua execução.',
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal>
            <Eyebrow tone="slate">Perguntas frequentes</Eyebrow>
            <h2 className="v2-display mt-5 text-[26px] font-bold leading-[1.15] text-white sm:text-[34px]">
              Respostas diretas, sem rodeios.
            </h2>
          </Reveal>
        </div>

        <div className="mt-11 space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={Math.min(i, 4) * 45}>
                <div
                  className={cn(
                    'overflow-hidden rounded-2xl border transition-colors duration-300',
                    isOpen
                      ? 'border-cyan-400/35 bg-[#0b1535]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20',
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={`v2-faq-h-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`v2-faq-p-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="text-[14.5px] font-bold leading-snug text-white sm:text-[15.5px]">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 shrink-0 text-cyan-400 transition-transform duration-300',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {isOpen ? (
                    <div
                      id={`v2-faq-p-${i}`}
                      role="region"
                      aria-labelledby={`v2-faq-h-${i}`}
                      className="border-t border-white/[0.07] px-5 py-4 sm:px-6 sm:py-5"
                    >
                      <p className="text-[13.5px] leading-relaxed text-slate-300 sm:text-[14.5px]">
                        {item.a}
                      </p>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 16 — CTA final                                                      */
/* ------------------------------------------------------------------ */
export function FinalCtaSection() {
  const { openCheckout } = useV2();

  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] bg-[#060a16] py-20 sm:py-28">
      <div className="v2-grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute bottom-[-160px] left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(23,105,255,0.22),transparent)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="v2-display text-[28px] font-bold leading-[1.12] text-white sm:text-[40px]">
            Seu negócio já existe.
          </h2>
          <p className="v2-display mt-2 text-[24px] font-bold leading-[1.16] sm:text-[34px]">
            <span className="v2-gradient-text">Agora dê a ele uma presença digital à altura.</span>
          </p>
        </Reveal>

        <Reveal delay={90}>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-[16.5px]">
            Aprenda a criar seu próprio site profissional com IA, seguindo um método organizado e
            passo a passo — do briefing à publicação no Google.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-9 flex flex-col items-center gap-4">
            <CtaButton source="cta_final" className="px-9 py-4 text-base">
              Quero criar meu site
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
            <p className="text-[13.5px] font-semibold text-slate-300">
              Acesso por R$ 47,90 — pagamento único.
            </p>
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/80" aria-hidden="true" />
                Garantia de 7 dias
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Pagamento seguro
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400/80" aria-hidden="true" />
                Acesso imediato
              </span>
            </p>
            <button
              type="button"
              onClick={() => openCheckout('cta_final_secondary')}
              className="mt-1 text-[12.5px] font-semibold text-slate-400 underline decoration-dotted underline-offset-4 transition-colors hover:text-cyan-300 cursor-pointer"
            >
              Ainda em dúvida? Comece pelo acesso — você tem 7 dias para decidir
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Rodapé da V2                                                        */
/* ------------------------------------------------------------------ */
export function V2Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#050814] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-white/[0.06] pb-9 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <img src="/logo-site.webp" width="44" height="44" alt="" className="h-11 w-11 object-contain" />
              <span className="text-[19px] font-extrabold tracking-tight text-white">
                Seu Site <span className="text-cyan-400">Único</span>
              </span>
            </div>
            <p className="mt-3.5 text-[13.5px] leading-relaxed text-slate-400">
              Manual interativo e método guiado para pequenos negócios, prestadores de serviço e
              profissionais liberais criarem um site profissional com apoio de inteligência
              artificial.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-[13px] sm:grid-cols-3" aria-label="Links do rodapé">
            <Link to="/termos-de-uso" className="text-slate-300 transition-colors hover:text-cyan-300">
              Termos de Uso
            </Link>
            <Link to="/politica-de-privacidade" className="text-slate-300 transition-colors hover:text-cyan-300">
              Privacidade (LGPD)
            </Link>
            <Link to="/politica-de-reembolso" className="text-slate-300 transition-colors hover:text-cyan-300">
              Reembolso e Garantia
            </Link>
            <Link to="/login" className="text-slate-300 transition-colors hover:text-cyan-300">
              Área de membros
            </Link>
            <a href="/" className="text-slate-300 transition-colors hover:text-cyan-300">
              Versão clássica da página
            </a>
            <a
              href="https://wa.me/5583993595124?text=Ol%C3%A1!%20Tenho%20d%C3%BAvidas%20sobre%20o%20Seu%20Site%20%C3%9Anico."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('v2_whatsapp_click', { location: 'footer' })}
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-300 transition-colors hover:text-emerald-200"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Suporte
            </a>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-[12px] text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Seu Site Único. Todos os direitos reservados.</p>
          <div className="flex flex-col items-center gap-3 sm:items-end">
            <img
              src="/pagamentos.webp"
              width="384"
              height="48"
              alt="Formas de pagamento aceitas: Pix, cartão de crédito e boleto via Mercado Pago"
              className="h-auto w-56 object-contain opacity-85 sm:w-72"
              loading="lazy"
            />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-500/70" aria-hidden="true" />
              Compra segura · acesso imediato
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
