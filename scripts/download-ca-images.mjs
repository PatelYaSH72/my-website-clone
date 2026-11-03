import https from 'https';
import fs from 'fs';
import path from 'path';

const IMAGES = {
  // Hero fallback & alternate portraits
  'fenil-portrait.webp': 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1400&q=85&fit=crop',
  'fenil-arch.webp': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=85&fit=crop',
  'fenil-speaking.webp': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&q=85&fit=crop',
  
  // Who rows - 4 kinds of clients
  'who-founders.webp': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1000&q=85&fit=crop',
  'who-ceos.webp': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000&q=85&fit=crop',
  'who-executives.webp': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=85&fit=crop',
  'who-teams.webp': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=85&fit=crop',

  // Method steps - CA strategic audit steps
  'method-audit.webp': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=85&fit=crop',
  'method-structure.webp': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=85&fit=crop',
  'method-board.webp': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&q=85&fit=crop',
  'method-assurance.webp': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&q=85&fit=crop',

  // Case studies - Corporate finance & restructuring
  'case-fintech.webp': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&fit=crop',
  'case-manufacturing.webp': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=85&fit=crop',
  'case-healthtech.webp': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=85&fit=crop',
  'case-conglomerate.webp': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&fit=crop',

  // Articles - Corporate finance insights
  'article-board-paper.webp': 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&q=85&fit=crop',
  'article-ebitda.webp': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85&fit=crop',
  'article-tax.webp': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=85&fit=crop',
  'article-diligence.webp': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&fit=crop',

  // Manifesto notebook & stairs replacement
  'manifesto-ledger.webp': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&q=85&fit=crop',
  'manifesto-bkc.webp': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=85&fit=crop',
};

const targetDir = path.resolve('public/sites/helena-marsh/images');

async function download(name, url) {
  const dest = path.join(targetDir, name);
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return https.get(res.headers.location, (redirectRes) => {
          const file = fs.createWriteStream(dest);
          redirectRes.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${name} (${fs.statSync(dest).size} bytes)`);
            resolve();
          });
        }).on('error', reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${name} (${fs.statSync(dest).size} bytes)`);
        resolve();
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const [name, url] of Object.entries(IMAGES)) {
    try {
      await download(name, url);
    } catch (err) {
      console.error(`Failed ${name}:`, err.message);
    }
  }
  console.log('All image downloads completed!');
})();
