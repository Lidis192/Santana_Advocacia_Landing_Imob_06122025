// Etapa final do build: insere a página já renderizada dentro de dist/public/index.html
// e gera dist/public/404.html para endereços inexistentes.
// Executado automaticamente por "pnpm build" (ver package.json).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(root, "dist/public/index.html");
const notFoundPath = path.join(root, "dist/public/404.html");
const serverEntry = path.join(root, "dist/server/entry-server.js");
const assetsDir = path.join(root, "dist/public/assets");

const { render } = await import(pathToFileURL(serverEntry).href);

const template = fs.readFileSync(htmlPath, "utf-8");
if (!template.includes("<!--app-html-->")) {
  throw new Error("Marcador <!--app-html--> não encontrado em index.html");
}

// Pré-carrega as duas fontes usadas no primeiro trecho da página (apenas o alfabeto latino).
const fonts = fs
  .readdirSync(assetsDir)
  .filter(f => /^(inter|source-serif-4)-latin-wght-normal-.*\.woff2$/.test(f))
  .map(f => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`)
  .join("\n    ");

function buildPage(url) {
  const appHtml = render(url);
  let html = template.replace("<!--app-html-->", appHtml);

  // Estilos embutidos na própria página: o navegador não precisa esperar um segundo arquivo para exibir o conteúdo.
  html = html.replace(/<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/, (_tag, file) => {
    const css = fs.readFileSync(path.join(assetsDir, file), "utf-8");
    return `<style>${css}</style>`;
  });

  html = html.replace("</head>", `  ${fonts}\n  </head>`);
  return { html, size: appHtml.length };
}

// Página principal
const home = buildPage("/");
fs.writeFileSync(htmlPath, home.html);

// Página 404: a Vercel a entrega com status HTTP 404 para qualquer endereço inexistente,
// evitando o "Erro soft 404" no Google Search Console. Não deve ser indexada nem indicar canônica.
const notFound = buildPage("/404");
const notFoundHtml = notFound.html
  .replace(/\s*<link rel="canonical"[^>]*>/, "")
  .replace(/<title>[^<]*<\/title>/, "<title>Página não encontrada | Santana Advocacia</title>")
  .replace("</head>", `  <meta name="robots" content="noindex" />\n  </head>`);
fs.writeFileSync(notFoundPath, notFoundHtml);

fs.rmSync(path.join(root, "dist/server"), { recursive: true, force: true });

console.log(`Pré-renderização concluída (${(home.size / 1024).toFixed(1)} KB de HTML) e página 404 gerada.`);
