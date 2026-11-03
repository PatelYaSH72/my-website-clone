import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testWhoHover() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

  // Find Who section position
  const whoPosition = await page.evaluate(() => {
    const el = document.getElementById('who');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.offsetHeight };
  });

  console.log('Who Section:', whoPosition);

  // Scroll to Who section so rows are in middle of screen
  await page.evaluate(y => window.scrollTo(0, y + 100), whoPosition.top);
  await new Promise(r => setTimeout(r, 400));

  // Find row 2 element and hover it
  const row2Box = await page.evaluate(() => {
    const rows = document.querySelectorAll('#who a');
    if (rows.length < 2) return null;
    const r = rows[1].getBoundingClientRect();
    return { x: r.left + r.width * 0.45, y: r.top + r.height * 0.5 };
  });

  if (row2Box) {
    console.log('Hovering row 2 (First-time CEOs) at:', row2Box);
    await page.mouse.move(row2Box.x, row2Box.y);
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'docs/design-references/local/who-hover-ceo.png' });
    console.log('Saved who-hover-ceo.png');
  }

  // Find row 4 element and hover it
  const row4Box = await page.evaluate(() => {
    const rows = document.querySelectorAll('#who a');
    if (rows.length < 4) return null;
    const r = rows[3].getBoundingClientRect();
    return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.5 };
  });

  if (row4Box) {
    console.log('Hovering row 4 (Leadership teams) at:', row4Box);
    await page.mouse.move(row4Box.x, row4Box.y);
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'docs/design-references/local/who-hover-leadership.png' });
    console.log('Saved who-hover-leadership.png');
  }

  await browser.close();
}

testWhoHover().catch(console.error);
