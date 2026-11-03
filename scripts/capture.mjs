import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to https://easier-spots-537272.framer.app ...');
  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2', timeout: 30000 });

  // Ensure docs directories exist
  fs.mkdirSync('docs/research/helena-marsh', { recursive: true });
  fs.mkdirSync('docs/design-references', { recursive: true });

  // Take desktop screenshot
  await page.screenshot({ path: 'docs/design-references/desktop-home.png', fullPage: true });
  console.log('Saved docs/design-references/desktop-home.png');

  // Mobile screenshot
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'docs/design-references/mobile-home.png', fullPage: true });
  console.log('Saved docs/design-references/mobile-home.png');

  await browser.close();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
