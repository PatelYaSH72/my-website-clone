import fs from 'fs';

const text = fs.readFileSync('docs/research/helena-marsh/faq-chunk.js', 'utf8');
const dollarIdx = text.indexOf('$=');
console.log('$= at:', dollarIdx);
if (dollarIdx !== -1) {
  console.log(text.slice(dollarIdx - 20, dollarIdx + 4000));
}
