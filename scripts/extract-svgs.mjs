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

  const svgs = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('svg').forEach((svg, index) => {
      const parent = svg.closest('[data-framer-name]')?.getAttribute('data-framer-name') || svg.parentElement?.tagName;
      results.push({
        index,
        parent,
        viewBox: svg.getAttribute('viewBox'),
        width: svg.getAttribute('width') || svg.clientWidth,
        height: svg.getAttribute('height') || svg.clientHeight,
        html: svg.outerHTML
      });
    });
    return results;
  });

  fs.writeFileSync('docs/research/helena-marsh/svgs.json', JSON.stringify(svgs, null, 2));
  console.log(`Saved ${svgs.length} SVGs to docs/research/helena-marsh/svgs.json`);

  await browser.close();
}

main().catch(console.error);
