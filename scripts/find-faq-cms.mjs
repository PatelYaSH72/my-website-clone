import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const allUrls = Array.from(html.matchAll(/https:\/\/[^"'\s\)]+\.mjs/g)).map(m => m[0]);
const uniqueUrls = Array.from(new Set(allUrls));

console.log('Total mjs urls in raw HTML:', uniqueUrls.length);

async function check() {
  for (const u of uniqueUrls) {
    const res = await fetch(u);
    const txt = await res.text();
    if (txt.includes('Who pays') || txt.includes('mentoring or therapy') || txt.includes('How soon could we start')) {
      console.log('FOUND IN:', u);
      fs.writeFileSync('docs/research/helena-marsh/cms-faq.js', txt);
      // Print matches
      const matches = txt.matchAll(/"([^"]*?(?:chemistry|Who pays|mentoring|measure|in person|start)[^"]*?)"/gi);
      for (const m of matches) {
        console.log(' -', m[1]);
      }
    }
  }
}

check();
