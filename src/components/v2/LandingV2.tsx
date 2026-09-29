/**
 * ============================================================
 *  LANDING PAGE V2 — Seu Site Único
 * ------------------------------------------------------------
 *  Rota: /v2  (registrada em src/main.tsx como rota lazy)
 *
 *  A landing original (src/App.tsx + src/components/*) permanece
 *  intacta. Este arquivo e a pasta src/components/v2/ são 100%
 *  aditivos e não são importados por nenhuma outra rota.
 *
 *  O checkout reutiliza o CheckoutModal já existente do projeto
 *  (Mercado Pago + lead no Firestore + dataLayer/GTM/Meta Pixel).
 * ============================================================
 */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Toaster } from 'sonner';

import { track, V2Provider } from './primitives';
import { StickyCtaBar, V2Header, V2Hero } from './Hero';
import { ProblemSection, PromptGapSection } from './StoryA';
import { MethodSection, ProductDemoSection } from './Method';
import { BenefitsSection, StatsSection, TransformationSection } from './Value';
import { ChannelsSection, ExtraIncomeSection, IncludedSection, NichesSection, NoCodeSection } from './Offer';
import { FaqSection, FAQ_ITEMS, FinalCtaSection, ObjectionsSection, OfferSection, V2Footer } from './Close';

import './v2.css';

const CheckoutModal = lazy(() =>
  import('@/components/pricing/CheckoutModal').then((m) => ({ default: m.CheckoutModal })),
);

const V2_TITLE =
  'Seu negócio merece uma presença digital profissional | Seu Site Único';
const V2_DESCRIPTION =
  'Método guiado e manual interativo para criar o site profissional do seu negócio com IA — sem saber programar. Do briefing à publicação no Google. Acesso por R$ 47,90, pagamento único.';

export default function LandingV2() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  /* Começa sempre no topo da página */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* SEO da V2: meta tags dinâmicas (a V1 continua com as suas, no index.html) */
  useEffect(() => {
    const origin = window.location.origin;
    const url = `${origin}/v2`;

    const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    document.title = V2_TITLE;
    setMeta('meta[name="description"]', 'name', 'description', V2_DESCRIPTION);
    setMeta('meta[property="og:title"]', 'property', 'og:title', V2_TITLE);
    setMeta('meta[property="og:description"]', 'property', 'og:description', V2_DESCRIPTION);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'pt_BR');
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', V2_TITLE);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', V2_DESCRIPTION);
    setLink('canonical', url);

    track('v2_page_view', { page: '/v2' });
  }, []);

  /* Dados estruturados: FAQ real da V2 (removido ao sair da rota) */
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.v2 = 'faq';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  const openCheckout = (source: string) => {
    track('v2_cta_click', { location: source });
    setCheckoutOpen(true);
  };

  return (
    <V2Provider value={{ openCheckout }}>
      <div className="v2-root min-h-screen w-full overflow-x-hidden bg-[#060b18] text-slate-100 selection:bg-cyan-400 selection:text-[#04101f]">
        <Toaster position="top-right" richColors theme="dark" />

        <a
          href="#v2-conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#04101f]"
        >
          Ir para o conteúdo
        </a>

        <V2Header />

        <main id="v2-conteudo">
          {/* 1. Primeira impressão */}
          <V2Hero />

          {/* 2. O problema + por que pedir "crie um site" não resolve */}
          <ProblemSection />
          <PromptGapSection />

          {/* 3. O método + demonstração real do produto */}
          <MethodSection />
          <ProductDemoSection />

          {/* 4. Dados, benefícios e transformação */}
          <StatsSection />
          <BenefitsSection />
          <TransformationSection />

          {/* 5. Adaptação, ecossistema de canais e a objeção técnica */}
          <NichesSection />
          <ChannelsSection />
          <NoCodeSection />

          {/* 6. Valor, possibilidade adicional e objeções */}
          <IncludedSection />
          <ExtraIncomeSection />
          <ObjectionsSection />

          {/* 7. Oferta, garantia, FAQ e ação final */}
          <OfferSection />
          <FaqSection />
          <FinalCtaSection />
        </main>

        <V2Footer />
        <StickyCtaBar />

        {/* Reaproveita o checkout existente do projeto (Mercado Pago) */}
        {checkoutOpen ? (
          <Suspense fallback={null}>
            <CheckoutModal
              isOpen={checkoutOpen}
              onClose={() => setCheckoutOpen(false)}
              planKey="completo"
            />
          </Suspense>
        ) : null}
      </div>
    </V2Provider>
  );
}
