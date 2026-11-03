import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACTS_DIR = "C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/verification_results";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Scroll to #about section directly
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1500));

  const shotPath = path.join(ARTIFACTS_DIR, 'about_meet_fenil_arch_view.png');
  await page.screenshot({ path: shotPath, clip: { x: 0, y: 0, width: 1440, height: 960 } });
  console.log('Saved:', shotPath);

  await browser.close();
}

run().catch(console.error);
