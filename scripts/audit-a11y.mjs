import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const url = `http://127.0.0.1:${process.env.PORT || 3100}/`;
const browser = await chromium.launch();

for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
  console.log(`\n=== ${label}: ${results.violations.length} violations ===`);
  for (const v of results.violations) {
    console.log(`- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
    v.nodes.slice(0, 3).forEach((n) => console.log(`    ${n.target.join(" ")} :: ${(n.failureSummary || "").split("\n").slice(1, 3).join(" ")}`));
  }
  console.log("passes:", results.passes.length, "incomplete:", results.incomplete.length);
  results.incomplete.forEach((i) => console.log(`  ~ incomplete [${i.id}]: ${i.help} (${i.nodes.length})`));
  await context.close();
}
await browser.close();
