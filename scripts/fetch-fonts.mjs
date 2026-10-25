/**
 * Downloads the three display/body families (latin subset only) into
 * public/fonts/ so the build is self-hosted and makes no runtime request to
 * Google. Runs before `next build`; skips work if the files are already there.
 */
import { mkdir, access, writeFile } from "node:fs/promises";
import { join } from "node:path";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36";

const families = [
  { query: "Playfair+Display:wght@400;500", out: "playfair-latin.woff2" },
  { query: "Archivo:wght@400;500", out: "archivo-latin.woff2" },
  { query: "Manrope:wght@400;500", out: "manrope-latin.woff2" },
];

const dir = join(process.cwd(), "public", "fonts");

const exists = async (file) => {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
};

await mkdir(dir, { recursive: true });

for (const family of families) {
  const target = join(dir, family.out);
  if (await exists(target)) {
    console.log(`[fonts] ${family.out} already present`);
    continue;
  }

  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.query}&display=swap`,
    { headers: { "User-Agent": UA } },
  ).then((response) => response.text());

  // Keep only the latin block, matching the self-hosted setup used in the audit.
  const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([\s\S]*?)\}/g)];
  const latin = blocks.find(([, subset]) => subset === "latin");
  if (!latin) throw new Error(`[fonts] no latin subset for ${family.query}`);

  const url = latin[2].match(/url\((https:\/\/[^)]+)\)/)?.[1];
  if (!url) throw new Error(`[fonts] no woff2 url for ${family.query}`);

  const binary = Buffer.from(await fetch(url, { headers: { "User-Agent": UA } }).then((r) => r.arrayBuffer()));
  await writeFile(target, binary);
  console.log(`[fonts] ${family.out} (${(binary.length / 1024).toFixed(1)} KB)`);
}
