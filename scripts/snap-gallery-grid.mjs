import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ARTIFACTS_DIR = "C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/verification_results";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 960 },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:3000/gallery", { waitUntil: "networkidle2" });

  // Scroll down so the gallery items enter viewport
  await page.evaluate(() => {
    window.scrollTo({ top: 900, behavior: "instant" });
  });

  // Give entrance animation time to unmask
  await new Promise((r) => setTimeout(r, 1600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "gallery_grid_in_view.png") });

  // Scroll slightly further down to see all 3 rows
  await page.evaluate(() => {
    window.scrollTo({ top: 1350, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "gallery_grid_rows_2_3.png") });

  await browser.close();
  console.log("Snapshots captured!");
}

run().catch(console.error);
