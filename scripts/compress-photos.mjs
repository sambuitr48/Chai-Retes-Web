import { execSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const MAX_WIDTH = 1600;

const files = execSync(
  "git -c core.quotepath=off diff --name-only --diff-filter=AM HEAD~1 HEAD -- public/photos",
  { encoding: "utf8" },
)
  .split("\n")
  .map((f) => f.trim())
  .filter((f) => /\.(jpe?g|webp|png)$/i.test(f));

if (files.length === 0) {
  console.log("No hay imágenes nuevas en el último commit.");
  process.exit(0);
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

for (const file of files) {
  const original = await readFile(file);
  let pipeline = sharp(original)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (/\.jpe?g$/i.test(file)) pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
  else if (/\.webp$/i.test(file)) pipeline = pipeline.webp({ quality: 75 });
  else pipeline = pipeline.png({ compressionLevel: 9 });

  const compressed = await pipeline.toBuffer();

  if (compressed.length < original.length) {
    await writeFile(file, compressed);
    console.log(`${file}: ${kb(original.length)} -> ${kb(compressed.length)}`);
  } else {
    console.log(`${file}: sin cambios (ya estaba optimizada)`);
  }
}