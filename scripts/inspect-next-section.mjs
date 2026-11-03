import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectAfterManifesto() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2', timeout: 30000 });

  const nextSections = await page.evaluate(() => {
    const manifesto = document.querySelector('[data-framer-name="Manifesto"]');
    if (!manifesto) return 'Manifesto not found';
    
    // Check siblings or subsequent sections
    let curr = manifesto.nextElementSibling;
    const list = [];
    while (curr && list.length < 5) {
      list.push({
        tagName: curr.tagName,
        className: curr.className,
        framerName: curr.getAttribute('data-framer-name'),
        textSample: (curr.textContent || '').trim().slice(0, 100),
        style: curr.getAttribute('style')
      });
      curr = curr.nextElementSibling;
    }
    return list;
  });

  console.log('Sections following Manifesto:', nextSections);

  await browser.close();
}

inspectAfterManifesto().catch(console.error);
