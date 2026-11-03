import fs from 'fs';
import path from 'path';

const cmsUrls = [
  'https://framerusercontent.com/cms/rD2TABBNYXOSsJJAdu3E/ImGmklAIC7DkrmfXd8U2/ozTTKPt3C-chunk-default-0.framercms',
  'https://framerusercontent.com/cms/ZOzyS3dNf7ThZFjkwTFQ/zaoNcSB530fJYdG0Pajc/kNGMqDEXe-chunk-default-0.framercms',
  'https://framerusercontent.com/cms/iJytiEuoBTlsFpfeuEfT/P85htvjpEkPjdrj56DRq/ZJpDaBz5n-chunk-default-0.framercms',
  'https://framerusercontent.com/cms/XlgFpX5c4zLQdozdFqJO/qgsR0cuBWnkaSiRsELqA/XSMj8kRbO-chunk-default-0.framercms',
  'https://framerusercontent.com/cms/gFYUB9l9td7qYVOWoEas/WQ375cR3RlfiHmItlIUF/vfvA1BiBK-indexes-default-0.framercms',
  'https://framerusercontent.com/cms/gFYUB9l9td7qYVOWoEas/WQ375cR3RlfiHmItlIUF/vfvA1BiBK-chunk-default-0.framercms',
  'https://framerusercontent.com/cms/VfStop0KKqpYgzgk0Day/5pSf7DaMPD1K9xF2VnoM/jEM0Zh6bl-chunk-default-0.framercms',
  'https://framerusercontent.com/cms/2a5IazXm95aP6tT5RCTg/kUi9Dq2JOzsLVHU3Q1rL/L9Tu0sDHl-indexes-default-0.framercms',
  'https://framerusercontent.com/cms/2a5IazXm95aP6tT5RCTg/kUi9Dq2JOzsLVHU3Q1rL/L9Tu0sDHl-chunk-default-0.framercms'
];

async function main() {
  const allData = {};
  for (const url of cmsUrls) {
    const filename = path.basename(url);
    const res = await fetch(url);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(`docs/research/helena-marsh/${filename}`, buf);

    // Extract all ascii text strings length >= 3
    const str = buf.toString('utf8');
    const strings = Array.from(str.matchAll(/[\x20-\x7E]{3,}/g)).map(m => m[0].trim()).filter(Boolean);
    allData[filename] = strings;
    console.log(`Saved ${filename}: ${strings.length} text strings`);
  }

  fs.writeFileSync('docs/research/helena-marsh/cms-extracted.json', JSON.stringify(allData, null, 2));
}

main().catch(console.error);
