import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = path.resolve("C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/verification_results");

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 1440, height: 900 }
  });

  try {
    const page = await browser.newPage();

    console.log("Navigating to Home page...");
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    // 1. Home Meet Fenil Arch Initial State (Meet Fenil flanking the arch)
    const aboutTop = await page.evaluate(() => {
      const el = document.getElementById("about");
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return window.pageYOffset + rect.top;
    });

    console.log("About top:", aboutTop);
    await page.evaluate((top) => {
      window.scrollTo({ top: top, behavior: "instant" });
    }, aboutTop);
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, "03a_home_meet_fenil_arch_initial.png") });
    console.log("Captured 03a_home_meet_fenil_arch_initial.png");

    // Scroll halfway into about to see unmasking
    await page.evaluate((top) => {
      window.scrollTo({ top: top + 600, behavior: "instant" });
    }, aboutTop);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, "03b_home_meet_fenil_arch_unmasking.png") });
    console.log("Captured 03b_home_meet_fenil_arch_unmasking.png");

    // 2. Home Page Gallery Section
    const galleryTop = await page.evaluate(() => {
      const el = document.getElementById("gallery");
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return window.pageYOffset + rect.top;
    });
    console.log("Gallery top:", galleryTop);
    await page.evaluate((top) => {
      window.scrollTo({ top: top, behavior: "instant" });
    }, galleryTop);
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(outDir, "05_home_gallery_section.png") });
    console.log("Captured 05_home_gallery_section.png");

    console.log("All done!");
  } catch (err) {
    console.error("Puppeteer verification failed:", err);
  } finally {
    await browser.close();
  }
}

run();
