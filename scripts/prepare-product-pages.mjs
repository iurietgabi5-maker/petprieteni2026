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
  let page = template;
  const titleStart = page.indexOf("<title>");
  const titleEnd = page.indexOf("</title>", titleStart) + "</title>".length;
  const descriptionStart = page.indexOf('<meta name="description"');
  const descriptionEnd = page.indexOf("/>", descriptionStart) + 2;
  if (titleStart < 0 || titleEnd < "</title>".length || descriptionStart < 0 || descriptionEnd < 2) {
    throw new Error("Could not find page metadata in the Vite HTML template.");
  }
  page = page.slice(0, titleStart) + `<title>${escapeHtml(title)}</title>` + page.slice(titleEnd);
  const nextDescriptionStart = page.indexOf('<meta name="description"');
  const nextDescriptionEnd = page.indexOf("/>", nextDescriptionStart) + 2;
  page = page.slice(0, nextDescriptionStart) + `<meta name="description" content="${escapeHtml(description)}" />` + page.slice(nextDescriptionEnd);
  const directory = path.join(output, "produse", product.id);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), page);
}

console.log(`Generated ${products.length} individual product pages.`);
