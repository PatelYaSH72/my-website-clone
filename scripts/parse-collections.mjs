import fs from 'fs';

function extractStrings(filename) {
  const buf = fs.readFileSync(`docs/research/helena-marsh/${filename}`);
  return Array.from(buf.toString('utf8').matchAll(/[\x20-\x7E\u2010-\u2030]{3,}/g)).map(m => m[0].trim()).filter(Boolean);
}

// Inspect results
console.log('=== RESULTS STRINGS ===');
const resStrings = extractStrings('ozTTKPt3C-chunk-default-0.framercms');
console.log(resStrings);

console.log('\n=== TESTIMONIALS STRINGS ===');
const testStrings = extractStrings('ZJpDaBz5n-chunk-default-0.framercms');
console.log(testStrings);

console.log('\n=== METHOD STRINGS ===');
const methodStrings = extractStrings('XSMj8kRbO-chunk-default-0.framercms');
console.log(methodStrings);

console.log('\n=== PROGRAMS STRINGS ===');
const progStrings = extractStrings('jEM0Zh6bl-chunk-default-0.framercms');
console.log(progStrings);

console.log('\n=== INSIGHTS STRINGS ===');
const insStrings = extractStrings('L9Tu0sDHl-chunk-default-0.framercms');
console.log(insStrings);
