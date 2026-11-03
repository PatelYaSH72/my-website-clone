import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testManifestoWipe() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

  fs.mkdirSync('docs/design-references/local/manifesto-test', { recursive: true });

  // Locate Manifesto section
  const manifestoRect = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('WHAT I BELIEVE'));
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.offsetHeight };
  });

  console.log('Manifesto top:', manifestoRect.top, 'height:', manifestoRect.height);

  // 1. Initial entering Manifesto: words unlit
  await page.evaluate(y => window.scrollTo(0, y), manifestoRect.top);
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: 'docs/design-references/local/manifesto-test/01-start.png' });
  console.log('Saved 01-start.png');

  // 2. Midway text lighting: words partially lit, photos translating up
  const midY = manifestoRect.top + manifestoRect.height * 0.35;
  await page.evaluate(y => window.scrollTo(0, y), midY);
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: 'docs/design-references/local/manifesto-test/02-text-lighting.png' });
  console.log('Saved 02-text-lighting.png');

  // 3. Text fully lit, wipe beginning to enter diagonally
  const wipeStart = manifestoRect.top + manifestoRect.height * 0.72;
  await page.evaluate(y => window.scrollTo(0, y), wipeStart);
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: 'docs/design-references/local/manifesto-test/03-wipe-diagonal.png' });
  console.log('Saved 03-wipe-diagonal.png');

  // 4. Wipe full covering stage, presenting "Four kinds of principal."
  const wipeFull = manifestoRect.top + manifestoRect.height * 0.95;
  await page.evaluate(y => window.scrollTo(0, y), wipeFull);
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: 'docs/design-references/local/manifesto-test/04-wipe-full.png' });
  console.log('Saved 04-wipe-full.png');

  // 5. Entering Who section with rows on dark background
  const whoY = manifestoRect.top + manifestoRect.height + 150;
  await page.evaluate(y => window.scrollTo(0, y), whoY);
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: 'docs/design-references/local/manifesto-test/05-who-rows.png' });
  console.log('Saved 05-who-rows.png');

  await browser.close();
  console.log('Test completed successfully!');
}

testManifestoWipe().catch(console.error);
