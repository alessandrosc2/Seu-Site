const fs = require('fs');

function updateImages(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<img\s+src="\/logo-site\.webp"/g, '<img width="160" height="40" src="/logo-site.webp"');
  // Handle multiline cases
  content = content.replace(/<img\s*\n\s*src="\/logo-site\.webp"/g, '<img width="160" height="40"\n              src="/logo-site.webp"');
  content = content.replace(/<img src="\/pagamentos\.webp"/g, '<img width="384" height="48" src="/pagamentos.webp"');
  fs.writeFileSync(filePath, content, 'utf8');
}

updateImages('src/App.tsx');
updateImages('src/components/ui/landing-page.tsx');
updateImages('src/components/pricing/CheckoutModal.tsx');
console.log('Images updated with width and height.');
