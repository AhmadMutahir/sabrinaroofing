import { chromium } from "playwright";

const url = `http://127.0.0.1:${process.env.PORT || 3000}/`;
const browser = await chromium.launch();

const configs = [
  { name: "desktop", width: 1440, height: 900, full: true },
  { name: "desktop-hero", width: 1440, height: 900, full: false },
  { name: "laptop", width: 1280, height: 800, full: false },
  { name: "tablet", width: 834, height: 1112, full: false },
  { name: "tablet-portrait", width: 768, height: 1024, full: false },
  { name: "mobile", width: 390, height: 844, full: true },
  { name: "mobile-hero", width: 390, height: 844, full: false },
  { name: "mobile-sm", width: 360, height: 740, full: false },
];

for (const c of configs) {
  const page = await browser.newPage({ viewport: { width: c.width, height: c.height }, deviceScaleFactor: 1, isMobile: c.width < 500, hasTouch: c.width < 500 });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(5200);
  if (c.full) {
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.7;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 250));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1400);
  }
  await page.screenshot({ path: `shots/${c.name}.png`, fullPage: c.full });
  const m = await page.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    docH: document.documentElement.scrollHeight,
    video: (() => { const v = document.querySelector("video"); return v ? { paused: v.paused, ready: v.readyState, dur: v.duration || 0 } : null; })(),
  }));
  console.log(c.name, JSON.stringify(m), errors.length ? "ERRORS: " + errors.join(" || ") : "clean");
  await page.close();
}
await browser.close();
