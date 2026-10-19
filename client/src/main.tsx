import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import "./index.css";

const container = document.getElementById("root")!;

// A página já chega pronta (pré-renderizada no build); aqui o React apenas "ativa" os botões e animações.
if (container.firstElementChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
