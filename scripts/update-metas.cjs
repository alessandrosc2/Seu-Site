const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace title
html = html.replace(/<title>.*?<\/title>/, '<title>Criação de Sites Profissionais com IA | Seu Site Único</title>');

// Replace meta description
html = html.replace(/<meta name="description" content=".*?" \/>/, '<meta name="description" content="Aprenda a criar um site profissional para seu negócio ou serviços usando ferramentas de Inteligência Artificial. Um método passo a passo para sua presença digital." />');

// Replace og:title
html = html.replace(/<meta property="og:title" content=".*?" \/>/, '<meta property="og:title" content="Criação de Sites Profissionais com IA | Seu Site Único" />');

// Replace og:description
html = html.replace(/<meta property="og:description" content=".*?" \/>/, '<meta property="og:description" content="Aprenda a criar um site profissional para seu negócio ou serviços usando ferramentas de Inteligência Artificial. Um método passo a passo para sua presença digital." />');

// Replace twitter:title
html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, '<meta name="twitter:title" content="Criação de Sites Profissionais com IA | Seu Site Único" />');

// Replace twitter:description
html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, '<meta name="twitter:description" content="Aprenda a criar um site profissional para seu negócio ou serviços usando ferramentas de Inteligência Artificial. Um método passo a passo para sua presença digital." />');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Index metas updated.");
