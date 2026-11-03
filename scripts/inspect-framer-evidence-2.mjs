import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2' });

  const evidence = await page.evaluate(() => {
    const textEls = Array.from(document.querySelectorAll('h1, h2, h3, p, span, div')).filter(el => 
      el.textContent && (el.textContent.includes('EVIDENCE') || el.textContent.includes('Measured by'))
    );
    return textEls.slice(0, 5).map(el => {
      let p = el;
      const chain = [];
      while (p && p !== document.body && chain.length < 8) {
        const s = window.getComputedStyle(p);
        chain.push({
          tag: p.tagName,
          position: s.position,
          top: s.top,
          display: s.display,
          transform: s.transform,
          overflow: s.overflow,
          classList: Array.from(p.classList)
        });
        p = p.parentElement;
      }
      return { text: el.textContent.trim().slice(0, 40), chain };
    });
  });

  console.log('Result:', JSON.stringify(evidence, null, 2));
  await browser.close();
})();
