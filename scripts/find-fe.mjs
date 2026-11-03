import fs from 'fs';

const text = fs.readFileSync('docs/research/helena-marsh/home-chunk.js', 'utf8');
const feIdx = text.indexOf('Fe=');
console.log('Fe= at:', feIdx);
if (feIdx !== -1) {
  console.log(text.slice(feIdx - 50, feIdx + 3000));
}
