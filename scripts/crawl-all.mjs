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

  fs.mkdirSync('docs/design-references/pages', { recursive: true });
  fs.mkdirSync('docs/research/helena-marsh/pages', { recursive: true });

  const allAssets = new Set();
  const pagesSummary = [];

  for (const r of routes) {
    const url = 'https://easier-spots-537272.framer.app' + r.path;
    console.log(`Inspecting ${r.name}: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Scroll down to load all images/elements
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const interval = setInterval(() => {
          window.scrollBy(0, 400);
          y += 400;
          if (y >= document.body.scrollHeight) {
            clearInterval(interval);
            window.scrollTo(0, 0);
            setTimeout(res, 500);
          }
        }, 100);
      });
    });

    // Capture screenshot
    await page.screenshot({ path: `docs/design-references/pages/${r.name}-desktop.png`, fullPage: true });

    // Extract page DOM details & assets
    const data = await page.evaluate((rName) => {
      const getStyles = (el) => {
        const s = window.getComputedStyle(el);
        return {
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          lineHeight: s.lineHeight,
          letterSpacing: s.letterSpacing,
          color: s.color,
          backgroundColor: s.backgroundColor,
          padding: s.padding,
          maxWidth: s.maxWidth
        };
      };

      const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        currentSrc: img.currentSrc,
        alt: img.alt,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height
      }));

      // Top level sections
      const sections = Array.from(document.querySelectorAll('main > * , [data-framer-name]')).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.height > 100 && rect.width > 300;
      }).slice(0, 30).map(el => ({
        name: el.getAttribute('data-framer-name') || el.tagName,
        text: (el.innerText || '').slice(0, 200).replace(/\s+/g, ' ')
      }));

      return {
        title: document.title,
        heading1: document.querySelector('h1')?.innerText || '',
        metaDesc: document.querySelector('meta[name="description"]')?.content || '',
        textLength: document.body.innerText.length,
        imgs,
        sections
      };
    }, r.name);

    data.imgs.forEach(img => {
      if (img.currentSrc) allAssets.add(img.currentSrc);
      if (img.src) allAssets.add(img.src);
    });

    pagesSummary.push({
      route: r.path,
      name: r.name,
      title: data.title,
      heading1: data.heading1,
      metaDesc: data.metaDesc,
      imageCount: data.imgs.length
    });

    fs.writeFileSync(`docs/research/helena-marsh/pages/${r.name}.json`, JSON.stringify(data, null, 2));
  }

  fs.writeFileSync('docs/research/helena-marsh/site-summary.json', JSON.stringify({
    routes: pagesSummary,
    assets: Array.from(allAssets)
  }, null, 2));

  console.log('Done inspecting all routes! Assets found:', allAssets.size);
  await browser.close();
}

main().catch(console.error);
