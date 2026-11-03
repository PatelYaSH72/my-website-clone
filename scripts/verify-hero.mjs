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

  const heroShot = path.join(ARTIFACTS_DIR, 'hero_option_a_panoramic.png');
  await page.screenshot({ path: heroShot, clip: { x: 0, y: 0, width: 1440, height: 960 } });
  console.log('Saved Option A hero screenshot:', heroShot);

  // Test hovering the primary CTA button to verify spark cursor reaction
  const ctaBtn = await page.$('a[href="/book"]');
  if (ctaBtn) {
    await ctaBtn.hover();
    await new Promise(r => setTimeout(r, 600));
    const hoverShot = path.join(ARTIFACTS_DIR, 'hero_option_a_hover_cta.png');
    await page.screenshot({ path: hoverShot, clip: { x: 0, y: 0, width: 1440, height: 960 } });
    console.log('Saved Option A hover CTA screenshot:', hoverShot);
  }

  await browser.close();
  console.log('Hero Option A verification finished successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
