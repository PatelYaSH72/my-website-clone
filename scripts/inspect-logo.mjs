import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const logoIdx = html.indexOf('data-framer-name="Logo"');
if (logoIdx !== -1) {
  console.log(html.slice(logoIdx, logoIdx + 1200));
}
