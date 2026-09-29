const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const fontOriginal = '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">';

const fontDeferred = `
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" media="print" onload="this.media='all'" />
    <noscript>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" />
    </noscript>
`;

if (html.includes(fontOriginal)) {
  html = html.replace(fontOriginal, fontDeferred.trim());
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Fonts deferred successfully.');
} else {
  console.log('Font tag not found exactly as expected.');
}
