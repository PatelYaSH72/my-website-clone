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

  const info = await page.evaluate(() => {
    const el = document.querySelector('.framer-f51tix .ssr-variant') || document.querySelector('.framer-f51tix');
    if (!el) return 'not found';
    
    // Look for sticky element inside
    const all = Array.from(el.querySelectorAll('*'));
    const stickyEls = all.filter(c => window.getComputedStyle(c).position === 'sticky');
    return stickyEls.map(s => {
      const cs = window.getComputedStyle(s);
      return {
        tag: s.tagName,
        className: s.className,
        position: cs.position,
        top: cs.top,
        text: s.textContent.trim().slice(0, 60)
      };
    });
  });

  console.log('Sticky elements inside evidence:', JSON.stringify(info, null, 2));
  await browser.close();
})();
