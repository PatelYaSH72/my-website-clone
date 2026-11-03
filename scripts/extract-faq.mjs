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

  // Click on all FAQ items to open them and read answers
  const faqList = await page.evaluate(async () => {
    const items = Array.from(document.querySelectorAll('[data-framer-name="FAQ Item"]'));
    const results = [];

    for (const item of items) {
      // Find question text
      const q = item.querySelector('[data-framer-name="Question"]')?.innerText?.trim() || item.querySelector('h3')?.innerText?.trim() || '';
      // Click item to toggle open
      item.click();
      await new Promise(r => setTimeout(r, 200));

      const a = item.querySelector('[data-framer-name="Answer"]')?.innerText?.trim() || 
                Array.from(item.querySelectorAll('p')).map(p => p.innerText.trim()).filter(p => p !== q).join('\n\n');
      
      results.push({ question: q, answer: a });
    }

    return results;
  });

  console.log(JSON.stringify(faqList, null, 2));
  fs.writeFileSync('docs/research/helena-marsh/faq.json', JSON.stringify(faqList, null, 2));

  await browser.close();
}

main().catch(console.error);
