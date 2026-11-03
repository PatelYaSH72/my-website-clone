import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const pos = html.indexOf('Who pays');
console.log('Pos of "Who pays":', pos);
if (pos !== -1) {
  console.log(html.slice(pos - 200, pos + 1200));
}
