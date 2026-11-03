import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\a21e5187-a74c-44e4-baae-8a40b3896114\\ca_verification";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Screenshot 1: Hero
  await page.screenshot({ path: path.join(OUTPUT_DIR, "01_hero_desktop.png") });
  console.log("Saved 01_hero_desktop.png");

  // Scroll down to manifesto & who
  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "02_who_manifesto.png") });
  console.log("Saved 02_who_manifesto.png");

  // Scroll to results & about
  await page.evaluate(() => window.scrollBy(0, 2200));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "03_results.png") });
  console.log("Saved 03_results.png");

  await page.evaluate(() => window.scrollBy(0, 1600));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "04_about_arch.png") });
  console.log("Saved 04_about_arch.png");

  // Book page
  await page.goto("http://localhost:3000/book", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "05_book_page.png") });
  console.log("Saved 05_book_page.png");

  // Mobile viewport
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "06_mobile_hero.png") });
  console.log("Saved 06_mobile_hero.png");

  await browser.close();
  console.log("All screenshots captured successfully!");
}

verify().catch(console.error);
