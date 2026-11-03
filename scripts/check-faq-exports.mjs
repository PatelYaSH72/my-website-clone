import fs from 'fs';

const text = fs.readFileSync('docs/research/helena-marsh/faq-chunk.js', 'utf8');
const exportIdx = text.lastIndexOf('export');
console.log(text.slice(exportIdx));
