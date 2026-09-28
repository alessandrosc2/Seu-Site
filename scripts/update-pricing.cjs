const fs = require('fs');

let content = fs.readFileSync('api/create-preference.ts', 'utf8');

const regex = /const \{ email, name, planName, price, orderBumps \} = req\.body;[\s\S]*?currency_id: 'BRL',\n\s+\}\);\n\s+\}\n\s+\}/;

const replacement = `const { email, name, planKey, orderBumps } = req.body;
  
  const PLANS = {
    completo: { title: 'Plano Completo', price: 47.90 },
  };

  if (!planKey || !(planKey in PLANS)) {
    return res.status(400).json({ message: 'Invalid or missing planKey' });
  }

  const selectedPlan = PLANS[planKey as keyof typeof PLANS];
  
  // Prepare additional items if order bumps are selected
  const items = [
    {
      id: \`seu-site-unico-\${planKey}\`,
      title: selectedPlan.title,
      quantity: 1,
      unit_price: selectedPlan.price,
      currency_id: 'BRL',
    }
  ];

  if (orderBumps) {
    if (orderBumps.traffic) {
      items.push({
        id: 'bump-traffic',
        title: 'Guia de Tráfego: Primeiros Clientes',
        quantity: 1,
        unit_price: 9.90,
        currency_id: 'BRL',
      });
    }
    if (orderBumps.sales) {
      items.push({
        id: 'bump-sales',
        title: 'Roteiro de Vendas por WhatsApp',
        quantity: 1,
        unit_price: 9.90,
        currency_id: 'BRL',
      });
    }
  }`;

content = content.replace(regex, replacement);

fs.writeFileSync('api/create-preference.ts', content, 'utf8');
console.log('Fixed pricing in create-preference.ts');
