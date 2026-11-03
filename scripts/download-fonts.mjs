import fs from 'fs';
import path from 'path';

const outDir = 'public/sites/helena-marsh/fonts';
fs.mkdirSync(outDir, { recursive: true });

async function downloadFont(url, name) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const filePath = path.join(outDir, name);
  fs.writeFileSync(filePath, buf);
  console.log(`Saved font ${name} (${buf.length} bytes)`);
}

async function main() {
  await downloadFont(
    'https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATjnTNgNq55w.woff2',
    'instrument-serif-italic.woff2'
  );
}

main().catch(console.error);
