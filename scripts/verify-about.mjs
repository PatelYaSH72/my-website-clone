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

  // Scroll to #about section
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 2000)); // wait for GSAP scroll trigger reveal

  const aboutShot = path.join(ARTIFACTS_DIR, 'about_section_default.png');
  const aboutEl = await page.$('#about');
  if (aboutEl) {
    await aboutEl.screenshot({ path: aboutShot });
    console.log('Saved default about section:', aboutShot);
  }

  // Hover over Pillar 2 (Fenil Shah face pillar: Capital Architecture)
  const pillars = await page.$$('[data-about-pillar]');
  console.log('Found about pillars:', pillars.length);
  if (pillars.length >= 3) {
    await pillars[2].hover();
    await new Promise(r => setTimeout(r, 800)); // wait for accordion transition
    const hoverShot = path.join(ARTIFACTS_DIR, 'about_section_hover_pillar.png');
    if (aboutEl) {
      await aboutEl.screenshot({ path: hoverShot });
      console.log('Saved hover about section:', hoverShot);
    }
  }

  await browser.close();
  console.log('About verification finished successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
