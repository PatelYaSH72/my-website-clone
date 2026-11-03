import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verifyLocal() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

  fs.mkdirSync('docs/design-references/local/animations', { recursive: true });

  // 1. Check initial Hero
  await page.screenshot({ path: 'docs/design-references/local/animations/hero-initial.png' });
  console.log('Saved hero-initial.png');

  // 2. Find Manifesto position
  const manifestoRect = await page.evaluate(() => {
    const el = document.querySelector('section:nth-of-type(2), [data-framer-name="Manifesto"]') || 
               Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('What I believe'));
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.offsetHeight };
  });

  console.log('Manifesto Rect:', manifestoRect);

  if (manifestoRect) {
    // Step through Manifesto scroll
    for (let step = 0; step <= 5; step++) {
      const scrollY = manifestoRect.top + (manifestoRect.height * (step / 5));
      await page.evaluate(y => window.scrollTo(0, y), scrollY);
      await new Promise(r => setTimeout(r, 200));

      const stepData = await page.evaluate(() => {
        const words = Array.from(document.querySelectorAll('h2 span.inline-block'));
        const litWords = words.filter(w => (window.getComputedStyle(w).opacity > 0.5)).length;
        const wipe = document.querySelector('[style*="clip-path"], [style*="clipPath"]');
        return {
          totalWords: words.length,
          litWords,
          hasWipe: !!wipe
        };
      });

      console.log(`Step ${step} at scrollY ${Math.round(scrollY)}: ${stepData.litWords}/${stepData.totalWords} words lit`);
      await page.screenshot({ path: `docs/design-references/local/animations/manifesto-step-${step}.png` });
    }
  }

  // 3. Scroll through Method section
  const methodRect = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('Four moves'));
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.offsetHeight };
  });

  if (methodRect) {
    for (let step = 1; step <= 4; step++) {
      const scrollY = methodRect.top + (methodRect.height * (step / 4.5));
      await page.evaluate(y => window.scrollTo(0, y), scrollY);
      await new Promise(r => setTimeout(r, 200));
      await page.screenshot({ path: `docs/design-references/local/animations/method-step-${step}.png` });
    }
    console.log('Captured Method steps');
  }

  // 4. Test Mobile Viewport
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'docs/design-references/local/animations/mobile-home.png', fullPage: true });
  console.log('Saved mobile-home.png');

  // 5. Test Inner page
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/coaching', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'docs/design-references/local/animations/inner-coaching.png' });
  console.log('Saved inner-coaching.png');

  // 6. Test Article page
  await page.goto('http://localhost:3000/insights/the-meeting-after-the-meeting', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'docs/design-references/local/animations/inner-article.png' });
  console.log('Saved inner-article.png');

  console.log('\n--- VERIFICATION AUDIT ---');
  console.log('Console Errors logged during run:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach((err, idx) => console.log(`  [Error ${idx + 1}]:`, err));
  } else {
    console.log('No console errors or hydration mismatches detected!');
  }

  await browser.close();
}

verifyLocal().catch(console.error);
