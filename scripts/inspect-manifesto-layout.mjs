import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectManifestoLayout() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2', timeout: 30000 });

  const layout = await page.evaluate(() => {
    const stage = document.querySelector('[data-framer-name="Manifesto Stage"]');
    const text = document.querySelector('[data-framer-name="Manifesto Text"]');
    const p1 = document.querySelector('[data-framer-name="Photo One"]');
    const p2 = document.querySelector('[data-framer-name="Photo Two"]');
    const wipe = document.querySelector('[data-framer-name="Wipe"]');

    const getProps = (el) => {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        className: el.className,
        position: s.position,
        width: s.width,
        height: s.height,
        left: s.left,
        right: s.right,
        top: s.top,
        bottom: s.bottom,
        maxWidth: s.maxWidth,
        padding: s.padding,
        display: s.display,
        zIndex: s.zIndex
      };
    };

    return {
      stage: getProps(stage),
      text: getProps(text),
      photoOne: getProps(p1),
      photoTwo: getProps(p2),
      wipe: getProps(wipe)
    };
  });

  console.log('Manifesto Layout:', JSON.stringify(layout, null, 2));

  await browser.close();
}

inspectManifestoLayout().catch(console.error);
