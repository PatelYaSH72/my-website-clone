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

  // 1. Verify /services Full-Page Hero with BRIGHT bottom slabs
  console.log('Verifying Services Page Hero (Bright)...');
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1800));

  const servicesShot = path.join(ARTIFACTS_DIR, 'services_full_page_hero_bright.png');
  await page.screenshot({ path: servicesShot, clip: { x: 0, y: 0, width: 1440, height: 960 } });
  console.log('Saved services bright hero screenshot:', servicesShot);

  // 2. Verify /coaching Full-Page Hero
  console.log('Verifying Coaching Page Hero (Bright)...');
  await page.goto('http://localhost:3000/coaching', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1800));

  const coachingShot = path.join(ARTIFACTS_DIR, 'coaching_full_page_hero_bright.png');
  await page.screenshot({ path: coachingShot, clip: { x: 0, y: 0, width: 1440, height: 960 } });
  console.log('Saved coaching bright hero screenshot:', coachingShot);

  // 3. Verify /about Page Full Hero
  console.log('Verifying About Page Hero...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1800));

  const aboutShot = path.join(ARTIFACTS_DIR, 'about_page_full_hero.png');
  await page.screenshot({ path: aboutShot, clip: { x: 0, y: 0, width: 1440, height: 960 } });
  console.log('Saved about page hero screenshot:', aboutShot);

  // 4. Verify Manifesto Transition Wipe on Home Page
  console.log('Verifying Manifesto Transition Wipe...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  // Find Manifesto section top offset and scroll to the wipe transition
  await page.evaluate(async () => {
    // Scroll smoothly to trigger GSAP ScrollTrigger calculations
    const manifesto = document.querySelector('section.bg-\\[\\#F3EFE6\\]');
    if (manifesto) {
      const rect = manifesto.getBoundingClientRect();
      const absTop = window.scrollY + rect.top;
      // Scroll to 80% through the manifesto section height
      const targetY = absTop + manifesto.offsetHeight * 0.76;
      window.scrollTo(0, targetY);
    } else {
      window.scrollTo(0, 3200);
    }
  });

  await new Promise(r => setTimeout(r, 1200));

  const manifestoShot = path.join(ARTIFACTS_DIR, 'manifesto_transition_wipe.png');
  await page.screenshot({ path: manifestoShot, fullPage: false });
  console.log('Saved manifesto transition wipe screenshot:', manifestoShot);

  await browser.close();
  console.log('All verifications finished!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
