import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('docs/research/helena-marsh/pages');

for (const file of files) {
  if (!file.endsWith('.json')) continue;
  const data = JSON.parse(fs.readFileSync(path.join('docs/research/helena-marsh/pages', file)));
  console.log(`\n========================================`);
  console.log(`Page: ${file.replace('.json', '')}`);
  console.log(`Title: ${data.title}`);
  console.log(`H1: ${data.heading1}`);
  console.log(`Meta: ${data.metaDesc}`);
  console.log(`Sections count: ${data.sections.length}`);
  console.log(`Images count: ${data.imgs.length}`);
  console.log(`Sample sections:`, data.sections.slice(0, 8).map(s => s.name).join(', '));
}
