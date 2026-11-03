import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectFramerScripts() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Capture all script URLs and responses
  const scriptContents = [];
  page.on('response', async res => {
    const url = res.url();
    if (url.includes('framerusercontent.com') && url.endsWith('.js')) {
      try {
        const text = await res.text();
        scriptContents.push({ url, text });
      } catch (e) {}
    }
  });

  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2', timeout: 30000 });

  console.log(`Captured ${scriptContents.length} script files.`);

  // Search in captured scripts for transitions, variants, springs, easings
  const motionSnippets = [];
  for (const s of scriptContents) {
    const matches = s.text.match(/{[^{}]*duration[^{}]*ease[^{}]*}/g) || [];
    for (const m of matches) {
      if (motionSnippets.length < 30) {
        motionSnippets.push(m);
      }
    }
    // Also look for variants or initial/animate
    const variantMatches = s.text.match(/variants:\s*{[^}]+}/g) || [];
    for (const vm of variantMatches) {
      if (motionSnippets.length < 50) {
        motionSnippets.push(vm);
      }
    }
  }

  console.log('Sample Framer animation definitions found:');
  motionSnippets.slice(0, 15).forEach(snippet => console.log('---', snippet));

  // Let's also check CSS animations and transitions defined in style tags
  const styles = await page.evaluate(() => {
    const cssRules = [];
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        Array.from(sheet.cssRules || []).forEach(rule => {
          if (rule.cssText && (rule.cssText.includes('transition') || rule.cssText.includes('@keyframes'))) {
            cssRules.push(rule.cssText);
          }
        });
      } catch (e) {}
    });
    return cssRules.slice(0, 30);
  });

  console.log('\nKeyframe / transition rules count:', styles.length);
  styles.slice(0, 10).forEach(r => console.log('Style rule:', r.slice(0, 120)));

  await browser.close();
}

inspectFramerScripts().catch(console.error);
