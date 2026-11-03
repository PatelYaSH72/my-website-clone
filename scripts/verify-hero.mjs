import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACTS_DIR = "C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/verification_results";

async function run() {
  if (!fs.existsSync(ARTIFACTS_DIR)) fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  console.log('Navigating to homepage...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2200)); // wait for GSAP intro

  const defaultShot = path.join(ARTIFACTS_DIR, 'hero_option_b_refined_default.png');
  await page.screenshot({ path: defaultShot, clip: { x: 0, y: 0, width: 1440, height: 960 } });
  console.log('Saved Refined Option B default screenshot:', defaultShot);

  // Hover over the 4th slab (monolith slab 3 / index 3, which is in the right half over Fenil)
  const slabs = await page.$$('[data-bg-monolith]');
  console.log(`Found ${slabs.length} background monolith slabs`);
  if (slabs.length >= 4) {
    const box = await slabs[3].boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise(r => setTimeout(r, 800)); // wait for hover transition
    }
  }

  const hoverShot = path.join(ARTIFACTS_DIR, 'hero_option_b_refined_hover.png');
  await page.screenshot({ path: hoverShot, clip: { x: 0, y: 0, width: 1440, height: 960 } });
  console.log('Saved Refined Option B hover screenshot:', hoverShot);

  await browser.close();
  console.log('Hero Option B verification finished successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
