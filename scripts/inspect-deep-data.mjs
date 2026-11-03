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

  const data = await page.evaluate(() => {
    // Hero Stats
    const stats = Array.from(document.querySelectorAll('[data-framer-name="Stats"] [data-framer-name="Stat"]')).map(s => {
      const texts = Array.from(s.querySelectorAll('h2, p, span, div')).map(t => t.innerText.trim()).filter(Boolean);
      return {
        number: texts[0] || '',
        label: texts[1] || ''
      };
    });

    // Hero quotes
    const heroQuotes = Array.from(document.querySelectorAll('[data-framer-name="Quote Item"]')).map(q => ({
      quote: q.innerText.trim()
    }));

    // Method steps
    const methodSteps = Array.from(document.querySelectorAll('[data-framer-name="Method Step"]')).map(s => ({
      text: s.innerText.trim()
    }));

    // Results cases
    const cases = Array.from(document.querySelectorAll('[data-framer-name="Result Card"]')).map(c => ({
      text: c.innerText.trim()
    }));

    // Results stats
    const resultsStats = Array.from(document.querySelectorAll('[data-framer-name="Number Row"]')).map(r => ({
      text: r.innerText.trim()
    }));

    // Voices cards
    const voices = Array.from(document.querySelectorAll('[data-framer-name="Voice Card"]')).map(v => ({
      text: v.innerText.trim()
    }));

    // FAQ items
    const faq = Array.from(document.querySelectorAll('[data-framer-name="FAQ Item"]')).map(f => ({
      text: f.innerText.trim()
    }));

    // Insights cards
    const insights = Array.from(document.querySelectorAll('[data-framer-name="Insight Card"]')).map(i => ({
      text: i.innerText.trim(),
      link: i.querySelector('a')?.href || '',
      img: i.querySelector('img')?.src || ''
    }));

    return {
      stats,
      heroQuotes,
      methodSteps,
      resultsStats,
      cases,
      voices,
      faq,
      insights
    };
  });

  fs.writeFileSync('docs/research/helena-marsh/deep-components-data.json', JSON.stringify(data, null, 2));
  console.log('Saved deep-components-data.json');

  await browser.close();
}

main().catch(console.error);
