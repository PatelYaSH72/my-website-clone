import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACTS_DIR = "C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/verification_results";
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 960 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => {
    errors.push(`Page Error: ${err.message}`);
  });

  console.log("1. Testing /gallery...");
  await page.goto("http://localhost:3000/gallery", { waitUntil: "networkidle2" });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "gallery_hero.png") });

  // Scroll down to the 5-column gallery grid
  await page.evaluate(() => {
    window.scrollBy({ top: 850, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "gallery_5col_grid.png") });

  // Hover over center of the first card on the screen
  await page.mouse.move(200, 500);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "gallery_card_hover.png") });

  console.log("2. Testing /services...");
  await page.goto("http://localhost:3000/services", { waitUntil: "networkidle2" });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "services_hero.png") });

  // Scroll down through the 4 mandates
  await page.evaluate(() => {
    window.scrollBy({ top: 900, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "services_mandate_01_02.png") });

  await page.evaluate(() => {
    window.scrollBy({ top: 1200, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "services_mandate_03_04.png") });

  console.log("3. Testing homepage gallery section...");
  await page.goto("http://localhost:3000/#gallery", { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "home_gallery_section.png") });

  console.log("Console errors captured:", errors);
  await browser.close();
  console.log("All screenshots saved successfully!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
