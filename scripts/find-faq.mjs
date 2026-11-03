import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const pos = html.indexOf('What happens on a chemistry call');
console.log('Pos:', pos);
if (pos !== -1) {
  console.log(html.slice(pos, pos + 2500));
}
