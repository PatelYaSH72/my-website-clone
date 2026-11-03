import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const mjsUrls = Array.from(html.matchAll(/https:\/\/framerusercontent\.com\/sites\/6UDCSxZDqAq8pIxCjZPfbj\/[a-zA-Z0-9_\-\.]+\.mjs/g)).map(m => m[0]);
const uniqueMjs = Array.from(new Set(mjsUrls));

const questions = [
  'What happens on a chemistry call?',
  'Who pays — me or my company?',
  'How is coaching different from mentoring or therapy?',
  'How do you measure whether it worked?',
  'Do we meet in person?',
  'How soon could we start?'
];

async function main() {
  for (const url of uniqueMjs) {
    const res = await fetch(url);
    const text = await res.text();
    for (const q of questions) {
      if (text.includes(q)) {
        console.log(`\nFound "${q}" in ${url}`);
        const idx = text.indexOf(q);
        console.log(text.slice(Math.max(0, idx - 200), idx + 400));
      }
    }
  }
}

main().catch(console.error);
