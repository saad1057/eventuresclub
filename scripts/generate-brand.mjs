import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const brandDir = path.resolve("public/brand");
const ink = "#1A1714";
const paper = "#F4F0E8";
const copper = "#B56A3A";
const forest = "#2F3A2E";

function monogram({ stroke, ridge = copper, size = 64 }) {
  return `
    <g fill="none" stroke-linecap="square" stroke-linejoin="miter">
      <path d="M5 34 L16 20 L26 28.5 L39 15 L59 32" stroke="${ridge}" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M13 40 V57 M13 40 H28 M13 48.5 H24 M13 57 H28" stroke="${stroke}" stroke-width="2.15"/>
      <path d="M51 41.5 C42.6 41.5 37 45.6 37 49.2 C37 52.8 42.6 56.9 51 56.9" stroke="${stroke}" stroke-width="2.15" stroke-linecap="round"/>
    </g>`;
}

function wordmark(fill) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 72" role="img" aria-label="Eventures Club">
  <g transform="translate(4 4)">
    ${monogram({ stroke: fill })}
  </g>
  <text x="84" y="48" fill="${fill}" font-family="Palatino Linotype, Palatino, Georgia, serif" font-size="40">eventures</text>
  <text x="318" y="46" fill="${fill}" font-family="Palatino Linotype, Palatino, Georgia, serif" font-size="14" letter-spacing="3">CLUB</text>
</svg>`;
}

const icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Eventures Club">
  <rect width="64" height="64" fill="${forest}"/>
  ${monogram({ stroke: paper })}
</svg>`;

const iconPaper = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${paper}"/>
  ${monogram({ stroke: ink })}
</svg>`;

await mkdir(brandDir, { recursive: true });
const light = wordmark(ink);
const dark = wordmark(paper);
await writeFile(path.join(brandDir, "logo.svg"), light);
await writeFile(path.join(brandDir, "logo-dark.svg"), dark);
await writeFile(path.join(brandDir, "icon.svg"), icon);

const apple = await sharp(Buffer.from(icon)).resize(180, 180).png().toBuffer();
await writeFile(path.join(brandDir, "apple-touch-icon.png"), apple);
const png32 = await sharp(Buffer.from(icon)).resize(32, 32).png().toBuffer();
const png16 = await sharp(Buffer.from(icon)).resize(16, 16).png().toBuffer();
await writeFile(path.join(brandDir, "favicon-32.png"), png32);
const ico = await pngToIco([png16, png32]);
await writeFile(path.join(brandDir, "favicon.ico"), ico);
await writeFile(path.resolve("app/favicon.ico"), ico);

const heroPath = path.resolve("public/images/passu.jpg");
const fallback = path.resolve("public/images/rakaposhi.jpg");
let photoPath = heroPath;
try {
  await readFile(heroPath);
} catch {
  photoPath = fallback;
}

const photo = sharp(photoPath).resize(1200, 630, { fit: "cover", position: "centre" });
const darkLogo = await sharp(Buffer.from(dark)).resize({ height: 78 }).png().toBuffer();
const logoMeta = await sharp(darkLogo).metadata();
const gradient = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1A1714" stop-opacity="0.15"/>
      <stop offset="0.55" stop-color="#1A1714" stop-opacity="0.05"/>
      <stop offset="1" stop-color="#1A1714" stop-opacity="0.72"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
</svg>`);

await photo
  .composite([
    { input: gradient, top: 0, left: 0 },
    {
      input: darkLogo,
      top: 630 - (logoMeta.height || 78) - 56,
      left: 64,
    },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(brandDir, "og-default.jpg"));

await sharp(Buffer.from(iconPaper)).resize(64, 64).png().toFile(path.join(brandDir, "icon-paper.png"));
console.log("brand ready", light.length);
