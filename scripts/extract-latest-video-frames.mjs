import puppeteer from 'puppeteer-core';
import fs from 'fs';
import http from 'http';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const VIDEO_PATH = 'C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/.user_uploaded/media_1793704369215_c2dd0514.mp4';
const OUT_DIR = 'C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/latest_video_frames';

async function extractVideoFrames() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const stat = fs.statSync(VIDEO_PATH);

  const server = http.createServer((req, res) => {
    if (req.url === '/video.mp4') {
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(VIDEO_PATH, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        });
        file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': 'video/mp4',
        });
        fs.createReadStream(VIDEO_PATH).pipe(res);
      }
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
          <body style="margin: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh;">
            <video id="v" src="/video.mp4" playsinline muted autoplay style="width: 100vw; height: 100vh; object-fit: contain;"></video>
          </body>
        </html>
      `);
    }
  });

  await new Promise((resolve) => server.listen(8766, resolve));
  console.log("Serving video on port 8766...");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:8766', { waitUntil: "networkidle2" });

  const duration = await page.evaluate(async () => {
    const v = document.getElementById('v');
    if (v.readyState >= 1 && v.duration) return v.duration;
    return new Promise((resolve) => {
      v.onloadedmetadata = () => resolve(v.duration);
      setTimeout(() => resolve(v.duration || 5), 3000);
    });
  });

  console.log("Video duration:", duration);

  const count = Math.min(12, Math.max(4, Math.floor(duration * 1.5)));
  const interval = duration / count;

  for (let i = 0; i <= count; i++) {
    const time = Math.min(duration, i * interval);
    await page.evaluate((t) => {
      const v = document.getElementById('v');
      v.currentTime = t;
    }, time);

    await new Promise(r => setTimeout(r, 400));

    const frameName = `frame_${String(i).padStart(2, '0')}_${time.toFixed(1)}s.png`;
    const framePath = path.join(OUT_DIR, frameName);
    await page.screenshot({ path: framePath });
    console.log(`Saved ${frameName}`);
  }

  await browser.close();
  server.close();
  console.log("Done extracting frames!");
}

extractVideoFrames();
