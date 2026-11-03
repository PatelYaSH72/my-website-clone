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

  const evidenceDetails = await page.evaluate(() => {
    // find element containing "Measured by the people around you"
    const all = Array.from(document.querySelectorAll('*'));
    const heading = all.find(el => el.textContent && el.textContent.includes('Measured by the people around you') && (el.tagName === 'H2' || el.tagName === 'H1' || el.children.length < 5));
    if (!heading) return 'heading not found';

    // walk up parents
    let cur = heading;
    const parents = [];
    while (cur && cur !== document.body) {
      const style = window.getComputedStyle(cur);
      parents.push({
        tag: cur.tagName,
        className: cur.className,
        position: style.position,
        top: style.top,
        overflow: style.overflow,
        display: style.display,
        clipPath: style.clipPath,
      });
      cur = cur.parentElement;
    }
    return parents;
  });

  console.log('Original Framer Evidence structure:', JSON.stringify(evidenceDetails, null, 2));

  await browser.close();
})();
