import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const regex = /https:\/\/framerusercontent\.com\/sites\/6UDCSxZDqAq8pIxCjZPfbj\/[a-zA-Z0-9_\-\.]+\.mjs/g;
const urls = Array.from(new Set(Array.from(html.matchAll(regex)).map(m => m[0])));

async function main() {
  console.log(`Downloading and inspecting ${urls.length} files...`);
  for (const url of urls) {
    const res = await fetch(url);
    const content = await res.text();
    // Search for "therapy" or "mentoring" or "sponsor" or "chemist"
    if (content.includes('therapy') || content.includes('mentoring') || content.includes('in person') || content.includes('fortnightly') || content.includes('chemistry call')) {
      console.log('Match in:', url);
      // Find all string literals in content
      const strMatches = content.match(/`([^`]{20,400})`/g);
      if (strMatches) {
        strMatches.forEach(s => {
          if (s.includes('call') || s.includes('pay') || s.includes('mentor') || s.includes('measure') || s.includes('person') || s.includes('start') || s.includes('team')) {
            console.log('   >>>', s.replace(/\n+/g, ' '));
          }
        });
      }
    }
  }
}

main().catch(console.error);
