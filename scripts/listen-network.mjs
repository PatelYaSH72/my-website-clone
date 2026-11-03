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
  const networkResponses = [];
  page.on('response', async res => {
    const url = res.url();
    if (url.endsWith('.mjs') || url.endsWith('.json') || url.includes('/sites/')) {
      try {
        const text = await res.text();
        networkResponses.push({ url, text });
      } catch (e) {}
    }
  });

  await page.goto('https://easier-spots-537272.framer.app/', { waitUntil: 'networkidle2' });

  // Click on the second FAQ item's toggle button specifically
  const answers = await page.evaluate(async () => {
    const faqRows = document.querySelectorAll('[data-framer-name="FAQ Item"]');
    const out = [];
    for (const item of faqRows) {
      const toggle = item.querySelector('[data-framer-name="Toggle"]') || item;
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await new Promise(r => setTimeout(r, 200));
      out.push({
        text: item.innerText,
        html: item.outerHTML
      });
    }
    return out;
  });

  fs.writeFileSync('docs/research/helena-marsh/clicked-faq.json', JSON.stringify(answers, null, 2));
  console.log('Saved clicked-faq.json');

  for (const nr of networkResponses) {
    if (nr.text.includes('Who pays') || nr.text.includes('mentoring') || nr.text.includes('therapy')) {
      console.log('Network hit:', nr.url);
      const idx = nr.text.indexOf('Who pays');
      if (idx !== -1) {
        console.log(nr.text.slice(Math.max(0, idx - 100), idx + 800));
      }
    }
  }

  await browser.close();
}

main().catch(console.error);
