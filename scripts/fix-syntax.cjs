const fs = require('fs');
let content = fs.readFileSync('src/components/ui/landing-page.tsx', 'utf8');
content = content.replace('ref={progressBarRef}`n          style={{`n            transform: `scaleX(0)`,', 'ref={progressBarRef}\n            style={{\n              transform: `scaleX(0)`,');
fs.writeFileSync('src/components/ui/landing-page.tsx', content, 'utf8');
console.log('Fixed syntax error');
