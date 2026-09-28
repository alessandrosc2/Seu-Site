const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldBlock = `<div className="flex items-center gap-2 text-slate-500">
              <ShieldCheck className="w-4 h-4 text-cyan-500/60" />
              <span>Compra 100% Segura • Acesso Imediato</span>
            </div>`;

const newBlock = `<div className="flex flex-col items-center sm:items-end gap-4">
              <img src="/pagamentos.png" alt="Formas de Pagamento Aceitas" className="h-10 sm:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="w-4 h-4 text-cyan-500/60" />
                <span>Compra 100% Segura • Acesso Imediato</span>
              </div>
            </div>`;

// Note: I have to be careful with the exact string replacement because of the dot character '•' vs '  ' if it was encoded differently.
// Let's use a regex that matches the div containing the ShieldCheck.
const regex = /<div className="flex items-center gap-2 text-slate-500">[\s\S]*?<\/div>/;

content = content.replace(regex, newBlock);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Image added to footer.');
