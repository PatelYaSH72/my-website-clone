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
    const el = document.querySelector('.framer-f51tix');
    if (!el) return 'not found';
    const s = window.getComputedStyle(el);
    const children = Array.from(el.children).map(c => {
      const cs = window.getComputedStyle(c);
      return {
        tag: c.tagName,
        className: c.className,
        position: cs.position,
        top: cs.top,
        display: cs.display,
        width: cs.width,
        height: cs.height,
        transform: cs.transform,
        innerPreview: c.textContent.trim().slice(0, 60),
        childrenCount: c.children.length
      };
    });
    return {
      el: {
        display: s.display,
        position: s.position,
        clipPath: s.clipPath,
        overflow: s.overflow,
      },
      children
    };
  });

  console.log('F51tix info:', JSON.stringify(info, null, 2));
  await browser.close();
})();
