import puppeteer from "puppeteer-core";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\a21e5187-a74c-44e4-baae-8a40b3896114\\verification_results";

async function testOverlapAndErrors() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();

  const consoleLogs = [];
  const pageErrors = [];

  page.on("console", (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on("pageerror", (err) => {
    pageErrors.push(err.toString());
  });

  console.log("Loading http://localhost:3000/ ...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1500));

  const pos = await page.evaluate(() => {
    const v = document.getElementById("voices");
    const a = document.getElementById("about");
    const vRect = v ? v.getBoundingClientRect() : null;
    const aRect = a ? a.getBoundingClientRect() : null;
    return {
      vTop: vRect ? vRect.top + window.scrollY : null,
      vHeight: v ? v.offsetHeight : null,
      aTop: aRect ? aRect.top + window.scrollY : null,
    };
  });
  console.log("Section positions:", pos);

  // Take screenshot inside voices (all cards stacked)
  const midVoices = pos.vTop + pos.vHeight - 700;
  await page.evaluate((y) => window.scrollTo(0, y), midVoices);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, "voices_stacked_clean.png") });
  console.log("Captured voices_stacked_clean.png at scrollY", midVoices);

  // Take screenshot right between voices and about (where voices leaves and about starts)
  const transitionPoint = pos.aTop - 200;
  await page.evaluate((y) => window.scrollTo(0, y), transitionPoint);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, "transition_voices_to_about.png") });
  console.log("Captured transition_voices_to_about.png at scrollY", transitionPoint);

  // Take screenshot right at start of about (about pins cleanly)
  await page.evaluate((y) => window.scrollTo(0, y), pos.aTop);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, "about_pinned_clean.png") });
  console.log("Captured about_pinned_clean.png at scrollY", pos.aTop);

  console.log("\n=== CONSOLE LOGS & ERRORS ===");
  console.log("Page Errors:", pageErrors);
  const errorOrWarnLogs = consoleLogs.filter(l => l.type === "error" || l.type === "warning");
  console.log("Console Errors & Warnings:", errorOrWarnLogs);

  await browser.close();
}

testOverlapAndErrors();
