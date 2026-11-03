import fs from 'fs';

async function main() {
  const url = 'https://framerusercontent.com/cms/ZOzyS3dNf7ThZFjkwTFQ/zaoNcSB530fJYdG0Pajc/kNGMqDEXe-chunk-default-0.framercms';
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync('docs/research/helena-marsh/faq.framercms', buf);
  const txt = buf.toString('utf8');
  console.log('Downloaded framercms, length:', buf.length);
  console.log(txt.slice(0, 3000));
}

main().catch(console.error);
