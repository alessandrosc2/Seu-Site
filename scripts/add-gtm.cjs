const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const headGTM = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KCQXRGVZ');</script>
    <!-- End Google Tag Manager -->`;

const bodyGTM = `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KCQXRGVZ"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`;

// Inserir GTM no head
html = html.replace('<head>', '<head>\n' + headGTM);

// Inserir GTM no body
const bodyRegex = /<body[^>]*>/;
const bodyMatch = html.match(bodyRegex);

if (bodyMatch) {
  html = html.replace(bodyMatch[0], bodyMatch[0] + '\n' + bodyGTM);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('GTM added successfully.');
