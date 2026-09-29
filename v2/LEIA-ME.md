# Pasta `v2/` — pacote da Landing V2 (Seu Site Único)

Esta pasta guarda, **isolada do restante do projeto**, tudo que compõe a nova landing
page V2 (rota `/v2`). Ela é apenas armazenamento/documentação: o app em produção não
lê nada daqui. A versão ativa e integrada da V2 vive em `src/components/v2/` na branch
`feat/landing-v2` (commit `17b2628`).

## Conteúdo

| Caminho | O que é |
| --- | --- |
| `components/*.tsx` (9 arquivos) | Componentes da V2: `LandingV2` (composição), `Hero`, `StoryA`, `Method`, `Value`, `Offer`, `Close`, `Mockups`, `primitives` |
| `components/v2.css` | Tokens, animações e estilos exclusivos da V2 |
| `preview-estatico.html` | Réplica da V2 em **HTML/CSS puros, zero JavaScript** — abre em qualquer lugar (útil para viewers que bloqueiam scripts). O botão de oferta dela aponta para o site publicado |
| `LEIA-ME.md` | Este arquivo |

## Como integrar no app (passo a passo)

1. **Componentes:** copie o conteúdo de `v2/components/` para `src/components/v2/`
   (crie a pasta se não existir). Os imports internos são relativos (`./primitives`,
   `./v2.css`), então a pasta funciona como um bloco só.
2. **Rota:** em `src/main.tsx`, adicione uma rota lazy (adição de ~5 linhas, nada é
   removido):

   ```tsx
   const LandingV2 = lazy(() => import("./components/v2/LandingV2"));
   // dentro do <Routes>:
   <Route path="/v2" element={<Suspense fallback={null}><LandingV2 /></Suspense>} />
   ```

3. **Sitemap:** acrescente em `public/sitemap.xml`:

   ```xml
   <url><loc>https://seusite-unico.vercel.app/v2</loc></url>
   ```

4. **Hosts de preview (opcional):** em `vite.config.ts`, `server.allowedHosts` (dev) e
   `preview.allowedHosts` podem ser liberados conforme o ambiente de preview usado.

A V2 reusa **sem modificar** o `src/components/pricing/CheckoutModal.tsx` existente
(checkout Mercado Pago), as fontes e os tokens do projeto.

## Avisos importantes

- **Não renomeie `preview-estatico.html` para `index.html` dentro desta pasta.** Um
  `index.html` físico em `v2/` sombrearia a rota `/v2` no deploy da Vercel (arquivos
  estáticos têm precedência sobre os rewrites do `vercel.json`) e quebraria a V2
  publicada.
- A landing V1 (raiz `/`) **não foi alterada em nada** para existir a V2; todo o trabalho
  é aditivo.
- Analytics: a V2 emite `v2_page_view` e `v2_cta_click`, permitindo comparativo A/B com
  a V1 sem tocar nos eventos existentes.

## Regras comerciais respeitadas no copy da V2

- Produto posicionado como **método guiado** (não é coleção de prompts, gerador
  automático, agência, curso de programação ou loja virtual).
- Oferta: **R$ 47,90, pagamento único**; garantia real de **7 dias** (CDC, art. 49),
  presente na Política de Reembolso.
- **Sem** depoimentos, clientes, contagem regressiva, escassez ou bônus inventados.
- **Sem promessa de renda**: o ângulo de renda extra aparece só depois do produto
  principal, como possibilidade.
- Estatísticas exibidas (e únicas): **84%** (pesquisa Verisign, credibilidade de site
  próprio), **79%** (PwC/Exame, brasileiros pesquisam antes de comprar) e **46,1%**
  (Stanford Web Credibility Project, design visual na avaliação de credibilidade) —
  todas com fonte pública linkada na própria página.

## Pré-requisitos de qualidade já validados

Um único `<h1>`, HTML semântico, foco visível, contraste AA nos textos principais,
`prefers-reduced-motion` respeitado, sem scroll horizontal em ≥390px, build de produção
sem erros (`npm run build`) e chunk da V2 carregado sob demanda (~32 kB gzip).
