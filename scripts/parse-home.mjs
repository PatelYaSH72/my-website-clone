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

  const homeData = await page.evaluate(() => {
    function getTexts(selector) {
      return Array.from(document.querySelectorAll(selector)).map(el => el.innerText.trim()).filter(Boolean);
    }

    // Hero
    const hero = {
      intake: document.querySelector('[data-framer-name="Intake"]')?.innerText?.trim() || '',
      h1: document.querySelector('h1')?.innerText?.trim() || '',
      subtitle: document.querySelector('[data-framer-name="Hero Copy"] p')?.innerText?.trim() || '',
      stats: Array.from(document.querySelectorAll('[data-framer-name="Stat"]')).map(s => ({
        number: s.querySelector('h2, [data-framer-name="Number"], div')?.innerText?.trim() || '',
        label: s.querySelector('p, [data-framer-name="Label"], span')?.innerText?.trim() || ''
      })),
      quotes: Array.from(document.querySelectorAll('[data-framer-name="Quote Item"]')).map(q => ({
        quote: q.querySelector('[data-framer-name="Quote"]')?.innerText?.trim() || '',
        name: q.querySelector('[data-framer-name="Name"]')?.innerText?.trim() || '',
        role: q.querySelector('[data-framer-name="Role"]')?.innerText?.trim() || ''
      }))
    };

    // Clients
    const clients = Array.from(document.querySelectorAll('[data-framer-name="Client"]')).map(c => c.innerText.trim());

    // Manifesto
    const manifesto = {
      statement: document.querySelector('[data-framer-name="Manifesto"] [data-framer-name="Statement"]')?.innerText?.trim() || '',
      heading: document.querySelector('[data-framer-name="Manifesto"] [data-framer-name="Heading"]')?.innerText?.trim() || '',
      wipeCopy: document.querySelector('[data-framer-name="Manifesto"] [data-framer-name="Wipe Copy"]')?.innerText?.trim() || ''
    };

    // Who
    const who = {
      heading: document.querySelector('[data-framer-name="Who"] [data-framer-name="Heading"]')?.innerText?.trim() || '',
      rows: Array.from(document.querySelectorAll('[data-framer-name="Who Row"]')).map(r => ({
        num: r.querySelector('[data-framer-name="Number"]')?.innerText?.trim() || '',
        title: r.querySelector('[data-framer-name="Title"]')?.innerText?.trim() || '',
        line: r.querySelector('[data-framer-name="Line"]')?.innerText?.trim() || '',
        img: r.querySelector('img')?.src || ''
      })),
      foot: document.querySelector('[data-framer-name="Who Foot"]')?.innerText?.trim() || ''
    };

    // Method
    const method = {
      head: document.querySelector('[data-framer-name="Method"] [data-framer-name="Head"]')?.innerText?.trim() || '',
      steps: Array.from(document.querySelectorAll('[data-framer-name="Method Step"]')).map(s => ({
        number: s.querySelector('[data-framer-name="Big Number"]')?.innerText?.trim() || '',
        title: s.querySelector('h3, [data-framer-name="Title"]')?.innerText?.trim() || '',
        desc: s.querySelector('p, [data-framer-name="Text"]')?.innerText?.trim() || ''
      })),
      photos: Array.from(document.querySelectorAll('[data-framer-name="Method"] [data-framer-name="Photos (CMS · Method)"] img')).map(i => i.src)
    };

    // Programs
    const programs = {
      head: document.querySelector('[data-framer-name="Programs Head"]')?.innerText?.trim() || '',
      cards: Array.from(document.querySelectorAll('[data-framer-name="Program Card"]')).map(c => ({
        title: c.querySelector('h3, [data-framer-name="Title"]')?.innerText?.trim() || '',
        badge: c.querySelector('[data-framer-name="Badge"]')?.innerText?.trim() || '',
        desc: c.querySelector('[data-framer-name="Description"]')?.innerText?.trim() || '',
        price: c.querySelector('[data-framer-name="Price"]')?.innerText?.trim() || '',
        duration: c.querySelector('[data-framer-name="Duration"]')?.innerText?.trim() || '',
        includes: Array.from(c.querySelectorAll('[data-framer-name="Includes"] li, [data-framer-name="Includes"] p')).map(li => li.innerText.trim()).filter(Boolean),
        link: c.querySelector('a')?.href || ''
      }))
    };

    // Results
    const results = {
      title: document.querySelector('[data-framer-name="Results Side"] h2')?.innerText?.trim() || '',
      subtitle: document.querySelector('[data-framer-name="Results Side"] p')?.innerText?.trim() || '',
      stats: Array.from(document.querySelectorAll('[data-framer-name="Number Row"]')).map(n => ({
        value: n.querySelector('[data-framer-name="Number"]')?.innerText?.trim() || '',
        label: n.querySelector('[data-framer-name="Label"]')?.innerText?.trim() || ''
      })),
      cases: Array.from(document.querySelectorAll('[data-framer-name="Result Card"]')).map(c => ({
        badge: c.querySelector('[data-framer-name="Badge"]')?.innerText?.trim() || '',
        title: c.querySelector('h3, [data-framer-name="Title"]')?.innerText?.trim() || '',
        story: c.querySelector('[data-framer-name="Story"]')?.innerText?.trim() || '',
        metrics: Array.from(c.querySelectorAll('[data-framer-name="Metrics"] [data-framer-name="Metric"]')).map(m => m.innerText.trim()),
        client: c.querySelector('[data-framer-name="Client"]')?.innerText?.trim() || ''
      }))
    };

    // Voices
    const voices = {
      title: document.querySelector('[data-framer-name="Voices Side"] h2')?.innerText?.trim() || '',
      subtitle: document.querySelector('[data-framer-name="Voices Side"] p')?.innerText?.trim() || '',
      cards: Array.from(document.querySelectorAll('[data-framer-name="Voice Card"]')).map(v => ({
        quote: v.querySelector('[data-framer-name="Quote"]')?.innerText?.trim() || '',
        name: v.querySelector('[data-framer-name="Name"]')?.innerText?.trim() || '',
        role: v.querySelector('[data-framer-name="Role"]')?.innerText?.trim() || '',
        company: v.querySelector('[data-framer-name="Company"]')?.innerText?.trim() || ''
      }))
    };

    // About
    const about = {
      unmaskTextLeft: document.querySelector('[data-framer-name="Word Left"]')?.innerText?.trim() || '',
      unmaskTextRight: document.querySelector('[data-framer-name="Word Right"]')?.innerText?.trim() || '',
      heading: document.querySelector('[data-framer-name="About Copy"] h2')?.innerText?.trim() || '',
      paragraphs: Array.from(document.querySelectorAll('[data-framer-name="About Copy"] p')).map(p => p.innerText.trim()),
      credentials: Array.from(document.querySelectorAll('[data-framer-name="Credentials"] li, [data-framer-name="Credentials"] span')).map(c => c.innerText.trim()).filter(Boolean)
    };

    // Insights
    const insights = {
      heading: document.querySelector('[data-framer-name="Insights"] h2')?.innerText?.trim() || '',
      cards: Array.from(document.querySelectorAll('[data-framer-name="Insight Card"]')).map(c => ({
        tag: c.querySelector('[data-framer-name="Tag"]')?.innerText?.trim() || '',
        date: c.querySelector('[data-framer-name="Date"]')?.innerText?.trim() || '',
        title: c.querySelector('h3, [data-framer-name="Title"]')?.innerText?.trim() || '',
        excerpt: c.querySelector('[data-framer-name="Excerpt"]')?.innerText?.trim() || '',
        img: c.querySelector('img')?.src || '',
        link: c.querySelector('a')?.href || ''
      }))
    };

    // FAQ
    const faq = {
      heading: document.querySelector('[data-framer-name="FAQ"] h2')?.innerText?.trim() || '',
      items: Array.from(document.querySelectorAll('[data-framer-name="FAQ Item"]')).map(f => ({
        q: f.querySelector('[data-framer-name="Question"]')?.innerText?.trim() || '',
        a: f.querySelector('[data-framer-name="Answer"]')?.innerText?.trim() || ''
      }))
    };

    // CTA
    const cta = {
      heading: document.querySelector('[data-framer-name="CTA Section"] h2')?.innerText?.trim() || '',
      text: document.querySelector('[data-framer-name="CTA Section"] [data-framer-name="Text"] p')?.innerText?.trim() || '',
      discText: document.querySelector('[data-framer-name="Disc"]')?.innerText?.trim() || ''
    };

    return {
      hero,
      clients: Array.from(new Set(clients)),
      manifesto,
      who,
      method,
      programs,
      results,
      voices,
      about,
      insights,
      faq,
      cta
    };
  });

  fs.writeFileSync('docs/research/helena-marsh/home-parsed.json', JSON.stringify(homeData, null, 2));
  console.log('Saved home-parsed.json successfully!');

  await browser.close();
}

main().catch(console.error);
