/*
Resize the main logo to common PWA/app icon sizes using sharp.
Run with `node scripts/generate-pwa-icons.js` from project root (ensure `sharp` is installed).
*/

import sharp from "sharp";
import path from "path";
import fs from "fs";

const src = path.resolve(process.cwd(), "src/assets/codemate-logo.png");
const outDir = path.resolve(process.cwd(), "public/icons");

async function make() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const sizes = [192, 512];
  for (const size of sizes) {
    const outFile = path.join(outDir, `icon-${size}x${size}.png`);
    await sharp(src)
      .resize(size, size, { fit: "contain" })
      .png({ quality: 100 })
      .toFile(outFile);
    console.log(`generated ${outFile}`);
  }

  // apple-touch-icon (180x180) is just a 180 png
  const apple = path.join(outDir, `apple-touch-icon.png`);
  await sharp(src)
    .resize(180, 180, { fit: "contain" })
    .png({ quality: 100 })
    .toFile(apple);
  console.log(`generated ${apple}`);
}

make().catch((err) => {
  console.error(err);
  process.exit(1);
});
