import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectWipeStructure() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2', timeout: 30000 });

  const wipeDetails = await page.evaluate(() => {
    const wipe = document.querySelector('[data-framer-name="Wipe"]');
    if (!wipe) return 'Wipe not found';
    return {
      className: wipe.className,
      style: wipe.getAttribute('style'),
      innerHTML: wipe.innerHTML.slice(0, 1500),
      parentClassName: wipe.parentElement.className,
      parentStyle: wipe.parentElement.getAttribute('style')
    };
  });

  console.log('Wipe Details:', wipeDetails);

  await browser.close();
}

inspectWipeStructure().catch(console.error);
