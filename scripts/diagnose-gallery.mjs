import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function diagnose() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 960 },
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:3000/gallery", { waitUntil: "networkidle2" });

  console.log("Scrolling by 600...");
  await page.evaluate(() => window.scrollBy(0, 600));
  await new Promise((r) => setTimeout(r, 500));

  console.log("Scrolling by another 400...");
  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise((r) => setTimeout(r, 1000));

  const info = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll(".group")).slice(2, 7);
    return cards.map((el) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        clipPath: style.clipPath,
        opacity: style.opacity,
        top: rect.top,
      };
    });
  });

  console.log("Card states after scroll:", JSON.stringify(info, null, 2));

  await browser.close();
}

diagnose().catch(console.error);
