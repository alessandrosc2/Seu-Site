const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newTags = `
    <meta property="og:site_name" content="Seu Site Único" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Seu Site Único - Método Guiado com Inteligência Artificial" />
    <meta name="twitter:title" content="Seu Site Único | Método Guiado com IA" />
    <meta name="twitter:description" content="Método guiado com Inteligência Artificial para pequenos negócios e renda extra com criação de sites profissionais." />
    <meta name="twitter:image:alt" content="Seu Site Único - Método Guiado com Inteligência Artificial" />
    <meta name="robots" content="index, follow" />
`;

html = html.replace('</head>', newTags + '</head>');
fs.writeFileSync('index.html', html, 'utf8');
