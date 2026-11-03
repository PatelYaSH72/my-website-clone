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
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  console.log("1. Snapshotting /blogs...");
  await page.goto("http://localhost:3000/blogs", { waitUntil: "networkidle2" });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "blogs_page_hero.png") });

  // Scroll down to the blog layout with sidebar
  await page.evaluate(() => {
    window.scrollTo({ top: 900, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "blogs_page_grid_sidebar.png") });

  console.log("2. Snapshotting homepage #blogs section...");
  await page.goto("http://localhost:3000/#blogs", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    const el = document.getElementById("blogs");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "home_blogs_section.png") });

  // Scroll slightly down to see recent & most viewed in full view
  await page.evaluate(() => {
    window.scrollBy({ top: 400, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "home_blogs_sidebar_view.png") });

  console.log("3. Snapshotting /blogs/promoter-debt-defense...");
  await page.goto("http://localhost:3000/blogs/promoter-debt-defense", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    window.scrollTo({ top: 700, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "blog_detail_with_sidebar.png") });

  console.log("Console errors:", errors);
  await browser.close();
  console.log("All blog verification screenshots saved!");
}

run().catch(console.error);
