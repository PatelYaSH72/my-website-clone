import fs from 'fs';

const text = fs.readFileSync('docs/research/helena-marsh/faq-chunk.js', 'utf8');
const openIdx = text.indexOf('rYh66_YA0');
console.log('Open index:', openIdx);
if (openIdx !== -1) {
  console.log(text.slice(openIdx - 200, openIdx + 1500));
}
