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

  // 1. Snapshot Hero Option C
  const heroShot = path.join(ARTIFACTS_DIR, 'hero_option_c_glass_monolith.png');
  await page.screenshot({ path: heroShot, clip: { x: 0, y: 0, width: 1440, height: 960 } });
  console.log('Saved Hero Option C screenshot:', heroShot);

  // 2. Scroll to #about section to snapshot Meet Fenil
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1200));

  const aboutShot = path.join(ARTIFACTS_DIR, 'about_meet_fenil_restored.png');
  await page.screenshot({ path: aboutShot, clip: { x: 0, y: 0, width: 1440, height: 960 } });
  console.log('Saved About Meet Fenil screenshot:', aboutShot);

  await browser.close();
  console.log('Screenshots completed successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
