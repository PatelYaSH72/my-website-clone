import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectWhoDetails() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2', timeout: 30000 });

  const whoInfo = await page.evaluate(() => {
    const who = document.querySelector('[data-framer-name="Who"]');
    if (!who) return 'Who not found';
    const firstRow = who.querySelector('a, [data-framer-name*="Row"]');
    const title = firstRow ? firstRow.querySelector('[data-framer-name="Title"], h3, span') : null;
    return {
      whoBackground: window.getComputedStyle(who).backgroundColor,
      parentBackground: window.getComputedStyle(who.parentElement).backgroundColor,
      firstRowColor: firstRow ? window.getComputedStyle(firstRow).color : null,
      titleColor: title ? window.getComputedStyle(title).color : null,
      outerHTMLSnippet: who.outerHTML.slice(0, 800)
    };
  });

  console.log('Who Details:', whoInfo);

  await browser.close();
}

inspectWhoDetails().catch(console.error);
