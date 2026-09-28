const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const headEndIndex = html.indexOf('</head>');

const newMeta = `
    <meta property="og:image" content="https://seusite-unico.vercel.app/og-image.png" />
    <meta property="og:url" content="https://seusite-unico.vercel.app/" />
    <meta property="og:locale" content="pt_BR" />
    <meta name="twitter:image" content="https://seusite-unico.vercel.app/og-image.png" />
    <link rel="canonical" href="https://seusite-unico.vercel.app/" />
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "name": "Manual Seu Site Único",
          "description": "Método guiado com Inteligência Artificial para pequenos negócios e renda extra com criação de sites profissionais.",
          "image": "https://seusite-unico.vercel.app/og-image.png",
          "offers": {
            "@type": "Offer",
            "price": "47.90",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock",
            "url": "https://seusite-unico.vercel.app/"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Preciso saber programar ou ter experiência técnica?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Não! O manual foi desenhado passo a passo com prompts prontos. Você apenas preenche o Briefing Mestre e cola as instruções nas ferramentas de IA indicadas."
              }
            },
            {
              "@type": "Question",
              "name": "Domínio e hospedagem já estão inclusos no valor?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "O manual ensina como registrar o domínio oficial (.com.br por cerca de R$ 40/ano no Registro.br) e usar opções de publicação gratuitas ou de baixíssimo custo. O valor do manual cobre todo o método e prompts."
              }
            },
            {
              "@type": "Question",
              "name": "Funciona para qualquer tipo de negócio ou serviço?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim! O Briefing Mestre é flexível para prestadores de serviços, lojas locais, autônomos, consultórios, advogados, restaurantes e profissionais liberais."
              }
            },
            {
              "@type": "Question",
              "name": "E se eu já tiver Instagram e WhatsApp ativos?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Excelente! O site não substitui suas redes, ele se conecta a elas para direcionar o tráfego do Google direto para o seu WhatsApp de atendimento."
              }
            }
          ]
        }
      ]
    }
    </script>
`;

html = html.substring(0, headEndIndex) + newMeta + html.substring(headEndIndex);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html');
