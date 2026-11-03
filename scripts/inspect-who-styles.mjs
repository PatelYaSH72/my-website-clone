import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectWhoStyles() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2', timeout: 30000 });

  const whoStyles = await page.evaluate(() => {
    const who = document.querySelector('[data-framer-name="Who"]');
    if (!who) return 'Who not found';
    const s = window.getComputedStyle(who);
    return {
      backgroundColor: s.backgroundColor,
      color: s.color,
      padding: s.padding,
      margin: s.margin,
      zIndex: s.zIndex,
      position: s.position,
      firstChildText: who.firstElementChild ? who.firstElementChild.textContent.slice(0, 150) : ''
    };
  });

  console.log('Who Section Styles:', whoStyles);

  await browser.close();
}

inspectWhoStyles().catch(console.error);
