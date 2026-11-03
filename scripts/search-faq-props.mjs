import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const regex = /https:\/\/framerusercontent\.com\/sites\/6UDCSxZDqAq8pIxCjZPfbj\/[a-zA-Z0-9_\-\.]+\.mjs/g;
const urls = Array.from(new Set(Array.from(html.matchAll(regex)).map(m => m[0])));

async function main() {
  for (const url of urls) {
    const res = await fetch(url);
    const content = await res.text();
    if (content.includes('OIdj8znT5') || content.includes('hEgeoudOj')) {
      console.log('Match in:', url);
      // find occurrences
      let idx = 0;
      while ((idx = content.indexOf('OIdj8znT5', idx)) !== -1) {
        console.log(content.slice(Math.max(0, idx - 100), idx + 300));
        console.log('---');
        idx += 10;
      }
    }
  }
}

main().catch(console.error);
