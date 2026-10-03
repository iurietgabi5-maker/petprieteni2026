import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = [
  "boxer-hero.webp",
  "cat-comfort.webp",
  "category-cats.webp",
  "category-clothes.webp",
  "category-food.webp",
  "category-toys.webp",
  "product-cat-food.webp",
  "product-dog-food.webp",
  "product-toy.webp",
  "product-treats.webp",
];

await mkdir(path.join(root, "public", "assets"), { recursive: true });
for (const asset of assets) {
  const target = path.join(root, "public", "assets", asset);
  const encodedPath = path.join(root, "asset-source", asset + ".b64");
  try {
    const encoded = await readFile(encodedPath, "utf8");
    await writeFile(target, Buffer.from(encoded.trim(), "base64"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    try {
      await access(target);
    } catch {
      throw new Error("Missing source for asset: " + asset);
    }
  }
}
