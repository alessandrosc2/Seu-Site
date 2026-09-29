const fs = require('fs');

let content = fs.readFileSync('src/components/ui/landing-page.tsx', 'utf8');

// 1. Remove state
content = content.replace('const [scrollProgress, setScrollProgress] = useState(0);', '');

// 2. Add ref
content = content.replace('const containerRef = useRef<HTMLDivElement>(null);', 'const containerRef = useRef<HTMLDivElement>(null);\n  const progressBarRef = useRef<HTMLDivElement>(null);');

// 3. Update updateScrollPosition
content = content.replace('setScrollProgress(progress);', 'if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${progress})`;');

// 4. Update the JSX
content = content.replace(
  'style={{ \n            transform: `scaleX(${scrollProgress})`,',
  'ref={progressBarRef}\n          style={{ \n            transform: `scaleX(0)`,'
);

fs.writeFileSync('src/components/ui/landing-page.tsx', content, 'utf8');
console.log('Fixed scrollProgress state thrashing.');
