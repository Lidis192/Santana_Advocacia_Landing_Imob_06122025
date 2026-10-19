// Usado somente durante o build, para gerar a página já pronta (pré-renderização).
// Assim o visitante vê o conteúdo imediatamente, antes mesmo de o JavaScript terminar de carregar.
import { renderToString } from "react-dom/server";
import App from "./App";

export function render(url: string) {
  return renderToString(<App ssrPath={url} />);
}
