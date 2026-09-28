const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `      <PricingSection />

      {/* Modern Footer */}`;

content = content.replace(/<PricingSection \/>\s*<\/div>\s*\{\/\* Modern Footer \*\/\}/g, replacement);

fs.writeFileSync('src/App.tsx', content, 'utf8');
