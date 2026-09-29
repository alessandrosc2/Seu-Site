const fs = require('fs');
let content = fs.readFileSync('src/components/ui/landing-page.tsx', 'utf8');
content = content.replace(/title: "Crie um Site Profissional para o Seu Negócio",`n\s*subtitle: "Construção Guiada com Inteligência Artificial",/, 'title: "Crie um Site Profissional para o Seu Negócio",\n      subtitle: "Construção Guiada com Inteligência Artificial",');
fs.writeFileSync('src/components/ui/landing-page.tsx', content, 'utf8');
console.log('Fixed H1 syntax');
