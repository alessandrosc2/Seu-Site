const fs = require('fs');

let file = fs.readFileSync('src/components/ui/interactive-selector.tsx', 'utf8');

// Add Keyboard Handler
const handlerCode = `
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      newIndex = (index + 1) % options.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      newIndex = (index - 1 + options.length) % options.length;
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      handleOptionClick(index);
      e.preventDefault();
      return;
    }
    
    if (newIndex !== index) {
      handleOptionClick(newIndex);
      // Wait for re-render then focus
      setTimeout(() => {
        const tabs = document.querySelectorAll('[role="tab"]');
        if (tabs[newIndex]) (tabs[newIndex] as HTMLElement).focus();
      }, 0);
    }
  };

  useEffect(() => {
`;

file = file.replace('useEffect(() => {', handlerCode);

// Add Tablist role
file = file.replace(
  '<div className="hidden sm:flex options w-full max-w-5xl h-[480px]',
  '<div role="tablist" aria-label="Nichos de Mercado" className="hidden sm:flex options w-full max-w-5xl h-[480px]'
);

// Add tab attributes
file = file.replace(
  /onClick=\{\(\) => handleOptionClick\(index\)\}/g,
  `onClick={() => handleOptionClick(index)}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                aria-controls={\`niche-panel-\${index}\`}
                onKeyDown={(e) => handleKeyDown(e, index)}`
);

// Add Tabpanel role to the expanded content
file = file.replace(
  /<div\s+className="transition-all duration-700 overflow-hidden"/g,
  '<div id={`niche-panel-${index}`} role="tabpanel" className="transition-all duration-700 overflow-hidden"'
);

fs.writeFileSync('src/components/ui/interactive-selector.tsx', file, 'utf8');
console.log('Interactive selector tabs a11y updated.');
