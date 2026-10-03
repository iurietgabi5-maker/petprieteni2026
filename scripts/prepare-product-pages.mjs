import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { products } from "../src/products.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "client");
const template = await readFile(path.join(output, "index.html"), "utf8");
const escapeHtml = (value) => value.replace(/[&<>"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
}[character]));

for (const product of products) {
  const title = `${product.name} | PetPrieteni`;
  const description = `${product.name} — ${product.details}. Descoperă produsul și comandă simplu de la PetPrieteni.`;
  const page = template
    .replace(/<title>[^<]*<\\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  const directory = path.join(output, "produse", product.id);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), page);
}

console.log(`Generated ${products.length} individual product pages.`);
