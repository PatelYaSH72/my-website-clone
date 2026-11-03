import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function auditAnimations() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to target site: https://easier-spots-537272.framer.app ...');
  await page.goto('https://easier-spots-537272.framer.app', { waitUntil: 'networkidle2', timeout: 30000 });

  const audit = await page.evaluate(async () => {
    const results = {
      stickyOrFixed: [],
      transitionsFound: [],
      framerMotionData: [],
      slicedHeroStructure: null,
      scrollObservation: []
    };

    // 1. Check all elements with position sticky or fixed
    document.querySelectorAll('*').forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.position === 'sticky' || style.position === 'fixed') {
        results.stickyOrFixed.push({
          tag: el.tagName,
          classes: el.className,
          position: style.position,
          top: style.top,
          id: el.id,
          textSample: (el.textContent || '').trim().slice(0, 40)
        });
      }
      
      // Check transitions
      if (style.transition && style.transition !== 'none' && !style.transition.includes('all 0s')) {
        results.transitionsFound.push({
          tag: el.tagName,
          transition: style.transition,
          text: (el.textContent || '').trim().slice(0, 30)
        });
      }
    });

    // 2. Check hero structure and image slices
    const hero = document.querySelector('header + section, section');
    if (hero) {
      const imgs = Array.from(hero.querySelectorAll('img')).map(img => ({
        src: img.src,
        className: img.className,
        parentClass: img.parentElement ? img.parentElement.className : '',
        parentStyle: img.parentElement ? img.parentElement.getAttribute('style') : ''
      }));
      results.slicedHeroStructure = {
        imgCount: imgs.length,
        imgs: imgs.slice(0, 8)
      };
    }

    return results;
  });

  console.log('Sticky / Fixed elements:', audit.stickyOrFixed);
  console.log('Sliced Hero structure:', audit.slicedHeroStructure);
  console.log('Number of transitions found:', audit.transitionsFound.length);
  console.log('Sample transitions:', audit.transitionsFound.slice(0, 10));

  // Now let's observe scroll animation behavior by scrolling down step by step and measuring transforms/opacities
  console.log('\n--- Observing Scroll-driven transformations ---');
  const scrollResults = await page.evaluate(async () => {
    const snapshots = [];
    const elementsToTrack = [
      { name: 'Nav Header', selector: 'header, nav, [data-framer-name*="Nav"], [data-framer-name*="Header"]' },
      { name: 'Hero H1', selector: 'h1' },
      { name: 'Hero Portrait', selector: 'img[alt*="Helena"], img[src*="portrait"], [data-framer-name*="Hero"] img' },
      { name: 'Method Section', selector: '[data-framer-name*="Method"], section:nth-of-type(4)' },
      { name: 'Sticky Method Image', selector: '[data-framer-name*="Method"] img, section:nth-of-type(4) img' }
    ];

    const getStates = () => {
      const s = {};
      elementsToTrack.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
          const comp = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          s[item.name] = {
            transform: comp.transform,
            opacity: comp.opacity,
            top: Math.round(rect.top),
            filter: comp.filter
          };
        }
      });
      return s;
    };

    snapshots.push({ scrollY: 0, state: getStates() });

    // Scroll to 300
    window.scrollTo(0, 300);
    await new Promise(r => setTimeout(r, 100));
    snapshots.push({ scrollY: 300, state: getStates() });

    // Scroll to 800
    window.scrollTo(0, 800);
    await new Promise(r => setTimeout(r, 100));
    snapshots.push({ scrollY: 800, state: getStates() });

    // Scroll to 1600
    window.scrollTo(0, 1600);
    await new Promise(r => setTimeout(r, 100));
    snapshots.push({ scrollY: 1600, state: getStates() });

    // Scroll to 2500
    window.scrollTo(0, 2500);
    await new Promise(r => setTimeout(r, 100));
    snapshots.push({ scrollY: 2500, state: getStates() });

    return snapshots;
  });

  console.log('Scroll snapshots:');
  console.dir(scrollResults, { depth: 4 });

  await browser.close();
}

auditAnimations().catch(console.error);
