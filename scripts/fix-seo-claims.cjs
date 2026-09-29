const fs = require('fs');

function replaceInFile(path, replacements) {
    let content = fs.readFileSync(path, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    fs.writeFileSync(path, content, 'utf8');
}

replaceInFile('src/components/analytics/ConversionScienceSection.tsx', [
    ['O algoritmo entrega posts para menos de 5% da sua audiência, não permite instalar Google Analytics nem Pixel profundo para remarketing e pode banir sua conta sem aviso prévio.', 
     'Redes sociais tendem a limitar a distribuição orgânica, restringem métricas avançadas (como Google Analytics) e mantêm o negócio vulnerável a regras de terceiros.'],
    ['Dependência total de algoritmos instáveis', 
     'Exposição a mudanças de alcance não controladas pelo dono do negócio'],
    ['75% — Índice de Credibilidade de Stanford', 
     'O Valor da Credibilidade Visual'],
    ['Estudos da Universidade de Stanford revelam que 75% dos usuários julgam a idoneidade, seriedade e tamanho real da empresa exclusivamente pela estética e consistência do seu site.', 
     'Pesquisas de experiência do usuário indicam que a grande maioria das pessoas avalia a seriedade e a credibilidade de um negócio com base na estética e profissionalismo do seu site.'],
]);

replaceInFile('src/components/scrollytelling/WordRevealSection.tsx', [
    ['Mais de 50% das empresas brasileiras não têm site próprio. A maioria fica invisível no Google, deixando dinheiro na mesa.', 
     'Diversos pequenos negócios e autônomos não têm um site profissional ativo. Sem presença clara no Google, perdem contatos e deixam clientes na mesa.']
]);

replaceInFile('src/components/ui/landing-page.tsx', [
    ['Mais de 50% das empresas locais ainda não têm site. Use o mesmo método para oferecer criação de sites na sua cidade com propostas prontas e abordagem ética.', 
     'Muitos negócios locais ainda não possuem uma presença digital estruturada. Use o mesmo método para oferecer criação de sites na sua cidade de forma ética.']
]);

console.log("Replacements done.");
