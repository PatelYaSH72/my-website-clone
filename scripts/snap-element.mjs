import puppeteer from 'puppeteer-core';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const el = await page.$('#about');
  console.log('El exists:', !!el);
  if (el) {
    await el.scrollIntoView();
    await new Promise(r => setTimeout(r, 1200));
    await el.screenshot({ path: 'C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/verification_results/about_meet_fenil_element.png' });
    console.log('Saved #about element screenshot!');
  }
  await browser.close();
}

run().catch(console.error);
