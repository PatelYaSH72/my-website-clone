import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  { path: '/', name: 'home' },
  { path: '/coaching', name: 'coaching' },
  { path: '/results', name: 'results' },
  { path: '/about', name: 'about' },
  { path: '/insights', name: 'insights' },
  { path: '/speaking', name: 'speaking' },
  { path: '/book', name: 'book' },
  { path: '/coaching/the-principal-year', name: 'coaching-principal-year' },
  { path: '/coaching/the-first-hundred-days', name: 'coaching-first-hundred-days' },
  { path: '/coaching/the-leadership-bench', name: 'coaching-leadership-bench' },
  { path: '/insights/the-meeting-after-the-meeting', name: 'insight-meeting' },
  { path: '/insights/your-first-ninety-days-are-not-a-plan', name: 'insight-ninety-days' },
  { path: '/insights/feedback-travels-upward-slowly', name: 'insight-feedback' },
  { path: '/insights/deciding-what-not-to-decide', name: 'insight-deciding' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' }
];

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const contentMap = {};

  for (const r of routes) {
    const url = 'https://easier-spots-537272.framer.app' + r.path;
    await page.goto(url, { waitUntil: 'networkidle2' });

    const pageData = await page.evaluate(() => {
      // Collect structured blocks
      const main = document.querySelector('main') || document.body;
      const elements = [];

      function walk(el) {
        const framerName = el.getAttribute('data-framer-name');
        if (framerName && ['Site Header', 'Site Footer', 'Footer Curtain'].includes(framerName)) {
          return;
        }

        const tag = el.tagName.toLowerCase();
        if (['h1', 'h2', 'h3', 'h4', 'p', 'li', 'blockquote'].includes(tag)) {
          const text = el.innerText?.trim();
          if (text) {
            elements.push({
              tag,
              framerName: el.closest('[data-framer-name]')?.getAttribute('data-framer-name') || null,
              html: el.innerHTML,
              text
            });
          }
        }

        for (const child of el.children) {
          walk(child);
        }
      }

      walk(main);
      return {
        title: document.title,
        elements
      };
    });

    contentMap[r.name] = pageData;
    console.log(`Extracted ${r.name}: ${pageData.elements.length} content elements`);
  }

  fs.writeFileSync('docs/research/helena-marsh/full-site-content.json', JSON.stringify(contentMap, null, 2));
  console.log('Saved docs/research/helena-marsh/full-site-content.json');

  await browser.close();
}

main().catch(console.error);
