import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const regex = /https:\/\/framerusercontent\.com\/sites\/6UDCSxZDqAq8pIxCjZPfbj\/[a-zA-Z0-9_\-\.]+\.mjs/g;
const urls = Array.from(new Set(Array.from(html.matchAll(regex)).map(m => m[0])));

async function main() {
  const cmsUrls = new Set();
  for (const url of urls) {
    const res = await fetch(url);
    const text = await res.text();
    const cmsMatches = text.matchAll(/https:\/\/framerusercontent\.com\/[^\s"'`]+\.framercms/g);
    for (const m of cmsMatches) {
      cmsUrls.add(m[0]);
    }
    // Also relative urls: new URL('./...framercms', ...)
    const relMatches = text.matchAll(/new\s+URL\([`'"]([^`'"]+\.framercms)[`'"],\s*[`'"]([^`'"]+)[`'"]\)/g);
    for (const m of relMatches) {
      try {
        const full = new URL(m[1], m[2]).href.replace('/modules/', '/cms/');
        cmsUrls.add(full);
      } catch (e) {}
    }
  }

  console.log(`Found ${cmsUrls.size} framercms URLs:`);
  for (const u of cmsUrls) {
    console.log(' -', u);
  }
}

main().catch(console.error);
