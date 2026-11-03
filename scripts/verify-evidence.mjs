import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('docs/design-references/local/evidence-verification');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Find evidence section position
  const evidencePos = await page.evaluate(() => {
    const el = document.getElementById('evidence');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      height: rect.height,
    };
  });

  console.log('Evidence section position:', evidencePos);

  if (evidencePos) {
    // Scroll to just above evidence
    const startY = Math.max(0, evidencePos.top - 200);
    const scrollSteps = 6;
    const stepSize = (evidencePos.height + 400) / scrollSteps;

    for (let i = 0; i <= scrollSteps; i++) {
      const scrollY = Math.round(startY + i * stepSize);
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await new Promise(r => setTimeout(r, 600));

      const info = await page.evaluate(() => {
        const leftCol = document.querySelector('#evidence [class*="lg:col-span-5"]');
        const container = document.getElementById('evidence');
        return {
          scrollY: window.scrollY,
          leftColRect: leftCol ? leftCol.getBoundingClientRect() : null,
          leftColStyle: leftCol ? leftCol.getAttribute('style') : null,
          containerRect: container ? container.getBoundingClientRect() : null,
        };
      });
      console.log(`Step ${i}: scrollY=${scrollY}`, info);

      await page.screenshot({
        path: path.join(outDir, `step_${i}_scroll_${scrollY}.png`),
        fullPage: false
      });
    }
  }

  // Also test mobile viewport 390x844
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));

  const mobileEvidence = await page.evaluate(() => {
    const el = document.getElementById('evidence');
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  });

  await page.evaluate((y) => window.scrollTo(0, y), mobileEvidence);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(outDir, 'mobile_evidence_top.png'),
    fullPage: false
  });

  await page.evaluate((y) => window.scrollTo(0, y + 400), mobileEvidence);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(outDir, 'mobile_evidence_scroll.png'),
    fullPage: false
  });

  console.log('Verification screenshots saved to', outDir);
  await browser.close();
})();
