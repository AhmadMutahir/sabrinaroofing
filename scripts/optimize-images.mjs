import sharp from "sharp";

const jobs = [
  { in: "assets/gen-roof-1.png", out: "public/images/project-1.webp" },
  { in: "assets/gen-roof-2.png", out: "public/images/project-2.webp" },
  { in: "assets/gen-roof-3.png", out: "public/images/project-3.webp" },
];

for (const j of jobs) {
  const img = sharp(j.in);
  const { hasAlpha, width, height } = await img.metadata();
  const flat = hasAlpha
    ? await img.flatten({ background: "#ffffff" }).toBuffer()
    : await img.toBuffer();
  await sharp(flat).webp({ quality: 76, effort: 6 }).toFile(j.out);
  const out = await sharp(j.out).metadata();
  console.log(j.out, `${width}x${height}`, "->", `${out.width}x${out.height}`, out.format);
}
