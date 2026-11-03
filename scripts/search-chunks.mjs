import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const mjsUrls = Array.from(html.matchAll(/https:\/\/framerusercontent\.com\/sites\/6UDCSxZDqAq8pIxCjZPfbj\/[a-zA-Z0-9_\-\.]+\.mjs/g)).map(m => m[0]);
const uniqueMjs = Array.from(new Set(mjsUrls));

console.log(`Checking ${uniqueMjs.length} mjs chunks...`);

async function search() {
  for (const url of uniqueMjs) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      if (text.includes('chemistry call') || text.includes('mentoring or therapy') || text.includes('Who pays')) {
        console.log('\nFOUND IN:', url);
        // Find excerpts
        const idx = text.indexOf('chemistry call');
        console.log(text.slice(Math.max(0, idx - 100), idx + 800));
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}

search();
