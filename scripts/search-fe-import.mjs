import fs from 'fs';

const text = fs.readFileSync('docs/research/helena-marsh/home-chunk.js', 'utf8');
const regex = /import\s*\{[^}]*Fe[^}]*\}\s*from\s*["']([^"']+)["']/g;
let m;
while ((m = regex.exec(text)) !== null) {
  console.log('Imported Fe from:', m[1]);
}

// Or check if Fe is declared as var Fe, let Fe, const Fe
const defs = text.match(/(?:const|let|var)\s+[^;]*?\bFe\b[^;]*;/g);
console.log('Defs count:', defs ? defs.length : 0);
if (defs) {
  defs.forEach(d => console.log(d.slice(0, 200)));
}
