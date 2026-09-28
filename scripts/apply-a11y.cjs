const fs = require('fs');

// 1. landing-page.tsx
let lp = fs.readFileSync('src/components/ui/landing-page.tsx', 'utf8');

const regexH2 = /<h2 className=\{cn\([\s\S]*?\{section\.subtitle \? \(/m;
const replacementH1 = `{index === 0 ? (
                <h1 className={cn(
                  "font-bold tracking-tight mb-5 leading-[1.15] text-white",
                  "text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]"
                )}>
                  {section.subtitle ? (
                    <div className="space-y-2">
                      <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent block pb-1 leading-tight">
                        {section.title}
                      </span>
                      <span className="text-cyan-400 text-[0.55em] font-semibold tracking-wider uppercase block pb-1">
                        {section.subtitle}
                      </span>
                    </div>
                  ) : (
                    section.title
                  )}
                </h1>
              ) : (
                <h2 className={cn(
                  "font-bold tracking-tight mb-5 leading-[1.15] text-white",
                  "text-2xl sm:text-3xl md:text-4xl lg:text-[3rem]"
                )}>
                  {section.subtitle ? (`;

lp = lp.replace(regexH2, replacementH1);

// Mobile menu in landing-page.tsx
lp = lp.replace(
  '<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 sm:hidden text-slate-300 hover:text-white transition-colors">',
  '<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" className="p-2 sm:hidden text-slate-300 hover:text-white transition-colors">'
);

if (lp.includes('id="mobile-menu"')) {
  // already has id
} else {
  lp = lp.replace(
    '<div className={cn(\n          "fixed inset-0 z-40 bg-[#070d1e]/95 backdrop-blur-xl sm:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300"',
    '<div id="mobile-menu" className={cn(\n          "fixed inset-0 z-40 bg-[#070d1e]/95 backdrop-blur-xl sm:hidden flex flex-col items-center justify-center gap-8 transition-all duration-300"'
  );
}

fs.writeFileSync('src/components/ui/landing-page.tsx', lp, 'utf8');

// 2. PricingSection.tsx
let pricing = fs.readFileSync('src/components/pricing/PricingSection.tsx', 'utf8');
// remove extra wrapper id="pricing" if needed. wait, the user said <div id="pricing"> wrapping <section id="planos">.
pricing = pricing.replace('<section id="planos"', '<section id="pricing"');

pricing = pricing.replace(
  /<button\s+onClick=\{\(\) => setOpenFaq\(isOpen \? null : index\)\}\s+className="w-full/g,
  '<button onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`faq-content-${index}`} id={`faq-header-${index}`} className="w-full'
);

pricing = pricing.replace(
  /\{isOpen && \(\s+<div className="px-6 pb-6/g,
  '{isOpen && (\n                    <div id={`faq-content-${index}`} role="region" aria-labelledby={`faq-header-${index}`} className="px-6 pb-6'
);

fs.writeFileSync('src/components/pricing/PricingSection.tsx', pricing, 'utf8');

// 3. CheckoutModal.tsx
let checkout = fs.readFileSync('src/components/pricing/CheckoutModal.tsx', 'utf8');

checkout = checkout.replace(
  /<div className="relative w-full max-w-xl/g,
  '<div role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="relative w-full max-w-xl'
);
checkout = checkout.replace(
  /<h4 className="text-lg font-bold text-white">/g,
  '<h4 id="checkout-title" className="text-lg font-bold text-white">'
);
checkout = checkout.replace(
  /<input\s+type="text"\s+required\s+value=\{name\}/g,
  '<input id="checkout-name" name="name" autoComplete="name" type="text" required value={name}'
);
checkout = checkout.replace(
  /<label className="text-xs text-slate-400 mb-1 block">Nome Completo<\/label>/g,
  '<label htmlFor="checkout-name" className="text-xs text-slate-400 mb-1 block">Nome Completo</label>'
);
checkout = checkout.replace(
  /<input\s+type="email"\s+required\s+value=\{email\}/g,
  '<input id="checkout-email" name="email" autoComplete="email" type="email" required value={email}'
);
checkout = checkout.replace(
  /<label className="text-xs text-slate-400 mb-1 block">E-mail \(onde receberá o acesso\)<\/label>/g,
  '<label htmlFor="checkout-email" className="text-xs text-slate-400 mb-1 block">E-mail (onde receberá o acesso)</label>'
);
checkout = checkout.replace(
  /<input\s+type="tel"\s+value=\{phone\}/g,
  '<input id="checkout-phone" name="phone" autoComplete="tel" type="tel" value={phone}'
);
checkout = checkout.replace(
  /<label className="text-xs text-slate-400 mb-1 block">WhatsApp \(para suporte VIP\)<\/label>/g,
  '<label htmlFor="checkout-phone" className="text-xs text-slate-400 mb-1 block">WhatsApp (para suporte VIP)</label>'
);

// Focus and Esc key on CheckoutModal
if (!checkout.includes('useEffect(')) {
  checkout = checkout.replace('import React, { useState } from "react";', 'import React, { useState, useEffect, useRef } from "react";');
}

const hookToAdd = `
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
`;

checkout = checkout.replace('const [isLoading, setIsLoading] = useState(false);', 'const [isLoading, setIsLoading] = useState(false);\n' + hookToAdd);
checkout = checkout.replace('className="relative w-full max-w-xl', 'ref={modalRef} tabIndex={-1} className="relative w-full max-w-xl focus:outline-none');

fs.writeFileSync('src/components/pricing/CheckoutModal.tsx', checkout, 'utf8');

console.log('Applied a11y fixes');
