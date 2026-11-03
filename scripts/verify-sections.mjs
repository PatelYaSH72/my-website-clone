import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\a21e5187-a74c-44e4-baae-8a40b3896114\\ca_verification";

async function verifySections() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to Evidence section
  await page.evaluate(() => {
    const el = document.querySelector("#evidence");
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "07_results_evidence.png") });

  // Scroll a bit more within Evidence to see cards
  await page.evaluate(() => window.scrollBy(0, 450));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "07_results_evidence_scrolled.png") });

  // Scroll into About section
  await page.evaluate(() => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "08_about_intro.png") });

  // Scroll down into About unmasked portrait
  await page.evaluate(() => window.scrollBy(0, 1200));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, "08_about_portrait.png") });

  await browser.close();
  console.log("Sections captured!");
}

verifySections().catch(console.error);
