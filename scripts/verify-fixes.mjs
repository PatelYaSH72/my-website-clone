import puppeteer from "puppeteer-core";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\a21e5187-a74c-44e4-baae-8a40b3896114\\verification_results";

async function verifyAllFixes() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  const consoleWarns = [];
  const pageErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
    if (msg.type() === "warning") consoleWarns.push(msg.text());
  });

  page.on("pageerror", (err) => {
    pageErrors.push(err.toString());
  });

  console.log("Loading http://localhost:3000/ ...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1500));

  // 1. Verify Method Section
  const methodPos = await page.evaluate(() => {
    const el = document.getElementById("method");
    const rect = el ? el.getBoundingClientRect() : null;
    return {
      top: rect ? rect.top + window.scrollY : 0,
      height: el ? el.offsetHeight : 0,
    };
  });
  console.log("Method Section Position:", methodPos);

  // Capture step 0
  await page.evaluate((y) => window.scrollTo(0, y + 200), methodPos.top);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "method_step_0.png") });

  // Capture step 3 (last step)
  const step3Scroll = methodPos.top + (methodPos.height - 900) * 0.78;
  await page.evaluate((y) => window.scrollTo(0, y), step3Scroll);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "method_step_3.png") });

  // Capture right after method unpins
  const afterMethodScroll = methodPos.top + methodPos.height + 100;
  await page.evaluate((y) => window.scrollTo(0, y), afterMethodScroll);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "method_after_unpin.png") });

  // 2. Verify VoicesSection -> AboutSection Transition (Zero overlap)
  const voicesAboutPos = await page.evaluate(() => {
    const v = document.getElementById("voices");
    const a = document.getElementById("about");
    const vRect = v ? v.getBoundingClientRect() : null;
    const aRect = a ? a.getBoundingClientRect() : null;
    return {
      vTop: vRect ? vRect.top + window.scrollY : 0,
      vHeight: v ? v.offsetHeight : 0,
      aTop: aRect ? aRect.top + window.scrollY : 0,
      // @ts-ignore
      aboutStart: window.__aboutStart,
      // @ts-ignore
      aboutEnd: window.__aboutEnd,
    };
  });
  console.log("Voices & About Positions:", voicesAboutPos);

  // Inside voices: all cards stacked, pure ivory background, no Fenil portrait bleed
  const insideVoicesY = voicesAboutPos.vTop + voicesAboutPos.vHeight - 500;
  await page.evaluate((y) => window.scrollTo(0, y), insideVoicesY);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "voices_stacked_no_bleed.png") });

  // Right as voices ends and about starts
  await page.evaluate((y) => window.scrollTo(0, y), voicesAboutPos.aTop);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "about_clean_start.png") });

  // Halfway through about (unmasking)
  await page.evaluate((y) => window.scrollTo(0, y + 800), voicesAboutPos.aTop);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, "about_clean_unmasking.png") });

  console.log("\n=== CONSOLE AUDIT ===");
  console.log("Page Errors:", pageErrors);
  console.log("Console Errors:", consoleErrors);
  console.log("Console Warnings:", consoleWarns);

  await browser.close();
}

verifyAllFixes();
