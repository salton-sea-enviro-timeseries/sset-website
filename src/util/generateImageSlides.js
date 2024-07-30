const fs = require("fs");
const path = require("path");

const slidesDir = path.join(process.cwd(), "public", "slides");
const outputFile = path.join(
  process.cwd(),
  "src",
  "components",
  "imageSlides",
  "images.ts"
);

const images = fs
  .readdirSync(slidesDir)
  .filter((file) => file.endsWith(".jpg"))
  .map((file) => ({
    src: `/slides/${file}`,
    alt: path.basename(file, path.extname(file)).replace(/[-_]/g, " ")
  }));

const fileContent = `export const images = ${JSON.stringify(images, null, 2)}`;

fs.writeFileSync(outputFile, fileContent);
console.log(`Generated ${outputFile}`);
