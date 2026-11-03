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

  // Get full HTML of body with formatted indentation or clean components
  const pageDetails = await page.evaluate(() => {
    function inspectElement(selector) {
      const el = document.querySelector(selector);
      if (!el) return null;
      return {
        html: el.outerHTML,
        text: el.innerText
      };
    }

    // Check header styles
    const header = document.querySelector('header, [data-framer-name="Site Header"]');
    const headerStyle = header ? window.getComputedStyle(header) : null;
    const headerFixed = headerStyle ? {
      position: headerStyle.position,
      top: headerStyle.top,
      zIndex: headerStyle.zIndex,
      background: headerStyle.backgroundColor,
      backdropFilter: headerStyle.backdropFilter
    } : null;

    // Check FAQ items
    const faqItems = Array.from(document.querySelectorAll('[data-framer-name="FAQ Item"]')).map(item => ({
      question: item.querySelector('[data-framer-name="Question"]')?.innerText?.trim() || item.innerText.split('\n')[0],
      answer: item.querySelector('[data-framer-name="Answer"], p')?.innerText?.trim() || ''
    }));

    // Check client ticker names
    const clients = Array.from(document.querySelectorAll('[data-framer-name="Client"]')).map(c => c.innerText.trim()).filter(Boolean);

    // Headline breakdown (h1)
    const h1 = document.querySelector('h1');
    const h1HTML = h1 ? h1.outerHTML : '';

    return {
      headerFixed,
      faqItems,
      clients: Array.from(new Set(clients)),
      h1HTML
    };
  });

  console.log('Header style:', pageDetails.headerFixed);
  console.log('H1 HTML:', pageDetails.h1HTML);
  console.log('FAQ items count:', pageDetails.faqItems.length);
  console.log('Clients count:', pageDetails.clients.length, pageDetails.clients);

  fs.writeFileSync('docs/research/helena-marsh/page-details.json', JSON.stringify(pageDetails, null, 2));

  await browser.close();
}

main().catch(console.error);
