const fs = require('fs');
let content = fs.readFileSync('src/components/pricing/PricingSection.tsx', 'utf8');

content = content.replace(
  "import { CheckoutModal } from './CheckoutModal';",
  "import { Suspense, lazy } from 'react';\nconst CheckoutModal = lazy(() => import('./CheckoutModal').then(module => ({ default: module.CheckoutModal })));"
);

content = content.replace(
  "<CheckoutModal\n            isOpen={!!activeCheckout}\n            onClose={() => setActiveCheckout(null)}\n            planKey={activeCheckout.planKey}\n            \n          />",
  "<Suspense fallback={null}>\n          <CheckoutModal\n            isOpen={!!activeCheckout}\n            onClose={() => setActiveCheckout(null)}\n            planKey={activeCheckout.planKey}\n          />\n        </Suspense>"
);

fs.writeFileSync('src/components/pricing/PricingSection.tsx', content, 'utf8');
