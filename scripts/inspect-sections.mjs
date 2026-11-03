import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://easier-spots-537272.framer.app/', { waitUntil: 'networkidle2' });

  // Extract structured section details
  const sections = await page.evaluate(() => {
    // Find all top-level sections
    const namedNodes = Array.from(document.querySelectorAll('[data-framer-name]'));
    
    // Key sections to extract
    const sectionNames = [
      'Site Header',
      'Hero',
      'Clients',
      'Manifesto',
      'Who',
      'Method',
      'Programs',
      'Results',
      'Voices',
      'About',
      'Insights',
      'FAQ',
      'CTA',
      'Site Footer'
    ];

    const result = {};

    for (const name of sectionNames) {
      const el = namedNodes.find(n => n.getAttribute('data-framer-name') === name);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);

      // Collect all text items with their font styles inside this section
      const textItems = [];
      el.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button').forEach(t => {
        if (t.children.length === 0 && t.innerText.trim()) {
          const ts = window.getComputedStyle(t);
          textItems.push({
            tag: t.tagName,
            text: t.innerText.trim(),
            font: `${ts.fontWeight} ${ts.fontSize}/${ts.lineHeight} ${ts.fontFamily}`,
            color: ts.color,
            bg: ts.backgroundColor,
            letterSpacing: ts.letterSpacing,
            textTransform: ts.textTransform
          });
        }
      });

      // Collect all images inside this section
      const imgs = Array.from(el.querySelectorAll('img')).map(i => ({
        src: i.src,
        currentSrc: i.currentSrc,
        alt: i.alt,
        width: i.width,
        height: i.height
      }));

      // Collect buttons/links
      const links = Array.from(el.querySelectorAll('a, button')).map(a => ({
        tag: a.tagName,
        text: a.innerText.trim().replace(/\n+/g, ' '),
        href: a.href || ''
      }));

      result[name] = {
        name,
        rect: { width: rect.width, height: rect.height, top: rect.top + window.scrollY },
        bg: style.backgroundColor,
        padding: style.padding,
        color: style.color,
        textItems,
        imgs,
        links
      };
    }

    return result;
  });

  fs.writeFileSync('docs/research/helena-marsh/sections-detailed.json', JSON.stringify(sections, null, 2));
  console.log('Saved detailed sections data!');

  await browser.close();
}

main().catch(console.error);
