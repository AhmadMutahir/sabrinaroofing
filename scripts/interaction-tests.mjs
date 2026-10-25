import { chromium } from "playwright";
const url = `http://127.0.0.1:${process.env.PORT || 3100}/`;
const browser = await chromium.launch();

// 1) mobile menu open + language toggle
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(4500);
await page.click(".burger");
await page.waitForTimeout(600);
await page.screenshot({ path: "shots/mobile-menu.png" });
const menuItems = await page.$$eval(".mobile-menu a", (els) => els.map((e) => e.textContent?.trim()));
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
const menuClosed = await page.$(".mobile-menu") === null;

// switch to Spanish
await page.click('.lang__btn:nth-child(2)');
await page.waitForTimeout(900);
const es = await page.evaluate(() => ({
  h1: document.querySelector(".hero__h1")?.textContent,
  tagline: document.querySelector(".hero__tagline")?.textContent,
  cta: document.querySelector(".cta-ghost--desktop")?.textContent,
  lang: document.documentElement.lang,
  heading: document.querySelector(".latest__heading")?.textContent,
}));
await page.screenshot({ path: "shots/mobile-es.png" });
console.log("menu items:", menuItems, "| closed on Esc:", menuClosed);
console.log("spanish:", JSON.stringify(es));

// 2) keyboard focus + tab order on desktop
const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page2.goto(url, { waitUntil: "networkidle" });
await page2.waitForTimeout(3000);
const order = [];
for (let i = 0; i < 12; i++) {
  await page2.keyboard.press("Tab");
  order.push(await page2.evaluate(() => {
    const el = document.activeElement;
    return el ? `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : ""}:${(el.textContent || "").trim().slice(0, 22)}` : "none";
  }));
}
console.log("tab order:", JSON.stringify(order, null, 1));

// 3) progress bar click seeks the video
const before = await page2.evaluate(() => document.querySelector("video").currentTime);
await page2.click(".bars .bar:nth-child(4)");
await page2.waitForTimeout(500);
const after = await page2.evaluate(() => ({ t: document.querySelector("video").currentTime, active: document.querySelectorAll(".bar.is-active").length, idx: [...document.querySelectorAll(".bar")].findIndex(b => b.classList.contains("is-active")) }));
console.log("seek:", { before: before.toFixed(2), after });

// 4) reduced motion: everything visible immediately
const page3 = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await page3.goto(url, { waitUntil: "networkidle" });
await page3.waitForTimeout(700);
const rm = await page3.evaluate(() => {
  const w = [...document.querySelectorAll(".hero__h1 .word")].map((el) => +getComputedStyle(el).opacity);
  return { words: w.length, minOpacity: Math.min(...w), house: getComputedStyle(document.querySelector(".hero__house")).opacity };
});
console.log("reduced motion:", JSON.stringify(rm));
await browser.close();
