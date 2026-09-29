const fs = require('fs');
let content = fs.readFileSync('src/components/scrollytelling/WordRevealSection.tsx', 'utf8');

// 1. Remove state
content = content.replace('const [scrollProgress, setScrollProgress] = useState(0);', '');

// 2. Add ref for spans
content = content.replace(
  'const headlineRef = useRef<HTMLHeadingElement>(null);',
  'const headlineRef = useRef<HTMLHeadingElement>(null);\n  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);'
);

// 3. Update scroll logic
const oldScrollLogic = `const progress = (start - rect.top) / (start - end);
          const clamped = Math.min(Math.max(progress, 0), 1);
          setScrollProgress(clamped);`;

const newScrollLogic = `const progress = (start - rect.top) / (start - end);
          const clamped = Math.min(Math.max(progress, 0), 1);
          
          spanRefs.current.forEach((span, i) => {
            if (!span) return;
            const wordThreshold = i / (words.length * 0.95);
            const isLit = clamped >= wordThreshold;
            if (isLit) {
              span.classList.remove("text-slate-600", "opacity-30");
              span.classList.add("text-white", "opacity-100");
            } else {
              span.classList.remove("text-white", "opacity-100");
              span.classList.add("text-slate-600", "opacity-30");
            }
          });`;
content = content.replace(oldScrollLogic, newScrollLogic);

// 4. Update the render loop
const oldRender = `const wordThreshold = i / (words.length * 0.95);
            const isLit = scrollProgress >= wordThreshold;
            return (
              <span
                key={i}
                className={cn(
                  "inline-block mr-2 sm:mr-3 transition-colors duration-200",
                  isLit 
                    ? "text-white opacity-100" 
                    : "text-slate-600 opacity-30"
                )}
              >`;

const newRender = `return (
              <span
                key={i}
                ref={(el) => (spanRefs.current[i] = el)}
                className={cn(
                  "inline-block mr-2 sm:mr-3 transition-colors duration-200",
                  "text-slate-600 opacity-30" // initial state
                )}
              >`;
content = content.replace(oldRender, newRender);

fs.writeFileSync('src/components/scrollytelling/WordRevealSection.tsx', content, 'utf8');
console.log('Fixed WordRevealSection performance issue.');
