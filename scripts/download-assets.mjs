import fs from 'fs';
import path from 'path';

const summary = JSON.parse(fs.readFileSync('docs/research/helena-marsh/site-summary.json'));
const outDir = 'public/sites/helena-marsh/images';
fs.mkdirSync(outDir, { recursive: true });

const urlMap = {};

async function downloadAsset(url) {
  try {
    // Clean URL
    const parsed = new URL(url);
    const cleanUrl = parsed.origin + parsed.pathname;
    const baseName = path.basename(parsed.pathname);

    // Fetch asset
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed ${res.status}: ${url}`);
      return;
    }

    const contentType = res.headers.get('content-type') || '';
    let ext = path.extname(baseName);
    if (contentType.includes('webp')) ext = '.webp';
    else if (contentType.includes('avif')) ext = '.avif';
    else if (contentType.includes('png')) ext = '.png';
    else if (contentType.includes('jpeg') || contentType.includes('jpg')) ext = '.jpg';
    else if (contentType.includes('svg')) ext = '.svg';

    const fileName = path.basename(baseName, path.extname(baseName)) + ext;
    const filePath = path.join(outDir, fileName);

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const localPath = `/sites/helena-marsh/images/${fileName}`;
    urlMap[url] = localPath;
    urlMap[cleanUrl] = localPath;
    console.log(`Saved: ${fileName} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
  }
}

async function main() {
  console.log(`Downloading ${summary.assets.length} assets...`);
  for (const url of summary.assets) {
    await downloadAsset(url);
  }

  // Also check docs_raw_page.html for any other images
  const html = fs.readFileSync('docs_raw_page.html', 'utf8');
  const otherImgs = html.matchAll(/https:\/\/framerusercontent\.com\/images\/[a-zA-Z0-9_\-\.]+/g);
  for (const m of otherImgs) {
    const u = m[0];
    if (!urlMap[u]) {
      await downloadAsset(u);
    }
  }

  fs.writeFileSync('docs/research/helena-marsh/asset-map.json', JSON.stringify(urlMap, null, 2));
  console.log(`Asset download complete! Total mapped: ${Object.keys(urlMap).length}`);
}

main().catch(console.error);
