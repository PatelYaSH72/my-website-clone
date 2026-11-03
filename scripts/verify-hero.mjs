import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  const outDir = path.resolve('C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/verification_results');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2200)); // wait for GSAP intro

  const heroShot = path.join(outDir, 'hero_option1_voltage_slabs.png');
  await page.screenshot({ path: heroShot, clip: { x: 0, y: 0, width: 1440, height: 880 } });
  console.log('Saved default hero:', heroShot);

  // Hover over the central Core slab
  const slabs = await page.$$('[data-voltage-slab]');
  console.log('Found slabs:', slabs.length);
  if (slabs.length >= 4) {
    await slabs[3].hover();
    await new Promise(r => setTimeout(r, 700));
    const hoverShot = path.join(outDir, 'hero_option1_hover_core.png');
    await page.screenshot({ path: hoverShot, clip: { x: 0, y: 0, width: 1440, height: 880 } });
    console.log('Saved hover core hero:', hoverShot);
  }

  await browser.close();
  console.log('Done!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
