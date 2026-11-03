import puppeteer from 'puppeteer-core';
import fs from 'fs';
import http from 'http';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const VIDEO_PATH = 'C:/Users/DELL/.gemini/antigravity/brain/a21e5187-a74c-44e4-baae-8a40b3896114/.user_uploaded/media_1793643741033_7cfeb96c.mp4';
const OUT_DIR = 'docs/research/helena-marsh/user-video-2-frames';

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
          <body style="margin: 0; background: #111; display: flex; align-items: center; justify-content: center; height: 100vh;">
            <video id="v" src="/video.mp4" playsinline muted style="width: 100vw; height: 100vh; object-fit: contain;"></video>
          </body>
        </html>
      `);
    }
  });

  await new Promise(resolve => server.listen(8090, resolve));
  console.log('Video server listening on http://localhost:8090');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:8090', { waitUntil: 'domcontentloaded' });

  const duration = await page.evaluate(async () => {
    const v = document.getElementById('v');
    return new Promise(resolve => {
      if (v.duration) return resolve(v.duration);
      v.onloadedmetadata = () => resolve(v.duration);
    });
  });

  console.log('Video duration:', duration);

  const step = 0.5;
  for (let t = 0; t <= duration; t += step) {
    await page.evaluate(async (time) => {
      const v = document.getElementById('v');
      v.currentTime = time;
      await new Promise(r => {
        v.onseeked = () => r();
      });
    }, t);
    const filename = path.join(OUT_DIR, `frame-${t.toFixed(1)}s.png`);
    await page.screenshot({ path: filename });
    console.log(`Saved ${filename}`);
  }

  await browser.close();
  server.close();
  console.log('Done extracting frames from video 2!');
}

extractVideoFrames().catch(console.error);
