import puppeteer from "puppeteer-core";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "C:\\Users\\DELL\\.gemini\\antigravity\\brain\\a21e5187-a74c-44e4-baae-8a40b3896114\\verification_results";

async function check() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
  await new Promise(r => setTimeout(r, 1200));

  const trueTop = await page.evaluate(() => {
    const el = document.getElementById("about");
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  });
  console.log("True about top is:", trueTop);

  // Position 1: scrollY = trueTop (start of pinned section)
  await page.evaluate((top) => window.scrollTo(0, top), trueTop);
  await new Promise(r => setTimeout(r, 800));
  const s1 = await page.evaluate(() => {
    const el = document.getElementById("about");
    const arch = el?.querySelector("div[style*='clip-path'], div[style*='clipPath']");
    const meet = Array.from(el.querySelectorAll("span")).find(s => s.textContent.trim() === "Meet");
    const fenil = Array.from(el.querySelectorAll("span")).find(s => s.textContent.trim() === "Fenil");
    return {
      archClip: arch ? arch.style.clipPath : null,
      meetOpacity: meet ? window.getComputedStyle(meet).opacity : null,
      fenilOpacity: fenil ? window.getComputedStyle(fenil).opacity : null,
    };
  });
  console.log("State 1:", s1);
  await page.screenshot({ path: path.join(outDir, "arch_step1_flanking.png") });

  // Position 2: scrollY = trueTop + 600 (midway through unmasking)
  await page.evaluate((top) => window.scrollTo(0, top + 600), trueTop);
  await new Promise(r => setTimeout(r, 800));
  const s2 = await page.evaluate(() => {
    const el = document.getElementById("about");
    const arch = el?.querySelector("div[style*='clip-path'], div[style*='clipPath']");
    return { archClip: arch ? arch.style.clipPath : null };
  });
  console.log("State 2:", s2);
  await page.screenshot({ path: path.join(outDir, "arch_step2_unmasking.png") });

  // Position 3: scrollY = trueTop + 1600 (bio reveal)
  await page.evaluate((top) => window.scrollTo(0, top + 1600), trueTop);
  await new Promise(r => setTimeout(r, 800));
  const s3 = await page.evaluate(() => {
    const el = document.getElementById("about");
    const bio = el?.querySelector(".z-20");
    return { bioOpacity: bio ? window.getComputedStyle(bio).opacity : null };
  });
  console.log("State 3:", s3);
  await page.screenshot({ path: path.join(outDir, "arch_step3_bio.png") });

  await browser.close();
}

check();
