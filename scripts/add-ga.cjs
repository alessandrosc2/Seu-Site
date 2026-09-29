const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const gaScript = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-55VZ8HJ0HV"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-55VZ8HJ0HV');
    </script>
`;

html = html.replace('<head>', '<head>' + gaScript);
fs.writeFileSync('index.html', html, 'utf8');
console.log("GA added successfully.");
