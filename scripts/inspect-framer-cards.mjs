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

  const cardDetails = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.framer-f51tix [data-framer-name="Card"], .framer-f51tix a, .framer-f51tix article')).map(c => {
      return {
        tag: c.tagName,
        text: c.textContent.trim().slice(0, 50),
      };
    });
    // Or let's query all images in framer-f51tix
    const images = Array.from(document.querySelectorAll('.framer-f51tix img')).map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.width,
      height: img.height,
      parentStyle: window.getComputedStyle(img.parentElement).borderRadius
    }));
    return { cardsCount: cards.length, images };
  });

  console.log('Cards & Images in Framer Evidence:', JSON.stringify(cardDetails, null, 2));
  await browser.close();
})();
