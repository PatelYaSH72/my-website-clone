import fs from 'fs';

async function main() {
  const url = 'https://framerusercontent.com/sites/6UDCSxZDqAq8pIxCjZPfbj/PhicFTXF93qnv7Ce869sQ2TB2hGuuWKY_6uGP9tg05g.OMZ4yk3j.mjs';
  const res = await fetch(url);
  const text = await res.text();
  fs.writeFileSync('docs/research/helena-marsh/home-chunk.js', text);

  const idx = text.indexOf('Ex1kdtVOH');
  console.log('Found Ex1kdtVOH at:', idx);
  console.log(text.slice(Math.max(0, idx - 1500), idx + 2000));
}

main().catch(console.error);
