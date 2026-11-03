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

  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2' });

  // Scroll smoothly down the page to trigger all reveals/lazy loads
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 1000);
        }
      }, 100);
    });
  });

  // Extract site info
  const siteData = await page.evaluate(() => {
    // Collect all computed styles of interest
    function getStyles(el) {
      const s = window.getComputedStyle(el);
      return {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color,
        backgroundColor: s.backgroundColor,
        padding: s.padding,
        margin: s.margin,
        gap: s.gap,
        display: s.display,
        flexDirection: s.flexDirection,
        justifyContent: s.justifyContent,
        alignItems: s.alignItems,
        maxWidth: s.maxWidth,
        border: s.border,
        borderRadius: s.borderRadius
      };
    }

    // Traverse root elements with data-framer-name
    const framerNodes = [];
    document.querySelectorAll('[data-framer-name]').forEach(el => {
      const name = el.getAttribute('data-framer-name');
      const rect = el.getBoundingClientRect();
      // only record significant containers
      if (rect.width > 200 && rect.height > 40) {
        framerNodes.push({
          name,
          tag: el.tagName,
          rect: { top: rect.top + window.scrollY, left: rect.left, width: rect.width, height: rect.height },
          styles: getStyles(el),
          textSnippet: el.innerText ? el.innerText.slice(0, 150).replace(/\n+/g, ' ') : ''
        });
      }
    });

    // Navigation
    const navLinks = Array.from(document.querySelectorAll('nav a, header a')).map(a => ({
      text: a.innerText.trim(),
      href: a.href,
      styles: getStyles(a)
    }));

    // Buttons
    const buttons = Array.from(document.querySelectorAll('a, button')).filter(el => {
      const s = window.getComputedStyle(el);
      return s.cursor === 'pointer' && (el.innerText.trim().length > 0) && (s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.borderWidth !== '0px');
    }).map(b => ({
      tag: b.tagName,
      text: b.innerText.trim().replace(/\n+/g, ' '),
      href: b.href || '',
      styles: getStyles(b)
    }));

    // All images
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      currentSrc: img.currentSrc,
      alt: img.alt,
      width: img.width,
      height: img.height,
      rect: img.getBoundingClientRect(),
      styles: getStyles(img)
    }));

    // Body styles
    const bodyStyles = getStyles(document.body);

    return {
      title: document.title,
      bodyStyles,
      framerNodes,
      navLinks,
      buttons,
      images
    };
  });

  fs.writeFileSync('docs/research/helena-marsh/home-inspection.json', JSON.stringify(siteData, null, 2));
  console.log('Inspection data written to docs/research/helena-marsh/home-inspection.json');
  console.log(`Found ${siteData.framerNodes.length} framer sections/nodes, ${siteData.images.length} images.`);

  await browser.close();
}

main().catch(console.error);
