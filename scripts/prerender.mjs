// Etapa final do build: insere a página já renderizada dentro de dist/public/index.html.
// Executado automaticamente por "pnpm build" (ver package.json).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(root, "dist/public/index.html");
const serverEntry = path.join(root, "dist/server/entry-server.js");

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render("/");

let html = fs.readFileSync(htmlPath, "utf-8");
if (!html.includes("<!--app-html-->")) {
  throw new Error("Marcador <!--app-html--> não encontrado em index.html");
}
html = html.replace("<!--app-html-->", appHtml);

// Estilos embutidos na própria página: o navegador não precisa esperar um segundo arquivo para exibir o conteúdo.
const assetsDir = path.join(root, "dist/public/assets");
html = html.replace(/<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/, (_tag, file) => {
  const css = fs.readFileSync(path.join(assetsDir, file), "utf-8");
  return `<style>${css}</style>`;
});

// Pré-carrega as duas fontes usadas no primeiro trecho da página (apenas o alfabeto latino).
const fonts = fs
  .readdirSync(assetsDir)
  .filter(f => /^(inter|source-serif-4)-latin-wght-normal-.*\.woff2$/.test(f))
  .map(f => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`)
  .join("\n    ");
html = html.replace("</head>", `  ${fonts}\n  </head>`);

fs.writeFileSync(htmlPath, html);
fs.rmSync(path.join(root, "dist/server"), { recursive: true, force: true });

console.log(`Pré-renderização concluída (${(appHtml.length / 1024).toFixed(1)} KB de HTML).`);
