import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://easier-spots-537272.framer.app/', { waitUntil: 'networkidle2' });

  const headerDetails = await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Site Header Bar"]');
    const bar = el?.querySelector('[data-framer-name="Bar"]');
    const nav = el?.querySelector('[data-framer-name="Nav"]');
    const hire = el?.querySelector('[data-framer-name="Hire"]');

    function s(e) {
      if (!e) return null;
      const cs = window.getComputedStyle(e);
      return {
        tag: e.tagName,
        position: cs.position,
        top: cs.top,
        left: cs.left,
        width: cs.width,
        height: cs.height,
        padding: cs.padding,
        margin: cs.margin,
        display: cs.display,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        backgroundColor: cs.backgroundColor,
        borderRadius: cs.borderRadius,
        border: cs.border,
        boxShadow: cs.boxShadow,
        backdropFilter: cs.backdropFilter,
        color: cs.color
      };
    }

    return {
      headerBar: s(el),
      bar: s(bar),
      nav: s(nav),
      hire: s(hire)
    };
  });

  console.log(JSON.stringify(headerDetails, null, 2));

  await browser.close();
}

main().catch(console.error);
