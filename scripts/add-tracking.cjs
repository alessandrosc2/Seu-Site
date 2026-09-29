const fs = require('fs');

// 1. CheckoutModal
let checkout = fs.readFileSync('src/components/pricing/CheckoutModal.tsx', 'utf8');

const beginCheckoutEffect = `
  useEffect(() => {
    if (isOpen && planKey && PLANS[planKey]) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          currency: 'BRL',
          value: PLANS[planKey].price,
          items: [{
            item_id: planKey,
            item_name: PLANS[planKey].title,
            price: PLANS[planKey].price,
            quantity: 1
          }]
        }
      });
    }
  }, [isOpen, planKey]);
`;

if (!checkout.includes("event: 'begin_checkout'")) {
  checkout = checkout.replace(
    "const modalRef = useRef<HTMLDivElement>(null);",
    "const modalRef = useRef<HTMLDivElement>(null);\n" + beginCheckoutEffect
  );
  fs.writeFileSync('src/components/pricing/CheckoutModal.tsx', checkout, 'utf8');
}

// 2. App.tsx
let appStr = fs.readFileSync('src/App.tsx', 'utf8');
if (!appStr.includes("whatsapp_click")) {
  appStr = appStr.replace(
    /rel="noopener noreferrer"[\s\n]+className="inline-flex items-center/g,
    'rel="noopener noreferrer"\n                  onClick={() => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: \'whatsapp_click\', location: \'footer\' }); }}\n                  className="inline-flex items-center'
  );
  fs.writeFileSync('src/App.tsx', appStr, 'utf8');
}

// 3. PricingSection.tsx
let pricing = fs.readFileSync('src/components/pricing/PricingSection.tsx', 'utf8');
if (!pricing.includes("whatsapp_click")) {
  pricing = pricing.replace(
    /rel="noopener noreferrer"[\s\n]+className="inline-flex items-center/g,
    'rel="noopener noreferrer"\n                onClick={() => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: \'whatsapp_click\', location: \'pricing_section\' }); }}\n                className="inline-flex items-center'
  );
  fs.writeFileSync('src/components/pricing/PricingSection.tsx', pricing, 'utf8');
}

console.log("Tracking added.");
