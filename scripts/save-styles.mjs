import fs from 'fs';

const html = fs.readFileSync('docs_raw_page.html', 'utf8');
const styleMatches = Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi));
if (styleMatches.length >= 6) {
  const css = styleMatches[5][1];
  fs.writeFileSync('docs/research/helena-marsh/custom-styles.css', css);
  console.log('Saved custom-styles.css, length:', css.length);
}
