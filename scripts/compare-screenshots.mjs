import puppeteer from 'puppeteer-core';
import fs from 'fs';

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
  { path: '/insights/the-meeting-after-the-meeting', name: 'insight-meeting' }
];

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  fs.mkdirSync('docs/design-references/local', { recursive: true });

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('requestfailed', req => errors.push(`Request failed: ${req.url()} - ${req.failure()?.errorText}`));

  for (const r of routes) {
    const localUrl = 'http://localhost:3000' + r.path;
    console.log(`Checking local route: ${localUrl}`);

    await page.goto(localUrl, { waitUntil: 'networkidle2', timeout: 15000 });

    // Desktop capture
    await page.screenshot({ path: `docs/design-references/local/${r.name}-desktop.png`, fullPage: true });

    // Mobile capture for home
    if (r.name === 'home') {
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await page.reload({ waitUntil: 'networkidle2' });
      await page.screenshot({ path: `docs/design-references/local/home-mobile.png`, fullPage: true });
      await page.setViewport({ width: 1440, height: 900 });
    }
  }

  console.log('Errors logged during capture:', errors.length);
  if (errors.length > 0) {
    console.log(errors);
  }

  await browser.close();
}

main().catch(console.error);
