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
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:3000/gallery", { waitUntil: "networkidle2" });

  await page.evaluate(() => {
    window.scrollTo({ top: 900, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Find the first gallery card container and hover it
  const card = await page.$(".group.flex.flex-col");
  if (card) {
    const box = await card.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({ path: path.join(ARTIFACTS_DIR, "gallery_hover_verified.png") });
    }
  }

  await browser.close();
  console.log("Hover screenshot captured!");
}

run().catch(console.error);
