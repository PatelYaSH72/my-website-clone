import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');

const title = html.match(/<title>(.*?)<\/title>/)?.[1];
const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1];
console.log('Title:', title);
console.log('Description:', desc);

// Find links
const links = new Set();
const linkMatches = html.matchAll(/href=["']([^"'#]+)["']/g);
for (const m of linkMatches) {
  links.add(m[1]);
}
console.log('\nAll unique href links:');
for (const l of links) {
  console.log('  -', l);
}

// Find scripts loaded
const scripts = new Set();
const scriptMatches = html.matchAll(/src=["']([^"']+\.js[^"']*)["']/g);
for (const m of scriptMatches) {
  scripts.add(m[1]);
}
console.log('\nScripts count:', scripts.size);
for (const s of Array.from(scripts).slice(0, 10)) {
  console.log('  -', s);
}

// Find fonts
const fonts = new Set();
const fontMatches = html.matchAll(/https:\/\/[^"'\s\)]+\.(woff2|woff|ttf|otf)[^"'\s\)]*/gi);
for (const m of fontMatches) {
  fonts.add(m[0]);
}
console.log('\nFonts found (' + fonts.size + '):');
for (const f of fonts) {
  console.log('  -', f);
}

// Find images
const images = new Set();
const imgMatches = html.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'\s\)]+/gi);
for (const m of imgMatches) {
  images.add(m[0]);
}
console.log('\nFramer images found (' + images.size + '):');
for (const img of Array.from(images).slice(0, 20)) {
  console.log('  -', img);
}
