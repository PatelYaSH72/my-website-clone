import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\a21e5187-a74c-44e4-baae-8a40b3896114\\method_verification";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function verifyMethod() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to #method
  await page.evaluate(() => {
    const el = document.querySelector("#method");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "step_0.png") });

  // Scroll down a bit to see transition to Step 1
  await page.evaluate(() => window.scrollBy(0, 1100));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "step_1.png") });

  // Scroll down more to see Step 2
  await page.evaluate(() => window.scrollBy(0, 1200));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "step_2.png") });

  // Scroll down to Step 3
  await page.evaluate(() => window.scrollBy(0, 1200));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "step_3.png") });

  // Mobile test
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    const el = document.querySelector("#method");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "mobile_method.png") });

  await browser.close();
  console.log("Method verification captured!");
}

verifyMethod().catch(console.error);
