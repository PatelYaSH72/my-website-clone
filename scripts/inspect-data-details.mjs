import fs from 'fs';

const content = JSON.parse(fs.readFileSync('docs/research/helena-marsh/full-site-content.json'));
const assetMap = JSON.parse(fs.readFileSync('docs/research/helena-marsh/asset-map.json'));

console.log('Generating data summary...');
// Let's print out what quotes exist on home
const homeQuotes = content.home.elements.filter(e => e.framerName && e.framerName.includes('Quote'));
console.log('Home quotes count:', homeQuotes.length);
homeQuotes.forEach(q => console.log(' -', q.text.slice(0, 100)));

// Let's print out testimonials / voices
const voices = content.home.elements.filter(e => e.framerName && (e.framerName.includes('Voice') || e.framerName.includes('Pile')));
console.log('\nVoices count:', voices.length);
voices.slice(0, 10).forEach(v => console.log(' -', v.text.slice(0, 100)));

// Let's print out method steps
const method = content.home.elements.filter(e => e.framerName && e.framerName.includes('Method'));
console.log('\nMethod count:', method.length);
method.slice(0, 10).forEach(m => console.log(' -', m.text.slice(0, 100)));
