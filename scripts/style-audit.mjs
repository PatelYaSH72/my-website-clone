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

  const styleAudit = await page.evaluate(() => {
    const results = [];
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, a, button, nav');

    for (const el of elements) {
      const s = window.getComputedStyle(el);
      const text = el.innerText?.trim();
      if (!text || text.length > 80 || text.includes('\n')) continue;
      results.push({
        tag: el.tagName,
        text,
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color,
        textTransform: s.textTransform
      });
    }

    // Collect distinct CSS variables from root
    const rootStyles = window.getComputedStyle(document.documentElement);
    const bodyStyles = window.getComputedStyle(document.body);

    return {
      bodyBg: bodyStyles.backgroundColor,
      bodyColor: bodyStyles.color,
      samples: results.slice(0, 50)
    };
  });

  fs.writeFileSync('docs/research/helena-marsh/style-audit.json', JSON.stringify(styleAudit, null, 2));
  console.log('Style audit done. Body bg:', styleAudit.bodyBg);

  await browser.close();
}

main().catch(console.error);
