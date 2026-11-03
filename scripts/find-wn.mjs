import fs from 'fs';

const text = fs.readFileSync('docs/research/helena-marsh/home-chunk.js', 'utf8');
const wnIdx = text.indexOf('wn=');
console.log('wn= at:', wnIdx);
if (wnIdx !== -1) {
  console.log(text.slice(wnIdx - 100, wnIdx + 800));
}
