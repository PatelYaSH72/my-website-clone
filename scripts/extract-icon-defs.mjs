import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const regex = /<svg\s+id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/svg>/gi;
const icons = {};
let match;
while ((match = regex.exec(html)) !== null) {
  icons[match[1]] = match[0];
  console.log('Found icon SVG ID:', match[1]);
}

fs.writeFileSync('docs/research/helena-marsh/icon-defs.json', JSON.stringify(icons, null, 2));
