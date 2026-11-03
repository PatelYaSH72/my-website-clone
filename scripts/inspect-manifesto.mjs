import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectManifesto() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2', timeout: 30000 });

  const manifestoInfo = await page.evaluate(() => {
    // Look for elements with data-framer-name="Manifesto" or containing "What I believe"
    const el = document.querySelector('[data-framer-name="Manifesto"]') || 
               Array.from(document.querySelectorAll('*')).find(e => (e.textContent || '').includes('What I believe'));
    
    if (!el) return { error: 'Not found' };

    // Get images inside manifesto
    const images = Array.from(el.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      className: img.className,
      parentName: img.parentElement ? img.parentElement.getAttribute('data-framer-name') : ''
    }));

    // Get text and words
    const words = Array.from(el.querySelectorAll('.fx-w')).map(w => ({
      text: w.textContent,
      isAcc: w.classList.contains('is-acc')
    }));

    // Check wipe element
    const wipe = el.querySelector('[data-framer-name="Wipe"]');
    const wipeText = wipe ? wipe.textContent : '';

    return {
      outerHTML: el.outerHTML.slice(0, 3000),
      images,
      wordCount: words.length,
      sampleWords: words.slice(0, 20),
      hasWipe: !!wipe,
      wipeText: wipeText.slice(0, 200)
    };
  });

  console.log('Manifesto Info:', JSON.stringify(manifestoInfo, null, 2));

  // Let's also inspect how the scroll behaves on the target site by taking screenshots at different scroll offsets through the Manifesto section!
  fs.mkdirSync('docs/research/helena-marsh/manifesto-frames', { recursive: true });
  
  // Find Manifesto offset
  const manifestoRect = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Manifesto"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.offsetHeight };
  });

  console.log('Manifesto Rect:', manifestoRect);

  if (manifestoRect) {
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      const scrollY = manifestoRect.top + (manifestoRect.height * (i / steps));
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await new Promise(r => setTimeout(r, 200));
      await page.screenshot({ path: `docs/research/helena-marsh/manifesto-frames/step-${i}.png` });
      console.log(`Saved step-${i}.png at scrollY ${Math.round(scrollY)}`);
    }
  }

  await browser.close();
}

inspectManifesto().catch(console.error);
