const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const schemaRegex = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/;
const match = html.match(schemaRegex);

if (match) {
  const schemaObj = JSON.parse(match[1]);
  
  // Ensure we don't duplicate
  const hasOrg = schemaObj['@graph'].some(item => item['@type'] === 'Organization');
  const hasWebSite = schemaObj['@graph'].some(item => item['@type'] === 'WebSite');

  if (!hasOrg) {
    schemaObj['@graph'].push({
      "@type": "Organization",
      "@id": "https://seusite-unico.vercel.app/#organization",
      "name": "Seu Site Único",
      "url": "https://seusite-unico.vercel.app/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://seusite-unico.vercel.app/logo-site.webp",
        "width": 120,
        "height": 120
      }
    });
  }

  if (!hasWebSite) {
    schemaObj['@graph'].push({
      "@type": "WebSite",
      "@id": "https://seusite-unico.vercel.app/#website",
      "url": "https://seusite-unico.vercel.app/",
      "name": "Seu Site Único",
      "publisher": {
        "@id": "https://seusite-unico.vercel.app/#organization"
      },
      "inLanguage": "pt-BR"
    });
  }

  // Update Product to ensure it is robust (e.g. adding Brand linking to Organization)
  const product = schemaObj['@graph'].find(item => item['@type'] === 'Product');
  if (product && !product.brand) {
    product.brand = {
      "@type": "Brand",
      "name": "Seu Site Único"
    };
  }

  const newSchemaStr = JSON.stringify(schemaObj, null, 2);
  html = html.replace(match[0], `<script type="application/ld+json">\n${newSchemaStr}\n</script>`);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log("Schema updated successfully");
} else {
  console.log("Schema not found");
}
