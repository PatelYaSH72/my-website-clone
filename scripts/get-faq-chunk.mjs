import fs from 'fs';

async function main() {
  const url = 'https://framerusercontent.com/sites/6UDCSxZDqAq8pIxCjZPfbj/kNGMqDEXe.D9Lg9q_K.mjs';
  const res = await fetch(url);
  const text = await res.text();
  fs.writeFileSync('docs/research/helena-marsh/faq-chunk.js', text);
  console.log('Saved faq-chunk.js, length:', text.length);

  // Look for all questions / answers
  const qRegex = /([a-zA-Z0-9_]+)\?\?`([^`]+)`/g;
  let m;
  const strings = [];
  while ((m = qRegex.exec(text)) !== null) {
    strings.push(m[2]);
  }
  console.log('Strings extracted:', strings);
}

main().catch(console.error);
