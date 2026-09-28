const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src', 'dashboard-app'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // We must replace from largest to smallest to avoid double replacing.
    // Wait, if we replace text-sm to text-base, then text-xs to text-sm, the new text-sm won't be replaced if we do it sequentially.
    // Actually, a replacer function is best.

    const classMap = {
        'text-[10px]': 'text-xs',
        'text-[11px]': 'text-sm',
        'text-xs': 'text-sm',
        'text-sm': 'text-base',
        'text-base': 'text-lg',
        'text-lg': 'text-xl',
        'h-3': 'h-4',
        'w-3': 'w-4',
        'h-3.5': 'h-4',
        'w-3.5': 'w-4',
        'h-4': 'h-5',
        'w-4': 'w-5',
    };

    // Regex to match these exact classes (word boundary or space)
    // We use a regex that looks for these exact words.
    const regex = new RegExp('(?<=[\\s\'"`])(' + Object.keys(classMap).map(k => k.replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\./g, '\\.')).join('|') + ')(?=[\\s\'"`])', 'g');

    let newContent = content.replace(regex, (match) => {
        return classMap[match] || match;
    });

    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated typography in ${path.basename(file)}`);
    }
});

console.log("Done upgrading typography.");
